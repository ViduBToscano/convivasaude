"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  DollarSign,
  Target,
  MapPin,
  Users,
  Info,
  Search,
  Smartphone,
  Play,
  Monitor,
  BarChart2,
  Square,
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
  { id: "contexto", label: "Contexto" },
  { id: "mercado", label: "Mercado" },
  { id: "publicos", label: "Públicos" },
  { id: "canais", label: "Canais" },
  { id: "cenarios", label: "Cenários" },
  { id: "copies", label: "Copies" },
  { id: "tracking", label: "Tracking" },
  { id: "kpis", label: "KPIs" },
  { id: "calendario", label: "Calendário" },
]

// ── Data ──────────────────────────────────────────────────────────────────────

type ScenarioIdx = 0 | 1 | 2
type CopyTab = "google" | "meta" | "instagram" | "youtube"

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
      { canal: "Testes A/B", verba: "R$ 125", pct: 5, objetivo: "Otimização de criativos" },
    ],
    projecoes: [
      { label: "Impressões/mês", value: "~160.000" },
      { label: "Cliques", value: "~3.200" },
      { label: "Leads estimados", value: "48–64" },
      { label: "CPL estimado", value: "R$ 39–52" },
      { label: "Contratos/mês", value: "7–10" },
      { label: "MRR gerado", value: "R$ 2.303–3.290" },
    ],
    ideal: "Validação de canais e criativos. Primeiros 3 meses.",
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
      { canal: "Testes A/B", verba: "R$ 150", pct: 5, objetivo: "Otimização de criativos" },
    ],
    projecoes: [
      { label: "Impressões/mês", value: "~200.000" },
      { label: "Cliques", value: "~4.000" },
      { label: "Leads estimados", value: "60–80" },
      { label: "CPL estimado", value: "R$ 37–50" },
      { label: "Contratos/mês", value: "9–12" },
      { label: "MRR gerado", value: "R$ 2.961–3.948" },
    ],
    ideal: "Meses 4–9, após validação inicial de canais.",
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
      { canal: "Testes A/B", verba: "R$ 200", pct: 5, objetivo: "Otimização de criativos" },
    ],
    projecoes: [
      { label: "Impressões/mês", value: "~280.000" },
      { label: "Cliques", value: "~5.600" },
      { label: "Leads estimados", value: "84–112" },
      { label: "CPL estimado", value: "R$ 36–48" },
      { label: "Contratos/mês", value: "13–17" },
      { label: "MRR gerado", value: "R$ 4.277–5.593" },
    ],
    ideal: "M10+, escala após CAC e taxa de fechamento validados.",
  },
]

const kpis = [
  { kpi: "CPL (Meta Ads)", ferramenta: "Meta Ads", ref: "R$ 40–90", m3: "R$ 70", m6: "R$ 55", m12: "R$ 45" },
  { kpi: "CPL (Google Search)", ferramenta: "Google Ads", ref: "R$ 80–150", m3: "R$ 120", m6: "R$ 100", m12: "R$ 80" },
  { kpi: "CPL médio geral", ferramenta: "Planilha", ref: "—", m3: "R$ 90", m6: "R$ 70", m12: "R$ 55" },
  { kpi: "Taxa conv. LP", ferramenta: "GA4", ref: "2,98% (BR)", m3: "2%", m6: "3%", m12: "4%" },
  { kpi: "Leads/mês", ferramenta: "CRM/Planilha", ref: "—", m3: "50", m6: "80", m12: "120" },
  { kpi: "Taxa fechamento", ferramenta: "CRM", ref: "—", m3: "10%", m6: "15%", m12: "20%" },
  { kpi: "Contratos/mês", ferramenta: "CRM", ref: "—", m3: "5", m6: "12", m12: "24" },
  { kpi: "CAC", ferramenta: "Planilha", ref: "—", m3: "R$ 600", m6: "R$ 350", m12: "R$ 200" },
  { kpi: "LTV (36 meses)", ferramenta: "Planilha", ref: "—", m3: "R$ 11.844", m6: "R$ 11.844", m12: "R$ 11.844" },
  { kpi: "LTV:CAC", ferramenta: "Calculado", ref: "Meta: 3:1", m3: "19:1", m6: "33:1", m12: "59:1" },
  { kpi: "MRR", ferramenta: "Financeiro", ref: "—", m3: "R$ 1.645", m6: "R$ 3.948", m12: "R$ 7.896" },
  { kpi: "Seguidores Instagram", ferramenta: "Instagram", ref: "—", m3: "300", m6: "800", m12: "2.000" },
  { kpi: "Inscritos YouTube", ferramenta: "YouTube", ref: "—", m3: "50", m6: "200", m12: "600" },
]

