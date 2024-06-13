<template>
  <v-app>
      <router-view />
      <v-app-bar v-if="$route.path !=='/register' && $route.path !=='/login'" :elevation="2" rounded>

        <v-app-bar-title style="font-size:16px;">Budget Planner 1.0</v-app-bar-title>

        <!-- Adding links to the app bar -->
        <v-spacer></v-spacer>
        <router-link to="/dashboard">
          <v-btn color="black">Home</v-btn>
        </router-link>
        <router-link to="/budget">
          <v-btn color="black">Budget</v-btn>
        </router-link>
        <v-btn @click="logOut">Logout</v-btn>
<!--        <router-link to="/settings">-->
<!--          <v-btn color="black">Settings</v-btn>-->
<!--        </router-link>-->
      </v-app-bar>
  </v-app>
</template>

<script>
import {mapState} from "vuex";

export default{
  data(){
    return{

    }
  },
  methods:{
    logOut(){
    console.log('pressed');
    this.$store.dispatch('logout').then(res =>{
      console.log(res);
      if (res) {
        this.$router.push('/login');
      }
    });
    },
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      token: state => state.token,
      types: state => state.types,
      categories: state => state.categories
    })
  },

}
</script>
