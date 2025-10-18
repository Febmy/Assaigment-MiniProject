import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100dvh-56px)]">
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
      />
      {/* Overlay ringan biar kontras */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/30" />

      {/* Glass card */}
      <div className="relative z-10 min-h-[calc(100dvh-56px)] grid place-items-center px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl p-8 md:p-12 border border-white/30">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow">
            Selamat Datang <br /> Sobat Dibimbing
          </h1>
          <p className="mt-3 text-white/90">
            Website ini dirancang untuk memenuhi tugas mini project react
          </p>
          <div className="mt-3 text-3xl md:text-4xl font-extrabold text-white drop-shadow">
            dibimbing
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-full text-white font-medium shadow-lg
                         bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-95 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-full font-medium text-white shadow-lg
                         border border-white/70 hover:bg-white/10 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
