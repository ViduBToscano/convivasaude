"use client"

import { useState, useEffect, Fragment } from "react"
import Link from "next/link"
import {
  User, Users, CheckCircle, Check, ArrowRight, ChevronLeft, ChevronDown,
  Heart, Shield, Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPhone, cleanPhone, isValidPhone } from "@/lib/formatPhone"
import { buildWhatsAppLink, submitContactLead } from "@/lib/site-config"
import { isDataNascimentoValida, isValidEmail } from "@/lib/validators"
import { collectClientContext } from "@/lib/lead-context"

const STEP_LABELS = ["Início", "Sobre você", "Beneficiário", "Pacote", "Conclusão"]

const FAIXAS = [
  "60 a 65 anos", "66 a 70 anos", "71 a 75 anos",
  "76 a 80 anos", "81 a 85 anos", "86 a 90 anos", "90+ anos",
]

const CONVENIOS_OPCOES = [
  { value: "Unimed BH",       label: "Unimed BH" },
  { value: "Desban",          label: "Desban" },
  { value: "Fundaffemg",      label: "Fundaffemg" },
  { value: "Particular",      label: "Particular" },
  { value: "Outros",          label: "Outros" },
]
const CONVENIOS_COM_CARTEIRA = new Set(["Unimed BH", "Desban", "Fundaffemg"])

const MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
const DIAS  = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"))
const ANO_ATUAL = new Date().getFullYear()
const ANOS  = Array.from({ length: ANO_ATUAL - 1919 }, (_, i) => String(ANO_ATUAL - i))

const BENEFICIOS = [
  "Médico de referência dedicado",
  "Enfermeiro de referência",
  "Equipe multidisciplinar",
  "Pronto Cuidar (pronto atendimento para a pessoa idosa)",
  "Acompanhamento preventivo e contínuo",
  "Suporte à família por WhatsApp",
  "Sem carência · Sem reajuste por idade",
]

// Shared input style helpers
const inputCls = "w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all bg-background"
const inputStyle: React.CSSProperties = { border: "1.5px solid var(--border)" }
function onFocusInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--primary)"
  e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent)"
}
function onBlurInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--border)"
  e.currentTarget.style.boxShadow = ""
}

