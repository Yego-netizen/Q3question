import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  pontuacao: {
    type: Number,
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now(),
  },
});

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;
