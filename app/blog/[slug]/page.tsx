import { notFound } from "next/navigation"
import { getPostBySlugDb, getPublishedPosts } from "@/lib/blog-db"
import BlogArticle from "./BlogArticle"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ slug: string }> }

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlugDb(slug)

  if (!post || !post.published) notFound()

  const related = getPublishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  return <BlogArticle post={post} related={related} />
}
