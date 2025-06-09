import { Click } from "#lib";
import { analyticsService } from "#services";
import { RequestHandler } from "express";

export type ResponseBody = ResponseWithErrorBody<{
  clickCount: number;
  clicks: Click[];
}>;

interface RequestParams {
  shortUrl: string;
}

export const getAnalytics: RequestHandler<RequestParams, unknown, ResponseBody> = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    const data = await analyticsService.getAnalytics(shortUrl);

    res.status(200).json(data);
  } catch (error: unknown) {
    next(error);
  }
};
