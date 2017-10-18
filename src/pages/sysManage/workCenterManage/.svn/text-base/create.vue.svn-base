<template>
	<el-dialog title="新建工作站" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="工作站名称" prop="name">
				<el-input v-model="form.name" placeholder="工作站名称"></el-input>
			</el-form-item>
			<!--  <el-form-item label="位置" prop="location">
        <el-input v-model="form.location" placeholder="条码"></el-input>
      </el-form-item>-->
			<el-form-item label="设备" prop="deviceIdList">
				<el-select v-model="form.deviceIdList" multiple placeholder="设备">
					<el-option v-for="item in deviceList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<!--  <el-form-item label="分类" prop="category">
        <el-select v-model="form.category" placeholder="分类">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>-->
			<el-form-item label="描述" prop="description">
				<el-input type="textarea" v-model="form.description" placeholder="描述"></el-input>
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
		create,
		queryWorkstation,
		queryDevice
	} from "./service";

	class Form {
		constructor() {
			this.name = "";
			this.location = "";
			this.description = "";
			this.deviceIdList = [];
			this.deviceIds = "";
			this.category = "";
			this.workCenterId = "";
		}
	}

	export default {
		created() {
			this.init()
		},
		computed: {},
		data() {
			return {
				show: false,
				form: {},
				rules: {},
				deviceList: [],
			}
		},
		methods: {
			init() {
				this.getDevice()
			},
			getPage() {
				const checkIsNull = (rule, value, callback) => {
					if(value) {
						if(!value) {
							callback(new Error('请选择工作站设备'));
						} else {
							callback()
						}
					}
				};
				this.form = new Form();
				this.rules = {
					name: [{
							required: true,
							message: '请输入工作站名称',
							trigger: 'change'
						}, {
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryWorkstation),
							trigger: 'change'
						}
					],
					deviceIdList: [{
						required: true,
						validator: _.debounce(checkIsNull, 1000),
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
			async getDevice() {
				queryDevice().then(result => {
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
						this.form.workCenterId = this.$parent.selectNode.id
						this.form.deviceIds = this.form.deviceIdList.join(",")
						console.info(this.form)
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
