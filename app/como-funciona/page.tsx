"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, Info, ImageIcon,
  MessageCircle, CheckSquare, Calendar, Heart, Bell,
  UserCheck, Phone, Shield, RefreshCw, Users, ChevronDown,
} from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    title: "Fale com nossa equipe",
    text: "Entre em contato pelo WhatsApp ou preencha o formulário no site. Nossa equipe responde em até 2 horas úteis e entende a situação do seu familiar sem pressa e sem compromisso.",
  },
  {
    icon: CheckSquare,
    title: "Escolha o pacote",
    text: "Apresentamos o Conviva Essencial — R$ 329/mês, o mesmo valor para qualquer idade. Sem letras miúdas, sem surpresas. Você decide na hora que quiser.",
  },
  {
    icon: Calendar,
    title: "Avaliação inicial em até 48h",
    text: "Agendamos uma avaliação com o médico e o enfermeiro de referência na unidade mais próxima. Juntos, montam um programa de cuidado personalizado para o seu familiar.",
  },
  {
    icon: Heart,
    title: "Cuidado coordenado começa",
    text: "Seu familiar passa a ter um médico e um enfermeiro de referência dedicados. Consultas, exames, medicações e Pronto Cuidar 24h — tudo coordenado por uma equipe que o conhece de verdade.",
  },
  {
    icon: Bell,
    title: "Família sempre informada",
    text: "A família recebe atualizações contínuas pelo WhatsApp. Você sabe como seu familiar está, sem precisar estar presente o tempo todo.",
  },
]

const benefits = [
  { icon: UserCheck, title: "Médico de referência", desc: "Um médico que acompanha seu familiar continuamente — não só quando está doente." },
  { icon: Heart, title: "Enfermeiro de referência", desc: "Ponto de contato dedicado que coordena toda a jornada de cuidado." },
  { icon: Users, title: "Equipe multidisciplinar", desc: "10 especialidades: fisioterapeuta, psicólogo, nutricionista, fonoaudiólogo e mais." },
  { icon: Phone, title: "Pronto Cuidar 24h", desc: "Pronto atendimento exclusivo para idosos, disponível a qualquer hora. Com coparticipação." },
  { icon: Shield, title: "Sem carência", desc: "O cuidado começa imediatamente após a contratação. Sem período de espera." },
  { icon: RefreshCw, title: "Sem fidelidade", desc: "Cancele quando quiser, sem multa e sem burocracia." },
]

const faqs = [
  {
    q: "Posso contratar para minha mãe que mora em BH sendo eu de outra cidade?",
    a: "Sim! O processo de contratação é 100% digital. Você faz tudo pelo WhatsApp ou pelo site, e nossa equipe cuida de toda a parte presencial com seu familiar.",
  },
  {
    q: "O Pronto Cuidar substitui uma UPA ou hospital?",
    a: "Não. O Pronto Cuidar é um serviço de pronto atendimento para situações de urgência do idoso, com coparticipação sobre o valor do pacote. Para emergências graves, o SAMU e hospitais continuam sendo o caminho.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Não há fidelidade mínima. Basta entrar em contato com nossa equipe com 30 dias de antecedência.",
  },
  {
    q: "A Conviva é um plano de saúde?",
    a: "Não. A Conviva Saúde é um pacote particular de benefícios voltado ao envelhecimento saudável. Não somos regulados pela ANS e não substituímos um plano de saúde convencional — mas oferecemos um cuidado muito mais próximo, especializado e acessível para quem tem 60 anos ou mais.",
  },
]

export default function ComoFuncionaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
              ["Como funciona", "/como-funciona"],
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
          style={{ animation: "cfFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0s" }}
        >
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
              Como funciona
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 max-w-3xl">
              Do primeiro contato ao cuidado coordenado — sem complicação
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
              Entenda como funciona o pacote Conviva e como seu familiar começa a ser cuidado em poucos dias.
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
                  A Conviva Saúde não é um plano de saúde.
                </span>{" "}
                Somos um pacote particular de benefícios — sem ANS, sem carência, sem reajuste por faixa etária. R$ 329/mês para qualquer idade.
              </p>
            </div>
          </div>
        </section>

        {/* ── Timeline ──────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ borderTop: "1px solid var(--border)", animation: "cfFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.15s" }}
        >
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
              O fluxo completo
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">
              Como o cuidado começa
            </h2>

            <div className="relative flex flex-col gap-0">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="flex gap-6 relative">
                  {/* Linha vertical */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="size-10 rounded-xl flex items-center justify-center z-10 shrink-0"
                      style={{
                        background: "color-mix(in oklch, var(--primary) 12%, var(--background))",
                        border: "2px solid color-mix(in oklch, var(--primary) 25%, var(--border))",
                      }}
                    >
                      <Icon className="size-4" style={{ color: "var(--primary)" }} />
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="w-px flex-1 my-1"
                        style={{ background: "color-mix(in oklch, var(--primary) 20%, var(--border))", minHeight: "2.5rem" }}
                      />
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className={`pb-10${i === steps.length - 1 ? " pb-0" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
                        0{i + 1}
                      </span>
                      <h3 className="text-base font-semibold">{title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── O que está incluído ───────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ borderTop: "1px solid var(--border)", background: "var(--muted)", animation: "cfFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.25s" }}
        >
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                O que está incluído
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Tudo no mesmo pacote
              </h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                R$ 329/mês — sem reajuste por idade, sem carência, sem fidelidade
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-3 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "color-mix(in oklch, var(--primary) 12%, var(--card))" }}
                  >
                    <Icon className="size-4" style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ borderTop: "1px solid var(--border)", animation: "cfFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.35s" }}
        >
          <div className="mx-auto max-w-2xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
              Dúvidas comuns
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Perguntas frequentes
            </h2>

            <div className="flex flex-col">
              {faqs.map(({ q, a }, i) => {
                const isOpen = openFaq === i
                return (
                  <div
                    key={i}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-4 py-5 text-left transition-colors hover:text-foreground"
                      style={{ color: isOpen ? "var(--foreground)" : "var(--foreground)" }}
                    >
                      <span className="text-sm font-semibold leading-relaxed">{q}</span>
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
                        className="text-sm leading-relaxed pb-5"
                        style={{ color: "var(--muted-foreground)", animation: "cfFadeUp 0.2s ease both" }}
                      >
                        {a}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Foto grande ───────────────────────────────────────────────── */}
        <div
          className="mx-auto max-w-6xl px-6"
          style={{ animation: "cfFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.45s" }}
        >
          <div className="relative w-full rounded-2xl overflow-hidden h-64 md:h-80 bg-muted/50 my-16">
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 text-muted-foreground">
              <ImageIcon className="size-10 opacity-30" />
              <p className="text-sm opacity-50">[ foto: atendimento humanizado / consulta geriátrica ]</p>
            </div>
          </div>
        </div>

        {/* ── CTA final ─────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ background: "var(--primary)", animation: "cfFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.5s" }}
        >
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
              style={{ color: "var(--primary-foreground)" }}
            >
              Pronto para começar?
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}
            >
              Fale com nossa equipe agora ou contrate diretamente pelo site.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "var(--primary-foreground)", color: "var(--primary)" }}
              >
                <Phone className="size-4" />
                Falar pelo WhatsApp
              </a>
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

      <style>{`
        @keyframes cfFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}
