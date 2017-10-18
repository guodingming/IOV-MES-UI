<template>
	<el-dialog title="编辑车间" :visible.sync="show" size="tiny" :close-on-click-modal="false" :modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="工作中心名称" prop="name">
				<el-input v-model="form.name" placeholder="工作中心名称"></el-input>
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
		queryWorkcenter,
		workcenterEdit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.name = data.name;
			//	this.location = data.location;
			//  this.category = data.category;
			this.capacity = data.capacity;
			this.priority = data.priority;
			this.description = data.description;
			this.productionLineId = data.productionLineId;
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
			getPage(data, callback) {
				this.callback = callback
				this.form = new Form(data);
				this.rules = {
					name: [{
						required: true,
						message: '请输入工作中心名称',
						trigger: 'change'
					}, {
						pattern: this.$.regular.common.commonCn.pattern,
						message: this.$.regular.common.commonCn.message,
						trigger: 'change'
					}, {
						validator: this.$.checkRepeat(queryWorkcenter, this.form.id),
						trigger: 'change'
					}],
				}
				
				this.show = true
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						workcenterEdit(this.form).then((res) => {
							this.callback();
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
	.el-date-editor.el-input,
	.el-input-number {
		width: 100%
	}
</style>