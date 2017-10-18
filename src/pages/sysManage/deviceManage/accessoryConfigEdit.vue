<template>
  <el-dialog title="编辑车间" :visible.sync="show" size="tiny" :close-on-click-modal="false" :modal="false" id="accessoryConfigEdit" class="accessoryConfigEdit">
    <el-form :model="form" :rules="rules" ref="form">
   <!--   <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称"></el-input>
      </el-form-item>-->
      <el-form-item label="设备附件" prop="deviceAnnexInfoIds1">
        <el-select v-model="form.deviceAnnexInfoIds" multiple  placeholder="设备附件">
          <el-option v-for="item in annexList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
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
    queryAnnex,
    accessoryConfigEdit,
    queryProcessAnnexAssociation
  } from "./service";

  class Form {
    constructor(data = {}) {
      this.id = data.id;
      this.deviceId = data.deviceId;
     // this.name = data.name;
      this.deviceAnnexId = data.deviceAnnexId;
      this.deviceAnnexInfoIds = [];
    }
  }

  export default {
    data() {
      return {
        show: false,
        form: new Form(),
        annexList: [],
        rules: {
          deviceAccessoryId: [{
            required: true,
            message: '请填写设备附件',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      getPage(data, callback) {
        this.callback = callback
        this.form = new Form(data);
        this.getAnnex()
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async getAnnex() {
        let res = await queryProcessAnnexAssociation({deviceProcessAnnexId: this.form.id});
        if (res.status == "success") {
          for (let item of res.content) {
            this.form.deviceAnnexInfoIds.push(item.deviceAnnexInfoId)
          }
        }
        let result = await queryAnnex({deviceAnnexId: this.form.deviceAnnexId});
        if (result.status == "success") {
          this.annexList = result.content || []
        }
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.show = false;
            accessoryConfigEdit(this.form).then((res) => {
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

<style>
  #deviceManage #accessoryConfigEdit.accessoryConfigEdit .el-dialog--tiny {
    bottom: auto;
  }
</style>
