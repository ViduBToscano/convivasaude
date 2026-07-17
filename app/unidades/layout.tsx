import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Unidades | Conviva Saúde em Belo Horizonte e região",
  description: "Atendemos em 6 unidades em BH e região metropolitana: Barro Preto, Santo Agostinho, Santa Efigênia, Pampulha, Betim e Pronto Cuidar nos Funcionários.",
  alternates: { canonical: `${SITE_URL}/unidades` },
  openGraph: {
    title: "Unidades | Conviva Saúde em Belo Horizonte e região",
    description: "Atendemos em 6 unidades em BH e região metropolitana: Barro Preto, Santo Agostinho, Santa Efigênia, Pampulha, Betim e Pronto Cuidar nos Funcionários.",
    url: `${SITE_URL}/unidades`,
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unidades | Conviva Saúde em Belo Horizonte e região",
    description: "Atendemos em 6 unidades em BH e região metropolitana: Barro Preto, Santo Agostinho, Santa Efigênia, Pampulha, Betim e Pronto Cuidar nos Funcionários.",
  },
}

export default function UnidadesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
