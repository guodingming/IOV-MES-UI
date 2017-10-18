<template>
  <el-dialog title="新建工作中心" :visible.sync="show" size="tiny" :close-on-click-modal="false" :modal="false" id="accessoryConfigCreate" class="accessoryConfigCreate">
    <el-form :model="form" :rules="rules" ref="form">
     <!-- <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称"></el-input>
      </el-form-item>-->
      <el-form-item label="设备附件" prop="deviceAnnexInfoIds1">
        <el-select v-model="form.deviceAnnexInfoIds" multiple placeholder="设备附件">
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
    accessoryConfigCreate
  } from "./service";

  class Form {
    constructor(data={}) {
      this.deviceId = data.id;
      this.deviceAnnexId = data.annexTypeId;
      this.deviceAnnexInfoIds = [];
     // this.name = ""
    }
  }

  export default {
    data() {
      return {
        show: false,
        form: new Form(),
        processList:[],
        annexList:[],
        rules: {
          name: [{
            required: false,
            message: '请填写名称',
            trigger: 'change'
          }],
          deviceAnnexInfoIds: [{
            required: true,
            message: '请选择设备附件',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      getPage(data, callback, annexTypeId,treeNode) {
        this.treeNodeId = treeNode.id;
        this.callback = callback
        data.annexTypeId = annexTypeId;
        this.form = new Form(data);
        this.getAnnex();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async getAnnex() {
        let result = await queryAnnex({deviceAnnexId: this.form.deviceAnnexId});
        if (result.status == "success") {
          this.annexList = result.content || []
        }
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.show = false;
            this.form.deviceProcessId = this.treeNodeId;
            accessoryConfigCreate(this.form).then((res) => {
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
  #deviceManage #accessoryConfigCreate.accessoryConfigCreate .el-dialog--tiny {
    bottom: auto;
  }

</style>
