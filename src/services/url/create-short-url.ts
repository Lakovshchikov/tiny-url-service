import { ErrorCodes } from "#lib";
import { urlRepository } from "#repositories";

interface Params {
  expiresAt?: string;
  originalUrl: string;
  shortUrl?: string;
}

export const createShortUrl = async (params: Params): Promise<string> => {
  const { expiresAt, originalUrl, shortUrl } = params;

  const url = await urlRepository.createUrl({
    expiresAt,
    originalUrl,
    shortUrl,
  });

  if (!url) {
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }

  return url;
};
