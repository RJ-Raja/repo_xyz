import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/common/ErrorMessage'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'

const VerifyRegisterOtp = () => {
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: location.state?.email || '',
      otp: '',
    },
  })

  const onSubmit = async (values) => {
    setError('')

    try {
      const response = await authService.verifyRegisterOtp(values)
      login(response.user, response.token)
      toast.success(response.message || 'Email verified')
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to verify OTP. Please try again.'
      setError(message)
      toast.error(message)
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-950">Verify email</h1>
          <p className="mt-2 text-sm text-slate-600">Enter the OTP sent to your email.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage message={error} />
          <Input
            error={errors.email?.message}
            id="verify-register-email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          <Input
            error={errors.otp?.message}
            id="register-otp"
            inputMode="numeric"
            label="OTP"
            maxLength={6}
            placeholder="123456"
            {...register('otp', {
              required: 'OTP is required',
              minLength: { value: 6, message: 'OTP must be 6 digits' },
            })}
          />
          <Button className="w-full" isLoading={isSubmitting} type="submit">
            Verify OTP
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Wrong email?{' '}
          <Link className="font-medium text-slate-950 underline" to={ROUTES.REGISTER}>
            Register again
          </Link>
        </p>
      </div>
    </section>
  )
}

export default VerifyRegisterOtp
