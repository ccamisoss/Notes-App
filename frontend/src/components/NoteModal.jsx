import Tag from "./Tag";

const NoteModal = ({ isOpen, note, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-30"
      onClick={onClose}
    >
      <div
        className="flex flex-col h-4/5 bg-white rounded-lg shadow-lg max-w-lg w-full p-6 mx-3 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-2">{note.title}</h2>
        <p className="mb-4 flex flex-1 overflow-auto">{note.content}</p>
        {note.NoteTag && note.NoteTag.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {note.NoteTag.map((tag) => (
              <Tag name={tag.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteModal;