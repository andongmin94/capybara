import { describe, expect, it } from "vitest";
import { mockOptions, mockProducts } from "../mockData";
import { rankProducts } from "../recommendation";

describe("rankProducts", () => {
  it("같은 조건에는 같은 순서와 점수를 반환한다", () => {
    const preferences = { term: 12, priority: "bonus", channel: "online" } as const;
    const first = rankProducts(mockProducts, mockOptions, preferences);
    const second = rankProducts(mockProducts, mockOptions, preferences);

    expect(second).toEqual(first);
    expect(first).toHaveLength(3);
  });

  it("희망 기간과 일치하는 옵션을 우선 선택한다", () => {
    const result = rankProducts(mockProducts, mockOptions, {
      term: 24,
      priority: "base",
      channel: "any",
    });

    expect(result.every((item) => item.option.save_trm === 24)).toBe(true);
  });
});
