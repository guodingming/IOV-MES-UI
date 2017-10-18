<template>
	<el-dialog title="新建用户" :visible.sync="show" size="small" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-row :gutter="40">
				<el-col :span="12">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="form.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="form.password" placeholder="密码" type="password"></el-input>
					</el-form-item>
					<el-form-item label="角色" prop="roleId">
						<el-select v-model="form.roleId" placeholder="角色">
							<el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="座机号" prop="phone">
						<el-input v-model="form.phone" placeholder="座机号"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="form.email" placeholder="邮箱"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="form.name" placeholder="姓名"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
						<el-select v-model="form.sex" placeholder="性别">
							<el-option label="男" value="男"></el-option>
							<el-option label="女" value="女"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="工号" prop="jobNumber">
						<el-input v-model="form.jobNumber" placeholder="工号"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="mobilePhone">
						<el-input v-model="form.mobilePhone" placeholder="手机号"></el-input>
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
		queryUser,
		create
	} from "./service";

	class Form {
		constructor() {
			this.username = "";
			this.password = "";
			this.name = "";
			this.sex = "";
			this.jobNumber = "";
			this.roleId = "";
			this.phone = "";
			this.mobilePhone = "";
			this.email = "";
		}
	}

	export default {
		created() {},
		computed: {
			roleList: function() {
				return this.$parent.roleList
			}
		},
		data() {
			return {
				show: false,
				form: {},
				rules: {},
			}
		},
		methods: {
			getPage() {
				this.form = new Form();
				this.rules = {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonEn.pattern,
							message: this.$.regular.common.commonEn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryUser, null, "username", "该用户名已存在"),
							trigger: 'change'
						}
					],
					mobilePhone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.mobilePhone.pattern,
							message: this.$.regular.common.mobilePhone.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryUser, null, "mobilePhone", "该手机号已存在"),
							trigger: 'change'
						}
					],
					email: [{
						pattern: this.$.regular.common.email.pattern,
						message: this.$.regular.common.email.message,
						trigger: 'change'
					}],
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.nameCn.pattern,
							message: this.$.regular.common.nameCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryUser, null, null, "该姓名已存在"),
							trigger: 'change'
						}
					],
					jobNumber: [{
              validator: this.$.validateRequire('请填写工号'),
              trigger: 'change'
						},
						{
							pattern: this.$.regular.common.number.pattern,
							message: this.$.regular.common.number.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryUser, null, "jobNumber", "该工号已存在"),
							trigger: 'change'
						}
					],
					phone: [{
						pattern: this.$.regular.common.phone.pattern,
						message: this.$.regular.common.phone.message,
						trigger: 'change'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.password.pattern,
							message: this.$.regular.common.password.message,
							trigger: 'change'
						}
					],
					roleId: [{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}],
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
						this.form.deptId = this.$parent.selectNode.id
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
