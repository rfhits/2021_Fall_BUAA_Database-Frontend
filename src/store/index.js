import { createStore } from 'vuex'

export default createStore({

  state: {
    loggedIn: false,
    searchItem: "",
    user: {
      nickname: "",
      username: '100',
    }
  },
  mutations: {
    login(state,data) {
      state.loggedIn = true;
      state.user.username = data.username;
    },
    logout(state) {
      state.loggedIn = false;
      state.user.username = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
