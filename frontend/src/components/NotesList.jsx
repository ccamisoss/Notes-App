import React from "react";
import Note from "./Note";

const NotesList = ({ notes, refresh }) => {
  if (!notes[0]) return <div>No notes a the moment :)</div>;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      {notes.map((note) => (
        <Note refresh={refresh} note={note} key={note.id} />
      ))}
    </div>
  );
};

export default NotesList;
