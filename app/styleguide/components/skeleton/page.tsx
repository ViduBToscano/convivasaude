"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card"
import { Moon, Sun, Star, MapPin, Heart } from "lucide-react"

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

// ── Composições de Skeleton ─────────────────────────────────────────────────

function CuidadorCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="size-4 rounded-sm" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="size-3.5 rounded-sm" />
          ))}
          <Skeleton className="h-3 w-6 ml-1" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-8 flex-1 rounded-lg" />
          <Skeleton className="h-8 flex-1 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}

function CuidadorCardLoaded() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
            AF
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium">Dra. Ana Ferreira</p>
            <p className="text-xs text-muted-foreground">Geriatria · Cuidados Domiciliares</p>
          </div>
          <button className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
            <Heart className="size-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-0.5 items-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-warning text-warning" />
          ))}
          <Star className="size-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground ml-1">4.0</span>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">8 anos exp.</Badge>
          <Badge variant="outline">Disponível</Badge>
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="ghost" size="sm" className="flex-1">Mensagem</Button>
          <Button size="sm" className="flex-1">Agendar</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ListaPlanosSkeleton() {
  return (
    <div className="flex flex-col divide-y divide-border">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-3">
          <Skeleton className="size-10 rounded-lg shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ListaPlanosLoaded() {
  const planos = [
    { name: "Plano Bem-Estar Sênior", cobertura: "Cobertura completa", avaliacao: "5.0", badge: "Ativo" },
    { name: "Plano Cuidado Essencial", cobertura: "Consultas e visitas", avaliacao: "4.7", badge: "Ativo" },
    { name: "Plano Monitoramento 24h", cobertura: "Suporte contínuo", avaliacao: "4.5", badge: "Pendente" },
  ]
  return (
    <div className="flex flex-col divide-y divide-border">
      {planos.map((p) => (
        <div key={p.name} className="flex items-center gap-3 py-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">+</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{p.name}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="size-3" />{p.cobertura}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-xs font-semibold">★ {p.avaliacao}</p>
            <Badge variant="outline" className="text-[10px] h-5">{p.badge}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

function PerfilPacienteSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
      <Skeleton className="size-16 rounded-full shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3 w-48" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-8 w-24 rounded-lg" />
    </div>
  )
}

function PerfilPacienteLoaded() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
      <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">J</div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold">José Silva</p>
        <p className="text-sm text-muted-foreground">jose.silva@exemplo.com.br · Paciente desde 2022</p>
        <div className="flex gap-2 mt-1.5">
          <Badge>Premium</Badge>
          <Badge variant="secondary">Verificado</Badge>
        </div>
      </div>
      <Button size="sm" variant="outline">Editar perfil</Button>
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} size="sm">
          <CardHeader>
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-14 mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-3 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StatsLoaded() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Pressão Arterial", value: "125/80", note: "Controlada" },
        { label: "Pulso", value: "64 bpm", note: "Em repouso" },
        { label: "Passos Hoje", value: "3.900", note: "+8% vs média" },
        { label: "Visitas", value: "14", note: "Este mês" },
      ].map(({ label, value, note }) => (
        <Card key={label} size="sm">
          <CardHeader>
            <CardDescription className="text-xs">{label}</CardDescription>
            <CardTitle className="text-xl">{value}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[10px] text-muted-foreground">{note}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center gap-4 px-4 py-3 bg-muted/50 border-b border-border">
        {[80, 120, 60, 50, 64].map((w, i) => (
          <Skeleton key={i} className="h-3 rounded" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0">
          <Skeleton className="size-7 rounded-full shrink-0" style={{ width: 80 }} />
          <Skeleton className="h-3 rounded" style={{ width: 120 }} />
          <Skeleton className="h-3 rounded" style={{ width: 60 }} />
          <Skeleton className="h-3 rounded" style={{ width: 50 }} />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  )
}

function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between px-6 py-3 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2">
        <Skeleton className="size-7 rounded-lg" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-lg" />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="size-8 rounded-full" />
      </div>
    </div>
  )
}

function ChatSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-border">
      <div className="flex items-end gap-2">
        <Skeleton className="size-7 rounded-full shrink-0" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-10 w-48 rounded-xl rounded-bl-sm" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="flex items-end gap-2 flex-row-reverse">
        <Skeleton className="size-7 rounded-full shrink-0" />
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="h-8 w-36 rounded-xl rounded-br-sm" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <Skeleton className="size-7 rounded-full shrink-0" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-14 w-56 rounded-xl rounded-bl-sm" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1 pt-3 border-t border-border">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="size-9 rounded-lg shrink-0" />
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SkeletonShowcasePage() {
  const [dark, setDark] = useState(false)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})

  const toggleDark = () => {
    setDark((d) => !d)
    document.documentElement.classList.toggle("dark")
  }

  const toggle = (key: string) =>
    setLoaded((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="p-10 max-w-5xl mx-auto flex flex-col gap-14">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Componentes</p>
          <h1 className="text-3xl font-bold tracking-tight">Skeleton</h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-lg">
            Um único primitivo animado — <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">animate-pulse bg-muted</code> — que
            você compõe em placeholders de carregamento correspondentes aos seus layouts reais. Reduz a latência percebida e evita mudanças de layout.
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={toggleDark} aria-label="Alternar modo escuro">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>

      {/* ── Import ── */}
      <Section title="Importação">
        <CodeBlock code={`import { Skeleton } from "@/components/ui/skeleton"`} />
      </Section>

      {/* ── Primitive shapes ── */}
      <Section
        title="Formas Primitivas"
        description="Skeleton é uma div simples. Controle a forma com className — largura, altura e border-radius."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-2">Linhas de texto</p>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-2">Avatar / círculo</p>
              <div className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="size-10 rounded-full" />
                <Skeleton className="size-12 rounded-full" />
                <Skeleton className="size-16 rounded-full" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-2">Miniatura / imagem</p>
              <div className="flex items-end gap-3">
                <Skeleton className="size-12 rounded-lg" />
                <Skeleton className="size-16 rounded-lg" />
                <Skeleton className="w-24 h-16 rounded-lg" />
                <Skeleton className="w-32 h-20 rounded-xl" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-2">Botão / badge / pílula</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-28 rounded-lg" />
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>

          <CodeBlock code={`{/* Linhas de texto */}
<Skeleton className="h-5 w-3/4" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-5/6" />

{/* Avatar circular */}
<Skeleton className="size-10 rounded-full" />

{/* Miniatura */}
<Skeleton className="w-24 h-16 rounded-lg" />

{/* Botão */}
<Skeleton className="h-8 w-24 rounded-lg" />

{/* Badge / pílula */}
<Skeleton className="h-5 w-16 rounded-full" />`} />
        </div>
      </Section>

      {/* ── Live toggles ── */}
      <Section
        title="Transições Carregando → Carregado"
        description="Alterne entre o skeleton e o conteúdo real para visualizar os estados de carregamento no contexto."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* Card de cuidador */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Card de Cuidador</p>
              <Button size="xs" variant="outline" onClick={() => toggle("cuidador")}>
                {loaded.cuidador ? "Mostrar esqueleto" : "Mostrar carregado"}
              </Button>
            </div>
            {loaded.cuidador ? <CuidadorCardLoaded /> : <CuidadorCardSkeleton />}
          </div>

          {/* Lista de planos */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lista de Planos</p>
              <Button size="xs" variant="outline" onClick={() => toggle("planos")}>
                {loaded.planos ? "Mostrar esqueleto" : "Mostrar carregado"}
              </Button>
            </div>
            <Card>
              <CardContent className="pt-2 pb-1">
                {loaded.planos ? <ListaPlanosLoaded /> : <ListaPlanosSkeleton />}
              </CardContent>
            </Card>
          </div>

          {/* Perfil do paciente */}
          <div className="flex flex-col gap-3 sm:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Perfil do Paciente</p>
              <Button size="xs" variant="outline" onClick={() => toggle("perfil")}>
                {loaded.perfil ? "Mostrar esqueleto" : "Mostrar carregado"}
              </Button>
            </div>
            {loaded.perfil ? <PerfilPacienteLoaded /> : <PerfilPacienteSkeleton />}
          </div>

        </div>
      </Section>

      {/* ── Stat cards ── */}
      <Section
        title="Cards de Métricas"
        description="Grade de cards de métricas — comum em painéis e resumos de saúde."
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Alterne para comparar</p>
            <Button size="xs" variant="outline" onClick={() => toggle("stats")}>
              {loaded.stats ? "Mostrar esqueleto" : "Mostrar carregado"}
            </Button>
          </div>
          {loaded.stats ? <StatsLoaded /> : <StatsSkeleton />}
        </div>
      </Section>

      {/* ── Table ── */}
      <Section
        title="Tabela de Dados"
        description="Skeleton linha por linha com linha de cabeçalho — espelha as larguras de coluna da sua tabela real."
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Larguras de coluna correspondem à tabela real</p>
            <Button size="xs" variant="outline" onClick={() => toggle("tabela")}>
              {loaded.tabela ? "Mostrar esqueleto" : "Mostrar carregado"}
            </Button>
          </div>
          {loaded.tabela ? (
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-3 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground">
                <span style={{ width: 80 }}>Cuidador</span>
                <span style={{ width: 120 }}>Especialidade</span>
                <span style={{ width: 60 }}>Avaliação</span>
                <span style={{ width: 50 }}>Pacientes</span>
                <span style={{ width: 64 }}>Status</span>
              </div>
              {[
                ["Dra. Ferreira", "Geriatria", "4.9", "340", "Disponível"],
                ["Enf. Patel", "Enfermagem", "4.7", "210", "Ocupado"],
                ["Dr. Chen", "Clínica Geral", "4.8", "580", "Disponível"],
                ["Dra. Kim", "Nutrição", "4.6", "190", "Ausente"],
              ].map(([nome, esp, avaliacao, pacientes, status]) => (
                <div key={nome} className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0 text-sm">
                  <div className="flex items-center gap-2" style={{ width: 80 }}>
                    <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                      {nome.split(" ")[1][0]}
                    </div>
                  </div>
                  <span style={{ width: 120 }}>{esp}</span>
                  <span style={{ width: 60 }}>★ {avaliacao}</span>
                  <span style={{ width: 50 }}>{pacientes}</span>
                  <Badge variant={status === "Disponível" ? "default" : "secondary"} className="text-[10px]">{status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <TableSkeleton />
          )}
        </div>
      </Section>

      {/* ── Navbar ── */}
      <Section
        title="Barra de Navegação"
        description="Skeleton do cabeçalho do app — alinhado para corresponder aos slots de logo, links e avatar da navbar real."
      >
        <NavbarSkeleton />
        <div className="mt-4">
          <CodeBlock code={`function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between px-6 py-3 rounded-xl border">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Skeleton className="size-7 rounded-lg" />
        <Skeleton className="h-4 w-20" />
      </div>
      {/* Links de navegação */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-lg" />
        ))}
      </div>
      {/* Ações */}
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="size-8 rounded-full" />
      </div>
    </div>
  )
}`} />
        </div>
      </Section>

      {/* ── Chat ── */}
      <Section
        title="Chat / Mensagens"
        description="Bolhas de mensagens enviadas e recebidas alternadas — alinhe a direção com a orientação da mensagem."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ChatSkeleton />
          <CodeBlock code={`{/* Mensagem recebida */}
<div className="flex items-end gap-2">
  <Skeleton className="size-7 rounded-full shrink-0" />
  <div className="flex flex-col gap-1">
    <Skeleton className="h-10 w-48 rounded-xl rounded-bl-sm" />
    <Skeleton className="h-3 w-12" />      {/* horário */}
  </div>
</div>

{/* Mensagem enviada — direção invertida */}
<div className="flex items-end gap-2 flex-row-reverse">
  <Skeleton className="size-7 rounded-full shrink-0" />
  <div className="flex flex-col items-end gap-1">
    <Skeleton className="h-8 w-36 rounded-xl rounded-br-sm" />
    <Skeleton className="h-3 w-10" />
  </div>
</div>`} />
        </div>
      </Section>

      {/* ── Pattern: match real layout ── */}
      <Section
        title="Padrão: Espelhe Seu Layout Real"
        description="O skeleton deve ser uma cópia estrutural do estado carregado — mesmas dimensões, mesmo grid, mesmo espaçamento."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono text-muted-foreground">Skeleton</p>
            <Card size="sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg shrink-0" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-8 w-full rounded-lg mt-1" />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono text-muted-foreground">Carregado</p>
            <Card size="sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">+</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Plano Bem-Estar Sênior</p>
                    <p className="text-xs text-muted-foreground">Seg–Sex, 8–20h</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">Ativo</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cuidado completo para idosos com visitas domiciliares e monitoramento contínuo.
                </p>
                <Button size="sm" className="w-full mt-1">Agendar Visita</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* ── Usage pattern ── */}
      <Section title="Padrão de Uso">
        <CodeBlock code={`// 1. Controle o estado de carregamento
const [carregando, setCarregando] = useState(true)

// 2. Renderize o skeleton ou o conteúdo real
return carregando ? <CuidadorCardSkeleton /> : <CuidadorCard cuidador={dados} />

// ---

// Para dados assíncronos com React / Next.js:
if (!dados) {
  return <CuidadorCardSkeleton />
}
return <CuidadorCard cuidador={dados} />

// ---

// Boa prática: a altura/largura do skeleton deve corresponder
// ao elemento carregado o mais próximo possível.
// Isso evita mudanças de layout ao concluir o carregamento.`} />
      </Section>

      {/* ── Accessibility ── */}
      <Section title="Acessibilidade">
        <div className="rounded-xl bg-muted border border-border p-5 flex flex-col gap-2 text-sm">
          <p><strong>aria-busy:</strong> Adicione <code className="font-mono text-xs bg-background px-1 rounded border">aria-busy="true"</code> ao contêiner pai do skeleton para que leitores de tela saibam que o conteúdo está carregando.</p>
          <p><strong>aria-label:</strong> Opcionalmente adicione um rótulo descritivo — ex.: <code className="font-mono text-xs bg-background px-1 rounded border">aria-label="Carregando perfil do cuidador"</code>.</p>
          <p><strong>Redução de movimento:</strong> <code className="font-mono text-xs bg-background px-1 rounded border">animate-pulse</code> respeita a media query <code className="font-mono text-xs bg-background px-1 rounded border">prefers-reduced-motion</code> no Tailwind — a animação é automaticamente desativada para usuários que solicitam isso.</p>
          <p><strong>Evite piscadas:</strong> Mostre skeletons apenas para carregamentos acima de ~300ms. Para respostas rápidas, omita o skeleton para evitar um flash do estado de carregamento.</p>
        </div>
      </Section>

    </div>
  )
}
