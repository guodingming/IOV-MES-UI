<template>
	<el-dialog title="Groovy脚本" :visible.sync="show" size="full" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="脚本" prop="script" class="code">
			 	<codemirror v-model="form.script" :options="editorOptions"></codemirror>
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
		edit
	} from "./service";

	class Form {
		constructor(data={}) {
			this.id = data.id;
			this.script = data.script;
		}
	}

	export default {
		data() {
			return {
				show: false,
				form: new Form(),
        rules: {},
				editorOptions:{
				//	mode: 'text/x-groovy'
				}
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.show = true
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

<style >
.code{
	height:500px;
}
.el-form-item__content{
	height:100%;
}
.CodeMirror{
	height:calc(100% - 36px);
	width:100%;
	border-radius:4px;
	border:1px solid #bfcbd9;
}
.el-dialog__footer{
  padding-right:68px;
}
</style>
