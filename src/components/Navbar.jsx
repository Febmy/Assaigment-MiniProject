import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuth } from "../context/auth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const pill =
    "px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 transition";

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <nav className="h-14 px-4 flex items-center justify-between bg-neutral-900/90 text-white">
      <Link to="/" className="font-semibold">
        MyWeb
      </Link>
      <div className="flex items-center gap-2">
        <NavLink to="/users" className={pill}>
          Users
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard" className={pill}>
              Dashboard
            </NavLink>
            <button onClick={handleLogout} className={pill}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={pill}>
              Login
            </NavLink>
            <NavLink to="/register" className={pill}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
