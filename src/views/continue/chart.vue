<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectDomain :value="valuedomain" />
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectMonth :value="valuemonth" />
        </div>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <lineChart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32"><!--三个图表组件 布局是elment-ui栅栏布局-->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <LineBarChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <lineChartTwo :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <Formtext />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { fetchData } from '@/api/qe'// 默认导出名称 导入 必须加{} 因为导出的时候 是分开导出的，所以引用的时候 要按需引用{}
import SelectDomain from '@/components/SelectDomain'
import SelectMonth from '@/components/SelectMonth'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import LineChartTwo from './components/LineChartTwo'
import Formtext from './components/Form.vue'
import LineBarChart from './components/LineBarChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 180, 160, 151, 106, 145, 150, 130],
    actualData: [120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 130]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  components: {
    SelectDomain,
    SelectMonth,
    LineChart,
    PieChart,
    LineChartTwo,
    Formtext,
    LineBarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      valuedomain: undefined,
      valuemonth: undefined
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      fetchData(1).then(response => { // then函数的参数  1. 当前then函数的回调函数（作为参数的那个函数）的参数 是上一个then/promise的回调函数的返回值传进来的 2. 所以这里response的实参来自于fetchData的返回值 3. axios可以使用.then 是因为axios就是promise 4 .只有promise才可以使用.then 5 .then函数的返回值都是promsie
        console.log(response) // response运行良好
      }
      )
    }
  }
}
</script>
<style lang="scss" scoped>

.continue-chart-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .tool {
	  margin-bottom: 16px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
