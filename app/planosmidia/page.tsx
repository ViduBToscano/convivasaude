"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Users,
  TrendingUp,
  DollarSign,
  Search,
  Smartphone,
  Play,
  Monitor,
  BarChart2,
} from "lucide-react"

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
      {children}
    </p>
  )
}

function PmSection({
  id,
  label,
  title,
  children,
}: {
  id: string
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8 py-12 border-b border-border last:border-0">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">{title}</h2>
      {children}
    </section>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "visao-geral", label: "Visão Geral" },
  { id: "publicos", label: "Públicos" },
  { id: "canais", label: "Canais" },
  { id: "cenarios", label: "Cenários" },
  { id: "kpis", label: "KPIs" },
  { id: "calendario", label: "Calendário" },
]

// ── Data ──────────────────────────────────────────────────────────────────────

type Scenario = 0 | 1 | 2

const scenarios = [
  {
    label: "Entrada",
    valor: "R$ 2.500/mês",
    highlight: false,
    canais: [
      { canal: "Google Search", verba: "R$ 875", pct: 35, objetivo: "Captura de leads ativos" },
      { canal: "Meta Ads", verba: "R$ 1.000", pct: 40, objetivo: "Awareness + leads" },
      { canal: "YouTube", verba: "R$ 375", pct: 15, objetivo: "Reconhecimento de marca" },
      { canal: "Display/Remarketing", verba: "R$ 125", pct: 5, objetivo: "Reimpacto" },
      { canal: "Reserva/Testes", verba: "R$ 125", pct: 5, objetivo: "A/B de criativos" },
    ],
    projecoes: [
      { label: "Impressões/mês", value: "~180.000" },
      { label: "Cliques/mês", value: "~3.600" },
      { label: "Leads estimados", value: "~54" },
      { label: "CPL estimado", value: "~R$ 46" },
      { label: "Seg. Instagram", value: "+150/mês" },
      { label: "Views YouTube", value: "~8.000" },
    ],
    recomendado: "Primeiros 3 meses — validação de canais e criativos.",
  },
  {
    label: "Recomendado",
    valor: "R$ 3.000/mês",
    highlight: true,
    canais: [
      { canal: "Google Search", verba: "R$ 1.050", pct: 35, objetivo: "Captura de leads ativos" },
      { canal: "Meta Ads", verba: "R$ 1.200", pct: 40, objetivo: "Awareness + leads" },
      { canal: "YouTube", verba: "R$ 450", pct: 15, objetivo: "Reconhecimento de marca" },
      { canal: "Display/Remarketing", verba: "R$ 150", pct: 5, objetivo: "Reimpacto" },
      { canal: "Reserva/Testes", verba: "R$ 150", pct: 5, objetivo: "A/B de criativos" },
    ],
    projecoes: [
      { label: "Impressões/mês", value: "~220.000" },
      { label: "Cliques/mês", value: "~4.400" },
      { label: "Leads estimados", value: "~66" },
      { label: "CPL estimado", value: "~R$ 45" },
      { label: "Seg. Instagram", value: "+200/mês" },
      { label: "Views YouTube", value: "~10.000" },
    ],
    recomendado: "Meses 4–9, após validação inicial de canais.",
  },
  {
    label: "Aceleração",
    valor: "R$ 4.000/mês",
    highlight: false,
    canais: [
      { canal: "Google Search", verba: "R$ 1.400", pct: 35, objetivo: "Captura de leads ativos" },
      { canal: "Meta Ads", verba: "R$ 1.600", pct: 40, objetivo: "Awareness + leads" },
      { canal: "YouTube", verba: "R$ 600", pct: 15, objetivo: "Reconhecimento de marca" },
      { canal: "Display/Remarketing", verba: "R$ 200", pct: 5, objetivo: "Reimpacto" },
      { canal: "Reserva/Testes", verba: "R$ 200", pct: 5, objetivo: "A/B de criativos" },
    ],
    projecoes: [
      { label: "Impressões/mês", value: "~300.000" },
      { label: "Cliques/mês", value: "~6.000" },
      { label: "Leads estimados", value: "~90" },
      { label: "CPL estimado", value: "~R$ 44" },
      { label: "Seg. Instagram", value: "+280/mês" },
      { label: "Views YouTube", value: "~14.000" },
    ],
    recomendado: "Meses 10+, escala após comprovação de CAC e conversão.",
  },
]

