import {
  demoPublicUser,
  demoUser,
  initialArticles,
  initialComments,
  mockBranches,
  mockOptions,
  mockProducts,
  mockQuotes,
} from "./mockData";
import { rankProducts } from "./recommendation";
import { readStored, writeStored } from "./storage";
import type {
  Article,
  ArticleDetail,
  BranchFilter,
  Comment,
  DataApi,
  PublicUser,
  RecommendationPreferences,
  SavedProduct,
  WishlistEntry,
} from "./types";

const WISHLIST_KEY = "capybara.demo.wishlist.v2";
const ARTICLES_KEY = "capybara.demo.articles.v2";
const COMMENTS_KEY = "capybara.demo.comments.v2";

function toPublicUser(user: PublicUser): PublicUser {
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
  };
}

function sanitizeArticle(article: Article): Article {
  return { ...article, user: toPublicUser(article.user) };
}

function sanitizeComment(comment: Comment): Comment {
  return { ...comment, user: toPublicUser(comment.user) };
}

function getArticles(): Article[] {
  return readStored<Article[]>(ARTICLES_KEY, initialArticles).map(sanitizeArticle);
}

function getComments(): Comment[] {
  return readStored<Comment[]>(COMMENTS_KEY, initialComments).map(sanitizeComment);
}

function getWishlist(): WishlistEntry[] {
  return readStored<WishlistEntry[]>(WISHLIST_KEY, []);
}

function toggleWishlist(entry: WishlistEntry): WishlistEntry[] {
  const current = getWishlist();
  const index = current.findIndex(
    (item) => item.productCode === entry.productCode && item.optionId === entry.optionId,
  );
  const next = index >= 0
    ? current.filter((_, itemIndex) => itemIndex !== index)
    : [...current, entry];
  writeStored(WISHLIST_KEY, next);
  return next;
}

async function listSavedProducts(): Promise<SavedProduct[]> {
  return getWishlist().flatMap((entry) => {
    const product = mockProducts.find((item) => item.fin_prdt_cd === entry.productCode);
    const option = mockOptions.find((item) => item.id === entry.optionId);
    return product && option ? [{ ...entry, product, option }] : [];
  });
}

export const mockApi: DataApi = {
  async listProducts() {
    return structuredClone(mockProducts);
  },

  async getProduct(code) {
    return structuredClone(mockProducts.find((product) => product.fin_prdt_cd === code) ?? null);
  },

  async getOptions(code) {
    return structuredClone(mockOptions.filter((option) => option.fin_prdt_cd === code));
  },

  async recommend(preferences: RecommendationPreferences) {
    return structuredClone(rankProducts(mockProducts, mockOptions, preferences));
  },

  getWishlist,
  toggleWishlist,
  listSavedProducts,

  async listArticles() {
    return structuredClone(getArticles().sort((a, b) => b.id - a.id));
  },

  async getArticle(id): Promise<ArticleDetail | null> {
    const article = getArticles().find((item) => item.id === id);
    if (!article) return null;
    return structuredClone({
      article,
      comments: getComments().filter((comment) => comment.article === id),
    });
  },

  async createArticle(input) {
    const current = getArticles();
    const now = new Date().toISOString();
    const article: Article = {
      id: Math.max(0, ...current.map((item) => item.id)) + 1,
      user: demoPublicUser,
      title: input.title,
      content: input.content,
      image: null,
      created_at: now,
      updated_at: now,
      like_users: [],
    };
    writeStored(ARTICLES_KEY, [...current, article]);
    return structuredClone(article);
  },

  async createComment(articleId, content) {
    const current = getComments();
    const now = new Date().toISOString();
    const comment: Comment = {
      id: Math.max(0, ...current.map((item) => item.id)) + 1,
      user: demoPublicUser,
      article: articleId,
      parent_comment: null,
      content,
      created_at: now,
      updated_at: now,
      like_users: [],
    };
    writeStored(COMMENTS_KEY, [...current, comment]);
    return structuredClone(comment);
  },

  async deleteComment(articleId, commentId) {
    const next = getComments().filter(
      (comment) => !(comment.article === articleId && comment.id === commentId),
    );
    writeStored(COMMENTS_KEY, next);
  },

  async getQuotes() {
    return structuredClone(mockQuotes);
  },

  async searchBranches(filter: BranchFilter) {
    const normalized = (value?: string) => value?.trim() ?? "";
    return structuredClone(
      mockBranches.filter(
        (branch) =>
          (!normalized(filter.province) || branch.province === filter.province) &&
          (!normalized(filter.city) || branch.city === filter.city) &&
          (!normalized(filter.bank) || branch.bank === filter.bank),
      ),
    );
  },

  getCurrentUser() {
    return structuredClone(demoUser);
  },
};
