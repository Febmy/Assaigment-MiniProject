import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Login() {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(email, password, { remember });
    if (res.ok) navigate("/dashboard");
    else setError(res.message || "Login failed");
  };

  return (
    <main className="relative min-h-[calc(100dvh-56px)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/login-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 min-h-[calc(100dvh-56px)] grid place-items-center px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4"
                />
                Remember me
              </label>
              <span className="text-sm text-gray-500"></span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 font-semibold text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
                {error}
              </div>
            )}
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-gray-500">
            Kosongkan password untuk uji <em>unsuccessful</em>.
          </p>
        </div>
      </div>
    </main>
  );
}
