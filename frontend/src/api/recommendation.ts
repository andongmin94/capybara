import type {
  DepositOption,
  DepositProduct,
  Recommendation,
  RecommendationPreferences,
} from "./types";

/** 상품의 옵션 중 희망 기간에 가장 가깝고 우대금리가 높은 항목을 안정적으로 고른다. */
function pickClosestOption(options: DepositOption[], term: number): DepositOption | null {
  return [...options].sort((a, b) => {
    const distance = Math.abs(a.save_trm - term) - Math.abs(b.save_trm - term);
    if (distance !== 0) return distance;
    if (b.intr_rate2 !== a.intr_rate2) return b.intr_rate2 - a.intr_rate2;
    return a.id - b.id;
  })[0] ?? null;
}

/**
 * 상품과 옵션을 사용자의 탐색 조건으로 점수화해 상위 세 개 후보를 반환한다.
 *
 * 같은 입력에는 같은 결과가 나오도록 점수가 같을 때 상품 코드로 정렬한다.
 *
 * @param products 평가할 예금 상품 목록
 * @param options 상품에 연결된 기간별 금리 옵션
 * @param preferences 희망 기간, 우선 기준, 선호 가입 방식
 */
export function rankProducts(
  products: DepositProduct[],
  options: DepositOption[],
  preferences: RecommendationPreferences,
): Recommendation[] {
  return products
    .map((product): Recommendation | null => {
      const productOptions = options.filter(
        (option) => option.fin_prdt_cd === product.fin_prdt_cd,
      );
      const option = pickClosestOption(productOptions, preferences.term);
      if (!option) return null;

      const exactTerm = option.save_trm === preferences.term;
      const online = /모바일|인터넷/.test(product.join_way);
      const branch = /영업점/.test(product.join_way);
      const channelMatch =
        preferences.channel === "any" ||
        (preferences.channel === "online" && online) ||
        (preferences.channel === "branch" && branch);

      const priorityScore =
        preferences.priority === "base"
          ? option.intr_rate * 100
          : preferences.priority === "bonus"
            ? option.intr_rate2 * 100
            : (online ? 260 : 0) + (branch ? 120 : 0);

      const score =
        priorityScore +
        (exactTerm ? 600 : 300 - Math.abs(option.save_trm - preferences.term) * 12) +
        (channelMatch ? 180 : 0) +
        (product.join_deny === 1 ? 30 : 0);

      const reasons = [
        exactTerm
          ? `희망 기간 ${preferences.term}개월과 일치`
          : `희망 기간과 가장 가까운 ${option.save_trm}개월`,
        preferences.priority === "base"
          ? `기본금리 ${option.intr_rate.toFixed(2)}% 기준 정렬`
          : preferences.priority === "bonus"
            ? `최고 우대금리 ${option.intr_rate2.toFixed(2)}% 기준 정렬`
            : `${product.join_way} 가입 가능`,
      ];

      if (preferences.channel !== "any") {
        reasons.push(channelMatch ? "선호 가입 방식과 일치" : "선호 방식과 일부 차이");
      }

      return { product, option, score, reasons };
    })
    .filter((item): item is Recommendation => item !== null)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.product.fin_prdt_cd.localeCompare(b.product.fin_prdt_cd);
    })
    .slice(0, 3);
}
