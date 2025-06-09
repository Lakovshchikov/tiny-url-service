import { ErrorCodes } from "#lib";
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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should return shortUrl", async () => {
    mockedCreateUrl.mockResolvedValue("short123");
    const params = {
      expiresAt: "2025-12-31",
      originalUrl: "https://example.com",
      shortUrl: "short123",
    };

    const result = await createShortUrl(params);

    expect(result).toBe("short123");
    expect(mockedCreateUrl).toHaveBeenCalledWith(params);
  });

  it("Should throw error if return null", async () => {
    mockedCreateUrl.mockResolvedValue(null);

    await expect(
      createShortUrl({
        originalUrl: "https://example.com",
      }),
    ).rejects.toThrow(ErrorCodes.INTERNAL_SERVER_ERROR);
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
