import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";

export const useArticleStore = defineStore("article", () => {
  const router = useRouter();
  const articles = ref([]);
  const API_URL = "http://127.0.0.1:8000";
  const token = ref(null);
  const isLogin = computed(() => {
    if (token.value === null) {
      return false;
    } else {
      return true;
    }
  });

  // DRF에 article 조회 요청을 보내는 action
  const getArticles = function () {
    axios({
      method: "get",
      url: `${API_URL}/api/v1/articles/`,
      headers: {
        Authorization: `Token ${token.value}`,
      },
    })
      .then((res) => {
        // console.log(res)
        articles.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUp = function (payload: any) {
    const { username, email, password1, password2 } = payload;

    axios({
      method: "post",
      url: `${API_URL}/accounts/signup/`,
      data: {
        username,
        email,
        password1,
        password2,
      },
    })
      .then((res) => {
        console.log('가입 성공');
        const password = password1;
        // logIn({ username, password });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logIn = function (payload: any) {
    const { username, password } = payload;

    axios({
      method: "post",
      url: `${API_URL}/accounts/login/`,
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        console.log(res.data);
        token.value = res.data.key;
        router.push({ name: "article" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = function () {
    axios({
      method: "post",
      url: `${API_URL}/accounts/logout/`,
    })
      .then((res) => {
        token.value = null;
        router.push({ name: "ArticleView" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    articles,
    API_URL,
    getArticles,
    signUp,
    logIn,
    token,
    isLogin,
    logOut,
  };
});
