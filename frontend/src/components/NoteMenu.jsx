const NoteMenu = ({ onDelete, onEdit, onToggleArchive, isArchived }) => {
  return (
    <div className="absolute top-2 right-2 inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          const menu = e.currentTarget.nextSibling;
          menu.classList.toggle("hidden");
        }}
      >
        ⋮
      </button>
      <div
        className="origin-top-right absolute right-0 mt-2 min-w-[120px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 hidden"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-1">
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            tabIndex={0}
            onClick={onToggleArchive}
          >
            {isArchived ? "Unarchive" : "Archive"}
          </button>
          {!isArchived && (
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              tabIndex={0}
              onClick={onEdit}
            >
              Edit
            </button>
          )}
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            tabIndex={0}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteMenu;
