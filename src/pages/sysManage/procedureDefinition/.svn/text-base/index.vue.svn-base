<template>
  <div id="procedureDefinition">
    <mes-table-layout>
      <div class="mes-content" slot="container">
        <div class="mes-tool">
          <el-button type="primary" @click="create_getPage">新建<i class="el-icon-upload el-icon--right"></i>
          </el-button>
          <el-button type="primary" @click="configType_getPage">配置类型字典<i class="el-icon-upload el-icon--right"></i>
          </el-button>
          <el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i
            class="el-icon-delete el-icon--right"></i>
          </el-button>
          <el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search">
          </el-input>
        </div>
        <div class="mes-table" v-if="table.data">
          <mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading"
                     :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange"
                     :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="true"
                     @selectChange="selectChange">
            <el-table-column fixed="right" label="操作" width="120" v-if="table.data.length>0" slot="operationTool">
              <template scope="scope">
                <el-button @click.native.prevent="edit_getPage(scope.row)" type="text" size="small">
                  编辑
                </el-button>
                <el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </mes-table>
        </div>
      </div>
    </mes-table-layout>
    <createForm ref="create_form"></createForm>
    <editForm ref="edit_form"></editForm>
    <configType ref="configType_form"></configType>
  </div>
</template>
<script>
  import {
    queryData,
    deleting,
    queryAllConfigType
  } from "./service";

  import createForm from "./create"
  import editForm from "./edit"
  import configType from "./configType"

  export default {
    components: {
      createForm,
      editForm,
      configType
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
        mutiDeleteData: [],
        processConfigTypeList: []
      };
    },
    methods: {
      init() {
        this.getConfigType();
        this.queryData()
      },
      async queryData() {
        this.table.loading = true;
        this.mutiDeleteData = [];
        let data = {
          condition: {},
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await queryData(data);
        if (res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.pageTotal = res.content.total;
        } else {
          this.table.data = [];
          this.table.pageTotal = 0;
        }
        this.table.loading = false;
      },
      async getConfigType() {
        let res = await queryAllConfigType();
        if (res.status == 'success' && res.content.length > 0) {
          this.processConfigTypeList = res.content.map((val) => {
            val.edit = false
            return val
          })
          this.processConfigTypeList.sort((a, b) => {
            return a.id < b.id;
          })
        }
      },
      configType_getPage() {
        this.$refs.configType_form.getPage()
      },
      create_getPage() {
        this.$refs.create_form.getPage()
      },

      edit_getPage(data) {
        this.$refs.edit_form.getPage(data)
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
