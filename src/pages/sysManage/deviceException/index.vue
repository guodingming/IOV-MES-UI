<template>
  <div id="deviceException">
    <mes-table-layout>
      <div class="mes-content" slot="container">
        <div class="mes-tool">
          <el-button type="primary" @click="create_getPage">新建<i class="el-icon-upload el-icon--right"></i>
          </el-button>
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
    queryEnterprise,
    queryDeviceFault,
    queryDevice,
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
    data() {
      return {
        treeData: false,
        table: {
          option: [{
            prop: "deviceName",
            label: "设备名称"
          }, {
            prop: "ip",
            label: "设备IP"
          }, {
            prop: "name",
            label: "异常信息"
          }, {
            prop: "statusTB",
            label: "维修状态"
          }, {
            prop: "operator",
            label: "报修人"
          }, {
            prop: "maintenancePersion",
            label: "负责人"
          }, {
            prop: "createDate",
            label: "创建时间"
          }],
          data: [],
          loading: true,
          pageSize: 10,
          pageNum: 1
        },
        mutiDeleteData: [],
        deviceFaultInfoList: [],
        searchData: '',
        deviceList:[]
      };
    },
    methods: {
      init() {
        this.queryData();
        this.getDeviceFault();
        this.getDevice();
      },
      async getDeviceFault() {
        let res = await queryDeviceFault();
        if (res.status == "success") {
          this.deviceFaultInfoList = res.content
        } else {
          this.deviceFaultInfoList = []
        }
      },
      async getDevice() {
        let result = await queryDevice({});
        if(result.status == "success") {
          this.deviceList = result.content || [];
        } else {
          this.deviceList = [];
        }
      },
      async queryData() {
        this.table.loading = true;
        this.mutiDeleteData = [];
        let data = {
          condition: {
            search: this.searchData
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await queryData(data);
        if (res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.data = this.table.data.map((val) => {
            if (val.status == "0") {
              val.statusTB = "未报修"
            }
            if (val.status == "1") {
              val.statusTB = "已报修"
            }
            if (val.status == "2") {
              val.statusTB = "正常"
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
      create_getPage() {
        this.$refs.create_form.getPage()
      },
      edit_getPage(data) {
        this.$refs.edit_form.getPage(data)
      },
      delete_getPage(data) {
        this.$.delete('此操作将永久删除该设备, 是否继续?', () => {
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
      selectChange(data){
        this.mutiDeleteData = data
      },
      multiDelete() {
        this.$.delete('此操作将永久删除所选设备, 是否继续?', () => {
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
