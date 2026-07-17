import { NextResponse } from "next/server"
import { isDataNascimentoValida, isValidEmail } from "@/lib/validators"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MAX_FIELD_LEN = 500
const MAX_PAYLOAD_BYTES = 8 * 1024

// Webhook do n8n do cliente (n8n.convivasaude.com.br). Recebe os leads no
// formato exato da LP +60 (application/x-www-form-urlencoded). Override via env.
const LEAD_WEBHOOK_URL =
  process.env.LEAD_WEBHOOK_URL ??
  "https://n8n.convivasaude.com.br/webhook/Site"

// Webhook do dashboard Lovable (Mais60). Recebe o lead em JSON.
// URL contem secret, por isso fica apenas em env (nunca commitado).
const LOVABLE_WEBHOOK_URL = process.env.LOVABLE_WEBHOOK_URL

const RATE_WINDOW_MS = 60_000
const RATE_LIMIT = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0]!.trim()
  return req.headers.get("x-real-ip") ?? "unknown"
}

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count += 1
  return true
}

function sanitize(v: unknown): string {
  if (typeof v !== "string") return ""
  return v.replace(/[\x00-\x1f\x7f]/g, "").trim().slice(0, MAX_FIELD_LEN)
}


interface ContactPayload {
  nome: string
  telefone: string
  email: string
  dataNascimento: string
  convenio: string
  numeroCarteira: string
  qualConvenio: string
  faixaEtaria: string
  tipo: string
  origem: string
  consentLGPD: boolean
  url: string
  dispositivo: string
  referralSource: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmId: string
  utmTerm: string
  utmContent: string
}

function dataConversaoBR(): string {
  // "2026-05-27 01:30:00" no fuso de São Paulo
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Sao_Paulo",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  }).format(new Date()).replace(",", "")
}

function detectDispositivo(ua: string): string {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? "Mobile" : "Desktop"
}

