import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Dúvidas Frequentes | Conviva Saúde",
  description: "Tire suas dúvidas sobre o pacote Conviva Saúde: o que inclui, quanto custa, como contratar, carência, fidelidade e muito mais.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "Dúvidas Frequentes | Conviva Saúde",
    description: "Tire suas dúvidas sobre o pacote Conviva Saúde: o que inclui, quanto custa, como contratar, carência, fidelidade e muito mais.",
    url: `${SITE_URL}/faq`,
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dúvidas Frequentes | Conviva Saúde",
    description: "Tire suas dúvidas sobre o pacote Conviva Saúde: o que inclui, quanto custa, como contratar, carência, fidelidade e muito mais.",
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
