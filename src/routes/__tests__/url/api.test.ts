import { urlController } from "#controllers";
import express, { Request, Response } from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import router from "../../url/api.js";

const mocks = vi.hoisted(() => ({
  GENERATE_SHORT_URL_MOCKED_VALUE: "5s5a54d",
}));

vi.mock("#controllers", () => ({
  urlController: {
    createShortUrl: vi.fn((req: Request, res: Response) => res.status(201).json({ shortUrl: mocks.GENERATE_SHORT_URL_MOCKED_VALUE })),
    deleteShortUrl: vi.fn(),
    getShortUrlInfo: vi.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use(router);

describe("Tests for POST /api/v1/url", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should return correct shortUdl and 201 status code", async () => {
    const response = await request(app).post("/api/v1/url").send({ originalUrl: "https://example.com" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ shortUrl: mocks.GENERATE_SHORT_URL_MOCKED_VALUE });
    expect(urlController.createShortUrl).toHaveBeenCalled();
  });
});
