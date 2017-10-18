<template>
	<el-dialog title="编辑附件信息" :visible.sync="show" size="small" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-row :gutter="40">
				<el-col :span="12">
					<el-form-item label="附件名称" prop="name">
						<el-input v-model="form.name" placeholder="附件名称"></el-input>
					</el-form-item>
					<el-form-item label="附件编号" prop="number">
						<el-input v-model="form.number" placeholder="编号" :min="1"></el-input>
					</el-form-item>
					<el-form-item label="使用次数" prop="useCount">
						<el-input-number v-model="form.useCount" placeholder="使用次数" :min="1"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="开始时间" prop="startTime">
						<el-date-picker v-model="form.startTime" type="datetime" placeholder="开始时间"></el-date-picker>
					</el-form-item>
					<el-form-item label="结束时间" prop="endTime">
						<el-date-picker v-model="form.endTime" type="datetime" placeholder="结束时间" :picker-options="endTimeOptions"></el-date-picker>
					</el-form-item>
					<el-form-item label="附加描述" prop="description">
						<el-input type="textarea" v-model="form.description" placeholder="简单描述下吧"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
	</el-dialog>
</template>

<script>
	import {
		queryDataRepeat,
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.data = data;
			this.id = data.id;
			this.deviceAnnexId = data.deviceAnnexId;
			this.name = data.name;
			this.number = data.number;
			this.useCount = data.useCount;
			this.description = data.description;
			this.startTime = data.startTime ? new Date(data.startTime) : "";
			this.endTime = data.endTime ? new Date(data.endTime) : "";
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
    computed: {
      endTimeOptions: function() {
        return {
            disabledDate: (date) => {
            if(this.form.startTime && this.form.startTime.getTime() - 86400000 < date.getTime()) {
          return false
        }
        return true
      }
      }
      }
    },
		methods: {
			getPage(data) {
        const startTime = (rule, value, callback) => {
          if(value) {
            callback()
          } else {
            callback(new Error('请填写开始时间'));
          }
        };
        const endTime = (rule, value, callback) => {
          if(value) {
            callback()
          } else {
            callback(new Error('请填写结束时间'));
          }
        };
				this.form = new Form(data);
				this.rules = {
					name: [{
							required: true,
							message: '请填写配置名称',
							trigger: 'change'
						}, {
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryDataRepeat, this.form.id),
							trigger: 'change'
						}
					],
					number: [{
						required: true,
						message: '请填写附件编号',
						trigger: 'change'
					}, {
						pattern: this.$.regular.common.commonEn.pattern,
						message: this.$.regular.common.commonEn.message,
						trigger: 'change'
					}],
					startTime: [{
            validator: this.$.validateRequire('请填写开始时间'),
						trigger: 'change'
					}],
					endTime: [{
            validator: this.$.validateRequire('请填写结束时间'),
						trigger: 'change'
					}]
				}
				this.show = true
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.startTime = this.$.parseDate(this.form.startTime)
						this.form.endTime = this.$.parseDate(this.form.endTime)
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
