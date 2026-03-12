"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Moon, Sun, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

// ── Helpers ─────────────────────────────────────────────────────────────────

function Section({ title, description, children }: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 max-w-lg">{description}</p>
        )}
      </div>
      <div className="border-t pt-6">{children}</div>
    </section>
  )
}

function PaletteSwatch({
  hex,
  label,
  cssVar,
  light = false,
}: {
  hex: string
  label?: string
  cssVar?: string
  light?: boolean
}) {
  return (
    <div
      className="flex flex-col justify-end p-3 h-28 rounded-lg"
      style={{ background: hex }}
    >
      {label && (
        <p
          className="text-xs font-semibold leading-tight"
          style={{ color: light ? "#2C3D8F" : "#ffffff" }}
        >
          {label}
        </p>
      )}
      <p
        className="text-[10px] font-mono mt-0.5"
        style={{ color: light ? "#6A8E83" : "rgba(255,255,255,0.75)" }}
      >
        {hex}
      </p>
      {cssVar && (
        <p
          className="text-[9px] font-mono"
          style={{ color: light ? "#A8B0CF" : "rgba(255,255,255,0.5)" }}
        >
          {cssVar}
        </p>
      )}
    </div>
  )
}

function TokenSwatch({ label, cssVar }: { label: string; cssVar: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-12 w-full rounded-md border border-black/5"
        style={{ background: `var(${cssVar})` }}
      />
      <p className="text-[11px] font-medium leading-tight">{label}</p>
      <p className="text-[10px] text-muted-foreground font-mono">{cssVar}</p>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function StyleguidePage() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark((d) => !d)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="p-10 max-w-5xl mx-auto flex flex-col gap-16">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">
            Sistema de Design
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Guia de Estilo</h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
            O estilo visual é parte essencial da plataforma Conviva Saúde — criando um sistema padronizado
            de cores, tipografia, botões, campos e componentes voltados ao cuidado de idosos.
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={toggleDark} aria-label="Alternar modo escuro">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>

      {/* ── Typography ── */}
      <Section
        title="Tipografia"
        description="Urbanist é a fonte principal — geométrica, moderna e de alta legibilidade. Plus Jakarta Sans e Nunito estão disponíveis como fontes de suporte para variações de estilo ou componentes específicos."
      >
        <div className="flex flex-col gap-10">

          {/* Font families overview */}
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                name: "Urbanist",
                role: "Principal",
                cssVar: "--font-urbanist",
                style: { fontFamily: "var(--font-urbanist)" },
                desc: "Geométrica e limpa. Usada em toda a interface como fonte padrão.",
              },
              {
                name: "Plus Jakarta Sans",
                role: "Suporte",
                cssVar: "--font-jakarta",
                style: { fontFamily: "var(--font-jakarta)" },
                desc: "Humanista e amigável. Ideal para depoimentos e textos de cuidado.",
              },
              {
                name: "Nunito",
                role: "Suporte",
                cssVar: "--font-nunito",
                style: { fontFamily: "var(--font-nunito)" },
                desc: "Arredondada e acolhedora. Boa para alertas, badges e labels.",
              },
            ].map(({ name, role, cssVar, style, desc }) => (
              <div key={name} className="flex flex-col gap-3 p-5 rounded-xl border border-border bg-card">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{role}</span>
                  <p className="text-2xl font-bold mt-0.5" style={style}>{name}</p>
                </div>
                <div className="flex flex-col gap-1.5" style={style}>
                  {["Regular", "Médio", "Semibold", "Negrito"].map((w, i) => (
                    <span
                      key={w}
                      className="text-sm"
                      style={{ fontWeight: [400, 500, 600, 700][i] }}
                    >
                      {w} — Aa Bb Cc Dd 0123
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                <code className="text-[10px] text-muted-foreground font-mono">{cssVar}</code>
              </div>
            ))}
          </div>

          {/* Type scale */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Escala tipográfica — Urbanist</p>
            <div className="flex flex-col gap-0.5">
              {[
                { size: "text-4xl", weight: "font-bold", label: "Título 1 — 36px / 700", sample: "Cuidado Completo para Idosos" },
                { size: "text-3xl", weight: "font-bold", label: "Título 2 — 30px / 700", sample: "Contratar Plano de Saúde" },
                { size: "text-2xl", weight: "font-semibold", label: "Título 3 — 24px / 600", sample: "Sua Saúde, Nossa Prioridade" },
                { size: "text-xl", weight: "font-semibold", label: "Título 4 — 20px / 600", sample: "Plano Bem-Estar Sênior" },
                { size: "text-base", weight: "font-normal", label: "Corpo — 16px / 400", sample: "Acompanhamento personalizado com cuidadores especializados em geriatria e saúde do idoso." },
                { size: "text-sm", weight: "font-normal", label: "Pequeno — 14px / 400", sample: "Clínica Geral · 8 anos de experiência" },
                { size: "text-xs", weight: "font-medium", label: "Legenda — 12px / 500", sample: "Visita domiciliar disponível" },
              ].map(({ size, weight, label, sample }) => (
                <div key={label} className="flex items-baseline gap-6 py-2.5 border-b border-border/40 last:border-0">
                  <span className="text-[10px] text-muted-foreground font-mono w-48 shrink-0">{label}</span>
                  <span className={`${size} ${weight}`}>{sample}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* ── Color Palette ── */}
      <Section
        title="Paleta de Cores"
        description="Navy profundo (#374D72) ancora a paleta com confiança e dignidade. Verde sage (#79AB74) traz vitalidade e cura natural. Lavanda suave, pêssego âmbar e coral completam um sistema sereno, acolhedor e acessível."
      >
        <div className="flex flex-col gap-4">
          {/* Row 1 — neutrals */}
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-2">
              <PaletteSwatch hex="#1E2B42" label="Texto" cssVar="--foreground" />
            </div>
            <PaletteSwatch hex="#6F7EA0" cssVar="--muted-foreground" />
            <PaletteSwatch hex="#D3D6E9" cssVar="--border" light />
            <PaletteSwatch hex="#E8EBF5" cssVar="--muted" light />
          </div>

          {/* Row 2 — brand */}
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-2">
              <PaletteSwatch hex="#374D72" label="Primário — Navy" cssVar="--primary" />
            </div>
            <PaletteSwatch hex="#79AB74" label="Secundário — Sage" cssVar="--secondary" />
            <PaletteSwatch hex="#D4CFE8" cssVar="--accent" light />
            <PaletteSwatch hex="#F4F5FA" cssVar="--background" light />
          </div>

          {/* Row 3 — semantic */}
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-2">
              <PaletteSwatch hex="#79AB74" label="Verde / Sucesso" cssVar="--success" />
            </div>
            <PaletteSwatch hex="#C97B3A" label="Alerta" cssVar="--warning" />
            <PaletteSwatch hex="#B34038" label="Destrutivo" cssVar="--destructive" />
            <PaletteSwatch hex="#374D72" cssVar="--info" />
          </div>
        </div>
      </Section>

      {/* ── Token Reference ── */}
      <Section title="Tokens de Design">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Núcleo</p>
            <div className="grid grid-cols-4 gap-3">
              <TokenSwatch label="Fundo" cssVar="--background" />
              <TokenSwatch label="Texto" cssVar="--foreground" />
              <TokenSwatch label="Card" cssVar="--card" />
              <TokenSwatch label="Borda" cssVar="--border" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Marca</p>
            <div className="grid grid-cols-4 gap-3">
              <TokenSwatch label="Primário" cssVar="--primary" />
              <TokenSwatch label="Primário FG" cssVar="--primary-foreground" />
              <TokenSwatch label="Secundário" cssVar="--secondary" />
              <TokenSwatch label="Secundário FG" cssVar="--secondary-foreground" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Muted e Destaque</p>
            <div className="grid grid-cols-4 gap-3">
              <TokenSwatch label="Muted" cssVar="--muted" />
              <TokenSwatch label="Muted FG" cssVar="--muted-foreground" />
              <TokenSwatch label="Destaque" cssVar="--accent" />
              <TokenSwatch label="Destaque FG" cssVar="--accent-foreground" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Semântico</p>
            <div className="grid grid-cols-5 gap-3">
              <TokenSwatch label="Sucesso" cssVar="--success" />
              <TokenSwatch label="Alerta" cssVar="--warning" />
              <TokenSwatch label="Destrutivo" cssVar="--destructive" />
              <TokenSwatch label="Info" cssVar="--info" />
              <TokenSwatch label="Verde" cssVar="--green" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Gráficos</p>
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <TokenSwatch key={n} label={`Gráfico ${n}`} cssVar={`--chart-${n}`} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Border Radius ── */}
      <Section title="Bordas Arredondadas">
        <div className="flex flex-wrap gap-8">
          {[
            { label: "sm", cls: "rounded-sm", val: "~3,75px" },
            { label: "md", cls: "rounded-md", val: "~5px" },
            { label: "lg (base)", cls: "rounded-lg", val: "10px" },
            { label: "xl", cls: "rounded-xl", val: "~14px" },
            { label: "2xl", cls: "rounded-2xl", val: "~18px" },
            { label: "full", cls: "rounded-full", val: "9999px" },
          ].map(({ label, cls, val }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`size-16 bg-primary ${cls}`} />
              <p className="text-xs font-medium">{label}</p>
              <p className="text-[10px] text-muted-foreground">{val}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Components Library ── */}
      <Section
        title="Biblioteca de Componentes"
        description="Os componentes foram criados para facilitar a conexão entre designers e desenvolvedores, preservando o conceito visual da plataforma Conviva Saúde."
      >
        <div className="flex flex-col gap-10">

          {/* Botões */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Botões</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                <Button>Contratar Plano</Button>
                <Button variant="secondary">Contratar Plano</Button>
                <Button variant="outline">Contratar Plano</Button>
                <Button variant="ghost">Contratar Plano</Button>
                <Button variant="destructive">Cancelar</Button>
                <Button variant="link">Acessar com Google</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs">Extra Pequeno</Button>
                <Button size="sm">Pequeno</Button>
                <Button size="default">Padrão</Button>
                <Button size="lg">Grande</Button>
                <Button disabled>Desabilitado</Button>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Badges</p>
            <div className="flex flex-wrap gap-2">
              <Badge>Padrão</Badge>
              <Badge variant="secondary">Secundário</Badge>
              <Badge variant="outline">Contorno</Badge>
              <Badge variant="destructive">Erro</Badge>
              <Badge style={{ background: "var(--success)", color: "var(--success-foreground)" }}>Sucesso</Badge>
              <Badge style={{ background: "var(--warning)", color: "var(--warning-foreground)" }}>Alerta</Badge>
              <Badge style={{ background: "var(--info)", color: "var(--info-foreground)" }}>Info</Badge>
            </div>
          </div>

          {/* Alertas */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Alertas</p>
            <div className="flex flex-col gap-3 max-w-xl">
              <Alert>
                <Info className="size-4" />
                <AlertTitle>Informação</AlertTitle>
                <AlertDescription>Sua consulta foi agendada com sucesso para amanhã às 14h.</AlertDescription>
              </Alert>
              <Alert style={{ borderColor: "var(--success)", background: "color-mix(in oklch, var(--success) 10%, transparent)", color: "var(--success)" }}>
                <CheckCircle className="size-4" />
                <AlertTitle>Sucesso</AlertTitle>
                <AlertDescription style={{ color: "var(--foreground)" }}>Plano Bem-Estar Sênior ativado com sucesso.</AlertDescription>
              </Alert>
              <Alert style={{ borderColor: "var(--warning)", background: "color-mix(in oklch, var(--warning) 10%, transparent)", color: "var(--warning)" }}>
                <AlertTriangle className="size-4" />
                <AlertTitle>Atenção</AlertTitle>
                <AlertDescription style={{ color: "var(--foreground)" }}>Seu plano de saúde vence em 3 dias. Renove agora.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <XCircle className="size-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>Não foi possível conectar. Tente novamente mais tarde.</AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Cards */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Cards</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Cuidador Domiciliar</CardTitle>
                  <CardDescription>Geriatria e Enfermagem</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Badge>8 anos exp.</Badge>
                    <Badge variant="outline">Disponível</Badge>
                  </div>
                  <Button className="mt-3 w-full" size="sm">Agendar Visita</Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">Plano Bem-Estar Sênior</CardTitle>
                  <CardDescription>Cobertura completa para idosos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Seg–Sex, 8:00–20:00</p>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-warning text-sm">★</span>
                    ))}
                  </div>
                  <Button className="mt-3 w-full" size="sm" variant="outline">Ver Detalhes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Kit Monitoramento</CardTitle>
                  <CardDescription>Oxímetro + Esfigmomanômetro</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold text-primary">R$ 129</p>
                  <p className="text-xs text-muted-foreground mb-3">Equipamentos certificados</p>
                  <Button className="w-full" size="sm">Adicionar ao Plano</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Radio Group */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Grupo de Opções</p>
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle className="text-base">Tipo de atendimento</CardTitle>
                <CardDescription>Escolha como prefere ser atendido.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="domiciliar" className="flex flex-col gap-3">
                  {[
                    { value: "domiciliar", label: "Visita domiciliar", description: "Cuidador vai até sua residência" },
                    { value: "teleconsulta", label: "Teleconsulta", description: "Consulta remota por vídeo, 30 min" },
                    { value: "clinica", label: "Na clínica", description: "Atendimento presencial na unidade" },
                  ].map(({ value, label, description }) => (
                    <div key={value} className="flex items-start gap-3">
                      <RadioGroupItem value={value} id={value} className="mt-0.5" />
                      <Label htmlFor={value} className="flex flex-col cursor-pointer">
                        <span className="font-medium">{label}</span>
                        <span className="text-xs text-muted-foreground">{description}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Sombras */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sombras</p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: "none", cls: "" },
                { label: "shadow-sm", cls: "shadow-sm" },
                { label: "shadow", cls: "shadow" },
                { label: "shadow-md", cls: "shadow-md" },
                { label: "shadow-lg", cls: "shadow-lg" },
              ].map(({ label, cls }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className={`size-16 bg-card border rounded-xl ${cls}`} />
                  <p className="text-xs font-mono text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* ── Summary ── */}
      <Section title="Resumo do Design">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
              {[
                ["Cor primária", "#374D72 — Navy Profundo"],
                ["Cor secundária", "#79AB74 — Verde Sage"],
                ["Acento", "oklch(0.895 0.040 290) — Lavanda Suave"],
                ["Fundo", "oklch(0.982 0.006 255) — Branco azulado"],
                ["Texto", "oklch(0.18 0.028 255) — Navy escuro"],
                ["Fonte principal", "Urbanist (400 / 500 / 600 / 700 / 800)"],
                ["Fontes de suporte", "Plus Jakarta Sans · Nunito"],
                ["Estilo", "Sereno, Confiante, Acolhedor"],
                ["Borda arredondada", "10px base (--radius: 0.625rem)"],
                ["Sucesso", "#79AB74 — Verde Sage (idêntico ao secundário)"],
                ["Alerta", "oklch(0.74 0.12 58) — Pêssego Âmbar"],
                ["Destrutivo", "oklch(0.60 0.20 25) — Coral Suave"],
                ["Verde (logotipo)", "#79AB74 — identidade visual"],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-3 py-2 border-b border-border/40 last:border-0">
                  <span className="text-xs font-medium text-muted-foreground w-36 shrink-0">{key}</span>
                  <span className="text-xs font-mono">{val}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Section>

    </div>
  )
}
