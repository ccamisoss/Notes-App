import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import ArchivedNotes from "./pages/ArchivedNotes";
import NotFound from "./pages/NotFound";
import { Menu } from "./components/Menu";
import { Header } from "./components/Header";
import NoteForm from "./components/NoteForm";
import { useState } from "react";

export default function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-100 to-indigo-400">
        <Header toggleMenu={() => setIsMenuVisible(!isMenuVisible)} />
        <div className="flex flex-col sm:flex-row flex-1">
          <Menu isVisible={isMenuVisible} />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/archived" element={<ArchivedNotes />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/create" element={<NoteForm />} />
              <Route path="/edit/:id" element={<NoteForm />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
