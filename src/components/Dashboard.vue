<template>
  <v-card class="mt-16">
    <!-- App Bar code is commented out -->
  </v-card>
  <div class="pa-10">
    <div class="d-flex align-center ml-3">
      <v-icon class="mt-n1">mdi-account</v-icon>
      <h3>Hello User, {{ userName }}</h3>
    </div>
    <div class="ml-3 font-weight-bold">Monthly Incomes</div>
    <v-row>
      <v-col cols="6">
        <v-data-table
          height="500"
          :items="incomes"
          :headers="incomeHeaders"
          style="cursor:pointer"
        >
          <template v-slot:item.action="{ item }">
            <v-btn color="red" @click="deleteBudget(item.$id)">Delete</v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="6">
        <graph :items="incomes"></graph>
      </v-col>
      <div class="ml-6 font-weight-bold">Monthly Expenses</div>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-data-table
          height="400"
          :items="expenses"
          :headers="expenseHeaders"
          style="cursor:pointer"
        >
          <template v-slot:item.action="{ item }">
            <v-btn color="red" @click="deleteBudget(item.$id)">Delete</v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="6">
        <div style="margin-left:100px;">
          <pie :items="expenses"></pie>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Graph from './Graph.vue';
import Pie from "@/components/Pie.vue";
import axios from 'axios';

export default {
  name: 'BudgetPlanner',
  components: {
    Pie,
    Graph
  },
  data() {
    return {
      incomeHeaders: [
        { text: 'Name', value: 'name', sortable: true},
        { text: 'Description', value: 'description', sortable: true },
        { text: 'Category', value: 'categoryName', sortable: true },
        { text: 'Type', value: 'typeName' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      expenseHeaders: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Description', value: 'description', sortable: true },
        { text: 'Category', value: 'categoryName', sortable: true },
        { text: 'Type', value: 'typeName' },
        { text: 'Action', value: 'action', sortable: false }
      ]
    };
  },
  computed: {
    ...mapState({
      categories: state => state.categories
    }),
    ...mapGetters({
      pageHeight: 'pageHeight',
      budgets: 'budgets',
      monthlyBudgets: 'monthlyBudgets',
      userName: 'userName'
    }),
    incomes() {
      return this.monthlyBudgets.filter(budget => budget.typeName === 'Income');
    },
    expenses() {
      return this.monthlyBudgets.filter(budget => budget.typeName === 'Expense');
    }
  },
  methods: {
    ...mapActions(['fetchBudgets', 'fetchMonthlyBudgets', 'updateScreenHeight']),
    async loadBudgets() {
      await this.fetchBudgets();
      const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
      const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];
      await this.fetchMonthlyBudgets({ startDate, endDate });
    },
    async deleteBudget(id) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/Budget/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });
        this.loadBudgets();
      } catch (error) {
        console.error('Error deleting budget:', error);
      }
    }
  },
  created() {
    window.addEventListener('resize', this.updateScreenHeight);
    this.updateScreenHeight();
    this.loadBudgets();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenHeight);
  },
  mounted() {
    console.log('page :  ', this.budgets);
  }
};
</script>
