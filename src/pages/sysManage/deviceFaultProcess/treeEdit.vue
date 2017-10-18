<template>
	<el-dialog title="编辑异常分类" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="分类名称" prop="name">
				<el-input v-model="form.name" placeholder="分类名称"></el-input>
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
		queryFault,
		updateTree
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
				form: new Form()
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
				this.rules = {
					name: [{
							required: true,
							message: '请输入分类名称',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryFault, this.form.id),
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
						updateTree(this.form).then((res) => {
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