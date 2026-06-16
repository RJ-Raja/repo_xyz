import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { formatDate } from '../utils/formatDate'
import { useAuth } from '../hooks/useAuth'

const stats = [
  { label: 'Active projects', value: '12' },
  { label: 'Open tasks', value: '48' },
  { label: 'Health score', value: '98%' },
]

const Dashboard = () => {
  const { refreshProfile, user } = useAuth()
  const [profile, setProfile] = useState(user)
  const [isProfileLoading, setIsProfileLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentUser = await refreshProfile()
        setProfile(currentUser)
      } catch {
        toast.error('Unable to load profile')
      } finally {
        setIsProfileLoading(false)
      }
    }

    loadProfile()
  }, [refreshProfile])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm text-slate-500">{formatDate(new Date())}</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          Welcome, {profile?.name || user?.name || 'User'}
        </h1>
        <p className="mt-2 text-slate-600">
          This dashboard is protected by JWT and loaded from your profile API.
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
        <h2 className="text-lg font-semibold text-slate-950">Profile</h2>
        {isProfileLoading ? (
          <p className="mt-2 text-sm text-slate-600">Loading profile...</p>
        ) : (
          <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-500">Name</dt>
              <dd className="mt-1 text-slate-950">{profile?.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Email</dt>
              <dd className="mt-1 text-slate-950">{profile?.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Email verified</dt>
              <dd className="mt-1 text-slate-950">{profile?.isEmailVerified ? 'Yes' : 'No'}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Joined</dt>
              <dd className="mt-1 text-slate-950">
                {profile?.createdAt ? formatDate(profile.createdAt) : 'Not available'}
              </dd>
            </div>
          </dl>
        )}
      </div>
    </section>
  )
}

export default Dashboard
