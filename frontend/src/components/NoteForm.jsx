import React, { useEffect, useMemo, useState } from "react";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import { createNote, editNote, getNote } from "../services/NoteService";
import Swal from "sweetalert2";
import { getTags } from "../services/TagService";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "./Tag";

export default function NoteForm() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });
  const { id } = useParams();
  const isEdit = useMemo(() => id !== undefined, [id]);

  const fetchNoteData = async (id) => {
    try {
      const response = await getNote(id);

      if (response.error) throw new Error(response.error);

      setNoteData({
        title: response.title,
        content: response.content,
      });

      let noteTagIds = response.NoteTag.map(tag => tag.id)
      setSelectedTags(noteTagIds);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
      navigate("/");
    }
  };

  useEffect(() => {
    if (id) fetchNoteData(id);
  }, [id]);

  const fetchTags = async () => {
    try {
      const response = await getTags();
      setTags(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        ...noteData,
        tagIds: selectedTags,
      };

      const res = isEdit
        ? await editNote(id, payload)
        : await createNote(payload);

      if (res.error) throw new Error(res.error);

      Swal.fire({
        icon: "success",
        text: `Note successfully ${isEdit ? "edited" : "created"}!`,
      });

      if (!isEdit) {
        setNoteData({ title: "", content: "" });
        setSelectedTags([]);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  };

  const selectTag = (e) => {
    const tagId = parseInt(e.target.value);

    if (selectedTags.includes(tagId)) {
      return Swal.fire({
        text: "Tag already selected",
        icon: "error",
      });
    }

    setSelectedTags((prev) => [...prev, tagId]);
  };

  const removeTag = (tagId) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNoteData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form
      className="h-full flex flex-col bg-white rounded-md w-full shadow p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-gray-900 text-xl">
        {isEdit ? "Edit" : "Create"} Note
      </h2>
      <div className="mt-5 gap-6 flex-1 flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-3">
          <div className="">
            <label
              htmlFor="title"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="title"
                // required
                onChange={handleChange}
                value={noteData.title}
                className="border block w-full rounded-md bg-indigo-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label
              htmlFor="content"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Content
            </label>
            <div className="mt-2 flex flex-auto">
              <textarea
                id="content"
                name="content"
                rows={3}
                onChange={handleChange}
                value={noteData.content}
                className="flex flex-1 h-full border block w-full rounded-md bg-indigo-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        {tags[0] && (
          <div className="w-full md:w-1/2 flex flex-col gap-5 flex-1 ">
            <div className="">
              <label
                htmlFor="tags"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Tags
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="tags"
                  name="tags"
                  className="border col-start-1 row-start-1 w-full appearance-none rounded-md bg-indigo-100 py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={selectTag}
                >
                  {tags.map((tag) => (
                    <option value={tag.id} key={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                <img
                  src={ChevronDownIcon}
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end text-gray-500 sm:size-6"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTags?.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                return (
                  <Tag
                    key={tagId}
                    name={tag?.name}
                    onDelete={() => removeTag(tagId)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-900/10 pt-7 mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => navigate("/")}
          type="button"
          className="text-sm/6 font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-indigo-600 px-5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
