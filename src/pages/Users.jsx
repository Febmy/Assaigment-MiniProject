import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UsersAPI } from "../services/api";

export default function Users() {
  const [params, setParams] = useSearchParams();
  const pageParam = Number(params.get("page") || 1);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setErr("");
    UsersAPI.list(page)
      .then(({ data }) => {
        if (!ignore) {
          setUsers(data.data);
          setTotalPages(data.total_pages);
        }
      })
      .catch((e) => setErr(e?.message || "Failed to fetch users"))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [page]);

  useEffect(() => setParams({ page }), [page, setParams]);

  const next = () => setPage((p) => Math.min(p + 1, totalPages));
  const prev = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Users</h1>

      {err && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
          {err}
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((u) => (
              <Link
                key={u.id}
                to={`/users/${u.id}`}
                className="border rounded p-3 hover:shadow bg-white"
              >
                <img
                  src={u.avatar}
                  alt={u.first_name}
                  className="w-20 h-20 rounded-full mb-2"
                />
                <div className="font-medium">
                  {u.first_name} {u.last_name}
                </div>
                <div className="text-sm text-gray-600">{u.email}</div>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={prev}
              className="px-3 py-1 border rounded"
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} / {totalPages}
            </span>
            <button
              onClick={next}
              className="px-3 py-1 border rounded"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
