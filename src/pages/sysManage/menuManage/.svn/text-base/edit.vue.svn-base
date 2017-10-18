<template>
	<el-dialog title="编辑菜单" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="菜单名称" prop="name">
				<el-input v-model="form.name" placeholder="菜单名称"></el-input>
			</el-form-item>
			<el-form-item label="图片地址" prop="icon">
				<el-input v-model="form.icon" placeholder="图片地址"></el-input>
			</el-form-item>
			<el-form-item label="url" prop="url">
				<el-input v-model="form.url" placeholder="url"></el-input>
			</el-form-item>
			<el-form-item label="上级菜单" prop="parentId">
				<el-select v-model="form.parentId" placeholder="上级菜单">
					<el-option v-for="item in menuList" :key="item.id" :label="item.name" :value="item.id">
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
		queryMenu,
		edit
	} from "./service";

	class Form {
		constructor(data={}) {
			this.id = data.id;
			this.name = data.name;
			this.url = data.url;
			this.icon = data.icon;
			this.parentId = data.parentId;
		}
	}

	export default {
		data() {
			const name1 = (rule, value, callback) => {
				if(value) {
					queryMenu({
						parentId:this.form.parentId||this.$parent.selectNode.id,
						name: value
					}).then((res) => {
						if(res.content.length > 0 && this.form.id != res.content[0].id) {
							callback(new Error('该菜单名名称已被使用'));
						} else {
							callback()
						}
					})

				}
			};
			const name2 = (rule, value, callback) => {
				if(value) {
					this.$refs.form.validateField("name");
          callback();
				}
			};
			return {
				show: false,
				form: new Form(),
				rules: {
					name: [{
						required: true,
						message:"请填写菜单名称",
						trigger: 'change'
					},{
            pattern: this.$.regular.common.nameCn.pattern,
            message: this.$.regular.common.nameCn.message,
            trigger: 'change'
          },
					{
						validator:name,
						trigger: 'change'
					}],
					parentId: [{
						required: true,
						message:"请选择上级菜单",
						trigger: 'change'
					},
					{
						validator:name2,
						trigger: 'change'
					}],
          url: [{
            required: true,
            message:"请填写url",
            trigger: 'change'
          }],
          icon: [{
            required: true,
            message:"请填写图片地址",
            trigger: 'change'
          }]
				},
				menuList:[],
				userList:[]
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.getMenu()
				this.show = true
			},
			async getMenu() {
				let res = await queryMenu({
					parentId: this.$parent.selectNode.id
				});
				this.menuList = res.content || [];
				this.menuList.unshift({
					id:this.$parent.selectNode.id,
					parentId:this.$parent.selectNode.parentId,
					name:this.$parent.selectNode.name + '(顶级)'
				})
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						edit(this.form).then((res) => {
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
