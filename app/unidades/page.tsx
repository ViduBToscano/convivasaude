"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { ArrowRight, MapPin, Phone, Calendar, Clock, ExternalLink, X, MailIcon } from "lucide-react"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import MobileCarousel from "@/components/MobileCarousel"

const unidades = [
  {
    nome: "Barro Preto",
    endereco: "R. Juiz de Fora, 1071, Barro Preto, BH",
    horario: "Seg a Sex: 7h às 22h · Sáb: 7h às 13h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Juiz+de+Fora,+1071+Barro+Preto+BH",
  },
  {
    nome: "Santo Agostinho",
    endereco: "R. Rio Grande do Sul, 1137, Santo Agostinho, BH",
    horario: "Seg a Sex: 7h às 19h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Rio+Grande+do+Sul,+1137+Santo+Agostinho+BH",
  },
  {
    nome: "Santa Efigênia",
    endereco: "R. Padre Rolim, 850, Santa Efigênia, BH",
    horario: "Seg a Sex: 7h às 19h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Padre+Rolim,+850+Santa+Efigenia+BH",
  },
  {
    nome: "Pampulha",
    endereco: "R. Arthur Itabirano, 262, Pampulha, BH",
    horario: "Seg a Sex: 8h às 18h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Arthur+Itabirano,+262+Pampulha+BH",
  },
  {
    nome: "Betim",
    endereco: "R. Mato Grosso, 926, Betim, MG",
    horario: "Seg a Sex: 7h às 19h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.google.com/?q=R.+Mato+Grosso,+926+Betim+MG",
  },
  {
    nome: "Pronto Cuidar",
    endereco: "Av. Brasil, 1477, Funcionários, Belo Horizonte",
    horario: "Seg a Sex: 7h às 19h",
    telefone: "(31) 2513-0552",
    maps: "https://maps.app.goo.gl/NHRkFKSvn1ji39MM7",
  },
]

const howItWorks = [
  { icon: Phone, title: "Contrate pelo WhatsApp", desc: "Fale com nossa equipe e assine o pacote sem sair de casa." },
  { icon: Calendar, title: "Agendamento em 48h", desc: "Após a contratação, agendamos a avaliação na unidade mais próxima." },
  { icon: MapPin, title: "Vá à unidade", desc: "Seu familiar é recebido pela equipe multidisciplinar na clínica." },
]

