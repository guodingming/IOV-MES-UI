<template>
  <div id="processConfig">
    <mes-table-layout>
      <div class="mes-content" slot="container">
        <div class="mes-tool">
          <el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search">
          </el-input>
        </div>
        <div class="mes-table" v-if="table.data">
          <mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="false" @selectChange="selectChange">
            <el-table-column fixed="right" label="操作" width="120" v-if="table.data.length>0" slot="operationTool">
              <template scope="scope">
                <el-button @click.native.prevent="config_getPage(scope.row)" type="text" size="small">
                  配置
                </el-button>
                <el-button @click.native.prevent="check_getPage(scope.row)"  type="text" size="small">
                  查看
                </el-button>
              </template>
            </el-table-column>
          </mes-table>
        </div>
      </div>
    </mes-table-layout>
    <configForm ref="config_form"></configForm>
    <checkForm ref="check_form"></checkForm>
  </div>
</template>
<script>
  import {
    queryData,
    deleting
  } from "./service";

  import configForm from "./config"
  import checkForm from "./check"

  export default {
    components: {
      configForm,
      checkForm
    },
    created() {
      this.init();
    },
    data() {
      return {
        treeData: false,
        table: {
          option: [{
            prop: "name",
            label: "工序名称"
          }, {
            prop: "code",
            label: "工序编码"
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
        this.mutiDeleteData = [];
        let data = {
          condition: {search:this.searchData},
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
      check_getPage(data) {
        this.$refs.check_form.getPage(data)
      },
      delete_getPage(data) {
        this.$.delete('此操作将永久删除该工序, 是否继续?', () => {
          deleting({
            ids: data.id
      }).then((res) => {
          this.queryData()
      })
      })
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
      },
      multiDelete() {
        this.$.delete('此操作将永久删除所选工序, 是否继续?', () => {
          deleting({
            ids: this.mutiDeleteData
      }).then((res) => {
          this.queryData()
      })
      })
      }
      }
  };
</script>

<style scoped>
</style>
