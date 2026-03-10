import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart, Shield, Clock, Star, CheckCircle,
  Phone, Mail, MapPin, ArrowRight, Users,
  ChevronRight, Activity, Headphones,
} from "lucide-react"

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
      {children}
    </p>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const packages = [
  {
    name: "Plano Essencial",
    badge: null,
    price: "R$ 390",
    period: "/mês",
    description: "Cuidado básico e acompanhamento regular para idosos independentes.",
    color: "default" as const,
    features: [
      "2 visitas domiciliares por semana",
      "Monitoramento de sinais vitais",
      "Relatório mensal de saúde",
      "Suporte por telefone (seg–sex)",
      "App para familiares",
    ],
    cta: "Começar agora",
  },
  {
    name: "Plano Bem-Estar",
    badge: "Mais popular",
    price: "R$ 690",
    period: "/mês",
    description: "Cuidado completo com acompanhamento diário e suporte a família.",
    color: "featured" as const,
    features: [
      "Visitas diárias de segunda a sábado",
      "Acompanhamento em consultas médicas",
      "Monitoramento 24h por aplicativo",
      "Nutricionista e fisioterapeuta",
      "Suporte prioritário à família",
      "Relatório semanal detalhado",
    ],
    cta: "Contratar plano",
  },
  {
    name: "Plano Premium",
    badge: null,
    price: "R$ 1.190",
    period: "/mês",
    description: "Cuidado integral com cuidador dedicado e serviços completos de saúde.",
    color: "default" as const,
    features: [
      "Cuidador dedicado todos os dias",
      "Médico geriatra vinculado ao plano",
      "Teleconsultas ilimitadas",
      "Transporte a consultas e exames",
      "Terapia ocupacional semanal",
      "Suporte emocional ao cuidador familiar",
      "Relatório em tempo real",
    ],
    cta: "Falar com consultor",
  },
]

const steps = [
  {
    number: "01",
    title: "Conte-nos sobre o seu familiar",
    description:
      "Preencha um breve formulário com informações sobre as necessidades de saúde, rotina e preferências do idoso. É rápido e gratuito.",
    icon: Users,
  },
  {
    number: "02",
    title: "Escolha o plano ideal",
    description:
      "Nossa equipe analisa o perfil e recomenda o plano mais adequado. Você pode ajustar a qualquer momento conforme as necessidades mudarem.",
    icon: CheckCircle,
  },
  {
    number: "03",
    title: "O cuidado começa em casa",
    description:
      "Apresentamos o cuidador, agendamos a primeira visita e acompanhamos tudo pelo aplicativo. A família fica informada em tempo real.",
    icon: Heart,
  },
]

const testimonials = [
  {
    quote:
      "Minha mãe tem 82 anos e vivia sozinha. Desde que contratamos a Conviva Saúde, dormimos muito mais tranquilos. O cuidador é gentil, pontual e minha mãe o adora.",
    author: "Fernanda Almeida",
    role: "Filha de paciente",
    initials: "FA",
    stars: 5,
  },
  {
    quote:
      "Tenho artrite e dificuldade para me locomover. A equipe da Conviva me ajuda nas atividades do dia a dia sem me tirar a independência. Me sinto respeitado.",
    author: "Laudelina Ferraz",
    role: "Paciente, 78 anos",
    initials: "LF",
    stars: 5,
  },
  {
    quote:
      "Como enfermeira da equipe, vejo de perto o impacto que fazemos. Os pacientes ficam mais animados, mais saudáveis, e as famílias confiam no nosso trabalho.",
    author: "Enf. Patrícia Rocha",
    role: "Cuidadora Conviva",
    initials: "PR",
    stars: 5,
  },
  {
    quote:
      "Meu pai precisava de cuidados pós-cirurgia e não queríamos internar. A Conviva trouxe toda a estrutura para casa. Foi fundamental na recuperação dele.",
    author: "Ricardo Mendes",
    role: "Filho de paciente",
    initials: "RM",
    stars: 5,
  },
]

