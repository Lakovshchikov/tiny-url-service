import { Url } from "#lib";
import { urlRepository } from "#repositories";

export const deleteShortUrl = async (shortUrl: string): Promise<null | Url> => {
  return urlRepository.deleteShortUrl(shortUrl);
};
