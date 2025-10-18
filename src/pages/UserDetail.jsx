import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UsersAPI } from "../services/api";

export default function UserDetail() {
  const { id } = useParams();
  const [u, setU] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;
    setErr("");
    setLoading(true);
    UsersAPI.single(id)
      .then(({ data }) => {
        if (!ignore) setU(data.data);
      })
      .catch((e) => setErr(e?.message || "Failed to fetch detail"))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (err) return <div className="p-4 text-red-600">{err}</div>;
  if (!u) return <div className="p-4">Not found</div>;

  return (
    <div className="p-4">
      <img
        src={u.avatar}
        alt={u.first_name}
        className="w-28 h-28 rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold">
        {u.first_name} {u.last_name}
      </h2>
      <p className="text-gray-600">{u.email}</p>
      <Link to="/users" className="inline-block mt-4 underline">
        ← Back
      </Link>
    </div>
  );
}
