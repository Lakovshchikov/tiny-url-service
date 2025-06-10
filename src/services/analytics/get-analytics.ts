import { GetAnalyticsResponseBody } from "#controllers";
import { analyticsRepository, urlRepository } from "#repositories";

export const getAnalytics = async (shortUrl: string): Promise<GetAnalyticsResponseBody> => {
  await urlRepository.getShortUrlInfo(shortUrl);
  const clickCount = await analyticsRepository.getClicksCount(shortUrl);
  const clicks = await analyticsRepository.getClicks({ shortUrl });

  return {
    clickCount,
    clicks,
  };
};
