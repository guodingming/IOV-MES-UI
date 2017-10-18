<template>
	<el-dialog title="新建groovy函数" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="description">
				<el-input v-model="form.description" placeholder="描述"></el-input>
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
    queryGroovyName
	} from "./service";

	class Form {
		constructor() {
			this.name = "";
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
        this.rules={
            name: [{
              required: true,
              message: '请输入函数名',
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            },{
              validator: this.$.checkRepeat(queryGroovyName),
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
						this.form.functionTypeId = this.$parent.selectNode.id;
						this.form.type = "1"
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
.code{
	height:300px;
}
.el-form-item__content{
	height:100%;
}
</style>
