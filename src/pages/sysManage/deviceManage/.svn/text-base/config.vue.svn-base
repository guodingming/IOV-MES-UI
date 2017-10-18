<template>
  <el-dialog title="设备配置类型" :visible.sync="show" size="small" id="config" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="col" v-scroll='{"axis":"y","theme":"dark"}'>
        <el-form-item label="配置项名称" prop="name">
          <el-input v-model="form.name" placeholder="配置项名称"></el-input>
        </el-form-item>
        <el-form-item label="配置项编码" prop="code">
          <el-input v-model="form.code" placeholder="配置项编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="!form.name">添加
          </el-button>
        </el-form-item>
      </div>
      <div class="col list" v-scroll='{"axis":"y","theme":"dark"}'>
        <ul>
          <li v-for="item in deviceConfigTypeList">
            <div v-if="!item.edit">
              {{item.name}}
              <span class="icon-trash" title="从配置库中移除该配置项" @click="delete_getPage(item.id)"></span>
              <span class="icon-edit" title="重命名" @click="item.edit=true"></span>
            </div>
            <div v-if="item.edit" class="edit">
              <el-input v-model="item.name" placeholder="名称"><template slot="prepend">名称</template></el-input>
              <el-input v-model="item.code" placeholder="编码"><template slot="prepend">编码</template></el-input>
              <span class="icon-reply" title="返回" @click="item.edit=false"></span>
              <span class="icon-ok" title="确认" @click="edit(item)"></span>
            </div>
          </li>
        </ul>
      </div>
    </el-form>
  </el-dialog>

</template>

<script>
  import {
    createConfigType,
    queryConfigType,
    editConfigType,
    deleteConfigType,
    queryAllConfigType,
    saveDeviceConfigTypes
  } from "./service";

  class Form {
    constructor() {
      this.name = "";
      this.code = "";
    }
  }
  export default {
    data() {
      const name = (rule, value, callback) => {
        if (value) {
          queryConfigType({
            name: value
          }).then((res) => {
            if (res.content.length > 0) {
              callback(new Error('该配置类型名称已存在'));
            } else {
              callback()
            }
          })

        }
      };
      const code = (rule, value, callback) => {
        if (value) {
          queryConfigType({
            code: value
          }).then((res) => {
            if (res.content.length > 0) {
              callback(new Error('该配置类型编码已存在'));
            } else {
              callback()
            }
          })

        }
      };

      return {
        show: false,
        form: new Form(),
        deviceConfigTypeList: [],
        rules: {
          name: [
            {
              validator: _.debounce(name, 1000),
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            }
          ],
          code: [
            {
              validator: _.debounce(code, 1000),
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonEn.pattern,
              message: this.$.regular.common.commonEn.message,
              trigger: 'change'
            }
          ]
        }
      }
    },
    methods: {
      getPage() {
        this.form = new Form();
        this.getConfigType();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async getConfigType() {
        this.deviceConfigTypeList = [];
        let res = await queryAllConfigType();
        if (res.status == 'success' && res.content.length > 0) {
          this.deviceConfigTypeList = res.content.map((val) => {
            val.edit = false
            return val
          })
          this.deviceConfigTypeList.sort((a, b) => {
            return a.id < b.id;
          })
        }
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
           this.create();
          } else {
            return false
          }
        });
      },
      async create(){
        let res = await createConfigType(this.form)
        if (res.status == 'success') {
          this.getPage()
        }
      },
      async edit(data)
      {
        let res = await editConfigType(data);
        if (res.status == "success") {
        this.getConfigType()
      }
      }
      ,
      delete_getPage(data)
      {
        this.$.delete('此操作将永久删除该配置项, 是否继续?', () => {
          this.remove(data);
        })
      }
      ,
      async remove(data)
      {
        let res = await deleteConfigType({ids: data});
        if (res.status == "success") {
          this.getConfigType()
        }
      }
    }
  }
</script>

<style>
  #deviceManage #config .el-dialog.el-dialog--small {
    bottom: 15%
  }

  #deviceManage #config .el-dialog__body {
    height: calc(100% - 54px);
    padding: 20px;
    overflow: auto;
  }

  #deviceManage #config .el-form {
    width: 100%;
    height: 100%;
  }

  #deviceManage #config .col {
    border: solid 1px RGB(210, 210, 210);
    height: 100%;
    width: 48%;
    float: right;
    padding: 15px;
  }

  #deviceManage #config .col:first-of-type {
    float: left
  }

  #deviceManage #config .col ul li {
    line-height: 46px;
    height: 46px;
    font-size: 14px;
  }

  #deviceManage #config .col ul li span {
    float: right;
    cursor: pointer;
    line-height: 46px;
    margin-right: 7px;
    font-size: 16px;
  }

  #deviceManage #config .col.list .el-input {
    width: calc(100% - 60px)
  }
  #deviceManage #config .col.list .edit .el-input{
    width: 40%
  }
</style>
