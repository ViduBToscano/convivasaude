import Image from "next/image"
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
    name: "Mais60 Essencial",
    badge: null,
    price: "R$ 329",
    period: "/mês",
    description: "Cuidado geriátrico coordenado com enfermeiro navegador e equipe multidisciplinar em BH.",
    color: "featured" as const,
    features: [
      "Enfermeiro navegador dedicado",
      "Equipe com 10 especialidades (geriatra, nutricionista, fisioterapeuta e mais)",
      "Pronto Cuidar — suporte 24h para urgências",
      "Atendimento presencial em até 48h",
      "6 unidades em Belo Horizonte",
      "Sem carência e sem fidelidade",
    ],
    cta: "Falar pelo WhatsApp",
  },
]

const steps = [
  {
    number: "01",
    title: "Fale com nossa equipe",
    description:
      "Entre em contato pelo WhatsApp ou telefone. Em poucos minutos, um de nossos enfermeiros entende a situação do seu familiar e orienta os próximos passos.",
    icon: Users,
  },
  {
    number: "02",
    title: "Consulta de avaliação em até 48h",
    description:
      "Agendamos uma consulta de avaliação na unidade mais próxima de você. Nosso geriatra e o enfermeiro navegador montam um plano de cuidado personalizado.",
    icon: CheckCircle,
  },
  {
    number: "03",
    title: "Cuidado coordenado começa",
    description:
      "O enfermeiro navegador passa a coordenar toda a saúde do seu familiar — consultas, exames, medicações e comunicação com a família em tempo real.",
    icon: Heart,
  },
]

const testimonials = [
  {
    quote:
      "Minha mãe tem 68 anos e morava sozinha no Savassi. Depois do Mais60, ela tem um enfermeiro que acompanha tudo. Pela primeira vez em anos me sinto tranquila.",
    author: "Dona Aparecida",
    role: "Paciente, 68 anos — Savassi, BH",
    initials: "DA",
    stars: 5,
  },
  {
    quote:
      "Moro em Nova Lima e meu pai está em BH. O enfermeiro navegador me liga toda semana com um resumo. É como ter alguém de confiança cuidando dele quando não posso estar lá.",
    author: "Renata",
    role: "Filha de paciente, 42 anos — Nova Lima",
    initials: "RE",
    stars: 5,
  },
  {
    quote:
      "Tenho 76 anos e achei que plano de saúde era só para jovens. O Mais60 cabe no meu bolso e tem médico geriatra de verdade. Me sinto cuidado como nunca.",
    author: "Seu Geraldo",
    role: "Paciente, 76 anos — Contagem, BH",
    initials: "SG",
    stars: 5,
  },
  {
    quote:
      "Como enfermeira navegadora, acompanho cada paciente de perto. Quando coordenamos o cuidado, os resultados são impressionantes — menos internações, mais qualidade de vida.",
    author: "Enf. Patrícia",
    role: "Enfermeira Navegadora — Mais60 Saúde",
    initials: "PR",
    stars: 5,
  },
]

