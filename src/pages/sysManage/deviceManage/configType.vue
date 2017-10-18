<template>
  <el-dialog title="设备配置类型" :visible.sync="show" size="tiny" id="configType" :close-on-click-modal="false">
        <el-col :span="24">
            <el-checkbox-group v-model="form.deviceConfigTypeIds" >
              <el-checkbox v-for="item in deviceConfigTypeList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
        </el-col>
    <span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
  </el-dialog>

</template>

<script>
  import {
    queryConfig,
    queryAllConfigType,
    saveDeviceConfigTypes
  } from "./service";

  class Form {
    constructor(data={}) {
      this.deviceId = data.id;
      this.deviceConfigTypeIds = [];
    }
  }
  export default {
    data() {
      return {
        show: false,
        form: new Form(),
        deviceConfigTypeList:[],
      }
    },
    methods: {
      getPage(data) {
        this.form = new Form(data);
        this.getConfigType();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async getConfigType() {
        let res = await queryAllConfigType();
        if (res.status == 'success' && res.content.length > 0) {
          this.deviceConfigTypeList = res.content
        }
        let result = await queryConfig({deviceId: this.form.deviceId});
        if (result.status == 'success' && result.content.length > 0) {
          this.form.deviceConfigTypeIds = result.content.map((val)=>{
              return val.deviceConfigTypeId
          })
        }
      },
      submit() {
          this.show = false;
          saveDeviceConfigTypes(this.form).then((res) => {
            this.$parent.queryData();
          });
      }
    }
  }
</script>

<style>
 #deviceManage #configType  .el-checkbox {
   display: block;
    width: 100%;
    padding:10px 0;
     margin-left:20px
  }
 #deviceManage #configType  .el-dialog.el-dialog--tiny{
     bottom:15%
   }
 #deviceManage #configType   .el-dialog__body{
     height:calc(100% - 115px);
     padding-bottom:20px;
     overflow: auto;
   }
</style>
