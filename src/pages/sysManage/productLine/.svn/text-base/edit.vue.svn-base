<template>
	<el-dialog title="编辑产品信息" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="产品名称" prop="name">
				<el-input v-model="form.name" placeholder="产品名称"></el-input>
			</el-form-item>
			<el-form-item label="产品编码" prop="code">
				<el-input v-model="form.code" placeholder="产品编码"></el-input>
			</el-form-item>
			<el-form-item label="附加描述" prop="description">
				<el-input type="textarea" v-model="form.description" placeholder="简单描述下产品吧"></el-input>
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
		queryPdDefinition,
		edit,
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.name = data.name;
			this.code = data.code;
			this.description = data.description;
		}
	}

	export default {
		created() {},
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
					name: [{
							required: true,
							message: '请输入产品名称',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryPdDefinition, this.form.id),
							trigger: 'change'
						}
					],
					code: [{
							required: true,
							message: '请输入产品编号',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonEn.pattern,
							message: this.$.regular.common.commonEn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryPdDefinition, this.form.id, "code", "该编码已存在"),
							trigger: 'change'
						}
					]
				}

				
				this.show = true;
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