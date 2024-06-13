import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    categories: 10,
    screenHeight: window.innerHeight - 200,
    pageSize: { height: 1000, width: 500 },
    user: null,
    token: null,
    budgets: [],
    monthlyBudgets: []
  },
  mutations: {
    SET_CATEGORIES(state, payload) {
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
    SET_BUDGETS(state, budgets) {
      state.budgets = budgets;
    },
    SET_MONTHLY_BUDGETS(state, budgets) {
      state.monthlyBudgets = budgets;
    }
  },
  actions: {
    updateScreenHeight({ commit }) {
      commit('SET_SCREEN_HEIGHT', window.innerHeight - 800);
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/Account/register`, userData);
        if (response.data.status === "Success") {
          const { token, name } = response.data;
          commit('SET_USER', name);
          commit('SET_TOKEN', token);
          return { success: true };
        } else {
          return { success: false, message: response.data.message };
        }
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
    async login({ commit }, userData) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/Account/login`, userData);
        if (response.data.message === "Logged in successfully") {
          const { token, name } = response.data;
          commit('SET_USER', name);
          commit('SET_TOKEN', token);
          return { success: true };
        } else {
          return { success: false, message: response.data.message };
        }
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
    logout({ commit }) {
      commit('SET_USER', null);
      commit('SET_TOKEN', null);
    },
    async fetchBudgets({ commit, state }) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Budget`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        commit('SET_BUDGETS', response.data.budgets.$values);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    },
    async fetchMonthlyBudgets({ commit, state }, { startDate, endDate }) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Budget/filter/daterange`, {
          params: {
            startDate,
            endDate
          },
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        commit('SET_MONTHLY_BUDGETS', response.data.budgets.$values);
      } catch (error) {
        console.error('Error fetching monthly budgets:', error);
      }
    }
  },
  getters: {
    appName(state) {
      return state.appName;
    },
    pageHeight: (state) => {
      return state.screenHeight + 'px';
    },
    isLoggedIn: (state) => {
      return !!state.token;
    },
    userName: (state) => {
      return state.user;
    },
    budgets: (state) => {
      return state.budgets;
    },
    monthlyBudgets: (state) => {
      return state.monthlyBudgets;
    }
  },
  plugins: [createPersistedState()],
});

export default store;
