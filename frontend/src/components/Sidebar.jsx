import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createTag, deleteTag, getTags } from "../services/TagService";
import Swal from "sweetalert2";
import trashIcon from "../assets/icons/trash.svg";
import plusIcon from "../assets/icons/plus.svg";

export function Sidebar() {
  const [newTag, setNewTag] = useState("");
  const location = useLocation();
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    const res = await getTags();
    if (!res.error) {
      setTags(res);
    }
  };

  const onInputChange = (e) => {
    setNewTag(e.target.value);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleTagCreation = async (e) => {
    e.preventDefault();
    const res = await createTag(newTag);

    if (res.error)
      return Swal.fire({
        icon: "error",
        text: res.error,
      });

    setNewTag("");
    fetchTags();
  };

  const handleTagDeletion = async (id) => {
    const res = await deleteTag(id);

    if (res.error)
      return Swal.fire({
        icon: "error",
        text: "Unable to delete tags with associated notes.",
      });

    fetchTags();
  };

  return (
    <div className="flex flex-col gap-4 py-3 w-full sm:w-1/6 bg-white shadow">
      <Link
        to="/create"
        className={`mx-3 px-3 py-2 rounded transition-colors ${
          location.pathname === "/create"
            ? "bg-indigo-100 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Create new note
      </Link>
      <Link
        to="/"
        className={`mx-3 px-3 py-2 rounded transition-colors ${
          location.pathname === "/" && !location.search
            ? "bg-indigo-100 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        All Notes
      </Link>
      <Link
        to="/archived"
        className={`mx-3 px-3 py-2 rounded transition-colors ${
          location.pathname === "/archived"
            ? "bg-indigo-100 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Archived
      </Link>
      <div className="flex flex-col gap-2">
        <label className="border-y py-2 text-center font-semibold">
          Tags / Categories
        </label>
        <form
          onSubmit={handleTagCreation}
          className="mx-3 p-1 flex flex-row gap-1"
        >
          <input
            placeholder="New tag"
            className="w-full border-b py-1 outline-none"
            type="text"
            value={newTag}
            onChange={onInputChange}
          />
          <button
            className="w-max bg-indigo-400 p-2 text-white rounded"
            type="submit"
          >
            <img src={plusIcon} className="size-4 w-max" />
          </button>
        </form>
        {tags.map((tag) => (
          <div
            className={`mx-3 px-3 py-2 rounded transition-colors flex flex-row justify-between ${
              location.search === `?tag=${tag.name}`
                ? "bg-indigo-100 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Link className="flex flex-1" to={`/?tag=${tag.name}`}>
              {tag.name}
            </Link>
            <button onClick={() => handleTagDeletion(tag.id)}>
              <img src={trashIcon} className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
