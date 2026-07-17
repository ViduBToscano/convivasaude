import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"
import { getPublishedPosts } from "@/lib/blog-db"

export const dynamic = "force-dynamic"

export default function sitemap(): MetadataRoute.Sitemap {
  // publishedAt e armazenado como texto pt-BR ("15 de janeiro de 2026"), que nao
  // e um datetime W3C valido para <lastmod>. lastmod e opcional, entao omitimos
  // em vez de emitir data invalida (que o SemRush marca como pagina incorreta).
  const posts = getPublishedPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [
    { url: SITE_URL,                    changeFrequency: "weekly",  priority: 1   },
    { url: `${SITE_URL}/sobre`,         changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/como-funciona`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/unidades`,      changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq`,           changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`,          changeFrequency: "weekly",  priority: 0.6 },
    { url: `${SITE_URL}/privacidade`,   changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/termos`,        changeFrequency: "yearly",  priority: 0.3 },
    ...posts,
  ]
}
