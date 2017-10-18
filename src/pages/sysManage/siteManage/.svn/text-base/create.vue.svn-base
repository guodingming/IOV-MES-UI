<template>
	<el-dialog title="新建工厂" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="工厂名称" prop="name">
				<el-input v-model="form.name" placeholder="工厂名称"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="phone">
				<el-input v-model="form.phone" placeholder="联系电话"></el-input>
			</el-form-item>
			<el-form-item label="联系地址" prop="location">
				<el-input v-model="form.location" placeholder="联系地址"></el-input>
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
		querySite,
		create
	} from "./service";

	class Form {
		constructor() {
			this.name = "";
			this.phone = "";
			this.location = "";
			this.description = "";
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
			getPage() {
				this.form = new Form();
				this.rules = {
					name: [{
						required: true,
						message: '请输入工厂名称',
						trigger: 'change'
					}, {
						pattern: this.$.regular.common.commonCn.pattern,
						message: this.$.regular.common.commonCn.message,
						trigger: 'change'
					}, {
						validator: this.$.checkRepeat(querySite),
						trigger: 'change'
					}],
					phone: [{
						required: true,
						message: '请输入联系电话',
						trigger: 'change'
					}, {
						pattern: this.$.regular.common.mobilePhone.pattern,
						message: this.$.regular.common.mobilePhone.message,
						trigger: 'change'
					}],
					location: [{
						required: true,
						message: '请输入联系地址',
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
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.enterpriseId = this.$parent.selectNode.id
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