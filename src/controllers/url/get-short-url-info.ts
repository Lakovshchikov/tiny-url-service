import { urlService } from "#services";
import { RequestHandler } from "express";

interface RequestParams {
  shortUrl: string;
}

export const getShortUrlInfo: RequestHandler<RequestParams> = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    const info = await urlService.getShortUrlInfo(shortUrl);

    res.status(200).json(info);
  } catch (error: unknown) {
    next(error);
  }
};
