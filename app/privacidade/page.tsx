import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

const sections = [
  {
    title: "1. Quem somos",
    content: [
      "A Conviva Saúde é uma marca de pacotes de benefícios de saúde voltada para pessoas com 60 anos ou mais, operada em parceria com a Mais60 Saúde, com sede em Belo Horizonte, MG.",
    ],
  },
  {
    title: "2. Quais dados coletamos",
    content: [
      "Coletamos as seguintes informações quando você preenche nossos formulários ou entra em contato conosco:",
    ],
    list: [
      "Nome completo",
      "E-mail",
      "Número de WhatsApp/celular",
      "Faixa etária do beneficiário",
      "Convênio de saúde atual (opcional)",
      "Dados de navegação (cookies)",
    ],
  },
  {
    title: "3. Como usamos seus dados",
    content: [
      "As informações coletadas são utilizadas exclusivamente para as seguintes finalidades:",
    ],
    list: [
      "Entrar em contato para apresentar o pacote Conviva Saúde",
      "Enviar informações sobre saúde do idoso e nossos serviços",
      "Melhorar continuamente nossos serviços e comunicação",
      "Cumprir obrigações legais e regulatórias",
    ],
  },
  {
    title: "4. Base legal (LGPD)",
    content: [
      "O tratamento dos seus dados pessoais é realizado com base no consentimento do titular e no legítimo interesse da Conviva Saúde, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
    ],
  },
  {
    title: "5. Compartilhamento de dados",
    content: [
      "Seus dados são compartilhados apenas com a Mais60 Saúde, nossa parceira operacional, para fins de prestação do serviço contratado. Não vendemos, alugamos ou cedemos seus dados a terceiros para fins comerciais.",
    ],
  },
  {
    title: "6. Seus direitos (LGPD)",
    content: [
      "Como titular de dados, você tem os seguintes direitos garantidos pela LGPD:",
    ],
    list: [
      "Acesso, correção e exclusão dos seus dados pessoais",
      "Revogação do consentimento a qualquer momento",
      "Portabilidade dos dados para outro fornecedor",
      "Informação sobre o uso e compartilhamento dos dados",
    ],
    footer: "Para exercer qualquer um desses direitos, entre em contato pelo e-mail contato@convivasaude.com.br.",
  },
  {
    title: "7. Cookies",
    content: [
      "Utilizamos cookies para melhorar a experiência de navegação no nosso site, analisar o tráfego e personalizar o conteúdo. Você pode desativá-los a qualquer momento nas configurações do seu navegador, embora isso possa afetar algumas funcionalidades.",
    ],
  },
  {
    title: "8. Contato",
    content: [
      "Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, entre em contato:",
      "E-mail: contato@convivasaude.com.br",
    ],
  },
]

export default function PrivacidadePage() {
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
              ["Como funciona", "/como-funciona"],
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
              <Shield className="size-5" style={{ color: "var(--primary)" }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--primary)" }}
              >
                Legal
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Política de Privacidade
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

                {section.footer && (
                  <p
                    className="text-sm leading-relaxed mt-4"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {section.footer}
                  </p>
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
