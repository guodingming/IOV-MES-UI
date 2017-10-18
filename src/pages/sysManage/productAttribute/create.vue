<template>
  <el-dialog title="新建属性" :visible.sync="show" size="tiny" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="中文名称" prop="name">
        <el-input v-model="form.name" placeholder="中文名称"></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="key">
        <el-input v-model="form.key" placeholder="英文名"></el-input>
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
    queryAttribute,
    create
  } from "./service";

  class Form {
    constructor() {
      this.name = "";
      this.key = "";
      this.pdId = "";
    }
  }

  export default {
    computed: {
    },
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
        if(this.$refs.form) {
          this.$refs.form.resetFields();
        }else{
          this. rules= {
            name: [{
              required: true,
              message: '请填写中文名',
              trigger: 'change'
            },
              {
                pattern: this.$.regular.common.nameCn.pattern,
                message: this.$.regular.common.nameCn.message,
                trigger: 'change'
              },
              {
                validator:this.$.checkRepeat(queryAttribute),
                trigger: 'change'
              }],
              key: [{
              required: true,
              message: '请填写英文名',
              trigger: 'change'
            },
              {
                pattern: this.$.regular.common.commonEn.pattern,
                message: this.$.regular.common.commonEn.message,
                trigger: 'change'
              },
              {
                validator: this.$.checkRepeat(queryAttribute,null,"key"),
                trigger: 'change'
              }]
          }
        }
        this.show = true
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if(valid) {
            this.show = false;
            this.form.pdId = this.$parent.selectNode.id
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
  .el-date-editor.el-input,.el-input-number{
    width:100%
  }
</style>
