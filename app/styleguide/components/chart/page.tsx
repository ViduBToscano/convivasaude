"use client"

import { useState } from "react"
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, TrendingUp, TrendingDown } from "lucide-react"

// ── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, description, children }: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="border-t pt-6">{children}</div>
    </section>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="rounded-lg bg-muted px-4 py-3 text-xs font-mono text-foreground overflow-x-auto leading-relaxed">
      {code.trim()}
    </pre>
  )
}

// ── Dados ─────────────────────────────────────────────────────────────────────

const pressaoArterialData = [
  { hora: "06:00", sistolica: 128, diastolica: 82 },
  { hora: "08:00", sistolica: 135, diastolica: 88 },
  { hora: "10:00", sistolica: 140, diastolica: 90 },
  { hora: "12:00", sistolica: 138, diastolica: 87 },
  { hora: "14:00", sistolica: 132, diastolica: 84 },
  { hora: "16:00", sistolica: 129, diastolica: 81 },
  { hora: "18:00", sistolica: 136, diastolica: 86 },
  { hora: "20:00", sistolica: 125, diastolica: 79 },
  { hora: "22:00", sistolica: 120, diastolica: 76 },
]

const visitasMensaisData = [
  { mes: "Jan", agendadas: 8, realizadas: 6, canceladas: 2 },
  { mes: "Fev", agendadas: 12, realizadas: 10, canceladas: 2 },
  { mes: "Mar", agendadas: 9, realizadas: 8, canceladas: 1 },
  { mes: "Abr", agendadas: 15, realizadas: 13, canceladas: 2 },
  { mes: "Mai", agendadas: 11, realizadas: 10, canceladas: 1 },
  { mes: "Jun", agendadas: 14, realizadas: 12, canceladas: 2 },
]

const monitoramentoData = [
  { dia: "Seg", caminhada: 3200, hidratacao: 1800, sono: 7.2 },
  { dia: "Ter", caminhada: 4100, hidratacao: 2100, sono: 6.8 },
  { dia: "Qua", caminhada: 2800, hidratacao: 1600, sono: 8.1 },
  { dia: "Qui", caminhada: 5200, hidratacao: 2400, sono: 7.5 },
  { dia: "Sex", caminhada: 3900, hidratacao: 1900, sono: 6.5 },
  { dia: "Sáb", caminhada: 6100, hidratacao: 2700, sono: 9.0 },
  { dia: "Dom", caminhada: 2100, hidratacao: 1500, sono: 8.5 },
]

const tiposAtendimentoData = [
  { name: "Visita Domiciliar", value: 45, fill: "var(--chart-1)" },
  { name: "Teleconsulta", value: 30, fill: "var(--chart-2)" },
  { name: "Na Clínica", value: 15, fill: "var(--chart-3)" },
  { name: "Urgência", value: 10, fill: "var(--chart-4)" },
]

const pontuacaoSaudeData = [
  { name: "Cardiovascular", score: 78, fill: "var(--chart-1)" },
  { name: "Sono", score: 82, fill: "var(--chart-2)" },
  { name: "Nutrição", score: 65, fill: "var(--chart-3)" },
  { name: "Mobilidade", score: 88, fill: "var(--chart-5)" },
]

const acompanhamentoBpData = [
  { mes: "Jan", sistolica: 142, diastolica: 90, pulso: 72 },
  { mes: "Fev", sistolica: 138, diastolica: 88, pulso: 70 },
  { mes: "Mar", sistolica: 135, diastolica: 86, pulso: 68 },
  { mes: "Abr", sistolica: 132, diastolica: 84, pulso: 67 },
  { mes: "Mai", sistolica: 128, diastolica: 82, pulso: 65 },
  { mes: "Jun", sistolica: 125, diastolica: 80, pulso: 64 },
]

// ── ChartConfigs ──────────────────────────────────────────────────────────────

const pressaoConfig: ChartConfig = {
  sistolica: { label: "Sistólica (mmHg)", color: "var(--chart-4)" },
  diastolica: { label: "Diastólica (mmHg)", color: "var(--chart-1)" },
}

