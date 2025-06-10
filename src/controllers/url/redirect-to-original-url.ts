import { ErrorCodes, isNotFoundError } from "#lib";
import { urlService } from "#services";
import { RequestHandler } from "express";
import path from "path";

interface RequestParams {
  shortUrl: string;
}

export const redirectToOriginalUrl: RequestHandler<RequestParams> = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    if (!req.ip) {
      throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
    }

    const originalUrl = await urlService.getOriginalUrlWithTracking({
      ipAddress: req.ip,
      shortUrl,
    });

    res.redirect(originalUrl);
  } catch (error: unknown) {
    if (isNotFoundError(error)) {
      const filePath = path.resolve(process.cwd(), "public", "404.html");
      res.status(404).sendFile(filePath);
      return;
    }
    next(error);
  }
};
