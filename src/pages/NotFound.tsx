import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-serif text-[6rem] font-semibold leading-none tracking-tight text-ink/10 sm:text-[9rem]">
          404
        </p>
        <h1 className="display-title -mt-4 text-2xl sm:text-3xl">这个展位是空的</h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
          你要找的页面可能被移走了，或者从来没有存在过。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/arcade" className="btn-primary">
            去陈列室看看
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/" className="btn-ghost">
            回到首页
          </Link>
        </div>
      </div>
    </div>
  )
}
