import { formatDate } from '../utils/formatDate'
import { useAuth } from '../hooks/useAuth'

const stats = [
  { label: 'Active projects', value: '12' },
  { label: 'Open tasks', value: '48' },
  { label: 'Health score', value: '98%' },
]

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm text-slate-500">{formatDate(new Date())}</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          Welcome, {user?.name || 'User'}
        </h1>
        <p className="mt-2 text-slate-600">
          This protected dashboard is ready for real API-backed data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" key={stat.label}>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">API service layer</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Use the configured Axios client in <code>src/services/apiClient.js</code> and add
          resource-specific modules beside it as the backend grows.
        </p>
      </div>
    </section>
  )
}

export default Dashboard
