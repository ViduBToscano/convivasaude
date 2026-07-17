"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import Footer from "@/components/Footer"
import { CATEGORY_CONFIG, type BlogPost } from "@/lib/blog-data"

const CATEGORIES = [
  "Todos",
  "Saúde Preventiva",
  "Nutrição",
  "Saúde Mental",
  "Medicamentos",
  "Família",
  "Exercícios",
]

function CategoryBadge({ category }: { category: string }) {
  const cfg = CATEGORY_CONFIG[category]
  if (!cfg) return null
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide"
      style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }}
    >
      <span className="size-1.5 rounded-full shrink-0" style={{ background: cfg.dot }} />
      {category}
    </span>
  )
}

function ComingSoonBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
      style={{
        background: "color-mix(in oklch, var(--warning, #f59e0b) 12%, var(--background))",
        color: "var(--warning, #b45309)",
        borderColor: "color-mix(in oklch, var(--warning, #f59e0b) 30%, transparent)",
      }}
    >
      Em breve
    </span>
  )
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const featured = posts.find((p) => p.published) ?? null
  const rest = posts.filter((p) => p.slug !== featured?.slug)

  const filteredFeatured =
    featured && (activeCategory === "Todos" || activeCategory === featured.category)
      ? featured
      : null

  const filteredRest = rest.filter(
    (p) => activeCategory === "Todos" || p.category === activeCategory
  )

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="pt-16 md:pt-24 pb-10 md:pb-14"
          style={{ animation: "fadeUp 0.55s ease forwards", opacity: 0 }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="size-4" style={{ color: "var(--primary)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                Blog de Saúde
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5 max-w-3xl">
              Blog de Saúde
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
              Informações confiáveis sobre envelhecimento saudável, cuidado geriátrico e qualidade de vida para idosos e seus familiares.
            </p>

            {/* Category pills */}
            <div className="mt-8 -mx-6 px-6 overflow-x-auto">
              <div className="flex items-center gap-2 pb-1" style={{ width: "max-content" }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200"
                    style={
                      activeCategory === cat
                        ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                        : { background: "var(--muted)", color: "var(--muted-foreground)" }
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Artigo destaque ───────────────────────────────────────────── */}
        {filteredFeatured && (
          <section
            className="pb-12 md:pb-16"
            style={{ animation: "fadeUp 0.55s ease forwards", opacity: 0, animationDelay: "0.1s" }}
          >
            <div className="mx-auto max-w-6xl px-6">
              <Link
                href={`/blog/${filteredFeatured.slug}`}
                className="group block rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}
              >
                <div className="grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_480px]">
                  {/* Image */}
                  <div className="relative aspect-video md:aspect-auto md:min-h-[380px] overflow-hidden">
                    <Image
                      src={filteredFeatured.image}
                      alt={filteredFeatured.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to right, transparent 60%, var(--card))" }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                    <div className="flex items-center gap-2 mb-5">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                      >
                        Destaque
                      </span>
                      <CategoryBadge category={filteredFeatured.category} />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold leading-snug tracking-tight mb-4 group-hover:text-primary transition-colors">
                      {filteredFeatured.title}
                    </h2>

                    <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: "var(--muted-foreground)" }}>
                      {filteredFeatured.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                        <Clock className="size-3.5" />
                        <span>{filteredFeatured.readTime} de leitura</span>
                      </div>
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2.5"
                        style={{ color: "var(--primary)" }}
                      >
                        Ler artigo
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── Grade de artigos ──────────────────────────────────────────── */}
        {filteredRest.length > 0 && (
          <section
            className="pb-20"
            style={{
              borderTop: filteredFeatured ? "1px solid var(--border)" : "none",
              animation: "fadeUp 0.55s ease forwards",
              opacity: 0,
              animationDelay: "0.2s",
            }}
          >
            <div className="mx-auto max-w-6xl px-6 pt-12">
              {filteredFeatured && (
                <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: "var(--muted-foreground)" }}>
                  Mais artigos
                </p>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRest.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty state */}
        {!filteredFeatured && filteredRest.length === 0 && (
          <section className="pb-20 pt-8">
            <div className="mx-auto max-w-6xl px-6 text-center py-20">
              <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
                Nenhum artigo publicado nessa categoria ainda.
              </p>
              <button
                onClick={() => setActiveCategory("Todos")}
                className="mt-4 text-sm font-medium underline underline-offset-4"
                style={{ color: "var(--primary)" }}
              >
                Ver todos os artigos
              </button>
            </div>
          </section>
        )}

        {/* ── CTA final ─────────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--primary)", animation: "fadeUp 0.55s ease forwards", opacity: 0, animationDelay: "0.3s" }}
        >
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
              style={{ color: "var(--primary-foreground)" }}
            >
              Cuide de quem você ama
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "color-mix(in oklch, var(--primary-foreground) 80%, transparent)" }}
            >
              Nossa equipe está pronta para responder suas dúvidas e apresentar o cuidado que seu familiar merece.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contratar"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--primary-foreground)", color: "var(--primary)" }}
              >
                Conhecer o plano
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  background: "transparent",
                  color: "var(--primary-foreground)",
                  border: "2px solid color-mix(in oklch, var(--primary-foreground) 35%, transparent)",
                }}
              >
                Tirar dúvidas
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

function ArticleCard({ post }: { post: BlogPost }) {
  const inner = (
    <div
      className="group flex flex-col rounded-2xl overflow-hidden h-full transition-all duration-300"
      style={{
        border: "1px solid var(--border)",
        background: "var(--card)",
        opacity: post.published ? 1 : 0.72,
        cursor: post.published ? "pointer" : "default",
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        if (post.published) (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none"
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!post.published && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(2px)" }}
          >
            <ComingSoonBadge />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={post.category} />
          <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
            <Clock className="size-3" />
            {post.readTime}
          </span>
        </div>

        <h3
          className="text-base font-bold leading-snug tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed line-clamp-2 flex-1" style={{ color: "var(--muted-foreground)" }}>
          {post.excerpt}
        </p>

        {post.published && (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold mt-1 transition-colors group-hover:gap-2"
            style={{ color: "var(--primary)" }}
          >
            Ler artigo
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </div>
  )

  if (!post.published) return <div>{inner}</div>

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      {inner}
    </Link>
  )
}
