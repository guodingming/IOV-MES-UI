<template>
  <el-dialog title="编辑" :visible.sync="show" size="tiny" id="accessoryConfig" :close-on-click-modal="false" :modal="false">
    <div class="mes-tree">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedData" @change="handleCheckedDataChange">
        <el-checkbox v-for="item in treeData" :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
  </el-dialog>
</template>

<script>
  import {
    createDeviceProcess,
    queryDeviceProcess,
    queryProcess
  } from "./service";

  class Form {
    constructor(data = {}) {
      this.deviceId = data.id;
      this.processIds = [];
      this.checkedData = [];
    }
  }

  export default {
    created() {
    },
    data() {
      return {
        show: false,
        form: new Form(),
        treeData: false,
        checkAll: true,
        isIndeterminate: true,
        checkedData:[],
        processList: [],
      }
    },
    methods: {
      getPage(data,callback) {
        this.callback = callback
        this.form = new Form(data);
        this.getTree();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async getTree() {
        let result = await queryDeviceProcess({deviceId: this.form.deviceId});
        if (result.status == "success") {
            this.checkedData = result.content.map((val)=>{
                return val.processId
              });
        }
        let res = await queryProcess();
        if (res.status == "success") {
          this.treeData = res.content;
        } else {
          this.treeData = []
        }
      },
      handleCheckAllChange(event) {
        this.checkedData = event.target.checked ? this.treeData.map((val)=>{
          return val.id
        }) : [];
        this.isIndeterminate = false;
      },
      handleCheckedDataChange(value) {
        let checkedCount = this.checkedData.length;
        this.checkAll = checkedCount === this.treeData.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.treeData.length;
      },
      submit() {
        this.show = false;
        this.form.processIds = this.checkedData
        createDeviceProcess(this.form).then((res) => {
          this.callback()
        });

      }
    }
  }
</script>

<style>
  #deviceManage #accessoryConfig .el-date-editor.el-input, .el-input-number {
    width: 100%
  }

  #deviceManage #accessoryConfig .el-dialog--tiny {
    bottom: 15%;
  }

  #deviceManage #accessoryConfig .el-dialog--tiny .el-dialog__body {
    height: calc(100% - 115px);
    position: relative;
    overflow: auto;
  }
  #deviceManage #accessoryConfig  .el-checkbox{
    width: 100%;
    padding:6px;
  }
  #deviceManage #accessoryConfig .el-checkbox+.el-checkbox{
    margin-left:0;
  }
</style>
