import { useEffect, useState } from "react";
import { getNotes } from "../services/NoteService";
import NotesList from "../components/NotesList";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <NotesList refresh={fetchNotes} notes={notes} />
    </>
  );
}
