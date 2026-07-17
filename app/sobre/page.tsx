"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Activity, Users, CheckCircle, Phone, Info, MapPin, Star, X, MailIcon } from "lucide-react"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import MobileCarousel from "@/components/MobileCarousel"


const values = [
  { icon: Heart, title: "Humanidade", desc: "Tratamos cada pessoa como única, com respeito à sua história e individualidade." },
  { icon: Shield, title: "Acessibilidade", desc: "Saúde de qualidade não pode ser privilégio. Nosso preço é fixo e justo para todos." },
  { icon: Activity, title: "Continuidade", desc: "Cuidado que acompanha, não só atende quando a doença aparece." },
  { icon: Users, title: "Parceria", desc: "Família e equipe trabalhando juntas pelo bem-estar do idoso." },
  { icon: CheckCircle, title: "Transparência", desc: "Sem letras miúdas, sem surpresas. Você sabe exatamente o que está contratando." },
]

export default function SobrePage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28" style={{ animation: "fadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0s" }}>
          <div className="mx-auto max-w-6xl px-6">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--primary)" }}
            >
              Quem somos
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 max-w-3xl">
              Nascemos para mudar o jeito de cuidar da saúde após os 60
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
              A Conviva Saúde nasceu com o propósito de oferecer a pessoa idosa um cuidado humano, acessível e sem burocracia.
            </p>

            {/* Banner aviso */}
            <div
              className="mt-6 flex items-start gap-3 rounded-xl px-5 py-4"
              style={{
                border: "2px solid color-mix(in oklch, var(--primary) 30%, transparent)",
                background: "color-mix(in oklch, var(--primary) 5%, var(--background))",
                animation: "fadeUp 0.6s ease forwards",
                opacity: 0,
                animationDelay: "0.1s",
              }}
            >
              <Info className="size-5 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
              <p className="text-sm leading-relaxed">
                <span className="font-semibold" style={{ color: "var(--primary)" }}>
                  A Conviva Saúde não é um plano de saúde.
                </span>{" "}
                Somos um pacote particular de benefícios e cuidado contínuo voltado ao envelhecimento saudável.
              </p>
            </div>

            {/* Foto principal */}
            <div
              className="relative w-full rounded-2xl overflow-hidden h-72 md:h-[420px] mt-10"
              style={{
                animation: "fadeUp 0.6s ease forwards",
                opacity: 0,
                animationDelay: "0.2s",
              }}
            >
              <Image
                src="/images/shutterstock_2169381397.jpg"
                alt="Cuidado com idosos, Conviva Saúde"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* ── Nossa história ────────────────────────────────────────────── */}
        <section className="py-20 md:py-28" style={{ borderTop: "1px solid var(--border)", animation: "fadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.3s" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--primary)" }}
              >
                Nossa história
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Como a Conviva nasceu
              </h2>
              <div className="flex flex-col gap-5" style={{ color: "var(--muted-foreground)" }}>
                <p className="text-base leading-relaxed">
                  A história da Conviva começa com algo que muita família no Brasil conhece bem: a dificuldade de encontrar um cuidado de saúde que realmente acompanhe o idoso no dia a dia, não só quando ele está doente. Consultas marcadas com semanas de antecedência, médicos diferentes a cada visita, familiares sem informação sobre o que está acontecendo. E, para quem quer algo mais próximo, planos de saúde com altos valores de mensalidades, reajustados todo ano conforme a idade avança.
                </p>
                <p className="text-base leading-relaxed">
                  Foi desse incômodo que a Conviva Saúde nasceu. Queríamos criar algo diferente: um pacote de cuidado de geriatria e gerontologia com preço fixo e acessível. A nossa ideia sempre foi colocar o idoso no centro. Com médico de referência que o conhece de verdade, enfermeiro dedicado que mantém a família informada e uma equipe multidisciplinar pronta para o que precisar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Preço destaque ────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28 relative overflow-hidden"
          style={{ background: "var(--primary)", color: "var(--background)", borderTop: "1px solid var(--border)" }}
        >
          {/* Ghost "329" decorativo */}
          <div
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
            aria-hidden="true"
          >
            <span
              className="font-black leading-none"
              style={{
                fontSize: "clamp(16rem, 55vw, 52rem)",
                color: "color-mix(in oklch, var(--background) 4%, transparent)",
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              329
            </span>
          </div>

          <div className="mx-auto max-w-3xl px-6 relative z-10 text-center">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.25em] mb-10"
              style={{ color: "color-mix(in oklch, var(--background) 40%, transparent)" }}
            >
              Valor mensal · qualquer idade
            </p>

            {/* Preço tipográfico */}
            <div className="flex items-start justify-center mb-10" style={{ lineHeight: 1 }}>
              <span
                className="text-2xl font-bold mt-3 mr-1"
                style={{ color: "color-mix(in oklch, var(--background) 50%, transparent)" }}
              >
                R$
              </span>
              <span
                className="font-black tracking-tighter"
                style={{ fontSize: "clamp(6rem, 22vw, 14rem)", lineHeight: 0.88 }}
              >
                329
              </span>
              <span
                className="text-xl font-medium self-end ml-1.5 mb-3"
                style={{ color: "color-mix(in oklch, var(--background) 50%, transparent)" }}
              >
                /mês
              </span>
            </div>

            {/* Divisor */}
            <div
              className="w-10 h-px mx-auto mb-10"
              style={{ background: "color-mix(in oklch, var(--background) 22%, transparent)" }}
            />

            {/* Copy emocional */}
            <p className="text-lg md:text-xl font-semibold leading-snug mb-3">
              Uma diária de UTI custa, em média, R$&nbsp;3.000.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "color-mix(in oklch, var(--background) 62%, transparent)" }}
            >
              O cuidado que evita esse dia custa R$&nbsp;329 por mês.
            </p>

            {/* CTA */}
            <Link
              href="/contratar"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold mt-10 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
            >
              Ver planos e contratar
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* ── Valores ───────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28" style={{ borderTop: "1px solid var(--border)", animation: "fadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.4s" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--primary)" }}
              >
                Nossos valores
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                O que nos guia
              </h2>
            </div>

            <MobileCarousel desktopClass="md:grid md:grid-cols-2 md:gap-4" mobileWrapClass="max-w-3xl mx-auto">
              {values.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className={`flex flex-col gap-3 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md${i === 4 ? " md:col-span-2 md:max-w-sm md:mx-auto" : ""}`}
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="size-9 rounded-xl flex items-center justify-center shrink-0"
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
            </MobileCarousel>
          </div>
        </section>

        {/* ── Parceria Mais60 ───────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ borderTop: "1px solid var(--border)", background: "var(--muted)", animation: "fadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.5s" }}
        >
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-10">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--primary)" }}
              >
                Nossa parceria
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                O cuidado acontece na Mais60 Saúde
              </h2>
              <div className="flex flex-col gap-4 max-w-2xl mx-auto text-left" style={{ color: "var(--muted-foreground)" }}>
                <p className="text-base leading-relaxed">
                  A Conviva Saúde opera em parceria exclusiva com a Mais60 Saúde, clínica referência nacional em geriatria, com mais de 10 anos de experiência e presença em Belo Horizonte e Região Metropolitana.
                </p>
                <p className="text-base leading-relaxed">
                  A Mais60 atende milhares de idosos por meio de uma equipe multidisciplinar, quem conta com geriatra, enfermeiro navegador, fisioterapeuta, psicólogo, nutricionista, fonoaudiólogo, terapeuta ocupacional, farmacêutico, educador físico e outras especialidades.
                </p>
                <p className="text-base leading-relaxed">
                  Quando você contrata a Conviva Saúde, seu familiar passa a ser atendido dentro dessa estrutura, com toda a expertise geriátrica da Mais60 e o modelo de acesso simplificado e acessível da Conviva.
                </p>
              </div>
            </div>

            {/* Cards diferenciais Mais60 */}
            <div className="mb-10">
              <MobileCarousel desktopClass="md:grid md:grid-cols-3 md:gap-4">
                {[
                  { icon: MapPin, title: "5 unidades em BH", desc: "Barro Preto, Santo Agostinho, Santa Efigênia, Pampulha e uma unidade exclusiva do Pronto Cuidar." },
                  { icon: Star, title: "Referência em geriatria", desc: "Mais de 10 anos cuidando de idosos com foco em reabilitação, prevenção e qualidade de vida." },
                  { icon: Users, title: "Equipe multidisciplinar completa", desc: "Especialistas que trabalham de forma coordenada pelo seu bem-estar ou do seu familiar." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-3 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="size-9 rounded-xl flex items-center justify-center shrink-0"
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
              </MobileCarousel>
            </div>

            <div className="text-center">
              <img
                src="https://mais60saude.com.br/wp-content/uploads/2023/07/logomais60.png"
                alt="Mais60 Saúde"
                width={213}
                height={64}
                className="h-16 w-auto object-contain mx-auto"
              />
              <div className="mt-5">
                <a
                  href="https://mais60saude.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
                  style={{ color: "var(--primary)" }}
                >
                  Conheça a Mais60 Saúde
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA final ─────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28" style={{ background: "var(--primary)" }}>
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
              style={{ color: "var(--primary-foreground)" }}
            >
              Pronto para conhecer a Conviva?
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}
            >
              Fale com nossa equipe ou contrate agora mesmo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="inverted" onClick={() => setShowModal(true)}>
                <Phone className="size-4" />
                Falar com a equipe
              </Button>
              <Button variant="outline-inverted" asChild>
                <Link href="/contratar">
                  Contratar agora
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />

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
            {/* Header */}
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

            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              <ContactForm showCard={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
