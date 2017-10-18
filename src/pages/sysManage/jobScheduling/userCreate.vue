<template>
	<el-dialog title="新建人员" :visible.sync="show" size="tiny" :close-on-click-modal="false" :modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-row :gutter="40">
				<el-form-item label="用户组" prop="userGroupName">
					<el-input v-model="form.userGroupName" placeholder="用户组" disabled></el-input>
				</el-form-item>
				<el-form-item label="人员" prop="userIds">
					<el-select v-model="form.userIds" placeholder="请选择人员" multiple filterable>
						<el-option v-for="item in userList" :key="item.userId" :label="item.userName" :value="item.userId">
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
		getRestUser,
		userCreate
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.userGroupName = data.groupName;
			this.userGroupId = data.userGroupId;
			this.userIds = [];
		}
	}

	export default {
		data() {
			const userIds = (rule, value, callback) => {
				if(value.length == 0) {
					callback(new Error('请选择用户'));
				} else {
					callback()
				}
			};
			return {
				show: false,
				form: new Form(),
				userList: [],
				rules: {
					userGroupName: [{
						required: true,
						message: '请填写用户组',
						trigger: 'change'
					}],
					userIds: [{
						required: true,
						validator: userIds,
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			getPage(data, callback) {
				this.schedulingId = data.id
				this.userGroupId = data.userGroupId
				this.callback = callback
				this.form = new Form(data);
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.getUser()
				this.show = true
			},

			//得到用户列表
			async getUser() {
				let res = await getRestUser({
					userGroupId: this.userGroupId,
					schedulingId: this.schedulingId
				});
				if(res.status == "success") {
					this.userList = res.content || []
				} else {
					this.userList = []
				}
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.schedulingId = this.schedulingId
						this.form.userGroupId = this.userGroupId
						this.form.userIds = this.form.userIds.join(",")
						userCreate(this.form).then((res) => {
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