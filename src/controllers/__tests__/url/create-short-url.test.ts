import { Url } from "#lib";
import { urlService } from "#services";
import { Request, Response } from "express";
import { beforeEach, describe, expect, it, type MockedFunction, vi } from "vitest";

import { createShortUrl } from "../../url/create-short-url.js";

vi.mock("#services", () => ({
  urlService: {
    createShortUrl: vi.fn(),
  },
}));

const mockedCreateShortUrl = urlService.createShortUrl as MockedFunction<typeof urlService.createShortUrl>;

function getMockRes() {
  const res: Partial<Response> = {
    json: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
  };
  return res as Response;
}

describe("Tests for createShortUrl controller function", () => {
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

  it("Should create short url", async () => {
    mockedCreateShortUrl.mockResolvedValue(testUrl);
    const req = {
      body: {
        originalUrl: "https://example.com",
        shortUrl: "short123",
      },
    } as Request;
    const res = getMockRes();
    const next = vi.fn();

    await createShortUrl(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(testUrl);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should return 400 status code for bad request body", async () => {
    const req = {
      body: {
        originalUrl: "not-a-url",
      },
    } as Request;
    const res = getMockRes();
    const next = vi.fn();

    await createShortUrl(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("Should handle errors calling next function", async () => {
    mockedCreateShortUrl.mockRejectedValue(new Error("fail"));
    const req = {
      body: {
        originalUrl: "https://example.com",
        shortUrl: "short123",
      },
    } as Request;
    const res = getMockRes();
    const next = vi.fn();

    await createShortUrl(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
