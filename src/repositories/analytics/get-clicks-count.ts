import type { Prisma } from "@prisma/client";

import { prisma } from "#lib";

export const getClicksCount = async (shortUrl: string, tx?: Prisma.TransactionClient): Promise<number> => {
  const client = tx ?? prisma;

  const clicksCount = await client.click.count({
    where: {
      shortUrl,
    },
  });

  return clicksCount;
};
