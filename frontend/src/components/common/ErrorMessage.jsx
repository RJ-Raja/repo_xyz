import { AlertCircle } from 'lucide-react'

const ErrorMessage = ({ message = 'Something went wrong' }) => {
  if (!message) {
    return null
  }

  return (
    <div className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
