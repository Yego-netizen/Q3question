import axios from "axios";

const baseUrl = "http://localhost:3000";

export interface StatsDTO {
  nome: string;
  pontuacao: number;
}

export async function sendStats(data:StatsDTO) {
    const response = await axios.post(`${baseUrl}/api/stats`, data);

    if (!response) return new Error("Erro no envio dos stats");

    return response.data;

}

export async function getStats() {
  const response = await axios.get(`${baseUrl}/api/stats`)

  if (!response) return new Error("Erro no acesso dos stats");

  return response.data;
  
}