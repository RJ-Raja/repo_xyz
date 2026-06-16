import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/common/ErrorMessage'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { ROUTES } from '../constants/routes'
import { authService } from '../services/authService'

const Register = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm()

  const onSubmit = async (values) => {
    setError('')

    try {
      const response = await authService.register(values)
      toast.success(response.message || 'OTP sent to email')
      navigate(ROUTES.VERIFY_REGISTER_OTP, { state: { email: response.email || values.email } })
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to create your account. Please try again.'
      setError(message)
      toast.error(message)
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-950">Register</h1>
          <p className="mt-2 text-sm text-slate-600">Create an account to start building.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage message={error} />
          <Input
            error={errors.name?.message}
            id="name"
            label="Name"
            placeholder="Your name"
            {...register('name', { required: 'Name is required' })}
          />
          <Input
            error={errors.email?.message}
            id="register-email"
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
            id="register-password"
            label="Password"
            placeholder="Create a password"
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
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link className="font-medium text-slate-950 underline" to={ROUTES.LOGIN}>
            Login
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
