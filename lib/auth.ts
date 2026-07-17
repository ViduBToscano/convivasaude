// Auth simples por senha unica. Sessao = cookie assinado com HMAC-SHA256.
// Usa Web Crypto (funciona em middleware e route handlers).

export const ADMIN_COOKIE = "conviva_admin"
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 dias

function getSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null
}

function b64urlEncode(bytes: Uint8Array): string {
  let bin = ""
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function b64urlToBytes(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4))
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

async function hmac(data: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data))
  return new Uint8Array(sig)
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || ""
  if (!expected) return false
  return constantTimeEqual(input, expected)
}

export async function createSessionToken(): Promise<string | null> {
  const secret = getSecret()
  if (!secret) return null
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const payload = b64urlEncode(new TextEncoder().encode(JSON.stringify({ exp })))
  const sig = b64urlEncode(await hmac(payload, secret))
  return `${payload}.${sig}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const secret = getSecret()
  if (!secret) return false

  const parts = token.split(".")
  if (parts.length !== 2) return false
  const [payload, sig] = parts

  const expected = b64urlEncode(await hmac(payload, secret))
  if (!constantTimeEqual(sig, expected)) return false

  try {
    const { exp } = JSON.parse(new TextDecoder().decode(b64urlToBytes(payload))) as { exp: number }
    if (typeof exp !== "number" || exp < Math.floor(Date.now() / 1000)) return false
    return true
  } catch {
    return false
  }
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS
