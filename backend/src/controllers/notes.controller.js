import * as notesService from "../services/notes.service.js";

export async function getNotes(req, res) {
  try {
    const archived = req.query.archived === "true";
    const notes = await notesService.getAllNotes(archived);
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notes" });
  }
}

export async function getNote(req, res) {
  try {
    const note = await notesService.getNoteById(parseInt(req.params.id));
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch {
    res.status(500).json({ error: "Error fetching note" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content, tagIds } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    
    if (tagIds !== undefined && !Array.isArray(tagIds)) {
      return res.status(400).json({ error: "tagIds must be an array" });
    }
    
    const note = await notesService.createNote({ title, content, tagIds });
    res.status(201).json(note);
  } catch {
    res.status(500).json({ error: "Error creating note" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content, tagIds } = req.body;
    
    if (tagIds !== undefined && !Array.isArray(tagIds)) {
      return res.status(400).json({ error: "tagIds must be an array" });
    }
    
    const note = await notesService.updateNote(parseInt(req.params.id), { title, content, tagIds });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch {
    res.status(500).json({ error: "Error updating note" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deleted = await notesService.deleteNote(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Note not found" });
    res.status(200).json({ message: "Note successfully deleted" });
  } catch {
    res.status(500).json({ error: "Error deleting note" });
  }
}

export async function setArchived(req, res) {
  try {
    const { archived } = req.body;
    const note = await notesService.setArchived(parseInt(req.params.id), archived);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res
      .status(200)
      .json({
        message: `Note successfully ${archived ? "archived" : "unarchived"}`,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
