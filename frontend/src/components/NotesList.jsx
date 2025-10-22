import React, { useState } from "react";
import Note from "./Note";
import NoteModal from "./NoteModal";
import { useSearchParams } from "react-router-dom";

const NotesList = ({ notes, refresh }) => {
  const [searchParams] = useSearchParams();
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  const tag = searchParams.get("tag");

  const filteredNotes = tag
    ? notes.filter((note) =>
        note.NoteTag.some((noteTag) => noteTag.name === tag)
      )
    : notes;

  if (!filteredNotes[0]) {
    return (
      <div className="justify-center w-full h-full flex-1 flex flex-col text-center gap-8 text-gray-500 font-semibold">
        <p className="text-8xl">;(</p>
        <p className="text-3xl">No data available</p>
      </div>
    );
  }

  const handleCloseModal = () => {
    setSelectedNote({});
    setIsNoteOpen(false);
  };

  const handleModalOpen = (note) => {
    setSelectedNote(note);
    setIsNoteOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      {filteredNotes.map((note) => (
        <Note
          onOpen={() => handleModalOpen(note)}
          refresh={refresh}
          note={note}
          key={note.id}
        />
      ))}
      <NoteModal
        note={selectedNote}
        isOpen={isNoteOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default NotesList;
