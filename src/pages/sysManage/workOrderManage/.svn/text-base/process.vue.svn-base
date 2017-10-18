<template>
  <el-dialog title="产品生产工序" :visible.sync="show" size="full" :close-on-click-modal="false" :modal="false" id="process">
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
      </mes-table>
    </div>
  </el-dialog>
</template>

<script>
  import {
    queryProcess
  } from "./service";

  export default {
    computed: {},
    data() {
      return {
        show: false,
        batchNOList: [],
        routeList: [],
        bomWorkList: [],
        table: {
          option: [
            {
              prop: "pdId",
              label: "产品条码"
            }, {
              prop: "processName",
              label: "工序"
            }, {
              prop: "workstationName",
              label: "工站"
            }, {
              prop: "isSuccessTB",
              label: "结果"
            }, {
              prop: "startTime",
              label: "开始时间"
            }, {
              prop: "endTime",
              label: "结束时间"
            }, {
              prop: "userName",
              label: "操作人员"
            }],
          data: [],
          loading: false,
          pageSize: 10,
          pageNum: 1,
          height: this.$.clientHeight() * 0.8 - 196,
        },
        bringData: ""
      }
    },

    methods: {
      getPage(data) {
        this.bringData = data;
        this.queryPage();
        this.show = true
      },
      async queryPage() {
        this.table.loading = true;
        let data = {
          condition: {
            pdProductInfoId: this.bringData.product.id
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await queryProcess(data);
        if (res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.data = this.table.data.map((val) => {
            if (val.isSuccess == "1") {
              val.isSuccessTB = "成功"
            } else {
              val.isSuccessTB = "失败"
            }
            return val
          })
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
//          deletProductInfo({
//            ids: data.id
//          }).then((res) => {
//            this.queryPage();
//          })
        })
      }
    }
  }
</script>

<style>
  #workOrderManage #process .mes-table {
    top: 45px;
  }

  #workOrderManage #process .el-dialog {
    bottom: 10%;
    top: 10%;
    left: 10%;
    right: 10%;
    transform: none;
    height: auto;
    width: auto;
  }
</style>