const kpis = [
  { metrica: "Leads gerados/mês", ferramenta: "Forms + WhatsApp", m3: "50", m6: "80", m12: "120" },
  { metrica: "CPL (custo por lead)", ferramenta: "Google/Meta Ads", m3: "R$ 50", m6: "R$ 45", m12: "R$ 40" },
  { metrica: "Taxa conversão LP", ferramenta: "Google Analytics", m3: "2%", m6: "3%", m12: "4%" },
  { metrica: "Seguidores Instagram", ferramenta: "Instagram Insights", m3: "300", m6: "800", m12: "2.000" },
  { metrica: "Inscritos YouTube", ferramenta: "YouTube Studio", m3: "50", m6: "200", m12: "600" },
  { metrica: "Visualizações/mês", ferramenta: "YouTube Studio", m3: "5.000", m6: "15.000", m12: "40.000" },
  { metrica: "Contatos WhatsApp/mês", ferramenta: "WhatsApp Business", m3: "30", m6: "60", m12: "100" },
  { metrica: "Contratos fechados/mês", ferramenta: "CRM", m3: "5", m6: "15", m12: "40" },
  { metrica: "CAC (custo aquisição)", ferramenta: "Manual", m3: "R$ 500", m6: "R$ 200", m12: "R$ 100" },
  { metrica: "MRR gerado", ferramenta: "Financeiro", m3: "R$ 1.645", m6: "R$ 4.935", m12: "R$ 13.160" },
]

