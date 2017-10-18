<template>
	<el-dialog title="新建设备" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<!--<el-row :gutter="40">-->
			<!--<el-col :span="12">-->
			<el-form-item label="设备名称" prop="name">
				<el-input v-model="form.name" placeholder="设备名称"></el-input>
			</el-form-item>
			<el-form-item label="配置类型" prop="deviceConfigTypeIds">
				<el-select v-model="form.deviceConfigTypeIds" placeholder="请选择配置类型" multiple filterable>
					<el-option v-for="item in deviceConfigTypeList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="资产编码" prop="assetCode">
				<el-input v-model="form.assetCode" placeholder="资产编码"></el-input>
			</el-form-item>
			<el-form-item label="IP" prop="ip">
				<el-input v-model="form.ip" placeholder="IP"></el-input>
			</el-form-item>
			<el-form-item label="设备描述" prop="description">
				<el-input type="textarea" v-model="form.description" placeholder="设备描述"></el-input>
			</el-form-item>
			<!--</el-col>-->
			<!--<el-col :span="12">-->
			<!--<el-form-item label="内存" prop="capacity">-->
			<!--<el-input v-model="form.capacity" placeholder="内存"></el-input>-->
			<!--</el-form-item>-->
			<!--<el-form-item label="优先级" prop="priority">-->
			<!--<el-input v-model="form.priority" placeholder="优先级"></el-input>-->
			<!--</el-form-item>-->
			<!--<el-form-item label="类型" prop="category">-->
			<!--<el-input v-model="form.category" placeholder="类型"></el-input>-->
			<!--</el-form-item>-->
			<!--<el-form-item label="SN号" prop="snNum">-->
			<!--<el-input v-model="form.snNum" placeholder="SN号"></el-input>-->
			<!--</el-form-item>-->
			<!--</el-col>-->
			<!--</el-row>-->
		</el-form>
		<span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
	</el-dialog>

</template>

<script>
	import {
		queryAllConfigType,
		queryDevice,
		create
	} from "./service";

	class Form {
		constructor() {
			this.name = "";
			this.deviceConfigTypeIds = [];
			this.assetCode = "";
			this.ip = "";
			this.description = "";
			this.capacity = "";
			this.priority = "";
			this.category = "";
			this.snNum = "";
		}
	}

	export default {
		data() {
			return {
				show: false,
				form: {},
				rules: {},
				deviceConfigTypeList: [],
				configTypes: [],
			}
		},
		methods: {
			getPage() {
				const deviceConfigTypeIds = (rule, value, callback) => {
					if(value.length == 0) {
						callback(new Error('请选择配置类型'));
					} else {
						callback()
					}
				};
				this.form = new Form();
				this.configTypes = [];
				this.getConfigType();
				this.rules = {
					name: [{
							required: true,
							message: '请输入设备名称',
							trigger: 'change'
						}, {
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryDevice),
							trigger: 'change'
						}
					],
					deviceConfigTypeIds: [{
						required: true,
						validator: deviceConfigTypeIds,
						trigger: 'change'
					}],
					ip: [{
						required: true,
						message: '请输入IP',
						trigger: 'change'
					}, {
						pattern: this.$.regular.common.ip.pattern,
						message: this.$.regular.common.ip.message,
						trigger: 'change'
					}],
					assetCode: [{
						required: true,
						message: '请输入资产编号',
						trigger: 'change'
					}, {
						pattern: this.$.regular.common.commonEn.pattern,
						message: this.$.regular.common.commonEn.message,
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
			async getConfigType() {
				let res = await queryAllConfigType();
				if(res.status == 'success' && res.content.length > 0) {
					this.deviceConfigTypeList = res.content
				}
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.deviceTypeId = this.$parent.selectNode.id
						this.form.areaId = this.$parent.area
						this.form.deviceConfigTypeIds = this.form.deviceConfigTypeIds.join(",")
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
	/*.el-textarea{*/
	/*width:calc(200% + 40px);*/
	/*}*/
</style>