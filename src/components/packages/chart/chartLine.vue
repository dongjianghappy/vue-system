<template>
<div class="graph">
  <div :style="`height: ${chartOptions.height}px; background: ${chartOptions.background}`">
    <chartist ratio="ct-major-second" type="Line" :data="chartData" :options="chartOptions" :responsive-options="chartResponsiveOptions">
    </chartist>
  </div>
  <div className="graph-bar">
    <div className="bar-title">
      <div v-for="(item, index) in chartOptions.title" :key="index">
        {{item}}
        <span style="background: #f00" v-if="chartOptions.title.length > 1"></span>

      </div>

    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: ["A", "B", "C", 'D'],
          series: [
            [1, 3, 2],
            [4, 6, 5]
          ]
        }
      }
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {
          height: 600,
          title: [],
          lineSmooth: true,
          type: "pie",
          color: "#fff"
        }
      }
    }
  }
})
</script>
