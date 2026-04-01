"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, ImageIcon, Heart, Activity, Leaf, Shield, Users, Phone } from "lucide-react"

const articles = [
  { category: "Saúde preventiva", title: "Como prevenir quedas em idosos: guia completo para familiares", read: "5 min" },
  { category: "Nutrição", title: "Alimentação saudável após os 60: o que muda e como adaptar", read: "4 min" },
  { category: "Saúde mental", title: "Solidão no idoso: como identificar e o que fazer", read: "6 min" },
  { category: "Medicamentos", title: "Polifarmácia: os riscos de tomar muitos remédios na velhice", read: "7 min" },
  { category: "Família", title: "Como conversar com seus pais sobre a necessidade de cuidado", read: "5 min" },
  { category: "Exercícios", title: "Atividade física após os 70: o que é seguro e o que evitar", read: "4 min" },
]

const topics = [
  { icon: Heart, title: "Saúde preventiva", desc: "Dicas para prevenir doenças e manter a saúde em dia após os 60." },
  { icon: Activity, title: "Saúde mental", desc: "Bem-estar emocional, solidão, depressão e qualidade de vida no envelhecimento." },
  { icon: Leaf, title: "Nutrição", desc: "Alimentação adequada para idosos e como adaptar a dieta com o passar dos anos." },
  { icon: Shield, title: "Medicamentos", desc: "Uso seguro de remédios, polifarmácia e orientações para cuidadores." },
  { icon: Users, title: "Para familiares", desc: "Como cuidar de quem você ama sem abrir mão da sua própria vida." },
  { icon: Activity, title: "Exercícios", desc: "Atividade física segura e indicada para cada faixa etária acima dos 60." },
]

export default function BlogPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

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
          style={{ animation: "blFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0s" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
              Blog de saúde
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 max-w-3xl">
              Dicas e conteúdo sobre saúde após os 60
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
              Informações confiáveis sobre envelhecimento saudável, cuidado geriátrico e qualidade de vida para idosos e seus familiares.
            </p>

            {/* Banner em breve */}
            <div
              className="flex items-start gap-3 rounded-xl px-5 py-4 mt-6"
              style={{ border: "2px solid #fde68a", background: "#fffbeb" }}
            >
              <Clock className="size-5 shrink-0 mt-0.5" style={{ color: "#f59e0b" }} />
              <div>
                <p className="text-sm leading-relaxed" style={{ color: "#92400e" }}>
                  <span className="font-semibold">Nosso blog está chegando!</span>{" "}
                  Em breve publicaremos conteúdo semanal sobre saúde do idoso, dicas de bem-estar e novidades da Conviva Saúde. Deixe seu e-mail para ser avisado quando publicarmos.
                </p>

                {/* Input de e-mail */}
                <div className="mt-4">
                  {submitted ? (
                    <p className="text-sm font-medium" style={{ color: "#065f46" }}>
                      ✓ Anotado! Você será avisado assim que publicarmos.
                    </p>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                        style={{ border: "1.5px solid #fde68a", background: "white", color: "#1c1917" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#f59e0b")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#fde68a")}
                      />
                      <button
                        onClick={() => email && setSubmitted(true)}
                        className="rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:opacity-90 whitespace-nowrap"
                        style={{ background: "#f59e0b", color: "white" }}
                      >
                        Me avise quando publicar
                      </button>
                    </div>
                  )}
                  <p className="text-xs mt-2" style={{ color: "#a16207" }}>Sem spam. Só conteúdo relevante.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Artigos em breve ──────────────────────────────────────────── */}
        <section
          className="py-12 md:py-16"
          style={{ borderTop: "1px solid var(--border)", animation: "blFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.15s" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary)" }}>
                Em breve
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                O que vem por aí
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {articles.map(({ category, title, read }) => (
                <div
                  key={title}
                  className="relative rounded-2xl overflow-hidden opacity-75 cursor-default"
                  style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                >
                  {/* Placeholder imagem */}
                  <div className="relative h-40 bg-muted/50 flex items-center justify-center">
                    <ImageIcon className="size-8 opacity-20 text-muted-foreground" />
                    {/* Badge Em breve */}
                    <span
                      className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: "#fef3c7", color: "#92400e" }}
                    >
                      Em breve
                    </span>
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "var(--primary)" }}
                    >
                      {category}
                    </span>
                    <p className="text-sm font-semibold leading-snug">{title}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {read} de leitura
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Temas que vamos cobrir ────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ borderTop: "1px solid var(--border)", background: "var(--muted)", animation: "blFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.25s" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                Categorias
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Conteúdo pensado para você
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {topics.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-3 p-5 rounded-2xl"
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

        {/* ── CTA final ─────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ background: "var(--primary)", animation: "blFadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.35s" }}
        >
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
              style={{ color: "var(--primary-foreground)" }}
            >
              Cuide de quem você ama hoje
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}
            >
              Enquanto o blog não chega, nossa equipe está pronta para tirar todas as suas dúvidas.
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
        @keyframes blFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}
