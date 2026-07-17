import type { Metadata } from "next";
import { Urbanist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SITE_URL } from "@/lib/site-config";
import Analytics, { GtmNoScript, MetaPixelNoScript } from "@/components/Analytics";
import PageViewTracker from "@/components/PageViewTracker";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cuidado para idosos em BH | Conviva Saúde, R$ 329/mês",
  description: "Cuidado para idosos em BH: a Conviva Saúde oferece médico de referência, equipe multidisciplinar e Pronto Cuidar por R$ 329/mês, sem carência.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Cuidado para idosos em BH | Conviva Saúde, R$ 329/mês",
    description: "Cuidado para idosos em BH: a Conviva Saúde oferece médico de referência, equipe multidisciplinar e Pronto Cuidar por R$ 329/mês, sem carência.",
    url: SITE_URL,
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuidado para idosos em BH | Conviva Saúde, R$ 329/mês",
    description: "Cuidado para idosos em BH: a Conviva Saúde oferece médico de referência, equipe multidisciplinar e Pronto Cuidar por R$ 329/mês, sem carência.",
  },
  verification: {
    google: "ljPJmbuojKMgw6SK8WLd9Zi8F-ixLbATuhJSLYp6UDU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${urbanist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <GtmNoScript />
        <MetaPixelNoScript />
        <Header />
        {children}
        <Analytics />
        <PageViewTracker />
      </body>
    </html>
  );
}
