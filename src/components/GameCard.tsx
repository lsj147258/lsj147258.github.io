import { Link } from 'react-router-dom'
import type { Game } from '../data/games'
import GameArt from './GameArt'
import { ArrowUpRight, Play } from './Icons'

const themes: Record<Game['theme'], string> = {
  snake: 'from-[#E9F5EE] via-[#D8EFE1] to-[#BCE3D1]',
  merge: 'from-[#FFF5E8] via-[#FFE7CB] to-[#FFD3A8]',
  fish: 'from-[#E9F5FA] via-[#D8EDF6] to-[#BFE3F0]',
  breakout: 'from-[#F3F1FB] via-[#E5E9FA] to-[#D1DCF5]',
}

export default function GameCard({ game }: { game: Game }) {
  if (game.status === 'soon') {
    return (
      <div className="flex flex-col overflow-hidden rounded-3xl border border-dashed border-line bg-card/40">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(240,234,217,0.5),rgba(251,250,246,0.2))]">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(rgba(22,24,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(22,24,28,0.05) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <span className="relative grid h-14 w-14 place-items-center rounded-full border border-line bg-paper/80 text-2xl font-light text-muted">
            +
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="eyebrow">{game.english}</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold">{game.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{game.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span key={tag} className="chip border-dashed">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={`/play/${game.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-lift"
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${themes[game.theme]}`}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <GameArt theme={game.theme} />
        </div>

        <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur">
          {game.year}
        </span>

        <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-3 items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper opacity-0 shadow-lift transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <Play className="h-3 w-3" />
          开始游戏
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow">{game.english}</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight">
              {game.title}
            </h3>
          </div>
          <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">{game.description}</p>

        <div className="mt-5 flex flex-wrap gap-2 pt-1">
          {game.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
