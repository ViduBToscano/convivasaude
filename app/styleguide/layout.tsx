"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "./navigation"

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed */}
      <aside className="w-64 border-r bg-card p-6 flex flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto">
        <div>
          <Link href="/styleguide" className="block">
            <img src="/logo.svg" alt="Conviva Saúde" className="h-24 w-auto" />
          </Link>
          <p className="text-xs text-muted-foreground mt-2">Sistema de Design</p>
        </div>

        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground/70 hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {section.items.length === 0 && (
                  <li className="px-3 py-2 text-xs text-muted-foreground italic">
                    Nenhum item ainda
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content - offset by sidebar width */}
      <main className="flex-1 ml-64 overflow-auto">
        {children}
      </main>
    </div>
  )
}
