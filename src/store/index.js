import { createStore } from 'vuex'

export default createStore({

  state: {
    loggedIn: false,
    searchItem: "",
    csrftoken: "",
    user: {
      nickname: "DefaultNickname",
      username: 'DefaultUsername',
      gender: '0',
      avatarUrl: "https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png"
    }
  },
  mutations: {
    login(state,data) {
      state.loggedIn = true;
      state.user.username = data.username;
      state.user.nickname = data.nickname;
      state.user.gender = data.gender
      state.user.avatarUrl = data.avatarUrl;
    },
    logout(state) {
      state.loggedIn = false;
      state.user.username = '';
    },
    setAvatarUrl(state, data) {
      state.user.avatarUrl = data.avatarUrl;
    },
    setInfo(state, data) {
      state.user.nickname = data.nickname;
      state.user.gender = data.gender;
    }
  },
  actions: {
  },
  modules: {
  }
})
