import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getGame } from '../data/games'
import NotFound from './NotFound'
import { ArrowLeft, ArrowUpRight, Play } from '../components/Icons'

export default function PlayPage() {
  const { slug } = useParams()
  const game = getGame(slug)
  const stageRef = useRef<HTMLDivElement>(null)

  if (!game) return <NotFound />

  const src = `${import.meta.env.BASE_URL}games/${game.slug}/index.html`

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
      return
    }
    void stageRef.current?.requestFullscreen?.()
  }

  return (
    <div className="container-page pb-10 pt-10">
      <Link
        to="/arcade"
        className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        返回陈列室
      </Link>

      <header className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{game.english}</p>
          <h1 className="display-title mt-3 text-4xl sm:text-5xl">{game.title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{game.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
            <span className="chip border-moss/25 bg-moss/10 text-moss">可游玩</span>
          </div>
        </div>

        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost shrink-0"
        >
          <ArrowUpRight className="h-4 w-4" />
          在新标签打开
        </a>
      </header>

      <div className="mt-8 rounded-[2rem] border border-line bg-card p-2.5 shadow-soft sm:p-3">
        <div className="flex items-center justify-between gap-3 px-2 pb-2.5 sm:px-3">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-sand" />
              <span className="h-2.5 w-2.5 rounded-full bg-moss/50" />
            </span>
            <span className="ml-2 text-[11px] tracking-wide text-muted">
              /games/{game.slug}
            </span>
          </div>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[11px] font-medium text-muted transition-colors hover:border-ink/20 hover:text-ink"
          >
            <Play className="h-2.5 w-2.5" />
            全屏
          </button>
        </div>

        <div
          ref={stageRef}
          className="overflow-hidden rounded-[1.4rem] border border-line bg-white"
        >
          <iframe
            src={src}
            title={`${game.title} · 在线游玩`}
            className="block h-[68vh] min-h-[460px] w-full bg-white"
            allow="fullscreen"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-[1.35fr_1fr]">
        <div className="card p-6 sm:p-7">
          <p className="eyebrow">About</p>
          <h2 className="mt-3 font-serif text-xl font-semibold">关于这件展品</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {game.description} 所有逻辑都在浏览器端运行，没有任何后端请求，你的游戏记录只保存在本机。
          </p>
        </div>

        <div className="card p-6 sm:p-7">
          <p className="eyebrow">Controls</p>
          <h2 className="mt-3 font-serif text-xl font-semibold">怎么玩</h2>
          <ul className="mt-3 space-y-2">
            {game.controls.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
