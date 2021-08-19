<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
     ydata: {
      type: Array,
      require: true
    },
    buxiudindata: {
      type: Array,
      require: true
    },
    huagaidata: {
      type: Array,
      require: true
    },
    huanyedata: {
      type: Array,
      require: true
    },
    huanbandata: {
      type: Array,
      require: true
    },
    xinzengdata: {
      type: Array,
      require: true
    },
    chexiaodata: {
      type: Array,
      require: true
    },

  },
  data() {
    return {
      chart: null
    }
  },
  watch: { // yData更新时重设视图
    ydata: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions()
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
	      title: {
					text:"各区域文件修订状态",
					textStyle:{
					fontSize:22,
					fontWeight: "normal",
					fontFamily: "Courier New"
					},
					left: "30%",
				},  
				tooltip: {
					trigger: 'axis',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ['不修订', '划改', '换页','换版','新增','撤销'],
					right: "8%"
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
					type: 'category',
					axisLabel: {
						interval:0,//横轴信息全部显示
						rotate:-60,//-30度角倾斜显示  
					},
					data: this.ydata 
					}
				],
				yAxis: [
					{
					type: 'value',
					name: '文件数',
					axisLabel: {
						formatter: '{value} '
					}
					},
					
				],
				series: [
					{
					name: '不修订',
                    			type: 'bar',
                    			stack: 'one',
					emphasis: {
						focus: 'series'
					},
					barCategoryGap: "1%",
					barWidth:20,
					data: this.buxiudindata
					},
					{
					name: '划改',
					type: 'bar',
					stack: 'one',
					emphasis: {
						focus: 'series'
					},
					barCategoryGap: "1%",
					barWidth:20,
					data: this.huagaidata
                    },
                    {
					name: '换页',
					type: 'bar',
					stack: 'one',
					emphasis: {
						focus: 'series'
					},
					barCategoryGap: "1%",
					barWidth:20,
					data: this.huanyedata
                    },
                    {
					name: '换版',
					type: 'bar',
					stack: 'one',
					emphasis: {
						focus: 'series'
					},
					barCategoryGap: "1%",
					barWidth:20,
					data: this.huanbandata
                    },
                    {
					name: '新增',
					type: 'bar',
					stack: 'one',
					emphasis: {
						focus: 'series'
					},
					barCategoryGap: "1%",
					barWidth:20,
					data: this.xinzengdata
                    },
                    {
					name: '撤销',
					type: 'bar',
					stack: 'one',
					emphasis: {
						focus: 'series'
					},
					barCategoryGap: "1%",
					barWidth:20,
					data: this.chexiaodata
					},
				]
      })
    }
  }
}
</script>
