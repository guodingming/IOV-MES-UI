<template>
  <!--新建素材-->
  <el-dialog title="新建素材" :visible.sync="show" size="tiny" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="素材名称" prop="name">
        <el-input v-model="form.name" placeholder="素材名称"></el-input>
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
      <el-form-item label="预览图片">
        <mes-image-upload :value="form.image" @change="changeImage" ref="image"></mes-image-upload>
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
    queryBarCode,
    create,
    upload
  } from "./service";

  class Form {
    constructor() {
      this.name = "";
      this.description = "";
      this.image = "";
      this.fileName = "";
      this.path = "";
      this.materialTypeId = "";
    }
  }


  class File {
    constructor() {
      this.fileName = "";
    }
  }


  export default {
    created() {

    },
    data() {
      return {
        show: false,
        form: {},
        file:{},
        rules: {},
        upload:upload,
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
      changeImage(data) {
        this.form.image = data
      },
      getPage() {
        this.form = new Form();
        this.file = new File();
        this.rules= {
            name: [{
              required: true,
              message: '请输入名称',
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            },
              {
                validator:this.$.checkRepeat(queryBarCode),
                trigger: 'change'
              }
            ],
              image: [{
              required: true,
              message: '请上传图片',
              trigger: 'change'
            }],
              fileName: [{
              required: true,
              message: '请上传文件',
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
            this.form.materialTypeId = this.$parent.selectNode.id
            console.info(this.form)
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
