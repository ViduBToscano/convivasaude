import type { Metadata } from "next"
import { getPostBySlugDb } from "@/lib/blog-db"
import { SITE_URL } from "@/lib/site-config"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlugDb(slug)
  if (!post) {
    return { title: "Artigo não encontrado | Blog Conviva Saúde" }
  }
  const url = `${SITE_URL}/blog/${slug}`
  // Mantem o <title> <= 60 chars: so anexa a marca quando couber (limite Google).
  const suffix = " | Conviva Saúde"
  const pageTitle =
    post.title.length + suffix.length <= 60 ? `${post.title}${suffix}` : post.title
  return {
    title: pageTitle,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: post.excerpt,
      url,
      siteName: "Conviva Saúde",
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: post.excerpt,
    },
  }
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
