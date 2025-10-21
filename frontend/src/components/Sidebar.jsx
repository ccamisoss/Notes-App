import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4 p-3 w-1/6 bg-white shadow">
      <Link
        to="/create"
        className={`px-3 py-2 rounded transition-colors ${
          location.pathname === "/create"
            ? "bg-indigo-100 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Create new note
      </Link>
      <Link
        to="/"
        className={`px-3 py-2 rounded transition-colors ${
          location.pathname === "/"
            ? "bg-indigo-100 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        All Notes
      </Link>
      <Link
        to="/archived"
        className={`px-3 py-2 rounded transition-colors ${
          location.pathname === "/archived"
            ? "bg-indigo-100 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Archived
      </Link>
    </div>
  );
}