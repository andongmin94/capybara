import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const useCommunityStore = defineStore("community", () => {
  const API_URL = "http://127.0.0.1:8000";
  const router = useRouter();
  const articles = ref([]);
  const token = ref(null);
  const search_username = ref(null);
  const user_data: any = ref(null);

  const isLogin = computed(() => {
    if (token.value === null) {
      return false;
    } else {
      return true;
    }
  });

  const signUp = function (payload: any) {
    const { username, nickname, email, password1, password2 } = payload;

    axios({
      method: "post",
      url: `${API_URL}/accounts/signup/`,
      data: {
        username,
        nickname,
        email,
        password1,
        password2,
      },
    })
      .then((res) => {
        console.log("가입 성공");
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
        console.log(token.value);
        search_username.value = username;
        console.log(search_username);
        router.push({ name: "home" });
      })
      .catch((err) => {
        console.log(err);
        alert("아이디 또는 비밀번호가 틀렸습니다.");
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

  const editProfile = function (payload: any) {
    const { nickname, email } = payload;
    axios({
      method: "put",
      url: `${API_URL}/accounts/profile/edit/`,
      headers: {
        Authorization: `Token ${token.value}`,
      },
      data: {
        nickname,
        email,
      },
    })
      .then((res) => {
        console.log(res.data);
        alert("프로필이 수정되었습니다.");
        router.go(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePassword = function (payload: any) {
    const { old_password, new_password1, new_password2 } = payload;
    axios({
      method: "post",
      url: `${API_URL}/accounts/password/change/`,
      headers: {
        Authorization: `Token ${token.value}`,
      },
      data: {
        old_password,
        new_password1,
        new_password2,
      },
    })
      .then(() => {
        console.log("비밀번호 변경 성공");
        alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
        logOut();
      })
      .catch(() => {
        console.log("비밀번호 변경 실패");
        alert("뭔가 잘못되었으니까 다시 하세요.");
      });
  };

  const get_user_data = function (search_username: any, errorCallback: any) {
    axios({
      method: "get",
      url: `${API_URL}/accounts/profile/get_user_data/${search_username}`,
    })
      .then((res) => {
        user_data.value = res.data;
      })
      .catch(() => {
        alert("없는 사용자입니다.");
        errorCallback();
      });
  };

  // DRF에 article 조회 요청을 보내는 action
  const getArticles = function () {
    axios({
      method: "get",
      url: `${API_URL}/articles/`,
      headers: {
        Authorization: `Token ${token.value}`,
      },
    })
      .then((res) => {
        articles.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createComments = function (payload: any) {
    console.log("router", payload);
    axios({
      method: "post",
      url: `${API_URL}/articles/comment/${payload.article_pk}/${payload.parent_pk}/`,
      data: {
        content: payload.content,
      },
      headers: {
        Authorization: `Token ${token.value}`,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        router.go(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = function (payload: any) {
    return new Promise(() => {
      axios({
        method: "delete",
        url: `${API_URL}/articles/comment/${payload.article_pk}/${payload.comment_pk}/delete/`,
        headers: {
          Authorization: `Token ${token.value}`,
        },
      })
        .then(() => {
          alert("댓글이 삭제되었습니다.");
          router.go(-1);
        })
        .catch((err) => {
          console.error(err);
          alert("댓글 삭제에 실패했습니다.");
        });
    });
  };

  return {
    articles,
    API_URL,
    token,
    isLogin,
    search_username,
    user_data,
    signUp,
    logIn,
    logOut,
    get_user_data,
    editProfile,
    changePassword,
    getArticles,
    createComments,
    deleteComment,
  };
});
