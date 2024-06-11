<template>
  <v-card class="mt-16">
    <!-- App Bar code is commented out -->
  </v-card>
  <div class="pa-10">
    <div class="d-flex align-center ml-3">
      <v-icon class="mt-n1">mdi-book-plus</v-icon>
      <h3 class="ml-2">Manage Incomes</h3>
    </div>
    <v-row>
      <v-col cols="6">
        <v-card height="480">
          <v-card-title class="text-center">Create An Income</v-card-title>
          <v-text-field variant="outlined" class="px-2" density="compact" label="Income Name"></v-text-field>
          <v-textarea no-resize variant="outlined" class="px-2" density="compact" label="Income Description"></v-textarea>
          <v-text-field variant="outlined" class="px-2" density="compact" label="Income Amount" type="number"></v-text-field>
        </v-card>
        <v-btn color="primary" class="float-right mt-n10 mr-2">Save</v-btn>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title class="text-center">Your Incomes</v-card-title>
          <v-data-table :items="Incomes" style="cursor:pointer">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td>{{ item.Description }}</td>
                <td>{{ item.ExpenseType }}</td>
                <td>{{ item.Incomes }}</td>
                <td>
                  <v-icon small class="mdi mdi-pencil" @click="editIncome(item)">mdi-pencil</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Incomes: [
        { name: 'Event 1', Description: 'Description 1', ExpenseType: 'Food', Incomes: 300, edit:"edit" },
        { name: 'Event 2', Description: 'Description 2', ExpenseType: 'Travel', Incomes: 200, edit:"edit" },
        { name: 'Event 3', Description: 'Description 3', ExpenseType: 'Rent', Incomes: 500, edit:"edit" },
        { name: 'Event 4', Description: 'Description 4', ExpenseType: 'Utilities', Incomes: 150, edit:"edit" },
        { name: 'Event 5', Description: 'Description 5', ExpenseType: 'Entertainment', Incomes: 400, edit:"edit" },
        { name: 'Event 6', Description: 'Description 6', ExpenseType: 'Miscellaneous', Incomes: 250, edit:"edit" }
      ]
    };
  },
  methods: {
    editIncome(item) {
      // Implement the logic for editing the income item here
      console.log('Edit income:', item);
    }
  }
};
</script>

<style>
</style>
