import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notes.routes.js";
import tagsRoutes from "./routes/tags.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api/tags", tagsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
