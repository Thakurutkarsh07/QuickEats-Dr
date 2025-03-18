import express from "express";
import { handleLeadScoreUpdate } from "../controllers/leadScoreController.js";

const router = express.Router();

router.post("/update", handleLeadScoreUpdate); // Route to update lead score

export default router;
