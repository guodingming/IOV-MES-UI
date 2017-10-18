<template>
	<el-dialog title="BOM导入" :visible.sync="show" size="tiny" :close-on-click-modal="false">
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
			<el-form-item label="文件名称" prop="fileName">
				<el-input v-model="form.fileName" placeholder="文件名称" disabled>
				</el-input>
				<el-upload ref="upload" :action="uploadUrl" class="mes-upload" :on-success="create_upload" :on-change="changeFile" :auto-upload="false" :data="form" :show-file-list="false">
					<el-button size="small" type="primary" @click="clear">上传文件</el-button>
				</el-upload>
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
		create,
		uploadUrl
	} from "./service";

	class Form {
		constructor() {
			this.pdName = "";
			this.code = "";
			this.version = "";
			this.fileName = "";
		}
	}

	export default {
		data() {
			return {
				show: false,
				form: {},
				rules: {},
				uploadUrl: uploadUrl
			}
		},
		methods: {
			getPage() {
				this.form = new Form();
				this.form.pdName = this.$parent.selectNode.name
				this.form.code = this.$parent.selectNode.data.code
				this.rules = {
					code: [{
						required: true,
						message: '请填写编码',
						trigger: 'change'
					}]
				}
				if(this.$refs.form) {
					setTimeout(() => {
						this.$refs.form.resetFields();
					})
				}
				this.show = true
			},
			create_upload(response, file, fileList) {
				this.$parent.queryData();
			},
			clear() {
				this.$refs.upload.clearFiles()
			},
			changeFile(file, fileList) {
				this.form.fileName = file.name
				this.form.version = file.name
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.productId = this.$parent.selectNode.id
						this.$refs.upload.submit()
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