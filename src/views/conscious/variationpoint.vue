<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectMonth /> <!--props传值只能父传子，不能子传父-->
        </div>
      </el-col>

    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <Chart :chart-data="vartiationpointchart.chartdata" :x-data="vartiationpointchart.xdata" :title="vartiationpointchart.title" />
    </el-row>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'// 使用vuex状态管理器
import SelectMonth from '@/components/SelectMonth'
import { fetchlistvariationpoint } from '@/api/qe'// import后，就可在文档下方直接使用该方法
import Chart from './components/Chart'

export default {
  components: { // 模块化中使用子组件的解决方式 先import 再配置components 再使用
    SelectMonth,
    Chart
  },
  data() {
    return {
	    vartiationpointchart: {
		    chartdata: [],
		    xdata: [],
		    title: '变化点完成率'
	    }
    }
  },
  created() {
	 fetchlistvariationpoint(this.month, this.vartiationpointchart.chartdata, this.vartiationpointchart.xdata)
  },
  computed: {
    ...mapGetters(['month']) // vuex 封装的 相当于获得一个函数名为month的计算属性 还是带setter的

  },
  watch: {
    month(newval) {
	 fetchlistvariationpoint(newval, this.vartiationpointchart.chartdata, this.vartiationpointchart.xdata)
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
