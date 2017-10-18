<template>
	<el-dialog title="编辑异常设备" :visible.sync="show" size="small" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-row :gutter="40">
				<el-col :span="12">
					<el-form-item label="车间" prop="name">
						<el-input v-model="form.name" placeholder="车间" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="设备" prop="deviceName">
						<el-input v-model="form.deviceName" placeholder="设备" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="设备异常代码" prop="deviceFaultInfoId">
						<el-select v-model="form.deviceFaultInfoId" placeholder="设备异常代码">
							<el-option v-for="item in deviceFaultInfoList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="异常描述" prop="discription">
						<el-input type="textarea" v-model="form.description" placeholder="异常描述"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="异常负责人" prop="maintenancePersion">
						<el-input v-model="form.maintenancePersion" placeholder="异常负责人"></el-input>
					</el-form-item>
					<el-form-item label="负责人电话" prop="maintenancePhone">
						<el-input v-model="form.maintenancePhone" placeholder="负责人电话"></el-input>
					</el-form-item>
					<el-form-item label="异常报修人" prop="operator">
						<el-input v-model="form.operator" placeholder="异常报修人"></el-input>
					</el-form-item>
					<el-form-item label="报修人邮箱" prop="email">
						<el-input v-model="form.email" placeholder="报修人邮箱"></el-input>
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
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.deviceFaultInfoId = data.deviceFaultInfoId;
			this.description = data.description;
			this.enterprise = data.enterprise;
			this.deviceId = data.deviceId;
			this.status = data.status;
			this.email = data.email;
			this.name = data.name;
			this.area = data.area;
			this.id = data.id;
			this.deviceName = data.deviceName;
			this.maintenancePersion = data.maintenancePersion;
			this.maintenancePhone = data.maintenancePhone;
			this.operator = data.operator;
		}
	}

	export default {
		created() {},
		computed: {
			deviceFaultInfoList: function() {
				return this.$parent.deviceFaultInfoList
			},
			deviceList: function() {
				return this.$parent.deviceList
			}
		},
		data() {
			return {
				show: false,
				form: {},
				rules: {},
				areaList: []
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
				this.rules = {
					maintenancePersion: [{
							required: true,
							message: "请输入负责人",
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						}
					],
					maintenancePhone: [{
							required: true,
							message: "请输入负责人电话",
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.mobilePhone.pattern,
							message: this.$.regular.common.mobilePhone.message,
							trigger: 'change'
						}
					],
					operator: [{
							required: true,
							message: "请输入异常报修人",
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						}
					],
					area: [{
						required: true,
						message: "请选择车间",
						trigger: 'change'
					}],
					deviceId: [{
						required: true,
						message: "请选择设备",
						trigger: 'change'
					}],
					deviceFaultInfoId: [{
						required: true,
						message: "请选择异常代码",
						trigger: 'change'
					}],
					email: [{
						required: true,
						message: "请输入邮箱地址",
						trigger: 'change'
					}, {
						pattern: this.$.regular.common.email.pattern,
						message: this.$.regular.common.email.message,
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