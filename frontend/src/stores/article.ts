import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
import { couldStartTrivia } from "typescript";

export const useArticleStore = defineStore("article", () => {
  const router = useRouter();
  const articles = ref([]);
  const API_URL = "http://127.0.0.1:8000";
  const token = ref(null);

  const search_username = ref(null);
  const user_data = ref(null);
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
        logIn({ username, password });
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
        search_username.value = username;
        console.log(search_username);
        user_data.value = res.data;
        router.push({ name: "home" });
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
        router.push({ name: "home" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createComments = function (payload: any) {
    console.log('router', payload)
    axios({
      method: 'post',
      url: `${API_URL}/articles/comment/${payload.article_pk}/${payload.parent_pk}/`,
      data: {
        content: payload.content,
      },
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then((res) => {
        // console.log(res)
        console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const get_user_data = function (search_username:any, errorCallback:any) {
    axios({
      method: 'get',
      url: `${API_URL}/accounts/profile/get_user_data/${search_username}`,
    })
      .then(res => {
          console.log(res.data)
          user_data.value = res.data;
      })
      .catch(err => {
        alert('없는 사용자입니다.')
        errorCallback();
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
    get_user_data,
    search_username,
    createComments,
    user_data,
  };
});
