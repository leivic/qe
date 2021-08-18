<template>
	<div>
		<el-form :label-position="labelPosition" label-width="160px" :model="formLabelAlign">
			<el-form-item label="▶️质量水平（负责人：各质量特征反馈人）">
			<el-input :readonly="readonly" v-model="formLabelAlign.name" type="textarea" :rows="3"></el-input>
			</el-form-item>
			<el-form-item label="▶️质量提升潜力（质量生态持续推进者）">
			<el-input :readonly="readonly" v-model="formLabelAlign.region" type="textarea" :rows="3"></el-input>
			</el-form-item>
			<el-form-item label="▶️质量资源损失（成本团队）">
			<el-input :readonly="readonly" v-model="formLabelAlign.type" type="textarea" :rows="3"></el-input>
			</el-form-item>
		</el-form>
		<el-row>
			<el-col span="4" offset="20" >
				<el-button :type="btntype" round @click="changeRead()">编辑</el-button>
				<el-button type="primary" round>提交</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
export default {
	data(){
		return{
			labelPosition:"top",
			formLabelAlign: {
				name: '',
				region: '',
				type: ''
			},
			readonly:true,
			btntype:"primary"	
		}
	},
	methods:{
		changeRead(){
			if(this.readonly==false){
				this.readonly=true,
				this.btntype="primary"
			}else{
				this.readonly=false
				this.btntype=""
			}
		}
	}
}
</script>
<style scoped>
	
</style>