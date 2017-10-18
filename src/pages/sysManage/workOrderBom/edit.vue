<template>
	<el-dialog title="BOM编辑" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="产品名称" prop="pdName">
				<el-input v-model="form.pdName" placeholder="产品名称" disabled></el-input>
			</el-form-item>
			<el-form-item label="编码" prop="code">
				<el-input v-model="form.code" placeholder="编码" disabled></el-input>
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
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.pdName = data.pdName;
			this.code = data.code;
			this.version = data.version;
		}
	}

	export default {
		data() {
			return {
				show: false,
				form: {},
				rules: {}
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
				this.rules = {
					code: [{
						required: true,
						message: '请填写编码',
						trigger: 'change'
					}]
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