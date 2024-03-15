import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { dataApi } from "@/api";
import type { DepositProduct, WishlistEntry } from "@/api";

export const useDemoStore = defineStore("demo", () => {
  const products = ref<DepositProduct[]>([]);
  const wishlist = ref<WishlistEntry[]>(dataApi.getWishlist());
  const isLoadingProducts = ref(false);
  const productsLoaded = ref(false);
  const notice = ref("");
  let noticeTimer: ReturnType<typeof setTimeout> | undefined;

  const currentUser = dataApi.getCurrentUser();
  const wishlistCount = computed(() => wishlist.value.length);

  async function loadProducts(): Promise<DepositProduct[]> {
    if (productsLoaded.value) return products.value;
    isLoadingProducts.value = true;
    try {
      products.value = await dataApi.listProducts();
      productsLoaded.value = true;
      return products.value;
    } finally {
      isLoadingProducts.value = false;
    }
  }

  function isSaved(productCode: string, optionId: number): boolean {
    return wishlist.value.some(
      (item) => item.productCode === productCode && item.optionId === optionId,
    );
  }

  function announce(message: string): void {
    notice.value = message;
    if (noticeTimer) clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => {
      notice.value = "";
    }, 2200);
  }

  function toggleSaved(productCode: string, optionId: number): void {
    const wasSaved = isSaved(productCode, optionId);
    wishlist.value = dataApi.toggleWishlist({ productCode, optionId });
    announce(wasSaved ? "찜 목록에서 뺐어요." : "찜 목록에 담았어요.");
  }

  function refreshWishlist(): void {
    wishlist.value = dataApi.getWishlist();
  }

  return {
    currentUser,
    products,
    wishlist,
    wishlistCount,
    isLoadingProducts,
    notice,
    loadProducts,
    isSaved,
    toggleSaved,
    refreshWishlist,
  };
});
