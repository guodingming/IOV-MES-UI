<template>
  <el-dialog title="投产" :visible.sync="show" size="full" :close-on-click-modal="false" id="operation">
    <el-form :inline="true" :model="form" ref="form">
      <el-row :gutter="40">
        <el-form-item label="SN">
          <el-input v-model="form.SN" placeholder="SN" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item label="连板数">
          <el-input v-model="form.num" placeholder="连板数" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">投产
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="mes-table">
      <mes-table :max-height="table.height"
                 :table-data="table.data"
                 :table-option="table.option"
                 :table-loading="table.loading"
                 :total="table.pageTotal"
                 :pageSize="table.pageSize"
                 :pageChange="pageChange"
                 :sizeChange="sizeChange"
                 :pageNum="table.pageNum"
                 :showCheckBox="false"
                 @selectChange="selectChange">
        <el-table-column fixed="right" label="操作" width="300" v-if="table.data.length>0" slot="operationTool">
          <template scope="scope">
            <el-button @click.native.prevent="attend_getPage(scope.row)" type="text" size="small">
              过站
            </el-button>
            <el-button @click.native.prevent="process_getPage(scope.row)" type="text" size="small">
              查看生产工序
            </el-button>
            <el-button @click.native.prevent="barCode_getPage(scope.row)" type="text" size="small">
              查看产品条码
            </el-button>
            <el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </mes-table>
      <process ref="process_dialog"></process>
      <barCode ref="barCode_dialog"></barCode>
      <attend ref="attend_dialog"></attend>
    </div>
  </el-dialog>
</template>

<script>
  import {
    startWorkFlow,
    queryProductInfo,
    deletProductInfo
  } from "./service";

  import process from "./process"
  import barCode from "./barCode"
  import attend from "./attend"

  class Form {
    constructor(data = {}) {
      this.SN = "";
      this.num = data.num;
      this.pdId = data.pdId;
      this.workOrderId = data.id;
    }
  }

  export default {
    components: {
      process,
      attend,
      barCode
    },
    data() {
      return {
        show: false,
        form: new Form(),
        batchNOList: [],
        routeList: [],
        bomWorkList: [],
        table: {
          option: [
            {
              prop: "sN",
              label: "SN"
            }, {
              prop: "softVersion",
              label: "软件版本"
            }, {
              prop: "hardVersion",
              label: "硬件版本"
            }, {
              prop: "workOrderBatchNum",
              label: "批次号"
            }, {
              prop: "status",
              label: "状态"
            }, {
              prop: "createDate",
              label: "创建时间"
            }],
          data: [],
          loading: false,
          pageSize: 10,
          pageNum: 1,
          height: this.$.clientHeight() * 0.8 - 196,
        },
        sendData: {}
      }
    },

    methods: {
      getPage(data) {
        this.sendData.workOrder = data;
        this.form = new Form(data);
        this.queryPage();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      process_getPage(data) {
        this.sendData.product = data;
        this.$refs.process_dialog.getPage(this.sendData, this.queryPage)
      },
      barCode_getPage(data) {
        this.sendData.product = data;
        this.$refs.barCode_dialog.getPage(this.sendData, this.queryPage)
      },
      attend_getPage(data) {
        this.sendData.product = data;
        this.$refs.attend_dialog.getPage(this.sendData, this.queryPage)
      },
      async queryPage() {
        this.table.loading = true;
        let data = {
          condition: {
            workOrderId: this.form.workOrderId
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await queryProductInfo(data);
        if (res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.pageTotal = res.content.total;
        } else {
          this.table.data = [];
          this.table.pageTotal = 0;
        }
        this.table.loading = false;
      },
      pageChange(currentPage) {
        this.table.pageNum = currentPage
        this.queryPage();
      },
      sizeChange(size) {
        this.table.pageSize = size
        this.queryPage();
      },
      selectChange(data){
        this.mutiDeleteData = data
      },
      delete_getPage(data) {
        this.$.delete('此操作将永久删除该属性, 是否继续?', () => {
          deletProductInfo({
            ids: data.id
          }).then((res) => {
            this.queryPage();
          })
        })
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            startWorkFlow(this.form).then((res) => {
              this.queryPage();
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
  #workOrderManage #operation .mes-table {
    top: 140px;
  }
</style>
