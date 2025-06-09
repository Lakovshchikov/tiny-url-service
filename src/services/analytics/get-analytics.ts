import { GetAnalyticsResponseBody } from "#controllers";
import { analyticsRepository } from "#repositories";

export const getAnalytics = async (shortUrl: string): Promise<GetAnalyticsResponseBody> => {
  const clickCount = await analyticsRepository.getClicksCount(shortUrl);
  const clicks = await analyticsRepository.getClicks({ shortUrl });

  return {
    clickCount,
    clicks,
  };
};
