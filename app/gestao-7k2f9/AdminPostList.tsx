"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, ExternalLink, LogOut } from "lucide-react"

interface Row {
  id: number
  title: string
  slug: string
  category: string
  published: boolean
  updatedAt: string
}

export default function AdminPostList({ posts }: { posts: Row[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState<number | null>(null)

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Excluir o artigo "${title}"? Esta ação não pode ser desfeita.`)) return
    setBusy(id)
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" })
      if (res.ok) router.refresh()
      else alert("Erro ao excluir.")
    } finally {
      setBusy(null)
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/gestao-7k2f9/login")
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-12">Nenhum artigo ainda. Crie o primeiro.</p>
      )}

      {posts.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-4 rounded-xl px-4 py-3"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0"
                style={
                  p.published
                    ? { background: "color-mix(in oklch, #22c55e 15%, var(--background))", color: "#15803d" }
                    : { background: "var(--muted)", color: "var(--muted-foreground)" }
                }
              >
                {p.published ? "Publicado" : "Rascunho"}
              </span>
              <p className="text-sm font-semibold truncate">{p.title}</p>
            </div>
            <p className="text-xs text-muted-foreground truncate">{p.category} · /{p.slug}</p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {p.published && (
              <Link
                href={`/blog/${p.slug}`}
                target="_blank"
                className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Ver no site"
              >
                <ExternalLink className="size-4" />
              </Link>
            )}
            <Link
              href={`/gestao-7k2f9/posts/${p.id}/edit`}
              className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Editar"
            >
              <Pencil className="size-4" />
            </Link>
            <button
              onClick={() => handleDelete(p.id, p.title)}
              disabled={busy === p.id}
              className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-muted transition-colors disabled:opacity-50"
              title="Excluir"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleLogout}
        className="self-start mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <LogOut className="size-3.5" /> Sair
      </button>
    </div>
  )
}
