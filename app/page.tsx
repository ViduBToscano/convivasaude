import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart, Shield, Clock, Star, CheckCircle,
  Phone, Mail, MapPin, ArrowRight, Users,
  ChevronRight, Activity, Headphones,
  Hospital,
  Cross,
  CreditCard,
  MailIcon,
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
    name: "Conviva Essencial",
    badge: null,
    price: "R$ 329",
    period: "/mês",
    description: "O cuidado completo que seu familiar merece — num pacote fixo e transparente.",
    color: "featured" as const,
    features: [
      "Médico de referência dedicado",
      "Enfermeiro de referência",
      "Equipe multidisciplinar (10 especialidades)",
      "Pronto Cuidar 24h (com coparticipação)",
      "Acompanhamento preventivo e contínuo",
      "Suporte à família por WhatsApp",
    ],
    cta: "Falar com a equipe",
  },
]

const steps = [
  {
    number: "01",
    title: "Fale com a equipe",
    description:
      "Entre em contato pelo WhatsApp, tire suas dúvidas e entenda como a Conviva Saúde pode acompanhar sua rotina de cuidado.",
    icon: Users,
  },
  {
    number: "02",
    title: "Avaliação inicial",
    description:
      "Após a contratação, nossa equipe médica e de enfermagem avaliará seu momento de saúde para estruturar um plano de cuidado personalizado.",
    icon: CheckCircle,
  },
  {
    number: "03",
    title: "Siga com o seu cuidado",
    description:
      "Você passa a contar com uma equipe dedicada, com cuidado contínuo e orientação ao longo do tempo",
    icon: Heart,
  },
]

const testimonials = [
  {
    quote:
      "Minha mãe tem 71 anos e vivia com medo de precisar de atendimento e não ter para onde correr. Com a Conviva, sei que tem alguém cuidando dela — e sem pagar R$ 1.500 por mês.",
    author: "Fernanda A.",
    role: "Filha de paciente — BH",
    initials: "FA",
    stars: 5,
  },
  {
    quote:
      "Eu mesmo escolhi entrar na Conviva. Queria um médico que me conhecesse, não ficar esperando meses. Me sinto acompanhado, não só atendido quando fico doente.",
    author: "Seu Geraldo, 74 anos",
    role: "Paciente — Contagem, MG",
    initials: "SG",
    stars: 5,
  },
  {
    quote:
      "Trabalhar com foco no idoso faz toda a diferença. Os pacientes chegam com medo e saem confiantes. Isso é o que a Conviva propõe desde o início.",
    author: "Enf. Patrícia R.",
    role: "Equipe Conviva Saúde",
    initials: "PR",
    stars: 5,
  },
  {
    quote:
      "Meu pai precisava de acompanhamento após um susto de saúde. A Conviva resolveu rápido, com uma equipe que entende de idoso de verdade.",
    author: "Ricardo M.",
    role: "Filho de paciente — Nova Lima, MG",
    initials: "RM",
    stars: 5,
  },
]

