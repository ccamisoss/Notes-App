import React from "react";
import Note from "./Note";

const NotesList = ({ notes, refresh }) => {
  if (!notes[0]) {
    return (
      <div className="justify-center w-full h-full flex-1 flex flex-col text-center gap-8 text-gray-500 font-semibold">
        <p className="text-8xl">;(</p>
        <p className="text-3xl">No data available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      {notes.map((note) => (
        <Note refresh={refresh} note={note} key={note.id} />
      ))}
    </div>
  );
};

export default NotesList;
