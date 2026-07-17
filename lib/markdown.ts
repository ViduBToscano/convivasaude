import type { ContentBlock } from "./blog-data"

export function slugify(text: string): string {
  return slugifyHeading(text)
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60)
}

// Editor markdown -> ContentBlock[]
// Sintaxe suportada:
//   ## Titulo      -> h2 (gera id pra ancora)
//   ### Subtitulo  -> h3
//   > citacao      -> blockquote
//   - item         -> list (linhas consecutivas agrupam)
//   [cta]          -> bloco CTA
//   linha em branco separa paragrafos
export function markdownToBlocks(md: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const lines = md.replace(/\r\n/g, "\n").split("\n")

  let paragraph: string[] = []
  let listItems: string[] = []

  const flushParagraph = () => {
    if (paragraph.length) {
      const text = paragraph.join(" ").trim()
      if (text) blocks.push({ type: "p", text })
      paragraph = []
    }
  }
  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "list", items: listItems.slice() })
      listItems = []
    }
  }

  for (const raw of lines) {
    const line = raw.trim()

    if (line === "") {
      flushParagraph()
      flushList()
      continue
    }
    if (/^\[cta\]$/i.test(line)) {
      flushParagraph(); flushList()
      blocks.push({ type: "cta" })
      continue
    }
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (img) {
      flushParagraph(); flushList()
      blocks.push({ type: "image", src: img[2].trim(), alt: img[1].trim() })
      continue
    }
    if (line.startsWith("### ")) {
      flushParagraph(); flushList()
      blocks.push({ type: "h3", text: line.slice(4).trim() })
      continue
    }
    if (line.startsWith("## ")) {
      flushParagraph(); flushList()
      const text = line.slice(3).trim()
      blocks.push({ type: "h2", text, id: slugifyHeading(text) })
      continue
    }
    if (line.startsWith("> ")) {
      flushParagraph(); flushList()
      blocks.push({ type: "blockquote", text: line.slice(2).trim() })
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      flushParagraph()
      listItems.push(line.replace(/^[-*]\s+/, "").trim())
      continue
    }
    // paragrafo comum
    flushList()
    paragraph.push(line)
  }

  flushParagraph()
  flushList()
  return blocks
}

// ContentBlock[] -> markdown (pra popular editor ao editar)
export function blocksToMarkdown(blocks: ContentBlock[]): string {
  const parts: string[] = []
  for (const b of blocks) {
    switch (b.type) {
      case "h2": parts.push(`## ${b.text}`); break
      case "h3": parts.push(`### ${b.text}`); break
      case "blockquote": parts.push(`> ${b.text}`); break
      case "list": parts.push(b.items.map((i) => `- ${i}`).join("\n")); break
      case "image": parts.push(`![${b.alt}](${b.src})`); break
      case "cta": parts.push("[cta]"); break
      case "p": parts.push(b.text); break
    }
  }
  return parts.join("\n\n")
}
