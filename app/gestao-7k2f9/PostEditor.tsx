"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bold, Italic, List, Heading2, Heading3, Quote, MousePointerClick, Upload, Link2, Image as ImageIcon } from "lucide-react"
import { markdownToBlocks } from "@/lib/markdown"
import { renderInline } from "@/components/blog/inline"
import type { ContentBlock } from "@/lib/blog-data"

const CATEGORIES = [
  "Saúde Preventiva",
  "Nutrição",
  "Saúde Mental",
  "Medicamentos",
  "Família",
  "Exercícios",
]

export interface EditorInitial {
  id?: number
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  image: string
  imageAlt: string
  contentMd: string
  published: boolean
  publishedAt: string
}

const EMPTY: EditorInitial = {
  slug: "", title: "", excerpt: "", category: CATEGORIES[0],
  readTime: "", image: "", imageAlt: "", contentMd: "",
  published: false, publishedAt: "",
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"

export default function PostEditor({ initial }: { initial?: EditorInitial }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<EditorInitial>(initial ?? EMPTY)
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [bodyUploading, setBodyUploading] = useState(false)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const bodyFileRef = useRef<HTMLInputElement>(null)

  function set<K extends keyof EditorInitial>(key: K, val: EditorInitial[K]) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  // ── Barra de formatacao: manipula a selecao do textarea ──────────────
  function restoreSelection(start: number, end: number) {
    requestAnimationFrame(() => {
      const ta = taRef.current
      if (!ta) return
      ta.focus()
      ta.setSelectionRange(start, end)
    })
  }

  // Envolve a selecao com marcadores (negrito/italico).
  function wrap(marker: string) {
    const ta = taRef.current
    if (!ta) return
    const { selectionStart: s, selectionEnd: e, value } = ta
    const sel = value.slice(s, e) || "texto"
    const next = value.slice(0, s) + marker + sel + marker + value.slice(e)
    set("contentMd", next)
    restoreSelection(s + marker.length, s + marker.length + sel.length)
  }

  // Adiciona prefixo no inicio da linha atual (titulos, lista, citacao).
  function prefixLine(prefix: string) {
    const ta = taRef.current
    if (!ta) return
    const { selectionStart: s, value } = ta
    const lineStart = value.lastIndexOf("\n", s - 1) + 1
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart)
    set("contentMd", next)
    restoreSelection(s + prefix.length, s + prefix.length)
  }

  // Insere um bloco isolado (CTA) com linhas em branco em volta.
  function insertBlock(text: string) {
    const ta = taRef.current
    if (!ta) return
    const { selectionStart: s, value } = ta
    const before = s > 0 && value[s - 1] !== "\n" ? "\n\n" : ""
    const chunk = `${before}${text}\n\n`
    const next = value.slice(0, s) + chunk + value.slice(s)
    set("contentMd", next)
    const pos = s + chunk.length
    restoreSelection(pos, pos)
  }

  // Insere link [texto](url) e deixa a palavra "url" selecionada pra digitar.
  function linkAction() {
    const ta = taRef.current
    if (!ta) return
    const { selectionStart: s, selectionEnd: e, value } = ta
    const sel = value.slice(s, e) || "texto"
    const insert = `[${sel}](url)`
    set("contentMd", value.slice(0, s) + insert + value.slice(e))
    const urlStart = s + sel.length + 3 // depois de "[sel]("
    restoreSelection(urlStart, urlStart + 3)
  }

  // Insere imagem no corpo do texto a partir de um upload, no cursor atual.
  function insertImageMd(url: string) {
    const ta = taRef.current
    const md = `![imagem](${url})`
    if (!ta) {
      set("contentMd", `${form.contentMd}\n\n${md}\n`)
      return
    }
    const { selectionStart: s, value } = ta
    const before = s > 0 && value[s - 1] !== "\n" ? "\n\n" : ""
    const chunk = `${before}${md}\n\n`
    set("contentMd", value.slice(0, s) + chunk + value.slice(s))
    const pos = s + chunk.length
    restoreSelection(pos, pos)
  }

  // Atalhos de teclado + lista que continua sozinha no Enter.
  function onKeyDown(ev: React.KeyboardEvent<HTMLTextAreaElement>) {
    const mod = ev.metaKey || ev.ctrlKey
    if (mod && (ev.key === "b" || ev.key === "B")) { ev.preventDefault(); wrap("**"); return }
    if (mod && (ev.key === "i" || ev.key === "I")) { ev.preventDefault(); wrap("*"); return }
    if (mod && (ev.key === "k" || ev.key === "K")) { ev.preventDefault(); linkAction(); return }

    if (ev.key === "Enter" && !ev.shiftKey) {
      const { selectionStart: s, selectionEnd: e, value } = ev.currentTarget
      if (s !== e) return
      const lineStart = value.lastIndexOf("\n", s - 1) + 1
      const line = value.slice(lineStart, s)
      const m = line.match(/^([-*])\s+(.*)$/)
      if (!m) return
      ev.preventDefault()
      if (m[2].trim() === "") {
        // Linha de lista vazia: sai da lista (remove o marcador).
        set("contentMd", value.slice(0, lineStart) + value.slice(s))
        restoreSelection(lineStart, lineStart)
      } else {
        const insert = `\n${m[1]} `
        set("contentMd", value.slice(0, s) + insert + value.slice(s))
        restoreSelection(s + insert.length, s + insert.length)
      }
    }
  }

  async function onBodyImage(file: File) {
    setBodyUploading(true)
    setErro("")
    const fd = new FormData()
    fd.append("file", file)
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.url) {
        insertImageMd(data.url)
      } else {
        setErro(traduzErroUpload(data?.error))
      }
    } catch {
      setErro("Falha ao enviar a imagem.")
    } finally {
      setBodyUploading(false)
      if (bodyFileRef.current) bodyFileRef.current.value = ""
    }
  }

  async function onPickImage(file: File) {
    setUploading(true)
    setErro("")
    const fd = new FormData()
    fd.append("file", file)
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.url) {
        set("image", data.url)
      } else {
        setErro(traduzErroUpload(data?.error))
      }
    } catch {
      setErro("Falha ao enviar a imagem.")
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  // Baixa a imagem do link no servidor e guarda local (evita hotlink quebrado).
  async function onImportUrl() {
    const link = form.image.trim()
    if (!link || uploading) return
    if (link.startsWith("/api/img/")) return // ja e local
    setUploading(true)
    setErro("")
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: link }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.url) {
        set("image", data.url)
      } else {
        setErro(traduzErroUpload(data?.error))
      }
    } catch {
      setErro("Falha ao importar a imagem do link.")
    } finally {
      setUploading(false)
    }
  }

  async function save(publishNow?: boolean) {
    if (loading) return
    setLoading(true)
    setErro("")
    const payload = {
      ...form,
      published: publishNow !== undefined ? publishNow : form.published,
    }
    try {
      const url = isEdit ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts"
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        router.push("/gestao-7k2f9")
        router.refresh()
      } else {
        setErro(traduzErro(data?.error))
      }
    } catch {
      setErro("Erro de conexão.")
    } finally {
      setLoading(false)
    }
  }

  const previewBlocks = markdownToBlocks(form.contentMd)

  return (
    <div className="min-h-screen" style={{ background: "var(--muted)" }}>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link href="/gestao-7k2f9" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="size-4" /> Voltar
        </Link>

        <div className="rounded-2xl p-6 md:p-8 flex flex-col gap-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h1 className="text-xl font-bold">{isEdit ? "Editar artigo" : "Novo artigo"}</h1>

          <Field label="Título *">
            <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>

          <Field label="Slug (URL)" hint="Deixe vazio para gerar do título. Ex: como-prevenir-quedas">
            <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="gerado-do-titulo" />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Categoria">
              <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Tempo de leitura" hint="Ex: 5 min">
              <input className={inputCls} value={form.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="5 min" />
            </Field>
          </div>

          <Field label="Resumo (excerpt)">
            <textarea className={inputCls} rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </Field>

          {/* ── Imagem de capa: upload nativo ou link direto ────────────── */}
          <Field label="Imagem de capa" hint="Envie um arquivo do computador (JPG, PNG, WebP ou GIF, até 50MB). Ou cole um link direto de imagem e clique em Importar — a imagem é baixada e guardada no site.">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) onPickImage(f)
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  loading={uploading}
                  className="gap-2"
                >
                  <Upload className="size-4" />
                  {uploading ? "Processando..." : "Enviar imagem"}
                </Button>
                {form.image && !uploading && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.image}
                    alt="Pré-visualização da capa"
                    className="h-14 w-24 rounded-lg object-cover border border-border"
                  />
                )}
              </div>
              <div className="flex gap-2">
                <input
                  className={`${inputCls} flex-1`}
                  value={form.image}
                  onChange={(e) => set("image", e.target.value)}
                  placeholder="https://...  (cole um link direto de imagem)"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={onImportUrl}
                  disabled={uploading || !form.image.trim() || form.image.trim().startsWith("/api/img/")}
                  className="shrink-0"
                >
                  Importar
                </Button>
              </div>
            </div>
          </Field>

          <Field label="Descrição da imagem (alt)" hint="Descreva a imagem para acessibilidade e SEO.">
            <input className={inputCls} value={form.imageAlt} onChange={(e) => set("imageAlt", e.target.value)} />
          </Field>

          <Field label="Data de publicação" hint="Texto livre. Ex: 26 de maio de 2026">
            <input className={inputCls} value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
          </Field>

          {/* ── Conteudo: barra de formatacao + editor + preview ────────── */}
          <Field label="Conteúdo" hint="Selecione o texto e clique nos botões para formatar. Atalhos: Ctrl/Cmd+B negrito, +I itálico, +K link. Linha em branco separa parágrafos.">
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5">
                <ToolbarBtn title="Negrito (Ctrl/Cmd+B)" onClick={() => wrap("**")}><Bold className="size-4" /></ToolbarBtn>
                <ToolbarBtn title="Itálico (Ctrl/Cmd+I)" onClick={() => wrap("*")}><Italic className="size-4" /></ToolbarBtn>
                <ToolbarBtn title="Link (Ctrl/Cmd+K)" onClick={linkAction}><Link2 className="size-4" /></ToolbarBtn>
                <span className="mx-1 h-5 w-px bg-border" />
                <ToolbarBtn title="Título da seção (H2)" onClick={() => prefixLine("## ")}><Heading2 className="size-4" /></ToolbarBtn>
                <ToolbarBtn title="Subtítulo (H3)" onClick={() => prefixLine("### ")}><Heading3 className="size-4" /></ToolbarBtn>
                <ToolbarBtn title="Item de lista" onClick={() => prefixLine("- ")}><List className="size-4" /></ToolbarBtn>
                <ToolbarBtn title="Citação" onClick={() => prefixLine("> ")}><Quote className="size-4" /></ToolbarBtn>
                <span className="mx-1 h-5 w-px bg-border" />
                <ToolbarBtn title="Inserir imagem no texto" onClick={() => bodyFileRef.current?.click()} disabled={bodyUploading}><ImageIcon className="size-4" /></ToolbarBtn>
                <ToolbarBtn title="Inserir botão de contato (CTA)" onClick={() => insertBlock("[cta]")}><MousePointerClick className="size-4" /></ToolbarBtn>
                <input
                  ref={bodyFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) onBodyImage(f)
                  }}
                />
                {bodyUploading && <span className="ml-1 text-[11px] text-muted-foreground">enviando imagem...</span>}
              </div>

              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                <textarea
                  ref={taRef}
                  className="w-full bg-background px-3.5 py-3 text-xs font-mono leading-relaxed outline-none resize-y min-h-[420px]"
                  value={form.contentMd}
                  onChange={(e) => set("contentMd", e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={"## Introdução\n\nTexto com **negrito**, *itálico* e [um link](https://exemplo.com).\n\n### Subtópico\n\n- item um\n- item dois\n\n[cta]"}
                />
                <div className="bg-card px-4 py-3 overflow-auto min-h-[420px]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Pré-visualização</p>
                  {previewBlocks.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">A pré-visualização aparece aqui conforme você escreve.</p>
                  ) : (
                    <div className="flex flex-col">
                      {previewBlocks.map((b, i) => <PreviewBlock key={i} block={b} />)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Field>

          {erro && <p className="text-sm text-destructive">{erro}</p>}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="button" onClick={() => save(false)} disabled={loading} variant="outline" className="flex-1">
              Salvar rascunho
            </Button>
            <Button type="button" onClick={() => save(true)} disabled={loading} loading={loading} className="flex-1">
              {isEdit ? "Salvar e publicar" : "Publicar"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Status atual: {form.published ? "publicado" : "rascunho"}. &quot;Salvar rascunho&quot; mantém oculto do público.
          </p>
        </div>
      </div>
    </div>
  )
}

function ToolbarBtn({ title, onClick, disabled, children }: { title: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-8 items-center justify-center rounded-lg text-foreground/70 hover:bg-background hover:text-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none"
    >
      {children}
    </button>
  )
}

// Preview compacto: mostra a estrutura e a formatacao inline do artigo.
function PreviewBlock({ block }: { block: ContentBlock }) {
  if (block.type === "h2") {
    return <h2 className="text-lg font-bold tracking-tight mt-4 mb-2 first:mt-0">{renderInline(block.text)}</h2>
  }
  if (block.type === "h3") {
    return <h3 className="text-base font-semibold tracking-tight mt-3 mb-1.5">{renderInline(block.text)}</h3>
  }
  if (block.type === "p") {
    return <p className="text-sm leading-relaxed mb-3 text-foreground/90">{renderInline(block.text)}</p>
  }
  if (block.type === "blockquote") {
    return (
      <blockquote className="my-3 pl-3 border-l-2 border-primary text-sm italic text-muted-foreground">
        {renderInline(block.text)}
      </blockquote>
    )
  }
  if (block.type === "list") {
    return (
      <ul className="my-2 flex flex-col gap-1.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
            <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-primary" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    )
  }
  if (block.type === "image") {
    return (
      <figure className="my-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={block.src}
          alt={block.alt}
          className="w-full max-h-56 rounded-lg object-cover border border-border"
        />
      </figure>
    )
  }
  if (block.type === "cta") {
    return (
      <div className="my-3 rounded-xl px-4 py-3 text-xs font-medium border border-dashed border-primary/40 bg-primary/5 text-primary">
        Botão de contato (CTA) — aparece formatado no artigo.
      </div>
    )
  }
  return null
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-foreground/70">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground leading-snug">{hint}</p>}
    </div>
  )
}

function traduzErro(code?: string): string {
  switch (code) {
    case "titulo_obrigatorio": return "Título é obrigatório."
    case "slug_invalido": return "Slug inválido."
    case "slug_em_uso": return "Já existe um artigo com esse slug. Escolha outro."
    case "nao_autorizado": return "Sessão expirada. Entre novamente."
    default: return "Erro ao salvar. Verifique os campos."
  }
}

function traduzErroUpload(code?: string): string {
  switch (code) {
    case "tipo_invalido": return "Formato não suportado. Use JPG, PNG, WebP ou GIF."
    case "heic_nao_suportado": return "Imagem em HEIC (formato padrão do Mac/iPhone) ainda não é suportada. Converta para JPG ou tire um print da imagem antes de enviar."
    case "muito_grande": return "Imagem muito grande. O limite é 50MB."
    case "sem_arquivo": return "Nenhum arquivo selecionado."
    case "url_invalida": return "Link inválido. Cole um endereço http(s) de imagem."
    case "url_inacessivel": return "Não foi possível acessar o link."
    case "url_nao_imagem": return "Esse link não é uma imagem direta (parece ser uma página). Abra a imagem, copie o endereço direto dela, ou use Enviar imagem."
    case "nao_autorizado": return "Sessão expirada. Entre novamente."
    default: return "Falha ao enviar a imagem."
  }
}
