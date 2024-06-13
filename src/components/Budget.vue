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
      <v-col cols="12" class="d-flex align-center justify-center mt-16">
        <v-card height="600" width="700">
          <v-card-title class="text-center">Create A Budget Data</v-card-title>
          <v-form @submit.prevent="saveIncome">
            <v-text-field v-model="income.name" variant="outlined" class="px-2" density="compact" label="Budget Name"></v-text-field>
            <v-textarea v-model="income.description" no-resize variant="outlined" class="px-2" density="compact" label="Budget Description"></v-textarea>
            <v-text-field v-model="income.price" variant="outlined" class="px-2" density="compact" label="Budget Amount" type="number"></v-text-field>
            <v-select
              v-model="income.categoryId"
              :items="categories"
              item-value="id"
              item-title="name"
              label="Category"
              variant="outlined"
              class="px-2"
              density="compact"
            ></v-select>
            <v-select
              v-model="income.typeId"
              :items="types"
              item-value="id"
              item-title="name"
              label="Type"
              variant="outlined"
              class="px-2"
              density="compact"
            ></v-select>
            <v-btn type="submit" width="200"  color="primary" class="justify-center float-end">Save</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import {mapActions, mapState} from 'vuex';

export default {
  data() {
    return {
      income: {
        name: '',
        description: '',
        onDate: new Date().toISOString(),
        categoryId: null,
        typeId: null,
        price: null,
        userId: '',
      },
    };
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      token: state => state.token,
      types: state => state.types,
      categories: state => state.categories
    })
  },
  methods: {
    ...mapActions(['fetchBudgets', 'fetchMonthlyBudgets', 'updateScreenHeight']),
    async loadBudgets() {
      await this.fetchBudgets();
      const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
      const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];
      await this.fetchMonthlyBudgets({ startDate, endDate });
    },
    async saveIncome() {
      try {
        this.income.categoryId = Number(this.income.categoryId);
        this.income.typeId = Number(this.income.typeId);
        this.income.price = Number(this.income.price)
        this.income.userId = this.userId;
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/Budget`, this.income, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.$router.push('/dashboard').then(res=>{
          this.loadBudgets().then( res=>{
            console.log(res);
            window.location.reload();
            }
          );
          console.log(res);
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
  async mounted() {
    await this.$store.dispatch('fetchTypes');
    await this.$store.dispatch('fetchCategories');
  }
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
