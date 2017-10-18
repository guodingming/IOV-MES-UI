<template>
	<el-dialog title="新建车间" :visible.sync="show" size="tiny">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="车间名称" prop="name">
				<el-input v-model="form.name" placeholder="车间名称"></el-input>
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
		queryArea,
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
		computed:{
			selectNode:function(){
				return this.$parent.selectNode
			}
		},
		data() {
			const name = (rule, value, callback) => {
				if(value) {
					queryArea({
						siteInfoId:this.selectNode.id,
						name: value
					}).then((res) => {
						if(res.content.length > 0) {
							callback(new Error('该车间名称已被使用'));
						} else {
							callback()
						}
					})

				}
			};
			return {
				show: false,
				form: new Form(),
				rules: {
					name: [{
						required: true,
						message: '请输入车间名称',
						trigger: 'change'
					},{
						validator: _.debounce(name, 1000),
						trigger: 'change'
					}],
					phone: [{
							required: true,
							message: '请输入联系电话',
							trigger: 'change'
					}],
					location: [{
							required: true,
							message: '请输入联系地址',
							trigger: 'change'
					}]
				}
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
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.siteInfoId = this.selectNode.id
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