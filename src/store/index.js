import { createStore } from 'vuex'

export default createStore({

  state: {
    loggedIn: false,
    searchItem: "",
    user: {
      userID: "",
    }
  },
  mutations: {
    login(state,data) {
      state.loggedIn = true;
      state.user.userID = data.userID;
    },
    logout(state) {
      state.loggedIn = false;
      state.user.userID = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
