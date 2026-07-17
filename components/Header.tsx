"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "A Conviva Saúde", href: "/sobre" },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Preço", href: "/#planos" },
  { label: "Unidades", href: "/unidades" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
] as const

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Checkout flow e admin tem layout proprio
  if (pathname.startsWith("/contratar") || pathname.startsWith("/gestao-7k2f9")) return null

  function handleAnchor(href: string) {
    setMobileOpen(false)
    const id = href.replace("/#", "")
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(href)
    }
  }

  function isActive(href: string): boolean {
    if (href.startsWith("/#")) return false
    return pathname === href
  }

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-shadow duration-200"
        style={scrolled ? { boxShadow: "0 2px 16px color-mix(in oklch, var(--foreground) 8%, transparent)" } : undefined}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.svg"
              alt="Conviva Saúde"
              width={200}
              height={80}
              className="h-10 md:h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) =>
              href.startsWith("/#") ? (
                <button
                  key={href}
                  type="button"
                  onClick={() => handleAnchor(href)}
                  className="cursor-pointer px-3 py-2 text-sm rounded-lg transition-colors hover:bg-muted"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="cursor-pointer px-3 py-2 text-sm rounded-lg transition-colors hover:bg-muted"
                  style={{ color: isActive(href) ? "var(--primary)" : "var(--muted-foreground)" }}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button size="sm" asChild>
              <Link href="/contratar">Contratar agora</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2.5 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-0.5">
              {NAV_LINKS.map(({ label, href }) =>
                href.startsWith("/#") ? (
                  <button
                    key={href}
                    type="button"
                    onClick={() => handleAnchor(href)}
                    className="cursor-pointer w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className="cursor-pointer px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                    style={{ color: isActive(href) ? "var(--primary)" : "var(--muted-foreground)" }}
                  >
                    {label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
                <Button className="w-full" asChild>
                  <Link href="/contratar">Contratar agora</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
