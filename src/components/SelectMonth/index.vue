<template>
  <div class="block">
    <span class="demonstration" />
    <el-date-picker
      v-model="value"
      type="month"
      placeholder="选择月"
      value-format="yyyy-MM"
    />
  </div>
</template>
<script>

export default {
	 data() {
		 return {
			 value: ''
		 }
	 },
	 watch: {
		 value(newval) {
			 this.$store.commit('CHANGE_MONTH', newval)// 向状态管理器中存值
		 }
	 }
}
</script>