export default function UnidadesPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ animation: "fadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0s" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
              Nossas unidades
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 max-w-3xl">
              O cuidado Conviva acontece perto de você
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
              Atendemos em BH e região metropolitana, nas clínicas da Mais60 Saúde, referência em geriatria em Minas Gerais.
            </p>
          </div>
        </section>

        {/* ── Parceria Mais60 ───────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28 relative overflow-hidden"
          style={{
            borderTop: "1px solid var(--border)",
            background: "linear-gradient(135deg, color-mix(in oklch, var(--primary) 6%, var(--background)), color-mix(in oklch, var(--primary) 2%, var(--background)) 60%, var(--background))",
            animation: "fadeUp 0.6s ease forwards",
            opacity: 0,
            animationDelay: "0.1s",
          }}
        >
          {/* Blob decorativo fundo */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-0 -left-16 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%)",
              animation: "float 11s ease-in-out infinite reverse",
            }}
          />

          <div className="mx-auto max-w-6xl px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

              {/* Coluna de texto */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                  Nossa parceria
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-5">
                  Nossos atendimentos acontecem nas clínicas da Mais60 Saúde
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted-foreground)" }}>
                  O pacote de benefícios da Conviva Saúde opera em parceria com a Mais60 Saúde, referência nacional em cuidado geriátrico, com mais de 10 anos de experiência e unidades em Belo Horizonte e região. Quando você contrata a Conviva, seu familiar é atendido por uma equipe especializada em idosos, dentro de uma estrutura pensada inteiramente para ele.
                </p>
                <img
                  src="https://mais60saude.com.br/wp-content/uploads/2023/07/logomais60.png"
                  alt="Mais60 Saúde"
                  width={160}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              </div>

              {/* Coluna de imagem */}
              <div className="relative" style={{ animation: "float 7s ease-in-out infinite" }}>
                {/* Imagem da unidade */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "4/3",
                    borderRadius: "2.5rem 4rem 2rem 3.5rem",
                  }}
                >
                  <img
                    src="/unidade-bh.jpg"
                    alt="Unidade Mais60 Saúde em Belo Horizonte"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Círculos decorativos flutuantes */}
                <div
                  className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full"
                  style={{
                    background: "color-mix(in oklch, var(--primary) 18%, var(--muted))",
                    animation: "float 5s ease-in-out infinite reverse",
                  }}
                />
                <div
                  className="absolute -top-5 -right-5 w-12 h-12 rounded-full"
                  style={{
                    background: "color-mix(in oklch, var(--primary) 28%, var(--muted))",
                    animation: "float 9s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Lista de unidades ─────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ borderTop: "1px solid var(--border)", animation: "fadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.2s" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                Onde atendemos
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Unidades disponíveis
              </h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Todas as unidades são operadas pela Mais60 Saúde.
              </p>
            </div>

            <MobileCarousel desktopClass="md:grid md:grid-cols-2 md:gap-4">
              {unidades.map(({ nome, endereco, horario, telefone, maps }) => (
                <div
                  key={nome}
                  className="flex flex-col gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: "color-mix(in oklch, var(--primary) 12%, var(--card))",
                        color: "var(--primary)",
                      }}
                    >
                      {nome}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="size-4 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                      <p className="text-sm leading-snug">{endereco}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="size-4 shrink-0 mt-0.5" style={{ color: "var(--muted-foreground)" }} />
                      <p className="text-sm leading-snug" style={{ color: "var(--muted-foreground)" }}>{horario}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Phone className="size-4 shrink-0 mt-0.5" style={{ color: "var(--muted-foreground)" }} />
                      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{telefone}</p>
                    </div>
                  </div>

                  <a
                    href={maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:underline mt-auto"
                    style={{ color: "var(--primary)" }}
                  >
                    <ExternalLink className="size-3.5" />
                    Ver no Google Maps
                  </a>
                </div>
              ))}
            </MobileCarousel>
          </div>
        </section>

        {/* ── Como chegar ───────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ borderTop: "1px solid var(--border)", background: "var(--muted)", animation: "fadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.3s" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                Como funciona
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Como funciona o atendimento
              </h2>
              <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
                Você não precisa ir até a unidade para contratar. Todo o processo de adesão é feito pelo WhatsApp ou pelo site. A primeira visita presencial é a avaliação inicial com o médico e enfermeiro de referência, agendada em até 48h após a contratação.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {howItWorks.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="size-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "color-mix(in oklch, var(--primary) 12%, var(--card))" }}
                  >
                    <Icon className="size-4" style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA final ─────────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--primary)", animation: "fadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.4s" }}
        >
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
              style={{ color: "var(--primary-foreground)" }}
            >
              Quer saber qual unidade atende você?
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}
            >
              Fale com nossa equipe e descubra a unidade mais próxima da sua região.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="inverted" onClick={() => setShowModal(true)}>
                <Phone className="size-4" />
                Falar com a equipe
              </Button>
              <Button variant="outline-inverted" asChild>
                <Link href="/contratar">
                  Contratar agora
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* ── Modal de contato ──────────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, color-mix(in oklch, var(--primary) 8%, var(--card)), color-mix(in oklch, var(--accent) 30%, var(--card)))",
              border: "1px solid color-mix(in oklch, var(--primary) 20%, var(--border))",
              boxShadow: "0 8px 48px rgba(0,0,0,0.2)",
            }}
          >
            <div className="px-6 pt-6 pb-5 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <MailIcon className="size-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-base font-semibold">Fale com nossa equipe</p>
                  <p className="text-xs text-muted-foreground">Respondemos em até 2 horas úteis</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              <ContactForm showCard={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
