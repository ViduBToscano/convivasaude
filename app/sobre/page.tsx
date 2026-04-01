"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Activity, Users, CheckCircle, Phone, Info, MapPin, Star, X, ChevronRight, MailIcon } from "lucide-react"

const stats = [
  { value: "R$ 329", label: "Mesmo valor para qualquer idade" },
  { value: "10+", label: "Especialidades no pacote" },
  { value: "24h", label: "Através do Pronto Cuidar e do Teleatendimento" },
]

const values = [
  { icon: Heart, title: "Humanidade", desc: "Tratamos cada pessoa como única, com respeito à sua história e individualidade." },
  { icon: Shield, title: "Acessibilidade", desc: "Saúde de qualidade não pode ser privilégio. Nosso preço é fixo e justo para todos." },
  { icon: Activity, title: "Continuidade", desc: "Cuidado que acompanha, não só atende quando a doença aparece." },
  { icon: Users, title: "Parceria", desc: "Família e equipe trabalhando juntas pelo bem-estar do idoso." },
  { icon: CheckCircle, title: "Transparência", desc: "Sem letras miúdas, sem surpresas. Você sabe exatamente o que está contratando." },
]

export default function SobrePage() {
  const [showModal, setShowModal] = useState(false)
  const [convenio, setConvenio] = useState("")

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
        <section className="py-16 md:py-24" style={{ animation: "sbFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0s" }}>
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
                animation: "sbFadeUp 0.6s ease forwards",
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
            </div>

            {/* Foto principal */}
            <div
              className="relative w-full rounded-2xl overflow-hidden h-72 md:h-[420px] mt-10"
              style={{
                animation: "sbFadeUp 0.6s ease forwards",
                opacity: 0,
                animationDelay: "0.2s",
              }}
            >
              <Image
                src="/images/shutterstock_2169381397.jpg"
                alt="Cuidado com idosos — Conviva Saúde"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* ── Nossa história ────────────────────────────────────────────── */}
        <section className="py-16 md:py-20" style={{ borderTop: "1px solid var(--border)", animation: "sbFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.3s" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--primary)" }}
              >
                Nossa história
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
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

        {/* ── Números ───────────────────────────────────────────────────── */}
        <section className="py-14 md:py-20" style={{ borderTop: "1px solid var(--border)", background: "var(--muted)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="text-3xl md:text-4xl font-bold leading-none mb-2"
                    style={{ color: "var(--primary)" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs leading-snug" style={{ color: "var(--muted-foreground)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Valores ───────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ borderTop: "1px solid var(--border)", animation: "sbFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.4s" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--primary)" }}
              >
                Nossos valores
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                O que nos guia
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
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
            </div>
          </div>
        </section>

        {/* ── Parceria Mais60 ───────────────────────────────────────────── */}
        <section
          className="py-16 md:py-24"
          style={{ borderTop: "1px solid var(--border)", background: "var(--muted)", animation: "sbFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.5s" }}
        >
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-10">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--primary)" }}
              >
                Nossa parceria
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
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
            <div className="grid md:grid-cols-3 gap-4 mb-10">
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
            </div>

            <div className="text-center">
              <img
                src="https://mais60saude.com.br/wp-content/uploads/2023/07/logomais60.png"
                alt="Mais60 Saúde"
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
        <section className="py-16 md:py-20" style={{ background: "var(--primary)" }}>
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

            {/* Form */}
            <div className="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground/70">Nome <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    required
                    className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground/70">WhatsApp <span className="text-destructive">*</span></label>
                  <input
                    type="tel"
                    placeholder="(31) 9 0000-0000"
                    required
                    className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground/70">E-mail <span className="text-muted-foreground font-normal">(opcional)</span></label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground/70">Tem convênio de saúde? <span className="text-destructive">*</span></label>
                <div className="relative">
                  <select
                    value={convenio}
                    onChange={(e) => setConvenio(e.target.value)}
                    required
                    className="w-full appearance-none rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-foreground pr-9"
                  >
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
                  <input
                    type="text"
                    placeholder="Ex: Unimed, Hapvida…"
                    className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground/70">Mensagem <span className="text-muted-foreground font-normal">(opcional)</span></label>
                <textarea
                  rows={3}
                  placeholder="Conta um pouco sobre a situação do seu familiar…"
                  className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] mt-1"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: "0 4px 16px color-mix(in oklch, var(--primary) 30%, transparent)" }}
              >
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
        @keyframes sbFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
