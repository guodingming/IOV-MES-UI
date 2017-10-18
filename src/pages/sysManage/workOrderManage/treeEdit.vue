<template>
	<el-dialog title="编辑用户组" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="用户组名称" prop="name">
				<el-input v-model="form.name" placeholder="用户组名称"></el-input>
			</el-form-item>
			<el-form-item label="附加描述" prop="description">
				<el-input type="textarea" v-model="form.description" placeholder="简单描述下用户组吧"></el-input>
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
		queryGroup,
		treeEdit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.name = data.name;
			this.description = data.description;
		}
	}

	export default {
		data() {
			const name = (rule, value, callback) => {
				if(value) {
					queryGroup({
						name: value
					}).then((res) => {
						if(res.content.length > 0 && this.form.id != res.content[0].id) {
							callback(new Error('该用户组名称已被使用'));
						} else {
							callback()
						}
					})

				}
			};

			return {
				show: false,
				form: new Form(),
				rules: {
					name: [{
							required: true,
							message: '请输入用户组名称',
							trigger: 'change'
						},
						{
							validator: _.debounce(name, 1000),
							trigger: 'change'
						}
					]
				},
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