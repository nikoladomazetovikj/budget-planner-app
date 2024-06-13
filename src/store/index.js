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
    userId: null,
    budgets: [],
    monthlyBudgets: [],
    types:[],
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
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    SET_BUDGETS(state, budgets) {
      state.budgets = budgets;
    },
    SET_MONTHLY_BUDGETS(state, budgets) {
      state.monthlyBudgets = budgets;
    },
    SET_TYPES(state, types) {
      state.types = types;
    },
  },
  actions: {
    updateScreenHeight({ commit }) {
      commit('SET_SCREEN_HEIGHT', window.innerHeight - 800);
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/Account/register`, userData);
        if (response.data.status === "Success") {
          const { token, name, userId } = response.data;
          commit('SET_USER', name);
          commit('SET_TOKEN', token);
          commit('SET_USER_ID', userId);
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
          const { token, name, userId } = response.data;
          commit('SET_USER', name);
          commit('SET_TOKEN', token);
          commit('SET_USER_ID', userId);
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
      commit('SET_USER_ID', null);
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
    async fetchTypes({ commit, state }) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Type`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });

        if (response.data && response.data.types && response.data.types.$values) {
          commit('SET_TYPES', response.data.types.$values);
          console.log('Types:', response.data.types.$values);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching types:', error);
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
    userId: (state) => {
      return state.userId;
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
