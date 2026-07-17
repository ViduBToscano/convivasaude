import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sobre", "/unidades", "/faq", "/blog", "/privacidade", "/termos"],
        disallow: ["/api", "/brandguide", "/styleguide", "/criativos", "/planosmidia", "/contratar"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
