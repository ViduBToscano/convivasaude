"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Info, ChevronDown, Phone, X, ChevronRight, MailIcon, Shield } from "lucide-react"

const categories = [
  {
    title: "Sobre o pacote",
    faqs: [
      {
        q: "O que é a Conviva Saúde?",
        a: "A Conviva Saúde é um pacote particular de benefícios voltado ao envelhecimento saudável para pessoas com 60 anos ou mais em BH e região. Não somos um plano de saúde. Oferecemos médico de referência, enfermeiro dedicado, equipe multidisciplinar e Pronto atendimento do idoso por R$ 329/mês, independente da idade.",
      },
      {
        q: "Qual a diferença entre a Conviva e um plano de saúde?",
        a: "Os planos de saúde convencionais para idosos em BH custam em média R$ 1.500/mês, têm reajuste anual por faixa etária, carência e filas longas. A Conviva oferece cuidado geriátrico coordenado por R$ 329/mês, o mesmo valor para qualquer idade, sem carência e com atendimento rápido. Não substituímos um plano de saúde, mas oferecemos um cuidado muito mais próximo e especializado.",
      },
      {
        q: "O que está incluído no pacote?",
        a: "Médico de referência dedicado, enfermeiro de referência, equipe multidisciplinar (fisioterapeuta, psicólogo, nutricionista, fonoaudiólogo, terapeuta ocupacional, farmacêutico, educador físico e mais), Pronto Cuidar (atendimento de emergência para o idoso), suporte à família e descontos em medicamentos e outros benefícios.",
      },
      {
        q: "O que é o Pronto Cuidar?",
        a: "O Pronto Cuidar é o pronto atendimento exclusivo para idosos da Mais60 Saúde. É acionado em situações de urgência através de um agendamento, para que o idoso não precise esperar em filas. Não substitui o SAMU ou hospital em emergências graves.",
      },
      {
        q: "Onde o atendimento acontece?",
        a: "Nas clínicas da Mais60 Saúde em BH (Barro Preto, Santo Agostinho, Santa Efigênia e Pampulha).",
      },
    ],
  },
  {
    title: "Contratação e pagamento",
    faqs: [
      {
        q: "Quanto custa o pacote Conviva?",
        a: "R$ 329/mês — o mesmo valor para qualquer idade. Não importa se seu familiar tem 60, 70, 80 ou 90 anos: o valor é fixo e não sofre reajuste por faixa etária.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "O pagamento é mensal e recorrente. Nossa equipe apresenta as formas de pagamento disponíveis durante o processo de contratação pelo WhatsApp.",
      },
      {
        q: "Tem carência?",
        a: "Não. O cuidado começa imediatamente após a contratação, sem período de espera.",
      },
      {
        q: "Tem fidelidade mínima?",
        a: "Não. Você pode cancelar quando quiser, sem multa, com 30 dias de antecedência.",
      },
      {
        q: "Posso contratar para outra pessoa?",
        a: "Sim! Você pode contratar para um familiar — pai, mãe, avó, cônjuge. O processo é feito pelo responsável ou familiar, de forma 100% digital.",
      },
    ],
  },
  {
    title: "Atendimento e cuidado",
    faqs: [
      {
        q: "Como funciona o médico de referência?",
        a: "Seu familiar terá um médico geriatra dedicado que o acompanha continuamente, não só em consultas avulsas quando está doente. Esse médico conhece o histórico, as medicações e as necessidades do seu familiar.",
      },
      {
        q: "O que é o enfermeiro de referência?",
        a: "É o profissional que coordena toda a jornada de cuidado do seu familiar. Ele agenda consultas, acompanha exames, orienta sobre medicações e mantém a família informada por WhatsApp.",
      },
      {
        q: "Em quanto tempo consigo o primeiro atendimento?",
        a: "Em até 48 horas após a contratação, agendamos a avaliação inicial com o médico e enfermeiro de referência.",
      },
      {
        q: "Posso contratar morando fora de BH?",
        a: "Sim, desde que seu familiar more em BH ou região e consiga se locomover para realizar as consultas em alguma unidade. O processo de contratação é 100% digital — você pode estar em qualquer cidade.",
      },
    ],
  },
  {
    title: "Dúvidas gerais",
    faqs: [
      {
        q: "A Conviva substitui o plano de saúde?",
        a: "Não. A Conviva é um pacote complementar ou alternativo para quem não tem plano ou não consegue mais pagar. Para internações hospitalares e cirurgias, um plano de saúde convencional ainda é necessário. A Conviva cuida do dia a dia da saúde do idoso com muito mais proximidade e especialização.",
      },
      {
        q: "Como funciona a comunicação com a família?",
        a: "O enfermeiro de referência mantém contato regular, informando sobre consultas, exames, medicações e qualquer intercorrência. Você sabe como seu familiar está sem precisar estar presente o tempo todo.",
      },
      {
        q: "Ainda tenho dúvidas. Como falo com vocês?",
        a: "Fale com nossa equipe pelo WhatsApp — respondemos em até 24 horas. Você também pode preencher o formulário no site e entraremos em contato.",
      },
    ],
  },
]

