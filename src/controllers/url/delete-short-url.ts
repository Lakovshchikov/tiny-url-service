import { urlService } from "#services";
import { RequestHandler } from "express";

interface RequestParams {
  shortUrl: string;
}

export const deleteShortUrl: RequestHandler<RequestParams> = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    await urlService.deleteShortUrl(shortUrl);

    res.sendStatus(204);
  } catch (error: unknown) {
    next(error);
  }
};
