export type DataMode = "mock" | "real";

export type AccountExperienceSection =
  | "profile"
  | "login"
  | "signup"
  | "findpassword"
  | "modify"
  | "changepassword";

export interface DataSourceMeta {
  mode: DataMode;
  sourceLabel: string;
  globalNotice: string;
  providerLabel: string;
  catalogDefaultSummary: string;
  recommendationDisclaimer: string;
  communityIntro: string;
  communityWriteNotice: string;
  communityCommentLabel: string;
  currencyIntro: string;
  currencyBadge: string;
  branchIntro: string;
  branchSummaryLabel: string;
  branchMapLabel: string;
  branchAttribution: string;
  account: {
    label: string;
    notice: string;
    actionLabel: string;
    descriptions: Record<AccountExperienceSection, string>;
  };
}

export interface DepositProduct {
  id: number;
  dcls_month: string;
  fin_prdt_cd: string;
  kor_co_nm: string;
  fin_prdt_nm: string;
  etc_note: string;
  join_deny: number;
  join_member: string;
  join_way: string;
  spcl_cnd: string;
}

export interface DepositOption {
  id: number;
  dcls_month: string;
  product: number;
  fin_prdt_cd: string;
  intr_rate_type_nm: string;
  intr_rate: number;
  intr_rate2: number;
  save_trm: number;
}

export interface DemoUser {
  id: number;
  username: string;
  nickname: string;
  email: string;
}

export interface PublicUser {
  id: number;
  username: string;
  nickname: string;
}

export interface Article {
  id: number;
  user: PublicUser;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  like_users: number[];
}

export interface Comment {
  id: number;
  user: PublicUser;
  article: number;
  parent_comment: number | null;
  content: string;
  created_at: string;
  updated_at: string;
  like_users: number[];
}

export interface ArticleDetail {
  article: Article;
  comments: Comment[];
}

export interface RecommendationPreferences {
  term: number;
  priority: "base" | "bonus" | "flexibility";
  channel: "any" | "online" | "branch";
}

export interface Recommendation {
  product: DepositProduct;
  option: DepositOption;
  score: number;
  reasons: string[];
}

export interface WishlistEntry {
  productCode: string;
  optionId: number;
}

export interface SavedProduct extends WishlistEntry {
  product: DepositProduct;
  option: DepositOption;
}

export interface CurrencyQuote {
  code: "KRW" | "USD" | "JPY" | "EUR" | "CNY";
  name: string;
  wonPerUnit: number;
  unit: number;
}

export interface BankBranch {
  id: number;
  bank: string;
  province: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  x: number;
  y: number;
}

export interface BranchFilter {
  province?: string;
  city?: string;
  bank?: string;
}

export interface DataApi {
  listProducts(): Promise<DepositProduct[]>;
  getProduct(code: string): Promise<DepositProduct | null>;
  getOptions(code: string): Promise<DepositOption[]>;
  recommend(preferences: RecommendationPreferences): Promise<Recommendation[]>;
  getWishlist(): WishlistEntry[];
  toggleWishlist(entry: WishlistEntry): WishlistEntry[];
  listSavedProducts(): Promise<SavedProduct[]>;
  listArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<ArticleDetail | null>;
  createArticle(input: Pick<Article, "title" | "content">): Promise<Article>;
  createComment(articleId: number, content: string): Promise<Comment>;
  deleteComment(articleId: number, commentId: number): Promise<void>;
  getQuotes(): Promise<CurrencyQuote[]>;
  searchBranches(filter: BranchFilter): Promise<BankBranch[]>;
  getCurrentUser(): DemoUser;
}
