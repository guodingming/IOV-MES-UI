<template>
  <el-dialog title="物料替换" :visible.sync="show" size="small" :close-on-click-modal="false" id="selectReplace"
             :modal="false">
    <el-form>
      <el-form-item label="BOM" prop="bomMaterialsId">
        <mes-dropdown-tree :data="treeData" @change="test" placeholder="请选择物料" :value="value"></mes-dropdown-tree>
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
    getMaterialTree,
    queryReplace,
    saveData
  } from "./service";

  class Form {
    constructor(data = {}) {
    }
  }

  export default {
    data(data) {
      return {
        show: false,
        value: "",
        form: new Form(data),
        bringData: "",
        treeData: false,
      }
    },
    methods: {
      test(data){
        this.selectNode = data
      },
      getPage(data, id) {
        this.bringData = data
        this.bomId = id
        this.value = ""
        this.getTree()
        this.show = true
      },
      async getTree() {
        let result = await queryReplace({bomWorkAmountId: this.bringData.id});
        if (result.status == "success") {
          this.materialData = result.content||false;
        } else {
            this.materialData = false;
        }
        let res = await getMaterialTree({bomId: this.bomId});
        if (res.status == "success") {
          this.treeData = res.content
          if (this.materialData[0]) {
            this.value = this.materialData[0].bomMaterialsId;
          } else {
              this.value = ""
          }
        } else {
          this.treeData = []
        }
        this.selectNode = null
      },

      submit() {
        this.show = false;
        let postData = {
          bomWorkAmountId: this.bringData.id,
          bomMaterialsId: this.selectNode.id
        };
        saveData(postData).then((res) => {
        });
      }
    }
  }
</script>

<style>
  #workOrderBom #selectReplace .el-dialog .el-dialog__body {
    position: relative;
    height: 200px;
    top: 0;
  }
</style>
