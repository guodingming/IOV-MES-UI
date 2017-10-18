<template>
	<el-dialog title="编辑产品产线" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item label="版本" prop="version">
				<el-input v-model="form.version" placeholder="版本"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
	</el-dialog>
</template>

<script>
	import {
		queryDataRepeat,
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.data = data;
			this.id = data.id;
			this.name = data.name;
			this.version = data.version;
		}
	}

	export default {
		data() {
			return {
				show: false,
				form: {}
			}
		},
		computed:{
			rules: function(){
				return{
					name: [{
							required: true,
							message: '请填写附件名称',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryDataRepeat,this.form.id,"name","该名称及版本已被使用",{version:this.form.version}),
							trigger: 'change'
						}
					]
				}
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.show = true
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						edit(this.form).then((res) => {
							this.$parent.queryData();
						});
					} else {
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.el-date-editor.el-input,
	.el-input-number {
		width: 100%
	}
</style>
