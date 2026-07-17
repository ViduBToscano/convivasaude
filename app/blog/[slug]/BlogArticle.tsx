"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Clock, Calendar, Phone } from "lucide-react"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"
import { CATEGORY_CONFIG, type BlogPost, type ContentBlock } from "@/lib/blog-data"
import { renderInline } from "@/components/blog/inline"
import { useState } from "react"
import { X, MailIcon } from "lucide-react"

export default function BlogArticle({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  const [showModal, setShowModal] = useState(false)

  const cfg = CATEGORY_CONFIG[post.category]
  const h2Sections = post.content.filter((b): b is Extract<ContentBlock, { type: "h2" }> => b.type === "h2")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    publisher: { "@type": "Organization", name: "Conviva Saúde" },
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">

        {/* ── Breadcrumb ────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-5xl px-6 pt-8">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="size-3" />
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="size-3" />
            <span style={{ color: cfg?.text }}>{post.category}</span>
          </nav>
        </div>

        {/* ── Article header ────────────────────────────────────────────── */}
        <header
          className="mx-auto max-w-5xl px-6 pt-8 pb-10"
          style={{ animation: "fadeUp 0.5s ease forwards", opacity: 0 }}
        >
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {cfg && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                  style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }}
                >
                  <span className="size-1.5 rounded-full" style={{ background: cfg.dot }} />
                  {post.category}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                <Clock className="size-3" />
                {post.readTime} de leitura
              </span>
              {post.publishedAt && (
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <Calendar className="size-3" />
                  {post.publishedAt}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-5">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* ── Hero image ────────────────────────────────────────────────── */}
        <div
          className="mx-auto max-w-5xl px-6 mb-12"
          style={{ animation: "fadeUp 0.5s ease forwards", opacity: 0, animationDelay: "0.1s" }}
        >
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/7" }}>
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1024px"
              priority
            />
          </div>
          <p className="text-xs mt-2 px-1" style={{ color: "var(--muted-foreground)" }}>
            {post.imageAlt}
          </p>
        </div>

        {/* ── Content + Sidebar ─────────────────────────────────────────── */}
        <div
          className="mx-auto max-w-5xl px-6 pb-20"
          style={{ animation: "fadeUp 0.5s ease forwards", opacity: 0, animationDelay: "0.15s" }}
        >
          <div className="grid lg:grid-cols-[1fr_268px] gap-12 xl:gap-16 items-start">

            {/* Article body */}
            <article>
              <div className="prose-blog">
                {post.content.map((block, i) => (
                  <BlockRenderer key={i} block={block} onCta={() => setShowModal(true)} />
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-6">

                {/* Table of contents */}
                {h2Sections.length > 0 && (
                  <div
                    className="rounded-2xl p-5"
                    style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--muted-foreground)" }}>
                      Neste artigo
                    </p>
                    <nav className="flex flex-col gap-1">
                      {h2Sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="text-sm leading-snug py-1.5 px-2 rounded-lg transition-colors hover:text-foreground"
                          style={{ color: "var(--muted-foreground)" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--muted)" }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent" }}
                        >
                          {section.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Sidebar CTA */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "color-mix(in oklch, var(--primary) 8%, var(--card))",
                    border: "1px solid color-mix(in oklch, var(--primary) 25%, var(--border))",
                  }}
                >
                  <p className="text-sm font-bold mb-2 leading-snug">
                    Acompanhamento geriátrico para seu familiar
                  </p>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
                    Médico de referência + equipe multidisciplinar por R$ 329/mês. Sem carência.
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    <Phone className="size-3.5" />
                    Falar com a equipe
                  </button>
                  <Link
                    href="/contratar"
                    className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 transition-colors hover:text-foreground"
                    style={{ color: "var(--primary)" }}
                  >
                    Contratar agora
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Mobile CTA after article ───────────────────────────────── */}
        <div
          className="lg:hidden mx-auto max-w-5xl px-6 pb-12"
          style={{ animation: "fadeUp 0.5s ease forwards", opacity: 0, animationDelay: "0.2s" }}
        >
          <div
            className="rounded-2xl p-6"
            style={{
              background: "color-mix(in oklch, var(--primary) 8%, var(--card))",
              border: "1px solid color-mix(in oklch, var(--primary) 25%, var(--border))",
            }}
          >
            <p className="text-base font-bold mb-2">Acompanhamento geriátrico para seu familiar</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
              Médico de referência + equipe multidisciplinar por R$ 329/mês. Sem carência.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                <Phone className="size-4" />
                Falar com a equipe
              </button>
              <Link
                href="/contratar"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  border: "1.5px solid color-mix(in oklch, var(--primary) 40%, var(--border))",
                  color: "var(--primary)",
                }}
              >
                Contratar agora
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Artigos relacionados ───────────────────────────────────── */}
        <section
          className="py-14 md:py-16"
          style={{ borderTop: "1px solid var(--border)", animation: "fadeUp 0.5s ease forwards", opacity: 0, animationDelay: "0.25s" }}
        >
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: "var(--muted-foreground)" }}>
              Você também pode gostar
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => {
                const rcfg = CATEGORY_CONFIG[p.category]
                const card = (
                  <div
                    key={p.slug}
                    className="group rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      opacity: p.published ? 1 : 0.7,
                      cursor: p.published ? "pointer" : "default",
                    }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {!p.published && (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ background: "rgba(0,0,0,0.22)", backdropFilter: "blur(2px)" }}
                        >
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            Em breve
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      {rcfg && (
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: rcfg.text }}
                        >
                          {p.category}
                        </span>
                      )}
                      <p className="text-sm font-semibold leading-snug">{p.title}</p>
                      <span className="flex items-center gap-1 text-xs mt-auto pt-1" style={{ color: "var(--muted-foreground)" }}>
                        <Clock className="size-3" />
                        {p.readTime} de leitura
                      </span>
                    </div>
                  </div>
                )
                return p.published ? (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="block">
                    {card}
                  </Link>
                ) : (
                  <div key={p.slug}>{card}</div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CTA final ─────────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--primary)", animation: "fadeUp 0.5s ease forwards", opacity: 0, animationDelay: "0.3s" }}
        >
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
              style={{ color: "var(--primary-foreground)" }}
            >
              Quer acompanhamento médico para seu familiar?
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}
            >
              Médico geriatra de referência, equipe multidisciplinar e Pronto Cuidar por R$ 329/mês. Sem carência.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--primary-foreground)", color: "var(--primary)" }}
              >
                <Phone className="size-4" />
                Falar com a equipe
              </button>
              <Link
                href="/contratar"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  background: "transparent",
                  color: "var(--primary-foreground)",
                  border: "2px solid color-mix(in oklch, var(--primary-foreground) 35%, transparent)",
                }}
              >
                Contratar agora
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Contact modal */}
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

