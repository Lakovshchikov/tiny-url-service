import { ErrorCodes, Prisma, prisma, Url } from "#lib";

export const deleteShortUrl = async (shortUrl: string): Promise<null | Url> => {
  try {
    return await prisma.url.delete({ where: { shortUrl } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      throw new Error(ErrorCodes.NOT_FOUND);
    }
    throw err;
  }
};
