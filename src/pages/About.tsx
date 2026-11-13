import { site } from '../data/site'
import { ArrowUpRight, Github, Mail, Sparkle } from '../components/Icons'

const stack = [
  { label: 'React 18', note: '页面与组件' },
  { label: 'Vite 4', note: '开发与构建' },
  { label: 'Tailwind CSS', note: '样式系统' },
  { label: 'Markdown', note: '笔记内容' },
  { label: 'GitHub Pages', note: '静态托管' },
]

export default function About() {
  return (
    <div className="container-page pb-10 pt-14 sm:pt-20">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* 名片 */}
        <div className="animate-rise">
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-card p-4 shadow-soft">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#F2EBDC] via-[#EAEFE7] to-[#D9E9E1]">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(22,24,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(22,24,28,0.05) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative grid place-items-center">
                  <span className="absolute h-44 w-44 rounded-full border border-ink/10" />
                  <span className="absolute h-60 w-60 rounded-full border border-ink/10" />
                  <span className="grid h-24 w-24 place-items-center rounded-[1.6rem] bg-ink text-4xl font-serif text-paper shadow-lift">
                    {site.author.slice(0, 1)}
                  </span>
                </div>
              </div>
              <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-paper/85 px-2.5 py-1 text-[10px] font-medium tracking-wide text-moss backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                在线
              </span>
            </div>

            <div className="px-3 pb-2 pt-5">
              <p className="font-serif text-xl font-semibold">{site.author}</p>
              <p className="mt-1 text-xs text-muted">{site.role}</p>
              <p className="mt-3 text-[11px] tracking-wide text-muted">{site.location}</p>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost flex-1"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            {site.email && (
              <a href={`mailto:${site.email}`} className="btn-primary flex-1">
                <Mail className="h-4 w-4" />
                写信
              </a>
            )}
          </div>
        </div>

        {/* 介绍 */}
        <div>
          <p className="eyebrow">About · 关于</p>
          <h1 className="display-title mt-4 text-4xl sm:text-5xl">
            你好，我是<span className="text-accent">{site.author}</span>。
          </h1>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            {site.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <p className="eyebrow">熟悉的工具</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-medium text-ink"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-card p-6 shadow-soft sm:p-7">
            <div className="flex items-center gap-2.5">
              <Sparkle className="h-4 w-4 text-accent" />
              <p className="font-serif text-lg font-semibold">这个站是怎么做的</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              没有使用现成的博客模板。布局、组件、两个小游戏都是手写的，构建后是纯静态文件，
              直接托管在 GitHub Pages 上，没有任何服务器成本。
            </p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {stack.map((item) => (
                <li
                  key={item.label}
                  className="flex items-baseline justify-between gap-3 border-t border-line pt-2.5 text-sm"
                >
                  <span className="font-medium text-ink">{item.label}</span>
                  <span className="text-[11px] text-muted">{item.note}</span>
                </li>
              ))}
            </ul>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="arrow-link mt-6 inline-flex"
            >
              查看源码
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
