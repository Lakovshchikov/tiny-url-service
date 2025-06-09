import { urlController } from "#controllers";
import express from "express";

const router = express.Router();

router.get("/api/v1/url/:shortUrl", urlController.getShortUrlInfo);
router.post("/api/v1/url", urlController.createShortUrl);
router.delete("/api/v1/url/:shortUrl", urlController.deleteShortUrl);

export default router;
