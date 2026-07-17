// Contexto coletado no navegador para enriquecer o lead (URL, device, UTMs).
export function collectClientContext(): Record<string, string> {
  if (typeof window === "undefined") return {}
  const ua = navigator.userAgent
  const params = new URLSearchParams(window.location.search)
  return {
    url: window.location.href,
    dispositivo: /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? "Mobile" : "Desktop",
    referralSource: document.referrer || "Acesso direto",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmId: params.get("utm_id") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
  }
}
