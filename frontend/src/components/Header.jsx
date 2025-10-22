import noteIcon from "../assets/icons/note-black.svg";
import burgerIcon from "../assets/icons/burger-menu.svg";

export function Header({ toggleMenu }) {
  return (
    <header className="p-4 bg-white flex items-baseline gap-2 border shadow justify-between sm:justify-start">
      <img src={noteIcon} className="size-7" />
      <h1 className="text-3xl font-bold">Notes App</h1>
      <button onClick={toggleMenu} className="block sm:hidden">
        <img src={burgerIcon} className="size-7" />
      </button>
    </header>
  );
}
