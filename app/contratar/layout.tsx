import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contratar | Conviva Saúde, R$ 329/mês",
  description: "Contrate o pacote Conviva Saúde em poucos minutos. Sem carência. Médico de referência e cuidado contínuo para o seu familiar.",
  alternates: { canonical: `${SITE_URL}/contratar` },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Contratar | Conviva Saúde, R$ 329/mês",
    description: "Contrate o pacote Conviva Saúde em poucos minutos. Sem carência. Médico de referência e cuidado contínuo para o seu familiar.",
    url: `${SITE_URL}/contratar`,
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contratar | Conviva Saúde, R$ 329/mês",
    description: "Contrate o pacote Conviva Saúde em poucos minutos. Sem carência. Médico de referência e cuidado contínuo para o seu familiar.",
  },
}

export default function ContratarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