export default function FaqPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [showModal, setShowModal] = useState(false)
  const [convenio, setConvenio] = useState("")

  function toggle(key: string) {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.svg" alt="Conviva Saúde" className="h-20 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              ["Sobre nós", "/sobre"],
              // ["Como funciona", "/como-funciona"],
              ["Unidades", "/unidades"],
              ["FAQ", "/faq"],
              ["Blog", "/blog"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/">← Voltar ao site</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/contratar">Contratar agora</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-24"
          style={{ animation: "faqFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0s" }}
        >
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
              Central de ajuda
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6">
              Tire suas dúvidas sobre a Conviva Saúde
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Encontre respostas rápidas sobre o pacote, contratação, atendimento e muito mais.
            </p>

            {/* Banner aviso */}
            <div
              className="mt-6 flex items-start gap-3 rounded-xl px-5 py-4"
              style={{
                border: "2px solid color-mix(in oklch, var(--primary) 30%, transparent)",
                background: "color-mix(in oklch, var(--primary) 5%, var(--background))",
              }}
            >
              <Info className="size-5 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
              <p className="text-sm leading-relaxed">
                <span className="font-semibold" style={{ color: "var(--primary)" }}>
                  Lembre-se: a Conviva Saúde não é um plano de saúde.
                </span>{" "}
                Somos um pacote particular de benefícios e cuidado contínuo para o idoso. Tudo isso sem carência.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ por categorias ────────────────────────────────────────── */}
        <section
          className="pb-20"
          style={{ animation: "faqFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.15s" }}
        >
          <div className="mx-auto max-w-3xl px-6 flex flex-col gap-12">
            {categories.map((cat, ci) => (
              <div key={cat.title}>
                {/* Categoria header */}
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--primary)" }}
                  >
                    {cat.title}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                </div>

                {/* Perguntas */}
                <div className="flex flex-col">
                  {cat.faqs.map(({ q, a }, qi) => {
                    const key = `${ci}-${qi}`
                    const isOpen = !!open[key]
                    return (
                      <div
                        key={qi}
                        style={{ borderBottom: "1px solid var(--border)" }}
                      >
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-start justify-between gap-4 py-4 text-left"
                        >
                          <span className="text-sm font-medium leading-relaxed">{q}</span>
                          <ChevronDown
                            className="size-4 shrink-0 mt-0.5 transition-transform duration-200"
                            style={{
                              color: "var(--muted-foreground)",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          />
                        </button>
                        {isOpen && (
                          <p
                            className="text-sm leading-relaxed pb-4"
                            style={{
                              color: "var(--muted-foreground)",
                              animation: "faqFadeUp 0.2s ease both",
                            }}
                          >
                            {a}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA final ─────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ background: "var(--primary)", animation: "faqFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.3s" }}
        >
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
              style={{ color: "var(--primary-foreground)" }}
            >
              Ainda tem dúvidas?
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}
            >
              Nossa equipe responde em até 2 horas úteis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "var(--primary-foreground)", color: "var(--primary)" }}
              >
                <Phone className="size-4" />
                Falar com a equipe
              </button>
              <Link
                href="/contratar"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "transparent",
                  color: "var(--primary-foreground)",
                  border: "2px solid color-mix(in oklch, var(--primary-foreground) 40%, transparent)",
                }}
              >
                Contratar agora
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-center">
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            © 2026 Conviva Saúde. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ── Modal de contato ──────────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, color-mix(in oklch, var(--primary) 8%, var(--card)), color-mix(in oklch, var(--accent) 30%, var(--card)))",
              border: "1px solid color-mix(in oklch, var(--primary) 20%, var(--border))",
              boxShadow: "0 8px 48px rgba(0,0,0,0.2)",
            }}
          >
            <div className="px-6 pt-6 pb-5 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <MailIcon className="size-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-base font-semibold">Fale com nossa equipe</p>
                  <p className="text-xs text-muted-foreground">Respondemos em até 2 horas úteis</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground/70">Nome <span className="text-destructive">*</span></label>
                  <input type="text" placeholder="Seu nome completo" required className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground/70">WhatsApp <span className="text-destructive">*</span></label>
                  <input type="tel" placeholder="(31) 9 0000-0000" required className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground/70">E-mail <span className="text-muted-foreground font-normal">(opcional)</span></label>
                <input type="email" placeholder="seu@email.com" className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground/70">Tem convênio de saúde? <span className="text-destructive">*</span></label>
                <div className="relative">
                  <select value={convenio} onChange={(e) => setConvenio(e.target.value)} required className="w-full appearance-none rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-foreground pr-9">
                    <option value="">Selecione uma opção</option>
                    <option value="sim">Sim, tenho convênio</option>
                    <option value="nao">Não tenho convênio</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground rotate-90 pointer-events-none" />
                </div>
              </div>
              {convenio === "sim" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground/70">Qual convênio?</label>
                  <input type="text" placeholder="Ex: Unimed, Hapvida…" className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60" />
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground/70">Mensagem <span className="text-muted-foreground font-normal">(opcional)</span></label>
                <textarea rows={3} placeholder="Conta um pouco sobre a situação do seu familiar…" className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60 resize-none" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] mt-1" style={{ background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: "0 4px 16px color-mix(in oklch, var(--primary) 30%, transparent)" }}>
                Enviar mensagem
                <ArrowRight className="size-4" />
              </button>
              <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <Shield className="size-3 shrink-0" />
                Seus dados estão seguros. Não compartilhamos com terceiros.
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes faqFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}
