import React from "react";
import Note from "./Note";
import { useSearchParams } from "react-router-dom";

const NotesList = ({ notes, refresh }) => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');

  const filteredNotes = tag
    ? notes.filter(note => 
        note.NoteTag.some(noteTag => noteTag.name === tag)
      )
    : notes;

  if (!filteredNotes[0]) {
    return (
      <div className="justify-center w-full h-full flex-1 flex flex-col text-center gap-8 text-gray-200 font-semibold">
        <p className="text-8xl">;(</p>
        <p className="text-3xl">No data available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      {filteredNotes.map((note) => (
        <Note refresh={refresh} note={note} key={note.id} />
      ))}
    </div>
  );
};

export default NotesList;
