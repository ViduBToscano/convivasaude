"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Check, Copy, Palette, Image as ImageIcon } from "lucide-react"
import { useState } from "react"

// ── Helpers ────────────────────────────────────────────────────────────────────

const COLORS = {
  navy:    "#1E3A5F",
  green:   "#4A9B6F",
  blue:    "#4A7FB5",
  lilac:   "#9B8EC4",
  white:   "#FFFFFF",
  gray:    "#F5F5F5",
  red:     "#E53935",
  photoA:  "#D4C5B0",
  photoB:  "#C8D8E8",
  photoC:  "#C4B4D4",
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copiado!" : "Copiar briefing"}
    </button>
  )
}

function MockupLabel({ label }: { label: string }) {
  return (
    <p className="text-xs text-muted-foreground text-center mt-3 font-medium">{label}</p>
  )
}

function CreativoHeader({ code, title, briefing }: { code: string; title: string; briefing: string }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="font-mono text-xs">{code}</Badge>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <CopyButton text={briefing} />
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "awareness", label: "Awareness" },
  { id: "conversao", label: "Conversão" },
  { id: "fotos", label: "Fotos recomendadas" },
]

// ── Briefings ─────────────────────────────────────────────────────────────────

const briefingA1 = `CRIATIVO A1 — "Um novo jeito"
Objetivo: Awareness / Apresentar a marca
Formatos: Feed 4:5 (1080×1350px), Stories 9:16 (1080×1920px), Banner 16:9 (1920×1080px)

FEED 4:5:
- Fundo dividido: esquerda verde #4A9B6F, direita foto de idosa sorrindo
- Texto (sobre fundo verde): "CONVIVA SAÚDE" uppercase pequeno branco
- Headline bold branco grande: "Um novo jeito de cuidar da saúde após os 60."
- Body branco: "R$ 329/mês para qualquer idade."
- Logo Conviva no canto inferior esquerdo

STORIES 9:16:
- Foto de idosa sorrindo ao fundo full bleed
- Overlay verde semitransparente (75%)
- Headline centralizada bold branco: "Um novo jeito de cuidar da saúde após os 60."
- Body: "R$ 329/mês · Qualquer idade"
- Logo centralizada na base

BANNER 16:9:
- Esquerda (60%): fundo verde com headline e body iguais ao Feed
- Direita (40%): foto de idosa sorrindo
- Logo no canto inferior esquerdo`

const briefingA2 = `CRIATIVO A2 — "Dona Irene"
Objetivo: Awareness / Humanizar a marca
Formatos: Feed 4:5 (1080×1350px), Stories 9:16 (1080×1920px)

FEED 4:5:
- Fundo branco
- Foto de idoso sendo atendido no topo (55% da altura)
- Headline azul escuro #1E3A5F bold: "O cuidado em acompanhar o Seu João no detalhe."
- Caixa verde #4A9B6F com texto branco: "Médico de referência dedicado ao público 60+"
- Logo + "convivasaude.com.br" na base

STORIES 9:16:
- Foto de idoso sendo atendido ao fundo inteiro
- Caixa branca na parte inferior (40%) com bordas arredondadas
- Dentro da caixa: headline azul escuro + caixa verde + logo`

const briefingC1 = `CRIATIVO C1 — Preço em destaque
Objetivo: Conversão / Gerar lead WhatsApp
Formatos: Feed 4:5 (1080×1350px), Stories 9:16 (1080×1920px), Banner 16:9 (1920×1080px)

FEED 4:5:
- Fundo inteiro azul escuro #1E3A5F
- Topo: "CONVIVA SAÚDE — BH E REGIÃO" azul médio #4A7FB5 uppercase pequeno
- Centro: "R$ 329" gigante (fonte ~120px) branco bold + "/mês" médio
- Abaixo: "Para qualquer idade. 60, 70, 80 anos — mesmo valor." branco
- Lista: ✓ Médico de referência / ✓ Pronto Cuidar 24h / ✓ Sem carência · Sem fidelidade (itens em verde #4A9B6F)
- Botão CTA verde com texto branco: "Falar pelo WhatsApp →"
- Logo branca na base

STORIES 9:16:
- Mesmo layout, verticalizado
- Preço ainda maior (~150px)

BANNER 16:9:
- Fundo azul escuro
- Esquerda (50%): preço gigante
- Direita (50%): lista de benefícios + botão CTA
- Logo centralizada na base`