const trimestres = [
  {
    periodo: "T1 (Jan–Mar)",
    fase: "Validação",
    badgeColor: { bg: "#fef3c7", text: "#92400e" },
    faseLabel: "Fase 1",
    acoes: [
      "Lançar LP + página /contratar",
      "Ativar Google Search com termos principais",
      "Criar perfis Instagram, YouTube, TikTok e LinkedIn",
      "Rodar Meta Ads com 3 criativos diferentes",
      "Meta: 50 leads/mês, validar CPL",
    ],
  },
  {
    periodo: "T2 (Abr–Jun)",
    fase: "Tração",
    badgeColor: { bg: "#dbeafe", text: "#1e40af" },
    faseLabel: "Fase 2",
    acoes: [
      "Escalar canais validados no T1",
      "Publicar primeiros vídeos no YouTube",
      "Lançar blog com 2 artigos/mês",
      "Iniciar programa de indicação",
      "Meta: 80 leads/mês, primeiros 50 contratos",
    ],
  },
  {
    periodo: "T3 (Jul–Set)",
    fase: "Escala",
    badgeColor: { bg: "#dcfce7", text: "#166534" },
    faseLabel: "Fase 3",
    acoes: [
      "Aumentar verba para cenário R$ 4.000",
      "Expandir para TikTok",
      "Parcerias com igrejas e associações de BH",
      "Meta: 100 leads/mês, 100 contratos ativos",
    ],
  },
  {
    periodo: "T4 (Out–Dez)",
    fase: "Consolidação",
    badgeColor: { bg: "#f3e8ff", text: "#6b21a8" },
    faseLabel: "Fase 4",
    acoes: [
      "Análise completa do ano",
      "Ajuste de estratégia para 2027",
      "Campanha de fim de ano",
      "Meta: 120 leads/mês, 150 contratos ativos",
    ],
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PlanosMidiaPage() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(1)
  const scenario = scenarios[activeScenario]

  return (
    <>
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

      <div className="flex min-h-screen bg-background text-foreground pt-28">

        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card p-6 flex flex-col gap-6 fixed top-28 left-0 h-[calc(100vh-7rem)] overflow-y-auto">
          <div>
            <Link href="/">
              <img src="/logo.svg" alt="Conviva Saúde" className="h-24 w-auto" />
            </Link>
            <p className="text-xs text-muted-foreground mt-1">Plano de Mídia 2026</p>
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
            <Link href="/criativos" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              → Criativos
            </Link>
            <Link href="/styleguide" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              → Sistema de Design
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 ml-64 max-w-4xl px-10 py-10">

          {/* Header do documento */}
          <div className="mb-12 pb-8 border-b border-border">
            <Badge className="mb-4" variant="outline">Documento interno · 2026</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Plano de Mídia</h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Três cenários de investimento para lançamento da marca em BH e região, com foco em
              reconhecimento, geração de leads e conversão.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["BH e raio de 70km", "Marca em lançamento", "Jan–Dez 2026"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "color-mix(in oklch, var(--primary) 12%, var(--card))",
                    color: "var(--primary)",
                    border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── 1. Visão Geral ── */}
          <PmSection id="visao-geral" label="Visão geral" title="Marca nova. Mercado enorme. Estratégia focada.">
            <div className="flex flex-col gap-4 mb-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                A Conviva Saúde é uma marca em lançamento — sem histórico de mídia, sem base de
                seguidores e sem reconhecimento de marca. Isso exige uma estratégia que equilibre
                construção de marca (topo de funil) com geração de leads qualificados (fundo de
                funil), dentro de um orçamento enxuto e bem distribuído.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                O mercado é claro: 460 mil idosos em BH, com 71,7% sem convênio de saúde. Dois
                públicos para ativar: o idoso ativo (60-74 anos) e o familiar/cuidador (35-55 anos).
                Cada um com canais, linguagens e momentos diferentes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Target,
                  sub: "Geo: BH + 70km",
                  desc: "Foco total na região metropolitana antes de qualquer expansão nacional.",
                },
                {
                  icon: Users,
                  sub: "2 públicos",
                  desc: "Idoso ativo (60-74) e familiar/cuidador (35-55). Canais e criativos diferentes para cada um.",
                },
                {
                  icon: TrendingUp,
                  sub: "Funil completo",
                  desc: "Reconhecimento → Consideração → Conversão. Distribuição de verba em todas as etapas.",
                },
                {
                  icon: DollarSign,
                  sub: "3 cenários",
                  desc: "R$ 2.500 · R$ 3.000 · R$ 4.000/mês. Mesma estratégia, escala diferente.",
                },
              ].map(({ icon: Icon, sub, desc }) => (
                <div
                  key={sub}
                  className="flex gap-3 p-4 rounded-xl border border-border"
                  style={{ background: "color-mix(in oklch, var(--primary) 5%, var(--background))" }}
                >
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{sub}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </PmSection>

          {/* ── 2. Públicos ── */}
          <PmSection id="publicos" label="Públicos-alvo" title="Quem queremos atingir">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Público A */}
              <div className="p-5 rounded-2xl border border-border flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm">Público A: O Idoso Ativo</h3>
                  <Badge variant="outline" className="shrink-0 text-xs">60–74 anos</Badge>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {[
                    "Mora em BH ou RMBH",
                    "Classe B/C, aposentado ou semi-ativo",
                    "Usa WhatsApp, Facebook e YouTube",
                    "Pesquisa no Google sobre saúde",
                    "Decisor da própria saúde",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 rounded-full shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl p-3 border border-border bg-muted/50">
                  <p className="text-xs font-semibold text-primary mb-1">Canais · Mensagem</p>
                  <p className="text-xs text-muted-foreground">Google Search · Facebook · YouTube</p>
                  <p className="text-xs text-muted-foreground mt-1">Autonomia, preço justo, médico que conhece</p>
                </div>
              </div>

              {/* Público B */}
              <div className="p-5 rounded-2xl border border-border flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm">Público B: O Familiar/Cuidador</h3>
                  <Badge variant="outline" className="shrink-0 text-xs">35–55 anos</Badge>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {[
                    "Filho ou filha que decide e paga",
                    "Mora em BH ou cidades próximas",
                    "Usa Instagram, Google e YouTube",
                    "Preocupado, culpado, busca tranquilidade",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 rounded-full shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl p-3 border border-border bg-muted/50">
                  <p className="text-xs font-semibold text-primary mb-1">Canais · Mensagem</p>
                  <p className="text-xs text-muted-foreground">Instagram · Google · YouTube</p>
                  <p className="text-xs text-muted-foreground mt-1">Tranquilidade, suporte 24h, comunicação</p>
                </div>
              </div>
            </div>
          </PmSection>

          {/* ── 3. Canais ── */}
          <PmSection id="canais" label="Canais" title="Onde investir e por quê">
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Search,
                  title: "Google Search (SEM)",
                  badge: "Alta prioridade",
                  badgeBg: "#dcfce7",
                  badgeText: "#166534",
                  pct: "35%",
                  desc: "Captura demanda ativa — quem já está procurando. Melhor CAC do funil.",
                  details: '"geriatra BH", "médico para idoso BH", "cuidado idoso BH", "plano saúde idoso BH"',
                },
                {
                  icon: Smartphone,
                  title: "Meta Ads (Facebook + Instagram)",
                  badge: "Alta prioridade",
                  badgeBg: "#dcfce7",
                  badgeText: "#166534",
                  pct: "40%",
                  desc: "Maior volume, awareness + remarketing.",
                  details: "Público A: Facebook (45-70 anos) · Público B: Instagram (35-55 anos) — ambos BH+70km",
                },
                {
                  icon: Play,
                  title: "YouTube",
                  badge: "Média prioridade",
                  badgeBg: "#fef3c7",
                  badgeText: "#92400e",
                  pct: "15%",
                  desc: "Construção de marca. Público idoso consome muito YouTube.",
                  details: "Bumper 6s + in-stream 15-30s · Público: 45-70 anos, interesses em saúde",
                },
                {
                  icon: Monitor,
                  title: "Google Display / Remarketing",
                  badge: "Complementar",
                  badgeBg: "#dbeafe",
                  badgeText: "#1e40af",
                  pct: "5%",
                  desc: "Reimpactar visitantes do site que não converteram. Custo baixo, mantém marca presente.",
                  details: "Ativado via Google Ads com lista de remarketing do GA4",
                },
                {
                  icon: BarChart2,
                  title: "TikTok",
                  badge: "Futuro",
                  badgeBg: "#f3f4f6",
                  badgeText: "#6b7280",
                  pct: "0% agora",
                  desc: "Público ainda jovem para o produto, mas crescendo na faixa 45+.",
                  details: "Recomendado após 6 meses com verba maior.",
                },
              ].map(({ icon: Icon, title, badge, badgeBg, badgeText, pct, desc, details }) => (
                <div
                  key={title}
                  className="flex gap-4 p-5 rounded-xl border border-border"
                >
                  <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold text-sm">{title}</p>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: badgeBg, color: badgeText }}
                      >
                        {badge}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground mb-1">{desc}</p>
                    <p className="text-xs text-muted-foreground">{details}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-primary">{pct}</p>
                    <p className="text-[10px] text-muted-foreground">da verba</p>
                  </div>
                </div>
              ))}
            </div>
          </PmSection>

          {/* ── 4. Cenários ── */}
          <PmSection id="cenarios" label="Cenários" title="Três cenários de investimento mensal">

            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {scenarios.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActiveScenario(i as Scenario)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-border"
                  style={
                    activeScenario === i
                      ? { background: "var(--primary)", color: "var(--primary-foreground)", borderColor: "var(--primary)" }
                      : { background: "var(--card)", color: "var(--foreground)" }
                  }
                >
                  {s.valor}
                  {s.highlight && <span className="ml-1.5 text-[10px] opacity-75">★</span>}
                </button>
              ))}
            </div>

            <div
              className="rounded-2xl p-6 border"
              style={{ borderColor: scenario.highlight ? "var(--primary)" : "var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-lg font-bold">{scenario.valor}</h3>
                <Badge variant={scenario.highlight ? "default" : "outline"}>{scenario.label}</Badge>
              </div>

              {/* Barras de verba */}
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Distribuição de verba
              </p>
              <div className="flex flex-col gap-4 mb-8">
                {scenario.canais.map(({ canal, verba, pct, objetivo }) => (
                  <div key={canal}>
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-medium truncate">{canal}</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">— {objetivo}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-muted-foreground">{verba}</span>
                        <span className="text-xs font-bold text-primary w-7 text-right">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Projeções */}
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Projeções mensais estimadas
              </p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {scenario.projecoes.map(({ label, value }) => (
                  <div key={label} className="rounded-xl p-3 bg-muted/60 border border-border">
                    <p className="text-base font-bold mb-0.5">{value}</p>
                    <p className="text-[11px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">Indicado para:</span> {scenario.recomendado}
              </p>
            </div>
          </PmSection>

          {/* ── 5. KPIs ── */}
          <PmSection id="kpis" label="Métricas" title="O que vamos medir">
            <div className="rounded-2xl overflow-hidden border border-border">
              {/* Header */}
              <div className="grid grid-cols-5 gap-2 px-4 py-3 bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="col-span-2">Métrica</span>
                <span>Meta M3</span>
                <span>Meta M6</span>
                <span className="text-primary">Meta M12</span>
              </div>
              {kpis.map(({ metrica, ferramenta, m3, m6, m12 }, i) => (
                <div
                  key={metrica}
                  className="grid grid-cols-5 gap-2 px-4 py-3 items-center border-t border-border"
                  style={{ background: i % 2 === 0 ? "var(--card)" : "var(--background)" }}
                >
                  <div className="col-span-2">
                    <p className="text-sm font-medium">{metrica}</p>
                    <p className="text-xs text-muted-foreground">{ferramenta}</p>
                  </div>
                  <p className="text-sm">{m3}</p>
                  <p className="text-sm">{m6}</p>
                  <p className="text-sm font-semibold text-primary">{m12}</p>
                </div>
              ))}
            </div>
          </PmSection>

          {/* ── 6. Calendário ── */}
          <PmSection id="calendario" label="Calendário" title="Cronograma de lançamento — 2026">
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {trimestres.map(({ periodo, fase, badgeColor, faseLabel, acoes }) => (
                <div key={periodo} className="p-5 rounded-2xl border border-border flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{periodo}</p>
                      <h3 className="font-bold text-sm mt-0.5">{fase}</h3>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
                      style={{ background: badgeColor.bg, color: badgeColor.text }}
                    >
                      {faseLabel}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {acoes.map((acao) => (
                      <li key={acao} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 size-1.5 rounded-full shrink-0 bg-primary" />
                        {acao}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Observações finais */}
            <div className="rounded-2xl p-6 border border-border bg-muted/50">
              <p className="font-bold text-sm mb-3">Importante</p>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                Todas as projeções são estimativas baseadas em benchmarks do setor de saúde e
                serviços locais em BH. Os valores reais dependerão da qualidade dos criativos, da
                taxa de conversão da LP e da eficiência do time comercial no fechamento dos leads.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Recomendamos revisar os KPIs mensalmente e redistribuir verba conforme os canais que
                apresentarem melhor CPL e CAC.
              </p>
            </div>
          </PmSection>

        </main>
      </div>
    </>
  )
}
