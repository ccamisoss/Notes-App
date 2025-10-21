import { useEffect, useState } from "react";
import { getNotes } from "../services/NoteService";
import NotesList from "../components/NotesList";

export default function ArchivedNotes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const data = await getNotes(true);
      setNotes(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <NotesList notes={notes} />
    </div>
  );
}
