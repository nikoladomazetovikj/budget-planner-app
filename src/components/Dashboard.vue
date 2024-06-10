<template>
  <v-card>
    <v-layout>
      <v-app-bar :elevation="2" rounded>
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title style="font-size:16px;">Budget Planner 1.0</v-app-bar-title>

        <!-- Adding links to the app bar -->
        <v-spacer></v-spacer>
        <router-link to="/dashboard">
          <v-btn color="black">Home</v-btn>
        </router-link>
        <router-link to="/expenses">
          <v-btn color="black">Expenses</v-btn>
        </router-link>
        <router-link to="/manageExpenses">
          <v-btn color="black">Manage Expenses</v-btn>
        </router-link>
        <router-link to="/income">
          <v-btn color="black">Income</v-btn>
        </router-link>
        <router-link to="/settings">
          <v-btn color="black">Settings</v-btn>
        </router-link>
      </v-app-bar>

      <v-main>
      </v-main>
    </v-layout>
  </v-card>
<div style="width:95%; margin:auto; padding:20px;">
  <div class="d-flex align-center">
    <v-icon class="mt-n1">mdi-account</v-icon>
    <h3>Hello User , Leo</h3>
    <div></div>
  </div>
  <div>Here are going to be The Expenses</div>

  <v-data-table  :items="data" hide-default-header>
  <template v-slot:item="{item}">
    <tr>
      <td>{{item}}</td>
    </tr>
  </template>
  </v-data-table>

</div>
</template>

<script>
export default {
  name: 'BudgetPlanner',
  data(){
    return{
      data:["Home","Car","Electricity","Vacation"]
    }
  },
  methods:{

  },
  computed:{

  },
};
</script>

<style scoped>
</style>
