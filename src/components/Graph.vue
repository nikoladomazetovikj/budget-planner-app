<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'Graph',
  components: { Bar },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Incomes',
            backgroundColor: '#42A5F5',
            data: []
          },
          {
            label: 'Expenses',
            backgroundColor: '#FFA726',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  watch: {
    items: {
      handler(newItems) {
        this.updateChartData(newItems);
      },
      immediate: true
    }
  },
  methods: {
    updateChartData(items) {
      const labels = items.map(item => item.name);
      const incomeData = items
        .filter(item => item.typeName === 'Income')
        .map(item => item.price);
      const expenseData = items
        .filter(item => item.typeName === 'Expense')
        .map(item => item.price);

      this.chartData.labels = labels;
      this.chartData.datasets[0].data = incomeData;
      this.chartData.datasets[1].data = expenseData;
    }
  }
}
</script>

<style scoped>
#my-chart-id {
  max-height: 650px; /* Adjust this value as needed */
}
</style>
