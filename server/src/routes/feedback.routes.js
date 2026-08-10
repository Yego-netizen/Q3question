import { Router } from "express";
import { sendFeedback } from "../controller/feedback.controller.js";
const router = Router();


router.post("/", sendFeedback);

export default router;
