<template>
	<!--加入用户组页面-->
	<el-dialog title="新建表" :visible.sync="show" size="tiny" :close-on-click-modal="false" id="create">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="英文表名" prop="name">
				<el-input v-model="form.name" placeholder="英文表名">
					<!--<template slot="prepend">mes_external_</template>-->
				</el-input>
			</el-form-item>
			<el-form-item label="中文表名" prop="cnName">
				<el-input v-model="form.cnName" placeholder="中文表名"></el-input>
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
		nameRepeat
	} from "./service";

	class Form {
		constructor() {
			this.name = "";
			this.cnName = "";
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
								message: '请输入英文表名',
								trigger: 'change'
							},
							{
								pattern: this.$.regular.common.commonEn.pattern,
								message: this.$.regular.common.commonEn.message,
								trigger: 'change'
							},
							{
								validator: this.$.checkRepeat(nameRepeat),
								trigger: 'change'
							}
						],
						cnName: [{
								required: true,
								message: '请输入中文表名',
								trigger: 'change'
							},
							{
								pattern: this.$.regular.common.commonCn.pattern,
								message: this.$.regular.common.commonCn.message,
								trigger: 'change'
							}
						]
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
						this.form.tableTypeId = this.$parent.selectNode.id
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
