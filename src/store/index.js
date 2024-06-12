import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    categories: 10,
    screenHeight: window.innerHeight - 200,
    pageSize: { height: 1000, width: 500 },
    user: null,
    token: null,
  },
  mutations: {
    GET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_SCREEN_HEIGHT(state, height) {
      state.screenHeight = height;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    updateScreenHeight({ commit }) {
      commit('SET_SCREEN_HEIGHT', window.innerHeight - 800);
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('https://localhost:44333/api/Account/register', userData);
        if (response.data.status === "Success") {
          const { token, name: user } = response.data;
          commit('SET_USER', user);
          commit('SET_TOKEN', token);
          return { success: true };
        } else {
          return { success: false, message: response.data.message };
        }
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
  },
  getters: {
    appName(state) {
      return state.appName;
    },
    pageHeight: (state) => {
      return state.screenHeight + 'px';
    },
  },
});

export default store;
