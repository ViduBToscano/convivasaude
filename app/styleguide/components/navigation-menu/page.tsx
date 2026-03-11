"use client"

import { useState } from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Moon, Sun,
  Home, Search, Calendar, User, Heart,
  Stethoscope, Activity, FileText,
  ChevronRight, Bell, Settings, LogOut,
  MapPin, ShieldCheck, HelpCircle, BookOpen, Users,
} from "lucide-react"
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

function NavLinkItem({
  icon: Icon,
  title,
  description,
  href = "#",
  active,
}: {
  icon: React.ElementType
  title: string
  description: string
  href?: string
  active?: boolean
}) {
  return (
    <NavigationMenuLink asChild active={active}>
      <Link
        href={href}
        className={cn(
          "flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted",
          active && "bg-primary/5"
        )}
      >
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-primary group-hover:bg-primary/10">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{description}</p>
        </div>
      </Link>
    </NavigationMenuLink>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NavigationMenuShowcasePage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Menu de Navegação</h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-lg">
            Uma barra de menu horizontal com painéis dropdown animados opcionais.
            Construído sobre Radix UI com navegação completa por teclado, papéis ARIA e
            viewport compartilhado animado.
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={toggleDark} aria-label="Alternar modo escuro">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>

      {/* ── Import ── */}
      <Section title="Importação">
        <CodeBlock code={`import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"`} />
      </Section>

      {/* ── Flat links (no dropdown) ── */}
      <Section
        title="Links Simples"
        description="Itens de navegação sem dropdown. Use navigationMenuTriggerStyle() em NavigationMenuLink ou qualquer elemento."
      >
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border p-4 flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {["Início", "Encontrar Cuidador", "Serviços", "Planos", "Sobre"].map((label) => (
                  <NavigationMenuItem key={label}>
                    <NavigationMenuLink
                      asChild
                      active={label === "Início"}
                    >
                      <Link href="#" className={navigationMenuTriggerStyle()}>
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <CodeBlock code={`import Link from "next/link"

<NavigationMenu>
  <NavigationMenuList>
    {["Início", "Cuidadores", "Serviços"].map((label) => (
      <NavigationMenuItem key={label}>
        <NavigationMenuLink asChild active={label === "Início"}>
          <Link href="/..." className={navigationMenuTriggerStyle()}>
            {label}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    ))}
  </NavigationMenuList>
</NavigationMenu>`} />
        </div>
      </Section>

      {/* ── With dropdown (viewport=true) ── */}
      <Section
        title="Dropdown com Viewport Compartilhado"
        description='Comportamento padrão (viewport={true}). Todos os painéis dropdown compartilham um container animado que desliza abaixo do gatilho.'
      >
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border p-4 flex items-center overflow-visible">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="#" className={navigationMenuTriggerStyle()}>Início</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Encontrar Cuidador</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-2 w-[320px]">
                      <NavLinkItem icon={Users} title="Buscar Cuidadores" description="Pesquise cuidadores por especialidade e localização." active />
                      <NavLinkItem icon={MapPin} title="Perto de Mim" description="Encontre cuidadores disponíveis na sua região agora." />
                      <NavLinkItem icon={Heart} title="Cuidadores Favoritos" description="Seus profissionais de saúde salvos." />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-2 gap-1 p-2 w-[420px]">
                      <NavLinkItem icon={Calendar} title="Agendamentos" description="Agende, visualize e gerencie suas visitas." />
                      <NavLinkItem icon={Stethoscope} title="Teleconsulta" description="Consultas médicas por vídeo, onde estiver." />
                      <NavLinkItem icon={Activity} title="Monitoramento" description="Acompanhe sinais vitais e histórico de saúde." />
                      <NavLinkItem icon={FileText} title="Prontuários" description="Visualize e gerencie seus documentos médicos." />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="#" className={navigationMenuTriggerStyle()}>Sobre</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <CodeBlock code={`<NavigationMenu>                {/* viewport={true} por padrão */}
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Encontrar Cuidador</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-1 p-2 w-[320px]">
          <NavLinkItem icon={Users} title="Buscar Cuidadores" ... />
          <NavLinkItem icon={MapPin} title="Perto de Mim" ... />
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`} />
        </div>
      </Section>

      {/* ── viewport=false ── */}
      <Section
        title='Sem Viewport (viewport={false})'
        description="Cada dropdown renderiza como seu próprio popover, posicionado diretamente abaixo do gatilho. Ideal para menus compactos ou sidebars."
      >
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border p-4 flex items-start">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Minha Conta</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-0.5 p-1 w-48">
                      {[
                        { icon: User, label: "Meu Perfil" },
                        { icon: Calendar, label: "Meus Agendamentos" },
                        { icon: Heart, label: "Cuidadores Favoritos" },
                        { icon: Settings, label: "Configurações" },
                        { icon: LogOut, label: "Sair" },
                      ].map(({ icon: Icon, label }) => (
                        <li key={label}>
                          <NavigationMenuLink asChild>
                            <Link href="#" className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm hover:bg-muted transition-colors">
                              <Icon className="size-4 text-muted-foreground" />
                              {label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Ajuda</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-0.5 p-1 w-44">
                      {[
                        { icon: HelpCircle, label: "Perguntas Frequentes" },
                        { icon: BookOpen, label: "Guias de Uso" },
                        { icon: ShieldCheck, label: "Política de Privacidade" },
                      ].map(({ icon: Icon, label }) => (
                        <li key={label}>
                          <NavigationMenuLink asChild>
                            <Link href="#" className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm hover:bg-muted transition-colors">
                              <Icon className="size-4 text-muted-foreground" />
                              {label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <CodeBlock code={`<NavigationMenu viewport={false}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Minha Conta</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="flex flex-col gap-0.5 p-1 w-48">
          <NavigationMenuLink asChild>
            <Link href="...">Meu Perfil</Link>
          </NavigationMenuLink>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`} />
        </div>
      </Section>

      {/* ── With indicator ── */}
      <Section
        title="Com Indicador"
        description="NavigationMenuIndicator renderiza uma seta abaixo do gatilho ativo, apontando para o dropdown aberto."
      >
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border p-4 flex items-center overflow-visible">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Cuidadores</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-2 w-[280px]">
                      <NavLinkItem icon={Users} title="Especialistas" description="Busque por área de especialidade." />
                      <NavLinkItem icon={MapPin} title="Perto de Mim" description="Cuidadores na sua localização." />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-2 w-[280px]">
                      <NavLinkItem icon={Calendar} title="Agendamentos" description="Gerencie suas visitas." />
                      <NavLinkItem icon={Activity} title="Monitoramento" description="Visualize seu histórico de saúde." />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuIndicator />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <CodeBlock code={`<NavigationMenuList>
  <NavigationMenuItem>
    <NavigationMenuTrigger>Cuidadores</NavigationMenuTrigger>
    <NavigationMenuContent>…</NavigationMenuContent>
  </NavigationMenuItem>

  {/* Adicione após todos os itens */}
  <NavigationMenuIndicator />
</NavigationMenuList>`} />
        </div>
      </Section>

      {/* ── Real-world: Conviva Saúde navbar ── */}
      <Section
        title="Exemplo Real — Barra de Navegação Conviva Saúde"
        description="Uma barra de navegação superior completa para a plataforma de cuidados para idosos."
      >
        <div className="rounded-xl border border-border overflow-hidden">
          {/* Navbar */}
          <header className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <img src="/logo.svg" alt="Conviva Saúde" className="h-7 w-auto" />
            </div>

            {/* Nav */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild active>
                    <Link href="#" className={navigationMenuTriggerStyle()}>Início</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Cuidadores</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-2 w-[340px]">
                      <NavLinkItem icon={Users} title="Buscar Especialistas" description="Geriatras, enfermeiros e cuidadores domiciliares." active />
                      <NavLinkItem icon={MapPin} title="Perto de Você" description="Cuidadores disponíveis em até 5 km." />
                      <NavLinkItem icon={Heart} title="Cuidadores Favoritos" description="Seus profissionais de saúde salvos." />
                    </ul>
                    <div className="border-t border-border p-2">
                      <Link href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors">
                        Ver todos os cuidadores
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-2 gap-1 p-2 w-[400px]">
                      <NavLinkItem icon={Calendar} title="Agendamentos" description="Agende e gerencie visitas." />
                      <NavLinkItem icon={Stethoscope} title="Teleconsulta" description="Consultas médicas por vídeo." />
                      <NavLinkItem icon={Activity} title="Monitoramento" description="Histórico e sinais vitais." />
                      <NavLinkItem icon={FileText} title="Prontuários" description="Documentos e exames médicos." />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="#" className={navigationMenuTriggerStyle()}>Planos</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right side */}
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="icon-sm" className="relative" aria-label="Notificações">
                <Bell className="size-4" />
                <span className="absolute top-1 right-1 size-1.5 rounded-full bg-destructive" />
              </Button>
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="gap-2 pl-1 pr-2">
                      <span className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">J</span>
                      <span className="text-sm hidden sm:block">José</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-2 w-52">
                        <div className="px-2 py-1.5 mb-1 border-b border-border">
                          <p className="text-xs font-medium">José Silva</p>
                          <p className="text-[10px] text-muted-foreground">jose.silva@exemplo.com.br</p>
                        </div>
                        <ul className="flex flex-col gap-0.5">
                          {[
                            { icon: User, label: "Meu Perfil" },
                            { icon: Calendar, label: "Agendamentos" },
                            { icon: Settings, label: "Configurações" },
                          ].map(({ icon: Icon, label }) => (
                            <li key={label}>
                              <NavigationMenuLink asChild>
                                <Link href="#" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-muted transition-colors">
                                  <Icon className="size-3.5 text-muted-foreground" />
                                  {label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                          <li className="border-t border-border mt-1 pt-1">
                            <NavigationMenuLink asChild>
                              <Link href="#" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-destructive hover:bg-destructive/5 transition-colors">
                                <LogOut className="size-3.5" />
                                Sair
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </header>

          {/* Page preview */}
          <div className="bg-background px-6 py-10 text-center flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground">↑ Passe o cursor sobre os itens do menu acima para visualizar os dropdowns</p>
            <div className="flex items-center gap-2">
              <Badge>Cuidadores</Badge>
              <Badge variant="secondary">Serviços</Badge>
              <Badge variant="outline">Menu do usuário</Badge>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Real-world: Mobile bottom nav ── */}
      <Section
        title="Exemplo Real — Navegação Inferior Mobile"
        description="Uma barra de abas mobile usando itens NavigationMenu com ícones."
      >
        <div className="mx-auto max-w-xs rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
          <div className="bg-muted/40 px-4 py-12 text-center text-sm text-muted-foreground">
            Conteúdo da tela
          </div>
          <nav className="border-t border-border bg-card px-2 pb-1">
            <NavigationMenu className="max-w-full w-full" viewport={false}>
              <NavigationMenuList className="w-full justify-around">
                {[
                  { icon: Home, label: "Início", active: true },
                  { icon: Search, label: "Buscar" },
                  { icon: Calendar, label: "Visitas" },
                  { icon: Heart, label: "Salvos" },
                  { icon: User, label: "Perfil" },
                ].map(({ icon: Icon, label, active }) => (
                  <NavigationMenuItem key={label}>
                    <NavigationMenuLink asChild active={active}>
                      <Link
                        href="#"
                        className={cn(
                          "flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-[10px] font-medium transition-colors",
                          active
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Icon className={cn("size-5", active && "stroke-[2.5]")} />
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </Section>

      {/* ── Props Reference ── */}
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
                ["NavigationMenu", "viewport", "boolean", "true"],
                ["NavigationMenu", "className", "string", "—"],
                ["NavigationMenuLink", "active", "boolean", "false"],
                ["NavigationMenuLink", "asChild", "boolean", "false"],
                ["NavigationMenuTrigger", "className", "string", "—"],
                ["NavigationMenuContent", "className", "string", "—"],
                ["navigationMenuTriggerStyle", "()", "() => string", "—"],
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

      {/* ── Accessibility ── */}
      <Section title="Acessibilidade">
        <div className="rounded-xl bg-muted border border-border p-5 flex flex-col gap-2 text-sm">
          <p><strong>Teclado:</strong> <kbd className="font-mono text-xs bg-background border rounded px-1">Tab</kbd> move o foco entre os gatilhos. <kbd className="font-mono text-xs bg-background border rounded px-1">Enter</kbd> / <kbd className="font-mono text-xs bg-background border rounded px-1">Espaço</kbd> abre um dropdown. As teclas de seta navegam dentro do conteúdo aberto. <kbd className="font-mono text-xs bg-background border rounded px-1">Esc</kbd> fecha o painel aberto.</p>
          <p><strong>Papéis ARIA:</strong> O componente raiz renderiza como <code className="font-mono text-xs bg-background px-1 rounded border">role="navigation"</code>. Os gatilhos usam <code className="font-mono text-xs bg-background px-1 rounded border">aria-expanded</code>. Os painéis de conteúdo usam <code className="font-mono text-xs bg-background px-1 rounded border">aria-hidden</code> quando fechados.</p>
          <p><strong>Prop active:</strong> Passe <code className="font-mono text-xs bg-background px-1 rounded border">active</code> para <code className="font-mono text-xs bg-background px-1 rounded border">NavigationMenuLink</code> para definir <code className="font-mono text-xs bg-background px-1 rounded border">aria-current="page"</code> e aplicar estilos de estado ativo.</p>
          <p><strong>asChild:</strong> Use <code className="font-mono text-xs bg-background px-1 rounded border">asChild</code> para renderizar um <code className="font-mono text-xs bg-background px-1 rounded border">{"<Link>"}</code> do Next.js — preservando o roteamento client-side sem perder semântica ARIA.</p>
          <p><strong>Landmark:</strong> NavigationMenu renderiza como <code className="font-mono text-xs bg-background px-1 rounded border">{"<nav>"}</code>. Adicione um <code className="font-mono text-xs bg-background px-1 rounded border">aria-label</code> único quando houver múltiplas navs na mesma página.</p>
        </div>
      </Section>

    </div>
  )
}
