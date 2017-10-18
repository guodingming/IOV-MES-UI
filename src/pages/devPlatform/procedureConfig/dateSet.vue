<template>
  <!--时间设置-->
  <el-dialog title="时间设置" id="create" :visible.sync="show" size="small" :close-on-click-modal="false" :modal="false">
    <el-form :model="form" :inline="true" ref="form">
      <el-row :gutter="60">
        <el-col :span="8">
          <el-form-item label="当前工序操作时间必须">
            <el-select v-model="form.expression" placeholder="请选择比较符">
              <el-option label="大于" value=">"></el-option>
              <el-option label="小于" value="<"></el-option>
              <el-option label="等于" value="="></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位">
            <el-select v-model="form.unit" placeholder="请选择单位" @change="unitChange">
              <el-option label="时" value="h"></el-option>
              <el-option label="分" value="m"></el-option>
              <el-option label="秒" value="s"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数值">
            <el-select v-model="form.data" placeholder="请选择数值">
              <el-option v-for="item in dataOption" :label="item" :value="item"></el-option>
            </el-select>
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
    configDateSet,
    getDateSet
  } from "./service";

  class Form {
    constructor(data = {}) {
      this.id = data.id;
      this.data = data.data;
      this.unit = data.unit;
      this.expression = data.expression;//gt,lt,eq
      this.produceProcessId = "";
    }
  }

  export default {
    data() {
      return {
        show: false,
        form: new Form(),
        dataOption: [],
        bringData: ""
      }
    },
    methods: {
      unitChange(){
        if (this.form.unit == 'h') {
          this.dataOption = [];
          for (let i = 1; i < 24; i++) {
            this.dataOption.push(i);
          }
        }
        if (this.form.unit == 'm' || this.form.unit == 's') {
          this.dataOption = [];
          for (let i = 1; i < 60; i++) {
            this.dataOption.push(i);
          }
        }
      },
      getPage(data) {
        this.bringData = data;
        this.form = new Form();
        this.form.produceProcessId = data.id;
        this.queryDateSet();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async queryDateSet() {
        let res = await getDateSet({produceProcessId: this.bringData.id});
        if (res.status == "success" && res.content.length > 0) {
            this.form.id = res.content[0].id
            this.form.data = res.content[0].data
            this.form.unit = res.content[0].unit
            this.form.expression = res.content[0].expression
        }
      },
      submit() {
        this.show = false;
        configDateSet(this.form).then((res) => {
          this.$parent.queryData();
        });
      }
    }
  }
</script>

<style>
  #procedureConfig #create .el-date-editor.el-input, .el-input-number {
    width: 100%
  }

</style>
