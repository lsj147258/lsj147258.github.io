import { useState } from 'react'
import GameCard from '../components/GameCard'
import { games } from '../data/games'

const filters = ['全部', '街机', '益智'] as const
type Filter = (typeof filters)[number]

export default function Arcade() {
  const [filter, setFilter] = useState<Filter>('全部')

  const visible = games.filter((game) => filter === '全部' || game.category === filter)
  const playableCount = games.filter((game) => game.status === 'playable').length

  return (
    <div className="container-page pb-10 pt-14 sm:pt-20">
      <div className="max-w-2xl animate-rise">
        <p className="eyebrow">Arcade · 陈列室</p>
        <h1 className="display-title mt-4 text-4xl sm:text-5xl">一面可以玩的墙</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          {playableCount} 件展品，全部运行在浏览器里。点开即玩，进度和最高分会存在你自己的设备上。
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={[
                'rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300',
                filter === item
                  ? 'bg-ink text-paper shadow-soft'
                  : 'border border-line bg-card/70 text-muted hover:border-ink/20 hover:text-ink',
              ].join(' ')}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="text-[11px] tracking-wide text-muted">
          共 {visible.length} 个展位
        </span>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-dashed border-line bg-card/50 p-7 sm:p-9">
        <p className="eyebrow">How to add</p>
        <h2 className="mt-3 font-serif text-xl font-semibold">想把自己的游戏摆进来？</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          把游戏的入口文件放到{' '}
          <code className="rounded-md border border-line bg-sand/60 px-1.5 py-0.5 text-[12px] text-accent">
            public/games/你的游戏名/index.html
          </code>
          ，然后在{' '}
          <code className="rounded-md border border-line bg-sand/60 px-1.5 py-0.5 text-[12px] text-accent">
            src/data/games.ts
          </code>{' '}
          里加一条记录，它就会自动出现在这面墙上，并获得一个内嵌游玩页面。
        </p>
      </div>
    </div>
  )
}
