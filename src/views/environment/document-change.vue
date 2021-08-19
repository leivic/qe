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
      <DocumentChangeChart :y-data="document.ydata" :wenjianjihuadata="document.wenjianjihuadata" :wanchendata="document.wanchendata" :gailvdata="document.gailvdata" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <DocumentChangeStatus :ydata="documentstatus.ydata" :buxiudindata="documentstatus.buxiudindata" :huagaidata="documentstatus.huagaidata" :huanyedata="documentstatus.huanyedata" :huanbandata="documentstatus.huanbandata" :xinzengdata="documentstatus.xinzengdata" :chexiaodata="documentstatus.chexiaodata" />
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'// 使用vuex状态管理器
import SelectMonth from '@/components/SelectMonth'
import DocumentChangeChart from './components/DocumentChangeChart'
import { fetchDocumentChange,fetchDocumentChangeStatus } from '@/api/qe'
import DocumentChangeStatus from './components/DocumentChangeStatus'

export default {
  components: {
    SelectMonth,
    DocumentChangeChart,
    DocumentChangeStatus
  },
  data() {
    return {
      document: {
	      ydata: [],
	      wenjianjihuadata: [],
	      wanchendata: [],
	      gailvdata: []
      },
      documentstatus: {
        ydata: [],
        buxiudindata: [],
        huagaidata: [],
        huanyedata: [],
        huanbandata: [],
        xinzengdata: [],
        chexiaodata: []
      }
    }
  },
  created() {
	  fetchDocumentChange(this.month, this.document.ydata, this.document.wenjianjihuadata, this.document.wanchendata, this.document.gailvdata)
    fetchDocumentChangeStatus(this.month, this.documentstatus.ydata, this.documentstatus.buxiudindata, this.documentstatus.huagaidata, this.documentstatus.huanyedata, this.documentstatus.huanbandata, this.documentstatus.xinzengdata, this.documentstatus.chexiaodata)
  },
  computed: {
    ...mapGetters([ 'month'])//
  },
  watch: {
    month(newval) {
	   fetchDocumentChange(newval, this.document.ydata, this.document.wenjianjihuadata, this.document.wanchendata, this.document.gailvdata)
     fetchDocumentChangeStatus(newval, this.documentstatus.ydata, this.documentstatus.buxiudindata, this.documentstatus.huagaidata, this.documentstatus.huanyedata, this.documentstatus.huanbandata, this.documentstatus.xinzengdata, this.documentstatus.chexiaodata)
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
