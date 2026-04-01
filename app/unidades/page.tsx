"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Phone, Calendar, Clock, ExternalLink, X, ChevronRight, MailIcon, Shield } from "lucide-react"

const unidades = [
  {
    nome: "Barro Preto",
    endereco: "R. Juiz de Fora, 1071 — Barro Preto, BH",
    horario: "Seg–Sex: 7h às 22h · Sáb: 7h às 13h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Juiz+de+Fora,+1071+Barro+Preto+BH",
  },
  {
    nome: "Santo Agostinho",
    endereco: "R. Rio Grande do Sul, 1137 — Santo Agostinho, BH",
    horario: "Seg–Sex: 7h às 19h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Rio+Grande+do+Sul,+1137+Santo+Agostinho+BH",
  },
  {
    nome: "Santa Efigênia",
    endereco: "R. Padre Rolim, 850 — Santa Efigênia, BH",
    horario: "Seg–Sex: 7h às 19h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Padre+Rolim,+850+Santa+Efigenia+BH",
  },
  {
    nome: "Pampulha",
    endereco: "R. Arthur Itabirano, 262 — Pampulha, BH",
    horario: "Seg–Sex: 8h às 18h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Arthur+Itabirano,+262+Pampulha+BH",
  },
  {
    nome: "Betim",
    endereco: "R. Mato Grosso, 926 — Betim, MG",
    horario: "Seg–Sex: 7h às 19h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Mato+Grosso,+926+Betim+MG",
  },
]

const howItWorks = [
  { icon: Phone, title: "Contrate pelo WhatsApp", desc: "Fale com nossa equipe e assine o pacote sem sair de casa." },
  { icon: Calendar, title: "Agendamento em 48h", desc: "Após a contratação, agendamos a avaliação na unidade mais próxima." },
  { icon: MapPin, title: "Vá à unidade", desc: "Seu familiar é recebido pela equipe multidisciplinar na clínica." },
]

export default function UnidadesPage() {
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
        <section
          className="py-16 md:py-24"
          style={{ animation: "unFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0s" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
              Nossas unidades
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 max-w-3xl">
              O cuidado Conviva acontece perto de você
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
              Atendemos em BH e região metropolitana, nas clínicas da Mais60 Saúde — referência em geriatria em Minas Gerais.
            </p>
          </div>
        </section>

        {/* ── Mapa / Cobertura ──────────────────────────────────────────── */}
        <section
          className="py-4 md:py-6"
          style={{ animation: "unFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.1s" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
              Área de cobertura
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Área de cobertura
            </h2>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
              Atendemos Belo Horizonte e cidades num raio de até 50km — incluindo Contagem, Betim, Nova Lima, Santa Luzia, Ribeirão das Neves e região.
            </p>

            <div className="relative w-full rounded-2xl overflow-hidden h-64 md:h-80 bg-muted/50 mt-6">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 text-muted-foreground">
                <MapPin className="size-10 opacity-30" />
                <p className="text-sm opacity-50">[ mapa de cobertura — BH e região até 50km ]</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Lista de unidades ─────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ borderTop: "1px solid var(--border)", animation: "unFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.2s", marginTop: "3rem" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                Onde atendemos
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Unidades disponíveis
              </h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Todas as unidades são operadas pela Mais60 Saúde.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Cards de unidades reais */}
              {unidades.map(({ nome, endereco, horario, telefone, maps }) => (
                <div
                  key={nome}
                  className="flex flex-col gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: "color-mix(in oklch, var(--primary) 12%, var(--card))",
                        color: "var(--primary)",
                      }}
                    >
                      {nome}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="size-4 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                      <p className="text-sm leading-snug">{endereco}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="size-4 shrink-0 mt-0.5" style={{ color: "var(--muted-foreground)" }} />
                      <p className="text-sm leading-snug" style={{ color: "var(--muted-foreground)" }}>{horario}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Phone className="size-4 shrink-0 mt-0.5" style={{ color: "var(--muted-foreground)" }} />
                      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{telefone}</p>
                    </div>
                  </div>

                  <a
                    href={maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:underline mt-auto"
                    style={{ color: "var(--primary)" }}
                  >
                    <ExternalLink className="size-3.5" />
                    Ver no Google Maps
                  </a>
                </div>
              ))}

              {/* Card "Em breve" */}
              <div
                className="flex flex-col gap-3 p-5 rounded-2xl"
                style={{
                  background: "var(--muted)",
                  border: "1.5px dashed var(--border)",
                }}
              >
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit"
                  style={{
                    background: "color-mix(in oklch, var(--muted-foreground) 15%, var(--muted))",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Em breve
                </span>
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-4 shrink-0 mt-0.5 opacity-40" style={{ color: "var(--muted-foreground)" }} />
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    Nova unidade em expansão para atender ainda mais regiões da RMBH.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Como chegar ───────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ borderTop: "1px solid var(--border)", background: "var(--muted)", animation: "unFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.3s" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                Como funciona
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Como funciona o atendimento
              </h2>
              <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
                Você não precisa ir até a unidade para contratar. Todo o processo de adesão é feito pelo WhatsApp ou pelo site. A primeira visita presencial é a avaliação inicial com o médico e enfermeiro de referência, agendada em até 48h após a contratação.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {howItWorks.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div
                      className="size-10 rounded-xl flex items-center justify-center"
                      style={{ background: "color-mix(in oklch, var(--primary) 12%, var(--card))" }}
                    >
                      <Icon className="size-4" style={{ color: "var(--primary)" }} />
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: "var(--primary)" }}>0{i + 1}</span>
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

        {/* ── CTA final ─────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ background: "var(--primary)", animation: "unFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.4s" }}
        >
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
              style={{ color: "var(--primary-foreground)" }}
            >
              Quer saber qual unidade atende você?
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}
            >
              Fale com nossa equipe e descubra a unidade mais próxima da sua região.
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
        @keyframes unFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}