const visitasConfig: ChartConfig = {
  agendadas: { label: "Agendadas", color: "var(--chart-1)" },
  realizadas: { label: "Realizadas", color: "var(--chart-3)" },
  canceladas: { label: "Canceladas", color: "var(--chart-4)" },
}

const monitoramentoConfig: ChartConfig = {
  caminhada: { label: "Passos", color: "var(--chart-1)" },
  hidratacao: { label: "Hidratação (ml)", color: "var(--chart-5)" },
}

const tiposConfig: ChartConfig = {
  "Visita Domiciliar": { label: "Visita Domiciliar", color: "var(--chart-1)" },
  "Teleconsulta": { label: "Teleconsulta", color: "var(--chart-2)" },
  "Na Clínica": { label: "Na Clínica", color: "var(--chart-3)" },
  "Urgência": { label: "Urgência", color: "var(--chart-4)" },
}

const bpConfig: ChartConfig = {
  sistolica: { label: "Sistólica", color: "var(--chart-4)" },
  diastolica: { label: "Diastólica", color: "var(--chart-1)" },
  pulso: { label: "Pulso", color: "var(--chart-3)" },
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ChartShowcasePage() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark((d) => !d)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="p-10 max-w-5xl mx-auto flex flex-col gap-14">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Componentes</p>
          <h1 className="text-3xl font-bold tracking-tight">Gráfico</h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-lg">
            Visualização de dados com <strong>Recharts</strong>. O{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">ChartContainer</code>{" "}
            injeta cores CSS dos seus tokens de design. Funciona com qualquer tipo de gráfico Recharts.
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={toggleDark} aria-label="Alternar modo escuro">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>

      {/* ── Import ── */}
      <Section title="Importação">
        <CodeBlock code={`import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

// Primitivas Recharts usadas diretamente:
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"`} />
      </Section>

      {/* ── ChartConfig ── */}
      <Section
        title="ChartConfig"
        description="Mapeia as chaves dos seus dados para rótulos e cores. As cores referenciam variáveis CSS — se atualizam automaticamente no modo escuro."
      >
        <CodeBlock code={`const chartConfig: ChartConfig = {
  // Use variável CSS (recomendado — atualiza com modo escuro)
  visitas: { label: "Visitas", color: "var(--chart-1)" },

  // Use uma cor hexadecimal fixa
  receita: { label: "Receita", color: "#5A81FA" },

  // Ciente de tema: cores diferentes por modo
  consultas: {
    label: "Consultas",
    theme: {
      light: "#5A81FA",
      dark: "#818cf8",
    },
  },
}

// Em seguida passe para ChartContainer:
<ChartContainer config={chartConfig} className="h-[250px]">
  <LineChart data={data}>…</LineChart>
</ChartContainer>`} />
      </Section>

      {/* ── Line Chart ── */}
      <Section title="Gráfico de Linha" description="Ideal para tendências ao longo do tempo. Usa indicadores de ponto, linha ou tracejado no tooltip.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pressão Arterial Hoje</CardTitle>
              <CardDescription>Sistólica e diastólica — visão geral de 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={pressaoConfig} className="h-[200px]">
                <LineChart data={pressaoArterialData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hora" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[60, 160]} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Line
                    type="monotone"
                    dataKey="sistolica"
                    stroke="var(--color-sistolica)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolica"
                    stroke="var(--color-diastolica)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <CodeBlock code={`const config: ChartConfig = {
  sistolica:  { label: "Sistólica",  color: "var(--chart-4)" },
  diastolica: { label: "Diastólica", color: "var(--chart-1)" },
}

<ChartContainer config={config} className="h-[200px]">
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis dataKey="hora" />
    <YAxis />
    <ChartTooltip
      content={<ChartTooltipContent indicator="dot" />}
    />
    <Line
      dataKey="sistolica"
      stroke="var(--color-sistolica)"
      strokeWidth={2}
      dot={false}
    />
    <Line
      dataKey="diastolica"
      stroke="var(--color-diastolica)"
      strokeDasharray="4 4"
      dot={false}
    />
  </LineChart>
</ChartContainer>`} />
        </div>
      </Section>

      {/* ── Bar Chart ── */}
      <Section title="Gráfico de Barras" description="Ótimo para comparar categorias. Suporta layouts agrupados e empilhados.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Visitas Mensais de Cuidadores</CardTitle>
              <CardDescription>Agendadas vs realizadas vs canceladas</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={visitasConfig} className="h-[200px]">
                <BarChart data={visitasMensaisData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="agendadas" fill="var(--color-agendadas)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="realizadas" fill="var(--color-realizadas)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="canceladas" fill="var(--color-canceladas)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <CodeBlock code={`const config: ChartConfig = {
  agendadas:  { label: "Agendadas",  color: "var(--chart-1)" },
  realizadas: { label: "Realizadas", color: "var(--chart-3)" },
  canceladas: { label: "Canceladas", color: "var(--chart-4)" },
}

<ChartContainer config={config} className="h-[200px]">
  <BarChart data={data} barGap={2}>
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis dataKey="mes" />
    <ChartTooltip
      content={<ChartTooltipContent indicator="line" />}
    />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="agendadas"  fill="var(--color-agendadas)"  radius={[3,3,0,0]} />
    <Bar dataKey="realizadas" fill="var(--color-realizadas)" radius={[3,3,0,0]} />
    <Bar dataKey="canceladas" fill="var(--color-canceladas)" radius={[3,3,0,0]} />
  </BarChart>
</ChartContainer>`} />
        </div>
      </Section>

      {/* ── Area Chart ── */}
      <Section title="Gráfico de Área" description="Como um gráfico de linha mas com regiões preenchidas — bom para volume ou dados cumulativos.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento Semanal</CardTitle>
              <CardDescription>Passos e hidratação diária do paciente</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={monitoramentoConfig} className="h-[200px]">
                <AreaChart data={monitoramentoData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="passosGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="hidraGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="dia" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    type="monotone"
                    dataKey="caminhada"
                    stroke="var(--color-caminhada)"
                    strokeWidth={2}
                    fill="url(#passosGrad)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="hidratacao"
                    stroke="var(--color-hidratacao)"
                    strokeWidth={2}
                    fill="url(#hidraGrad)"
                    dot={false}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <CodeBlock code={`<ChartContainer config={config} className="h-[200px]">
  <AreaChart data={data}>
    <defs>
      <linearGradient id="passosGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%"  stopColor="var(--chart-1)" stopOpacity={0.25} />
        <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
      </linearGradient>
    </defs>
    <Area
      dataKey="caminhada"
      stroke="var(--color-caminhada)"
      strokeWidth={2}
      fill="url(#passosGrad)"
      dot={false}
    />
  </AreaChart>
</ChartContainer>`} />
        </div>
      </Section>

      {/* ── Pie / Donut ── */}
      <Section title="Gráfico de Pizza e Rosca" description="Para relações parte-todo. Defina innerRadius para uma rosca.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Pizza */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tipos de Atendimento</CardTitle>
                <CardDescription>Gráfico de pizza</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={tiposConfig} className="h-[160px]">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={tiposAtendimentoData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                    >
                      {tiposAtendimentoData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                  {tiposAtendimentoData.map((d) => (
                    <div key={d.name} className="flex items-center gap-1">
                      <span className="size-2 rounded-full shrink-0" style={{ background: d.fill }} />
                      <span className="text-[10px] text-muted-foreground">{d.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rosca */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tipos de Atendimento</CardTitle>
                <CardDescription>Gráfico de rosca</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ChartContainer config={tiposConfig} className="h-[160px] w-full">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={tiposAtendimentoData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={64}
                      strokeWidth={2}
                    >
                      {tiposAtendimentoData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <p className="text-xs text-muted-foreground -mt-1">innerRadius=42</p>
              </CardContent>
            </Card>
          </div>

          <CodeBlock code={`const data = [
  { name: "Visita Domiciliar", value: 45, fill: "var(--chart-1)" },
  { name: "Teleconsulta",      value: 30, fill: "var(--chart-2)" },
]

{/* Pizza */}
<PieChart>
  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
  <Pie data={data} dataKey="value" nameKey="name"
       outerRadius={60}>
    {data.map((entry, i) => (
      <Cell key={i} fill={entry.fill} />
    ))}
  </Pie>
</PieChart>

{/* Rosca — adicione innerRadius */}
<Pie ... innerRadius={42} outerRadius={64} />`} />
        </div>
      </Section>

      {/* ── Radial Bar ── */}
      <Section title="Gráfico de Barras Radial" description="Bom para pontuações, progresso ou comparações classificadas em layout circular.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pontuação de Saúde do Idoso</CardTitle>
              <CardDescription>Pontuações por categoria, de 0 a 100</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <ChartContainer config={{}} className="h-[220px] w-full max-w-xs">
                <RadialBarChart
                  data={pontuacaoSaudeData}
                  innerRadius={30}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  barSize={12}
                >
                  <RadialBar
                    dataKey="score"
                    background
                    cornerRadius={6}
                    label={{ position: "insideStart", fill: "transparent" }}
                  />
                  <Tooltip
                    content={({ payload }) =>
                      payload?.[0] ? (
                        <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
                          <p className="font-medium">{payload[0].payload.name}</p>
                          <p className="text-muted-foreground">{payload[0].value}/100</p>
                        </div>
                      ) : null
                    }
                  />
                </RadialBarChart>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 w-full max-w-xs">
                {pontuacaoSaudeData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
                      <span className="text-xs text-muted-foreground">{d.name}</span>
                    </div>
                    <span className="text-xs font-semibold">{d.score}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <CodeBlock code={`import { RadialBarChart, RadialBar } from "recharts"

const data = [
  { name: "Cardiovascular", score: 78, fill: "var(--chart-1)" },
  { name: "Sono",           score: 82, fill: "var(--chart-2)" },
  { name: "Nutrição",       score: 65, fill: "var(--chart-3)" },
]

<ChartContainer config={{}} className="h-[220px]">
  <RadialBarChart
    data={data}
    innerRadius={30}
    outerRadius={100}
    startAngle={90}
    endAngle={-270}
    barSize={12}
  >
    <RadialBar
      dataKey="score"
      background
      cornerRadius={6}
    />
  </RadialBarChart>
</ChartContainer>`} />
        </div>
      </Section>

      {/* ── Multi-line ── */}
      <Section title="Gráfico de Múltiplas Linhas" description="Várias linhas com legenda e tooltip tracejado — ideal para acompanhamento de pressão arterial.">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Acompanhamento de Pressão Arterial</CardTitle>
              <CardDescription>Sistólica / diastólica / pulso — últimos 6 meses</CardDescription>
            </div>
            <div className="flex items-center gap-1 text-success text-xs font-medium">
              <TrendingDown className="size-3.5" />
              Melhorando
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={bpConfig} className="h-[220px]">
              <LineChart data={acompanhamentoBpData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[55, 155]} />
                <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="sistolica"  stroke="var(--color-sistolica)"  strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="diastolica" stroke="var(--color-diastolica)" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="pulso"      stroke="var(--color-pulso)"      strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 3" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Section>

      {/* ── Dashboard grid ── */}
      <Section
        title="Exemplo Real — Painel de Saúde do Idoso"
        description="Visão geral de saúde do paciente combinando múltiplos tipos de gráfico em um grid de cards."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Pressão Arterial", value: "125/80", delta: "Controlada", up: null },
            { label: "Pulso", value: "64 bpm", delta: "-5%", up: false },
            { label: "Passos Hoje", value: "3.900", delta: "+8%", up: true },
            { label: "Visitas", value: "14", delta: "Este mês", up: null },
          ].map(({ label, value, delta, up }) => (
            <Card key={label} size="sm">
              <CardHeader>
                <CardDescription className="text-xs">{label}</CardDescription>
                <CardTitle className="text-xl leading-tight">{value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  {up !== null && (
                    up
                      ? <TrendingUp className="size-3 text-success" />
                      : <TrendingDown className="size-3 text-destructive" />
                  )}
                  <span className={`text-[10px] ${up === true ? "text-success" : up === false ? "text-destructive" : "text-muted-foreground"}`}>
                    {delta}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Área de passos */}
          <Card>
            <CardHeader>
              <CardTitle>Passos Diários</CardTitle>
              <CardDescription>Esta semana</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ caminhada: { label: "Passos", color: "var(--chart-1)" } }} className="h-[160px]">
                <AreaChart data={monitoramentoData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="dashPassos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="dia" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Area type="monotone" dataKey="caminhada" stroke="var(--color-caminhada)" strokeWidth={2} fill="url(#dashPassos)" dot={false} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Rosca de tipos de atendimento */}
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Atendimento</CardTitle>
              <CardDescription>Distribuição este mês</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <ChartContainer config={tiposConfig} className="h-[160px] w-40 shrink-0">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={tiposAtendimentoData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={38} outerRadius={60} strokeWidth={2}>
                    {tiposAtendimentoData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="flex flex-col gap-2 flex-1">
                {tiposAtendimentoData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full shrink-0" style={{ background: d.fill }} />
                      <span className="text-xs text-muted-foreground">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold">{d.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── Tooltip indicators ── */}
      <Section title="Estilos de Indicador do Tooltip" description='ChartTooltipContent aceita indicator="dot" | "line" | "dashed". Use hideLabel para suprimir o rótulo de data/categoria.'>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(["dot", "line", "dashed"] as const).map((indicator) => (
            <Card key={indicator} size="sm">
              <CardHeader>
                <CardTitle className="text-sm font-mono">indicator="{indicator}"</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ agendadas: { label: "Agendadas", color: "var(--chart-1)" }, realizadas: { label: "Realizadas", color: "var(--chart-3)" } }} className="h-[120px]">
                  <BarChart data={visitasMensaisData.slice(0, 4)} margin={{ top: 4, right: 4, bottom: 0, left: -30 }} barGap={2}>
                    <XAxis dataKey="mes" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator={indicator} />} />
                    <Bar dataKey="agendadas" fill="var(--color-agendadas)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="realizadas" fill="var(--color-realizadas)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Props ── */}
      <Section title="Referência de Props">
        <div className="rounded-xl ring-1 ring-foreground/10 overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left font-semibold p-3 pr-4">Componente</th>
                <th className="text-left font-semibold p-3 pr-4">Prop</th>
                <th className="text-left font-semibold p-3 pr-4">Tipo</th>
                <th className="text-left font-semibold p-3">Padrão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["ChartContainer", "config", "ChartConfig", "obrigatório"],
                ["ChartContainer", "className", "string", "—"],
                ["ChartContainer", "id", "string", "auto"],
                ["ChartTooltipContent", "indicator", '"dot" | "line" | "dashed"', '"dot"'],
                ["ChartTooltipContent", "hideLabel", "boolean", "false"],
                ["ChartTooltipContent", "hideIndicator", "boolean", "false"],
                ["ChartTooltipContent", "labelFormatter", "function", "—"],
                ["ChartTooltipContent", "formatter", "function", "—"],
                ["ChartLegendContent", "hideIcon", "boolean", "false"],
                ["ChartLegendContent", "verticalAlign", '"top" | "bottom"', '"bottom"'],
              ].map(([comp, prop, type, def]) => (
                <tr key={`${comp}-${prop}`} className="hover:bg-muted/30">
                  <td className="p-3 pr-4 font-mono text-primary">{comp}</td>
                  <td className="p-3 pr-4 font-mono">{prop}</td>
                  <td className="p-3 pr-4 font-mono text-muted-foreground">{type}</td>
                  <td className="p-3 font-mono text-muted-foreground">{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Colour tokens ── */}
      <Section title="Tokens de Cor dos Gráficos">
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col gap-1 items-center">
              <div className="h-10 w-20 rounded-lg border border-black/5" style={{ background: `var(--chart-${n})` }} />
              <p className="text-xs font-mono text-muted-foreground">{`--chart-${n}`}</p>
              <p className="text-[10px] text-muted-foreground">
                {["Azul Sereno", "Ardósia", "Verde Sage", "Pêssego", "Lavanda"][n - 1]}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Em <code className="font-mono bg-muted px-1 rounded">ChartConfig</code>, referencie como{" "}
          <code className="font-mono bg-muted px-1 rounded">color: "var(--chart-1)"</code>. Dentro
          das props Recharts, use a forma injetada <code className="font-mono bg-muted px-1 rounded">var(--color-nomeChave)</code>.
        </p>
      </Section>

    </div>
  )
}
