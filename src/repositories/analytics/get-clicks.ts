import type { Prisma } from "@prisma/client";

import { Click, prisma } from "#lib";

interface Params {
  count?: number;
  shortUrl: string;
}

export const getClicks = async (params: Params, tx?: Prisma.TransactionClient): Promise<Click[]> => {
  const client = tx ?? prisma;

  const { count = 5, shortUrl } = params;

  const clicks = await client.click.findMany({
    orderBy: {
      clickedAt: "desc",
    },
    skip: 0,
    take: count,
    where: {
      shortUrl,
    },
  });

  return clicks;
};
