import { format } from 'date-fns'

export const formatDate = (date, dateFormat = 'MMM dd, yyyy') => {
  if (!date) {
    return ''
  }

  return format(new Date(date), dateFormat)
}
