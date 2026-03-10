"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, MoreHorizontal, Heart, MapPin, Star, ArrowRight, Bell, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CardShowcasePage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Card</h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-lg">
            Um contêiner flexível para agrupar conteúdos e ações relacionados.
            Construído com os sub-componentes{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">CardHeader</code>,{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">CardContent</code> e{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">CardFooter</code>.
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={toggleDark} aria-label="Alternar modo escuro">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>

      {/* ── Import ── */}
      <Section title="Importação">
        <CodeBlock code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"`} />
      </Section>

      {/* ── Anatomy ── */}
      <Section
        title="Anatomia"
        description="Todos os sub-componentes disponíveis reunidos em um único card."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Título do Card</CardTitle>
              <CardDescription>Descrição — texto secundário abaixo do título</CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal className="size-4" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Esta é a área <strong className="text-foreground">CardContent</strong>. Coloque aqui
                qualquer conteúdo — textos, listas, inputs, gráficos ou outros componentes.
              </p>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-xs text-muted-foreground">Área do CardFooter</span>
              <Button size="sm">Ação</Button>
            </CardFooter>
          </Card>

          <CodeBlock code={`<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Texto secundário</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon-sm">
        <MoreHorizontal />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    Conteúdo do corpo aqui.
  </CardContent>
  <CardFooter className="justify-between">
    <span>Esquerda do rodapé</span>
    <Button size="sm">Ação</Button>
  </CardFooter>
</Card>`} />
        </div>
      </Section>

      {/* ── Sizes ── */}
      <Section
        title="Tamanhos"
        description='Dois tamanhos disponíveis via a prop size: "default" e "sm".'
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono text-muted-foreground">size="default"</p>
            <Card size="default">
              <CardHeader>
                <CardTitle>Tamanho padrão</CardTitle>
                <CardDescription>Espaçamento e padding normais</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">gap-4 · py-4 · px-4</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono text-muted-foreground">size="sm"</p>
            <Card size="sm">
              <CardHeader>
                <CardTitle>Tamanho compacto</CardTitle>
                <CardDescription>Padding e espaçamento reduzidos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">gap-3 · py-3 · px-3</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-4">
          <CodeBlock code={`<Card size="default">…</Card>
<Card size="sm">…</Card>`} />
        </div>
      </Section>

      {/* ── Colour Variants ── */}
      <Section
        title="Variantes de Cor"
        description="Sem variantes de cor embutidas — use className com variáveis CSS para personalizar."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Padrão</CardTitle>
              <CardDescription>bg-card + ring-foreground/10</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Superfície de card padrão.</p>
            </CardContent>
          </Card>

          <Card className="border border-primary/25 bg-primary/5 ring-0">
            <CardHeader>
              <CardTitle>Tom primário</CardTitle>
              <CardDescription>bg-primary/5 + border-primary/25</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Destaque para conteúdo em evidência.</p>
            </CardContent>
          </Card>

          <Card className="bg-muted ring-0 border border-border">
            <CardHeader>
              <CardTitle>Muted</CardTitle>
              <CardDescription>bg-muted + border-border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Superfície discreta, baixo destaque.</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
          <CodeBlock code={`{/* Tom primário */}
<Card className="border border-primary/25 bg-primary/5 ring-0">

{/* Muted */}
<Card className="bg-muted ring-0 border border-border">`} />
        </div>
      </Section>

      {/* ── Header Patterns ── */}
      <Section
        title="Padrões de Cabeçalho"
        description="CardAction ocupa o canto superior direito do CardHeader usando CSS grid."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Somente título</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Sem descrição ou ação.</p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Título + descrição</CardTitle>
              <CardDescription>Texto de apoio que fornece contexto adicional.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Cabeçalho com duas linhas.</p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Título + badge de ação</CardTitle>
              <CardDescription>Status exibido no slot de ação.</CardDescription>
              <CardAction>
                <Badge>Ativo</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Badge na posição CardAction.</p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Título + botão de ação</CardTitle>
              <CardDescription>Botão de editar ou menu de opções.</CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal className="size-4" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Ícone de botão no CardAction.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── Footer Patterns ── */}
      <Section
        title="Padrões de Rodapé"
        description="CardFooter renderiza com borda superior e fundo muted. Use utilitários flex para alinhar conteúdo."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Ação única</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Rodapé com um botão de CTA.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Confirmar</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Duas ações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Rodapé com ações primária e ghost.</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="ghost" size="sm">Cancelar</Button>
              <Button size="sm">Salvar alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadados + link</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Rodapé com informação complementar.</p>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-xs text-muted-foreground">Atualizado há 2 dias</span>
              <Button variant="link" size="sm" className="gap-1">
                Ver detalhes <ArrowRight className="size-3" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sem rodapé</CardTitle>
              <CardDescription>O rodapé é opcional — omita quando não for necessário.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Card limpo sem rodapé.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── Real-world Examples ── */}
      <Section
        title="Exemplos Reais"
        description="Padrões da plataforma Conviva Saúde para cuidados e pacotes de saúde para idosos."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Card de cuidador */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  AF
                </div>
                <div className="min-w-0">
                  <CardTitle>Dra. Ana Ferreira</CardTitle>
                  <CardDescription className="truncate">Geriatria · Cuidados Domiciliares</CardDescription>
                </div>
              </div>
              <CardAction>
                <button className="text-muted-foreground hover:text-destructive transition-colors">
                  <Heart className="size-4" />
                </button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("size-3.5", i < 4 ? "fill-warning text-warning" : "text-muted-foreground")} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">4.0</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">8 anos exp.</Badge>
                <Badge variant="outline">Disponível</Badge>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="ghost" size="sm">Mensagem</Button>
              <Button size="sm">Agendar</Button>
            </CardFooter>
          </Card>

          {/* Card de plano */}
          <Card className="border border-primary/20 bg-primary/5 ring-0">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary text-xs font-bold">+</span>
                </div>
                <div>
                  <CardTitle>Plano Bem-Estar Sênior</CardTitle>
                  <CardDescription>Seg–Sex, 8:00–20:00</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                <span>Visita domiciliar disponível</span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-warning text-warning" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">5.0</span>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="ghost" size="sm">Detalhes</Button>
              <Button size="sm">Contratar</Button>
            </CardFooter>
          </Card>

          {/* Card de estatística */}
          <Card>
            <CardHeader>
              <CardTitle>Consultas</CardTitle>
              <CardDescription>Este mês</CardDescription>
              <CardAction>
                <TrendingUp className="size-4 text-success" />
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <p className="text-3xl font-bold">14</p>
              <div className="flex items-center gap-1">
                <Badge style={{ background: "var(--success)", color: "var(--success-foreground)" }} className="text-[10px] px-1.5 py-0">
                  +12%
                </Badge>
                <span className="text-xs text-muted-foreground">vs mês anterior</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" size="sm" className="gap-1 px-0">
                Ver todas <ArrowRight className="size-3" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card de notificações */}
          <Card size="sm">
            <CardHeader className="border-b">
              <CardTitle>Notificações</CardTitle>
              <CardAction>
                <Badge>3</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-0 divide-y divide-border">
              {[
                { icon: <Bell className="size-3.5 text-primary" />, text: "Visita da Dra. Ana confirmada para 15 jun.", time: "2m atrás" },
                { icon: <Heart className="size-3.5 text-destructive" />, text: "Dra. Ferreira curtiu sua avaliação.", time: "1h atrás" },
                { icon: <Star className="size-3.5 text-warning" />, text: "Avalie sua última consulta geriátrica.", time: "3h atrás" },
              ].map(({ icon, text, time }, i) => (
                <div key={i} className="flex items-start gap-2.5 py-2.5">
                  <span className="mt-0.5 shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug">{text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Card de kit */}
          <Card size="sm">
            <CardHeader>
              <CardTitle>Kit Monitoramento</CardTitle>
              <CardDescription>Oxímetro + Esfigmomanômetro</CardDescription>
              <CardAction>
                <button className="text-muted-foreground hover:text-destructive transition-colors">
                  <Heart className="size-4" />
                </button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="h-16 rounded-lg bg-muted flex items-center justify-center text-2xl mb-2">
                🩺
              </div>
              <p className="text-lg font-bold text-primary">R$ 129</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="sm">Adicionar ao Plano</Button>
            </CardFooter>
          </Card>

          {/* Estado vazio */}
          <Card className="border-dashed ring-0">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center gap-2">
              <div className="size-10 rounded-full bg-muted flex items-center justify-center text-xl">
                📋
              </div>
              <p className="text-sm font-medium">Nenhuma consulta ainda</p>
              <p className="text-xs text-muted-foreground">Agende sua primeira consulta geriátrica para começar.</p>
              <Button size="sm" className="mt-2">Encontrar Cuidador</Button>
            </CardContent>
          </Card>

        </div>
      </Section>

      {/* ── Props Reference ── */}
      <Section title="Referência de Props">
        <Card>
          <CardContent className="pt-6 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-semibold pb-2 pr-6">Componente</th>
                  <th className="text-left font-semibold pb-2 pr-6">Prop</th>
                  <th className="text-left font-semibold pb-2 pr-6">Tipo</th>
                  <th className="text-left font-semibold pb-2">Padrão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Card", "size", '"default" | "sm"', '"default"'],
                  ["Card", "className", "string", "—"],
                  ["CardHeader", "className", "string", "—"],
                  ["CardTitle", "className", "string", "—"],
                  ["CardDescription", "className", "string", "—"],
                  ["CardAction", "className", "string", "—"],
                  ["CardContent", "className", "string", "—"],
                  ["CardFooter", "className", "string", "—"],
                ].map(([comp, prop, type, def]) => (
                  <tr key={`${comp}-${prop}`}>
                    <td className="py-2 pr-6 font-mono text-primary">{comp}</td>
                    <td className="py-2 pr-6 font-mono">{prop}</td>
                    <td className="py-2 pr-6 font-mono text-muted-foreground">{type}</td>
                    <td className="py-2 font-mono text-muted-foreground">{def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground mt-2">
          Todos os componentes também aceitam as props padrão de <code className="font-mono bg-muted px-1 rounded">div</code> do HTML.
        </p>
      </Section>

      {/* ── Accessibility ── */}
      <Section title="Acessibilidade">
        <Card className="bg-muted ring-0 border border-border">
          <CardContent className="pt-6 flex flex-col gap-2 text-sm">
            <p><strong>HTML semântico:</strong> Card renderiza como <code className="font-mono text-xs bg-background px-1 py-0.5 rounded border">div</code>. Para seções de referência, envolva em <code className="font-mono text-xs bg-background px-1 py-0.5 rounded border">article</code> ou <code className="font-mono text-xs bg-background px-1 py-0.5 rounded border">section</code>.</p>
            <p><strong>Cards interativos:</strong> Se o card inteiro for clicável, adicione <code className="font-mono text-xs bg-background px-1 py-0.5 rounded border">role="button"</code> e <code className="font-mono text-xs bg-background px-1 py-0.5 rounded border">tabIndex={`{0}`}</code>, e trate <code className="font-mono text-xs bg-background px-1 py-0.5 rounded border">onClick</code> e <code className="font-mono text-xs bg-background px-1 py-0.5 rounded border">onKeyDown</code>.</p>
            <p><strong>CardAction:</strong> Botões dentro de CardAction são totalmente acessíveis por teclado. Forneça <code className="font-mono text-xs bg-background px-1 py-0.5 rounded border">aria-label</code> descritivo em botões com apenas ícones.</p>
            <p><strong>Anel de foco:</strong> Elementos interativos dentro de cards usam <code className="font-mono text-xs bg-background px-1 py-0.5 rounded border">--ring</code> (azul primário) para indicadores visuais de foco.</p>
          </CardContent>
        </Card>
      </Section>

    </div>
  )
}
