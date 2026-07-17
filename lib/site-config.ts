export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://convivasaude.com.br"
).replace(/\/$/, "")

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5531936182994"

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

export function buildWhatsAppLink(message?: string) {
  if (!message) return WHATSAPP_LINK
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`
}

export async function submitContactLead(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch {
    return false
  }
}
