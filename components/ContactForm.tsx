"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, ArrowRight, CheckCircle, MailIcon, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPhone, cleanPhone, isValidPhone } from "@/lib/formatPhone"
import { buildWhatsAppLink, submitContactLead } from "@/lib/site-config"
import { isDataNascimentoValida, isValidEmail } from "@/lib/validators"
import { collectClientContext } from "@/lib/lead-context"

const CONVENIOS = ["Unimed BH", "Desban", "Fundaffemg", "Particular", "Outros"] as const

const MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
const DIAS  = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"))
const ANO_ATUAL = new Date().getFullYear()
const ANOS  = Array.from({ length: ANO_ATUAL - 1919 }, (_, i) => String(ANO_ATUAL - i))
type Convenio = (typeof CONVENIOS)[number]

interface ContactFormData {
  paraQuem: "mim" | "outra" | ""
  nome: string
  telefone: string
  dataNascimento: string
  email: string
  convenio: Convenio | ""
  numeroCarteira: string
  qualConvenio: string
}

interface ContactFormProps {
  title?: string
  subtitle?: string
  showCard?: boolean
  onSubmit?: (data: ContactFormData) => void | Promise<void>
}


export default function ContactForm({
  title = "Fale com nossa equipe",
  subtitle = "Respondemos em até 2 horas úteis",
  showCard = true,
  onSubmit,
}: ContactFormProps) {
  const [paraQuem, setParaQuem] = useState<"mim" | "outra" | "">("")
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [phoneFocused, setPhoneFocused] = useState(false)
  const [dataNascimento, setDataNascimento] = useState("")
  const [diaNasc, setDiaNasc]               = useState("")
  const [mesNasc, setMesNasc]               = useState("")
  const [anoNasc, setAnoNasc]               = useState("")
  const [email, setEmail] = useState("")
  const [convenio, setConvenio] = useState<Convenio | "">("")
  const [numeroCarteira, setNumeroCarteira] = useState("")
  const [qualConvenio, setQualConvenio] = useState("")
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (diaNasc || mesNasc || anoNasc) {
      setDataNascimento(`${diaNasc || "--"}/${mesNasc || "--"}/${anoNasc || "----"}`)
    } else {
      setDataNascimento("")
    }
  }, [diaNasc, mesNasc, anoNasc]) // eslint-disable-line

  const showCarteira =
    convenio === "Unimed BH" ||
    convenio === "Desban" ||
    convenio === "Fundaffemg"
  const showQualConvenio = convenio === "Outros"
  const dataNascValida = isDataNascimentoValida(dataNascimento)
  const dataNascPreenchida = diaNasc !== "" && mesNasc !== "" && anoNasc !== ""
  const dataNascErro = dataNascPreenchida && !dataNascValida
  const emailValido = isValidEmail(email)
  const emailErro = email !== "" && !emailValido
  const canSubmit =
    paraQuem !== "" &&
    nome.trim() !== "" &&
    isValidPhone(telefone) &&
    dataNascValida &&
    emailValido &&
    convenio !== "" &&
    consent

  async function handleSubmit() {
    if (!canSubmit || loading) return
    setLoading(true)
    setErrorMsg("")
    const data = { paraQuem, nome, telefone, dataNascimento, email, convenio, numeroCarteira, qualConvenio }
    try {
      if (onSubmit) {
        await onSubmit(data)
        setSubmitted(true)
        return
      }

      const ok = await submitContactLead({
        ...data,
        tipo: paraQuem === "mim" ? "Para mim mesmo" : "Para um familiar",
        origem: typeof window !== "undefined" ? window.location.pathname : "",
        consentLGPD: consent,
        ...collectClientContext(),
      })

      if (!ok) {
        setErrorMsg("Não conseguimos enviar agora. Você pode falar com a equipe direto pelo WhatsApp.")
      }

      const linhas = [
        `Olá! Tenho interesse no Conviva Saúde.`,
        ``,
        `Contratação: ${data.paraQuem === "mim" ? "Para mim mesmo" : "Para um familiar"}`,
        `Nome: ${data.nome}`,
        `Telefone: ${formatPhone(data.telefone)}`,
        data.dataNascimento ? `Data de nasc.: ${data.dataNascimento}` : null,
        data.email ? `E-mail: ${data.email}` : null,
        `Convênio: ${data.convenio}`,
        data.numeroCarteira ? `Carteirinha: ${data.numeroCarteira}` : null,
        data.qualConvenio ? `Qual convênio: ${data.qualConvenio}` : null,
      ].filter(Boolean).join("\n")
      const url = buildWhatsAppLink(linhas)
      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer")
      }
      setSubmitted(true)
    } catch {
      setErrorMsg("Erro inesperado. Tente novamente em instantes.")
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"

  const successContent = (
    <div className={`flex flex-col items-center justify-center gap-4 py-8 text-center${showCard ? " px-6" : ""}`}>
      <div
        className="size-16 rounded-full flex items-center justify-center"
        style={{ background: "color-mix(in oklch, var(--success, #22c55e) 15%, var(--background))" }}
      >
        <CheckCircle className="size-8" style={{ color: "var(--success, #22c55e)" }} />
      </div>
      <div>
        <p className="text-base font-semibold mb-1">Mensagem enviada!</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Nossa equipe entrará em contato em breve pelo telefone informado.
        </p>
      </div>
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Shield className="size-3 shrink-0" />
        Seus dados estão seguros. Não compartilhamos com terceiros.
      </p>
    </div>
  )

  const formContent = (
    <div className={`flex flex-col gap-4${showCard ? " px-6 py-5" : ""}`}>
      {/* 0. Para quem é a contratação? */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-foreground/70">
          Para quem é a contratação? <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { value: "mim", label: "Para mim" },
            { value: "outra", label: "Para outra pessoa" },
          ] as const).map((op) => {
            const selected = paraQuem === op.value
            return (
              <button
                key={op.value}
                type="button"
                onClick={() => setParaQuem(op.value)}
                className="rounded-xl py-3 px-3 text-xs font-medium text-left transition-all duration-150 active:scale-[0.97]"
                style={{
                  border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                  background: selected
                    ? "color-mix(in oklch, var(--primary) 10%, var(--background))"
                    : "var(--background)",
                  color: selected ? "var(--primary)" : undefined,
                }}
              >
                {op.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 1. Nome */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground/70">
          Nome <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          placeholder="Nome de quem vai contratar"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* 2. Número de telefone / WhatsApp */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground/70">
          Número de telefone / WhatsApp <span className="text-destructive">*</span>
        </label>
        <div
          className="flex items-stretch rounded-xl overflow-hidden transition-all bg-background/70"
          style={{
            border: `1.5px solid ${phoneFocused ? "var(--primary)" : "var(--border)"}`,
            boxShadow: phoneFocused ? "0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent)" : "",
          }}
        >
          <span
            className="flex items-center gap-1.5 px-3 text-sm font-medium select-none shrink-0"
            style={{ borderRight: "1.5px solid var(--border)", color: "var(--muted-foreground)" }}
          >
            🇧🇷 +55
          </span>
          <input
            type="tel"
            value={formatPhone(telefone)}
            onChange={(e) => setTelefone(cleanPhone(e.target.value))}
            placeholder="(31) 90000-0000"
            className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent placeholder:text-muted-foreground/60"
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
          />
        </div>
      </div>

      {/* 3. Data de nascimento, seletor Dia | Mês | Ano */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground/70">
          Data de nascimento <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* Dia */}
          <div className="relative">
            <select
              value={diaNasc}
              aria-label="Dia de nascimento"              onChange={(e) => setDiaNasc(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/70 px-3 py-2.5 text-sm outline-none transition-all appearance-none pr-7 cursor-pointer focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
            >
              <option value="">Dia</option>
              {DIAS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none text-muted-foreground" />
          </div>

          {/* Mês */}
          <div className="relative">
            <select
              value={mesNasc}
              aria-label="Mês de nascimento"              onChange={(e) => setMesNasc(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/70 px-3 py-2.5 text-sm outline-none transition-all appearance-none pr-7 cursor-pointer focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
            >
              <option value="">Mês</option>
              {MESES.map((m, i) => <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none text-muted-foreground" />
          </div>

          {/* Ano */}
          <div className="relative">
            <select
              value={anoNasc}
              aria-label="Ano de nascimento"              onChange={(e) => setAnoNasc(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/70 px-3 py-2.5 text-sm outline-none transition-all appearance-none pr-7 cursor-pointer focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
            >
              <option value="">Ano</option>
              {ANOS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none text-muted-foreground" />
          </div>
        </div>
        {dataNascErro && (
          <p className="text-xs text-destructive">Data de nascimento inválida.</p>
        )}
      </div>

      {/* 4. E-mail */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground/70">
          E-mail <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />
        {emailErro && (
          <span className="text-xs text-destructive">Informe um e-mail válido.</span>
        )}
      </div>

      {/* 5. Possui convênio?, botões radio */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-foreground/70">
          Possui convênio de saúde? <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {CONVENIOS.map((op) => {
            const selected = convenio === op
            return (
              <button
                key={op}
                type="button"
                onClick={() => {
                  setConvenio(op)
                  setNumeroCarteira("")
                  setQualConvenio("")
                }}
                className="rounded-xl py-3 px-3 text-xs font-medium text-left transition-all duration-150 active:scale-[0.97]"
                style={{
                  border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                  background: selected
                    ? "color-mix(in oklch, var(--primary) 10%, var(--background))"
                    : "var(--background)",
                  color: selected ? "var(--primary)" : undefined,
                }}
              >
                {op}
              </button>
            )
          })}
        </div>
      </div>

      {/* 6. Número da carteira (condicional) */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: showCarteira ? "72px" : "0",
          opacity: showCarteira ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground/70">Número da carteira</label>
          <input
            type="text"
            placeholder="Número da carteira do convênio"
            value={numeroCarteira}
            onChange={(e) => setNumeroCarteira(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* 7. Qual convênio? (condicional) */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: showQualConvenio ? "72px" : "0",
          opacity: showQualConvenio ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground/70">Qual convênio?</label>
          <input
            type="text"
            placeholder="Nome do convênio"
            value={qualConvenio}
            onChange={(e) => setQualConvenio(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Consentimento LGPD */}
      <label className="flex items-start gap-2 text-xs text-foreground/80 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
        />
        <span>
          Autorizo o uso dos meus dados para contato sobre o Conviva Saúde, conforme a{" "}
          <Link href="/privacidade" className="underline text-primary hover:opacity-80" target="_blank">
            Política de Privacidade
          </Link>
          . <span className="text-destructive">*</span>
        </span>
      </label>

      {errorMsg && (
        <p className="text-xs text-destructive" role="alert">
          {errorMsg}
        </p>
      )}

      {/* Botão enviar */}
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        loading={loading}
        className="w-full mt-1"
      >
        {loading ? "Enviando..." : (
          <>
            Enviar mensagem
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      {/* Rodapé de segurança */}
      <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
        <Shield className="size-3 shrink-0" />
        Seus dados estão seguros. Não compartilhamos com terceiros.
      </p>
    </div>
  )

  const content = submitted ? successContent : formContent

  if (!showCard) return content

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, color-mix(in oklch, var(--primary) 8%, var(--card)), color-mix(in oklch, var(--accent) 30%, var(--card)))",
        border: "1px solid color-mix(in oklch, var(--primary) 20%, var(--border))",
        boxShadow: "0 4px 32px color-mix(in oklch, var(--primary) 10%, transparent)",
      }}
    >
      <div className="px-6 pt-6 pb-5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <MailIcon className="size-5 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-base font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
      {content}
    </div>
  )
}
