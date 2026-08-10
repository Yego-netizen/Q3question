import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://q3question.onrender.com/api";

export interface StatsDTO {
  nome: string;
  pontuacao: number;
}

export async function sendStats(data: StatsDTO) {
  const response = await axios.post("/stats", data);

  return response.data;
}

export async function getStats() {
  const response = await axios.get("/stats");

  return response.data;
}