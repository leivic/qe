<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: { // props的对象写法，每一个暴露的属性值，都可写为一个对象，对象里面的一对对属性额外配置每一个props值的特性。在本组件中取到props中的值，组件实例直接取便好，在父组件中，每一个props化作父组件中的子组件使用的属性
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
    title: {
      type: String,
      require: true
    },
    xData: {
      type: Array,
      required: true
    },
    yDataone: {
      type: Array,
      require: true
    },
    yDatatwo: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: { // props里面的属性是有返回值的，直接暴露给组件实例的 所以可以和计算属性、data property里面的值一样，直接在watch中使用
    xData: { // watch里面某暴露给组件实例的值的对象写法，默认的是函数写法 之前的默认写法写在对象写法的handler里面
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
      this.setOptions(this.xData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.showLoading({
        maskColor: 'white'// 遮罩层背景色
      })

      this.chart.setOption({
        title: {
          text: this.title,
          textStyle: {
            fontSize: 22,
            fontWeight: 'normal',
            fontFamily: 'Courier New'
          },
          left: '36%'
        },
			 	tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }

        },

        legend: {
          data: ['数量', '百分比'],
          right: '20%'
        },
        xAxis: [
          {
            type: 'category',
            axisPointer: {
              type: 'shadow'
            },
            data: this.xData // 动态给xAxis[0].data 赋值，vue内 this.xData直接取到props里面的xData 这是可暴露的组件实例property值
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量',
            axisLabel: {
              formatter: '{value} '
            }
          },
          {
            type: 'value',
            name: '百分比',
            max: 100,
            axisLabel: {
              formatter: '{value} ％'
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barCategoryGap: '1%',
					    barWidth: 20,
            data: this.yDataone
          },
          {
            name: '百分比',
            type: 'line',
            yAxisIndex: 1,
            data: this.yDatatwo
          }
        ]

      })

      var that = this
      setTimeout(function() { that.chart.hideLoading() }, 1500)
    }
  }
}
</script>
