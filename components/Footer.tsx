import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center mb-3">
              <img src="/logo.svg" alt="Conviva Saúde" width={140} height={66} className="h-14 w-auto" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Programa de cuidado contínuo para idosos, com médico de referência, equipe multidisciplinar e Pronto Cuidar, o pronto atendimento para o idoso.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[
                { href: "https://www.instagram.com/convivasaude/", label: "Instagram", icon: <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Empresa</p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Sobre nós", href: "/sobre" },
                // { label: "Como funciona", href: "/como-funciona" },
                { label: "Nossas unidades", href: "/unidades" },
                { label: "Blog de saúde", href: "/blog" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Suporte</p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Central de ajuda", href: "/faq" },
                { label: "Política de privacidade", href: "/privacidade" },
                { label: "Termos de uso", href: "/termos" },
                { label: "Contato", href: "/#contato" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 Conviva Saúde. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <Badge variant="outline" className="text-[10px] gap-1">
              <Shield className="size-3" /> Dados protegidos · LGPD
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  )
}
