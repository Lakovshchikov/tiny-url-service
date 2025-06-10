import { Url } from "#lib";
import { urlRepository } from "#repositories";
import { beforeEach, describe, expect, it, MockedFunction, vi } from "vitest";

import { createShortUrl } from "../../url/create-short-url.js";

vi.mock("#repositories", () => ({
  urlRepository: {
    createUrl: vi.fn(),
  },
}));

const mockedCreateUrl = urlRepository.createUrl as MockedFunction<typeof urlRepository.createUrl>;

describe("Tests for createShortUrl service function", () => {
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

  it("Should return shortUrl", async () => {
    mockedCreateUrl.mockResolvedValue(testUrl);
    const params = {
      expiresAt: "2025-12-31",
      originalUrl: "https://example.com",
      shortUrl: "short123",
    };

    const result = await createShortUrl(params);

    expect(result).toEqual(testUrl);
    expect(mockedCreateUrl).toHaveBeenCalledWith(params);
  });

  it("Should throw error if createUrl throw error", async () => {
    mockedCreateUrl.mockRejectedValue(new Error("DB error"));

    await expect(
      createShortUrl({
        originalUrl: "https://example.com",
      }),
    ).rejects.toThrow("DB error");
  });
});
