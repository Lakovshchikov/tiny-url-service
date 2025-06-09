import { urlController } from "#controllers";
import express from "express";

const router = express.Router();

router.get("/:shortUrl", urlController.redirectToOriginalUrl);

export default router;
