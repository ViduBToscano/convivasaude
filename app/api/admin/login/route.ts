import { NextResponse } from "next/server"
import { checkPassword, createSessionToken, ADMIN_COOKIE, SESSION_MAX_AGE } from "@/lib/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const senha = typeof (body as Record<string, unknown>)?.senha === "string"
    ? (body as { senha: string }).senha
    : ""

  if (!checkPassword(senha)) {
    return NextResponse.json({ ok: false, error: "senha_incorreta" }, { status: 401 })
  }

  const token = await createSessionToken()
  if (!token) {
    return NextResponse.json({ ok: false, error: "sessao_indisponivel" }, { status: 500 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
