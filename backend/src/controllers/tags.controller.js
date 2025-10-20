import * as tagsService from "../services/tags.service.js";

export async function getTags(req, res) {
  try {
    const tags = await tagsService.getAllTags();
    res.status(200).json(tags);
  } catch {
    res.status(500).json({ error: "Error fetching tags" });
  }
}

export async function createTag(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const tag = await tagsService.createTag({ name });
    res.status(201).json(tag);
  } catch {
    res.status(500).json({ error: "Error creating tag" });
  }
}

export async function deleteTag(req, res) {
  try {
    const deleted = await tagsService.deleteTag(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Tag not found" });
    res.status(200).json({ message: "Tag successfully deleted" });
  } catch {
    res.status(500).json({ error: "Error deleting tag" });
  }
}
