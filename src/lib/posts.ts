import MarkdownIt from 'markdown-it'

export type Post = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  body: string
  minutes: number
}

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
})

const files = import.meta.glob('../content/posts/*.md', {
  as: 'raw',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)

  if (!match) {
    return { data: {} as Record<string, string>, body: raw }
  }

  const data: Record<string, string> = {}

  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(':')
    if (index === -1) continue
    const key = line.slice(0, index).trim()
    const value = line
      .slice(index + 1)
      .trim()
      .replace(/^["']|["']$/g, '')
    if (key) data[key] = value
  }

  return { data, body: match[2] }
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, body } = parseFrontmatter(raw)

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      tags: (data.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      body,
      minutes: Math.max(1, Math.round(body.replace(/\s/g, '').length / 420)),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPost(slug: string | undefined) {
  return posts.find((post) => post.slug === slug)
}

export function renderMarkdown(body: string) {
  return md.render(body)
}

export function formatDate(date: string) {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  if (!year) return date
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}