export async function POST(req: Request) {
  const ip = getClientIp(req)
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
  }

  const contentLength = Number(req.headers.get("content-length") ?? "0")
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 })
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 })
  }

  const body = raw as Record<string, unknown>
  const data: ContactPayload = {
    nome: sanitize(body.nome),
    telefone: sanitize(body.telefone),
    email: sanitize(body.email),
    dataNascimento: sanitize(body.dataNascimento),
    convenio: sanitize(body.convenio),
    numeroCarteira: sanitize(body.numeroCarteira),
    qualConvenio: sanitize(body.qualConvenio),
    faixaEtaria: sanitize(body.faixaEtaria),
    tipo: sanitize(body.tipo),
    origem: sanitize(body.origem),
    consentLGPD: body.consentLGPD === true,
    url: sanitize(body.url),
    dispositivo: sanitize(body.dispositivo),
    referralSource: sanitize(body.referralSource),
    utmSource: sanitize(body.utmSource),
    utmMedium: sanitize(body.utmMedium),
    utmCampaign: sanitize(body.utmCampaign),
    utmId: sanitize(body.utmId),
    utmTerm: sanitize(body.utmTerm),
    utmContent: sanitize(body.utmContent),
  }

  if (!data.nome || data.nome.length < 2) {
    return NextResponse.json({ ok: false, error: "nome_required" }, { status: 400 })
  }
  const telefoneDigits = data.telefone.replace(/\D/g, "")
  if (telefoneDigits.length < 10 || telefoneDigits.length > 13) {
    return NextResponse.json({ ok: false, error: "telefone_invalido" }, { status: 400 })
  }
  if (!data.consentLGPD) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 })
  }
  if (!isDataNascimentoValida(data.dataNascimento)) {
    return NextResponse.json({ ok: false, error: "data_nascimento_invalida" }, { status: 400 })
  }
  if (!data.email) {
    return NextResponse.json({ ok: false, error: "email_required" }, { status: 400 })
  }
  if (!isValidEmail(data.email)) {
    return NextResponse.json({ ok: false, error: "email_invalido" }, { status: 400 })
  }

  const userAgent = req.headers.get("user-agent") ?? ""
  const record = { receivedAt: new Date().toISOString(), ip, userAgent, ...data }
  console.log("[contact] novo lead:", JSON.stringify(record))

  // Payload com os nomes do webhook da +60 (entra no branch body.URL do n8n)
  const webhookPayload = {
    Nome: data.nome,
    Telefone: data.telefone,
    E_mail: data.email,
    Data_de_Nascimento: data.dataNascimento,
    Para_quem_voce_deseja_contratar: data.tipo,
    Possui_plano_de_saude: data.convenio,
    qualConvenio: data.qualConvenio,
    carteira: data.numeroCarteira,
    faixaEtaria: data.faixaEtaria,
    Politicas_de_privacidade: data.consentLGPD,
    Referral_Source: data.referralSource || "Acesso direto",
    Dispositivo: data.dispositivo || detectDispositivo(userAgent),
    URL: data.url || data.origem,
    IP_do_usuario: ip,
    Data_da_conversao: dataConversaoBR(),
    Id_do_formulario: `conviva-site-${Date.now()}`,
    Pais_do_usuario: "",
    Regiao_do_usuario: "",
    Cidade_do_usuario: "",
    UTM_Source: data.utmSource,
    UTM_Medium: data.utmMedium,
    UTM_Campaign: data.utmCampaign,
    UTM_Id: data.utmId,
    UTM_Term: data.utmTerm,
    UTM_Content: data.utmContent,
  }

  // Entrega ao webhook da +60 no formato exato do body da LP
  // (application/x-www-form-urlencoded, mesmas chaves e mesmo formato).
  const plus60Body = new URLSearchParams({
    Nome: data.nome,
    Telefone: data.telefone,
    E_mail: data.email,
    Data_de_Nascimento: data.dataNascimento,
    Para_quem_voce_deseja_contratar: JSON.stringify({ "0": data.tipo }),
    Possui_plano_de_saude: JSON.stringify({ "0": data.convenio }),
    Politicas_de_privacidade: String(data.consentLGPD),
    Referral_Source: data.referralSource || "Acesso direto",
    Dispositivo: data.dispositivo || detectDispositivo(userAgent),
    URL: data.url || data.origem,
    IP_do_usuario: ip,
    Data_da_conversao: dataConversaoBR(),
    Id_do_formulario: `conviva-site-${Date.now()}`,
    Pais_do_usuario: "",
    Regiao_do_usuario: "",
    Cidade_do_usuario: "",
    UTM_Source: data.utmSource,
    UTM_Medium: data.utmMedium,
    UTM_Campaign: data.utmCampaign,
    UTM_Id: data.utmId,
    UTM_Term: data.utmTerm,
    UTM_Content: data.utmContent,
  })

  // Entrega aos webhooks SEM bloquear a resposta. O servidor roda persistente
  // (next start), entao as promises completam apos o return. Timeout alto cobre
  // cold start de funcoes serverless (ex: Lovable leva ~11s na primeira chamada).
  const WEBHOOK_TIMEOUT = 15000

  // 1. n8n +60 (form-urlencoded, formato exato da LP)
  fetch(LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: plus60Body.toString(),
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT),
  })
    .then((res) => { if (!res.ok) console.error("[contact] webhook +60 respondeu", res.status) })
    .catch((err) => console.error("[contact] webhook +60 falhou:", err))

  // 2. Dashboard Lovable (JSON, mesmas chaves da +60)
  if (LOVABLE_WEBHOOK_URL) {
    fetch(LOVABLE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT),
    })
      .then((res) => { if (!res.ok) console.error("[contact] webhook Lovable respondeu", res.status) })
      .catch((err) => console.error("[contact] webhook Lovable falhou:", err))
  }

  // 3. Webhook JSON legado (opcional, dispara apenas se CONTACT_WEBHOOK_URL setado)
  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT),
    })
      .then((res) => { if (!res.ok) console.error("[contact] webhook respondeu", res.status) })
      .catch((err) => console.error("[contact] webhook falhou:", err))
  }

  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 })
}
