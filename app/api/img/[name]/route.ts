import { NextResponse } from "next/server"
import path from "node:path"
import fs from "node:fs"

export const runtime = "nodejs"

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
}

function uploadDir(): string {
  return process.env.BLOG_UPLOAD_DIR ?? path.join(process.cwd(), "data", "uploads")
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params

  // Aceita apenas nome simples (UUID + extensao). Bloqueia path traversal.
  if (!/^[a-f0-9-]+\.(jpg|jpeg|png|webp|gif)$/i.test(name)) {
    return new NextResponse("not found", { status: 404 })
  }

  const file = path.join(uploadDir(), name)
  if (!fs.existsSync(file)) {
    return new NextResponse("not found", { status: 404 })
  }

  const ext = name.split(".").pop()!.toLowerCase()
  const buf = fs.readFileSync(file)

  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": MIME_BY_EXT[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
