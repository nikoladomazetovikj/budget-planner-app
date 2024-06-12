<template>
  <v-container class="d-flex align-center justify-center full-height">
    <v-card color="white" elevation="10" width="400" height="450">
      <h5 style="font-size:20px;" class="text-center pa-3">Create An Account</h5>
      <v-row dense class="mt-5">
        <v-col cols="9" style="margin-left:50px;">
          <v-text-field
            v-model="email"
            label="E-mail"
            variant="outlined"
            class="mt-5"
            color="blue"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="9" style="margin-left:50px;">
          <v-text-field
            v-model="password"
            label="Password"
            color="blue"
            variant="outlined"
            density="compact"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex align-center justify-center mt-6">
        <v-btn @click="handleRegister" width="300" style="font-size:16px;" base-color="blue">Register</v-btn>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['register']),
    async handleRegister() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      const result = await this.register(userData);
      if (result.success) {
        this.$router.push('/dashboard');
      } else {
        this.errorMessage = result.message;
      }
    },
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories,
    }),
  },
  mounted() {
    console.log('Categories:', this.categories);
  },
};
</script>

<style scoped>
.full-height {
  height: 100vh;
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>
