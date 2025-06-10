import { ErrorCodes, generateShortUrl, Prisma, prisma, Url } from "#lib";

interface Params {
  expiresAt?: string;
  originalUrl: string;
  shortUrl?: string;
}

export const createUrl = async (params: Params): Promise<Url> => {
  try {
    return await prisma.$transaction(async (tx) => {
      const { expiresAt, originalUrl, shortUrl } = params;

      let url = await tx.url.create({
        data: {
          expiresAt: expiresAt ? new Date(expiresAt) : undefined,
          originalUrl,
          shortUrl,
        },
      });

      if (!url.shortUrl) {
        const shortUrl = generateShortUrl(url.id);

        url = await tx.url.update({
          data: { shortUrl },
          where: { id: url.id },
        });
      }

      return url;
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw new Error(ErrorCodes.ENTITY_ALREADY_EXISTS);
    }
    throw err;
  }
};
