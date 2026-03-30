"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  User, Users, CheckCircle, ArrowRight, ChevronLeft, Heart, Shield, Phone,
} from "lucide-react"

const STEP_LABELS = ["Início", "Sobre você", "Beneficiário", "Pacote", "Conclusão"]

const FAIXAS = [
  "60–65 anos", "66–70 anos", "71–75 anos",
  "76–80 anos", "81–85 anos", "86–90 anos", "90+ anos",
]

const BENEFICIOS = [
  "Médico de referência dedicado",
  "Enfermeiro de referência",
  "Equipe multidisciplinar (10 especialidades)",
  "Pronto Cuidar 24h (com coparticipação)",
  "Acompanhamento preventivo e contínuo",
  "Suporte à família por WhatsApp",
  "Sem carência · Sem fidelidade",
]

export default function ContratarPage() {
  const [step, setStep] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<"forward" | "back">("forward")

  // Form state
  const [tipo, setTipo] = useState<"mim" | "familiar" | null>(null)
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [faixaEtaria, setFaixaEtaria] = useState("")
  const [temConvenio, setTemConvenio] = useState<"sim" | "nao" | null>(null)
  const [convenio, setConvenio] = useState("")

  // Progressive field visibility
  const [showEmail, setShowEmail] = useState(false)
  const [showWhatsapp, setShowWhatsapp] = useState(false)
  const [showConvenioInput, setShowConvenioInput] = useState(false)

  const nomeValido = nome.trim().split(/\s+/).filter(Boolean).length >= 2
  const whatsappValido = whatsapp.replace(/\D/g, "").length >= 10

  const progressPercent = (step / 4) * 100

  useEffect(() => {
    if (nomeValido && !showEmail) setShowEmail(true)
  }, [nomeValido]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (showEmail && !showWhatsapp) {
      const t = setTimeout(() => setShowWhatsapp(true), 200)
      return () => clearTimeout(t)
    }
  }, [showEmail]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (temConvenio === "sim") setShowConvenioInput(true)
    else { setShowConvenioInput(false); setConvenio("") }
  }, [temConvenio])

  function goTo(next: number, dir: "forward" | "back" = "forward") {
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setStep(next)
      setAnimating(false)
    }, 180)
  }

  function handleTipoSelect(t: "mim" | "familiar") {
    setTipo(t)
    goTo(1)
  }

  function handleContinue() {
    if (step === 1) goTo(2)
    else if (step === 2) goTo(3)
    else if (step === 3) goTo(4)
  }

  function handleBack() {
    if (step === 2) goTo(1, "back")
    else if (step === 3) goTo(2, "back")
    else goTo(step - 1, "back")
  }

  const canContinue = step === 1
    ? nomeValido && whatsappValido
    : step === 2
    ? faixaEtaria !== ""
    : true

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50" style={{ background: "color-mix(in oklch, var(--background) 95%, transparent)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-xl px-6 h-14 flex items-center">
          <img src="/logo.svg" alt="Conviva Saúde" className="h-7 w-auto" />
        </div>

        {/* Progress bar */}
        <div className="relative h-1" style={{ background: "var(--muted)" }}>
          <div
            className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%`, background: "var(--primary)" }}
          />
        </div>

        {/* Step labels */}
        <div className="mx-auto max-w-xl px-4">
          <div className="flex justify-between py-2">
            {STEP_LABELS.map((label, i) => (
              <span
                key={label}
                className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300"
                style={{
                  color: i === step
                    ? "var(--primary)"
                    : i < step
                    ? "color-mix(in oklch, var(--primary) 50%, transparent)"
                    : "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
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

          {/* ── PASSO 0: Tipo ──────────────────────────────────────────── */}
          {step === 0 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-center">
                Para quem é o pacote Conviva?
              </h1>
              <p className="text-sm text-center mb-10" style={{ color: "var(--muted-foreground)" }}>
                Isso nos ajuda a personalizar o processo para você.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {([
                  { t: "mim" as const, icon: User, title: "Para mim", desc: "Quero contratar para mim mesmo" },
                  { t: "familiar" as const, icon: Users, title: "Para um familiar", desc: "Sou responsável ou familiar do beneficiário" },
                ] as const).map(({ t, icon: Icon, title, desc }) => (
                  <button
                    key={t}
                    onClick={() => handleTipoSelect(t)}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl text-center transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] cursor-pointer"
                    style={{
                      border: "2px solid var(--border)",
                      background: "var(--card)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklch, var(--primary) 50%, var(--border))")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  >
                    <div
                      className="size-14 rounded-2xl flex items-center justify-center"
                      style={{ background: "color-mix(in oklch, var(--primary) 12%, var(--card))" }}
                    >
                      <Icon className="size-7" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base">{title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── PASSO 1: Sobre você ────────────────────────────────────── */}
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
                    Nome e sobrenome <span style={{ color: "var(--destructive)" }} className="normal-case tracking-normal font-normal">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Maria Aparecida"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all pr-10"
                      style={{
                        border: "1.5px solid var(--border)",
                        background: "var(--background)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklch, var(--primary) 50%, var(--border))")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                    {nomeValido && (
                      <CheckCircle
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-4"
                        style={{ color: "var(--success, #22c55e)" }}
                      />
                    )}
                  </div>
                </div>

                {/* E-mail — progressive */}
                {showEmail && (
                  <div className="flex flex-col gap-1.5" style={{ animation: "cvWizardFade 0.35s ease both" }}>
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                      E-mail{" "}
                      <span className="normal-case font-normal tracking-normal" style={{ color: "var(--muted-foreground)", opacity: 0.6 }}>(opcional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{ border: "1.5px solid var(--border)", background: "var(--background)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklch, var(--primary) 50%, var(--border))")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>
                )}

                {/* WhatsApp — progressive */}
                {showWhatsapp && (
                  <div className="flex flex-col gap-1.5" style={{ animation: "cvWizardFade 0.35s ease both" }}>
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                      WhatsApp <span style={{ color: "var(--destructive)" }} className="normal-case tracking-normal font-normal">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="(31) 9 0000-0000"
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all pr-10"
                        style={{ border: "1.5px solid var(--border)", background: "var(--background)" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklch, var(--primary) 50%, var(--border))")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                      {whatsappValido && (
                        <CheckCircle
                          className="absolute right-3 top-1/2 -translate-y-1/2 size-4"
                          style={{ color: "var(--success, #22c55e)" }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PASSO 2: Beneficiário ──────────────────────────────────── */}
          {step === 2 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1.5">
                Sobre quem vai ser cuidado
              </h1>
              <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
                Nos ajuda a preparar as informações certas para você.
              </p>

              {/* Faixa etária */}
              <div className="mb-7">
                <p className="text-sm font-semibold mb-3">Qual a faixa etária?</p>
                <div className="grid grid-cols-3 gap-2">
                  {FAIXAS.map((f) => {
                    const selected = faixaEtaria === f
                    return (
                      <button
                        key={f}
                        onClick={() => setFaixaEtaria(f)}
                        className="rounded-xl py-3 px-2 text-xs font-medium text-center transition-all duration-150 active:scale-[0.97]"
                        style={{
                          border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                          background: selected
                            ? "color-mix(in oklch, var(--primary) 10%, var(--card))"
                            : "var(--card)",
                          color: selected ? "var(--primary)" : undefined,
                          fontWeight: selected ? 600 : undefined,
                        }}
                      >
                        {f}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Convênio — progressive */}
              {faixaEtaria && (
                <div style={{ animation: "cvWizardFade 0.35s ease both" }}>
                  <p className="text-sm font-semibold mb-3">Já possui convênio de saúde?</p>
                  <div className="flex gap-3 mb-4">
                    {(["sim", "nao"] as const).map((v) => {
                      const selected = temConvenio === v
                      return (
                        <button
                          key={v}
                          onClick={() => setTemConvenio(v)}
                          className="flex-1 rounded-xl py-3 text-sm font-medium transition-all duration-150"
                          style={{
                            border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                            background: selected
                              ? "color-mix(in oklch, var(--primary) 10%, var(--card))"
                              : "var(--card)",
                            color: selected ? "var(--primary)" : undefined,
                          }}
                        >
                          {v === "sim" ? "Sim" : "Não"}
                        </button>
                      )
                    })}
                  </div>

                  {showConvenioInput && (
                    <div style={{ animation: "cvWizardFade 0.35s ease both" }}>
                      <input
                        type="text"
                        value={convenio}
                        onChange={(e) => setConvenio(e.target.value)}
                        placeholder="Ex: Unimed, Hapvida, SulAmérica…"
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        style={{ border: "1.5px solid var(--border)", background: "var(--background)" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklch, var(--primary) 50%, var(--border))")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── PASSO 3: Pacote ───────────────────────────────────────── */}
          {step === 3 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1.5 text-center">
                O que está incluído no seu pacote
              </h1>
              <p className="text-sm mb-8 text-center" style={{ color: "var(--muted-foreground)" }}>
                Um único pacote, com tudo que o cuidado exige.
              </p>

              <div
                className="rounded-2xl p-6 md:p-8 mb-5"
                style={{
                  background: "linear-gradient(145deg, color-mix(in oklch, var(--primary) 8%, var(--card)), color-mix(in oklch, var(--accent) 30%, var(--card)))",
                  border: "2px solid color-mix(in oklch, var(--primary) 25%, var(--border))",
                  boxShadow: "0 4px 32px color-mix(in oklch, var(--primary) 12%, transparent)",
                }}
              >
                {/* Badge + preço */}
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
                      <CheckCircle
                        className="size-4 shrink-0 mt-0.5"
                        style={{ color: "var(--success, #22c55e)" }}
                      />
                      <span className="text-sm leading-snug">{b}</span>
                    </div>
                  ))}
                </div>

                <p
                  className="text-xs pt-4"
                  style={{ borderTop: "1px solid var(--border)", color: "var(--muted-foreground)" }}
                >
                  O cuidado acontece nas clínicas da <strong>Mais60 Saúde</strong> — referência em geriatria em BH.
                </p>
              </div>

              {/* CTA inline */}
              <button
                onClick={handleContinue}
                className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  boxShadow: "0 4px 16px color-mix(in oklch, var(--primary) 30%, transparent)",
                }}
              >
                Quero este pacote
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}

          {/* ── PASSO 4: Conclusão ────────────────────────────────────── */}
          {step === 4 && (
            <div className="text-center" style={{ animation: "cvWizardFade 0.4s ease both" }}>
              <div
                className="size-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "color-mix(in oklch, var(--success, #22c55e) 15%, var(--background))" }}
              >
                <CheckCircle className="size-10" style={{ color: "var(--success, #22c55e)" }} />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Pedido recebido!
              </h1>
              <p className="text-base leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: "var(--muted-foreground)" }}>
                Recebemos seus dados e nossa equipe entrará em contato em até 24 horas pelo WhatsApp para finalizar a contratação.
              </p>

              {/* Resumo */}
              <div
                className="rounded-2xl p-6 mb-8 text-left"
                style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Resumo do pedido
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: "Nome", value: nome },
                    { label: "WhatsApp", value: whatsapp },
                    ...(email ? [{ label: "E-mail", value: email }] : []),
                    ...(faixaEtaria ? [{ label: "Faixa etária", value: faixaEtaria }] : []),
                    ...(convenio ? [{ label: "Convênio", value: convenio }] : []),
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
                <a
                  href="https://wa.me/5531999990000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    boxShadow: "0 4px 16px color-mix(in oklch, var(--primary) 30%, transparent)",
                  }}
                >
                  <Phone className="size-4" />
                  Falar pelo WhatsApp agora
                </a>
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

      {/* ── Barra de navegação inferior ───────────────────────────────────── */}
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
            {/* Voltar */}
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-muted"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ChevronLeft className="size-4" />
              Voltar
            </button>

            {/* Continuar (steps 1 e 2 — passo 3 tem CTA inline) */}
            {(step === 1 || step === 2) && (
              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-35 disabled:cursor-not-allowed disabled:scale-100"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                Continuar
                <ArrowRight className="size-4" />
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes cvWizardFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
