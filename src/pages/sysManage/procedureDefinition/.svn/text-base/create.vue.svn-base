<template>
	<el-dialog title="新建工序" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item label="编码" prop="code">
				<el-input v-model="form.code" placeholder="编码"></el-input>
			</el-form-item>
			<el-form-item label="图标">
				<mes-image-upload :value="form.icon" @change="changeImage" ref="image"></mes-image-upload>
			</el-form-item>
			<el-form-item label="配置类型" prop="configTypes">
				<el-select v-model="form.configTypes" placeholder="请选择配置类型" multiple filterable>
					<el-option v-for="item in processConfigTypeList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
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
		queryProcedureDefinition,
		queryAllConfigType,
		create,
	} from "./service";

	class Form {
		constructor() {
			this.name = "";
			this.code = "";
			this.icon = "";
			this.configTypes = [];
		}
	}

	export default {
		created() {},
		data() {
			return {
				show: false,
				form: {},
				rules: {},
				processConfigTypeList: []
			}
		},
		methods: {
			getPage() {
				this.form = new Form();
				this.getConfigType();
				this.rules = {
					name: [{
							required: true,
							message: '请输入工序名',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryProcedureDefinition),
							trigger: 'change'
						}
					],
					code: [{
							required: true,
							message: '请输入编码',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonEn.pattern,
							message: this.$.regular.common.commonEn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryProcedureDefinition, null, "code", "该编码已存在"),
							trigger: 'change'
						}
					]
				}
				if(this.$refs.form) {
					setTimeout(()=>{
						this.$refs.form.resetFields();
					})
				} 
				this.show = true
			},
			async getConfigType() {
				let res = await queryAllConfigType();
				if(res.status == 'success' && res.content.length > 0) {
					this.processConfigTypeList = res.content.map((val) => {
						val.edit = false
						return val
					})
					this.processConfigTypeList.sort((a, b) => {
						return a.id < b.id;
					})
				}
			},
			changeImage(data) {
				this.form.icon = data
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