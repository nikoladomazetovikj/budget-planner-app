<template>
  <v-card class="mt-16">
    <!-- App Bar code is commented out -->
  </v-card>
  <div class="pa-10">
    <div class="d-flex align-center ml-3">
      <v-icon class="mt-n1">mdi-account</v-icon>
      <h3>Hello User, Leo</h3>
    </div>
    <div class="ml-3">Monthly Expenses</div>
<v-row>
  <v-col cols="6">
    <v-data-table height="500" :items="items" style="cursor:pointer">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.Description }}</td>
          <td>{{ item.ExpenseType }}</td>
          <td>{{ item.Expense }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-col>
  <v-col cols="6">
    <graph :items="items"></graph>
  </v-col>
</v-row>

    <v-row>
      <v-col cols="6">
        <v-data-table  height="400" :items="items" style="cursor:pointer">
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.Description }}</td>
              <td>{{ item.ExpenseType }}</td>
              <td>{{ item.Expense }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="6">
        <div style="margin-left:100px;">
          <pie :items="items"></pie>
        </div>

      </v-col>
    </v-row>

  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Graph from './Graph.vue';
import Pie from "@/components/Pie.vue";

export default {
  name: 'BudgetPlanner',
  components: {
    Pie,
    Graph
  },
  data() {
    return {
      items: [
        { name: 'Event 1', Description: 'Description 1', ExpenseType: 'Food', Expense: 300 },
        { name: 'Event 2', Description: 'Description 2', ExpenseType: 'Travel', Expense: 200 },
        { name: 'Event 3', Description: 'Description 3', ExpenseType: 'Rent', Expense: 500 },
        { name: 'Event 4', Description: 'Description 4', ExpenseType: 'Utilities', Expense: 150 },
        { name: 'Event 5', Description: 'Description 5', ExpenseType: 'Entertainment', Expense: 400 },
        { name: 'Event 6', Description: 'Description 6', ExpenseType: 'Miscellaneous', Expense: 250 }
      ]
    }
  },
  computed: {
    ...mapState({
      categories: state => state.categories
    }),
    ...mapGetters({
      pageHeight: 'pageHeight'
    }),
  },
  methods: {
    updateScreenHeight() {
      this.$store.dispatch('updateScreenHeight');
    }
  },
  created() {
    window.addEventListener('resize', this.updateScreenHeight);
    this.updateScreenHeight(); // Set initial height
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenHeight);
  },
  mounted() {
    console.log('page :  ', this.pageHeight);
  }
};
</script>
