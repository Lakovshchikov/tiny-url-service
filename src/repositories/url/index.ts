import { createUrl } from "./create-url.js";
import { deleteShortUrl } from "./delete-url.js";
import { getShortUrlInfo } from "./get-short-url-info.js";

export const urlRepository = {
  createUrl,
  deleteShortUrl,
  getShortUrlInfo,
};
