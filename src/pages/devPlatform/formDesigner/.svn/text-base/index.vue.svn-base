<template>
  <div id="formDesigner">
    <mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
      <template slot="extra">
        <el-form ref="form" label-width="40px">
          <el-form-item label="产品">
            <mes-cascader
              :data="cascaderData"
              ref="cascader"
              @level1="level1"
              @change="cascaderChange">
            </mes-cascader>
          </el-form-item>
        </el-form>
      </template>
      <template slot="tool">
        <el-button type="primary" icon="document" @click="treeCreate_getPage" :disabled="!product||!(selectNode&&selectNode.isRoot)"></el-button>
        <el-button type="primary" icon="edit" @click="treeEdit_getPage"
                   :disabled="!selectNode||(selectNode&&selectNode.isRoot)"></el-button>
        <el-button type="primary" icon="delete" @click="treeDelete_getPage"
                   :disabled="!selectNode||(selectNode&&selectNode.isRoot)"></el-button>
      </template>
      <div class="mes-content" slot="container">
        <div class="mes-tool">
          <el-button type="primary" @click="create_getPage"
                     :disabled="!selectNode||(selectNode&&selectNode.isRoot)||(!product)">新建<i
            class="el-icon-upload el-icon--right"></i>
          </el-button>
          <el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i
            class="el-icon-delete el-icon--right"></i>
          </el-button>
          <el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search"
                    @keyup.enter.native="search">
          </el-input>
        </div>
        <div class="mes-table" v-if="table.data">
          <mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading"
                     :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange"
                     :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="true"
                     @selectChange="selectChange">
            <el-table-column fixed="right" label="操作" width="180" v-if="table.data.length>0" slot="operationTool">
              <template scope="scope">
                <el-button @click.native.prevent="design_getPage(scope.row)" type="text" size="small">
                  设计表单
                </el-button>
                <el-button @click.native.prevent="edit_getPage(scope.row)" type="text" size="small">
                  编辑
                </el-button>
                <el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column slot="prop" label="表单预览">
              <template scope="scope">
								<span class="check" @click="view_getPage(scope.row)">
		            	<span class="icon-eye-open"></span>查看
								</span>
              </template>
            </el-table-column>
          </mes-table>
        </div>
      </div>
    </mes-table-layout>
    <treeCreateForm ref="treeCreate_form"></treeCreateForm>
    <treeEditForm ref="treeEdit_form"></treeEditForm>
    <createForm ref="create_form"></createForm>
    <editForm ref="edit_form"></editForm>
    <designForm ref="design_form"></designForm>
  </div>
</template>

<script>
  import {
    queryProductLine,
    queryProduct,
    getTree,
    queryData,
    treeDelete,
    deleting
  } from "./service";

  import treeCreateForm from "./treeCreate"
  import treeEditForm from "./treeEdit"
  import createForm from "./create"
  import editForm from "./edit"
  import designForm from "./design"

  export default {
    components: {
      treeCreateForm,
      treeEditForm,
      createForm,
      editForm,
      designForm
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
            label: "名称"
          },
            {
              prop: "createDate",
              label: "创建时间"
            }
          ],
          data: false,
          loading: true,
          pageSize: 10,
          pageNum: 1
        },
        searchData: '',
        mutiDeleteData: [],
        cascaderData: [],
        selectNode: "",
        product:""
      };
    },
    methods: {
      init() {
        this.getProductLine()
        this.getTree()
        this.queryData()
      },
      async getProductLine() {
        let res = await queryProductLine()
        this.cascaderData = this.$.processArray(res.content, null, {children: []})
      },
      async level1(id, ids){
        let res = await queryProduct({pdLineId: id})
        let data = this.$.processArray(res.content)
        this.$refs.cascader.setChild(id, ids, data)
      },
      cascaderChange(id) {
        this.product = id
        this.getTree();
      },
      async getTree() {
        let res = await getTree({
          pdId: this.product ? this.product : ""
        });
        if (res.status == "success") {
          this.treeData = this.$.transformTree(res.content, {
            pNode: '表单类型列表',
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
        this.mutiDeleteData = [];
        let data = {
          condition: {
            formTypeId: this.selectNode ? this.selectNode.id : "",
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
        this.table.loading = false;
      },

      treeCreate_getPage() {
        this.$refs.treeCreate_form.getPage()
      },
      treeEdit_getPage() {
        this.$refs.treeEdit_form.getPage(this.selectNode)
      },
      treeDelete_getPage() {
        this.$.delete('此操作将永久删除该表单类型, 是否继续?', () => {
          treeDelete({
            ids: this.selectNode.id
          }).then((res) => {
            this.getTree()
          })
        })
      },
      create_getPage() {
        this.$refs.create_form.getPage()
      },
      edit_getPage(data) {
        this.$refs.edit_form.getPage(data)
      },
      design_getPage(data) {
        this.$refs.design_form.getPage(data)
      },
      delete_getPage(data) {
        this.$.delete('此操作将永久删除该表单, 是否继续?', () => {
          deleting({
            ids: data.id
          }).then((res) => {
            this.queryData()
          })
        })
      },
      view_getPage(data){
        let newWin = open("", "", `height=${data.height + 'px'}, width=${data.width + 'px'}, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`);
        newWin.document.body.innerHTML = `<div class="work" style="height:${data.height + 'px'}px;width:${data.width + 'px'}px;">${data.html}</div>`

        let js = document.createElement("script")
        js.type = "text/javascript";
        js.appendChild(document.createTextNode(data.javascript));
        newWin.document.body.appendChild(js)


        let css = document.createElement("link")
        css.rel = "stylesheet"
        css.type = "text/css"
        css.href = window.location.origin + "/form/style.css"
        newWin.document.head.appendChild(css)
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
        this.$.delete('此操作将永久删除所选表单, 是否继续?', () => {
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

<style>
  #deviceManage .el-form-item__label {
    padding: 11px 10px 11px 0;
  }

  .check {
    cursor: pointer;
  }

  .check .icon-eye-open {
    font-size: 16px;
    margin-right: 7px;
  }
</style>
