<template>
	<el-dialog title="新建部门" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="上级部门" prop="pName">
				<el-input v-model="form.pName" placeholder="上级部门" disabled></el-input>
			</el-form-item>
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
		treeCreate
	} from "./service";

	class Form {
		constructor(pName = "", parentId = "") {
			this.pName = pName;
			this.parentId = parentId;
			this.name = "";
			this.code = "";
			this.description = "";
		}
	}

	export default {
		created() {},
		data() {
			return {
				show: false,
				form: {},
				rules: {},
			}
		},
		methods: {
			getPage() {
				this.form = new Form();
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
							validator: this.$.checkRepeat(queryDept),
							trigger: 'change'
						}
					],
					code: [{
							required: true,
							message: '请输入部门编码',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonEn.pattern,
							message: this.$.regular.common.commonEn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryDept, null, "code"),
							trigger: 'change'
						}
					]
				}

				if(this.$refs.form) {
					setTimeout(() => {
						this.$refs.form.resetFields();
					})
				}
				this.show = true
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						treeCreate(this.form).then((res) => {
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