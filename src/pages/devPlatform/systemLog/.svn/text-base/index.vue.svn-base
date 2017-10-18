<template>
  <div id="systemLog">
    <mes-table-layout>
      <div class="mes-content" slot="container">
        <div class="mes-tool">
          <el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search">
          </el-input>
        </div>
        <div class="mes-table" v-if="table.data">
          <mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="false" @selectChange="selectChange">
          </mes-table>
        </div>
      </div>
    </mes-table-layout>
  </div>
</template>
<script>
  import {
    queryData
  } from "./service";

  export default {
    components: {
    },
    created() {
      this.init();
    },
    data() {
      return {
        treeData: false,
        table: {
          option: [{
            prop: "userName",
            label: "用户名"
          }, {
            prop: "path",
            label: "接口路径"
          }, {
            prop: "description",
            label: "接口描述"
          }, {
            prop: "status",
            label: "响应状态码"
          }, {
            prop: "startTime",
            label: "调用时间"
          }, {
            prop: "tookTime",
            label: "接口耗时（ms）"
          }, {
            prop: "response",
            label: "响应内容"
          }, {
            prop: "userId",
            label: "用户id"
          }],
          data: false,
          loading: true,
          pageSize: 10,
          pageNum: 1
        },
        searchData: '',
        mutiDeleteData: []
      };
    },
    methods: {
      init() {
        this.queryData()
      },
      async queryData() {
        this.table.loading = true;
        let data = {
          condition: {
          	path:this.searchData,
          	description:this.searchData,
          	status:this.searchData,
          	userName:this.searchData,
            startTime:this.searchData,
            tookTime:this.searchData
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await queryData(data);
        if(res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.pageTotal = res.content.total;
        } else {
          this.table.data = [];
          this.table.pageTotal = 0;
        }
        this.table.loading = false;
      },
      config_getPage(data) {
        this.$refs.config_form.getPage(data)
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
      },
      selectChange(data) {
        this.mutiDeleteData = data
      }
      }
  };
</script>

<style scoped>
</style>
