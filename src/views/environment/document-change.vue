<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectMonth  /> <!--props传值只能父传子，不能子传父-->
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectDomain /> <!--props传值只能父传子，不能子传父-->
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
	<DocumentChangeChart :yData="document.ydata" :Wenjianjihuadata="document.wenjianjihuadata" :Wanchendata="document.wanchendata" :Gailvdata="document.gailvdata" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'// 使用vuex状态管理器
import SelectMonth from '@/components/SelectMonth'
import SelectDomain from '@/components/SelectDomain'
import DocumentChangeChart from './components/DocumentChangeChart'
import { fetchDocumentChange } from '@/api/qe'

export default {
  components: {
    SelectMonth,
    SelectDomain,
    DocumentChangeChart 
  },
  data() {
    return {
      document: {
	      ydata: [],
	      wenjianjihuadata: [],
	      wanchendata: [],
	      gailvdata: []
      }
    }
  },
  created() {
	  fetchDocumentChange(this.month,this.document.ydata,this.document.wenjianjihuadata,this.document.wanchendata,this.document.gailvdata)
  },
  computed: {
    ...mapGetters(['zone','month'])// 
  },
  watch: {  
    zone(newval) {
      
    },
    month(newval){
	   fetchDocumentChange(newval,this.document.ydata,this.document.wenjianjihuadata,this.document.wanchendata,this.document.gailvdata) 
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