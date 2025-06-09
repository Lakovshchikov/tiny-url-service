import { Url } from "#lib";
import { analyticsRepository, urlRepository } from "#repositories";

type Response = Url & {
  clickCount: number;
};

export const getShortUrlInfo = async (shortUrl: string): Promise<null | Response> => {
  const url = await urlRepository.getShortUrlInfo(shortUrl);
  const clickCount = await analyticsRepository.getClicksCount(shortUrl);

  return {
    ...url,
    clickCount,
  };
};
