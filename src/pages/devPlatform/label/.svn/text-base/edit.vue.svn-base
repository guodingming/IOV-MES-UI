<template>
  <el-dialog id="edit" title="编辑标签" :visible.sync="show" size="small" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="标签名称" prop="name">
            <el-input v-model="form.name" placeholder="名称"></el-input>
          </el-form-item>
					<el-form-item label="函数" prop="fn">
						<mes-cascader :data="cascaderData" ref="cascader" @level1="level1" v-model="form.fn">
						</mes-cascader>
					</el-form-item>
          <el-form-item label="标签素材" prop="templateName">
            <el-input v-model="form.templateName" disabled placeholder="标签素材">
            </el-input>
            <el-upload ref="templateFile" :action="uploadTemplate" class="mes-upload"
                       :data="form"
                       :on-success="success"
                       :on-change="changeFile"
                       :show-file-list="false">
              <el-button size="small" type="primary" @click="clear('templateFile')">上传素材</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="说明文档" prop="instructionName">
            <el-input v-model="form.instructionName" disabled placeholder="说明文档">
            </el-input>
            <el-upload ref="instructionFile" :action="uploadInstruction" class="mes-upload"
                       :data="form"
                       :on-success="success"
                       :on-change="changeFile"
                       :show-file-list="false">
              <el-button size="small" type="primary" @click="clear('instructionFile')">上传文件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="指令">
            <el-input class="command" type="textarea" v-model="form.templateOrder" placeholder="指令代码"></el-input>
          </el-form-item>
          <el-form-item label="标签模板示例">
            <mes-image-upload :value="form.image" @change="changeImage" ref="image"></mes-image-upload>
          </el-form-item>
          <el-form-item label="描述">
            <el-input class="des" type="textarea" v-model="form.description" placeholder="描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
  </el-dialog>

</template>

<script>
  import {
    uploadInstruction,
    uploadTemplate,
    queryFunType,
    queryLabel,
    queryFn,
    edit
  } from "./service";

  class Form {
    constructor(data={}) {
      this.id = data.id
      this.name = data.name;
      this.image = data.image;
      this.fileName = "";
			this.fn = (data.functionTypeId&&data.functionId)?[data.functionTypeId,data.functionId]:[];
      this.description = data.description;
      this.templatePath = data.templatePath;
      this.templateName = data.templateName;
      this.templateOrder = data.templateOrder;
      this.instructionPath = data.instructionPath;
      this.instructionName = data.instructionName;
    }
  }

  export default {
    created() {
			this.getFnTypeList();
			this.uploadInstruction = uploadInstruction
			this.uploadTemplate = uploadTemplate
    },
    data() {
      return {
        show: false,
        form: {},
        rules: {},
        cascaderData: [],
        currentUpload: "",
        uploadInstruction: "",
        uploadTemplate: ""
      }
    },
    methods: {
      getPage(data) {
        this.form = new Form(data);
				this.level1(this.form.fn[0],this.form.fn)
        if (this.form.instructionPath) {
          let instructionPathFullName = this.form.instructionPath.substring(this.form.instructionPath.lastIndexOf("/") + 1);
          this.form.instructionName = instructionPathFullName.substring(instructionPathFullName.indexOf("-") + 1)
        	let templateFullName = this.form.templatePath.substring(this.form.templatePath.lastIndexOf("/") + 1);
          this.form.templateName = templateFullName.substring(templateFullName.indexOf("-") + 1)
        }
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
								validator: this.$.checkRepeat(queryLabel,this.form.id),
								trigger: 'change'
							}
						],
						templateName: [{
							required: true,
							message: '请上传模板文件',
							trigger: 'change'
						}],
						instructionName: [{
							required: true,
							message: '请上传说明文档',
							trigger: 'change'
						}],
						templateOrder: [{
							required: true,
							message: '请输入打印指令',
							trigger: 'change'
						}],
						image: [{
							required: true,
							message: '请上传标签示例图片',
							trigger: 'change'
						}]
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
      changeImage(data) {
        this.form.image = data
      },
      clear(data) {
        this.currentUpload = data;
        this.$refs[data].clearFiles()
      },
      changeFile(file, fileList) {
        this.form.fileName = encodeURI(file.name);
        if (file) {
          if (this.currentUpload == 'templateFile') {
            this.form.templateName = file.name;
          }
          if (this.currentUpload == 'instructionFile') {
            this.form.instructionName = file.name;
          }
        }
      },
      success(response, file, fileList) {
        if (this.currentUpload == 'templateFile') {
          this.form.templatePath = response.content
        }
        if (this.currentUpload == 'instructionFile') {
          this.form.instructionPath = response.content
        }
      },

      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
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

<style>
#label #edit .command textarea{
	height:130px
}
#label #edit .des textarea{
	height:145px
}
</style>
