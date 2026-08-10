import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  percepcao: {
    type: String,
    required: true,
    trim: true,
  },

  interpretacao: {
    type: String,
    required: true,
    trim: true,
  },

  efeitoPsicologico: {
    type: String,
    required: true,
    trim: true,
  },

  efeitoComportamental: {
    type: String,
    required: true,
    trim: true,
  },

  feedbackLivre: {
    type: String,
    required: true,
    trim: true,
  },
  created_At: {
    type: Date,
    default: Date.now(),
  },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
