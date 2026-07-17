import { notFound } from "next/navigation"
import { getPostById } from "@/lib/blog-db"
import PostEditor from "../../../PostEditor"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

export default async function EditPostPage({ params }: Props) {
  const id = Number((await params).id)
  const post = Number.isInteger(id) ? getPostById(id) : undefined
  if (!post) notFound()

  return (
    <PostEditor
      initial={{
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
        image: post.image,
        imageAlt: post.imageAlt,
        contentMd: post.contentMd,
        published: post.published,
        publishedAt: post.publishedAt,
      }}
    />
  )
}
