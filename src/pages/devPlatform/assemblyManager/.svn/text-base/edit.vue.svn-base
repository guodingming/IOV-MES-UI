<template>
  <!--新建设备页面-->
  <el-dialog title="编辑组件" :visible.sync="show" size="tiny" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="组件名称" prop="name">
        <el-input v-model="form.name" placeholder="组件名称"></el-input>
      </el-form-item>
      <el-form-item label="文件上传" prop="fileName">
        <el-input v-model="form.fileName" disabled placeholder="文件上传">
        </el-input>
        <el-upload ref="upload" :action="upload" class="mes-upload"
                   :data="file"
                   :on-success="success"
                   :on-change="changeFile"
                   :show-file-list="false">
          <el-button size="small" type="primary" @click="clear()">上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
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
    querySubassembly,
    upload,
    edit
  } from "./service";

  class Form {
    constructor(data={}) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.fileName = data.fileName;
    }
  }


  class File {
    constructor() {
      this.fileName = "";
    }
  }

  export default {
    data() {
      return {
        show: false,
        form: {},
        rules: {},
        file:{},
        upload: upload
      }
    },
    methods: {
      clear(data) {
        this.$refs.upload.clearFiles()
      },
      changeFile(file, fileList) {
        this.file.fileName = encodeURI(file.name);
        if (file) {
          this.form.fileName = file.name;
        }
      },
      success(response, file, fileList) {
        if (file) {
          this.form.path = response.content
        }
      },
      getPage(data) {
        this.form = new Form(data);
        this.rules= {
            name: [{
              required: true,
              message: '请输入组件名称',
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            },
              {
                validator: this.$.checkRepeat(querySubassembly,this.form.id),
                trigger: 'change'
              }
            ],
            fileName: [{
              required: true,
              message: '请上传文件',
              trigger: 'change'
            }
            ]
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

<style scoped>

</style>
