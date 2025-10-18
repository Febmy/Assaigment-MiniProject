import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UsersAPI } from "../services/api";

export default function UserDetail() {
  const { id } = useParams();
  const [u, setU] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    UsersAPI.single(id)
      .then(({ data }) => {
        if (ignore) return;
        setU(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!u) return <p>Not found</p>;

  return (
    <div className="max-w-md">
      <img
        src={u.avatar}
        alt={u.first_name}
        className="w-28 h-28 rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold">
        {u.first_name} {u.last_name}
      </h2>
      <p className="text-gray-600">{u.email}</p>
      <Link to="/" className="inline-block mt-4 underline">
        ← Back
      </Link>
    </div>
  );
}
