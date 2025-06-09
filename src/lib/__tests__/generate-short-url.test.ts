import { describe, expect, it } from "vitest";

import { generateShortUrl } from "../generate-short-url.js";

describe("Tests for generateShortUrl function", () => {
  it("Should return 0 for 0 param value", () => {
    expect(generateShortUrl(0)).toBe("0");
  });

  it("Should create correct values fot param < 62 (only one symbol)", () => {
    expect(generateShortUrl(1)).toBe("1");
    expect(generateShortUrl(9)).toBe("9");
    expect(generateShortUrl(10)).toBe("a");
    expect(generateShortUrl(35)).toBe("z");
    expect(generateShortUrl(36)).toBe("A");
    expect(generateShortUrl(61)).toBe("Z");
  });

  it("Should create correct values fot param >= 62", () => {
    expect(generateShortUrl(62)).toBe("10");
    expect(generateShortUrl(63)).toBe("11");
    expect(generateShortUrl(124)).toBe("20");
    expect(generateShortUrl(3843)).toBe("ZZ");
    expect(generateShortUrl(3844)).toBe("100");
  });

  it("Should create correct values fot big param values", () => {
    expect(generateShortUrl(238327)).toBe("ZZZ");
    expect(generateShortUrl(3_521_614_606_207)).toHaveLength(7);
  });

  it("Should return empty string for negative param values", () => {
    expect(generateShortUrl(-1)).toBe("");
  });
});
