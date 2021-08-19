<template>
  <div>
    <el-select v-model="value" clearable placeholder="请选择" style="border:none">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [{
        value: '冲压车间',
        label: '冲压车间'
      }, {
        value: '车身车间',
        label: '车身车间'

      }, {
        value: '涂装车间',
        label: '涂装车间'
      }, {
        value: '总装车间',
        label: '总装车间'
      }],
      value: ''
    }
  },
  watch: {
    value(newval) {
			 this.$store.commit('CHANGE_ZONE', newval)// 向状态管理器中存值
		 }
	 }
}
</script>
<style scoped>

</style>
