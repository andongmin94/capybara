import { rankProducts } from "./recommendation";
import { readStored, writeStored } from "./storage";
import type {
  Article,
  ArticleDetail,
  BankBranch,
  BranchFilter,
  Comment,
  CurrencyQuote,
  DataApi,
  DemoUser,
  DepositOption,
  DepositProduct,
  RecommendationPreferences,
  SavedProduct,
  WishlistEntry,
} from "./types";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const WISHLIST_KEY = "capybara.real.wishlist.v2";
const USER_KEY = "capybara.real.user.v2";
const TOKEN_KEY = "capybara.real.token.v2";

function authHeaders(): HeadersInit {
  const token = readStored<string | null>(TOKEN_KEY, null);
  return token ? { Authorization: `Token ${token}` } : {};
}

/**
 * Django API의 기준 URL, JSON 헤더와 선택적 Token 인증을 일관되게 적용한다.
 *
 * @param path 기준 URL 뒤에 붙일 API 경로
 * @param init fetch 요청 옵션
 */
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청에 실패했습니다. (${response.status})`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

function getWishlist(): WishlistEntry[] {
  return readStored<WishlistEntry[]>(WISHLIST_KEY, []);
}

function toggleWishlist(entry: WishlistEntry): WishlistEntry[] {
  const current = getWishlist();
  const exists = current.some(
    (item) => item.productCode === entry.productCode && item.optionId === entry.optionId,
  );
  const next = exists
    ? current.filter(
        (item) => item.productCode !== entry.productCode || item.optionId !== entry.optionId,
      )
    : [...current, entry];
  writeStored(WISHLIST_KEY, next);
  return next;
}

async function getRealQuotes(): Promise<CurrencyQuote[]> {
  const codes: CurrencyQuote["code"][] = ["USD", "JPY", "EUR", "CNY"];
  const names: Record<CurrencyQuote["code"], string> = {
    KRW: "대한민국 원",
    USD: "미국 달러",
    JPY: "일본 엔",
    EUR: "유로",
    CNY: "중국 위안",
  };
  const quotes = await Promise.all(
    codes.map(async (code) => {
      const response = await fetch(
        `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${code}`,
      );
      if (!response.ok) throw new Error("환율 정보를 불러오지 못했습니다.");
      const [quote] = (await response.json()) as Array<{
        basePrice: number;
        currencyUnit: number;
      }>;
      return {
        code,
        name: names[code],
        wonPerUnit: quote.basePrice,
        unit: quote.currencyUnit || 1,
      };
    }),
  );
  return [{ code: "KRW", name: names.KRW, wonPerUnit: 1, unit: 1 }, ...quotes];
}

const defaultRealUser: DemoUser = {
  id: 0,
  username: "guest",
  nickname: "방문자",
  email: "",
};

/** Django와 외부 환율 API를 DataApi 계약에 맞춰 제공하는 Real 모드 공급자다. */
export const realApi: DataApi = {
  listProducts: () => request<DepositProduct[]>("/finlife/deposit-products/"),

  async getProduct(code) {
    const products = await this.listProducts();
    return products.find((product) => product.fin_prdt_cd === code) ?? null;
  },

  getOptions: (code) =>
    request<DepositOption[]>(`/finlife/deposit-product-options/${encodeURIComponent(code)}/`),

  async recommend(preferences: RecommendationPreferences) {
    const products = await this.listProducts();
    const options = (
      await Promise.all(products.map((product) => this.getOptions(product.fin_prdt_cd)))
    ).flat();
    return rankProducts(products, options, preferences);
  },

  getWishlist,
  toggleWishlist,

  async listSavedProducts(): Promise<SavedProduct[]> {
    const entries = getWishlist();
    const products = await this.listProducts();
    const optionGroups = await Promise.all(
      [...new Set(entries.map((entry) => entry.productCode))].map((code) => this.getOptions(code)),
    );
    const options = optionGroups.flat();
    return entries.flatMap((entry) => {
      const product = products.find((item) => item.fin_prdt_cd === entry.productCode);
      const option = options.find((item) => item.id === entry.optionId);
      return product && option ? [{ ...entry, product, option }] : [];
    });
  },

  listArticles: () => request<Article[]>("/articles/"),
  getArticle: (id) => request<ArticleDetail>(`/articles/${id}/`),

  createArticle: (input) =>
    request<Article>("/articles/", { method: "POST", body: JSON.stringify(input) }),

  createComment: async (articleId, content) => {
    await request<{ message: string }>(`/articles/comment/${articleId}/0/`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const detail = await request<ArticleDetail>(`/articles/${articleId}/`);
    return detail.comments.at(-1) as Comment;
  },

  deleteComment: (articleId, commentId) =>
    request<void>(`/articles/comment/${articleId}/${commentId}/delete/`, { method: "DELETE" }),

  getQuotes: getRealQuotes,

  async searchBranches(_filter: BranchFilter): Promise<BankBranch[]> {
    void _filter;
    return [];
  },

  getCurrentUser() {
    return readStored<DemoUser>(USER_KEY, defaultRealUser);
  },
};
