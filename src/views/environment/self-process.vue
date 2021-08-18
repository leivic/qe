<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectMonth ref="selectmonth" /> <!--props传值只能父传子，不能子传父-->
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <Chart :chart-data="chartDataone.ydata" :x-data="chartDataone.xdata" :title="chartDataone.title" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <Chart :chart-data="chartDatatwo.ydata" :x-data="chartDatatwo.xdata" :title="chartDatatwo.title" />
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'// 使用vuex状态管理器
import { fetchSelfProcess, fetchSelfProcessZone } from '@/api/qe'// 默认导出名称 导入 必须加{} 因为导出的时候 是分开导出的，所以引用的时候 要按需引用{}
import SelectMonth from '@/components/SelectMonth'
import Chart from './components/Chart'

export default {
  components: {
    SelectMonth,
    Chart
  },
  data() {
    return {
      chartDataone: {
        xdata: [],
        ydata: [],
        title: "各区域自评过程符合率"
      },
      chartDatatwo: {
        xdata: [],
        ydata: [],
        title: "自评过程符合率"
      }
    }
  },
  created() {
    fetchSelfProcess(this.month, this.chartDataone.xdata, this.chartDataone.ydata)
    fetchSelfProcessZone(this.month, this.chartDatatwo.xdata, this.chartDatatwo.ydata)
  },
  computed: {
    ...mapGetters(['month'])// 使用VUEX状态管理器的getter方法，由此多了个getmonth的计算属性
  },
  watch: {
    month(newval) {
      fetchSelfProcess(newval, this.chartDataone.xdata, this.chartDataone.ydata)
      fetchSelfProcessZone(newval, this.chartDatatwo.xdata, this.chartDatatwo.ydata)
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
</style>
