import { Url } from "#lib";
import { urlRepository } from "#repositories";

interface Params {
  expiresAt?: string;
  originalUrl: string;
  shortUrl?: string;
}

export const createShortUrl = async (params: Params): Promise<Url> => {
  const { expiresAt, originalUrl, shortUrl } = params;

  const url = await urlRepository.createUrl({
    expiresAt,
    originalUrl,
    shortUrl,
  });

  return url;
};