const briefingC2 = `CRIATIVO C2 — Comparação de preço
Objetivo: Conversão / Quebrar objeção de preço
Formatos: Feed 4:5 (1080×1350px), Stories 9:16 (1080×1920px)

FEED 4:5:
- Layout dividido ao meio verticalmente
- ESQUERDA fundo cinza #F0F0F0:
  - Ícone ✗ vermelho #E53935
  - "Plano tradicional" texto escuro pequeno
  - "R$ 1.500+" bold grande cinza escuro
  - "Fila de meses." e "Reajuste todo ano." texto pequeno cinza
- DIREITA fundo verde #4A9B6F:
  - Ícone ✓ branco
  - "Conviva Saúde" texto branco pequeno
  - "R$ 329" bold grande branco
  - "Atendimento em 48h." e "Mesmo preço para qualquer idade." texto pequeno branco
- Rodapé branco com logo + tagline

STORIES 9:16:
- Divisão horizontal (cima/baixo)
- Cada metade ocupa 50% da altura`

const briefingC3 = `CRIATIVO C3 — Para o filho decisor
Objetivo: Conversão / Persona filho 35-55 anos
Formatos: Feed 4:5 (1080×1350px), Stories 9:16 (1080×1920px)

FEED 4:5:
- Fundo lilás #9B8EC4
- Foto de mulher ~40 anos ao telefone, aliviada (40% do topo)
- "PARA QUEM CUIDA DE QUEM AMA" uppercase branco pequeno
- Headline bold branca: "Você não precisa estar lá o tempo todo para saber que ele está bem."
- Body branco: "A Conviva cuida do seu familiar com médico de referência e Pronto Cuidar 24h. Por R$ 329/mês."
- Botão branco com texto lilás: "Conhecer a Conviva →"
- Logo branca na base

STORIES 9:16:
- Foto no topo (50% superior), fundo lilás na metade inferior
- Headline, body, botão e logo na metade inferior`

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CriativosPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">

      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-6 flex flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto">
        <div>
          <Link href="/">
            <img src="/logo.svg" alt="Conviva Saúde" className="h-16 w-auto" />
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Criativos</p>
        </div>

        <nav className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Seções
          </p>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block px-3 py-2 rounded-md text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-border">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            → Página inicial
          </Link>
          <Link href="/brandguide" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            → Brand Guide
          </Link>
          <Link href="/styleguide" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            → Sistema de Design
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 px-10 py-10">

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-border">
          <Badge className="mb-4" variant="outline">Documento interno · v1.0</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Criativos — Conviva Saúde</h1>
          <p className="text-muted-foreground mb-6">
            Mockups para apresentação ao designer. <strong>5 conceitos · 3 formatos cada.</strong>
          </p>
          {/* Palette chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <Palette className="size-4 text-muted-foreground" />
            {Object.entries({ "Navy #1E3A5F": COLORS.navy, "Verde #4A9B6F": COLORS.green, "Azul médio #4A7FB5": COLORS.blue, "Lilás #9B8EC4": COLORS.lilac }).map(([name, color]) => (
              <div key={name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border text-xs">
                <span className="size-3 rounded-full inline-block shrink-0" style={{ background: color }} />
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* ── AWARENESS ─────────────────────────────────────────────────────── */}
        <section id="awareness" className="scroll-mt-8 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ImageIcon className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest">Objetivo 1</p>
              <h2 className="text-2xl font-bold">Awareness — Apresentar a marca</h2>
            </div>
          </div>

          {/* A1 */}
          <Card className="p-6 mb-8">
            <CreativoHeader
              code="A1"
              title="Um novo jeito"
              briefing={briefingA1}
            />
            <div className="flex flex-wrap gap-8 items-start">

              {/* Feed 4:5 */}
              <div>
                <div
                  className="relative overflow-hidden"
                  style={{ width: 270, height: 338, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", display: "flex" }}
                >
                  {/* Left: green */}
                  <div style={{ width: "52%", background: COLORS.green, padding: "20px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>Conviva Saúde</p>
                      <p style={{ color: "#fff", fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>Um novo jeito de cuidar da saúde após os 60.</p>
                      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 11 }}>R$ 329/mês para qualquer idade.</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</span>
                    </div>
                  </div>
                  {/* Right: photo */}
                  <div style={{ flex: 1, background: COLORS.photoA, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: 9, color: "#7a6a58", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>[ foto idosa sorrindo ]</p>
                  </div>
                </div>
                <MockupLabel label="Feed 4:5 · 1080×1350px" />
              </div>

              {/* Stories 9:16 */}
              <div>
                <div
                  style={{ width: 180, height: 320, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", position: "relative", overflow: "hidden", background: COLORS.photoA }}
                >
                  {/* Overlay */}
                  <div style={{ position: "absolute", inset: 0, background: COLORS.green, opacity: 0.75 }} />
                  {/* Text */}
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 18px", gap: 12 }}>
                    <p style={{ color: "#fff", fontSize: 16, fontWeight: 700, textAlign: "center", lineHeight: 1.3 }}>Um novo jeito de cuidar da saúde após os 60.</p>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 10, textAlign: "center" }}>R$ 329/mês · Qualquer idade</p>
                  </div>
                  {/* Logo base */}
                  <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</span>
                  </div>
                </div>
                <MockupLabel label="Stories 9:16 · 1080×1920px" />
              </div>

              {/* Banner 16:9 */}
              <div>
                <div
                  style={{ width: 480, height: 270, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", display: "flex", overflow: "hidden" }}
                >
                  {/* Left 60% */}
                  <div style={{ width: "60%", background: COLORS.green, padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>Conviva Saúde</p>
                      <p style={{ color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>Um novo jeito de cuidar da saúde após os 60.</p>
                      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>R$ 329/mês para qualquer idade.</p>
                    </div>
                    <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</span>
                  </div>
                  {/* Right 40%: photo */}
                  <div style={{ flex: 1, background: COLORS.photoA, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: 9, color: "#7a6a58", textAlign: "center", padding: "0 10px", lineHeight: 1.4 }}>[ foto idosa ]</p>
                  </div>
                </div>
                <MockupLabel label="Banner 16:9 · 1920×1080px" />
              </div>

            </div>
          </Card>

          {/* A2 */}
          <Card className="p-6 mb-8">
            <CreativoHeader
              code="A2"
              title="Dona Irene"
              briefing={briefingA2}
            />
            <div className="flex flex-wrap gap-8 items-start">

              {/* Feed 4:5 */}
              <div>
                <div style={{ width: 270, height: 338, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", background: "#fff", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  {/* Photo top 55% */}
                  <div style={{ height: "55%", background: COLORS.photoB, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: 9, color: "#5a7a9a", textAlign: "center", padding: "0 10px", lineHeight: 1.4 }}>[ foto idoso sendo atendido ]</p>
                  </div>
                  {/* Content bottom */}
                  <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: COLORS.navy, fontWeight: 700, fontSize: 13, lineHeight: 1.35, marginBottom: 8 }}>O cuidado em acompanhar o Seu João no detalhe.</p>
                      <div style={{ background: COLORS.green, borderRadius: 6, padding: "4px 8px", display: "inline-block" }}>
                        <p style={{ color: "#fff", fontSize: 8, fontWeight: 600 }}>Médico de referência dedicado ao público 60+</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ color: COLORS.navy, fontSize: 8, fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</span>
                      <span style={{ color: "#999", fontSize: 7 }}>convivasaude.com.br</span>
                    </div>
                  </div>
                </div>
                <MockupLabel label="Feed 4:5 · 1080×1350px" />
              </div>

              {/* Stories 9:16 */}
              <div>
                <div style={{ width: 180, height: 320, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", position: "relative", overflow: "hidden", background: COLORS.photoB }}>
                  <p style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 8, color: "#5a7a9a", textAlign: "center", width: 140, lineHeight: 1.4 }}>[ foto idoso sendo atendido ]</p>
                  {/* White card bottom 40% */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "42%", background: "#fff", borderRadius: "12px 12px 0 0", padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: COLORS.navy, fontWeight: 700, fontSize: 11, lineHeight: 1.3, marginBottom: 6 }}>O cuidado em acompanhar o Seu João no detalhe.</p>
                      <div style={{ background: COLORS.green, borderRadius: 4, padding: "3px 6px", display: "inline-block" }}>
                        <p style={{ color: "#fff", fontSize: 7, fontWeight: 600 }}>Médico de referência dedicado ao 60+</p>
                      </div>
                    </div>
                    <span style={{ color: COLORS.navy, fontSize: 7, fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</span>
                  </div>
                </div>
                <MockupLabel label="Stories 9:16 · 1080×1920px" />
              </div>

            </div>
          </Card>
        </section>

        {/* ── CONVERSÃO ─────────────────────────────────────────────────────── */}
        <section id="conversao" className="scroll-mt-8 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-8 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Check className="size-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "var(--secondary)" }}>Objetivo 2</p>
              <h2 className="text-2xl font-bold">Conversão — Gerar lead e WhatsApp</h2>
            </div>
          </div>

          {/* C1 */}
          <Card className="p-6 mb-8">
            <CreativoHeader code="C1" title="Preço em destaque" briefing={briefingC1} />
            <div className="flex flex-wrap gap-8 items-start">

              {/* Feed 4:5 */}
              <div>
                <div style={{ width: 270, height: 338, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", background: COLORS.navy, padding: "18px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
                  <p style={{ color: COLORS.blue, fontSize: 7.5, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Conviva Saúde — BH e Região</p>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#fff", fontSize: 52, fontWeight: 800, lineHeight: 1, marginBottom: 0 }}>R$ 329</p>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 8 }}>/mês</p>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 9.5, lineHeight: 1.4 }}>Para qualquer idade.<br />60, 70, 80 anos — mesmo valor.</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {["Médico de referência", "Pronto Cuidar 24h", "Sem carência · Sem fidelidade"].map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ color: COLORS.green, fontSize: 9, fontWeight: 700 }}>✓</span>
                        <span style={{ color: "#fff", fontSize: 9 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ background: COLORS.green, borderRadius: 6, padding: "7px 0", textAlign: "center", marginBottom: 10 }}>
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>Falar pelo WhatsApp →</span>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 7, textAlign: "center", fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</p>
                  </div>
                </div>
                <MockupLabel label="Feed 4:5 · 1080×1350px" />
              </div>

              {/* Stories 9:16 */}
              <div>
                <div style={{ width: 180, height: 320, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", background: COLORS.navy, padding: "20px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
                  <p style={{ color: COLORS.blue, fontSize: 6.5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Conviva Saúde — BH e Região</p>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#fff", fontSize: 64, fontWeight: 800, lineHeight: 1 }}>329</p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>R$/mês · qualquer idade</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {["Médico de referência", "Pronto Cuidar 24h", "Sem carência · Sem fidelidade"].map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ color: COLORS.green, fontSize: 9, fontWeight: 700 }}>✓</span>
                        <span style={{ color: "#fff", fontSize: 9 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ background: COLORS.green, borderRadius: 6, padding: "8px 0", textAlign: "center", marginBottom: 8 }}>
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>Falar pelo WhatsApp →</span>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 6.5, textAlign: "center", fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</p>
                  </div>
                </div>
                <MockupLabel label="Stories 9:16 · 1080×1920px" />
              </div>

              {/* Banner 16:9 */}
              <div>
                <div style={{ width: 480, height: 270, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", background: COLORS.navy, display: "flex", overflow: "hidden" }}>
                  {/* Left 50% */}
                  <div style={{ width: "50%", padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <p style={{ color: "#fff", fontSize: 64, fontWeight: 800, lineHeight: 1, textAlign: "center" }}>R$ 329</p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, textAlign: "center" }}>/mês · qualquer idade</p>
                  </div>
                  {/* Right 50% */}
                  <div style={{ flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {["Médico de referência", "Pronto Cuidar 24h", "Sem carência · Sem fidelidade"].map(item => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ color: COLORS.green, fontSize: 12, fontWeight: 700 }}>✓</span>
                          <span style={{ color: "#fff", fontSize: 12 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ background: COLORS.green, borderRadius: 6, padding: "10px 16px", display: "inline-block", marginBottom: 12 }}>
                        <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>Falar pelo WhatsApp →</span>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 8, fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</p>
                    </div>
                  </div>
                </div>
                <MockupLabel label="Banner 16:9 · 1920×1080px" />
              </div>

            </div>
          </Card>

          {/* C2 */}
          <Card className="p-6 mb-8">
            <CreativoHeader code="C2" title="Comparação de preço" briefing={briefingC2} />
            <div className="flex flex-wrap gap-8 items-start">

              {/* Feed 4:5 */}
              <div>
                <div style={{ width: 270, height: 338, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  {/* Main split */}
                  <div style={{ flex: 1, display: "flex" }}>
                    {/* Left: gray */}
                    <div style={{ flex: 1, background: "#F0F0F0", padding: "18px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <span style={{ fontSize: 24, color: COLORS.red }}>✗</span>
                      <p style={{ fontSize: 8.5, color: "#555", textAlign: "center" }}>Plano tradicional</p>
                      <p style={{ fontSize: 22, fontWeight: 800, color: "#333", textAlign: "center" }}>R$ 1.500+</p>
                      <p style={{ fontSize: 8, color: "#777", textAlign: "center", lineHeight: 1.5 }}>Fila de meses.<br />Reajuste todo ano.</p>
                    </div>
                    {/* Right: green */}
                    <div style={{ flex: 1, background: COLORS.green, padding: "18px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <span style={{ fontSize: 24, color: "#fff", fontWeight: 700 }}>✓</span>
                      <p style={{ fontSize: 8.5, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>Conviva Saúde</p>
                      <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", textAlign: "center" }}>R$ 329</p>
                      <p style={{ fontSize: 8, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 1.5 }}>Atendimento em 48h.<br />Mesmo preço para qualquer idade.</p>
                    </div>
                  </div>
                  {/* Footer */}
                  <div style={{ background: "#fff", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderTop: "1px solid #eee" }}>
                    <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.08em", color: COLORS.navy }}>CONVIVA SAÚDE</span>
                    <span style={{ fontSize: 7, color: "#999" }}>Um novo jeito de cuidar após os 60.</span>
                  </div>
                </div>
                <MockupLabel label="Feed 4:5 · 1080×1350px" />
              </div>

              {/* Stories 9:16 */}
              <div>
                <div style={{ width: 180, height: 320, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  {/* Top: gray */}
                  <div style={{ flex: 1, background: "#F0F0F0", padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <span style={{ fontSize: 22, color: COLORS.red }}>✗</span>
                    <p style={{ fontSize: 7.5, color: "#555", textAlign: "center" }}>Plano tradicional</p>
                    <p style={{ fontSize: 26, fontWeight: 800, color: "#333" }}>R$ 1.500+</p>
                    <p style={{ fontSize: 7.5, color: "#777", textAlign: "center", lineHeight: 1.5 }}>Fila de meses.<br />Reajuste todo ano.</p>
                  </div>
                  {/* Bottom: green */}
                  <div style={{ flex: 1, background: COLORS.green, padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <span style={{ fontSize: 22, color: "#fff", fontWeight: 700 }}>✓</span>
                    <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>Conviva Saúde</p>
                    <p style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>R$ 329</p>
                    <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 1.5 }}>Atendimento em 48h.<br />Mesmo preço qualquer idade.</p>
                  </div>
                </div>
                <MockupLabel label="Stories 9:16 · 1080×1920px" />
              </div>

            </div>
          </Card>

          {/* C3 */}
          <Card className="p-6 mb-8">
            <CreativoHeader code="C3" title="Para o filho decisor" briefing={briefingC3} />
            <div className="flex flex-wrap gap-8 items-start">

              {/* Feed 4:5 */}
              <div>
                <div style={{ width: 270, height: 338, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", background: COLORS.lilac, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  {/* Photo */}
                  <div style={{ height: "40%", background: COLORS.photoC, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: 8, color: "#6a5a7a", textAlign: "center", padding: "0 10px", lineHeight: 1.4 }}>[ foto mulher ~40 anos ao telefone, aliviada ]</p>
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>Para quem cuida de quem ama</p>
                      <p style={{ color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1.35, marginBottom: 7 }}>Você não precisa estar lá o tempo todo para saber que ele está bem.</p>
                      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 8.5, lineHeight: 1.4 }}>A Conviva cuida do seu familiar com médico de referência e Pronto Cuidar 24h. Por R$ 329/mês.</p>
                    </div>
                    <div>
                      <div style={{ background: "#fff", borderRadius: 6, padding: "6px 0", textAlign: "center", marginBottom: 8 }}>
                        <span style={{ color: COLORS.lilac, fontSize: 9.5, fontWeight: 700 }}>Conhecer a Conviva →</span>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 7, textAlign: "center", fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</p>
                    </div>
                  </div>
                </div>
                <MockupLabel label="Feed 4:5 · 1080×1350px" />
              </div>

              {/* Stories 9:16 */}
              <div>
                <div style={{ width: 180, height: 320, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  {/* Photo top 50% */}
                  <div style={{ height: "50%", background: COLORS.photoC, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: 7.5, color: "#6a5a7a", textAlign: "center", padding: "0 10px", lineHeight: 1.4 }}>[ foto mulher ~40 anos ao telefone, aliviada ]</p>
                  </div>
                  {/* Bottom 50% */}
                  <div style={{ flex: 1, background: COLORS.lilac, padding: "12px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 6.5, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5, fontWeight: 600 }}>Para quem cuida de quem ama</p>
                      <p style={{ color: "#fff", fontSize: 10.5, fontWeight: 700, lineHeight: 1.3, marginBottom: 5 }}>Você não precisa estar lá o tempo todo para saber que ele está bem.</p>
                      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 7.5, lineHeight: 1.35 }}>R$ 329/mês · Médico de referência · Pronto Cuidar 24h</p>
                    </div>
                    <div>
                      <div style={{ background: "#fff", borderRadius: 5, padding: "5px 0", textAlign: "center", marginBottom: 6 }}>
                        <span style={{ color: COLORS.lilac, fontSize: 8.5, fontWeight: 700 }}>Conhecer a Conviva →</span>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 6, textAlign: "center", fontWeight: 700, letterSpacing: "0.08em" }}>CONVIVA SAÚDE</p>
                    </div>
                  </div>
                </div>
                <MockupLabel label="Stories 9:16 · 1080×1920px" />
              </div>

            </div>
          </Card>
        </section>

        {/* ── FOTOS RECOMENDADAS ─────────────────────────────────────────────── */}
        <section id="fotos" className="scroll-mt-8 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ImageIcon className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest">Referências</p>
              <h2 className="text-2xl font-bold">Fotos recomendadas</h2>
            </div>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">Termos de busca para bancos de imagem (Unsplash, Getty, Shutterstock, Adobe Stock).</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { uso: "A1 — Feed e Stories", termos: "elderly woman smiling home family, senior woman happy portrait", obs: "Rosto visível, sorriso genuíno, luz natural" },
              { uso: "A1 — Banner", termos: "senior woman being cared home, elderly care home", obs: "Horizontal, espaço vazio no lado esquerdo para texto" },
              { uso: "A2 — Seu João", termos: "elderly man doctor appointment, senior man medical consultation", obs: "Tom caloroso, não clínico demais" },
              { uso: "C3 — Filha decisora", termos: "woman 40s phone relieved smiling, adult daughter caregiver phone", obs: "Mulher 35–50 anos, expressão de alívio ou tranquilidade" },
              { uso: "Geral — casal 60+", termos: "senior couple walking outdoors happy, elderly couple lifestyle", obs: "Ativo, ao ar livre, BH-like (parques, calçadão)" },
              { uso: "Geral — equipe médica", termos: "geriatric nurse elderly patient care, home care nurse elderly", obs: "Equipe diversa, relação de confiança e proximidade" },
            ].map(({ uso, termos, obs }) => (
              <Card key={uso} className="p-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{uso}</p>
                <p className="text-sm font-medium text-foreground mb-1 leading-snug">{termos}</p>
                <p className="text-xs text-muted-foreground">{obs}</p>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