function BlockRenderer({ block, onCta }: { block: ContentBlock; onCta: () => void }) {
  if (block.type === "p") {
    return (
      <p
        className="mb-6 text-[17px] md:text-[18px] leading-[1.85]"
        style={{ color: "var(--foreground)" }}
      >
        {renderInline(block.text)}
      </p>
    )
  }

  if (block.type === "h2") {
    return (
      <h2
        id={block.id}
        className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-5 pt-2 scroll-mt-24"
        style={{ borderTop: "2px solid var(--border)", paddingTop: "1.5rem" }}
      >
        {block.text}
      </h2>
    )
  }

  if (block.type === "h3") {
    return (
      <h3 className="text-xl font-semibold tracking-tight mt-8 mb-4" style={{ color: "var(--foreground)" }}>
        {renderInline(block.text)}
      </h3>
    )
  }

  if (block.type === "blockquote") {
    return (
      <blockquote
        className="my-8 pl-6 py-1 text-lg md:text-xl leading-relaxed italic"
        style={{
          borderLeft: "4px solid var(--primary)",
          color: "var(--muted-foreground)",
        }}
      >
        {renderInline(block.text)}
      </blockquote>
    )
  }

  if (block.type === "list") {
    return (
      <ul className="my-5 flex flex-col gap-3">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[17px] md:text-[18px] leading-relaxed">
            <span
              className="mt-2.5 size-2 rounded-full shrink-0"
              style={{ background: "var(--primary)" }}
            />
            <span style={{ color: "var(--foreground)" }}>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === "image") {
    return (
      <figure className="my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={block.src}
          alt={block.alt}
          loading="lazy"
          className="w-full rounded-2xl"
          style={{ border: "1px solid var(--border)" }}
        />
        {block.alt && (
          <figcaption className="text-xs mt-2 px-1" style={{ color: "var(--muted-foreground)" }}>
            {block.alt}
          </figcaption>
        )}
      </figure>
    )
  }

  if (block.type === "cta") {
    return (
      <div
        className="my-10 rounded-2xl p-6 md:p-8"
        style={{
          background: "color-mix(in oklch, var(--primary) 7%, var(--card))",
          border: "1.5px solid color-mix(in oklch, var(--primary) 25%, var(--border))",
        }}
      >
        <p className="text-lg font-bold mb-2">
          Quer acompanhamento médico para seu familiar?
        </p>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted-foreground)" }}>
          A Conviva Saúde oferece médico geriatra de referência, enfermeiro dedicado, equipe multidisciplinar e Pronto Cuidar por R$ 329/mês, sem carência.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onCta}
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            <Phone className="size-4" />
            Falar com a equipe
          </button>
          <Link
            href="/contratar"
            className="flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
            style={{
              border: "1.5px solid color-mix(in oklch, var(--primary) 40%, var(--border))",
              color: "var(--primary)",
            }}
          >
            Conhecer o plano
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    )
  }

  return null
}
