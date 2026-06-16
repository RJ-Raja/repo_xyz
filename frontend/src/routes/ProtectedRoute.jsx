import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Loader from '../components/common/Loader'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
import { tokenStorage } from '../utils/tokenStorage'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  const hasToken = Boolean(tokenStorage.getToken())

  if (isLoading) {
    return <Loader label="Checking access..." />
  }

  if (!isAuthenticated && !hasToken) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
