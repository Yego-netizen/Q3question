import Stats from "../models/Stats.js";

export const add = (body) => Stats.create(body);
export const getAll = (offset,limit) => Stats.find().sort({pontuacao: -1,created_At:1}).skip(offset).limit(limit)
