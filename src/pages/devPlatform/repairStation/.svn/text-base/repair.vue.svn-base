<template>
  <el-dialog title="维修信息" :visible.sync="show" size="tiny" :close-on-click-modal="false">
    <el-form :model="form" ref="form">
      <el-form-item label="不良位置" prop="location">
        <el-input type="textarea" v-model="form.location" placeholder="不良位置" disabled></el-input>
      </el-form-item>
      <el-form-item label="录入人员" prop="entryPerson">
        <el-input v-model="form.entryPerson" placeholder="录入人员" disabled></el-input>
      </el-form-item>
      <el-form-item label="不良描述" prop="badDescription">
        <el-input type="textarea" v-model="form.badDescription" placeholder="不良描述" disabled></el-input>
      </el-form-item>
      <el-form-item label="维修说明" prop="location">
        <el-input type="textarea" v-model="form.repairDescription" placeholder="维修说明" disabled></el-input>
      </el-form-item>
      <el-form-item label="维修人员" prop="entryPerson">
        <el-input v-model="form.repairPerson" placeholder="维修人员" disabled></el-input>
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
    queryBadInfo,
    edit
  } from "./service";

  class Form {
    constructor(data = {}) {
      this.id = data.id;
      this.isRework = data.isRework;
      this.location = data.location;
      this.entryPerson = data.entryPerson;
      this.repairPerson = data.repairPerson;
      this.badDescription = data.badDescription;
      this.repairDescription = data.repairDescription;
    }
  }
  export default {
    data() {
      return {
        show: false,
        form: new Form()
      }
    },
    methods: {
      getPage(data) {
        this.getBadInfo(data);
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async getBadInfo(data) {
        let params = {
          produceInfoId: "11"
        };
        let res = await queryBadInfo(params);
        if (res.status == 'success') {
          this.form = new Form(res.content[0])
        }
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
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
  .el-date-editor.el-input, .el-input-number {
    width: 100%
  }
</style>
