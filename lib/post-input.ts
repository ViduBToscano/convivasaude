import { type PostInput } from "./blog-db"
import { markdownToBlocks, slugify } from "./markdown"

export interface PostBody {
  title?: string
  slug?: string
  excerpt?: string
  category?: string
  readTime?: string
  image?: string
  imageAlt?: string
  contentMd?: string
  published?: boolean
  publishedAt?: string
}

export function parsePostBody(raw: PostBody): { input?: PostInput; error?: string } {
  const title = (raw.title ?? "").trim()
  if (!title) return { error: "titulo_obrigatorio" }

  let slug = (raw.slug ?? "").trim()
  if (!slug) slug = slugify(title)
  slug = slugify(slug)
  if (!slug) return { error: "slug_invalido" }

  const contentMd = (raw.contentMd ?? "").toString()
  const published = raw.published === true

  return {
    input: {
      slug,
      title,
      excerpt: (raw.excerpt ?? "").trim(),
      category: (raw.category ?? "").trim(),
      readTime: (raw.readTime ?? "").trim(),
      image: (raw.image ?? "").trim(),
      imageAlt: (raw.imageAlt ?? "").trim(),
      contentMd,
      contentJson: JSON.stringify(markdownToBlocks(contentMd)),
      published,
      publishedAt: (raw.publishedAt ?? "").trim(),
    },
  }
}