const trimestres = [
  {
    periodo: "T1 (Jan–Mar)",
    fase: "Infraestrutura e validação",
    badgeColor: { bg: "#fef3c7", text: "#92400e" },
    faseLabel: "Fase 1",
    checklist: [
      "Instalar GA4 + GTM + Meta Pixel",
      "Configurar todos os eventos de conversão",
      "Criar contas Google Ads e Meta Ads",
      "Definir estrutura de campanhas (ad groups)",
      "Criar 3 variações de criativo por canal",
      "Lançar Google Search com 5 grupos de anúncios",
      "Lançar Meta Ads com públicos A e B separados",
      "Configurar UTMs e dashboard Looker Studio",
      "Criar perfis: Instagram, YouTube, TikTok, LinkedIn",
      "Meta: 50 leads/mês, validar CPL < R$ 90",
    ],
  },
  {
    periodo: "T2 (Abr–Jun)",
    fase: "Otimização e tração",
    badgeColor: { bg: "#dbeafe", text: "#1e40af" },
    faseLabel: "Fase 2",
    checklist: [
      "Pausar criativos com CTR < 1%",
      "Escalar públicos que converteram melhor",
      "Lançar YouTube (bumper + in-stream)",
      "Ativar remarketing para visitantes da LP",
      "Publicar 2 primeiros vídeos no YouTube",
      "Iniciar blog com 2 artigos/mês (SEO)",
      "Programa de indicação com desconto",
      "Meta: 80 leads/mês, CPL < R$ 70, 50 contratos",
    ],
  },
  {
    periodo: "T3 (Jul–Set)",
    fase: "Escala",
    badgeColor: { bg: "#dcfce7", text: "#166534" },
    faseLabel: "Fase 3",
    checklist: [
      "Aumentar verba para cenário R$ 4.000",
      "Testar TikTok com verba pequena (R$ 200)",
      "Parcerias: igrejas, associações, clubes em BH",
      "Lookalike audiences baseadas em contratos fechados",
      "Meta: 100 leads/mês, 100 contratos ativos",
    ],
  },
  {
    periodo: "T4 (Out–Dez)",
    fase: "Consolidação e planejamento 2027",
    badgeColor: { bg: "#f3e8ff", text: "#6b21a8" },
    faseLabel: "Fase 4",
    checklist: [
      "Análise completa do ano (ROI por canal)",
      "Campanha de fim de ano (Natal/Janeiro)",
      "Planejar estratégia 2027 com dados reais",
      "Meta: 120 leads/mês, 150 contratos ativos",
    ],
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PlanosMidiaPage() {
  const [activeScenario, setActiveScenario] = useState<ScenarioIdx>(1)
  const [activeCopyTab, setActiveCopyTab] = useState<CopyTab>("google")

  const scenario = scenarios[activeScenario]

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
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

      <div className="flex min-h-screen bg-background text-foreground pt-28">

        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
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

        {/* ── Main ─────────────────────────────────────────────────────────── */}
        <main className="flex-1 ml-64 max-w-4xl px-10 py-10">

          {/* Doc header */}
          <div className="mb-12 pb-8 border-b border-border">
            <Badge className="mb-4" variant="outline">Documento interno · 2026</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Plano de Mídia</h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Estratégia completa de mídia digital para lançamento da Conviva Saúde em BH e região —
              incluindo canais, copies, tracking, cenários de investimento e calendário de execução.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["BH e raio de 70km", "Marca em lançamento", "Jan–Dez 2026"].map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "color-mix(in oklch, var(--primary) 12%, var(--card))",
                    color: "var(--primary)",
                    border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── 1. Contexto ── */}
          <PmSection id="contexto" label="Plano de Mídia 2026" title="Lançar uma marca nova num mercado em explosão">
            <div className="flex flex-col gap-4 mb-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                A Conviva Saúde entra num dos mercados que mais crescem no Brasil — e com uma
                vantagem competitiva clara: ninguém em BH oferece o que ela oferece, pelo preço
                que ela cobra.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                O desafio é de reconhecimento: ninguém conhece a marca ainda. A estratégia de
                mídia precisa construir credibilidade rapidamente, capturar quem já está buscando
                uma solução e converter em leads qualificados para o time comercial fechar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: TrendingUp,
                  stat: "+74% em 5 anos",
                  desc: "Crescimento do setor de cuidados a idosos no Brasil entre 2020 e 2025. Um dos setores mais aquecidos da economia.",
                  fonte: "Sebrae, 2025",
                },
                {
                  icon: Users,
                  stat: "24,5 milhões",
                  desc: "Idosos brasileiros conectados à internet em 2024 — crescimento de 278% desde 2016.",
                  fonte: "IBGE/PNAD 2024",
                },
                {
                  icon: MapPin,
                  stat: "460 mil idosos em BH",
                  desc: "71,7% sem convênio de saúde. Demanda reprimida enorme num raio de 70km.",
                  fonte: "IBGE Censo 2022",
                },
                {
                  icon: DollarSign,
                  stat: "R$ 329 fixo",
                  desc: "Preço 5,5× menor que planos tradicionais. Vantagem competitiva clara para mídia paga.",
                  fonte: "Benchmark BH",
                },
              ].map(({ icon: Icon, stat, desc, fonte }) => (
                <div
                  key={stat}
                  className="flex gap-3 p-4 rounded-xl border border-border"
                  style={{ background: "color-mix(in oklch, var(--primary) 5%, var(--background))" }}
                >
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">{stat}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground mb-1">{desc}</p>
                    <p className="text-[10px] text-muted-foreground/70 font-medium">{fonte}</p>
                  </div>
                </div>
              ))}
            </div>
          </PmSection>

          {/* ── 2. Mercado ── */}
          <PmSection id="mercado" label="Análise de mercado" title="Por que agora é o momento certo">
            <p className="text-sm text-muted-foreground mb-6">Dados que justificam o investimento em mídia.</p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Bloco 1 */}
              <div className="p-5 rounded-2xl border border-border flex flex-col gap-3">
                <p className="font-bold text-sm">Crescimento do setor</p>
                <ul className="flex flex-col gap-2">
                  {[
                    "Cuidados para idosos: +7,5%/ano até 2030",
                    "Mercado de saúde BR: R$ 1,898 tri até 2028",
                    "57 mil novos negócios de cuidadores em 2025",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div
                  className="rounded-lg p-3 mt-auto text-xs leading-relaxed italic text-muted-foreground"
                  style={{ background: "var(--muted)" }}
                >
                  "O bônus demográfico do Brasil acabou — a demanda por serviços geriátricos só
                  cresce." <span className="not-italic font-medium">Ipea, 2025</span>
                </div>
              </div>

              {/* Bloco 2 */}
              <div className="p-5 rounded-2xl border border-border flex flex-col gap-3">
                <p className="font-bold text-sm">Digitalização do público 60+</p>
                <ul className="flex flex-col gap-2">
                  {[
                    "69,8% dos idosos brasileiros online (2024)",
                    "WhatsApp: 92% dos idosos conectados",
                    "Facebook: 85% · YouTube: 77%",
                    "Crescimento digital: +278% em 8 anos",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div
                  className="rounded-lg p-3 mt-auto text-xs leading-relaxed italic text-muted-foreground"
                  style={{ background: "var(--muted)" }}
                >
                  "A barreira digital está caindo. O público 60+ está cada vez mais acessível via
                  mídia paga."
                </div>
              </div>

              {/* Bloco 3 */}
              <div className="p-5 rounded-2xl border border-border flex flex-col gap-3">
                <p className="font-bold text-sm">Oportunidade em BH</p>
                <ul className="flex flex-col gap-2">
                  {[
                    "MG: 3º estado mais envelhecido do Brasil",
                    "460 mil idosos só em BH",
                    "2,58 milhões sem convênio em MG",
                    "Concorrência direta inexistente no modelo Conviva",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div
                  className="rounded-lg p-3 mt-auto text-xs leading-relaxed italic text-muted-foreground"
                  style={{ background: "var(--muted)" }}
                >
                  "Oceano azul: nenhum player em BH combina geriatria + preço acessível + cuidado
                  coordenado."
                </div>
              </div>
            </div>
          </PmSection>

          {/* ── 3. Públicos ── */}
          <PmSection id="publicos" label="Públicos-alvo" title="Dois públicos. Dois funis. Uma marca.">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Público A */}
              <div className="p-5 rounded-2xl border border-border flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm">Público A: O Idoso Ativo</h3>
                  <Badge variant="outline" className="shrink-0 text-xs">60–74 anos</Badge>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {[
                    "85% dos 60-64 anos usam internet (PNAD 2024)",
                    "Facebook: 85% de penetração na faixa",
                    "YouTube: 77% — consome vídeos longos",
                    "Pesquisa saúde no Google com frequência",
                    "Decisor da própria saúde",
                    "Confia em indicações e autoridade médica",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 rounded-full shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl p-3 border border-border bg-muted/50 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-primary">Canais primários</p>
                  <p className="text-xs text-muted-foreground">Facebook · YouTube · Google Search</p>
                  <p className="text-xs font-semibold text-primary mt-1">Jornada de conversão</p>
                  <p className="text-xs text-muted-foreground">Google Search → LP → WhatsApp → contrato</p>
                  <p className="text-xs font-semibold text-primary mt-1">Mensagem que converte</p>
                  <p className="text-xs text-muted-foreground">Autonomia · Preço justo · Médico que conhece</p>
                </div>
              </div>

              {/* Público B */}
              <div className="p-5 rounded-2xl border border-border flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm">Público B: O Filho Decisor</h3>
                  <Badge variant="outline" className="shrink-0 text-xs">35–55 anos</Badge>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {[
                    "95%+ online, alto consumo de Instagram e Google",
                    "Pesquisa rápida, compara opções",
                    "Filho ou filha que decide e paga",
                    "Mora em BH ou cidades próximas",
                    "Preocupado, culpado, busca tranquilidade",
                    "Precisa saber que o familiar está bem sem estar presente",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 rounded-full shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl p-3 border border-border bg-muted/50 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-primary">Canais primários</p>
                  <p className="text-xs text-muted-foreground">Instagram · Google Search · YouTube</p>
                  <p className="text-xs font-semibold text-primary mt-1">Jornada de conversão</p>
                  <p className="text-xs text-muted-foreground">Instagram/Google → LP → /contratar → contrato</p>
                  <p className="text-xs font-semibold text-primary mt-1">Mensagem que converte</p>
                  <p className="text-xs text-muted-foreground">Segurança · Comunicação 24h · Proximidade</p>
                </div>
              </div>
            </div>
          </PmSection>

          {/* ── 4. Canais ── */}
          <PmSection id="canais" label="Canais recomendados" title="Onde investir, quanto custa e por quê">
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Search,
                  title: "Google Search (SEM)",
                  badge: "Alta prioridade",
                  badgeBg: "#dcfce7",
                  badgeText: "#166534",
                  pct: "35%",
                  linhas: [
                    { label: "CPL estimado BH", value: "R$ 80–150/lead" },
                    { label: "CPC estimado", value: "R$ 3–8/clique" },
                    { label: "Conv. LP estimada", value: "3–5% com LP otimizada" },
                  ],
                  termos: [
                    '"geriatra BH" / "médico idoso belo horizonte"',
                    '"cuidado idoso BH" / "saúde idoso BH"',
                    '"alternativa plano saúde idoso"',
                  ],
                  porque: "Captura intenção ativa — quem já busca solução. Melhor CAC do funil.",
                },
                {
                  icon: Smartphone,
                  title: "Meta Ads (Facebook + Instagram)",
                  badge: "Alta prioridade",
                  badgeBg: "#dcfce7",
                  badgeText: "#166534",
                  pct: "40%",
                  linhas: [
                    { label: "CPL estimado BH", value: "R$ 40–90/lead" },
                    { label: "Público A", value: "Facebook · 45-70 anos · BH+70km" },
                    { label: "Público B", value: "Instagram · 35-55 anos · BH+70km" },
                  ],
                  termos: [],
                  porque: "Maior volume, melhor CPL que Google. Ideal para awareness + geração de leads dos dois públicos.",
                },
                {
                  icon: Play,
                  title: "YouTube",
                  badge: "Média prioridade",
                  badgeBg: "#fef3c7",
                  badgeText: "#92400e",
                  pct: "15%",
                  linhas: [
                    { label: "CPM estimado", value: "R$ 8–20/mil views" },
                    { label: "Formatos", value: "Bumper 6s + In-stream 15-30s" },
                    { label: "Público", value: "45-70 anos BH · interesses saúde" },
                  ],
                  termos: [],
                  porque: "77% dos idosos usam YouTube. Canal ideal para construção de marca e confiança com o Público A.",
                },
                {
                  icon: Monitor,
                  title: "Google Display / Remarketing",
                  badge: "Complementar",
                  badgeBg: "#dbeafe",
                  badgeText: "#1e40af",
                  pct: "5%",
                  linhas: [
                    { label: "CPM estimado", value: "R$ 3–8/mil impressões" },
                    { label: "Audiência", value: "Visitantes LP que não converteram" },
                    { label: "Impacto", value: "+15-25% na taxa de conversão geral" },
                  ],
                  termos: [],
                  porque: "Reimpacto barato. Mantém a marca presente e aumenta a conversão sem aumentar verba principal.",
                },
                {
                  icon: BarChart2,
                  title: "TikTok",
                  badge: "Futuro",
                  badgeBg: "#f3f4f6",
                  badgeText: "#6b7280",
                  pct: "0% agora",
                  linhas: [
                    { label: "Penetração 60+ no BR", value: "Ainda baixa" },
                    { label: "Recomendação", value: "Monitorar, ativar a partir do M7" },
                    { label: "Verba inicial sugerida", value: "R$ 200/mês para testes" },
                  ],
                  termos: [],
                  porque: "Público ainda jovem para o produto, mas crescendo na faixa 45+. Manter no radar.",
                },
              ].map(({ icon: Icon, title, badge, badgeBg, badgeText, pct, linhas, termos, porque }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border border-border">
                  <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <p className="font-semibold text-sm">{title}</p>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: badgeBg, color: badgeText }}
                      >
                        {badge}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2 mb-3">
                      {linhas.map(({ label, value }) => (
                        <div key={label} className="rounded-lg p-2.5 bg-muted/60 border border-border">
                          <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
                          <p className="text-xs font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                    {termos.length > 0 && (
                      <div className="mb-2">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          Termos principais
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {termos.map((t) => (
                            <p key={t} className="text-xs text-muted-foreground">{t}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">{porque}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-base font-bold text-primary">{pct}</p>
                    <p className="text-[10px] text-muted-foreground">da verba</p>
                  </div>
                </div>
              ))}
            </div>
          </PmSection>

          {/* ── 5. Cenários ── */}
          <PmSection id="cenarios" label="Cenários de investimento" title="Três cenários. Uma estratégia.">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {scenarios.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActiveScenario(i as ScenarioIdx)}
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

              {/* Barras */}
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
                Projeções mensais (benchmarks reais)
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
                <span className="font-semibold">Indicado para:</span> {scenario.ideal}
              </p>
            </div>
          </PmSection>

          {/* ── 6. Copies ── */}
          <PmSection id="copies" label="Copies para anúncios" title="Exemplos de copy por canal e público">

            {/* Tabs de canal */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {(["google", "meta", "instagram", "youtube"] as CopyTab[]).map((tab) => {
                const labels: Record<CopyTab, string> = {
                  google: "Google Search",
                  meta: "Meta / Facebook",
                  instagram: "Instagram",
                  youtube: "YouTube",
                }
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveCopyTab(tab)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-border"
                    style={
                      activeCopyTab === tab
                        ? { background: "var(--primary)", color: "var(--primary-foreground)", borderColor: "var(--primary)" }
                        : { background: "var(--card)", color: "var(--foreground)" }
                    }
                  >
                    {labels[tab]}
                  </button>
                )
              })}
            </div>

            {/* Google Search */}
            {activeCopyTab === "google" && (
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    Público A — Idoso (60-74 anos)
                  </p>
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-4 py-3 bg-muted border-b border-border">
                      <p className="text-xs font-semibold text-muted-foreground">Headlines (máx 30 chars)</p>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      {[
                        "Geriatra em BH por R$329/mês",
                        "Médico Idoso BH - Sem Fila",
                        "Cuidado Geriátrico Coordenado",
                        "Sem Carência · Sem Fidelidade",
                        "Atendimento em 48h em BH",
                      ].map((h) => (
                        <div key={h} className="flex items-center gap-2 font-mono text-sm">
                          <span className="text-primary font-bold">H</span>
                          <span>{h}</span>
                          <span className="ml-auto text-[10px] text-muted-foreground">{h.length}/30</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 bg-muted border-t border-b border-border">
                      <p className="text-xs font-semibold text-muted-foreground">Descrições (máx 90 chars)</p>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      {[
                        "Médico e enfermeiro de referência + Pronto Cuidar 24h. R$ 329 para qualquer idade.",
                        "Alternativa ao SUS e planos caros. Equipe geriátrica completa em 6 unidades em BH.",
                      ].map((d) => (
                        <div key={d} className="rounded-lg p-3 bg-muted/50 border border-border">
                          <p className="text-sm leading-relaxed">{d}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{d.length}/90 chars</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    Público B — Filho Decisor (35-55 anos)
                  </p>
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-4 py-3 bg-muted border-b border-border">
                      <p className="text-xs font-semibold text-muted-foreground">Headlines (máx 30 chars)</p>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      {[
                        "Cuidado para Seus Pais em BH",
                        "Médico Dedicado ao Seu Familiar",
                        "Pronto Cuidar 24h em BH",
                        "R$329/mês - Qualquer Idade",
                        "Contrate Pelo WhatsApp Hoje",
                      ].map((h) => (
                        <div key={h} className="flex items-center gap-2 font-mono text-sm">
                          <span className="text-primary font-bold">H</span>
                          <span>{h}</span>
                          <span className="ml-auto text-[10px] text-muted-foreground">{h.length}/30</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 bg-muted border-t border-b border-border">
                      <p className="text-xs font-semibold text-muted-foreground">Descrições (máx 90 chars)</p>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      {[
                        "Seu familiar terá médico e enfermeiro de referência. Você fica informado em tempo real.",
                        "Sem fila, sem burocracia. Equipe geriátrica em BH por R$ 329/mês. Sem carência.",
                      ].map((d) => (
                        <div key={d} className="rounded-lg p-3 bg-muted/50 border border-border">
                          <p className="text-sm leading-relaxed">{d}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{d.length}/90 chars</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Meta / Facebook */}
            {activeCopyTab === "meta" && (
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    Público A — Facebook (60-74 anos)
                  </p>
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-4 py-3 bg-muted border-b border-border">
                      <p className="text-xs font-semibold text-muted-foreground">Primary text</p>
                    </div>
                    <div className="p-4">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {`Aposentado em BH? Perdeu o convênio ou não consegue mais pagar?

A Conviva Saúde oferece médico de referência, enfermeiro dedicado e Pronto Cuidar 24h por R$ 329/mês.

O mesmo valor para qualquer idade. Sem fila. Sem carência.

👉 Fale agora com nossa equipe.`}
                      </p>
                    </div>
                    <div className="px-4 py-3 bg-muted border-t border-border grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Headline</p>
                        <p className="text-xs font-semibold">Cuidado geriátrico em BH por R$ 329/mês</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">CTA</p>
                        <p className="text-xs font-semibold">Saiba mais</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    Público B — Facebook (35-55 anos)
                  </p>
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-4 py-3 bg-muted border-b border-border">
                      <p className="text-xs font-semibold text-muted-foreground">Primary text</p>
                    </div>
                    <div className="p-4">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {`Seu pai ou sua mãe mora em BH e você não consegue estar presente o tempo todo?

A Conviva Saúde tem um enfermeiro dedicado que cuida do seu familiar e te mantém informado pelo WhatsApp.

R$ 329/mês. Pronto Cuidar 24h. Sem burocracia.

Você pode estar em qualquer cidade — a gente cuida de quem você ama em BH. 💙`}
                      </p>
                    </div>
                    <div className="px-4 py-3 bg-muted border-t border-border grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Headline</p>
                        <p className="text-xs font-semibold">Seu familiar bem cuidado em BH</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">CTA</p>
                        <p className="text-xs font-semibold">Saiba mais</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instagram */}
            {activeCopyTab === "instagram" && (
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    Stories e Feed — Público B (35-55 anos)
                  </p>
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-4 py-3 bg-muted border-b border-border">
                      <p className="text-xs font-semibold text-muted-foreground">Copy para visual (sobreposição no criativo)</p>
                    </div>
                    <div className="p-4">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {`Você não precisa estar lá o tempo todo
para saber que ele está bem. 💙

Médico de referência · Enfermeiro dedicado
Pronto Cuidar 24h · R$ 329/mês

@convivasaude`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl p-4 border border-border bg-muted/50">
                  <p className="text-xs font-semibold mb-2">Dicas para Instagram</p>
                  <ul className="flex flex-col gap-1.5">
                    {[
                      "Use sempre fotos reais de idosos sorridentes em contexto de cuidado",
                      "Stories: copy curta, máx 3 linhas, fonte grande e legível",
                      "Feed: visual limpo, logo no canto inferior, CTA claro",
                      "Reels: mostrar rotina do enfermeiro de referência (conteúdo orgânico)",
                      "Hashtags: #saudeidosos #geriatria #BeloHorizonte #cuidadoidoso",
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-primary" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* YouTube */}
            {activeCopyTab === "youtube" && (
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    Bumper 6 segundos — Awareness
                  </p>
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-4 py-3 bg-muted border-b border-border flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground">Script</p>
                      <Badge variant="outline" className="text-[10px]">6 segundos · não pulável</Badge>
                    </div>
                    <div className="p-4">
                      <p className="text-sm leading-relaxed italic">
                        "Cuidado geriátrico em BH. R$ 329. Qualquer idade. Conviva Saúde."
                      </p>
                    </div>
                    <div className="px-4 py-3 bg-muted/50 border-t border-border">
                      <p className="text-[10px] text-muted-foreground">Objetivo: impressão de marca, top of mind. Veicular antes de vídeos de saúde, família e aposentadoria.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    In-stream 15 segundos — Conversão
                  </p>
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-4 py-3 bg-muted border-b border-border flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground">Script</p>
                      <Badge variant="outline" className="text-[10px]">15 segundos · pulável após 5s</Badge>
                    </div>
                    <div className="p-4">
                      <p className="text-sm leading-relaxed italic">
                        "Seu familiar precisa de um médico que o conheça de verdade — não só quando
                        está doente. A Conviva Saúde oferece médico de referência, enfermeiro e
                        Pronto Cuidar 24h por R$ 329/mês. Fale com a gente."
                      </p>
                    </div>
                    <div className="px-4 py-3 bg-muted/50 border-t border-border">
                      <p className="text-[10px] text-muted-foreground">Objetivo: consideração e lead. CTA overlay: "Saiba mais" linkando para a LP. Exibir os 5 primeiros segundos de forma impactante para evitar o skip.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </PmSection>

          {/* ── 7. Tracking ── */}
          <PmSection id="tracking" label="Mensuração" title="O que configurar antes de investir R$ 1">
            <p className="text-sm text-muted-foreground mb-6">
              Nenhum real deve ser investido em mídia antes de ter tracking configurado. Sem dados,
              não há otimização — e o dinheiro vai embora sem aprender.
            </p>

            <div className="flex flex-col gap-4">
              {[
                {
                  titulo: "Google Analytics 4 (GA4)",
                  tag: "Obrigatório",
                  itens: [
                    "Instalar via Google Tag Manager",
                    "Eventos: form_submit, whatsapp_click, page_view /contratar, contratar_concluido",
                    "Ativar relatório de conversões",
                    "Conectar com Google Ads para otimização automática",
                  ],
                },
                {
                  titulo: "Meta Pixel",
                  tag: "Obrigatório",
                  itens: [
                    "Instalar via GTM",
                    "Eventos: Lead (form), Contact (WhatsApp), ViewContent (LP), InitiateCheckout (/contratar)",
                    "Audiences: visitantes LP (30d), iniciaram /contratar sem converter",
                    "Lookalike audiences baseadas em leads qualificados",
                  ],
                },
                {
                  titulo: "Google Tag Manager",
                  tag: "Obrigatório",
                  itens: [
                    "Container único para todos os pixels e tags",
                    "Tags: GA4, Meta Pixel, Google Ads Conversion",
                    "Triggers: form submit, clique WhatsApp, URL /contratar, URL confirmação",
                    "Variáveis de data layer para identificar público e canal",
                  ],
                },
                {
                  titulo: "UTMs padronizados",
                  tag: "Importante",
                  itens: [
                    "utm_source: google / meta / youtube",
                    "utm_medium: cpc / pago / video",
                    "utm_campaign: search-idoso / fb-familiar / yt-awareness",
                    "utm_content: criativo-1 / criativo-2 / criativo-3",
                  ],
                },
                {
                  titulo: "Dashboard — Looker Studio",
                  tag: "Recomendado",
                  itens: [
                    "Gratuito, conecta direto com GA4, Google Ads e Meta",
                    "Métricas semanais: CPL, leads, cliques, CTR, conversões LP",
                    "Acompanhar contratos fechados e CAC por canal",
                    "Revisão quinzenal com time comercial",
                  ],
                },
              ].map(({ titulo, tag, itens }) => (
                <div key={titulo} className="p-5 rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="font-semibold text-sm">{titulo}</p>
                    <Badge
                      variant="outline"
                      className="text-[10px]"
                      style={tag === "Obrigatório" ? { color: "#166534", borderColor: "#bbf7d0" } : {}}
                    >
                      {tag}
                    </Badge>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {itens.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 size-1.5 rounded-full shrink-0 bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </PmSection>

          {/* ── 8. KPIs ── */}
          <PmSection id="kpis" label="KPIs e metas" title="O que medir e quando considerar sucesso">
            <div className="rounded-2xl overflow-hidden border border-border">
              {/* Header */}
              <div
                className="grid gap-2 px-4 py-3 bg-muted text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                style={{ gridTemplateColumns: "2fr 1.2fr 1fr 0.8fr 0.8fr 0.8fr" }}
              >
                <span>KPI</span>
                <span>Ferramenta</span>
                <span>Ref. mercado</span>
                <span>Meta M3</span>
                <span>Meta M6</span>
                <span className="text-primary">Meta M12</span>
              </div>
              {kpis.map(({ kpi, ferramenta, ref, m3, m6, m12 }, i) => (
                <div
                  key={kpi}
                  className="grid gap-2 px-4 py-3 items-center border-t border-border"
                  style={{
                    gridTemplateColumns: "2fr 1.2fr 1fr 0.8fr 0.8fr 0.8fr",
                    background: i % 2 === 0 ? "var(--card)" : "var(--background)",
                  }}
                >
                  <p className="text-sm font-medium">{kpi}</p>
                  <p className="text-xs text-muted-foreground">{ferramenta}</p>
                  <p className="text-xs text-muted-foreground">{ref}</p>
                  <p className="text-sm">{m3}</p>
                  <p className="text-sm">{m6}</p>
                  <p className="text-sm font-semibold text-primary">{m12}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2.5 p-4 rounded-xl border border-border bg-muted/50">
              <Info className="size-4 shrink-0 mt-0.5 text-primary" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                LTV calculado com base em R$ 329/mês × 36 meses de permanência média.
                LTV:CAC muito acima de 3:1 indica unit economics excelentes para escalar agressivamente.
              </p>
            </div>
          </PmSection>

          {/* ── 9. Calendário ── */}
          <PmSection id="calendario" label="Calendário" title="Cronograma de execução 2026">
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {trimestres.map(({ periodo, fase, badgeColor, faseLabel, checklist }) => (
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
                    {checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Square className="size-3.5 shrink-0 mt-0.5 opacity-40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-5 rounded-2xl border border-border bg-muted/50">
              <Info className="size-4 shrink-0 mt-0.5 text-primary" />
              <div>
                <p className="text-xs font-semibold mb-1">Sobre as projeções</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Todas as projeções são estimativas baseadas em benchmarks de mercado (WordStream
                  2025, IBGE/PNAD 2024, Leadster 2025, Sebrae 2025). Os resultados reais dependem
                  da qualidade dos criativos, otimização contínua das campanhas e taxa de fechamento
                  do time comercial. Revisar KPIs mensalmente e redistribuir verba conforme
                  performance real.
                </p>
              </div>
            </div>
          </PmSection>

        </main>
      </div>
    </>
  )
}