const stats = [
  { value: "Médico de Referência", label: "Acompanha sua saúde de forma contínua" },
  { value: "Equipe Multidisciplinar", label: "Cuidado integrado em um só lugar" },
  { value: "Pronto Cuidar 24h", label: "Emergência do idoso, sempre que precisar" },
  { value: "Plano Mensal", label: "Valor fixo, independente da idade" },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Conviva Saúde" className="h-24 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              ["Sobre", "#sobre"],
              ["Plano", "#planos"],
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
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text column */}
            <div>
              <Badge
                className="mb-6 gap-1.5 px-3 py-1 text-xs font-medium"
                style={{ background: "color-mix(in oklch, var(--primary) 12%, transparent)", color: "var(--primary)", border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)" }}
              >
                <Heart className="size-3" strokeWidth={2.5} />
                Cuidado completo para quem tem 60+!
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Mais saúde no —{" "}
                <span className="text-primary">sem fila</span>
                {", "}no dia a dia,{" "}
                <span style={{ color: "var(--secondary)" }}>com um cuidado que acompanha você!</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                A Conviva Saúde é um pacote completo de cuidado para idosos. Tenha acesso a médico de referência, enfermeiros, equipe multidisciplinar e um Pronto Cuidar 24h. Tudo por R$ 329/mês, independente da idade.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Button size="lg" className="gap-2 text-base" asChild>
                  <Link href="#contato">
                    Quero conhecer o plano
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
                  <Link href="#como-funciona">
                    Como funciona o Conviva Saúde?
                  </Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: Shield, text: "Sem carência" },
                  { icon: Heart, text: "Acompanhamento personalizado" },
                  { icon: CheckCircle, text: "Mesmo preço para qualquer idade" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Icon className="size-4 text-primary shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Image column */}
            <div className="relative hidden md:block">
              <div className="relative rounded-2xl overflow-hidden h-[480px] shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-2RXJ-VuJ7Bk?w=1200&q=90"
                  alt="Casal idoso de mãos dadas caminhando ao ar livre"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 0px, 50vw"
                  priority
                />
                {/* Subtle overlay to blend with brand palette */}
                <div
                  className="absolute inset-0"
                  style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}
                />
              </div>
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
              <SectionLabel>Quem somos</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5">
                Um novo jeito para cuidar da saúde após os 60!
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                A Conviva Saúde é um plano de cuidado contínuo pensado para quem quer envelhecer com mais saúde, autonomia e acompanhamento de verdade. 
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Em vez de atendimentos pontuais, você passa a contar com uma estrutura organizada de cuidado, com profissionais que acompanham sua saúde ao longo do tempo. Tudo de forma simples com previsibilidade e foco na sua qualidade de vida!
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Cross, title: "Médico de referência", desc: "Um médico que te conhece e acompanha sua saúde de forma contínua e preventiva." },
                  { icon: Users, title: "Equipe multidisciplinar", desc: "Nutricionista, fisioterapeuta e outros profissionais que atuam de forma integrada no seu cuidado." },
                  { icon: Hospital, title: "Atendimento de urgência", desc: "Pronto atendimento exclusivo para idosos, disponível a qualquer hora do dia (com coparticipação)." },
                  { icon: CreditCard, title: "Plano mensal", desc: "Um único modelo de cuidado, com valor fixo e pagamento recorrente, sem prejudicar o limite do cartão." },
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
                  <p className="text-2xl font-bold text-primary">Conte com os melhores profissionais</p>
                  <p className="text-sm text-muted-foreground mt-1">referência em cuidado de idosos em BH e região!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--primary)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4"
            style={{ color: "var(--primary-foreground)" }}
          >
            Cuidado certo para viver com mais saúde e tranquilidade. Sem filas nos hospitais. Sem burocracia!
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}>
            Fale com nossa equipe e entenda como a Conviva Saúde organiza o cuidado no dia a dia, com acompanhamento médico, equipe especializada e um plano mensal que cabe no bolso! 
          </p>
          <Button
            size="lg"
            className="gap-2 text-base px-8"
            style={{ background: "var(--primary-foreground)", color: "var(--primary)" }}
            asChild
          >
            <Link href="#contato">
              Quero saber mais sobre a Conviva Saúde
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <p className="mt-5 text-xs" style={{ color: "color-mix(in oklch, var(--primary-foreground) 60%, transparent)" }}>
            Atendimento rápido · Sem fidelidade · Cancelamento simples
          </p>
        </div>
      </section>

      {/* ── Service Packages ────────────────────────────────────────────── */}
      <section id="planos" className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <SectionLabel>Nosso produto</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Um pacote. Um preço. Para qualquer idade!
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sem reajuste por faixa etária. Sem letra miúda. Sem surpresa.
            </p>
          </div>

          <div className="flex justify-center">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className="border-primary ring-2 ring-primary/20 relative w-full max-w-md"
              >
                <CardHeader>
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
            Sem carência · Pagamento recorrente · Fácil utilização
          </p>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section id="como-funciona" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <SectionLabel>Como funciona</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Conheça o nosso ciclo de cuidado
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Desde o primeiro minuto, você inicia um acompanhamento contínuo com uma equipe dedicada à sua saúde.
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
                Contrate agora a Conviva Saúde!
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
              Pacientes e familiares que compartilham suas experiências.
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
                Vamos juntos cuidar da sua saúde?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Nossa equipe está pronta para entender a sua necessidade e mostrar como a Conviva Saúde pode organizar o seu cuidado no dia a dia, com acompanhamento e uma estrutura completa. O contato com a gente é gratuito e sem compromisso!
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: Phone, label: "Telefone / WhatsApp", value: "(31) 99999-0000" },
                  { icon: Mail, label: "E-mail", value: "contato@convivasaude.com.br" },
                  { icon: MapPin, label: "Cobertura", value: "BH e região até 50km" },
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
                  <MailIcon className="size-6 text-primary" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-xl">Fale com nossa equipe</CardTitle>
                <CardDescription>
                  Preencha abaixo e entraremos em contato em até 24 horas.
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
                  placeholder="Seu telefone/WhatsApp"
                  className="w-full rounded-lg border border-border bg-background/80 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 placeholder:text-muted-foreground"
                />
                <textarea
                  rows={3}
                  placeholder="Conta um pouco sobre você e quais são suas dúvidas"
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
              <div className="flex items-center mb-3">
                <img src="/logo.svg" alt="Conviva Saúde" className="h-14 w-auto" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                Pacote completo de cuidado para idosos em BH e região — com médico de referência, equipe multidisciplinar e Pronto Cuidar 24h.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Serviços</p>
              <ul className="flex flex-col gap-2">
                {["Conviva Essencial", "Médico de Referência", "Pronto Cuidar 24h", "Equipe Multidisciplinar", "Enfermeiro de Referência"].map((item) => (
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
                {["Sobre nós", "Como funciona", "Nossas unidades", "Trabalhe conosco", "Blog de saúde"].map((item) => (
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
