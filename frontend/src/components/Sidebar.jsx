import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow">
      <Link
        to="/"
        className={`px-3 py-2 rounded transition-colors ${
          location.pathname === "/"
            ? "bg-gray-500 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        All Notes
      </Link>
      <Link
        to="/users"
        className={`px-3 py-2 rounded transition-colors ${
          location.pathname === "/users"
            ? "bg-gray-500 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Archived
      </Link>
    </div>
  );
}