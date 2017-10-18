<template>
  <!--配置工序-->
  <el-dialog title="配置工序" id="create" :visible.sync="show" size="tiny" :close-on-click-modal="false">
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
    queryProcessByProject,
    queryProcess,
    create
  } from "./service";

  class Form {
    constructor() {
      this.processIds = [];
      this.checkedData = [];
    }
  }

  export default {
    data() {
      return {
        show: false,
        form: new Form(),
        checkAll: true,
        isIndeterminate: true,
        checkedData:[],
        processList: [],
        treeData: false
      }
    },
    methods: {
      getPage() {
        this.form = new Form();
        this.getProcess()
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async getProcess() {
          let res = await queryProcessByProject({projectId:this.$parent.selectNode.id});
          let processList = [];
          if (res.status == "success") {
            this.checkedData = res.content.map((val)=>{
                return val.processId
              });
          }
          let result = await queryProcess();
          if (result.status == 'success' && result.content) {
            this.treeData = result.content;
          } else {
            this.treeData = []
          }
    console.log(this.treeData)
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
        this.form.projectId = this.$parent.selectNode.id;
        this.form.pdId = this.$parent.product;
        this.form.pdLineId = this.$parent.productLine;
        create(this.form).then((res) => {
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

  #procedureConfig #create .el-dialog--tiny {
    bottom: 15%;
  }

  #procedureConfig #create .el-dialog--tiny .el-dialog__body {
    height: calc(100% - 115px);
    position: relative;
    overflow: auto;
  }
  #procedureConfig #create .el-checkbox{
    width: 100%;
    padding:6px;
  }
  #procedureConfig #create .el-checkbox+.el-checkbox{
    margin-left:0;
  }
</style>
