import { Link } from 'react-router-dom'
import { formatDate, type Post } from '../lib/posts'
import { ArrowUpRight } from './Icons'

export default function PostRow({ post }: { post: Post }) {
  return (
    <Link
      to={`/notes/${post.slug}`}
      className="group grid gap-3 border-t border-line py-7 transition-colors sm:grid-cols-[8.5rem_1fr_auto] sm:gap-6"
    >
      <div className="flex items-baseline gap-2 text-xs text-muted sm:flex-col sm:gap-1">
        <span>{formatDate(post.date)}</span>
        <span className="text-[11px] text-muted/70">约 {post.minutes} 分钟</span>
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{post.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <span className="hidden h-9 w-9 shrink-0 place-items-center self-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper sm:grid">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  )
}
