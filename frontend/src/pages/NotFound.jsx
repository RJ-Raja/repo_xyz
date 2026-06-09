import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { ROUTES } from '../constants/routes'

const NotFound = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-950">Page not found</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        The page you are looking for does not exist or has moved.
      </p>
      <Link className="mt-6" to={ROUTES.HOME}>
        <Button>Back to home</Button>
      </Link>
    </section>
  )
}

export default NotFound
