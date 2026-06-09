const Input = ({
  className = '',
  error,
  id,
  label,
  type = 'text',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`h-11 w-full rounded-md border bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 ${
          error ? 'border-red-400' : 'border-slate-300'
        } ${className}`}
        id={id}
        type={type}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default Input
