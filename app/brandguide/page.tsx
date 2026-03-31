"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart, Target, Users, MessageSquare, BookOpen,
  CheckCircle, XCircle, Megaphone, HelpCircle,
} from "lucide-react"

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
      {children}
    </p>
  )
}

function BrandSection({
  id,
  icon: Icon,
  label,
  title,
  children,
}: {
  id: string
  icon: React.ElementType
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8 py-12 border-b border-border last:border-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="size-4 text-primary" />
        </div>
        <SectionLabel>{label}</SectionLabel>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">{title}</h2>
      {children}
    </section>
  )
}

function VoiceExample({
  channel,
  correct,
  wrong,
}: {
  channel: string
  correct: string
  wrong: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{channel}</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3 p-4 rounded-xl border border-border"
          style={{ background: "color-mix(in oklch, var(--success) 8%, var(--background))", borderColor: "color-mix(in oklch, var(--success) 25%, transparent)" }}
        >
          <CheckCircle className="size-4 shrink-0 mt-0.5" style={{ color: "var(--success)" }} />
          <p className="text-sm leading-relaxed">{correct}</p>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl border border-border"
          style={{ background: "color-mix(in oklch, var(--destructive) 6%, var(--background))", borderColor: "color-mix(in oklch, var(--destructive) 20%, transparent)" }}
        >
          <XCircle className="size-4 shrink-0 mt-0.5" style={{ color: "var(--destructive)" }} />
          <p className="text-sm leading-relaxed text-muted-foreground">{wrong}</p>
        </div>
      </div>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "sobre", label: "Sobre a marca" },
  { id: "posicionamento", label: "Posicionamento" },
  { id: "publico", label: "Público-alvo" },
  { id: "tom", label: "Tom de voz" },
  { id: "vocabulario", label: "Vocabulário" },
  { id: "mensagens", label: "Mensagens-chave" },
  { id: "exemplos", label: "Exemplos de comunicação" },
  { id: "naosomos", label: "O que não somos" },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BrandGuidePage() {
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
          <p className="text-xs text-muted-foreground mt-1">Brand Guide</p>
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
          <Link href="/styleguide" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            → Sistema de Design
          </Link>
          <Link href="/criativos" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            → Criativos
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 max-w-4xl px-10 py-10">

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-border">
          <Badge className="mb-4" variant="outline">Documento interno · v1.0</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Brand Guide</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Guia de referência da marca Conviva Saúde — para times de marketing,
            vendas, design e parceiros. Use este documento para garantir consistência
            em toda a comunicação da marca.
          </p>
        </div>

        {/* ── 1. Sobre a marca ── */}
        <BrandSection id="sobre" icon={Heart} label="01 · Identidade" title="Sobre a marca">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-base font-semibold mb-2">O que é a Conviva Saúde</h3>
              <p className="text-muted-foreground leading-relaxed">
                A Conviva Saúde é um pacote completo de benefícios de saúde para pessoas com 60 anos ou mais em BH e região. Não somos um plano de saúde convencional — somos um novo jeito de cuidar da saúde após os 60, com médico de referência, enfermeiro dedicado, equipe multidisciplinar e Pronto Cuidar 24h, tudo por{" "}
                <strong className="text-foreground">R$ 329/mês independente da idade.</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  label: "Propósito",
                  text: "Oferecer ao idoso de BH um cuidado completo, humano e acessível — sem filas, sem burocracia e sem os reajustes abusivos dos planos convencionais.",
                },
                {
                  label: "Missão",
                  text: "Ser o novo jeito de cuidar da saúde após os 60 — colocando o idoso no centro, com cuidado preventivo, contínuo e coordenado.",
                },
                {
                  label: "Visão",
                  text: "Ser a referência em saúde para a população 60+ em BH e região, reconhecida pela qualidade do cuidado e pela acessibilidade do modelo.",
                },
              ].map(({ label, text }) => (
                <Card key={label} className="border-border">
                  <CardContent className="pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <h3 className="text-base font-semibold mb-4">Valores</h3>
              <div className="flex flex-col gap-2">
                {[
                  { valor: "Humanidade", desc: "Tratamos cada pessoa como única" },
                  { valor: "Acessibilidade", desc: "Saúde de qualidade não pode ser privilégio" },
                  { valor: "Continuidade", desc: "Cuidado que acompanha, não só atende" },
                  { valor: "Transparência", desc: "Sem letras miúdas, sem surpresas" },
                  { valor: "Parceria", desc: "Família e equipe cuidando juntos" },
                ].map(({ valor, desc }) => (
                  <div key={valor} className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-muted/50">
                    <CheckCircle className="size-4 shrink-0" style={{ color: "var(--success)" }} />
                    <span className="text-sm font-semibold w-32 shrink-0">{valor}</span>
                    <span className="text-sm text-muted-foreground">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrandSection>

        {/* ── 2. Posicionamento ── */}
        <BrandSection id="posicionamento" icon={Target} label="02 · Estratégia" title="Posicionamento">
          <div className="flex flex-col gap-8">

            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "color-mix(in oklch, var(--primary) 10%, var(--background))", border: "1px solid color-mix(in oklch, var(--primary) 20%, transparent)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Tagline oficial</p>
              <p className="text-2xl font-bold">"Um novo jeito para cuidar da saúde após os 60."</p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-2">Proposta de valor central</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cuidado geriátrico completo por <strong className="text-foreground">R$ 329/mês</strong> — o mesmo valor para qualquer idade, sem fila, sem burocracia e sem reajuste abusivo.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-4">Contra quem nos posicionamos</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { tipo: "Planos tradicionais", desc: "Caros (R$ 1.500+/mês para idosos), com reajuste por faixa etária e filas longas." },
                  { tipo: "SUS", desc: "Acesso universal mas com espera de 3–4 meses por consulta em BH." },
                  { tipo: "Cartões de desconto", desc: "Baratos mas sem coordenação de cuidado nem especialização geriátrica." },
                ].map(({ tipo, desc }) => (
                  <div key={tipo} className="p-4 rounded-xl border border-border bg-muted/30">
                    <p className="text-sm font-semibold mb-1">{tipo}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{ background: "color-mix(in oklch, var(--secondary) 10%, var(--background))", border: "1px solid color-mix(in oklch, var(--secondary) 25%, transparent)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--secondary)" }}>Oceano azul da Conviva</p>
              <p className="text-sm leading-relaxed">
                Único serviço que combina <strong>especialização geriátrica + cuidado coordenado + preço acessível</strong> em BH. Não existe concorrente direto nesse espaço.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-4">O que nos diferencia</h3>
              <div className="flex flex-col gap-2">
                {[
                  "Preço fixo R$ 329 para qualquer idade (60, 70, 80, 90 anos)",
                  "Médico e enfermeiro de referência dedicados",
                  "10 especialidades em um único pacote",
                  "Pronto Cuidar 24h exclusivo para idosos",
                  "Operado nas clínicas da Mais60 Saúde (10+ anos de experiência geriátrica)",
                  "Sem carência, sem fidelidade, sem surpresa",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 py-2.5 px-4 rounded-lg bg-muted/50">
                    <CheckCircle className="size-4 shrink-0 mt-0.5" style={{ color: "var(--success)" }} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrandSection>

        {/* ── 3. Público-alvo ── */}
        <BrandSection id="publico" icon={Users} label="03 · Audiência" title="Público-alvo">
          <div className="flex flex-col gap-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  persona: "Persona 1",
                  nome: "O próprio idoso",
                  detalhe: "60–74 anos",
                  items: [
                    "Mora em BH ou RMBH, classe B ou C",
                    "Perdeu o convênio ou não consegue mais pagar",
                    "Ativo, quer manter independência",
                    "Medo: emergência sem suporte, depender dos filhos",
                    "Valoriza: médico que o conhece, atendimento rápido, preço justo",
                    "Chega via Google ou indicação de amigo/vizinho",
                  ],
                  como: [
                    "Fale com respeito e clareza, sem infantilizar",
                    "Destaque independência, autonomia e qualidade de vida",
                    "Use exemplos do cotidiano deles",
                    "Evite jargão médico",
                  ],
                },
                {
                  persona: "Persona 2",
                  nome: "O filho decisor",
                  detalhe: "35–55 anos",
                  items: [
                    "Mora em BH ou cidades próximas",
                    "Trabalha, tem família, não consegue estar sempre presente",
                    "Sente culpa por não acompanhar os pais no dia a dia",
                    "Medo: ligação de emergência, pai/mãe sem suporte",
                    "Valoriza: tranquilidade, comunicação contínua, preço no orçamento",
                    "Chega via Google, Instagram ou indicação",
                  ],
                  como: [
                    "Fale sobre tranquilidade e segurança",
                    "Destaque comunicação com a família e suporte 24h",
                    "Mostre custo-benefício frente aos convênios tradicionais",
                    "Apele para o cuidado sem culpa",
                  ],
                },
              ].map(({ persona, nome, detalhe, items, como }) => (
                <Card key={persona} className="border-border">
                  <CardContent className="pt-5 flex flex-col gap-4">
                    <div>
                      <Badge variant="outline" className="text-[10px] mb-2">{persona}</Badge>
                      <h3 className="text-base font-semibold">{nome}</h3>
                      <p className="text-xs text-muted-foreground">{detalhe}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Perfil</p>
                      <ul className="flex flex-col gap-1.5">
                        {items.map((i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5 shrink-0">·</span>{i}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Como falar</p>
                      <ul className="flex flex-col gap-1.5">
                        {como.map((c) => (
                          <li key={c} className="text-xs flex items-start gap-2">
                            <CheckCircle className="size-3 shrink-0 mt-0.5" style={{ color: "var(--success)" }} />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </BrandSection>

        {/* ── 4. Tom de voz ── */}
        <BrandSection id="tom" icon={MessageSquare} label="04 · Comunicação" title="Tom de voz">
          <div className="flex flex-col gap-8">
            <p className="text-muted-foreground leading-relaxed">
              Acolhedora, humana e direta. A Conviva fala como alguém de confiança que entende a situação — não como uma empresa fria de saúde.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  pilar: "Acolhedor",
                  desc: "Como um familiar que entende e cuida.",
                  certo: "Sabemos que cuidar de quem você ama é uma responsabilidade enorme.",
                  errado: "Nossos serviços atendem às demandas do público sênior.",
                },
                {
                  pilar: "Claro e direto",
                  desc: "Sem enrolação, sem jargão.",
                  certo: "R$ 329/mês. O mesmo valor para qualquer idade.",
                  errado: "Oferecemos planos com mensalidades competitivas e sem variação etária.",
                },
                {
                  pilar: "Confiável",
                  desc: "Sério sem ser frio.",
                  certo: "Seu familiar terá um médico que o conhece de verdade — não só quando está doente.",
                  errado: "Garantimos atendimento médico de qualidade aos nossos clientes.",
                },
                {
                  pilar: "Empático",
                  desc: "Fala sobre o que o cliente sente, não só o que a empresa oferece.",
                  certo: "Você não precisa mais ficar preocupado se algo acontecer de madrugada.",
                  errado: "Disponibilizamos suporte 24 horas.",
                },
              ].map(({ pilar, desc, certo, errado }) => (
                <Card key={pilar} className="border-border">
                  <CardContent className="pt-5 flex flex-col gap-3">
                    <div>
                      <p className="text-sm font-bold">{pilar}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-lg text-xs leading-relaxed"
                      style={{ background: "color-mix(in oklch, var(--success) 8%, var(--background))", border: "1px solid color-mix(in oklch, var(--success) 20%, transparent)" }}
                    >
                      <CheckCircle className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--success)" }} />
                      {certo}
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-lg text-xs leading-relaxed text-muted-foreground"
                      style={{ background: "color-mix(in oklch, var(--destructive) 5%, var(--background))", border: "1px solid color-mix(in oklch, var(--destructive) 15%, transparent)" }}
                    >
                      <XCircle className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--destructive)" }} />
                      {errado}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <XCircle className="size-4" style={{ color: "var(--destructive)" }} />
                  A Conviva NUNCA
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Usa "plano de saúde" para se descrever',
                    'Chama quem contrata de "beneficiário" ou "contratante"',
                    "Usa linguagem fria ou clínica demais",
                    "Promete o que não pode cumprir",
                    "Fala de morte ou deterioração de forma direta",
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--destructive)" }} />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="size-4" style={{ color: "var(--success)" }} />
                  A Conviva SEMPRE
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Chama quem contrata de "você" ou pelo nome',
                    "Fala de cuidado, não de doença",
                    "Coloca o idoso como protagonista, não como dependente",
                    "Usa números reais para gerar credibilidade",
                    "Termina com uma chamada para ação clara",
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--success)" }} />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </BrandSection>

        {/* ── 5. Vocabulário ── */}
        <BrandSection id="vocabulario" icon={BookOpen} label="05 · Vocabulário" title="Vocabulário da marca">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="size-4" style={{ color: "var(--success)" }} />
                Palavras que usamos
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { palavra: "Pacote de benefícios", nota: "nunca \u201cplano de saúde\u201d" },
                  { palavra: "Pessoa com 60+ / seu familiar", nota: "nunca \u201cidoso\u201d como rótulo frio" },
                  { palavra: "Médico de referência", nota: "não \u201cclínico geral\u201d" },
                  { palavra: "Pronto Cuidar", nota: "nome próprio, sempre capitalizado" },
                  { palavra: "Cuidado coordenado", nota: "" },
                  { palavra: "Envelhecimento saudável", nota: "" },
                  { palavra: "Tranquilidade, segurança, presença", nota: "" },
                  { palavra: "R$ 329/mês para qualquer idade", nota: "" },
                ].map(({ palavra, nota }) => (
                  <div key={palavra} className="flex items-start gap-2 py-2 px-3 rounded-lg bg-muted/50">
                    <CheckCircle className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--success)" }} />
                    <div>
                      <span className="text-sm font-medium">{palavra}</span>
                      {nota && <span className="text-xs text-muted-foreground ml-2">— {nota}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-4 flex items-center gap-2">
                <XCircle className="size-4" style={{ color: "var(--destructive)" }} />
                Palavras que evitamos
              </p>
              <div className="flex flex-col gap-2">
                {[
                  "Plano de saúde",
                  "Beneficiário",
                  "Contratante",
                  "Sênior (pode soar distante)",
                  "Terceira idade (ultrapassado)",
                  "Paciente (no contexto de venda/marketing)",
                ].map((palavra) => (
                  <div key={palavra} className="flex items-center gap-2 py-2 px-3 rounded-lg bg-muted/50">
                    <XCircle className="size-3.5 shrink-0" style={{ color: "var(--destructive)" }} />
                    <span className="text-sm text-muted-foreground line-through">{palavra}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrandSection>

        {/* ── 6. Mensagens-chave ── */}
        <BrandSection id="mensagens" icon={Megaphone} label="06 · Mensagens" title="Mensagens-chave">
          <div className="flex flex-col gap-4">
            {[
              {
                contexto: "Mensagem principal",
                msg: "Um novo jeito para cuidar da saúde após os 60.",
                destaque: true,
              },
              {
                contexto: "Para quem não tem convênio",
                msg: "Sem convênio de saúde? A Conviva oferece cuidado completo por R$ 329/mês — sem fila, sem carência, sem burocracia.",
              },
              {
                contexto: "Para o filho preocupado",
                msg: "Você não precisa estar presente o tempo todo para saber que seu pai ou sua mãe está bem cuidado.",
              },
              {
                contexto: "Contra os planos tradicionais",
                msg: "Enquanto os planos cobram R$ 1.500+ para idosos e ainda têm fila, a Conviva entrega cuidado completo por R$ 329 — o mesmo valor para qualquer idade.",
              },
              {
                contexto: "Sobre a parceria com a Mais60",
                msg: "O cuidado Conviva acontece nas clínicas da Mais60 Saúde — referência nacional em geriatria, com 10 anos de experiência e 6 unidades em BH.",
              },
            ].map(({ contexto, msg, destaque }) => (
              <div
                key={contexto}
                className="p-5 rounded-xl border border-border"
                style={destaque ? {
                  background: "color-mix(in oklch, var(--primary) 8%, var(--background))",
                  borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
                } : { background: "var(--muted)/30" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{contexto}</p>
                <p className={`leading-relaxed ${destaque ? "text-lg font-semibold" : "text-sm text-muted-foreground"}`}>
                  "{msg}"
                </p>
              </div>
            ))}
          </div>
        </BrandSection>

        {/* ── 7. Exemplos de comunicação ── */}
        <BrandSection id="exemplos" icon={Megaphone} label="07 · Exemplos" title="Exemplos de comunicação">
          <div className="flex flex-col gap-8">
            <VoiceExample
              channel="Anúncio Google"
              correct="Cuidado geriátrico em BH por R$ 329/mês. Médico de referência, Pronto Cuidar 24h. Sem fila. Sem carência."
              wrong="Plano de saúde sênior com cobertura completa para beneficiários acima de 60 anos em Belo Horizonte."
            />
            <VoiceExample
              channel="Post Instagram"
              correct="Seu pai merece um médico que o conhece pelo nome — não só quando está doente. Conheça a Conviva Saúde."
              wrong="Oferecemos serviços médicos especializados para a terceira idade."
            />
            <VoiceExample
              channel="WhatsApp — primeiro contato"
              correct="Oi! Vi que você quer saber mais sobre a Conviva. Me conta um pouquinho sobre seu familiar — assim posso te explicar como funciona da melhor forma 😊"
              wrong="Olá! Somos a Conviva Saúde. Nosso plano oferece os seguintes benefícios para contratantes acima de 60."
            />
          </div>
        </BrandSection>

        {/* ── 8. O que não somos ── */}
        <BrandSection id="naosomos" icon={HelpCircle} label="08 · Clareza de marca" title="O que somos × O que não somos">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-2">
              <div className="px-5 py-3 text-sm font-semibold text-primary-foreground"
                style={{ background: "var(--primary)" }}>
                Somos
              </div>
              <div className="px-5 py-3 text-sm font-semibold text-muted-foreground bg-muted">
                Não somos
              </div>
            </div>
            {[
              ["Um pacote de benefícios", "Um plano de saúde"],
              ["Cuidado coordenado e contínuo", "Consulta avulsa quando fica doente"],
              ["Especialistas em 60+", "Clínica geral"],
              ["Preço fixo para qualquer idade", "Reajuste por faixa etária"],
              ["Parceiros da família", "Prestadores de serviço frios"],
            ].map(([somos, nao], i) => (
              <div key={somos} className={`grid grid-cols-2 divide-x divide-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                <div className="px-5 py-3.5 flex items-center gap-2 text-sm">
                  <CheckCircle className="size-3.5 shrink-0" style={{ color: "var(--success)" }} />
                  {somos}
                </div>
                <div className="px-5 py-3.5 flex items-center gap-2 text-sm text-muted-foreground">
                  <XCircle className="size-3.5 shrink-0" style={{ color: "var(--destructive)" }} />
                  {nao}
                </div>
              </div>
            ))}
          </div>
        </BrandSection>

        {/* Footer */}
        <div className="pt-8 pb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2025 Conviva Saúde · Brand Guide v1.0</span>
          <div className="flex gap-4">
            <Link href="/styleguide" className="hover:text-foreground transition-colors">Sistema de Design</Link>
            <Link href="/" className="hover:text-foreground transition-colors">Página inicial</Link>
          </div>
        </div>

      </main>
    </div>
    </>
  )
}
