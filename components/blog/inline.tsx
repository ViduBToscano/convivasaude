import React from "react"

// So permite esquemas seguros. Bloqueia javascript:, data: etc.
function sanitizeUrl(url: string): string {
  const u = url.trim()
  if (
    /^https?:\/\//i.test(u) ||
    /^mailto:/i.test(u) ||
    u.startsWith("/") ||
    u.startsWith("#")
  ) {
    return u
  }
  return "#"
}

// Renderiza formatacao inline do markdown:
//   **negrito**  *italico*  [texto](url)
// Nao aninha de proposito, pra manter simples.
export function renderInline(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))

    if (m[1] !== undefined && m[2] !== undefined) {
      const href = sanitizeUrl(m[2])
      const external = /^https?:\/\//i.test(href)
      nodes.push(
        <a
          key={key++}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          style={{ color: "var(--primary)", textDecoration: "underline" }}
        >
          {m[1]}
        </a>,
      )
    } else if (m[3] !== undefined) {
      nodes.push(<strong key={key++}>{m[3]}</strong>)
    } else if (m[4] !== undefined) {
      nodes.push(<em key={key++}>{m[4]}</em>)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))

  return nodes.length === 1 ? nodes[0] : nodes
}
