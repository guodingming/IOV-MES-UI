<template>
	<el-dialog title="新建配置" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="数据类型" prop="type">
				<el-select v-model="form.type" placeholder="配置类型" @change="changeType">
					<el-option label="文件" value="file">
					</el-option>
					<el-option label="其他" value="other">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="配置名称" prop="name">
				<el-input v-model="form.name" placeholder="配置名称"></el-input>
			</el-form-item>
			<el-form-item label="版本" prop="version">
				<el-input v-model="form.version" placeholder="版本"></el-input>
			</el-form-item>
			<el-form-item label="文件名称" v-if="form.type =='file'" prop="filename">
				<el-input v-model="form.filenameCn" placeholder="文件名称" disabled>
				</el-input>
				<el-upload ref="upload" :action="uploadUrl" class="mes-upload" :on-success="create_upload" :on-change="changeFile" :auto-upload="false" :data="form" :show-file-list="false">
					<el-button size="small" type="primary" @click="clear">上传文件</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="内容" prop="content" v-if="form.type =='other'">
				<el-input type="textarea" v-model="form.content" placeholder="其他"></el-input>
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
		uploadUrl,
		queryDeviceConfig
	} from "./service";

	class File {
		constructor() {
			this.type = "file";
			this.name = "";
			this.content = "";
			this.version = "";
			this.filename = "";
			this.filenameCn = "";
		}
	}
	class Other {
		constructor() {
			this.type = "other";
			this.name = "";
			this.version = "";
			this.content = "";
		}
	}

	export default {
		data() {
			return {
				show: false,
				form: {},
				uploadUrl: uploadUrl
			}
		},
    computed:{
      rules: function(){
        return{
          name: [{
            required: true,
            message: '请输入配置名称',
            trigger: 'change'
          },
            {
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            },
            {
              validator: this.$.checkRepeat(queryDeviceConfig,null,"name","该名称及版本已被使用",{version:this.form.version}),
              trigger: 'change'
            }
          ]
        }
      }
    },
		methods: {
			getPage(data) {
				this.bringData = data
				this.changeType("file");
        if(this.$refs.form) {
          setTimeout(() => {
            this.$refs.form.resetFields();
         })
        }
				this.show = true
			},
			changeType(data) {
				if(data == "file") {
					this.form = new File()
				} else {
					this.form = new Other()
				}
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
						this.form.deviceId = this.bringData.deviceId;
						this.form.deviceConfigTypeId = this.bringData.deviceConfigTypeId;
						if(this.form.type == "file") {
							this.$refs.upload.submit()
						}
						else {
							create(this.form).then((res) => {
								this.$parent.queryData();
							});
						}
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
