<template>
  <div class="block">
    <span class="demonstration" /> <!---v-model封装的相当于一个输入值的事件和一个绑定属性的值-->
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
		 value(newval) { // 由子组件向父组件传递数据，通常使用状态管理器做媒介
			 this.$store.commit('CHANGE_MONTH', newval)// 向状态管理器中存值
		 }
	 },
	 mounted() {
		 this.getmon() // 从空值到获取当前日期，同样会触发watch 状态管理器是响应式的,里面的状态更新后，使用状态数据的视图会响应式的更新
	 },
	 methods: {
		 getmon() { // getmon() {} 是 getmon: function(){}的缩写 methods的值是个对象、对象里面是一对对键值对
      const theDate = new Date()
      let month1
        		if (theDate.getMonth() < 9) {
          			month1 = theDate.getFullYear() + '-' + '0' + (theDate.getMonth() + 1)
        		} else {
          			month1 = theDate.getFullYear() + '-' + (theDate.getMonth() + 1)
      }
      this.value = month1
		 }
	 }
}
</script>
