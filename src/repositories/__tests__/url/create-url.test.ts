import { ErrorCodes, generateShortUrl, prisma, Prisma, Url } from "#lib";
import { PrismaClient } from "@prisma/client/extension";
import { ITXClientDenyList } from "@prisma/client/runtime/binary";
import { beforeEach, describe, expect, it, MockedFunction, vi } from "vitest";

import { createUrl } from "../../url/create-url.js";

const mocks = vi.hoisted(() => {
  return {
    GENERATE_SHORT_URL_MOCKED_VALUE: "5s5a54d",
  };
});

vi.mock("#lib", async (importOriginal) => {
  const mod = await importOriginal();
  const base = typeof mod === "object" && mod !== null ? mod : {};
  return {
    ...base,
    generateShortUrl: vi.fn().mockReturnValue(mocks.GENERATE_SHORT_URL_MOCKED_VALUE),
    prisma: {
      $transaction: vi.fn(),
    },
  };
});

describe("Tests for createUrl repository function", () => {
  const mockedPrisma = prisma as unknown as { $transaction: MockedFunction<typeof prisma.$transaction> };
  const testUrl: Url = {
    createdAt: new Date(),
    expiresAt: new Date(),
    id: 1,
    originalUrl: "https://test.ru",
    shortUrl: "myShort",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should create shortUrl taken from params", async () => {
    const expectedShortUrl = { ...testUrl, shortUrl: "test-short" };
    const mockedCreate = vi.fn().mockResolvedValue(expectedShortUrl);
    mockedPrisma.$transaction.mockImplementation(async (cb) => {
      return cb({
        url: {
          create: mockedCreate,
        },
      } as Omit<PrismaClient, ITXClientDenyList>);
    });

    const result = await createUrl({ originalUrl: testUrl.originalUrl, shortUrl: expectedShortUrl.shortUrl });

    expect(mockedCreate).toHaveBeenCalled();
    expect(result).toEqual(expectedShortUrl);
  });

  it("Should call generateShortUrl if shortUrl not passed into params", async () => {
    const url: Url = { ...testUrl, shortUrl: null };
    const mockedCreate = vi.fn().mockResolvedValue(url);
    const mockedUpdate = vi.fn().mockImplementation(({ data }: { data: { shortUrl: string } }) => {
      url.shortUrl = data.shortUrl;
      return url;
    });

    mockedPrisma.$transaction.mockImplementation(async (cb) => {
      return cb({
        url: {
          create: mockedCreate,
          update: mockedUpdate,
        },
      } as Omit<PrismaClient, ITXClientDenyList>);
    });

    const result = await createUrl({ originalUrl: url.originalUrl });

    expect(mockedCreate).toHaveBeenCalled();
    expect(mockedUpdate).toHaveBeenCalled();
    expect(generateShortUrl).toHaveBeenCalledWith(url.id);
    expect(result).toEqual({ ...url, shortUrl: mocks.GENERATE_SHORT_URL_MOCKED_VALUE });
  });

  it("Should throw error ENTITY_ALREADY_EXISTS if url with the same shortUrl already exist", async () => {
    mockedPrisma.$transaction.mockImplementation(() => {
      const error = new Prisma.PrismaClientKnownRequestError("Unique constraint failed", { clientVersion: "4.0.0", code: "P2002" });

      throw error;
    });

    await expect(createUrl({ originalUrl: "https://test.ru", shortUrl: "myShort" })).rejects.toThrow(ErrorCodes.ENTITY_ALREADY_EXISTS);
  });
});
