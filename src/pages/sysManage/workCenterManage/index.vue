<template>
  <div id="workCenterManage">
    <mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
      <template slot="extra">
        <el-form ref="form" label-width="60px">
          <el-form-item label="产品线">
            <mes-cascader
              :data="cascaderData"
              ref="cascader"
              @level1="level1"
              @level2="level2"
              @level3="level3"
              @change="getTree">
            </mes-cascader>
          </el-form-item>
        </el-form>
      </template>
      <div class="mes-content" slot="container">
        <div class="mes-tool">
          <el-button type="primary" @click="create_getPage" :disabled="!selectNode">
            新建<i
            class="el-icon-upload el-icon--right"></i></el-button>
          <el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i
            class="el-icon-delete el-icon--right"></i>
          </el-button>
          <el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search"
                    @keyup.enter.native="search">
          </el-input>
        </div>
        <div class="mes-table">
          <mes-table :table-data="table.data"
                     :table-option="table.option"
                     :table-loading="table.loading"
                     :total="table.pageTotal"
                     :pageSize="table.pageSize"
                     :pageChange="pageChange"
                     :sizeChange="sizeChange"
                     :pageNum="table.pageNum"
                     :showCheckBox="true"
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
  </div>
</template>

<script>
  import {
    queryProductLine,
    queryEnterprise,
    queryWorkcenter,
    querySite,
    queryArea,
    queryData,
    deleting
  } from "./service";
  import createForm from "./create"
  import editForm from "./edit"

  export default {
    components: {
      createForm,
      editForm
    },
    created() {
      this.init();
    },
    computed: {},
    data() {
      return {
        treeData: false,
        table: {
          option: [{
            prop: "name",
            label: "工作站名称"
          }, {
            prop: "createDate",
            label: "创建时间"
          }],
          data: [],
          loading: false,
          pageSize: 10,
          pageNum: 1
        },
        searchData: '',
        mutiDeleteData: [],
        cascaderData:[],
        selectNode: ""
      };
    },
    methods: {
      init() {
        this.getEnterprise()
        this.getTree()
        this.queryData()
      },
      async getEnterprise() {
        let res = await queryEnterprise()
        this.cascaderData = this.$.processArray(res.content, {"name": "company"}, {children: []})
      },
      async level1(id, ids){
        let res = await querySite({enterpriseId: id})
        let data = this.$.processArray(res.content, null, {children: []})
        this.$refs.cascader.setChild(id, ids, data)
      },
      async level2(id, ids){
        let res = await queryArea({siteInfoId: id})
        let data = this.$.processArray(res.content, null, {children: []})
        this.$refs.cascader.setChild(id, ids, data)
      },
      async level3(id, ids){
        let res = await queryProductLine({areaId: id})
        this.$refs.cascader.setChild(id, ids, res.content)
      },
      async getTree(id) {
        let res = await queryWorkcenter({productionLineId: id});
        if (res.status == "success") {
          this.treeData = this.$.transformTree(res.content, {
            pNode: "工作中心列表",
            listArray: true
          })
        } else {
          this.treeData = []
        }
        this.selectNode = null
      },
      treeClick: function (node) {
        this.selectNode = node
        this.queryData()
      },
      async queryData() {
        this.table.loading = true;
        if (this.selectNode) {
          this.mutiDeleteData = [];
          let data = {
            condition: {
              workCenterId: this.selectNode.id,
              search: this.searchData
            },
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
        }
        this.table.loading = false;
      },
      create_getPage() {
        this.$refs.create_form.getPage()
      },
      edit_getPage(data) {
        this.$refs.edit_form.getPage(data)
      },
      delete_getPage(data) {
        this.$.delete('此操作将永久删除该工作站, 是否继续?', () => {
          deleting({
            ids: data.id
          }).then((res) => {
            this.queryData()
          })
        })
      },
      multiDelete() {
        this.$.delete('此操作将永久删除所选工作站, 是否继续?', () => {
          deleting({
            ids: this.mutiDeleteData
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
      }
      ,
      selectChange(data){
        this.mutiDeleteData = data
      }
    }
  };
</script>

<style>

  #workCenterManage .tool .el-form-item {
    margin-bottom: 12px
  }

</style>
