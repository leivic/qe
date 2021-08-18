<template>
	<div class="block">
		<span class="demonstration"></span>
			<el-date-picker
			v-model="value"
			type="month"
			placeholder="选择月"
			value-format="yyyy-MM"
			>
			</el-date-picker>
  	</div>
</template>
<script>


export default {
	 data(){
		 return{
			 value:""
		 }
	 },
	 watch:{
		 value(newval){
			 this.$store.commit('CHANGE_MONTH', newval);//向状态管理器中存值
		 }
	 }
}
</script>
