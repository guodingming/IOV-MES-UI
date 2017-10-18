<template>
	<!--编辑条码-->
	<el-dialog title="编辑条码" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item label="函数" prop="fn">
				<mes-cascader :data="cascaderData" ref="cascader" @level1="level1" v-model="form.fn">
				</mes-cascader>
			</el-form-item>
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
		queryBarCode,
		queryFunType,
		queryFn,
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.name = data.name;
			this.description = data.description;
			this.fn = (data.functionTypeId && data.functionId) ? [data.functionTypeId, data.functionId] : [];
		}
	}

	export default {
		created() {
			this.getFnTypeList();
		},
		data() {
			return {
				show: false,
				form: {},
				rules: {},
				cascaderData: []
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
				this.level1(this.form.fn[0], this.form.fn)
				this.rules = {
					name: [{
							required: true,
							message: '请输入名称',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryBarCode, this.form.id),
							trigger: 'change'
						}
					]
				}
				this.show = true
			},
			async getFnTypeList() {
				let res = await queryFunType();
				this.cascaderData = this.$.processArray(res.content, null, {
					children: []
				})
			},
			async level1(id, ids) {
				let res = await queryFn({
					functionTypeId: id
				});
				let data = this.$.processArray(res.content)
				this.$refs.cascader.setChild(id, ids, data)
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.functionTypeId = this.form.fn[0]
						this.form.functionId = this.form.fn[1]
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
