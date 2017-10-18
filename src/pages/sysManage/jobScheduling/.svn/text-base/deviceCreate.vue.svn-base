<template>
	<el-dialog title="新建设备" :visible.sync="show" size="tiny" :close-on-click-modal="false" :modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-row :gutter="40">
				<el-form-item label="企业" prop="enterpriseName">
					<el-input v-model="form.enterpriseName" placeholder="企业" disabled></el-input>
				</el-form-item>
				<el-form-item label="车间" prop="areaName">
					<el-input v-model="form.areaName" placeholder="车间" disabled></el-input>
				</el-form-item>
				<el-form-item label="生产线" prop="productionLineName">
					<el-input v-model="form.productionLineName" placeholder="生产线" disabled></el-input>
				</el-form-item>
				<el-form-item label="工作中心" prop="workCenterName">
					<el-input v-model="form.workCenterName" placeholder="工作中心" disabled></el-input>
				</el-form-item>
				<el-form-item label="工作站" prop="workstationIds">
					<el-select v-model="form.workstationIds" multiple placeholder="工作站">
						<el-option v-for="item in deviceList" :key="item.workstationId" :label="item.workstationName" :value="item.workstationId">
						</el-option>
					</el-select>
				</el-form-item>
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
		getRestWorkstation,
		deviceCreate
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.areaName = data.areaName;
			this.enterpriseName = data.enterpriseName;
			this.productionLineName = data.productionLineName;
			this.workCenterName = data.workCenterName;
			this.workstationIds = [];
		}
	}

	export default {
		data() {
			const workstationIds = (rule, value, callback) => {
				if(value) {
					if(value.length == 0) {
						callback(new Error('请选择设备'));
					} else {
						callback()
					}
				}
			};
			return {
				show: false,
				form: new Form(),
				deviceList: [],
				rules: {
					workstationIds: [{
						validator: workstationIds,
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			getPage(data, callback) {
				this.schedulingId = data.id
				this.data = data
				this.workCenterId = data.workCenterId
				this.callback = callback
				this.form = new Form(data);
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.getDeviceData()
				this.show = true
			},

			//得到设备列表
			async getDeviceData() {
				let res = await getRestWorkstation({
					workCenterId: this.workCenterId,
					schedulingId: this.schedulingId
				});
				if(res.status == "success") {
					this.deviceList = res.content
				} else {
					this.deviceList = []
				}
			},

			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.schedulingId = this.schedulingId
						this.form.enterpriseId = this.data.enterpriseId
						this.form.areaId = this.data.areaId
						this.form.productionLineId = this.data.productionLineId
						this.form.workCenterId = this.data.workCenterId
						this.form.workstationIds = this.form.workstationIds.join(",")
						deviceCreate(this.form).then((res) => {
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