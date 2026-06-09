import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { ROUTES } from '../constants/routes'

const features = [
  {
    icon: ShieldCheck,
    title: 'Protected workflows',
    description: 'Authenticated routes and token-aware API requests are ready to extend.',
  },
  {
    icon: Zap,
    title: 'Fast foundation',
    description: 'Vite, React 19, Tailwind CSS, and modular folders keep iteration quick.',
  },
  {
    icon: Sparkles,
    title: 'Polished UX',
    description: 'Reusable components, loading states, errors, forms, toasts, and motion.',
  },
]

const Home = () => {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Production-ready starter
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              A clean React frontend foundation built for real products.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Routing, auth structure, API services, shared UI, form handling, loading, and
              error states are already organized into scalable project boundaries.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={ROUTES.DASHBOARD}>
              <Button>
                Open dashboard
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="secondary">Sign in</Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
                key={feature.title}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-base font-semibold text-slate-950">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Home
