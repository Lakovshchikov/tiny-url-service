import { default as analysisRoutes } from "#routes/analytics/index.js";
import { default as urlRoutes } from "#routes/url/api.js";
import { default as urlRedirectRoutes } from "#routes/url/redirect.js";
import express from "express";

const router = express.Router();

router.use(urlRoutes);
router.use(analysisRoutes);
router.use(urlRedirectRoutes);

export default router;
