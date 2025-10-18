export default function Dashboard() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Dashboard (Protected)</h1>
      <p>Ini hanya bisa diakses setelah login/register sukses (punya token).</p>
    </div>
  );
}
