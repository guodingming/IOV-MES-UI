<template>
  <el-dialog title="不良信息录入" :visible.sync="show" size="tiny" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="不良位置" prop="location">
        <el-input type="textarea" v-model="form.location" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="录入人员" prop="entryPerson">
        <el-input v-model="form.entryPerson" placeholder="客户"></el-input>
      </el-form-item>
      <el-form-item label="不良描述" prop="badDescription">
        <el-input type="textarea" v-model="form.badDescription" placeholder="客户"></el-input>
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
//    create
  } from "./service";

  class Form {
    constructor() {
      this.location = "";
      this.entryPerson = "";
      this.badDescription = "";
      this.pdProductInfoId = "";
    }
  }

  export default {
    data() {
      return {
        show: false,
        form: new Form(),
        rules: {
          location: [{
            required: true,
            message: '请填写订单号',
            trigger: 'change'
          }
          ]
        }
      }
    },
    methods: {
      getPage() {
        this.form = new Form();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.show = false;
//            create(this.form).then((res) => {
//              this.$parent.queryData();
//            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .el-date-editor.el-input, .el-input-number {
    width: 100%
  }
</style>
