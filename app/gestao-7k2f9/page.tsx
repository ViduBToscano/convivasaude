import Link from "next/link"
import { getAllPostsAdmin } from "@/lib/blog-db"
import AdminPostList from "./AdminPostList"

export const dynamic = "force-dynamic"

export default function AdminHomePage() {
  const posts = getAllPostsAdmin()
  return (
    <div className="min-h-screen" style={{ background: "var(--muted)" }}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold">Artigos do Blog</h1>
            <p className="text-xs text-muted-foreground">{posts.length} artigo(s)</p>
          </div>
          <Link
            href="/gestao-7k2f9/posts/new"
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            + Novo artigo
          </Link>
        </div>

        <AdminPostList
          posts={posts.map((p) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            category: p.category,
            published: p.published,
            updatedAt: p.updatedAt,
          }))}
        />
      </div>
    </div>
  )
}
