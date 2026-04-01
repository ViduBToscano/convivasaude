"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart, Shield, /* Clock, */ Star, CheckCircle,
  Phone, Mail, MapPin, ArrowRight, Users,
  ChevronRight, ChevronDown, Activity,
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
    id: "conviva",
    name: <strong>Conviva Saúde</strong>,
    badge: null,
    price: "R$ 329",
    period: "/mês",
    description: "O cuidado completo que seu familiar merece, em um pacote fixo, transparente e sem burocracia.",
    color: "featured" as const,
    features: [
      "Médico de referência dedicado",
      "Enfermeiro de referência",
      "Equipe multidisciplinar",
      "Pronto Cuidar",
      "Acompanhamento preventivo e contínuo",
      "Descontos em medicamentos e outros benefícios",
    ],
    cta: "Quero saber mais sobre a Conviva Saúde",
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
      "Após a contratação, nossa equipe médica e de enfermagem avaliará seu momento de saúde para estruturar um programa de cuidado personalizado.",
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
  { value: "Pronto Cuidar", label: "Emergência do idoso, sempre que precisar" },
  { value: "Pacote Mensal", label: "Valor fixo, independente da idade" },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [convenio, setConvenio] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
              ["Pacote", "#planos"],
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
            <Button size="sm" variant="outline" asChild>
              <Link href="/contratar">Contratar agora</Link>
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
                style={{ background: "color-mix(in oklch, var(--primary) 12%, transparent)", color: "var(--primary)", border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)", animation: "cvFadeUp 0.5s ease both", animationDelay: "0ms" }}
              >
                <Heart className="size-3" strokeWidth={2.5} />
                Cuidado completo para quem tem 60+!
              </Badge>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
                style={{ animation: "cvFadeUp 0.55s ease both", animationDelay: "80ms" }}
              >
                Mais cuidado no seu dia a dia. Com uma equipe{" "}
                <span style={{ color: "var(--secondary)" }}>que acompanha a sua saúde!</span>
              </h1>

              <p
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
                style={{ animation: "cvFadeUp 0.55s ease both", animationDelay: "160ms" }}
              >
                A Conviva Saúde é um pacote de cuidado contínuo para idosos. Tenha acesso a médico de referência, enfermeiros, equipe multidisciplinar e um Pronto Cuidar, um espaço de pronto atendimento para o idoso.{" "}
                <strong>Tudo por R$ 329/mês, independente da idade.</strong>
              </p>

              <div
                className="flex flex-col sm:flex-row gap-3 mb-12"
                style={{ animation: "cvFadeUp 0.55s ease both", animationDelay: "240ms" }}
              >
                <Button size="lg" className="gap-2 text-base font-semibold shadow-lg px-8 transition-transform hover:scale-[1.02] active:scale-[0.98]" asChild>
                  <Link href="#contato">
                    Quero contratar agora
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-base font-semibold border-2 transition-transform hover:scale-[1.02] active:scale-[0.98]" asChild>
                  <Link href="#como-funciona">
                    Como funciona o Conviva Saúde?
                  </Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div
                className="flex flex-wrap items-center gap-x-6 gap-y-3"
                style={{ animation: "cvFadeUp 0.55s ease both", animationDelay: "320ms" }}
              >
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
                  src="https://images.unsplash.com/photo-1625690987114-86f5af994b49?w=1200&q=90"
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
              <div key={label} className="flex flex-col items-center text-center px-4">
                <p className="text-base font-bold text-primary leading-snug">{value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{label}</p>
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
                A Conviva Saúde é um pacote de cuidado contínuo pensado para quem quer envelhecer com mais saúde, autonomia e acompanhamento de verdade.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Em vez de atendimentos pontuais, você passa a contar com uma estrutura organizada de cuidado, com profissionais que acompanham sua saúde ao longo do tempo. Tudo de forma simples com previsibilidade e foco na sua qualidade de vida!
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Cross, title: "Médico de referência", desc: "Um médico que te conhece e acompanha sua saúde de forma contínua e preventiva." },
                  { icon: Users, title: "Equipe multidisciplinar", desc: "Nutricionista, fisioterapeuta e outros profissionais que atuam de forma integrada no seu cuidado." },
                  { icon: Hospital, title: "Atendimento de urgência", desc: "Pronto atendimento exclusivo para idosos, disponível com agendamentos e sem fila de espera." },
                  { icon: CreditCard, title: "Pacote mensal", desc: "Um único modelo de cuidado, com valor fixo e pagamento recorrente, sem prejudicar o limite do cartão." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex flex-col gap-2 p-4 rounded-xl bg-muted/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-muted/80">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Foto sobre */}
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96">
              <Image
                src="/images/shutterstock_2641626359.jpg"
                alt="Cuidado com idosos"
                fill
                className="object-cover object-center"
              />
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
            Cuidado certo para viver com mais saúde e tranquilidade. Sem filas nos hospitais. Sem burocracia.
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}>
            Fale com nossa equipe e entenda como a Conviva Saúde organiza o cuidado no dia a dia.<br />
            Tenha acesso a acompanhamento médico, equipe multidisciplinar especializada e um pacote de cuidados que cabe no bolso.
          </p>
          <Button
            size="lg"
            className="gap-2 text-base font-semibold shadow-lg px-10 py-6 text-lg"
            style={{ background: "var(--primary-foreground)", color: "var(--primary)" }}
            asChild
          >
            <Link href="#contato">
              Quero saber mais sobre a Conviva Saúde
              <ArrowRight className="size-5" />
            </Link>
          </Button>
          <div className="mt-4">
            <Link
              href="/contratar"
              className="text-sm font-medium transition-opacity hover:opacity-80 underline underline-offset-4"
              style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}
            >
              Quero contratar a Conviva Saúde →
            </Link>
          </div>
          <p className="mt-4 text-xs" style={{ color: "color-mix(in oklch, var(--primary-foreground) 60%, transparent)" }}>
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
                key={pkg.id}
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
                <CardFooter className="flex flex-col gap-2.5">
                  <Button
                    className="w-full py-6 text-base"
                    size="lg"
                    variant={pkg.color === "featured" ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contratar">
                      Contratar agora
                      <ArrowRight className="size-5 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full text-sm" asChild>
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

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Steps à esquerda */}
            <div className="flex flex-col gap-8">
              {steps.map(({ number, title, description, icon: Icon }, i) => (
                <div key={number} className="flex gap-5 items-start" style={{ animation: "cvFadeUp 0.5s ease both", animationDelay: `${i * 120}ms` }}>
                  <div
                    className="size-16 rounded-2xl flex items-center justify-center shrink-0 relative"
                    style={{ background: "color-mix(in oklch, var(--primary) 10%, var(--background))", border: "2px solid color-mix(in oklch, var(--primary) 20%, transparent)" }}
                  >
                    <Icon className="size-7 text-primary" strokeWidth={1.5} />
                    <span
                      className="absolute -top-2 -right-2 size-6 rounded-full text-[10px] font-bold flex items-center justify-center"
                      style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                    >
                      {number.replace("0", "")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1.5">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}

              <Button size="lg" className="gap-2 font-semibold shadow-lg w-full py-6 text-base mt-2" asChild>
                <Link href="#contato">
                  Contrate agora a Conviva Saúde!
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </div>

            {/* Foto à direita */}
            <div className="relative rounded-2xl overflow-hidden h-[480px] md:h-full min-h-[420px]">
              <Image
                src="/images/20240520_141723.jpg"
                alt="Equipe Conviva em atendimento"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Parceria Mais60 ─────────────────────────────────────────────── */}
      <section id="parceria" className="py-20 md:py-28 bg-accent/20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left column */}
            <div>
              <a
                href="https://mais60saude.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-5 opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src="https://mais60saude.com.br/wp-content/uploads/2023/07/logomais60.png"
                  alt="Mais60 Saúde — parceira da Conviva"
                  className="h-10 w-auto object-contain"
                />
              </a>
              <SectionLabel>Parceria Conviva Saúde e Mais60</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5">
                Nossos atendimentos acontecem nas clínicas da Mais60 Saúde!
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                O pacote de benefícios da Conviva Saúde opera em <strong> parceria com a Mais60 Saúde, referência nacional em cuidado geriátrico, </strong> com mais de 10 anos de experiência e unidades em Belo Horizonte e região. Quando você contrata a Conviva, seu familiar é atendido por uma equipe especializada em idosos, dentro de uma estrutura pensada inteiramente para ele.
              </p>
            </div>

            {/* Right column — 4 cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: MapPin,
                  title: "4 unidades em Belo Horizonte",
                  desc: "Encontre a Mais60 nos bairros: Barro Preto, Santo Agostinho, Santa Efigênia e Pampulha. Sempre uma unidade perto de você.",
                },
                {
                  icon: Users,
                  title: "Vários especialistas em saúde do idoso. Tudo em um só lugar",
                  desc: "Geriatra, enfermeiro, fisioterapeuta, psicólogo, nutricionista, fonoaudiólogo, terapeuta ocupacional e mais.",
                },
                {
                  icon: Star,
                  title: "Referência nacional em geriatria",
                  desc: "Mais de 10 anos cuidando de idosos com foco em reabilitação, prevenção e qualidade de vida.",
                },
                {
                  icon: Activity,
                  title: "Tecnologia Lifecode",
                  desc: "Plataforma digital que centraliza o histórico do paciente e conecta toda a equipe de cuidado em tempo real.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-2 p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden h-56 md:h-72 mt-10">
            <Image
              src="/images/16.jpeg"
              alt="Clínica Mais60 Saúde"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section id="depoimentos" className="py-20 md:py-28 bg-background">
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
            {testimonials.map(({ quote, author, role, initials, stars }, i) => (
              <Card key={author} className="flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ animation: "cvFadeUp 0.5s ease both", animationDelay: `${i * 80}ms` }}>
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

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <SectionLabel>Dúvidas frequentes</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Dúvidas sobre a Conviva Saúde?
              </h2>
              <p className="text-muted-foreground text-sm">
                Confira as dúvidas mais frequentes. Ainda quer saber mais, confira nossa página de FAQ ou fale com a nossa equipe.
              </p>
            </div>

            <div className="flex flex-col">
              {[
                {
                  q: "A Conviva Saúde é um plano de saúde?",
                  a: "Não. A Conviva Saúde é um programa de cuidado voltado para a pessoa idosa. Inclui consultas geriátricas, médico e enfermeiro de referência, equipe multidisciplinar e monitoramento 24h. Não oferecemos hospitais e nem exames laboratoriais.",
                },
                {
                  q: "Quanto custa e muda conforme a idade?",
                  a: "R$ 329/mês para qualquer idade — 60, 70, 80, 90 anos. O valor é fixo e não sofre reajuste por faixa etária.",
                },
                {
                  q: "Tem carência ou fidelidade?",
                  a: "Não tem nenhuma das duas. O cuidado começa imediatamente após a contratação e você pode cancelar quando quiser, sem multa.",
                },
                {
                  q: "Posso contratar para um familiar sendo eu de outra cidade?",
                  a: "Sim! O processo de contratação é 100% digital. Você faz tudo pelo WhatsApp ou pelo site, e nossa equipe cuida de toda a parte presencial com seu familiar em Belo Horizonte.",
                },
                {
                  q: "O que é o Pronto Cuidar 24h?",
                  a: "É o pronto atendimento exclusivo para idosos, em parceria com a Mais60 Saúde. Os atendimentos de urgência são agendados através do telefone e o paciente será atendido no horário certo e sem filas. Além disso, conta com o telemonitoramento 24h. O Pronto Cuidar deverá ser acionado em situações de urgência.",
                },
              ].map(({ q, a }, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={i} className="border-b border-border">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-sm font-semibold leading-relaxed">{q}</span>
                      <ChevronDown
                        className="size-4 shrink-0 mt-0.5 text-muted-foreground transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>
                    {isOpen && (
                      <p
                        className="text-sm leading-relaxed pb-5 text-muted-foreground"
                        style={{ animation: "cvFadeUp 0.2s ease both" }}
                      >
                        {a}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            <Link href="/faq" className="text-sm text-primary hover:underline flex items-center gap-1 mt-6">
              Ver todas as perguntas frequentes
              <ChevronRight className="size-4" />
            </Link>
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
                  { icon: Phone, label: "Telefone / WhatsApp", value: "(31) 93618-2994" },
                  { icon: Mail, label: "E-mail", value: "contato@convivasaude.com.br" },
                  // { icon: MapPin, label: "Cobertura", value: "BH e região até 50km" },
                  // { icon: Clock, label: "Atendimento", value: "Seg–Sex 7h–21h · Sáb 8h–18h" },
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
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, color-mix(in oklch, var(--primary) 8%, var(--card)), color-mix(in oklch, var(--accent) 30%, var(--card)))",
                border: "1px solid color-mix(in oklch, var(--primary) 20%, var(--border))",
                boxShadow: "0 4px 32px color-mix(in oklch, var(--primary) 10%, transparent)",
              }}
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-5 border-b border-border/50">
                <div className="flex items-center gap-3 mb-1">
                  <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <MailIcon className="size-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-base font-semibold">Fale com nossa equipe</p>
                    <p className="text-xs text-muted-foreground">Respondemos em até 2 horas úteis</p>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <div className="px-6 py-5 flex flex-col gap-4">
                {/* Row: nome + whatsapp */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-foreground/70">Nome <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      required
                      className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-foreground/70">WhatsApp <span className="text-destructive">*</span></label>
                    <input
                      type="tel"
                      placeholder="(31) 9 0000-0000"
                      required
                      className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground/70">E-mail <span className="text-muted-foreground font-normal">(opcional)</span></label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Convênio */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground/70">Tem convênio de saúde? <span className="text-destructive">*</span></label>
                  <div className="relative">
                    <select
                      value={convenio}
                      onChange={(e) => setConvenio(e.target.value)}
                      required
                      className="w-full appearance-none rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-foreground pr-9"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="sim">Sim, tenho convênio</option>
                      <option value="nao">Não tenho convênio</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground rotate-90 pointer-events-none" />
                  </div>
                </div>

                {/* Qual convênio — condicional */}
                {convenio === "sim" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-foreground/70">Qual convênio?</label>
                    <input
                      type="text"
                      placeholder="Ex: Unimed, Hapvida…"
                      className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"
                    />
                  </div>
                )}

                {/* Mensagem */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground/70">Mensagem <span className="text-muted-foreground font-normal">(opcional)</span></label>
                  <textarea
                    rows={3}
                    placeholder="Conta um pouco sobre a situação do seu familiar…"
                    className="w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] mt-1"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: "0 4px 16px color-mix(in oklch, var(--primary) 30%, transparent)" }}
                >
                  Enviar mensagem
                  <ArrowRight className="size-4" />
                </button>

                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  <Shield className="size-3 shrink-0" />
                  Seus dados estão seguros. Não compartilhamos com terceiros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center mb-3">
                <img src="/logo.svg" alt="Conviva Saúde" className="h-14 w-auto" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                Programa de cuidado contínuo para idosos, com médico de referência, equipe multidisciplinar e Pronto Cuidar, o pronto atendimento para o idoso.
              </p>
              <div className="flex items-center gap-3 mt-4">
                {[
                  { href: "https://instagram.com", label: "Instagram", icon: <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
                  { href: "https://youtube.com", label: "YouTube", icon: <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg> },
                  { href: "https://linkedin.com", label: "LinkedIn", icon: <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                  {
                    href: "https://tiktok.com", label: "TikTok", icon: (
                      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.03-.1z" />
                      </svg>
                    )
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="size-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Empresa</p>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "Sobre nós", href: "/sobre" },
                  // { label: "Como funciona", href: "/como-funciona" },
                  { label: "Nossas unidades", href: "/unidades" },
                  { label: "Blog de saúde", href: "/blog" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Suporte</p>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "Central de ajuda", href: "/faq" },
                  { label: "Política de privacidade", href: "/privacidade" },
                  { label: "Termos de uso", href: "/termos" },
                  { label: "Contato", href: "#contato" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © 2026 Conviva Saúde. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-[10px] gap-1">
                <Shield className="size-3" /> Dados protegidos · LGPD
              </Badge>
              <Link href="/styleguide" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Sistema de Design →
              </Link>
              <Link href="/brandguide" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Brand Guide →
              </Link>
              <Link href="/criativos" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Criativos →
              </Link>
              <Link href="/planosmidia" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Plano de Mídia →
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes cvFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
