import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const sections = [
  {
    title: "1. Aceitação dos termos",
    content: [
      "Ao acessar o site convivasaude.com.br e preencher qualquer formulário de contato ou contratação, você declara que leu, entendeu e concorda com estes Termos de Uso. Caso não concorde com alguma condição, recomendamos que não utilize nossos serviços digitais.",
    ],
  },
  {
    title: "2. Sobre o serviço",
    content: [
      "A Conviva Saúde oferece um pacote particular de benefícios de saúde voltado para pessoas com 60 anos ou mais, em parceria com as clínicas Mais60 Saúde em Belo Horizonte e região.",
      "Importante: a Conviva Saúde não é um plano de saúde regulado pela Agência Nacional de Saúde Suplementar (ANS). Trata-se de um pacote de serviços de saúde de natureza particular.",
    ],
  },
  {
    title: "3. Uso do site",
    content: [
      "Ao utilizar este site, você se compromete a:",
    ],
    list: [
      "Não utilizar o site para fins ilegais ou que violem direitos de terceiros",
      "Não tentar acessar áreas restritas ou sistemas internos sem autorização",
      "Fornecer informações verdadeiras e atualizadas ao preencher formulários",
      "Não reproduzir, distribuir ou modificar conteúdo sem autorização prévia",
    ],
  },
  {
    title: "4. Responsabilidades",
    content: [
      "O conteúdo publicado neste site tem caráter exclusivamente informativo. As informações sobre saúde disponibilizadas não substituem a consulta a profissionais de saúde qualificados.",
      "Decisões relacionadas à saúde devem ser sempre tomadas em conjunto com médicos e demais profissionais habilitados. A Conviva Saúde não se responsabiliza por decisões baseadas unicamente nas informações do site.",
    ],
  },
  {
    title: "5. Propriedade intelectual",
    content: [
      "Todo o conteúdo deste site — incluindo textos, imagens, logotipos, identidade visual e demais materiais — é propriedade exclusiva da Conviva Saúde ou de seus licenciantes. É vedada a reprodução total ou parcial sem autorização prévia e expressa.",
    ],
  },
  {
    title: "6. Alterações",
    content: [
      "A Conviva Saúde se reserva o direito de atualizar estes Termos de Uso a qualquer momento, sem aviso prévio. A versão mais recente estará sempre disponível nesta página, com a data da última atualização indicada no topo.",
      "O uso continuado do site após alterações implica a aceitação dos novos termos.",
    ],
  },
  {
    title: "7. Contato",
    content: [
      "Em caso de dúvidas sobre estes Termos de Uso, entre em contato:",
      "E-mail: contato@convivasaude.com.br",
    ],
  },
]

export default function TermosPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.svg" alt="Conviva Saúde" className="h-20 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              ["Sobre nós", "/sobre"],
              // ["Como funciona", "/como-funciona"],
              ["Unidades", "/unidades"],
              ["FAQ", "/faq"],
              ["Blog", "/blog"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/">← Voltar ao site</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/contratar">Contratar agora</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16">

          {/* Page title */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="size-5" style={{ color: "var(--primary)" }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--primary)" }}
              >
                Legal
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Termos de Uso
            </h1>
            <p style={{ color: "var(--muted-foreground)" }} className="text-sm">
              Última atualização: janeiro de 2026
            </p>
          </div>

          {/* Sections */}
          <div className="flex flex-col">
            {sections.map((section, i) => (
              <div
                key={section.title}
                className="py-8"
                style={{ borderBottom: i < sections.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                <h2 className="text-lg font-bold mb-4">{section.title}</h2>

                {section.content.map((p, j) => (
                  <p
                    key={j}
                    className="text-sm leading-relaxed mb-3 last:mb-0"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {p}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        <span
                          className="mt-2 size-1.5 rounded-full shrink-0"
                          style={{ background: "var(--primary)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-3xl px-6 py-6 flex items-center justify-center">
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            © 2026 Conviva Saúde. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  )
}
