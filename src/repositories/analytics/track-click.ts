import { Click, Prisma, prisma } from "#lib";

interface Params {
  ipAddress: string;
  shortUrl: string;
}

export const trackClick = async (params: Params, tx?: Prisma.TransactionClient): Promise<Click> => {
  const client = tx ?? prisma;

  const { ipAddress, shortUrl } = params;

  const click = await client.click.create({
    data: {
      ipAddress,
      shortUrl,
    },
  });

  return click;
};
