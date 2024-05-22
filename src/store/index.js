import {createStore} from 'vuex'

const store = createStore({
  state:{
    categories:10
  },
  mutations:{
    GET_CATEGORIES (state, payload) {
      state.categories = payload;
    },
  },
  getters:{
    appName(state){
      return state.appName
    }
  }
})
export default store
