import { NextResponse } from "next/server"
import { isAuthedRequest } from "@/lib/admin-guard"
import { createPost, slugExists } from "@/lib/blog-db"
import { parsePostBody, type PostBody } from "@/lib/post-input"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  if (!(await isAuthedRequest(req))) {
    return NextResponse.json({ ok: false, error: "nao_autorizado" }, { status: 401 })
  }

  let raw: PostBody
  try {
    raw = (await req.json()) as PostBody
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const { input, error } = parsePostBody(raw)
  if (error || !input) {
    return NextResponse.json({ ok: false, error }, { status: 400 })
  }
  if (slugExists(input.slug)) {
    return NextResponse.json({ ok: false, error: "slug_em_uso" }, { status: 409 })
  }

  const { id } = createPost(input)
  return NextResponse.json({ ok: true, id })
}
