<template>
  <v-container class="d-flex align-center justify-center full-height">
    <v-card color='white' elevation='10' width='400' height='450'>
      <h5 style='font-size:20px;' class='text-center pa-3'>Log in To Your Account</h5>
      <v-row dense class='mt-5'>
        <v-col cols="9" style='margin-left:50px;'>
          <v-text-field
            label="Username"
            variant="outlined"
            class='mt-5'
            color='blue'
            density='compact'
          ></v-text-field>
        </v-col>
        <v-col cols="9" style='margin-left:50px;'>
          <v-text-field
            label="Password"
            color='blue'
            variant="outlined"
            density='compact'
          ></v-text-field>
        </v-col>
      </v-row>
      <div class='d-flex align-center justify-center mt-6'>
        <v-btn width='300' style='font-size:16px;' base-color='blue'>Login</v-btn>
      </div>
      <div class='mt-10'>
        <p class='text-center' style='font-size:17px;'>Don't Have An Account? <router-link to="/register">Register</router-link></p>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>

</script>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
