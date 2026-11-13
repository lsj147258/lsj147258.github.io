import { Link, useParams } from 'react-router-dom'
import { formatDate, getPost, posts, renderMarkdown } from '../lib/posts'
import NotFound from './NotFound'
import { ArrowLeft, ArrowRight } from '../components/Icons'

export default function Note() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <NotFound />

  const index = posts.findIndex((item) => item.slug === post.slug)
  const newer = index > 0 ? posts[index - 1] : undefined
  const older = index < posts.length - 1 ? posts[index + 1] : undefined

  return (
    <div className="container-page pb-10 pt-10 sm:pt-14">
      <Link
        to="/notes"
        className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        返回笔记列表
      </Link>

      <article className="mx-auto mt-8 max-w-3xl">
        <header className="border-b border-line pb-8">
          <div className="flex flex-wrap items-center gap-3 text-[11px] tracking-wide text-muted">
            <span>{formatDate(post.date)}</span>
            <span className="text-line">/</span>
            <span>约 {post.minutes} 分钟读完</span>
          </div>
          <h1 className="display-title mt-5 text-3xl leading-tight sm:text-[2.7rem]">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{post.summary}</p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="article pt-8"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
        />
      </article>

      <div className="mx-auto mt-14 grid max-w-3xl gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {older ? (
          <Link
            to={`/notes/${older.slug}`}
            className="group card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">上一篇 · 更早</p>
            <p className="mt-2 flex items-start justify-between gap-3 font-serif text-[15px] font-semibold leading-snug">
              {older.title}
              <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-x-0.5" />
            </p>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {newer ? (
          <Link
            to={`/notes/${newer.slug}`}
            className="group card p-5 text-right transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">下一篇 · 更新</p>
            <p className="mt-2 flex items-start justify-between gap-3 font-serif text-[15px] font-semibold leading-snug">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
              {newer.title}
            </p>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </div>
  )
}
