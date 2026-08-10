import express from "express";
import statsRouter from "./src/routes/stats.routes.js";
import feedbackRouter from "./src/routes/feedback.routes.js"
import dotenv from "dotenv";
import { connectDatabase } from "./src/database/database.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

connectDatabase();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use("/api/stats", statsRouter);
app.use("/api/feedback",feedbackRouter)
// Frontend React
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});