<template>
  <div>
    <el-select v-model="value" clearable placeholder="请选择" style="border:none"><!--v-model相当于一个属性绑定和一个事件-->
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
      }, {
        value: '机加车间',
        label: '机加车间'
      },
      {
        value: '装配车间',
        label: '装配车间'
      }
      ],
      value: '冲压车间'
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
