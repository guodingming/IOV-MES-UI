<template>
	<el-dialog title="编辑顶级菜单" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="菜单名称" prop="name">
				<el-input v-model="form.name" placeholder="用户组名称"></el-input>
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
		queryMenu,
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.name = data.name;
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
					name: [{
							required: true,
							message: '请输入菜单名称',
							trigger: 'change'
						}, {
							pattern: this.$.regular.common.nameCn.pattern,
							message: this.$.regular.common.nameCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryMenu, this.form.id),
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
						edit(this.form).then((res) => {
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