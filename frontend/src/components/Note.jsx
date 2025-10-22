import Swal from "sweetalert2";
import { deleteNote, toggleArchive } from "../services/NoteService";
import NoteMenu from "./NoteMenu";
import Tag from "./Tag";
import { useNavigate } from "react-router-dom";

export default function Note({ note, refresh, onOpen }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await deleteNote(note.id);

      if (res.error) throw new Error(res.error);

      refresh();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${note.id}`);
  };

  const handleToggleArchive = async () => {
    try {
      const res = await toggleArchive(note.id, !note.archived);

      if (res.error) throw new Error(res.error);

      Swal.fire({
        icon: "success",
        text: res.message,
      });

      refresh();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  };

  return (
    <div className="relative flex flex-col h-48 px-4 py-2.5 bg-white rounded-lg shadow space-y-2">
      <NoteMenu
        onDelete={handleDelete}
        onEdit={handleEdit}
        isArchived={note.archived}
        onToggleArchive={handleToggleArchive}
        onOpen={onOpen}
      />
      <h3 className="font-semibold text-lg">{note.title}</h3>
      <p className="flex-1 overflow-hidden text-ellipsis line-clamp-4">{note.content}</p>
      <div className="flex flex-wrap gap-1">
        {note.NoteTag.map((tag) => (
          <Tag key={tag.id} name={tag.name} />
        ))}
      </div>
    </div>
  );
}
