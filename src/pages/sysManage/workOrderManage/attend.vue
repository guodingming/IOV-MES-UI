<template>
  <el-dialog title="当前工序任务" :visible.sync="show" size="tiny" :modal="false" :close-on-click-modal="false">
    <el-form :model="form" ref="form">
      <el-form-item label="工序名称">
        <el-input v-model="form.processName" placeholder="工序名称" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="工序编码">
        <el-input v-model="form.processCode" placeholder="工序编码" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="工序结果">
        <el-radio-group v-model="form.isSuccess">
          <el-radio label="1">良品</el-radio>
          <el-radio label="0">不良</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">过站</el-button>
		  </span>
  </el-dialog>
</template>

<script>
  import {
    queryPorject,
    queryBomWork,
    completeTask,
    queryArea,
    getTask,
    create
  } from "./service";

  class Form {
    constructor() {
      this.pdProductInfoId = "";
      this.processName = "";
      this.processCode = "";
      this.produceProcessId = "";
      this.isSuccess = "1";
    }
  }

  export default {
    computed: {},
    data() {
      return {
        show: false,
        form: new Form(),
        bringData: ""
      }
    },
    methods: {
      getPage(data, callback) {
        this.callback = callback;
        this.bringData = data;
        this.form = new Form();
        this.process_getTask(data);
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async process_getTask(data) {
        let res = await getTask({productInfoId: data.product.id});
        if (res.status == "success") {
          this.form.produceProcessId = res.content.produceProcessId;
          this.form.pdProductInfoId = this.bringData.product.id;
          this.form.processName = res.content.processName;
          this.form.processCode = res.content.processCode;
        } else {
          this.form = new Form(this.bringData)
        }
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.show = false;
            let param = {
              produceProcessId: this.form.produceProcessId,
              pdProductInfoId: this.form.pdProductInfoId,
              isSuccess: this.form.isSuccess
            };
            completeTask(param).then((res) => {
              this.callback();
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
  .el-date-editor.el-input, .el-input-number {
    width: 100%
  }
</style>
