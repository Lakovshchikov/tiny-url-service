import { urlService } from "#services";
import { RequestHandler } from "express";
import { z } from "zod";

const requestBodyValidationSchema = z.object({
  expiresAt: z.string().optional(),
  originalUrl: z.string().url(),
  shortUrl: z
    .string()
    .regex(/^[a-zA-Z0-9\-_.]+$/)
    .max(50)
    .min(3)
    .optional(),
});

type RequestBody = z.infer<typeof requestBodyValidationSchema>;

type ResponseBody = ResponseWithErrorBody<{
  shortUrl: string;
}>;

export const createShortUrl: RequestHandler<unknown, ResponseBody, RequestBody> = async (req, res, next) => {
  try {
    const { expiresAt, originalUrl, shortUrl } = req.body;
    const validationResult = requestBodyValidationSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        details: validationResult.error.errors,
        error: "Invalid request body",
      });
      return;
    }

    const resultUrl = await urlService.createShortUrl({
      expiresAt,
      originalUrl,
      shortUrl,
    });

    res.status(201).json({ shortUrl: resultUrl });
  } catch (error: unknown) {
    next(error);
  }
};
