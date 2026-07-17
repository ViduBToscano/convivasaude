import { NextResponse } from "next/server"
import { isAuthedRequest } from "@/lib/admin-guard"
import path from "node:path"
import fs from "node:fs"
import crypto from "node:crypto"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MAX_BYTES = 50 * 1024 * 1024 // 50MB (cobre fotos 4K/8K de alta qualidade)
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"])

function extFromName(name: string): string {
  return name.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1] ?? ""
}

// Resolve a extensao pela MIME ou, quando vazia (Safari faz isso),
// pelo nome do arquivo. Detecta HEIC/HEIF (foto padrao do Mac/iPhone).
function resolveImageExt(file: File): { ext?: string; error?: string } {
  const byType = EXT_BY_TYPE[file.type]
  if (byType) return { ext: byType }

  const type = file.type.toLowerCase()
  const nameExt = extFromName(file.name)

  if (type.includes("heic") || type.includes("heif") || nameExt === "heic" || nameExt === "heif") {
    return { error: "heic_nao_suportado" }
  }
  if (ALLOWED_EXT.has(nameExt)) {
    return { ext: nameExt === "jpeg" ? "jpg" : nameExt }
  }
  return { error: "tipo_invalido" }
}

function uploadDir(): string {
  const dir =
    process.env.BLOG_UPLOAD_DIR ?? path.join(process.cwd(), "data", "uploads")
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function save(buf: Buffer, ext: string): string {
  const name = `${crypto.randomUUID()}.${ext}`
  fs.writeFileSync(path.join(uploadDir(), name), buf)
  return `/api/img/${name}`
}

// Bloqueia hosts internos (SSRF basico). Rota e admin-only, mas evita o obvio.
function isBlockedHost(host: string): boolean {
  const h = host.toLowerCase()
  return (
    h === "localhost" ||
    h === "0.0.0.0" ||
    h === "::1" ||
    h.startsWith("127.") ||
    h.startsWith("10.") ||
    h.startsWith("192.168.") ||
    h.startsWith("169.254.") ||
    /^172\.(1[6-9]|2[0-9]|3[01])\./.test(h)
  )
}

// Importa imagem a partir de um link externo: baixa no servidor e guarda local.
async function importFromUrl(rawUrl: string) {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return { error: "url_invalida" as const }
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { error: "url_invalida" as const }
  }
  if (isBlockedHost(url.hostname)) {
    return { error: "url_invalida" as const }
  }

  let res: Response
  try {
    res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "ConvivaSaudeBot/1.0", Accept: "image/*" },
      signal: AbortSignal.timeout(10_000),
    })
  } catch {
    return { error: "url_inacessivel" as const }
  }
  if (!res.ok) return { error: "url_inacessivel" as const }

  const type = (res.headers.get("content-type") ?? "").split(";")[0].trim()
  const ext = EXT_BY_TYPE[type]
  if (!ext) return { error: "url_nao_imagem" as const } // pagina HTML, link da pagina etc.

  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.byteLength > MAX_BYTES) return { error: "muito_grande" as const }
  if (buf.byteLength === 0) return { error: "url_nao_imagem" as const }

  return { url: save(buf, ext) }
}

export async function POST(req: Request) {
  if (!(await isAuthedRequest(req))) {
    return NextResponse.json({ ok: false, error: "nao_autorizado" }, { status: 401 })
  }

  const contentType = req.headers.get("content-type") ?? ""

  // Importar de um link (JSON { url })
  if (contentType.includes("application/json")) {
    let body: { url?: unknown }
    try {
      body = (await req.json()) as { url?: unknown }
    } catch {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
    }
    const rawUrl = typeof body.url === "string" ? body.url.trim() : ""
    if (!rawUrl) {
      return NextResponse.json({ ok: false, error: "url_invalida" }, { status: 400 })
    }
    const out = await importFromUrl(rawUrl)
    if (out.error) {
      return NextResponse.json({ ok: false, error: out.error }, { status: 400 })
    }
    return NextResponse.json({ ok: true, url: out.url })
  }

  // Upload de arquivo (multipart/form-data)
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form" }, { status: 400 })
  }

  const file = form.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "sem_arquivo" }, { status: 400 })
  }

  console.log(`[upload] name="${file.name}" type="${file.type || "(vazio)"}" size=${file.size}`)

  const { ext, error } = resolveImageExt(file)
  if (error || !ext) {
    console.log(`[upload] rejeitado: ${error}`)
    return NextResponse.json({ ok: false, error }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "muito_grande" }, { status: 400 })
  }

  const buf = Buffer.from(await file.arrayBuffer())
  return NextResponse.json({ ok: true, url: save(buf, ext) })
}
