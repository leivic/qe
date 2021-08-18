<template>
	<div>
		<el-select v-model="value" clearable placeholder="请选择" style="border:none">
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
	</div>
</template>
<script>
export default {
	data() {
		return {
			options: [{
				value: '选项1',
				label: '冲压车间'
			}, {
				value: '选项2',
				label: '车身车间',
				
			}, {
				value: '选项3',
				label: '涂装车间'
			}, {
				value: '选项4',
				label: '总装车间'
			}]
		}
	    },
	props:["value"]
}
</script>
<style scoped>
	
</style>
