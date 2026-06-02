import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();

  const activeLinkStyle = {
    textDecoration: "underline",
    color: "#1D4ED8",
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-blue-700">
          MyApp
        </NavLink>
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="text-gray-600 hover:text-blue-600"
          >
            Home
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="text-gray-600 hover:text-blue-600"
              >
                Dashboard
              </NavLink>
              <Button onClick={logout} size="sm">Logout</Button>
            </>
          ) : (
            <NavLink to="/login">
              <Button size="sm">Login</Button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;