const stats = [
  { value: "4.800+", label: "Famílias atendidas" },
  { value: "12", label: "Estados no Brasil" },
  { value: "98%", label: "Satisfação dos pacientes" },
  { value: "24h", label: "Suporte disponível" },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Heart className="size-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight">Conviva Saúde</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              ["Sobre", "#sobre"],
              ["Planos", "#planos"],
              ["Como funciona", "#como-funciona"],
              ["Depoimentos", "#depoimentos"],
              ["Contato", "#contato"],
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
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Entrar
            </Button>
            <Button size="sm" asChild>
              <Link href="#contato">Falar com a equipe</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 8%, var(--background)) 0%, color-mix(in oklch, var(--accent) 40%, var(--background)) 60%, var(--background) 100%)",
          }}
        />

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            <Badge
              className="mb-6 gap-1.5 px-3 py-1 text-xs font-medium"
              style={{ background: "color-mix(in oklch, var(--primary) 12%, transparent)", color: "var(--primary)", border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)" }}
            >
              <Heart className="size-3" strokeWidth={2.5} />
              Cuidado domiciliar para idosos
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Cuidado com{" "}
              <span className="text-primary">carinho</span>
              {" "}e{" "}
              <span style={{ color: "var(--secondary)" }}>segurança</span>
              {" "}para quem você ama
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              A Conviva Saúde oferece planos de cuidado domiciliar para idosos no Brasil — com cuidadores qualificados, monitoramento de saúde e suporte completo à família.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Button size="lg" className="gap-2 text-base" asChild>
                <Link href="#planos">
                  Ver planos de cuidado
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
                <Link href="#como-funciona">
                  Como funciona
                </Link>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { icon: Shield, text: "Cuidadores certificados" },
                { icon: Clock, text: "Suporte 24 horas" },
                { icon: CheckCircle, text: "Sem fidelidade" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Icon className="size-4 text-primary shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-6">
                <p className="text-3xl font-bold text-primary">{value}</p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────── */}
      <section id="sobre" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <SectionLabel>Sobre nós</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5">
                Cuidado humano no centro de tudo
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                A Conviva Saúde nasceu da convicção de que envelhecer com dignidade é um direito. Acreditamos que o melhor lugar para cuidar de um idoso é em casa — cercado de afeto, rotina e conforto.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Conectamos famílias a cuidadores especializados em geriatria, oferecendo planos personalizados que combinam atenção à saúde física, bem-estar emocional e comunicação transparente com as famílias.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Heart, title: "Foco no paciente", desc: "Cuidado centrado na pessoa, respeitando a individualidade de cada idoso." },
                  { icon: Users, title: "Equipe certificada", desc: "Cuidadores com formação em geriatria e saúde do idoso." },
                  { icon: Activity, title: "Saúde monitorada", desc: "Acompanhamento de sinais vitais e relatórios regulares." },
                  { icon: Headphones, title: "Família informada", desc: "Comunicação contínua com familiares por app e telefone." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex flex-col gap-2 p-4 rounded-xl bg-muted/50">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual placeholder */}
            <div className="relative">
              <div
                className="rounded-2xl h-80 md:h-96 flex items-center justify-center"
                style={{ background: "linear-gradient(145deg, color-mix(in oklch, var(--primary) 12%, var(--card)), color-mix(in oklch, var(--accent) 50%, var(--card)))" }}
              >
                <div className="text-center px-8">
                  <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Heart className="size-10 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl font-bold text-primary">+10 anos</p>
                  <p className="text-sm text-muted-foreground mt-1">cuidando de famílias brasileiras</p>
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3 fill-warning text-warning" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold">5.0</span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">"Minha mãe se sentiu em casa desde o primeiro dia."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Packages ────────────────────────────────────────────── */}
      <section id="planos" className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <SectionLabel>Planos de cuidado</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Escolha o plano ideal para o seu familiar
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Cada plano pode ser personalizado. Nossa equipe ajuda você a encontrar a combinação certa de cuidados, horários e serviços.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={
                  pkg.color === "featured"
                    ? "border-primary ring-2 ring-primary/20 relative"
                    : "relative"
                }
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="shadow-sm px-3">
                      {pkg.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className={pkg.color === "featured" ? "pt-8" : ""}>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="flex items-baseline gap-1 pt-2">
                    <span className={`text-3xl font-bold ${pkg.color === "featured" ? "text-primary" : ""}`}>
                      {pkg.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{pkg.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2.5">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <CheckCircle
                        className="size-4 shrink-0 mt-0.5"
                        style={{ color: "var(--success)" }}
                      />
                      <span className="text-sm text-muted-foreground leading-snug">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={pkg.color === "featured" ? "default" : "outline"}
                    asChild
                  >
                    <Link href="#contato">
                      {pkg.cta}
                      <ChevronRight className="size-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Todos os planos incluem período de adaptação gratuito de 7 dias · Sem fidelidade mínima · Cancele quando quiser
          </p>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section id="como-funciona" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <SectionLabel>Como funciona</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Três passos para o cuidado começar
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Do primeiro contato até a primeira visita em casa, nossa equipe cuida de tudo com agilidade e atenção.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px border-t-2 border-dashed border-border" />

            {steps.map(({ number, title, description, icon: Icon }) => (
              <div key={number} className="flex flex-col items-center text-center gap-4 relative">
                <div
                  className="size-20 rounded-2xl flex items-center justify-center shrink-0 relative z-10"
                  style={{ background: "color-mix(in oklch, var(--primary) 10%, var(--background))", border: "2px solid color-mix(in oklch, var(--primary) 20%, transparent)" }}
                >
                  <Icon className="size-8 text-primary" strokeWidth={1.5} />
                  <span
                    className="absolute -top-2 -right-2 size-6 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    {number.replace("0", "")}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button size="lg" className="gap-2" asChild>
              <Link href="#contato">
                Começar agora — é gratuito
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section id="depoimentos" className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <SectionLabel>Depoimentos</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Quem confia na Conviva Saúde
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Famílias, pacientes e profissionais compartilham suas experiências com o nosso cuidado.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map(({ quote, author, role, initials, stars }) => (
              <Card key={author} className="flex flex-col">
                <CardContent className="pt-6 flex flex-col gap-4 flex-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    "{quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div
                      className="size-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "color-mix(in oklch, var(--primary) 15%, var(--muted))", color: "var(--primary)" }}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{author}</p>
                      <p className="text-xs text-muted-foreground truncate">{role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <section id="contato" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel>Entre em contato</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                Vamos cuidar juntos
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Nossa equipe está pronta para entender a situação do seu familiar e indicar o melhor plano de cuidado. O primeiro contato é gratuito e sem compromisso.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: Phone, label: "Telefone / WhatsApp", value: "(11) 4002-0022" },
                  { icon: Mail, label: "E-mail", value: "contato@convivasaude.com.br" },
                  { icon: MapPin, label: "Cobertura", value: "12 estados · São Paulo, Rio, Minas e mais" },
                  { icon: Clock, label: "Atendimento", value: "Seg–Sex 7h–21h · Sáb 8h–18h" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <Card
              className="ring-0"
              style={{
                background: "linear-gradient(145deg, color-mix(in oklch, var(--primary) 8%, var(--card)), color-mix(in oklch, var(--accent) 30%, var(--card)))",
                border: "1px solid color-mix(in oklch, var(--primary) 20%, var(--border))",
              }}
            >
              <CardHeader>
                <div className="size-12 rounded-xl bg-primary/15 flex items-center justify-center mb-2">
                  <Heart className="size-6 text-primary" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-xl">Fale com nossa equipe</CardTitle>
                <CardDescription>
                  Preencha abaixo e entraremos em contato em até 2 horas úteis.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full rounded-lg border border-border bg-background/80 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 placeholder:text-muted-foreground"
                />
                <input
                  type="tel"
                  placeholder="Seu WhatsApp"
                  className="w-full rounded-lg border border-border bg-background/80 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 placeholder:text-muted-foreground"
                />
                <textarea
                  rows={3}
                  placeholder="Conta um pouco sobre o seu familiar e o que precisa..."
                  className="w-full rounded-lg border border-border bg-background/80 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 placeholder:text-muted-foreground resize-none"
                />
                <Button size="lg" className="w-full gap-2 mt-1">
                  Enviar mensagem
                  <ArrowRight className="size-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Seus dados estão seguros. Não compartilhamos com terceiros.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  <Heart className="size-3.5 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="font-bold">Conviva Saúde</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                Cuidado domiciliar especializado para idosos, com carinho, segurança e respeito à dignidade.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Serviços</p>
              <ul className="flex flex-col gap-2">
                {["Plano Essencial", "Plano Bem-Estar", "Plano Premium", "Teleconsulta", "Monitoramento"].map((item) => (
                  <li key={item}>
                    <Link href="#planos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Empresa</p>
              <ul className="flex flex-col gap-2">
                {["Sobre nós", "Como funciona", "Blog de saúde", "Trabalhe conosco", "Imprensa"].map((item) => (
                  <li key={item}>
                    <Link href="#sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Suporte</p>
              <ul className="flex flex-col gap-2">
                {["Central de ajuda", "Política de privacidade", "Termos de uso", "Ouvidoria", "Contato"].map((item) => (
                  <li key={item}>
                    <Link href="#contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © 2025 Conviva Saúde. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-[10px] gap-1">
                <Shield className="size-3" /> Dados protegidos · LGPD
              </Badge>
              <Link href="/styleguide" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Sistema de Design →
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
