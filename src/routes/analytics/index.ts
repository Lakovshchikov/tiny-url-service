import { analyticsController } from "#controllers";
import express from "express";

const router = express.Router();

router.get("/api/v1/analytics/:shortUrl", analyticsController.getAnalytics);

export default router;
