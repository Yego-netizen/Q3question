import Feedback from "../models/Feedback.js";

export const createFeedback = (body) => Feedback.create(body)