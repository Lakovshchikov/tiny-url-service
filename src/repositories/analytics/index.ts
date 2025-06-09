import { getClicksCount } from "./get-clicks-count.js";
import { getClicks } from "./get-clicks.js";
import { trackClick } from "./track-click.js";

export const analyticsRepository = {
  getClicks,
  getClicksCount,
  trackClick,
};
