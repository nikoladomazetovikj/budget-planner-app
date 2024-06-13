<template>
  <v-card class="mt-16">
    <!-- App Bar code is commented out -->
  </v-card>
  <div class="pa-10">
    <div class="d-flex align-center ml-3">
      <v-icon class="mt-n1">mdi-account</v-icon>
      <h3>Hello User, {{ userName }}</h3>
    </div>
    <div class="ml-3 font-weight-bold">Daily Expenses</div>
    <v-row>
      <v-col cols="6">
        <v-data-table height="500" :items="incomes" style="cursor:pointer">
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.typeName }}</td>
            </tr>
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
        <v-data-table height="400" :items="expenses" style="cursor:pointer">
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.typeName }}</td>
            </tr>
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

export default {
  name: 'BudgetPlanner',
  components: {
    Pie,
    Graph
  },
  data() {
    return {};
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
      return this.budgets.filter(budget => budget.typeName === 'Income');
    },
    expenses() {
      return this.monthlyBudgets.filter(budget => budget.typeName === 'Expense');
    }
  },
  methods: {
    ...mapActions(['fetchBudgets', 'fetchMonthlyBudgets', 'updateScreenHeight']),
    async loadBudgets() {
      await this.fetchBudgets();
      await this.fetchMonthlyBudgets({ startDate: '2024-06-01', endDate: '2024-06-30' });
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
