import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTags } from "../services/TagService";

export function Sidebar() {
  const location = useLocation();
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    const res = await getTags();

    if (!res.error) {
      setTags(res);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-3 w-full sm:w-1/6 bg-white shadow">
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
          location.pathname === "/" && !location.search
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
      {tags[0] && (
        <div className="flex flex-col gap-2">
          <label className="border-y py-2 text-center font-semibold">
            Tags
          </label>
          {tags.map((tag) => (
            <Link
              to={`/?tag=${tag.name}`}
              className={`px-3 py-2 rounded transition-colors ${
                location.search === `?tag=${tag.name}`
                  ? "bg-indigo-100 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
