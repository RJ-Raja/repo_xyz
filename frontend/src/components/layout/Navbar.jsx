import { Link, NavLink } from 'react-router-dom'
import { LayoutDashboard, LogOut } from 'lucide-react'
import Button from '../ui/Button'
import { APP_NAME } from '../../constants/app'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:text-slate-950'
  }`

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link className="text-lg font-semibold text-slate-950" to={ROUTES.HOME}>
          {APP_NAME}
        </Link>

        <div className="flex items-center gap-2">
          <NavLink className={navLinkClass} to={ROUTES.HOME}>
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink className={navLinkClass} to={ROUTES.DASHBOARD}>
              <span className="inline-flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                Dashboard
              </span>
            </NavLink>
          )}
          {isAuthenticated ? (
            <Button onClick={logout} size="sm" variant="secondary">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          ) : (
            <>
              <NavLink className={navLinkClass} to={ROUTES.LOGIN}>
                Login
              </NavLink>
              <Link to={ROUTES.REGISTER}>
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
