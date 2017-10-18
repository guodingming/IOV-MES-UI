<template>
	<el-dialog title="编辑部门" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="部门名称" prop="name">
				<el-input v-model="form.name" placeholder="部门名称"></el-input>
			</el-form-item>
			<el-form-item label="部门编码" prop="code">
				<el-input v-model="form.code" placeholder="部门编码"></el-input>
			</el-form-item>
			<el-form-item label="附加描述" prop="description">
				<el-input type="textarea" v-model="form.description" placeholder="简单描述下部门吧"></el-input>
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
		queryDept,
		treeEdit
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
		data() {
			return {
				show: false,
				form: {},
				rules: {},

			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
				this.rules = {
					name: [{
							required: true,
							message: '请输入部门名称',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryDept, this.form.id),
							trigger: 'change'
						}
					],
					code: [{
							required: true,
							message: '请输入部门编码',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryDept, this.form.id, "code"),
							trigger: 'change'
						}
					]
				}

				
				this.show = true
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						treeEdit(this.form).then((res) => {
							this.$parent.getTree();
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