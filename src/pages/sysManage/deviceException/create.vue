<template>
	<el-dialog title="添加异常设备" :visible.sync="show" size="small" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-row :gutter="40">
				<el-col :span="12">
					<el-form-item label="车间" prop="area1">
						<el-cascader placeholder="级联选择车间" filterable :show-all-levels="false" :options="cascader" @active-item-change="changeCascader" @change="getDevice" :props="{value: 'id',label: 'name',children: 'children'}"></el-cascader>
					</el-form-item>
					<el-form-item label="设备" prop="deviceId1">
						<el-select v-model="form.deviceId" placeholder="请选择设备">
							<el-option v-for="item in deviceList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
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
		queryEnterprise,
		queryDevice,
		queryArea,
		querySite,
		create
	} from "./service";

	class Form {
		constructor() {
			this.maintenancePersion = "";
			this.deviceFaultInfoId = "";
			this.maintenancePhone = "";
			this.description = "";
			this.operator = "";
			this.deviceId = "";
			this.status = "0";
			this.email = "";
			this.area = "";
		}
	}

	export default {
		created() {
			this.getEnterprise();
		},
		computed: {
			deviceFaultInfoList: function() {
				return this.$parent.deviceFaultInfoList
			}
		},
		data() {
			return {
				show: false,
				form: {},
				rules: {},
				deviceList: [],
				cascader: []
			}
		},
		methods: {
			getPage() {
				this.form = new Form();
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

				if(this.$refs.form) {
					setTimeout(() => {
						this.$refs.form.resetFields();
					})
				}
				this.show = true
			},
			async changeArea() {
				let result = await queryDevice({
					areaId: this.area
				});
				if(result.status == "success") {
					this.deviceList = result.content || [];
				} else {
					this.deviceList = [];
				}
			},
			async getEnterprise() {
				let result = await queryEnterprise();
				if(result.status == "success") {
					this.cascader = result.content.map((val) => {
						val.name = val.company;
						val.children = [];
						return val
					});
				}
			},
			async changeCascader(data) {
				if(data.length == 1) {
					let id = data[0]
					let res = await querySite({
						enterpriseId: id
					})
					this.$.getKey(this.cascader, "id", id).children = res.content.map((val) => {
						val.children = []
						return val
					})
				} else if(data.length == 2) {
					let id = data[1]
					let res = await queryArea({
						siteInfoId: id
					})
					this.$.getKey(this.$.getKey(this.cascader, "id", data[0]).children, "id", id).children = res.content
				}
			},
			async getDevice(data = []) {
				let id = data[2]
				queryDevice({
					areaId: id
				}).then(result => {
					if(result.status == 'success' && result.content) {
						this.deviceList = result.content
					} else {
						this.deviceList = []
					}
				})
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						create(this.form).then((res) => {
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