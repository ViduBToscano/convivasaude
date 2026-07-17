import { NextResponse } from "next/server"
import { isAuthedRequest } from "@/lib/admin-guard"
import { updatePost, deletePost, getPostById, slugExists } from "@/lib/blog-db"
import { parsePostBody, type PostBody } from "@/lib/post-input"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAuthedRequest(req))) {
    return NextResponse.json({ ok: false, error: "nao_autorizado" }, { status: 401 })
  }
  const id = Number((await params).id)
  if (!Number.isInteger(id) || !getPostById(id)) {
    return NextResponse.json({ ok: false, error: "nao_encontrado" }, { status: 404 })
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const { input, error } = parsePostBody(raw as PostBody)
  if (error || !input) {
    return NextResponse.json({ ok: false, error }, { status: 400 })
  }
  if (slugExists(input.slug, id)) {
    return NextResponse.json({ ok: false, error: "slug_em_uso" }, { status: 409 })
  }

  updatePost(id, input)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request, { params }: Ctx) {
  if (!(await isAuthedRequest(req))) {
    return NextResponse.json({ ok: false, error: "nao_autorizado" }, { status: 401 })
  }
  const id = Number((await params).id)
  if (!Number.isInteger(id) || !getPostById(id)) {
    return NextResponse.json({ ok: false, error: "nao_encontrado" }, { status: 404 })
  }
  deletePost(id)
  return NextResponse.json({ ok: true })
}
