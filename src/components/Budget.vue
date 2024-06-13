<template>
  <v-card class="mt-16">
    <!-- App Bar code is commented out -->
  </v-card>
  <div class="pa-12">
    <div class="d-flex align-center ml-3">
      <v-icon class="mt-n1">mdi-book-plus</v-icon>
      <h3 class="ml-2">Create Budget</h3>
    </div>
    <v-row>
      <v-col cols="12">
        <v-card height="600">
          <v-card-title class="text-center">Create A Budget Data</v-card-title>
          <v-form @submit.prevent="saveIncome">
            <v-text-field v-model="income.name" variant="outlined" class="px-2" density="compact" label="Budget Name"></v-text-field>
            <v-textarea v-model="income.description" no-resize variant="outlined" class="px-2" density="compact" label="Budget Description"></v-textarea>
            <v-text-field v-model="income.price" variant="outlined" class="px-2" density="compact" label="Budget Amount" type="number"></v-text-field>
            <v-select
              v-model="income.categoryId"
              :items="categories"
              item-value="id"
              item-text="name"
              label="Category"
              variant="outlined"
              class="px-2"
              density="compact"
            ></v-select>
            <v-select
              v-model="income.typeId"
              :items="types"
              item-value="id"
              item-text="name"
              label="Type"
              variant="outlined"
              class="px-2"
              density="compact"
            ></v-select>
            <v-btn type="submit" color="primary" class="float-right mt-4">Save</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      income: {
        name: '',
        description: '',
        onDate: new Date().toISOString(),
        categoryId: null,
        typeId: null,
        price: 0,
        userId: ''
      },
      categories: [],
      types: []
    };
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      token: state => state.token
    })
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Category`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.categories = response.data.categories.$values;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchTypes() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Type`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.types = response.data.types.$values;
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    },
    async saveIncome() {
      try {
        this.income.userId = this.userId;
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/Budget`, this.income, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.resetForm();
      } catch (error) {
        console.error('Error saving income:', error);
      }
    },
    resetForm() {
      this.income = {
        name: '',
        description: '',
        onDate: new Date().toISOString(),
        categoryId: null,
        typeId: null,
        price: 0,
        userId: this.userId
      };
    }
  },
  created() {
    this.fetchCategories();
    this.fetchTypes();
  }
};
</script>

<style scoped>
</style>
