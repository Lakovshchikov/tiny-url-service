import { createShortUrl } from "./create-short-url.js";
import { deleteShortUrl } from "./delete-short-url.js";
import { getOriginalUrlWithTracking } from "./get-original-url-with-tracking.js";
import { getShortUrlInfo } from "./get-short-url-info.js";

export const urlService = {
  createShortUrl,
  deleteShortUrl,
  getOriginalUrlWithTracking,
  getShortUrlInfo,
};
