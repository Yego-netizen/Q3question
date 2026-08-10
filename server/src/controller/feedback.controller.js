import { createFeedback } from "../services/feedback.service.js";

export const sendFeedback = async (req, res) => {
  try {
    const {
      nome,
      percepcao,
      interpretacao,
      efeitoPsicologico,
      efeitoComportamental,
      feedbackLivre,
    } = req.body;

    if (
      !nome ||
      !percepcao ||
      !interpretacao ||
      !efeitoPsicologico ||
      !efeitoComportamental ||
      !feedbackLivre
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios.",
      });
    }

    const feedback = await createFeedback({
      nome,
      percepcao,
      interpretacao,
      efeitoPsicologico,
      efeitoComportamental,
      feedbackLivre,
    });

    return res.status(201).json({
      success: true,
      message: "Feedback enviado com sucesso.",
      data: feedback,
    });
  } catch (error) {
    console.error("Erro ao enviar feedback:", error);

    return res.status(500).json({
      success: false,
      message: "Erro interno ao enviar feedback.",
      error: error.message,
    });
  }
};