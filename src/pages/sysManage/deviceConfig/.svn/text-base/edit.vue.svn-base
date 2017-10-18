<template>
	<el-dialog title="编辑配置" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="数据类型" prop="type">
				<el-select v-model="form.type" placeholder="配置类型" disabled>
					<el-option label="文件" value="file">
					</el-option>
					<el-option label="其他" value="other">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="配置名称" prop="name">
				<el-input v-model="form.name" placeholder="配置名称"></el-input>
			</el-form-item>
			<el-form-item label="版本" prop="version">
				<el-input v-model="form.version" placeholder="版本"></el-input>
			</el-form-item>
			<el-form-item label="文件名称" v-if="form.type =='file'" prop="filename">
				<el-input v-model="form.filename" placeholder="文件名称" disabled></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content" v-if="form.type =='other'">
				<el-input type="textarea" v-model="form.content" placeholder="其他"></el-input>
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
		queryDeviceConfig,
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.type = data.type;
			this.name = data.name;
			this.version = data.version;
			this.content = data.content;
			this.filename = data.filename;
		}
	}

	export default {
		data() {
			const name = (rule, value, callback) => {
				if(value) {
					queryDeviceConfig({
						name: value,
						version: this.form.version
					}).then((res) => {
						if(res.content.length > 0 && this.form.id != res.content[0].id) {
							callback(new Error('该名称及版本已存在'));
						} else {
							callback()
						}
					})
				}
			};
			const version = (rule, value, callback) => {
				if(value) {
					queryDeviceConfig({
						name: this.form.name,
						version: value
					}).then((res) => {
						if(res.content.length > 0 && this.form.id != res.content[0].id) {
							callback(new Error('该名称及版本已存在'));
						} else {
							callback()
						}
					})
				}
			};
			return {
				show: false,
				form: {}
			}
		},
		computed: {
			rules: function() {
				return {
					name: [{
							required: true,
							message: '请输入配置名称',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryDeviceConfig, this.form.id, "name", "该名称及版本已被使用", {
								version: this.form.version
							}),
							trigger: 'change'
						}
					]
				}
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data)
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

</style>