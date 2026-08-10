import { Router } from "express";
import { addStats, getAllStats } from "../controller/stats.controller.js";

const router = Router();

router.get("/", getAllStats);
router.post("/", addStats);

export default router;
