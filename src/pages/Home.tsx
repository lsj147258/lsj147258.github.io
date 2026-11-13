import { Link } from 'react-router-dom'
import GameArt from '../components/GameArt'
import GameCard from '../components/GameCard'
import SectionHeading from '../components/SectionHeading'
import PostRow from '../components/PostRow'
import { ArrowRight, ArrowUpRight, Play, Sparkle } from '../components/Icons'
import { games, playableGames } from '../data/games'
import { posts } from '../lib/posts'
import { site } from '../data/site'

const marqueeItems = [
  'H5 小游戏',
  'Canvas',
  'React + Vite',
  '交互实验',
  '像素美术',
  '免安装',
  '即点即玩',
  '手写代码',
]

const stats = [
  { value: String(playableGames.length).padStart(2, '0'), label: '可玩游戏' },
  { value: String(posts.length).padStart(2, '0'), label: '篇开发笔记' },
  { value: '100%', label: '手写代码' },
]

export default function Home() {
  const featured = [
    ...playableGames,
    ...games.filter((game) => game.status === 'soon').slice(0, 1),
  ]
  const latestPosts = posts.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="container-page pb-16 pt-14 sm:pt-20 lg:pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss" />
              <span className="text-[11px] font-medium tracking-wide text-muted">
                个人陈列室 · 持续更新中
              </span>
            </div>

            <h1 className="display-title mt-7 text-[2.6rem] sm:text-6xl lg:text-[4.1rem]">
              把想法做成，
              <br />
              <span className="relative inline-block text-accent">
                可以玩
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-accent/35"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8c40-6 90-7 196-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              的东西。
            </h1>

            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted">
              {site.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/arcade" className="btn-primary">
                <Play className="h-3.5 w-3.5" />
                进入陈列室
              </Link>
              <Link to="/notes" className="btn-ghost">
                读几篇笔记
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl font-semibold tracking-tight text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] tracking-wide text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 橱窗视觉 */}
          <div className="relative mx-auto w-full max-w-md pb-12 lg:max-w-none lg:pb-0">
            <div
              className="absolute -inset-6 rounded-[3rem] bg-sand/70 blur-2xl sm:-inset-10"
              aria-hidden="true"
            />

            <div className="relative rotate-[-2deg] rounded-[1.75rem] border border-line bg-card p-3 shadow-lift transition-transform duration-700 hover:rotate-0">
              <div className="overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#E9F5EE] via-[#D8EFE1] to-[#BCE3D1]">
                <div className="aspect-[4/3]">
                  <GameArt theme="snake" />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-3">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-muted">
                    Snake
                  </p>
                  <p className="font-serif text-lg font-semibold">贪吃蛇</p>
                </div>
                <span className="chip border-moss/25 bg-moss/10 text-moss">可游玩</span>
              </div>
            </div>

            <div className="absolute -bottom-2 -left-3 w-40 rotate-[6deg] rounded-2xl border border-line bg-card p-2.5 shadow-lift transition-transform duration-700 hover:rotate-0 sm:-left-8 sm:w-48">
              <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[#FFF5E8] via-[#FFE7CB] to-[#FFD3A8]">
                <div className="aspect-[4/3]">
                  <GameArt theme="merge" />
                </div>
              </div>
              <p className="px-1.5 pb-1 pt-2 text-[11px] font-medium text-ink">2048 · 益智</p>
            </div>

            <div className="absolute -top-4 right-2 rotate-[4deg] rounded-full border border-line bg-paper px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink shadow-soft sm:right-6">
              H5 · 免安装
            </div>

            <div className="absolute -right-1 top-1/2 hidden h-16 w-16 items-center justify-center rounded-full border border-line bg-card text-accent shadow-soft sm:flex">
              <Sparkle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      {/* 跑马灯 */}
      <div className="overflow-hidden border-y border-line bg-sand/30 py-3.5">
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center">
              {marqueeItems.map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="flex items-center gap-8 px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-muted"
                >
                  {item}
                  <Sparkle className="h-3 w-3 shrink-0 text-accent/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 精选游戏 */}
      <section className="container-page pt-20">
        <SectionHeading
          eyebrow="Arcade · 陈列室"
          title="最近摆在架子上的"
          description="都是可以直接在浏览器里玩的 H5 小东西，不需要下载，也不需要登录。"
          link={{ to: '/arcade', label: '查看全部展品' }}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* 笔记 */}
      <section className="container-page pt-20">
        <SectionHeading
          eyebrow="Notes · 笔记"
          title="做东西时留下的痕迹"
          description="关于实现细节、踩过的坑，以及一些不太成熟的想法。"
          link={{ to: '/notes', label: '全部笔记' }}
        />
        <div className="mt-8 border-b border-line">
          {latestPosts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pt-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-card px-7 py-14 text-center shadow-soft sm:px-14">
          <div
            className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-moss/10 blur-2xl"
            aria-hidden="true"
          />

          <p className="eyebrow">Say hello</p>
          <h2 className="display-title relative mt-4 text-3xl sm:text-4xl">
            想一起做点可以玩的东西？
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            如果你也在做 H5 游戏、交互实验，或者只是想聊聊某个想法，欢迎来 GitHub 或写信给我。
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              在 GitHub 找到我
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {site.email && (
              <a href={`mailto:${site.email}`} className="btn-ghost">
                写一封邮件
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
