<template>
	<el-dialog title="编辑异常信息" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="异常问题" prop="abnormalProblems">
				<el-input type="textarea" v-model="form.abnormalProblems" placeholder="异常问题"></el-input>
			</el-form-item>
			<el-form-item label="异常编码" prop="abnormalCode">
				<el-input v-model="form.abnormalCode" placeholder="异常编码"></el-input>
			</el-form-item>
			<el-form-item label="责任方" prop="responsiblePersion">
				<el-input v-model="form.responsiblePersion" placeholder="责任方"></el-input>
				<!--<el-select v-model="form.responsiblePersion" placeholder="请选择异常责任方" filterable>-->
				<!--<el-option v-for="item in userGroupList" :key="item.id" :label="item.name" :value="item.id" >-->
				<!--</el-option>-->
				<!--</el-select>-->
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
		queryFaultInfo,
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.abnormalCode = data.abnormalCode;
			this.abnormalProblems = data.abnormalProblems;
			this.responsiblePersion = data.responsiblePersion;
		}
	}

	export default {
		created() {},
		computed: {
			userGroupList: function() {
				return this.$parent.userGroupList
			}
		},
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
					abnormalProblems: [{
						required: true,
						message: "请输入异常问题",
						trigger: 'change'
					}],
					abnormalCode: [{
							required: true,
							message: "请输入异常编码",
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonEn.pattern,
							message: this.$.regular.common.commonEn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryFaultInfo, this.form.id, "abnormalCode", "改编码已存在"),
							trigger: 'change'
						}
					],
					responsiblePersion: [{
						required: true,
						message: "请输入负责方",
						trigger: 'change'
					}, {
						pattern: this.$.regular.common.commonCn.pattern,
						message: this.$.regular.common.commonCn.message,
						trigger: 'change'
					}]
				}
				this.show = true
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