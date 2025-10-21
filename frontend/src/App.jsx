import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import ArchivedNotes from "./pages/ArchivedNotes";
import NotFound from "./pages/NotFound";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import NoteForm from "./components/NoteForm";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-indigo-100">
        <Header />
        <div className="flex flex-row flex-1">
          <Sidebar />
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
