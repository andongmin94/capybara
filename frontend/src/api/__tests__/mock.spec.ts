import { afterEach, describe, expect, it, vi } from "vitest";
import { mockApi } from "../mock";
import { initialArticles, initialComments } from "../mockData";
import { getStorage } from "../storage";

const WISHLIST_KEY = "capybara.demo.wishlist.v2";
const ARTICLES_KEY = "capybara.demo.articles.v2";
const COMMENTS_KEY = "capybara.demo.comments.v2";

afterEach(() => {
  getStorage().removeItem(WISHLIST_KEY);
  getStorage().removeItem(ARTICLES_KEY);
  getStorage().removeItem(COMMENTS_KEY);
  vi.unstubAllGlobals();
});

describe("mockApi", () => {
  it("기존 Django 상품·옵션 응답 필드를 유지한다", async () => {
    const [product] = await mockApi.listProducts();
    const [option] = await mockApi.getOptions(product.fin_prdt_cd);

    expect(product).toMatchObject({
      id: expect.any(Number),
      dcls_month: expect.any(String),
      fin_prdt_cd: expect.any(String),
      kor_co_nm: expect.any(String),
      fin_prdt_nm: expect.any(String),
      etc_note: expect.any(String),
      join_deny: expect.any(Number),
      join_member: expect.any(String),
      join_way: expect.any(String),
      spcl_cnd: expect.any(String),
    });
    expect(option).toMatchObject({
      id: expect.any(Number),
      dcls_month: expect.any(String),
      product: product.id,
      fin_prdt_cd: product.fin_prdt_cd,
      intr_rate_type_nm: expect.any(String),
      intr_rate: expect.any(Number),
      intr_rate2: expect.any(Number),
      save_trm: expect.any(Number),
    });
  });

  it("게시글과 댓글의 공개 사용자는 id·username·nickname만 반환한다", async () => {
    const legacyArticle = {
      ...initialArticles[0],
      user: { ...initialArticles[0].user, email: "legacy@example.test" },
    };
    const legacyComment = {
      ...initialComments[0],
      user: { ...initialComments[0].user, email: "legacy@example.test" },
    };
    getStorage().setItem(ARTICLES_KEY, JSON.stringify([legacyArticle]));
    getStorage().setItem(COMMENTS_KEY, JSON.stringify([legacyComment]));

    const [article] = await mockApi.listArticles();
    const detail = await mockApi.getArticle(article.id);

    expect(Object.keys(article.user).sort()).toEqual(["id", "nickname", "username"]);
    expect(Object.keys(detail?.article.user ?? {}).sort()).toEqual([
      "id",
      "nickname",
      "username",
    ]);
    expect(Object.keys(detail?.comments[0].user ?? {}).sort()).toEqual([
      "id",
      "nickname",
      "username",
    ]);
    expect(article.user).not.toHaveProperty("email");
    expect(detail?.comments[0].user).not.toHaveProperty("email");
  });

  it("mock 기능을 사용하는 동안 네트워크를 호출하지 않는다", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const products = await mockApi.listProducts();
    await mockApi.getProduct(products[0].fin_prdt_cd);
    await mockApi.getOptions(products[0].fin_prdt_cd);
    await mockApi.recommend({ term: 12, priority: "bonus", channel: "any" });
    await mockApi.getQuotes();
    await mockApi.searchBranches({ province: "서울특별시" });

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("찜 추가와 삭제 상태를 저장소에 유지한다", () => {
    const entry = { productCode: "CAPY-REST-12", optionId: 11 };

    expect(mockApi.toggleWishlist(entry)).toContainEqual(entry);
    expect(mockApi.getWishlist()).toContainEqual(entry);
    expect(mockApi.toggleWishlist(entry)).not.toContainEqual(entry);
  });

  it("새 글과 댓글 작성·삭제를 같은 응답 계약으로 재현한다", async () => {
    const article = await mockApi.createArticle({
      title: "비교 기준 기록",
      content: "기간과 가입 방식을 함께 확인했어요.",
    });
    const comment = await mockApi.createComment(article.id, "좋은 기준이에요.");
    const detail = await mockApi.getArticle(article.id);

    expect(detail?.article).toEqual(article);
    expect(detail?.comments).toContainEqual(comment);
    expect(Object.keys(article.user).sort()).toEqual(["id", "nickname", "username"]);
    expect(Object.keys(comment.user).sort()).toEqual(["id", "nickname", "username"]);

    await mockApi.deleteComment(article.id, comment.id);
    expect((await mockApi.getArticle(article.id))?.comments).toHaveLength(0);
  });
});
