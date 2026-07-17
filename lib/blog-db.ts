import Database from "better-sqlite3"
import path from "node:path"
import fs from "node:fs"
import type { BlogPost, ContentBlock } from "./blog-data"
import { BLOG_POSTS } from "./blog-data"
import { blocksToMarkdown } from "./markdown"

export interface PostRow {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  read_time: string
  image: string
  image_alt: string
  content_md: string
  content_json: string
  published: number
  published_at: string
  created_at: string
  updated_at: string
}

export interface AdminPost extends BlogPost {
  id: number
  contentMd: string
  updatedAt: string
}

let db: Database.Database | null = null

function getDb(): Database.Database {
  if (db) return db

  const dbPath =
    process.env.BLOG_DB_PATH ?? path.join(process.cwd(), "data", "blog.db")
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })

  db = new Database(dbPath)
  db.pragma("journal_mode = WAL")
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      slug         TEXT UNIQUE NOT NULL,
      title        TEXT NOT NULL,
      excerpt      TEXT NOT NULL DEFAULT '',
      category     TEXT NOT NULL DEFAULT '',
      read_time    TEXT NOT NULL DEFAULT '',
      image        TEXT NOT NULL DEFAULT '',
      image_alt    TEXT NOT NULL DEFAULT '',
      content_md   TEXT NOT NULL DEFAULT '',
      content_json TEXT NOT NULL DEFAULT '[]',
      published    INTEGER NOT NULL DEFAULT 0,
      published_at TEXT NOT NULL DEFAULT '',
      created_at   TEXT NOT NULL,
      updated_at   TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
    CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
  `)

  seedIfEmpty(db)
  return db
}

function seedIfEmpty(database: Database.Database) {
  const count = (database.prepare("SELECT COUNT(*) AS n FROM posts").get() as { n: number }).n
  if (count > 0) return

  const now = new Date().toISOString()
  const insert = database.prepare(`
    INSERT INTO posts
      (slug, title, excerpt, category, read_time, image, image_alt, content_md, content_json, published, published_at, created_at, updated_at)
    VALUES
      (@slug, @title, @excerpt, @category, @read_time, @image, @image_alt, @content_md, @content_json, @published, @published_at, @created_at, @updated_at)
  `)
  const tx = database.transaction((posts: BlogPost[]) => {
    for (const p of posts) {
      insert.run({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        read_time: p.readTime,
        image: p.image,
        image_alt: p.imageAlt,
        content_md: blocksToMarkdown(p.content),
        content_json: JSON.stringify(p.content),
        published: p.published ? 1 : 0,
        published_at: p.publishedAt,
        created_at: now,
        updated_at: now,
      })
    }
  })
  tx(BLOG_POSTS)
}

function rowToPost(r: PostRow): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    readTime: r.read_time,
    publishedAt: r.published_at,
    published: r.published === 1,
    image: r.image,
    imageAlt: r.image_alt,
    content: JSON.parse(r.content_json) as ContentBlock[],
  }
}

function rowToAdminPost(r: PostRow): AdminPost {
  return { ...rowToPost(r), id: r.id, contentMd: r.content_md, updatedAt: r.updated_at }
}

// ---- Leitura pública ----

export function getPublishedPosts(): BlogPost[] {
  const rows = getDb()
    .prepare("SELECT * FROM posts WHERE published = 1 ORDER BY datetime(created_at) DESC")
    .all() as PostRow[]
  return rows.map(rowToPost)
}

// Listagem pública: publicados primeiro, depois "em breve" (nao publicados).
export function getPostsForListing(): BlogPost[] {
  const rows = getDb()
    .prepare("SELECT * FROM posts ORDER BY published DESC, datetime(created_at) DESC")
    .all() as PostRow[]
  return rows.map(rowToPost)
}

export function getAllPostsAdmin(): AdminPost[] {
  const rows = getDb()
    .prepare("SELECT * FROM posts ORDER BY datetime(updated_at) DESC")
    .all() as PostRow[]
  return rows.map(rowToAdminPost)
}

export function getPostBySlugDb(slug: string): BlogPost | undefined {
  const r = getDb().prepare("SELECT * FROM posts WHERE slug = ?").get(slug) as PostRow | undefined
  return r ? rowToPost(r) : undefined
}

export function getPostById(id: number): AdminPost | undefined {
  const r = getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id) as PostRow | undefined
  return r ? rowToAdminPost(r) : undefined
}

// ---- Escrita (admin) ----

export interface PostInput {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  image: string
  imageAlt: string
  contentMd: string
  contentJson: string
  published: boolean
  publishedAt: string
}

export function createPost(input: PostInput): { id: number } {
  const now = new Date().toISOString()
  const r = getDb().prepare(`
    INSERT INTO posts
      (slug, title, excerpt, category, read_time, image, image_alt, content_md, content_json, published, published_at, created_at, updated_at)
    VALUES
      (@slug, @title, @excerpt, @category, @readTime, @image, @imageAlt, @contentMd, @contentJson, @published, @publishedAt, @now, @now)
  `).run({ ...input, published: input.published ? 1 : 0, now })
  return { id: Number(r.lastInsertRowid) }
}

export function updatePost(id: number, input: PostInput): void {
  const now = new Date().toISOString()
  getDb().prepare(`
    UPDATE posts SET
      slug=@slug, title=@title, excerpt=@excerpt, category=@category, read_time=@readTime,
      image=@image, image_alt=@imageAlt, content_md=@contentMd, content_json=@contentJson,
      published=@published, published_at=@publishedAt, updated_at=@now
    WHERE id=@id
  `).run({ ...input, id, published: input.published ? 1 : 0, now })
}

export function deletePost(id: number): void {
  getDb().prepare("DELETE FROM posts WHERE id = ?").run(id)
}

export function slugExists(slug: string, exceptId?: number): boolean {
  const r = exceptId
    ? getDb().prepare("SELECT 1 FROM posts WHERE slug = ? AND id != ?").get(slug, exceptId)
    : getDb().prepare("SELECT 1 FROM posts WHERE slug = ?").get(slug)
  return !!r
}
