<template>
  <v-app>
      <router-view />
      <v-app-bar v-if="$route.path !=='/register' && $route.path !=='/login'" :elevation="2" rounded>
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title style="font-size:16px;">Budget Planner 1.0</v-app-bar-title>

        <!-- Adding links to the app bar -->
        <v-spacer></v-spacer>
        <router-link to="/dashboard">
          <v-btn color="black">Home</v-btn>
        </router-link>
        <router-link to="/budget">
          <v-btn color="black">Budget</v-btn>
        </router-link>
        <router-link to="/settings">
          <v-btn color="black">Settings</v-btn>
        </router-link>
      </v-app-bar>
  </v-app>
</template>

<script setup>
// import Login from '@/components/Login.vue'
// import Signin from '@/components/Register.vue'
</script>
