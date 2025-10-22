import noteIcon from "../assets/icons/note-black.svg";

export function Header() {
  return (
    <header className="p-4 bg-white flex items-baseline gap-2 border shadow">
      <img src={noteIcon} className="size-7" />
      <h1 className="text-3xl font-bold">Notes App</h1>
    </header>
  );
}
