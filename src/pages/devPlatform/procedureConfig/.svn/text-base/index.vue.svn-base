<template>
  <div id="procedureConfig">
    <mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
      <template slot="extra">
        <el-form label-width="40px">
          <el-form-item label="产品">
            <mes-cascader ref="cascader" :data="cascaderData" @level1="level1" @change="getTree">
            </mes-cascader>
          </el-form-item>
        </el-form>
      </template>
      <div class="mes-content" slot="container">
        <div class="mes-tool">
          <el-button type="primary" @click="create_getPage"
                     :disabled="!selectNode||(selectNode&&selectNode.isRoot)||(!product)">配置工序<i
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
          <mes-table
            :table-data="table.data"
            :table-option="table.option"
            :table-loading="table.loading"
            :showCheckBox="true"
            @selectChange="selectChange">
            <el-table-column fixed="right" label="操作" width="200" v-if="table.data.length>0" slot="operationTool">
              <template scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="text" size="mini">
                    配置<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native.prevent="base_config(scope.row)">基础配置</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.configType.indexOf('测试标准') != -1"
                                      @click.native.prevent="test_config(scope.row)">测试标准
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.configType.indexOf('测试顺序') != -1"
                                      @click.native.prevent="order_config(scope.row)">测试顺序
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.configType.indexOf('产品芯片') != -1"
                                      @click.native.prevent="chip_config(scope.row)">产品芯片
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.configType.indexOf('设备配置') != -1"
                                      @click.native.prevent="device_config(scope.row)">设备配置
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.configType.indexOf('产品标定') != -1"
                                      @click.native.prevent="calibration_config(scope.row)">产品标定
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.configType.indexOf('时间设置') != -1"
                                      @click.native.prevent="dateSet_config(scope.row)">时间设置
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button @click.native.prevent="removeUp(scope.row)" type="text" size="small"
                           :disabled="scope.$index == 0">
                  上移
                </el-button>
                <el-button @click.native.prevent="removeDown(scope.row)" type="text" size="small"
                           :disabled="scope.$index == (table.data.length - 1)">
                  下移
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
    <baseForm ref="base_form"></baseForm>
    <testForm ref="test_form"></testForm>
    <orderForm ref="order_form"></orderForm>
    <chipForm ref="chip_form"></chipForm>
    <deviceForm ref="device_form"></deviceForm>
    <dateSetForm ref="dateSet_form"></dateSetForm>
    <calibrationForm ref="calibration_form"></calibrationForm>
  </div>
</template>

<script>
  import {
    queryProductLine,
    queryProduct,
    getTree,
    queryData,
    updateSort,
    deleting
  } from "./service";

  import createForm from "./create"
  import baseForm from "./base"
  import testForm from "./test"
  import orderForm from "./order"
  import chipForm from "./chip"
  import deviceForm from "./device"
  import dateSetForm from "./dateSet"
  import calibrationForm from "./calibration"

  export default {
    components: {
      createForm,
      deviceForm,
      testForm,
      orderForm,
      chipForm,
      baseForm,
      dateSetForm,
      calibrationForm
    },
    created() {
      this.init()
    },
    computed: {},
    data() {
      return {
        treeData: false,
        table: {
          option: [{
            prop: "processName",
            label: "工序"
          }, {
            prop: "formName",
            label: "表单"
          },
            {
              prop: "isCustomTB",
              label: "自定义工序任务"
            }, {
              prop: "createDate",
              label: "创建时间"
            }],
          data: false,
          loading: true
        },
        cascaderData: [],
        searchData: '',
        mutiDeleteData: [],
        selectNode: "",
        product: "",
        produceProcessList: []
      };
    },
    methods: {
      init() {
        this.getTree()
        this.getProductLine()
        this.queryData()
      },
      async getProductLine() {
        let res = await queryProductLine()
        this.cascaderData = this.$.processArray(res.content, null, {
          children: []
        })
      },
      async level1(id, ids) {
        let res = await queryProduct({
          pdLineId: id
        })
        let data = this.$.processArray(res.content)
        this.$refs.cascader.setChild(id, ids, data)
      },
      async getTree(id, ids) {
        if (ids) {
          this.productLine = ids[0]
          this.product = ids[1]
        }
        let res = await getTree({
          pdId: id
        });
        if (res.status == "success") {
          this.treeData = this.$.transformTree(res.content, {
            pNode: '开发工程',
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
        if (this.selectNode || this.searchData) {
          let data = {
            projectId: this.selectNode ? this.selectNode.id : "",
            search: this.searchData
          }
          let res = await queryData(data);
          this.table.data = res.content || [];
          this.table.data = this.table.data.map((val) => {
              if (val.isCustom == "1") {
                  val.isCustomTB = "是"
              } else {
                  val.isCustomTB = "否"
              }
              return val
          })
          this.produceProcessList = res.content || [];
        }
        this.table.loading = false;
      },
      create_getPage() {
        this.$refs.create_form.getPage()
      },
      base_config(data) {
        this.$refs.base_form.getPage(data)
      },
      test_config(data) {
        this.$refs.test_form.getPage(data)
      },
      order_config(data) {
        this.$refs.order_form.getPage(data)
      },
      device_config(data) {
        this.$refs.device_form.getPage(data)
      },
      chip_config(data) {
        this.$refs.chip_form.getPage(data)
      },
      dateSet_config(data) {
        this.$refs.dateSet_form.getPage(data)
      },
      calibration_config(data) {
        this.$refs.calibration_form.getPage(data)
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
      },
      async removeUp(data) {
        let minSort = data;
        let maxSort = null;
        for (let item of this.table.data) {
          if (item.sort == (data.sort - 1)) {
            maxSort = item;
          }
        }
        let res = await updateSort({maxSortId: maxSort.id, minSortId: minSort.id});
        if (res.status == "success") {
          this.queryData();
        }
      },
      async removeDown(data) {
        let minSort = data;
        let maxSort = null;
        for (let item of this.table.data) {
          if (item.sort == (data.sort + 1)) {
            maxSort = item;
          }
        }
        let res = await updateSort({maxSortId: maxSort.id, minSortId: minSort.id});
        if (res.status == "success") {
          this.queryData();
        }
      }
    }
  };
</script>

<style>
  #deviceManage .el-form-item__label {
    padding: 11px 10px 11px 0;
  }

  #deviceManage .el-tree-node__label {
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
