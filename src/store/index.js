import { createStore } from 'vuex'

const store = createStore({
  state: {
    categories: 10,
    screenHeight: window.innerHeight - 200,
    pageSize: { height: 1000, width: 500 }
  },
  mutations: {
    GET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_SCREEN_HEIGHT(state, height) {
      state.screenHeight = height;
    }
  },
  actions: {
    updateScreenHeight({ commit }) {
      commit('SET_SCREEN_HEIGHT', window.innerHeight - 800);
    }
  },
  getters: {
    appName(state) {
      return state.appName;
    },
    pageHeight: (state) => {
      return state.screenHeight + 'px';
    },
  }
});

export default store;
