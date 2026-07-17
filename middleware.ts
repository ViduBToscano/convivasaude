import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth"

const ROTAS_INTERNAS = [
  "/styleguide",
  "/brandguide",
  "/criativos",
  "/planosmidia",
]

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Bloqueia paginas internas em producao
  if (process.env.NODE_ENV === "production") {
    if (ROTAS_INTERNAS.some((p) => path === p || path.startsWith(p + "/"))) {
      return new NextResponse("Not Found", { status: 404 })
    }
  }

  // Protege /gestao-7k2f9 (exceto a propria tela de login)
  if (path.startsWith("/gestao-7k2f9") && path !== "/gestao-7k2f9/login") {
    const ok = await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value)
    if (!ok) {
      const url = req.nextUrl.clone()
      url.pathname = "/gestao-7k2f9/login"
      url.search = ""
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/styleguide/:path*",
    "/brandguide/:path*",
    "/criativos/:path*",
    "/planosmidia/:path*",
    "/gestao-7k2f9/:path*",
  ],
}
