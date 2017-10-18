<template>
	<el-dialog title="加入用户组" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="部门" prop="dept">
				<el-select v-model="form.dept" placeholder="请选择部门" @change="getUser">
					<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="人员" prop="userIds">
				<el-select v-model="form.userIds" placeholder="请选择人员" multiple filterable>
					<el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id">
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
		getUser,
		create
	} from "./service";

	class Form {
		constructor() {
			this.dept = "";
			this.userIds = [];
		}
	}

	export default {
		created() {},
		computed: {
			deptList: function() {
				return this.$parent.deptList
			}
		},
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
				rules: {
					dept: [{
							required: true,
							message: '请选择部门',
							trigger: 'change'
					}],
					userIds: [{
							required: true,
							validator:userIds,
							trigger: 'change'
					}]
				},
				userList:[]
			}
		},
		methods: {
			getPage() {
				this.form = new Form();
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.show = true
			},
			async getUser() {
				let res = await getUser({userGroupId:this.$parent.selectNode.id,deptId:this.form.dept});
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
						this.form.groupId = this.$parent.selectNode.id
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