export default function ContratarPage() {
  const [step, setStep]           = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<"forward" | "back">("forward")

  // Form state
  const [tipo, setTipo]               = useState<"mim" | "familiar" | null>(null)
  const [nome, setNome]               = useState("")
  const [email, setEmail]             = useState("")
  const [whatsapp, setWhatsapp]       = useState("")
  const [faixaEtaria, setFaixaEtaria] = useState("")
  const [dataNasc, setDataNasc]       = useState("")
  const [diaNasc, setDiaNasc]         = useState("")
  const [mesNasc, setMesNasc]         = useState("")
  const [anoNasc, setAnoNasc]         = useState("")
  const [convenio, setConvenio]       = useState("")
  const [numeroCarteira, setNumeroCarteira] = useState("")
  const [qualConvenio, setQualConvenio]     = useState("")
  const [consent, setConsent]               = useState(false)
  const [submitting, setSubmitting]         = useState(false)

  // Progressive field visibility (step 1)
  const [showEmail, setShowEmail]       = useState(false)
  const [showWhatsapp, setShowWhatsapp] = useState(false)
  const [phoneFocused, setPhoneFocused] = useState(false)

  // Derived
  const nomeValido     = nome.trim().split(/\s+/).filter(Boolean).length >= 2
  const whatsappValido = isValidPhone(whatsapp)
  const emailValido    = isValidEmail(email)
  const emailErro      = email !== "" && !emailValido
  const showCarteira      = CONVENIOS_COM_CARTEIRA.has(convenio)
  const showQualConvenio  = convenio === "Outros"
  const dataNascPreenchida = diaNasc !== "" && mesNasc !== "" && anoNasc !== ""
  const dataNascValida    = isDataNascimentoValida(dataNasc)
  const dataNascErro      = dataNascPreenchida && !dataNascValida

  const canContinue =
    step === 1 ? nomeValido && emailValido && whatsappValido :
    step === 2 ? faixaEtaria !== "" && dataNascValida && convenio !== "" :
    true

  useEffect(() => {
    if (diaNasc || mesNasc || anoNasc) {
      setDataNasc(`${diaNasc || "--"}/${mesNasc || "--"}/${anoNasc || "----"}`)
    } else {
      setDataNasc("")
    }
  }, [diaNasc, mesNasc, anoNasc]) // eslint-disable-line

  useEffect(() => {
    if (nomeValido && !showEmail) setShowEmail(true)
  }, [nomeValido]) // eslint-disable-line

  useEffect(() => {
    if (showEmail && !showWhatsapp) {
      const t = setTimeout(() => setShowWhatsapp(true), 200)
      return () => clearTimeout(t)
    }
  }, [showEmail]) // eslint-disable-line

  function goTo(next: number, dir: "forward" | "back" = "forward") {
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => { setStep(next); setAnimating(false) }, 180)
  }

  function handleTipoSelect(t: "mim" | "familiar") {
    setTipo(t)
    goTo(1)
  }

  function handleContinue() {
    if (step < 4) goTo(step + 1)
  }

  async function handleFinalizar() {
    if (!consent || submitting) return
    setSubmitting(true)
    try {
      await submitContactLead({
        nome,
        telefone: whatsapp,
        email,
        dataNascimento: dataNasc,
        convenio,
        numeroCarteira,
        qualConvenio,
        faixaEtaria,
        tipo: tipo === "mim" ? "Para mim mesmo" : "Para um familiar",
        origem: "/contratar",
        consentLGPD: consent,
        ...collectClientContext(),
      })
    } finally {
      setSubmitting(false)
      goTo(4)
    }
  }

  function handleBack() {
    goTo(step - 1, "back")
  }

  function handleConvenioChange(v: string) {
    setConvenio(v)
    setNumeroCarteira("")
    setQualConvenio("")
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "color-mix(in oklch, var(--background) 95%, transparent)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Logo + step indicator row */}
        <div className="mx-auto max-w-2xl px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img src="/logo.svg" alt="Conviva Saúde" width={120} height={56} className="h-12 w-auto" />
            </Link>

            {/* Voltar ao site, visível em todos os tamanhos */}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium rounded-xl px-3 py-2 transition-colors hover:bg-muted"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ChevronLeft className="size-4 shrink-0" />
              <span>Voltar ao site</span>
            </Link>
          </div>
        </div>

        {/* Progress bar (thin) */}
        <div className="relative h-[3px]" style={{ background: "var(--border)" }}>
          <div
            className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%`, background: "var(--primary)" }}
          />
        </div>

        {/* Desktop step labels with circles + connecting line */}
        <div className="hidden sm:block mx-auto max-w-2xl px-8 pt-3 pb-3">
          <div className="flex items-start">
            {STEP_LABELS.map((label, i) => {
              const isCompleted = i < step
              const isActive    = i === step
              return (
                <Fragment key={label}>
                  {/* Connecting line segment (before each step except the first) */}
                  {i > 0 && (
                    <div className="flex-1 pt-4">
                      <div
                        className="h-0.5 transition-colors duration-500"
                        style={{ background: i <= step ? "var(--primary)" : "var(--border)" }}
                      />
                    </div>
                  )}

                  {/* Circle + label */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0" style={{ minWidth: "3rem" }}>
                    <div
                      className="size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                      style={{
                        background: isCompleted || isActive ? "var(--primary)" : "var(--card)",
                        color: isCompleted || isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                        border: `2px solid ${isCompleted || isActive ? "var(--primary)" : "var(--border)"}`,
                        boxShadow: isActive ? "0 0 0 4px color-mix(in oklch, var(--primary) 18%, transparent)" : undefined,
                      }}
                    >
                      {isCompleted ? <Check className="size-3.5" strokeWidth={2.5} /> : i + 1}
                    </div>
                    <span
                      className="text-[9px] font-semibold uppercase tracking-wider text-center leading-tight transition-colors duration-300"
                      style={{
                        color: isActive ? "var(--primary)" :
                               isCompleted ? "var(--muted-foreground)" :
                               "color-mix(in oklch, var(--muted-foreground) 50%, transparent)",
                        fontWeight: isActive ? 700 : 600,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center py-10 px-6">
        <div
          className="w-full max-w-lg"
          style={{
            transition: "opacity 180ms ease, transform 180ms ease",
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === "forward" ? "20px" : "-20px"})`
              : "translateX(0)",
          }}
        >

          {/* ── PASSO 0: Para quem ──────────────────────────────────────── */}
          {step === 0 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-center">
                Para quem é o pacote Conviva?
              </h1>
              <p className="text-sm text-center mb-10" style={{ color: "var(--muted-foreground)" }}>
                Isso nos ajuda a personalizar o processo para você.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                  { t: "mim"      as const, icon: User,  title: "Para mim",        desc: "Quero contratar para mim mesmo" },
                  { t: "familiar" as const, icon: Users, title: "Para um familiar", desc: "Sou responsável ou familiar do beneficiário" },
                ]).map(({ t, icon: Icon, title, desc }) => {
                  const selected = tipo === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTipoSelect(t)}
                      className="flex flex-col items-center gap-3 p-5 sm:p-7 rounded-2xl text-center cursor-pointer transition-all duration-200 relative"
                      style={{
                        border: `2px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                        background: selected
                          ? "color-mix(in oklch, var(--primary) 8%, var(--card))"
                          : "var(--card)",
                        boxShadow: selected
                          ? "0 4px 20px color-mix(in oklch, var(--primary) 22%, transparent)"
                          : undefined,
                        transform: selected ? "translateY(-2px)" : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (!selected) {
                          e.currentTarget.style.borderColor = "var(--primary)"
                          e.currentTarget.style.boxShadow = "0 4px 20px color-mix(in oklch, var(--primary) 22%, transparent)"
                          e.currentTarget.style.transform = "translateY(-2px)"
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selected) {
                          e.currentTarget.style.borderColor = "var(--border)"
                          e.currentTarget.style.boxShadow = ""
                          e.currentTarget.style.transform = ""
                        }
                      }}
                    >
                      {/* Check no canto quando selecionado */}
                      {selected && (
                        <div
                          className="absolute top-3 right-3 size-5 rounded-full flex items-center justify-center"
                          style={{ background: "var(--primary)" }}
                        >
                          <Check className="size-3" style={{ color: "var(--primary-foreground)" }} strokeWidth={3} />
                        </div>
                      )}
                      <div
                        className="size-12 sm:size-16 rounded-2xl flex items-center justify-center transition-colors duration-200"
                        style={{
                          background: selected
                            ? "color-mix(in oklch, var(--primary) 18%, var(--card))"
                            : "color-mix(in oklch, var(--primary) 10%, var(--card))",
                        }}
                      >
                        <Icon
                          className="size-6 sm:size-8 transition-colors duration-200"
                          style={{ color: "var(--primary)" }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm md:text-base">{title}</p>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── PASSO 1: Sobre você ─────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1.5">
                Seus dados de contato
              </h1>
              <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
                Usaremos apenas para contato da nossa equipe.
              </p>

              <div className="flex flex-col gap-5">
                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                    Nome e sobrenome{" "}
                    <span style={{ color: "var(--destructive)" }} className="normal-case tracking-normal font-normal">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Maria Aparecida"
                      className={`${inputCls} pr-10`}
                      style={inputStyle}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                    />
                    {nomeValido && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 size-4" style={{ color: "var(--success)" }} />
                    )}
                  </div>
                </div>

                {/* E-mail, progressive */}
                {showEmail && (
                  <div className="flex flex-col gap-1.5" style={{ animation: "wizardFade 0.35s ease both" }}>
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                      E-mail{" "}
                      <span style={{ color: "var(--destructive)" }} className="normal-case tracking-normal font-normal">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className={inputCls}
                      style={inputStyle}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                    />
                    {emailErro && (
                      <span className="text-xs" style={{ color: "var(--destructive)" }}>Informe um e-mail válido.</span>
                    )}
                  </div>
                )}

                {/* Número de telefone / WhatsApp, progressive */}
                {showWhatsapp && (
                  <div className="flex flex-col gap-1.5" style={{ animation: "wizardFade 0.35s ease both" }}>
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                      Número de telefone / WhatsApp{" "}
                      <span style={{ color: "var(--destructive)" }} className="normal-case tracking-normal font-normal">*</span>
                    </label>
                    <div
                      className="flex items-stretch rounded-xl overflow-hidden transition-all"
                      style={{
                        border: `1.5px solid ${phoneFocused ? "var(--primary)" : "var(--border)"}`,
                        boxShadow: phoneFocused ? "0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent)" : "",
                        background: "var(--background)",
                      }}
                    >
                      <span
                        className="flex items-center gap-1.5 px-3 text-sm font-medium select-none shrink-0"
                        style={{ borderRight: "1.5px solid var(--border)", color: "var(--muted-foreground)" }}
                      >
                        🇧🇷 +55
                      </span>
                      <div className="relative flex-1">
                        <input
                          type="tel"
                          value={formatPhone(whatsapp)}
                          onChange={(e) => setWhatsapp(cleanPhone(e.target.value))}
                          placeholder="(31) 90000-0000"
                          className="w-full px-4 py-3.5 text-sm outline-none bg-transparent pr-10"
                          onFocus={() => setPhoneFocused(true)}
                          onBlur={() => setPhoneFocused(false)}
                        />
                        {whatsappValido && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 size-4" style={{ color: "var(--success)" }} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PASSO 2: Beneficiário ───────────────────────────────────── */}
          {step === 2 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1.5">
                Sobre quem vai ser cuidado
              </h1>
              <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
                Nos ajuda a preparar as informações certas para você.
              </p>

              <div className="flex flex-col gap-7">
                {/* Faixa etária */}
                <div>
                  <p className="text-sm font-semibold mb-3">
                    Faixa etária <span style={{ color: "var(--destructive)" }}>*</span>
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {FAIXAS.map((f) => {
                      const sel = faixaEtaria === f
                      return (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFaixaEtaria(f)}
                          className="rounded-xl py-3 px-2 text-xs font-semibold text-center transition-all duration-150 cursor-pointer"
                          style={{
                            border: `1.5px solid ${sel ? "var(--primary)" : "var(--border)"}`,
                            background: sel ? "var(--primary)" : "var(--card)",
                            color: sel ? "var(--primary-foreground)" : "var(--foreground)",
                            boxShadow: sel ? "0 2px 8px color-mix(in oklch, var(--primary) 28%, transparent)" : undefined,
                          }}
                        >
                          {f}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Data de nascimento, seletor customizado Dia | Mês | Ano */}
                <div className="flex flex-col gap-1.5" style={{ animation: "wizardFade 0.3s ease both" }}>
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                    Data de nascimento{" "}
                    <span style={{ color: "var(--destructive)" }} className="normal-case tracking-normal font-normal">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Dia */}
                    <div className="relative">
                      <select
                        value={diaNasc}
                        aria-label="Dia de nascimento"                        onChange={(e) => setDiaNasc(e.target.value)}
                        className="w-full rounded-xl px-3 py-3.5 text-sm outline-none transition-all bg-background appearance-none pr-7 cursor-pointer"
                        style={inputStyle}
                        onFocus={onFocusInput}
                        onBlur={onBlurInput}
                      >
                        <option value="">Dia</option>
                        {DIAS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none" style={{ color: "var(--muted-foreground)" }} />
                    </div>

                    {/* Mês */}
                    <div className="relative">
                      <select
                        value={mesNasc}
                        aria-label="Mês de nascimento"                        onChange={(e) => setMesNasc(e.target.value)}
                        className="w-full rounded-xl px-3 py-3.5 text-sm outline-none transition-all bg-background appearance-none pr-7 cursor-pointer"
                        style={inputStyle}
                        onFocus={onFocusInput}
                        onBlur={onBlurInput}
                      >
                        <option value="">Mês</option>
                        {MESES.map((m, i) => <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none" style={{ color: "var(--muted-foreground)" }} />
                    </div>

                    {/* Ano */}
                    <div className="relative">
                      <select
                        value={anoNasc}
                        aria-label="Ano de nascimento"                        onChange={(e) => setAnoNasc(e.target.value)}
                        className="w-full rounded-xl px-3 py-3.5 text-sm outline-none transition-all bg-background appearance-none pr-7 cursor-pointer"
                        style={inputStyle}
                        onFocus={onFocusInput}
                        onBlur={onBlurInput}
                      >
                        <option value="">Ano</option>
                        {ANOS.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none" style={{ color: "var(--muted-foreground)" }} />
                    </div>
                  </div>
                  {dataNascErro && (
                    <p className="text-xs" style={{ color: "var(--destructive)" }}>
                      Data de nascimento inválida.
                    </p>
                  )}
                </div>

                {/* Convênio, select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                    Convênio de saúde <span style={{ color: "var(--destructive)" }}>*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={convenio}
                      aria-label="Convênio de saúde"                      onChange={(e) => handleConvenioChange(e.target.value)}
                      className={`${inputCls} appearance-none pr-10 cursor-pointer`}
                      style={inputStyle}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                    >
                      <option value="">Selecione...</option>
                      {CONVENIOS_OPCOES.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none"
                      style={{ color: "var(--muted-foreground)" }}
                    />
                  </div>
                </div>

                {/* Número da carteirinha, condicional */}
                {showCarteira && (
                  <div className="flex flex-col gap-1.5" style={{ animation: "wizardFade 0.3s ease both" }}>
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                      Número da carteirinha{" "}
                      <span className="normal-case font-normal tracking-normal" style={{ color: "var(--muted-foreground)", opacity: 0.6 }}>
                        (opcional)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={numeroCarteira}
                      onChange={(e) => setNumeroCarteira(e.target.value)}
                      placeholder="Número da carteirinha do convênio"
                      className={inputCls}
                      style={inputStyle}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                    />
                  </div>
                )}

                {/* Qual convênio?, condicional para Outros */}
                {showQualConvenio && (
                  <div className="flex flex-col gap-1.5" style={{ animation: "wizardFade 0.3s ease both" }}>
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                      Qual convênio?
                    </label>
                    <input
                      type="text"
                      value={qualConvenio}
                      onChange={(e) => setQualConvenio(e.target.value)}
                      placeholder="Ex: Hapvida, SulAmérica..."
                      className={inputCls}
                      style={inputStyle}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PASSO 3: Pacote ─────────────────────────────────────────── */}
          {step === 3 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1.5 text-center">
                O que está incluído no seu pacote
              </h1>
              <p className="text-sm mb-8 text-center" style={{ color: "var(--muted-foreground)" }}>
                Um único pacote, com tudo que o cuidado exige.
              </p>

              <div
                className="rounded-2xl p-6 md:p-8 mb-6"
                style={{
                  background: "linear-gradient(145deg, color-mix(in oklch, var(--primary) 8%, var(--card)), color-mix(in oklch, var(--accent) 30%, var(--card)))",
                  border: "2px solid color-mix(in oklch, var(--primary) 25%, var(--border))",
                  boxShadow: "0 4px 32px color-mix(in oklch, var(--primary) 12%, transparent)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "color-mix(in oklch, var(--primary) 15%, transparent)",
                      color: "var(--primary)",
                      border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)",
                    }}
                  >
                    <Heart className="size-3" strokeWidth={2.5} />
                    Conviva Essencial
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-bold leading-none" style={{ color: "var(--primary)" }}>R$ 329</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>/mês</p>
                  </div>
                </div>

                <p className="text-xs mb-5" style={{ color: "var(--muted-foreground)" }}>
                  O mesmo valor para qualquer idade
                </p>

                <div className="flex flex-col gap-3 mb-6">
                  {BENEFICIOS.map((b) => (
                    <div key={b} className="flex items-start gap-2.5">
                      <CheckCircle className="size-4 shrink-0 mt-0.5" style={{ color: "var(--success)" }} />
                      <span className="text-sm leading-snug">{b}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs pt-4" style={{ borderTop: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
                  O cuidado acontece nas clínicas da <strong>Mais60 Saúde</strong>, referência em geriatria em BH.
                </p>
              </div>

              <label className="flex items-start gap-2 text-xs mb-4 cursor-pointer select-none" style={{ color: "var(--foreground)" }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
                />
                <span>
                  Autorizo o uso dos meus dados para contato sobre o Conviva Saúde, conforme a{" "}
                  <Link href="/privacidade" target="_blank" className="underline" style={{ color: "var(--primary)" }}>
                    Política de Privacidade
                  </Link>
                  . <span style={{ color: "var(--destructive)" }}>*</span>
                </span>
              </label>

              <Button
                className="w-full"
                size="lg"
                onClick={handleFinalizar}
                disabled={!consent || submitting}
                loading={submitting}
              >
                {submitting ? "Enviando..." : (
                  <>
                    Quero este pacote
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* ── PASSO 4: Conclusão ──────────────────────────────────────── */}
          {step === 4 && (
            <div className="text-center" style={{ animation: "wizardFade 0.4s ease both" }}>
              <div
                className="size-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "color-mix(in oklch, var(--success) 15%, var(--background))" }}
              >
                <CheckCircle className="size-10" style={{ color: "var(--success)" }} />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Tudo pronto!
              </h1>
              <p className="text-base leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: "var(--muted-foreground)" }}>
                Clique abaixo para falar com nossa equipe pelo WhatsApp. Seus dados já vão pré-preenchidos na mensagem para agilizar o atendimento.
              </p>

              {/* Resumo */}
              <div className="rounded-2xl p-6 mb-8 text-left" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted-foreground)" }}>
                  Resumo do pedido
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: "Nome",           value: nome },
                    { label: "WhatsApp",        value: formatPhone(whatsapp) },
                    ...(email         ? [{ label: "E-mail",         value: email }]         : []),
                    ...(faixaEtaria   ? [{ label: "Faixa etária",   value: faixaEtaria }]   : []),
                    ...(dataNasc      ? [{ label: "Data de nasc.",   value: dataNasc }]      : []),
                    ...(convenio      ? [{ label: "Convênio",        value: convenio }]      : []),
                    ...(numeroCarteira ? [{ label: "Nº carteirinha", value: numeroCarteira }] : []),
                    ...(qualConvenio  ? [{ label: "Qual convênio",   value: qualConvenio }]  : []),
                    { label: "Contratação", value: tipo === "mim" ? "Para mim mesmo" : "Para um familiar" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-baseline justify-between gap-4">
                      <span className="text-xs shrink-0" style={{ color: "var(--muted-foreground)" }}>{label}</span>
                      <span className="text-sm font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button size="lg" className="w-full" asChild>
                  <a
                    href={buildWhatsAppLink(
                      [
                        `Olá! Quero contratar o pacote Conviva Saúde.`,
                        ``,
                        `Nome: ${nome}`,
                        `WhatsApp: ${formatPhone(whatsapp)}`,
                        email ? `E-mail: ${email}` : null,
                        faixaEtaria ? `Faixa etária: ${faixaEtaria}` : null,
                        dataNasc ? `Data de nasc.: ${dataNasc}` : null,
                        convenio ? `Convênio: ${convenio}` : null,
                        numeroCarteira ? `Nº carteirinha: ${numeroCarteira}` : null,
                        qualConvenio ? `Qual convênio: ${qualConvenio}` : null,
                        `Contratação: ${tipo === "mim" ? "Para mim mesmo" : "Para um familiar"}`,
                      ].filter(Boolean).join("\n")
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="size-4" />
                    Falar pelo WhatsApp agora
                  </a>
                </Button>
                <Link
                  href="/"
                  className="w-full flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-medium transition-colors hover:bg-muted"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Voltar ao site
                </Link>
              </div>

              <p className="text-xs mt-6 flex items-center justify-center gap-1.5" style={{ color: "var(--muted-foreground)" }}>
                <Shield className="size-3 shrink-0" />
                Seus dados estão seguros e não serão compartilhados com terceiros.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ── Barra de navegação inferior ─────────────────────────────────────── */}
      {step > 0 && step < 4 && (
        <div
          className="sticky bottom-0"
          style={{
            background: "color-mix(in oklch, var(--background) 95%, transparent)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="mx-auto max-w-lg px-6 py-4 flex items-center justify-between gap-4">
            {/* Voltar, secondary outline, equal size, arrow animates left */}
            <Button
              variant="outline"
              onClick={handleBack}
              className="[&>svg:first-child]:transition-transform hover:[&>svg:first-child]:-translate-x-0.5"
            >
              <ChevronLeft className="size-4" />
              Voltar
            </Button>

            {/* Continuar, primary (step 3 tem CTA inline no pacote) */}
            {(step === 1 || step === 2) && (
              <Button onClick={handleContinue} disabled={!canContinue}>
                Continuar
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
