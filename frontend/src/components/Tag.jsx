import React from "react";

const Tag = ({ name, onDelete }) => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
      {name}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1 text-indigo-600 hover:text-indigo-800"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Tag;
