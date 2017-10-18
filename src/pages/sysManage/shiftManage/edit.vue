<template>
	<el-dialog title="编辑班次" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item label="开始时间" prop="startTime">
				<el-time-picker v-model="form.startTime" placeholder="开始时间"></el-time-picker>
			</el-form-item>
			<el-form-item label="结束时间" prop="endTime">
				<el-time-picker v-model="form.endTime" placeholder="结束时间"></el-time-picker>
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
		queryName,
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.name = data.name;
			this.startTime = new Date("1970-01-01 " + data.startTime);
			this.endTime = new Date("1970-01-01 " + data.endTime);
		}
	}

	export default {
		created() {},
		computed: {},
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
							message: '请输入班次名',
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryName, this.form.id),
							trigger: 'change'
						}
					],
					startTime: [{
            validator: this.$.validateRequire('请填写开始时间'),
						trigger: 'change'
					}],
					endTime: [{
            validator: this.$.validateRequire('请填写结束时间'),
						trigger: 'change'
					}]
				}


				this.show = true;
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.startTime = this.$.parseDate(this.form.startTime).split(" ")[1]
						this.form.endTime = this.$.parseDate(this.form.endTime).split(" ")[1]
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
	.el-date-editor.el-input,
	.el-input-number {
		width: 100%
	}
</style>
