import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { ArrowUpRight, Close, Github, Mail, Menu } from './Icons'

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/arcade', label: '陈列室' },
  { to: '/notes', label: '笔记' },
  { to: '/about', label: '关于' },
]

function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      className={`relative grid shrink-0 grid-cols-2 gap-[3px] rounded-[11px] bg-ink p-[6px] ${className}`}
      aria-hidden="true"
    >
      <span className="rounded-[3px] bg-accent" />
      <span className="rounded-[3px] bg-paper/85" />
      <span className="rounded-[3px] bg-paper/40" />
      <span className="rounded-[3px] bg-moss" />
    </span>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/80 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-3">
            <BrandMark className="h-9 w-9 transition-transform duration-500 group-hover:-rotate-6" />
            <span className="leading-none">
              <span className="block font-serif text-[17px] font-semibold tracking-tight">
                {site.name}
              </span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.3em] text-muted">
                {site.englishName}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-full px-4 py-2 text-sm transition-colors duration-300',
                    isActive
                      ? 'bg-ink text-paper'
                      : 'text-muted hover:bg-sand/70 hover:text-ink',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-line bg-card/70 px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:border-ink/20 hover:text-ink sm:flex"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card/70 text-ink md:hidden"
              aria-label={open ? '关闭菜单' : '打开菜单'}
              aria-expanded={open}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-line/70 bg-paper/95 md:hidden">
            <nav className="container-page flex flex-col py-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'flex items-center justify-between rounded-2xl px-4 py-3 text-[15px]',
                      isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-sand/70',
                    ].join(' ')
                  }
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-line bg-sand/25">
        <div className="container-page py-14">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <BrandMark className="h-9 w-9" />
                <div>
                  <p className="font-serif text-[17px] font-semibold">{site.name}</p>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-muted">
                    {site.englishName}
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
            </div>

            <div>
              <p className="eyebrow">导航</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">找到我</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
                    >
                      {social.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name} · 用 React + Vite + Tailwind 手写
            </p>
            <p className="flex items-center gap-2">
              <Github className="h-3.5 w-3.5" />
              Hosted on GitHub Pages
              {site.email && (
                <>
                  <span className="text-line">|</span>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-accent"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    写信
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
