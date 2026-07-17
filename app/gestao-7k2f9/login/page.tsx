"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setErro("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      })
      if (res.ok) {
        router.push("/gestao-7k2f9")
        router.refresh()
      } else {
        setErro(res.status === 401 ? "Senha incorreta." : "Erro ao entrar. Tente novamente.")
      }
    } catch {
      setErro("Erro de conexão.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--muted)" }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl p-8 flex flex-col gap-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="size-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <Lock className="size-6 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Painel do Blog</h1>
          <p className="text-xs text-muted-foreground">Acesso restrito à equipe Conviva</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground/70">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoFocus
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
          />
        </div>

        {erro && <p className="text-xs text-destructive">{erro}</p>}

        <Button type="submit" disabled={!senha || loading} loading={loading} className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  )
}
