<template>
	<el-dialog title="导入Java函数" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item label="文件名称" prop="filename">
				<el-input v-model="form.filenameCn" placeholder="文件名称" disabled></el-input>
				<el-upload ref="upload" :action="uploadUrl" class="mes-upload" :on-success="create_upload" :on-change="changeFile" :auto-upload="false" :data="form" :show-file-list="false">
					<el-button size="small" type="primary" @click="clear">上传文件</el-button>
				</el-upload>
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
		create,
    queryJavaName,
		uploadUrl
	} from "./service";

	class Form {
		constructor(type = "") {
			this.type = type;
			this.name = "";
			this.description = "";
			this.filename = "";
			this.filenameCn = "";
			this.clazz = "";
		}
	}

	export default {
		data() {
			return {
				show: false,
        form: {},
        rules: {},
				uploadUrl: uploadUrl
			}
		},
		methods: {
			getPage() {
				this.form = new Form(this.$parent.type);
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
              validator: this.$.checkRepeat(queryJavaName),
              trigger: 'change'
            }],
              filename: [{
              required: true,
              message: '请输入文件名',
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
			create_upload(response, file, fileList) {
				this.$parent.queryData();
			},
			clear() {
				this.$refs.upload.clearFiles()
			},
			changeFile(file, fileList) {
				this.form.filenameCn = file.name
				this.form.filename = encodeURI(file.name)
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
            this.form.functionTypeId = this.$parent.selectNode.id
						this.$refs.upload.submit()
					} else {
						return false;
					}
				});
			}
		}
	}
</script>

<style>
</style>
