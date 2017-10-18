<template>
	<el-dialog title="编辑Java函数" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="名称"></el-input>
			</el-form-item>
      <el-form-item label="函数主类" prop="clazz">
        <el-input v-model="form.clazz" placeholder="请输入JAR包中主类全限定类名"></el-input>
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
		edit,
    queryJavaName
	} from "./service";

	class Form {
		constructor(data={}) {
			this.id = data.id;
			this.name = data.name;
			this.clazz = data.clazz;
			this.description = data.description;
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
			getPage(data) {
				this.form = new Form(data);
        this.rules= {
            name: [{
              required: true,
              message: '请输入函数名',
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            },{
              validator: this.$.checkRepeat(queryJavaName,this.form.id),
              trigger: 'change'
            }],
            filename: [{
              required: true,
              message: '请输入文件名',
              trigger: 'change'
            }]
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
	height:300px;
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
</style>
