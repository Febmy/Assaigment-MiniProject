import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Register() {
  const { register, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol");
  const [confirm, setConfirm] = useState("pistol");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm)
      return setError("Password dan konfirmasi tidak sama.");
    const res = await register(email, password);
    if (res.ok) navigate("/dashboard");
    else setError(res.message || "Register failed");
  };

  return (
    <main className="relative min-h-[calc(100dvh-56px)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/register-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 min-h-[calc(100dvh-56px)] grid place-items-center px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Konfirmasi Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 font-semibold text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
                {error}
              </div>
            )}
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
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
