<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectMonth /> <!--props传值只能父传子，不能子传父-->
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectDomain />
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <Stationcoverchart :title="allstationcover.title" :x-data="allstationcover.xdata" :y-dataone="allstationcover.ydataone" :y-datatwo="allstationcover.ydatatwo" /><!--动态绑定子组件中的props中的值到父组件实例property中的有返回值的值,父组件中组件实例property中对应值的改变，实际数值会传递到子组件中使用props里面的值的地方-->
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <Stationcoverchart :title="zonestationcover.title" :x-data="zonestationcover.xdata" :y-dataone="zonestationcover.ydataone" :y-datatwo="zonestationcover.ydatatwo" />
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'// 使用vuex状态管理器
import SelectMonth from '@/components/SelectMonth'
import SelectDomain from '@/components/SelectDomain'
import { fetchListallstationcover, fetchListzonestationcover } from '@/api/qe'// import后，就可在文档下方直接使用该方法
import Stationcoverchart from './components/Stationcoverchart'

export default {
  components: { // 模块化中使用子组件的解决方式 先import 再配置components 再使用
    SelectMonth,
    SelectDomain,
    Stationcoverchart
  },
  data() {
    return {
	    allstationcover: {
		    title: '总工位覆盖率',
		    xdata: [],
		    ydataone: [],
		    ydatatwo: []
	    },
	    zonestationcover: {
		    title: '区域工位覆盖率',
		    xdata: [],
		    ydataone: [],
		    ydatatwo: []
	    }
    }
  },
  created() {
	  fetchListallstationcover(this.month, this.allstationcover.xdata, this.allstationcover.ydataone, this.allstationcover.ydatatwo)// dataproperty 里面return的属性值更新，使用这些属性值的html视图随之变化
	  fetchListzonestationcover(this.month, this.zone, this.zonestationcover.xdata, this.zonestationcover.ydataone, this.zonestationcover.ydatatwo)
  },
  computed: {
    ...mapGetters(['month']), // vuex 封装的 相当于获得一个函数名为month的计算属性
    ...mapGetters(['zone'])
  },
  watch: {
    month(newval) {
	  fetchListallstationcover(newval, this.allstationcover.xdata, this.allstationcover.ydataone, this.allstationcover.ydatatwo)
	  fetchListzonestationcover(newval, this.zone, this.zonestationcover.xdata, this.zonestationcover.ydataone, this.zonestationcover.ydatatwo)
    },
    zone(newval) {
	  fetchListzonestationcover(this.month, newval, this.zonestationcover.xdata, this.zonestationcover.ydataone, this.zonestationcover.ydatatwo)
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
