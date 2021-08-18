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
    yData: {
      type: Array,
      required: true
    },
    Wenjianjihuadata: {
      type: Array,
      required: true
    },
    Wanchendata: {
      type: Array,
      required: true
    },
    Gailvdata: {
      type: Array,
      required: true
    }
    
  },
  data() {
    return {
      chart: null
    }
  },
  watch: { //yData更新时重设视图 
    yData: {
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
					text:"文件修订按期完成率",
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
					data: ['文件数', '累计修订', '累计完成率'],
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
          data: this.yData
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
					{
					type: 'value',
					min:0,
					max: 100,
					axisLabel: {
						formatter: '{value} ％'
					}
					}
				],
				series: [
					{
					name: '文件数',
					type: 'bar',
					emphasis: {
						focus: 'series'
					},
					barCategoryGap: "1%",
          barWidth:20,
          data: this.Wenjianjihuadata
					},
					{
					name: '累计修订',
					type: 'bar',
					stack: '意识得分',
					emphasis: {
						focus: 'series'
					},
					barCategoryGap: "1%",
          barWidth:20,
          data: this.Wanchendata
					},
					{
                        		name: '累计完成率',
					type: 'line',
          yAxisIndex: 1,
          data: this.Gailvdata
					}
				]

      })
    }
  }
}
</script>