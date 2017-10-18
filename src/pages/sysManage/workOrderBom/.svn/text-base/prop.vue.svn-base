<template>
  <el-dialog id="prop" title="BOM属性" :visible.sync="show" size="small" :close-on-click-modal="false">
    <!--<el-form :model="form" ref="form" label-width="80px">-->
      <!--<el-row :gutter="40">-->
        <!--<el-col :span="10">-->
          <!--<el-form-item label="属性名" prop="key">-->
            <!--<el-select v-model="form.key" placeholder="属性名">-->
              <!--<el-option label="key1" value="1">-->
              <!--</el-option>-->
              <!--<el-option label="key2" value="2">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="10">-->
          <!--<el-form-item label="属性值" prop="value">-->
            <!--<el-input v-model="form.value" placeholder="属性值"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="4">-->
          <!--<el-form-item >-->
            <!--<el-button type="primary" @click="submit" :disabled="(!form.key)||(!form.value)">添加</el-button>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</el-form>-->
    <div class="mes-table">
      <mes-table :table-data="table.data"
                 :table-option="table.option"
                 :table-loading="table.loading"
                 :total="table.pageTotal"
                 :pageSize="table.pageSize"
                 :pageChange="pageChange"
                 :sizeChange="sizeChange"
                 :pageNum="table.pageNum"
                 :showCheckBox="false"
                 @selectChange="selectChange">
        <!--<el-table-column fixed="right" label="操作" width="180" v-if="table.data.length>0" slot="operationTool">-->
          <!--<template scope="scope">-->
            <!--<el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small">-->
              <!--删除-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </mes-table>
    </div>
  </el-dialog>
</template>

<script>
  import {
    propDelete,
    propData,
    prop
  } from "./service";
  class Form {
    constructor(data = {}) {
      this.bomProduceId = data.bomProduceId;
      this.key = "";
      this.value = "";
    }
  }

  export default {
    data(data) {
      return {
        show: false,
        form: new Form(data),
        table: {
          option: [{
            prop: "name",
            label: "属性名"
          }, {
            prop: "value",
            label: "属性值"
          }, {
            prop: "createDate",
            label: "创建时间"
          }],
          data: [],
          loading: false,
          pageSize: 5,
          pageNum: 1
        },
        bomProduceId: ""
      }
    },
    methods: {
      async queryData(){
        this.table.loading = true;
        let data = {
          condition: {
            bomProduceId: this.form.bomProduceId
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await propData(data);
        if (res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.pageTotal = res.content.total;
        } else {
          this.table.data = [];
          this.table.pageTotal = 0;
        }
        this.table.loading = false;
      },
      getPage(data) {
        this.form = new Form(data);
        this.queryData();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      pageChange(currentPage) {
        this.table.pageNum = currentPage
        this.queryData();
      },
      sizeChange(size) {
        this.table.pageSize = size
        this.queryData();
      },
      selectChange(data){
        this.mutiDeleteData = data
      },
      delete_getPage(data) {
        this.$.delete('此操作将永久删除该用户, 是否继续?', () => {
          propDelete({
            ids: data.id
          }).then((res) => {
            this.queryData()
          })
        })
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            prop(this.form).then((res) => {
              this.form.key = "";
              this.form.value = "";
              this.queryData()
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
  #workOrderBom #prop .el-date-editor.el-input, .el-input-number {
    width: 100%
  }

  #workOrderBom #prop .el-dialog__body {
    height: calc(100% - 115px);
    padding-bottom: 20px;
  }

  #workOrderBom #prop .el-dialog--small {
    bottom: 15%;
  }

  /*#productBom #prop .mes-table {*/
    /*top: 140px;*/
  /*}*/

</style>
