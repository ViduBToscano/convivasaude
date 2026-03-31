"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Info, ChevronDown, Phone } from "lucide-react"

const categories = [
  {
    title: "Sobre o pacote",
    faqs: [
      {
        q: "O que é a Conviva Saúde?",
        a: "A Conviva Saúde é um pacote particular de benefícios voltado ao envelhecimento saudável para pessoas com 60 anos ou mais em BH e região. Não somos um plano de saúde — oferecemos médico de referência, enfermeiro dedicado, equipe multidisciplinar e Pronto Cuidar 24h por R$ 329/mês, independente da idade.",
      },
      {
        q: "Qual a diferença entre a Conviva e um plano de saúde?",
        a: "Os planos de saúde convencionais para idosos em BH custam em média R$ 1.500/mês, têm reajuste anual por faixa etária, carência e filas longas. A Conviva oferece cuidado geriátrico coordenado por R$ 329/mês — o mesmo valor para qualquer idade, sem carência e com atendimento em até 48h. Não substituímos um plano de saúde, mas oferecemos um cuidado muito mais próximo e especializado.",
      },
      {
        q: "O que está incluído no pacote?",
        a: "Médico de referência dedicado, enfermeiro de referência, equipe multidisciplinar com 10 especialidades (fisioterapeuta, psicólogo, nutricionista, fonoaudiólogo, terapeuta ocupacional, farmacêutico, educador físico e mais), Pronto Cuidar 24h (com coparticipação) e suporte à família por WhatsApp.",
      },
      {
        q: "O que é o Pronto Cuidar?",
        a: "O Pronto Cuidar é o pronto atendimento exclusivo para idosos da Mais60 Saúde, disponível 24 horas. É acionado em situações de urgência e tem coparticipação sobre o valor do pacote. Não substitui o SAMU ou hospital em emergências graves.",
      },
      {
        q: "Onde o atendimento acontece?",
        a: "Nas clínicas da Mais60 Saúde em BH e região — Barro Preto, Santo Agostinho, Santa Efigênia, Pampulha e Betim. Atendemos pessoas que moram num raio de até 50km de BH.",
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
        a: "Seu familiar terá um médico geriatra dedicado que o acompanha continuamente — não só em consultas avulsas quando está doente. Esse médico conhece o histórico, as medicações e as necessidades do seu familiar.",
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
        a: "Sim, desde que seu familiar more em BH ou num raio de até 50km. O processo de contratação é 100% digital — você pode estar em qualquer cidade.",
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
        a: "O enfermeiro de referência mantém contato regular com a família por WhatsApp — informando sobre consultas, exames, medicações e qualquer intercorrência. Você sabe como seu familiar está sem precisar estar presente o tempo todo.",
      },
      {
        q: "Ainda tenho dúvidas. Como falo com vocês?",
        a: "Fale com nossa equipe pelo WhatsApp — respondemos em até 2 horas úteis. Você também pode preencher o formulário no site e entraremos em contato.",
      },
    ],
  },
]

export default function FaqPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({})

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
                Somos um pacote particular de benefícios — sem ANS, sem carência, sem reajuste por faixa etária.
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
        @keyframes faqFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}
