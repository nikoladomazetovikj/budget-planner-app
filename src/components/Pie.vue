<template>
  <div class="pie-chart-container">
    <Pie
      id="pie-chart"
      :options="pieChartOptions"
      :data="pieChartData"
    />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'Pie.vue',
  components: { Pie },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      pieChartData: {
        labels: [],
        datasets: [
          {
            label: 'Expense',
            backgroundColor: ['#f87979', '#7ac7e3', '#fcc468', '#ff6b6b', '#7fcdbb', '#fdc966'],
            data: []
          }
        ]
      },
      pieChartOptions: {
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
      const expenseData = items.map(item => item.Expense);

      this.pieChartData.labels = labels;
      this.pieChartData.datasets[0].data = expenseData;
    }
  }
}
</script>

<style scoped>
.pie-chart-container {
  width: 1000px;
  max-width: 100%;
  min-height:400px ;
}
</style>
