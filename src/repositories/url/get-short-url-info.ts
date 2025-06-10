import type { Prisma } from "@prisma/client";

import { ErrorCodes, prisma, Url } from "#lib";

export const getShortUrlInfo = async (shortUrl: string, tx?: Prisma.TransactionClient): Promise<Url> => {
  const client = tx ?? prisma;

  const url = await client.url.findUnique({ where: { shortUrl } });

  if (!url) {
    throw new Error(ErrorCodes.NOT_FOUND);
  }

  return url;
};
