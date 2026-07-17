"use client"

import { useState } from "react"
import { SITE_URL } from "@/lib/site-config"
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
} from "lucide-react"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import MobileCarousel from "@/components/MobileCarousel"

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


const stats = [
  { value: "Médico de Referência", label: "Acompanha sua saúde de forma contínua" },
  { value: "Equipe Multidisciplinar", label: "Cuidado integrado em um só lugar" },
  { value: "Pronto Cuidar", label: "Emergência do idoso, sempre que precisar" },
  { value: "Pacote Mensal", label: "Valor fixo, independente da idade" },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Conviva Saúde",
    "description": "Pacote de cuidado contínuo para idosos 60+ em Belo Horizonte. Médico de referência, equipe multidisciplinar e Pronto Cuidar.",
    "url": SITE_URL,
    "telephone": "+5531936182994",
    "email": "contato@convivasaude.com.br",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belo Horizonte",
      "addressRegion": "MG",
      "addressCountry": "BR"
    },
    "priceRange": "R$ 329/mês",
    "areaServed": "Belo Horizonte e região metropolitana",
    "sameAs": ["https://www.instagram.com/convivasaude/"]
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                style={{ background: "color-mix(in oklch, var(--primary) 12%, transparent)", color: "var(--primary)", border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)", animation: "fadeUp 0.5s ease both", animationDelay: "0ms" }}
              >
                <Heart className="size-3" strokeWidth={2.5} />
                Cuidado completo para quem tem 60+!
              </Badge>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
                style={{ animation: "fadeUp 0.55s ease both", animationDelay: "80ms" }}
              >
                Mais cuidado no seu dia a dia. Com uma equipe{" "}
                <span style={{ color: "var(--secondary)" }}>que acompanha a sua saúde!</span>
              </h1>

              <p
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
                style={{ animation: "fadeUp 0.55s ease both", animationDelay: "160ms" }}
              >
                A Conviva Saúde é um pacote de cuidado contínuo para idosos. Tenha acesso a médico de referência, enfermeiros, equipe multidisciplinar e um Pronto Cuidar, um espaço de pronto atendimento para o idoso.{" "}
                <strong>Tudo por R$ 329/mês, independente da idade.</strong>
              </p>

              <div
                className="flex flex-col sm:flex-row gap-3 mb-12"
                style={{ animation: "fadeUp 0.55s ease both", animationDelay: "240ms" }}
              >
                <Button size="lg" asChild>
                  <Link href="#contato">
                    Quero contratar agora
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#como-funciona">
                    Como funciona o Conviva Saúde?
                  </Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div
                className="flex flex-wrap items-center gap-x-6 gap-y-3"
                style={{ animation: "fadeUp 0.55s ease both", animationDelay: "320ms" }}
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
          <MobileCarousel desktopClass="md:grid md:grid-cols-4 md:gap-0 md:divide-x md:divide-border">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-4 py-2">
                <p className="text-base font-bold text-primary leading-snug">{value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{label}</p>
              </div>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────── */}
      <section id="sobre" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="min-w-0">
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
              <MobileCarousel desktopClass="md:grid md:grid-cols-2 md:gap-4">
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
              </MobileCarousel>
            </div>

            {/* Foto sobre */}
            <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 md:h-96">
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
      <section className="py-20 md:py-28" style={{ background: "var(--primary)" }}>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" variant="inverted" className="w-full sm:w-auto" asChild>
              <Link href="#contato">
                Quero saber mais sobre a Conviva Saúde
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-inverted" className="w-full sm:w-auto" asChild>
              <Link href="/contratar">
                Quero contratar a Conviva Saúde
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-xs" style={{ color: "color-mix(in oklch, var(--primary-foreground) 60%, transparent)" }}>
            Atendimento rápido · Sem carência · Sem reajuste por idade
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
                    className="w-full"
                    size="lg"
                    variant={pkg.color === "featured" ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contratar">
                      Contratar agora
                      <ArrowRight className="size-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#contato">
                      {pkg.cta}
                      <ChevronRight className="size-4" />
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
                <div key={number} className="flex gap-5 items-start" style={{ animation: "fadeUp 0.5s ease both", animationDelay: `${i * 120}ms` }}>
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

              <Button size="lg" className="w-full mt-2" asChild>
                <Link href="#contato">
                  Contrate agora a Conviva Saúde!
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </div>

            {/* Foto à direita */}
            <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 md:h-full md:min-h-[420px]">
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
                  alt="Mais60 Saúde, parceira da Conviva"
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

            {/* Right column, 4 cards */}
            <MobileCarousel desktopClass="md:grid md:grid-cols-2 md:gap-4">
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
            </MobileCarousel>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden h-44 sm:h-56 md:h-72 mt-10">
            <Image
              src="/images/16.jpeg"
              alt="Clínica Mais60 Saúde"
              fill
              className="object-cover object-center"
            />
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
                  a: "R$ 329/mês para qualquer idade, 60, 70, 80, 90 anos. O valor é fixo e não sofre reajuste por faixa etária.",
                },
                {
                  q: "Tem carência ou fidelidade?",
                  a: "Não há carência: o cuidado começa imediatamente após a contratação. A fidelidade mínima é de 4 meses e, após esse período, você pode cancelar quando quiser, avisando com 30 dias de antecedência.",
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
                        style={{ animation: "fadeUp 0.2s ease both" }}
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
      <section id="contato" className="py-20 md:py-28 bg-muted">
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
                  // { icon: Clock, label: "Atendimento", value: "Seg a Sex 7h a 21h · Sáb 8h a 18h" },
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

            <ContactForm
              title="Fale com nossa equipe"
              subtitle="Respondemos em até 2 horas úteis"
              showCard={true}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
