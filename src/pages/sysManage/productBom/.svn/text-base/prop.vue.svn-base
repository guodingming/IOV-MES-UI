<template>
  <el-dialog id="config" title="配置" :visible.sync="show" size="full" :close-on-click-modal="false">
    <el-tabs v-model="activeName" @tab-click="changeTab" type="card">
      <el-tab-pane label="单项配置" name="config"></el-tab-pane>
      <el-tab-pane label="产品属性" name="extend"></el-tab-pane>
    </el-tabs>

    <el-form ref="baseForm" v-if="activeName=='config'">
      <el-row>
        <el-col :span="12">
          <el-form-item v-for="item in leftExtend" :label="item.name">
            <el-select
              v-model="item.value"
              filterable
              allow-create
              :placeholder="item.name">
              <el-option
                v-for="bom in BomData"
                :label="bom.value"
                :value="bom.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-for="item in rightExtend" :label="item.name">
            <el-input v-model="item.value"
                      :placeholder="item.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
		    <el-button v-if="activeName=='config'" type="primary" @click="submit()">确 定</el-button>
    </span>
    <div class="mes-table" v-if="activeName=='extend'">
      <el-form ref="form" v-if="activeName=='extend'" :inline="true">
        <el-form-item label="属性名称">
          <el-select v-model="createData" multiple placeholder="请选择">
            <el-option v-for="item in baseOption" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">添加
          </el-button>
        </el-form-item>
      </el-form>
      <mes-table
        :table-data="table.data"
        :table-option="table.option"
        :table-loading="table.loading"
        :showCheckBox="false">
      </mes-table>
    </div>
  </el-dialog>
</template>

<script>
  import {
    queryAttributeData,
    updateBomAffiliates,
    saveBomAffiliates,
    propData,
  } from "./service";

  export default {
    data() {
      return {
        show: false,
        activeName: 'config',
        table: {
          option: [{
            prop: "name",
            label: "中文名称"
          }, {
            prop: "enName",
            label: "英文名称"
          }, {
            prop: "createDate",
            label: "创建时间"
          }],
          data: [],
          loading: false
        },
        baseOption: [],
        propData: [],
        leftExtend: [],
        rightExtend: [],
        createData: [],
        BomData: []
      }
    },
    methods: {
      getPage(data) {
        this.bringData = data;
        this.changeTab();
        this.queryAttr();
        this.show = true
        this.BomData = [];
        this.BomData.push({id:"1",value:"测试1"});
        this.BomData.push({id:"2",value:"测试2"});
        this.BomData.push({id:"3",value:"测试3"});
        console.info(this.BomData)
      },
      changeTab() {
        this.queryAttr();
        if (this.activeName == "config") {
        }
        if (this.activeName == "extend") {
          this.queryData();
        }
      },
      async queryAttr() {
        this.table.loading = true;
        let data = {
          bomProduceId: this.bringData.id
        }
        let res = await propData(data);
        if (res.status == "success") {
          this.table.data = res.content || [];
          this.propData = res.content || [];
          this.propData = this.propData.map((val) => {
              if (!val.value) {
                  val.value = ""
              }
              return val
          });
          this.leftExtend = this.propData.slice(0, Math.ceil(this.propData.length / 2));
          this.rightExtend = this.propData.slice(Math.ceil(this.propData.length / 2));
          this.createData = this.table.data.map((val) => {
            return val.attributeId
          })
        } else {
          this.table.data = [];
        }
        this.table.loading = false;
      },
      async queryData() {
        let data = {
          pdId: this.$parent.selectNode ? this.$parent.selectNode.id : ""
        }
        let res = await queryAttributeData(data);
        if (res.status == "success") {
          this.baseOption = res.content || [];
        } else {
          this.baseOption = [];
        }
      },
      async submit() {
        if (this.activeName == "config") {
          let res = await updateBomAffiliates(this.propData);
        }
        if (this.activeName == "extend") {
          let data = [];
          console.info(this.createData)
          if (this.createData.length > 0) {
            for (let item of this.createData) {
              data.push({attributeId: item, bomProduceId: this.bringData.id})
            }
          } else {
            data.push({bomProduceId: this.bringData.id})
          }

          let res = await saveBomAffiliates(data);
          if (res.status == "success") {
            this.queryAttr();
          }
        }
      }
    }
  }
</script>

<style>
  #productBom #config .el-dialog--full {
    overflow: hidden;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    width: auto;
    height: auto;
    transform: none;
  }

  #productBom #config .el-tabs {
    padding-top: 20px;
    padding-left: 20px
  }

  #productBom #config .el-dialog__body {
    height: calc(100% - 111px);
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #productBom #config .el-dialog__body .el-row {
    height: calc(100% - 77px);
  }

  #productBom #config .el-dialog__body .el-row .el-col {
    height: 100%;
    padding: 0 20px;
  }

  #productBom #config .el-dialog__body .el-row .el-col .el-card {
    height: 100%;
  }

  #productBom #config .el-dialog__body .el-row .el-col .el-card .el-card__body {
    height: calc(100% - 57px);
    overflow-y: auto;
  }

  #productBom #config .el-form {
    padding: 20px 0;
  }

  #productBom #config .el-form .el-form-item {
    margin: 0 20px 0 0
  }

  #productBom #config .el-form .el-form-item .el-form-item__label {
    padding-right: 10px
  }

  #productBom #config .mes-table {
    top: 120px;
    bottom: 50px;
  }
</style>
