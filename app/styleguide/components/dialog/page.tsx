"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Moon, Sun, Trash2, Calendar, Star, MapPin,
  CheckCircle, AlertTriangle, LogOut, Heart,
} from "lucide-react"

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

export default function DialogShowcasePage() {
  const [dark, setDark] = useState(false)
  const [controlled, setControlled] = useState(false)
  const [contratoStep, setContratoStep] = useState<1 | 2 | 3>(1)

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
          <h1 className="text-3xl font-bold tracking-tight">Dialog</h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-lg">
            Uma sobreposição modal que direciona o foco do usuário para um conteúdo específico.
            Construído sobre Radix UI com navegação por teclado, bloqueio de foco e
            desfoque de fundo incluídos.
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={toggleDark} aria-label="Alternar modo escuro">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>

      {/* ── Import ── */}
      <Section title="Importação">
        <CodeBlock code={`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"`} />
      </Section>

      {/* ── Anatomy ── */}
      <Section
        title="Anatomia"
        description="Todos os sub-componentes juntos. DialogContent inclui um botão de fechar embutido por padrão."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Abrir demonstração de anatomia</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>DialogTitle</DialogTitle>
                <DialogDescription>
                  DialogDescription — texto de apoio abaixo do título que fornece
                  contexto sobre a finalidade deste diálogo.
                </DialogDescription>
              </DialogHeader>
              <div className="text-sm text-muted-foreground rounded-lg border border-dashed border-border p-4 text-center">
                Corpo do DialogContent — coloque qualquer conteúdo aqui
              </div>
              <DialogFooter showCloseButton>
                <Button>Ação primária</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <CodeBlock code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>

    {/* conteúdo do corpo */}

    <DialogFooter showCloseButton>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />
        </div>
      </Section>

      {/* ── Close button options ── */}
      <Section
        title="Opções de Botão de Fechar"
        description="O botão X fica em DialogContent. Um botão Fechar pode ser adicionado a DialogFooter. Ambos são opcionais."
      >
        <div className="flex flex-wrap gap-3">

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Somente botão X (padrão)</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Somente botão X</DialogTitle>
                <DialogDescription>
                  <code className="font-mono text-xs">showCloseButton</code> padrão é{" "}
                  <code className="font-mono text-xs">true</code> em DialogContent.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Botão fechar no rodapé</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Botão fechar no rodapé</DialogTitle>
                <DialogDescription>
                  Passe <code className="font-mono text-xs">showCloseButton</code> ao DialogFooter
                  para renderizar um botão "Fechar" automaticamente.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter showCloseButton>
                <Button>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Sem botão de fechar</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Sem botão X</DialogTitle>
                <DialogDescription>
                  Use <code className="font-mono text-xs">showCloseButton={"{false}"}</code> em
                  DialogContent para forçar uma ação explícita.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button>Entendi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>

        <div className="mt-4">
          <CodeBlock code={`{/* Botão X no canto (padrão) */}
<DialogContent>…</DialogContent>

{/* Adiciona botão "Fechar" no rodapé */}
<DialogFooter showCloseButton>…</DialogFooter>

{/* Sem botão X — força ação explícita */}
<DialogContent showCloseButton={false}>…</DialogContent>`} />
        </div>
      </Section>

      {/* ── Sizes ── */}
      <Section
        title="Tamanhos"
        description="DialogContent usa max-w-sm por padrão. Substitua com className para diálogos mais largos."
      >
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Pequeno (padrão)", cls: "", note: "sm:max-w-sm" },
            { label: "Médio", cls: "sm:max-w-md", note: "sm:max-w-md" },
            { label: "Grande", cls: "sm:max-w-lg", note: "sm:max-w-lg" },
            { label: "Extra grande", cls: "sm:max-w-2xl", note: "sm:max-w-2xl" },
          ].map(({ label, cls, note }) => (
            <Dialog key={label}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">{label}</Button>
              </DialogTrigger>
              <DialogContent className={cls}>
                <DialogHeader>
                  <DialogTitle>{label}</DialogTitle>
                  <DialogDescription>
                    Este diálogo usa <code className="font-mono text-xs">{note}</code> como largura máxima.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton />
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <div className="mt-4">
          <CodeBlock code={`<DialogContent>…</DialogContent>                    {/* sm:max-w-sm */}
<DialogContent className="sm:max-w-md">…</DialogContent>
<DialogContent className="sm:max-w-lg">…</DialogContent>
<DialogContent className="sm:max-w-2xl">…</DialogContent>`} />
        </div>
      </Section>

      {/* ── Controlled ── */}
      <Section
        title="Diálogo Controlado"
        description="Gerencie o estado de abertura externamente com as props open e onOpenChange."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Button onClick={() => setControlled(true)}>Abrir programaticamente</Button>
              <Badge variant={controlled ? "default" : "secondary"}>
                {controlled ? "aberto" : "fechado"}
              </Badge>
            </div>
            <Dialog open={controlled} onOpenChange={setControlled}>
              <DialogContent showCloseButton={false}>
                <DialogHeader>
                  <DialogTitle>Diálogo controlado</DialogTitle>
                  <DialogDescription>
                    Este diálogo é controlado por estado externo. Fechar atualiza{" "}
                    <code className="font-mono text-xs">controlled</code> para{" "}
                    <code className="font-mono text-xs">false</code>.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setControlled(false)}>Cancelar</Button>
                  <Button onClick={() => setControlled(false)}>Confirmar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CodeBlock code={`const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Abrir</Button>

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Controlado</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>Fechar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />
        </div>
      </Section>

      {/* ── Real-world examples ── */}
      <Section
        title="Exemplos Reais"
        description="Padrões da plataforma Conviva Saúde para contratar planos e gerenciar cuidados de idosos."
      >
        <div className="flex flex-wrap gap-3">

          {/* Contratar plano — multi-step */}
          <Dialog onOpenChange={(o) => { if (o) setContratoStep(1) }}>
            <DialogTrigger asChild>
              <Button size="sm">Contratar Plano</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              {contratoStep === 1 && (
                <>
                  <DialogHeader>
                    <DialogTitle>Contratar Plano de Saúde</DialogTitle>
                    <DialogDescription>
                      Escolha um horário de visita com a Dra. Ana Ferreira.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        AF
                      </div>
                      <div>
                        <p className="text-sm font-medium">Dra. Ana Ferreira</p>
                        <p className="text-xs text-muted-foreground">Geriatria · 8 anos exp.</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Star key={i} className="size-3 fill-warning text-warning" />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["9:00", "10:30", "12:00", "14:00", "15:30", "17:00"].map((t) => (
                        <button
                          key={t}
                          className="rounded-lg border border-border py-2 text-xs font-medium hover:border-primary hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={() => setContratoStep(2)}>
                      <Calendar className="size-4" /> Continuar
                    </Button>
                  </DialogFooter>
                </>
              )}
              {contratoStep === 2 && (
                <>
                  <DialogHeader>
                    <DialogTitle>Confirmar dados</DialogTitle>
                    <DialogDescription>Revise antes de confirmar a contratação.</DialogDescription>
                  </DialogHeader>
                  <div className="rounded-lg border border-border divide-y divide-border text-sm">
                    {[
                      ["Cuidadora", "Dra. Ana Ferreira"],
                      ["Especialidade", "Geriatria"],
                      ["Data", "15 de junho de 2025"],
                      ["Horário", "10:30"],
                      ["Modalidade", "Visita domiciliar"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between px-3 py-2">
                        <span className="text-muted-foreground">{k}</span>
                        <span className="font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setContratoStep(1)}>Voltar</Button>
                    <Button onClick={() => setContratoStep(3)}>Confirmar Contratação</Button>
                  </DialogFooter>
                </>
              )}
              {contratoStep === 3 && (
                <>
                  <DialogHeader>
                    <div className="flex items-center justify-center mb-2">
                      <div className="size-14 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle className="size-7 text-success" />
                      </div>
                    </div>
                    <DialogTitle className="text-center">Plano contratado!</DialogTitle>
                    <DialogDescription className="text-center">
                      Sua visita com a Dra. Ana Ferreira está confirmada para 15 de junho às 10:30.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="w-full">Concluir</Button>
                    </DialogClose>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Cancelar contrato */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="size-4" /> Cancelar contrato
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-xs">
              <DialogHeader>
                <div className="flex items-center justify-center mb-2">
                  <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="size-6 text-destructive" />
                  </div>
                </div>
                <DialogTitle className="text-center">Cancelar este contrato?</DialogTitle>
                <DialogDescription className="text-center">
                  Esta ação não pode ser desfeita. O plano de saúde será encerrado imediatamente.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:flex-col gap-2">
                <Button variant="destructive" className="w-full">Cancelar definitivamente</Button>
                <DialogClose asChild>
                  <Button variant="outline" className="w-full">Manter contrato</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Perfil da cuidadora */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Ver perfil da cuidadora</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">
                    AF
                  </div>
                  <div>
                    <DialogTitle>Dra. Ana Ferreira</DialogTitle>
                    <DialogDescription>Geriatria · Cuidados Domiciliares</DialogDescription>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Star key={i} className="size-3 fill-warning text-warning" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">4.0 (128 avaliações)</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex gap-4">
                  <div className="flex-1 rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-muted-foreground">Anos exp.</p>
                  </div>
                  <div className="flex-1 rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold">340</p>
                    <p className="text-xs text-muted-foreground">Pacientes</p>
                  </div>
                  <div className="flex-1 rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold">4.0</p>
                    <p className="text-xs text-muted-foreground">Avaliação</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <MapPin className="size-3.5 shrink-0" />
                  Clínica Sênior Vida · Visita domiciliar disponível
                </div>
              </div>
              <DialogFooter showCloseButton>
                <Button>
                  <Calendar className="size-4" /> Agendar visita
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Sair da conta */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <LogOut className="size-4" /> Sair
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-xs">
              <DialogHeader>
                <DialogTitle>Sair da conta?</DialogTitle>
                <DialogDescription>
                  Você precisará entrar novamente para acessar suas consultas e histórico de saúde.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Permanecer conectado</Button>
                </DialogClose>
                <Button variant="destructive">Sair</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Editar perfil do paciente */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Editar perfil do paciente</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Editar perfil do paciente</DialogTitle>
                <DialogDescription>Atualize as informações pessoais do paciente.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="primeiro-nome" className="text-xs">Nome</Label>
                    <Input id="primeiro-nome" defaultValue="José" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="sobrenome" className="text-xs">Sobrenome</Label>
                    <Input id="sobrenome" defaultValue="Silva" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-xs">E-mail</Label>
                  <Input id="email" type="email" defaultValue="jose.silva@exemplo.com.br" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="telefone" className="text-xs">Telefone</Label>
                  <Input id="telefone" type="tel" defaultValue="+55 11 99999-0000" />
                </div>
              </div>
              <DialogFooter showCloseButton>
                <Button>Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Resultado de exame */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Heart className="size-4" /> Resultado disponível
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs">
              <DialogHeader>
                <div className="flex items-center justify-center mb-2">
                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="size-7 text-primary" />
                  </div>
                </div>
                <DialogTitle className="text-center">Resultado de exame pronto</DialogTitle>
                <DialogDescription className="text-center">
                  A Dra. Ferreira enviou o resultado do seu eletrocardiograma. Você já pode visualizá-lo.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:flex-col gap-2">
                <Button className="w-full">Ver resultado</Button>
                <DialogClose asChild>
                  <Button variant="outline" className="w-full">Dispensar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </Section>

      {/* ── Props Reference ── */}
      <Section title="Referência de Props">
        <div className="rounded-xl ring-1 ring-foreground/10 overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left font-semibold p-3 pr-6">Componente</th>
                <th className="text-left font-semibold p-3 pr-6">Prop</th>
                <th className="text-left font-semibold p-3 pr-6">Tipo</th>
                <th className="text-left font-semibold p-3">Padrão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Dialog", "open", "boolean", "—"],
                ["Dialog", "onOpenChange", "(open: boolean) => void", "—"],
                ["Dialog", "defaultOpen", "boolean", "false"],
                ["DialogContent", "showCloseButton", "boolean", "true"],
                ["DialogContent", "className", "string", "—"],
                ["DialogFooter", "showCloseButton", "boolean", "false"],
                ["DialogFooter", "className", "string", "—"],
                ["DialogTrigger", "asChild", "boolean", "false"],
                ["DialogClose", "asChild", "boolean", "false"],
              ].map(([comp, prop, type, def]) => (
                <tr key={`${comp}-${prop}`} className="hover:bg-muted/30">
                  <td className="p-3 pr-6 font-mono text-primary">{comp}</td>
                  <td className="p-3 pr-6 font-mono">{prop}</td>
                  <td className="p-3 pr-6 font-mono text-muted-foreground">{type}</td>
                  <td className="p-3 font-mono text-muted-foreground">{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Accessibility ── */}
      <Section title="Acessibilidade">
        <div className="rounded-xl bg-muted border border-border p-5 flex flex-col gap-2 text-sm">
          <p><strong>Bloqueio de foco:</strong> Quando um diálogo abre, o foco vai para dentro e fica preso — Tab e Shift+Tab circulam apenas pelos elementos focáveis dentro do diálogo.</p>
          <p><strong>Teclado:</strong> <kbd className="font-mono text-xs bg-background border rounded px-1">Esc</kbd> fecha o diálogo (exceto quando <code className="font-mono text-xs bg-background px-1 rounded border">showCloseButton={"{false}"}</code> sem ação de fechar).</p>
          <p><strong>Papéis ARIA:</strong> DialogContent renderiza como <code className="font-mono text-xs bg-background px-1 rounded border">role="dialog"</code> com <code className="font-mono text-xs bg-background px-1 rounded border">aria-modal="true"</code>. DialogTitle e DialogDescription são vinculados automaticamente via <code className="font-mono text-xs bg-background px-1 rounded border">aria-labelledby</code> / <code className="font-mono text-xs bg-background px-1 rounded border">aria-describedby</code>.</p>
          <p><strong>Bloqueio de scroll:</strong> O scroll da página é bloqueado enquanto o diálogo está aberto.</p>
          <p><strong>Obrigatório:</strong> Sempre inclua <code className="font-mono text-xs bg-background px-1 rounded border">DialogTitle</code> e <code className="font-mono text-xs bg-background px-1 rounded border">DialogDescription</code> para contexto em leitores de tela. Use <code className="font-mono text-xs bg-background px-1 rounded border">className="sr-only"</code> para ocultá-los visualmente se necessário.</p>
        </div>
      </Section>

    </div>
  )
}
