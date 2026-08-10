import express from "express";
import statsRouter from "./src/routes/stats.routes.js";
import dotenv from "dotenv";
import { connectDatabase } from "./src/database/database.js";

dotenv.config();

connectDatabase();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/stats", statsRouter);


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
