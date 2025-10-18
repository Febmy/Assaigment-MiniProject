import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuth } from "../context/auth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);
  const pill =
    "px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 transition";

  return (
    <nav className="h-14 px-4 flex items-center justify-between bg-neutral-900/90 text-white">
      <Link to="/" className="font-semibold">
        MyWeb
      </Link>
      <div className="flex items-center gap-2">
        {!isAuthenticated ? (
          <>
            <NavLink to="/login" className={pill}>
              Login
            </NavLink>
            <NavLink to="/register" className={pill}>
              Register
            </NavLink>
          </>
        ) : (
          <button onClick={handleLogout} className={pill}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
