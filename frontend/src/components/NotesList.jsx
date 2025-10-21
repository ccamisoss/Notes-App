import React from "react";
import Note from "./Note";

const NotesList = ({ notes }) => {
  if (notes.lenght < 1) return <div></div>;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      {notes.map((note) => (
        <Note title={note.title} key={note.id}>
          <p>{note.content}</p>
        </Note>
      ))}
    </div>
  );
};

export default NotesList;
