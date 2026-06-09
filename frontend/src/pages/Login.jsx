import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/common/ErrorMessage'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm()

  const onSubmit = async (values) => {
    setError('')

    try {
      login({ email: values.email, name: 'Demo User' }, 'demo-token')
      toast.success('Welcome back')
      navigate(location.state?.from?.pathname || ROUTES.DASHBOARD, { replace: true })
    } catch {
      setError('Unable to sign in. Please try again.')
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-950">Login</h1>
          <p className="mt-2 text-sm text-slate-600">Access your protected workspace.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage message={error} />
          <Input
            error={errors.email?.message}
            id="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email address',
              },
            })}
          />
          <Input
            error={errors.password?.message}
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          <Button className="w-full" isLoading={isSubmitting} type="submit">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Need an account?{' '}
          <Link className="font-medium text-slate-950 underline" to={ROUTES.REGISTER}>
            Register
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
