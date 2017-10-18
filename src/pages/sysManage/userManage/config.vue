<template>
  <el-dialog id="config" title="配置" :visible.sync="show" size="full" :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules" :inline="true">
      <el-form-item label="工序" prop="processId">
        <el-select v-model="form.processId" placeholder="请选择">
          <el-option v-for="item in baseOption" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效时间" prop="authDate">
        <el-date-picker
          v-model="form.authDate"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">添加</el-button>
      </el-form-item>
    </el-form>
    <div class="mes-table">
      <mes-table :max-height="table.height"
                 :table-data="table.data"
                 :table-option="table.option"
                 :table-loading="table.loading"
                 :showCheckBox="false"
      >
        <el-table-column fixed="right" label="操作" width="80" slot="operationTool">
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
    queryProcess,
    queryConfigData,
    createUserprocess,
    deleteUserprocess
  } from "./service";

  class Form {
    constructor() {
      this.processId = "";
      this.startTime = "";
      this.endTime = "";
      this.authDate = [];
    }
  }
  export default {
    data() {
      return {
        show: false,
        baseOption: [],
        table: {
          option: [{
            prop: "processName",
            label: "工序"
          }, {
            prop: "startTime",
            label: "开始时间"
          }, {
            prop: "endTime",
            label: "结束时间"
          }],
          data: [],
          loading: false
        },
        form: {},
        rules: {},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }],
          disabledDate: (date) => {
            let now = new Date()
            return date.getTime() < now.getTime() - 3600 * 1000 * 24;
          }
        }
      }
    },
    computed: {
      endTimeOptions: function () {
        return {
          disabledDate: (date) => {
            if (this.form.startTime && this.form.startTime.getTime() - 86400000 < date.getTime()) {
              return false
            }
            return true
          }
        }
      }
    },
    methods: {
      getPage(data) {
        this.bringData = data;
        this.form = new Form();
        const authDate = (rule, value, callback) => {
          if (value) {
            callback()
          } else {
            callback(new Error('请填写开始时间'));
          }
        };
        this.form.userId = data.id;
        this.rules = {
          authDate: [{
            required: true,
            message: "请选择授权期限",
            type: 'array',
            trigger: 'change'
          }, {
            validator: authDate,
            trigger: 'change'
          }],
          processId: [{
            required: true,
            message: "请指定授权工序",
            trigger: 'change'
          }]
        }
        this.queryData();
        this.getProcess();
        if (this.$refs.form) {
          setTimeout(() => {
            this.$refs.form.resetFields();
          })
        }
        this.show = true;
      },
      async getProcess() {
        let res = await queryProcess();
        if (res.status == "success") {
          this.baseOption = res.content || [];
        } else {
          this.baseOption = [];
        }
      },
      async queryData() {
        this.table.loading = true;
        let data = {userId: this.bringData.id};
        let res = await queryConfigData(data);
        if (res.status == "success") {
          this.table.data = res.content || [];
        } else {
          this.table.data = [];
        }
        this.table.loading = false;
      },
      delete_getPage(data) {
        this.$.delete('此操作将删除该工序, 是否继续?', () => {
          deleteUserprocess({
            ids: data.id
          }).then((res) => {
            this.queryData()
          })
        })
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.startTime = this.$.parseDate(this.form.authDate[0])
            this.form.endTime = this.$.parseDate(this.form.authDate[1])
            createUserprocess(this.form).then((res) => {
              this.queryData();
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  #userManage #config .el-dialog--full {
    overflow: hidden;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    width: auto;
    height: auto;
    transform: none;
  }

  #userManage #config .el-tabs {
    padding-top: 20px;
    padding-left: 20px
  }

  #userManage #config .el-dialog__body {
    height: calc(100% - 111px);
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #userManage #config .el-dialog__body .el-row {
    height: calc(100% - 77px);
  }

  #userManage #config .el-dialog__body .el-row .el-col {
    height: 100%;
    padding: 20px
  }

  #userManage #config .el-dialog__body .el-row .el-col .el-card {
    height: 100%;
  }

  #userManage #config .el-dialog__body .el-row .el-col .el-card .el-card__body {
    height: calc(100% - 57px);
    overflow-y: auto;
  }

  #userManage #config .el-form {
    padding: 20px
  }

  #userManage #config .el-form .el-form-item {
    margin: 0 20px 0 0
  }

  #userManage #config .el-form .el-form-item .el-form-item__label {
    padding-right: 10px
  }

  #userManage #config .mes-table {
    top: 120px;
    bottom: 50px;
  }
</style>
