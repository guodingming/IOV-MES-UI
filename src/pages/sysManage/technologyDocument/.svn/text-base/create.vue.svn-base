<template>
	<el-dialog title="工艺文件管理导入" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="编码" prop="code">
				<el-input v-model="form.code" placeholder="编码"></el-input>
			</el-form-item>
			<el-form-item label="版本" prop="version">
				<el-input v-model="form.version" placeholder="版本"></el-input>
			</el-form-item>
			<el-form-item label="文件名称" prop="fileName">
				<el-input v-model="form.fileNameCn" placeholder="文件名称" disabled>
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
		uploadUrl,
		codeRepeat
	} from "./service";

	class Form {
		constructor() {
			this.code = "";
			this.version = "";
			this.fileName = "";
			this.fileNameCn = "";
			this.type = "2";
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
				this.rules = {
					code: [{
							required: true,
							message: '请填写编码',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(codeRepeat, null, "code", "该编码已存在"),
							trigger: 'change'
						}
					],
					version: [{
						required: true,
						message: '请填写版本',
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
				this.show = false;
				this.$parent.queryData();
			},
			clear() {
				this.$refs.upload.clearFiles()
			},
			changeFile(file, fileList) {
				this.form.fileNameCn = file.name
				this.form.fileName = encodeURI(file.name)
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.fileTypeId = this.$parent.selectNode.id
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
