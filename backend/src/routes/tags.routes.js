import express from "express";
import * as tagsController from "../controllers/tags.controller.js";

const router = express.Router();

router.get("/", tagsController.getTags);
router.post("/", tagsController.createTag);
router.delete("/:id", tagsController.deleteTag);

export default router;
