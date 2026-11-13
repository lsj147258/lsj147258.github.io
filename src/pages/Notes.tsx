import { Link } from 'react-router-dom'
import PostRow from '../components/PostRow'
import { posts } from '../lib/posts'

export default function Notes() {
  return (
    <div className="container-page pb-10 pt-14 sm:pt-20">
      <div className="max-w-2xl animate-rise">
        <p className="eyebrow">Notes · 笔记</p>
        <h1 className="display-title mt-4 text-4xl sm:text-5xl">写下来的过程</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          实现细节、踩过的坑、读过的书，还有一些没想清楚但值得记下来的念头。
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between border-b border-line pb-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted">All posts</span>
        <span className="text-[11px] text-muted">{posts.length} 篇</span>
      </div>

      {posts.length > 0 ? (
        <div className="border-b border-line">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-dashed border-line bg-card/50 p-10 text-center">
          <p className="font-serif text-lg font-semibold">还没有笔记</p>
          <p className="mt-2 text-sm text-muted">
            在 <code className="text-accent">src/content/posts/</code> 里新建一个 .md 文件就会出现在这里。
          </p>
        </div>
      )}

      <div className="mt-14">
        <Link to="/" className="arrow-link">
          ← 回到首页
        </Link>
      </div>
    </div>
  )
}
