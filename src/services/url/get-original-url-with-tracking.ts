import { ErrorCodes, prisma } from "#lib";
import { analyticsRepository, urlRepository } from "#repositories";

interface Params {
  ipAddress: string;
  shortUrl: string;
}

export const getOriginalUrlWithTracking = async (params: Params): Promise<string> => {
  const { ipAddress, shortUrl } = params;

  const url = await prisma.$transaction(async (tx) => {
    const url = await urlRepository.getShortUrlInfo(shortUrl, tx);

    if (url.expiresAt.getTime() < Date.now()) {
      await urlRepository.deleteShortUrl(shortUrl);

      throw new Error(ErrorCodes.URL_EXPIRED);
    }

    await analyticsRepository.trackClick(
      {
        ipAddress,
        shortUrl,
      },
      tx,
    );

    return url;
  });

  return url.originalUrl;
};
