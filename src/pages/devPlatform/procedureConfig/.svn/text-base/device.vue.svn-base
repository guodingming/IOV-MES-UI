<template>
  <el-dialog id="device" title="设备配置" :visible.sync="show" size="full" :close-on-click-modal="false">
    <el-form :model="form" ref="form" :inline="true">
      <el-form-item label="设备配置">
        <mes-cascader ref="deviceCas" :data="deviceData" @level1="configType" @level2="config"
                      @change="deviceCasConfig">
        </mes-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="submit_getPage"
                   :disabled="!form.deviceConfigId">添加配置
        </el-button>
      </el-form-item>
    </el-form>
    <div class="mes-table">
      <mes-table :max-height="table.height" :table-data="table.data" :table-option="table.option" :table-loading="table.loading"
                 :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange"
                 :pageNum="table.pageNum" :showCheckBox="false">
        <el-table-column fixed="right" label="操作" width="200" v-if="table.data.length>0" slot="operationTool">
          <template scope="scope">
            <el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </mes-table>
    </div>
  </el-dialog>
</template>

<script>
  import {
    queryDeviceConfigTypes,
    queryDeviceData,
    queryDevices,
    configDevice,
    queryConfigData,
    configDeleting
  } from "./service";

  class Form {
    constructor(data = {}) {
      this.produceProcessId = data.processId;
      this.deviceConfigTypeId = "";
      this.deviceConfigId = "";
      this.deviceId = "";
    }
  }

  export default {
    data(data) {
      return {
        show: false,
        form: new Form(data),
        table: {
          option: [{
            prop: "name",
            label: "配置名称"
          }, {
            prop: "dataType",
            label: "配置类型"
          }, {
            prop: "content",
            label: "内容"
          }, {
            prop: "version",
            label: "版本"
          }],
          data: [],
          loading: false,
          pageSize: 10,
          pageNum: 1,
          height:this.$.clientHeight() * 0.7
        },
        deviceData: []
      }
    },
    methods: {
      getPage(data) {
        this.bringData = data;
        this.form = new Form(this.bringData);
        this.getProcessDevice();
        this.queryConfig();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async queryConfig() {
        this.table.loading = true;
        let data = {
          condition: {
            produceProcessId: this.bringData.processId
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await queryConfigData(data);
        if (res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.data = this.table.data.map((val) => {
            if(val.fileName) {
              val.content = val.fileName
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
      async getProcessDevice() {
        let res = await queryDevices({processId:this.bringData.processId});
        if (res.status == "success") {
          this.deviceData = this.$.processArray(res.content, null, {children: []})
        }
      },
      async configType(id, ids) {
        if (id) {
          let res = await queryDeviceConfigTypes({deviceId:id});
          let data = this.$.processArray(res.content, null, {children: []});
          this.$refs.deviceCas.setChild(id, ids, data);
        }
      },
      async config(id, ids) {
        if (id) {
          let res = await queryDeviceData(ids[0], id, {});
          let data = this.$.processArray(res.content);
          this.$refs.deviceCas.setChild(id, ids, data);
        }
      },
      deviceCasConfig(id, ids) {
        this.form.deviceConfigTypeId = ids[1];
        this.form.deviceConfigId = id;
        this.form.deviceId = ids[0];
      },
      pageChange(currentPage) {
        this.table.pageNum = currentPage
        this.queryConfig();
      },
      sizeChange(size) {
        this.table.pageSize = size
        this.queryConfig();
      },
      selectChange(data) {
        this.mutiDeleteData = data
      },
      delete_getPage(data) {
        this.$.delete('此操作将永久删除该配置, 是否继续?', () => {
          configDeleting({
            ids: data.id
          }).then((res) => {
            this.queryConfig()
          })
        })
      },
      submit_getPage() {
        this.$.delete('确认添加配置, 是否继续?', () => {
          this.submit();
        })
      },
      async submit() {
        configDevice(this.form).then((res) => {
          this.queryConfig()
        });
      }
    }
  }
</script>

<style>
  #procedureConfig #device .el-dialog--full {
    overflow: hidden;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    width: auto;
    height: auto;
    transform: none;
  }

  #procedureConfig #device .el-tabs {
    padding-top: 20px;
    padding-left: 20px
  }

  #procedureConfig #device .mes-table {
    top: 140px;
  }

  #procedureConfig #device .select-file {
    position: absolute;
    top: 0;
    left: 235px;
  }

  #procedureConfig #device .import .el-form-item__content {
    margin-left: 140px;
  }
</style>
