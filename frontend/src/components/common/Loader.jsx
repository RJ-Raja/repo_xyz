import { Loader2 } from 'lucide-react'

const Loader = ({ label = 'Loading...' }) => {
  return (
    <div className="flex min-h-56 items-center justify-center">
      <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
        <Loader2 className="h-5 w-5 animate-spin text-slate-900" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  )
}

export default Loader
