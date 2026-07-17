import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Como funciona | Conviva Saúde",
  description: "Veja como funciona o Conviva Saúde: do primeiro contato ao cuidado coordenado, com médico de referência, equipe multidisciplinar e Pronto Cuidar. R$ 329/mês.",
  alternates: { canonical: `${SITE_URL}/como-funciona` },
  openGraph: {
    title: "Como funciona | Conviva Saúde",
    description: "Do primeiro contato ao cuidado coordenado. Médico de referência, equipe multidisciplinar e Pronto Cuidar para idosos 60+ em BH.",
    url: `${SITE_URL}/como-funciona`,
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
}

export default function ComoFuncionaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
