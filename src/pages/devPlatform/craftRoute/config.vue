<template>
  <el-dialog title="工序列表" :visible.sync="show" size="full" :close-on-click-modal="false" id="check">
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
                     :maxHeight="table.height">
          </mes-table>
        </div>
  </el-dialog>
</template>

<script>
  import {
    configQueryData,
  } from "./service";

  export default {
    data() {
      return {
        table: {
          option: [{
            prop: "processName",
            label: "工序"
          },{
            prop: "formName",
            label: "表单"
          },{
            prop: "bomName",
            label: "生产BOM"
          }],
          data: [],
          loading: true,
          height:this.$.clientHeight()*0.9 - 110,
          pageSize: 10,
          pageNum: 1
        },
        searchData: '',
        show:false
      };
    },
    methods: {
      getPage(data) {
      	this.projectId = data.projectId
        this.queryData()
        this.show = true
      },
      async queryData() {
        this.table.loading = true;
        let data = {
          condition: {
            projectId: this.projectId,
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await configQueryData(data);
        if(res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.pageTotal = res.content.total;
        } else {
          this.table.data = [];
          this.table.pageTotal = 0;
        }
        this.table.loading = false;
      },

      search() {
        this.queryData();
      },
      pageChange(currentPage) {
        this.table.pageNum = currentPage
        this.queryData();
      },
      sizeChange(size) {
        this.table.pageSize = size
        this.queryData();
      }
    }
  };
</script>

<style>
  #craftRoute #check .el-dialog--full {
    overflow: hidden;
    top:5%;
    bottom:5%;
    left:5%;
    right:5%;
    width: auto;
    height: auto;
    transform: none;
  }
  #craftRoute #check .el-tabs {
    padding-top: 20px;
    padding-left: 20px
  }

  #craftRoute #check .el-dialog__body {
    height: calc(100% - 54px);
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #craftRoute #check .el-dialog__body .mes-table{
    top:80px
  }
</style>
