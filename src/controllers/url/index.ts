import { createShortUrl } from "./create-short-url.js";
import { deleteShortUrl } from "./delete-short-url.js";
import { getShortUrlInfo } from "./get-short-url-info.js";
import { redirectToOriginalUrl } from "./redirect-to-original-url.js";

export const urlController = {
  createShortUrl,
  deleteShortUrl,
  getShortUrlInfo,
  redirectToOriginalUrl,
};
