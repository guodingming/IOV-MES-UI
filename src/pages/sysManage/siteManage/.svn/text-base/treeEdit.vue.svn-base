<template>
	<el-dialog title="编辑企业" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="企业名称" prop="company">
				<el-input v-model="form.company" placeholder="企业名称"></el-input>
			</el-form-item>
			<el-form-item label="附加描述" prop="description">
				<el-input type="textarea" v-model="form.description" placeholder="附加描述"></el-input>
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
		queryEnterprise,
		treeEdit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.company = data.company;
			this.description = data.description;
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
					company: [{
							required: true,
							message: '请输入企业名称',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryEnterprise, this.form.id, "company"),
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