const stats = [
  { value: "3.000+", label: "Pacientes atendidos" },
  { value: "6", label: "Unidades em BH" },
  { value: "10", label: "Especialidades" },
  { value: "+10 anos", label: "Cuidando de idosos" },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Mais60 Saúde" className="h-24 w-auto" />
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
              <Link href="#contato">Falar pelo WhatsApp</Link>
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
                Saúde coordenada para maiores de 60 em BH
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Cuidado geriátrico{" "}
                <span className="text-primary">coordenado</span>
                {" "}para quem você{" "}
                <span style={{ color: "var(--secondary)" }}>mais ama</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                O Mais60 Saúde oferece planos de saúde geriátrica com enfermeiro navegador, equipe multidisciplinar e Pronto Cuidar 24h — 5,5× mais acessível que planos convencionais, com 6 unidades em Belo Horizonte.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Button size="lg" className="gap-2 text-base" asChild>
                  <Link href="#contato">
                    Falar com a equipe pelo WhatsApp
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
                  <Link href="#planos">
                    Ver o plano
                  </Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: Shield, text: "Sem carência" },
                  { icon: Clock, text: "Pronto Cuidar 24h" },
                  { icon: CheckCircle, text: "Atendimento em 48h" },
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
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800"
                  alt="Idosa feliz em família sendo cuidada em casa"
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
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3 fill-warning text-warning" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold">5.0</span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug max-w-[160px]">"Finalmente alguém que cuida de tudo com a gente."</p>
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
              <SectionLabel>Sobre nós</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5">
                A saúde do idoso merece coordenação de verdade
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                O Mais60 Saúde nasceu para resolver um problema real: idosos com múltiplas condições crônicas, sem um profissional que coordene toda a sua saúde. Com o enfermeiro navegador, cada paciente tem um ponto de contato que acompanha consultas, exames e medicações.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Presente em 6 unidades em Belo Horizonte e com parceria com a Unimed-BH, reunimos mais de 10 especialidades em um único plano acessível — sem fidelidade, sem carência e com atendimento presencial em até 48 horas.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Heart, title: "Enfermeiro navegador", desc: "Um profissional dedicado que coordena toda a saúde do seu familiar." },
                  { icon: Users, title: "Equipe multidisciplinar", desc: "Geriatra, nutricionista, fisioterapeuta e mais 10 especialidades." },
                  { icon: Activity, title: "Pronto Cuidar 24h", desc: "Suporte de urgência disponível a qualquer hora do dia." },
                  { icon: Headphones, title: "Família conectada", desc: "Comunicação contínua com familiares sobre a saúde do idoso." },
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
                  <p className="text-sm text-muted-foreground mt-1">cuidando de idosos em Belo Horizonte</p>
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
                <p className="text-xs text-muted-foreground leading-snug">"Finalmente alguém que cuida de tudo com a gente."</p>
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
            Seu familiar merece o melhor cuidado — sem pagar caro por isso
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}>
            Fale agora com nossa equipe e receba uma recomendação personalizada de plano. Gratuito e sem compromisso.
          </p>
          <Button
            size="lg"
            className="gap-2 text-base px-8"
            style={{ background: "var(--primary-foreground)", color: "var(--primary)" }}
            asChild
          >
            <Link href="#contato">
              Quero falar com a equipe
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <p className="mt-5 text-xs" style={{ color: "color-mix(in oklch, var(--primary-foreground) 60%, transparent)" }}>
            Respondemos em até 2 horas úteis · Sem fidelidade · Cancele quando quiser
          </p>
        </div>
      </section>

      {/* ── Service Packages ────────────────────────────────────────────── */}
      <section id="planos" className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <SectionLabel>Nosso plano</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Saúde geriátrica completa por R$ 329/mês
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Um único plano com tudo que o seu familiar precisa — 5,5× mais acessível que planos convencionais e sem burocracia.
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
            Sem carência · Sem fidelidade mínima · Atendimento presencial em até 48h · Parceria Unimed-BH
          </p>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section id="como-funciona" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <SectionLabel>Como funciona</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Três passos para o cuidado coordenado começar
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Do primeiro contato até a consulta de avaliação, nossa equipe cuida de tudo com agilidade e atenção.
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
              Quem confia no Mais60 Saúde
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pacientes, familiares e profissionais de BH compartilham suas experiências com o nosso cuidado.
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
                Nossa equipe está pronta para entender a situação do seu familiar e indicar o melhor caminho. O primeiro contato é gratuito e sem compromisso.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: Phone, label: "Telefone / WhatsApp", value: "(31) 99999-0000" },
                  { icon: Mail, label: "E-mail", value: "contato@mais60saude.com.br" },
                  { icon: MapPin, label: "Cobertura", value: "Belo Horizonte e Região Metropolitana" },
                  { icon: Clock, label: "Atendimento", value: "Seg–Sex 7h–19h · Pronto Cuidar 24h" },
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
                  Preencha abaixo e entraremos em contato em até 48 horas úteis.
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
              <div className="flex items-center mb-3">
                <img src="/logo.svg" alt="Mais60 Saúde" className="h-14 w-auto" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                Saúde geriátrica coordenada para maiores de 60 em Belo Horizonte — com enfermeiro navegador, equipe multidisciplinar e Pronto Cuidar 24h.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Serviços</p>
              <ul className="flex flex-col gap-2">
                {["Mais60 Essencial", "Enfermeiro Navegador", "Pronto Cuidar 24h", "Consulta Geriátrica", "Equipe Multidisciplinar"].map((item) => (
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
                {["Sobre nós", "Como funciona", "Nossas unidades", "Trabalhe conosco", "Parceria Unimed-BH"].map((item) => (
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
              © 2025 Mais60 Saúde. Todos os direitos reservados.
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
