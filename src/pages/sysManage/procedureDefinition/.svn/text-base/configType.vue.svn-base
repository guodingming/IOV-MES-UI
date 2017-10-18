<template>
  <el-dialog title="配置类型字典" :visible.sync="show" size="tiny" id="configType" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="col" v-scroll>
        <el-form-item label="配置类型名称" prop="name">
          <el-input v-model="form.name" placeholder="配置类型名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="create" :disabled="!form.name">添加
          </el-button>
        </el-form-item>
      </div>
      <div class="col list" v-scroll>
        <ul>
          <li v-for="item in processConfigTypeList">
            <div v-if="!item.edit">
              {{item.name}}
              <span class="icon-trash" title="从配置库中移除该配置项" @click="delete_getPage(item.id)"></span>
              <span class="icon-edit" title="编辑" @click="item.edit=true"></span>
            </div>
            <div v-if="item.edit">
              <el-input v-model="item.name" placeholder="配置项名称"></el-input>
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
    queryAllConfigType,
    createConfigType,
    queryConfigType,
    editConfigType,
    deleteConfigType
  } from "./service";

  class Form {
    constructor(data = {}) {
      this.id = data.id;
      this.name = data.name;
      this.code = data.code;
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
              callback(new Error('该配置类型已存在'));
            } else {
              callback()
            }
          })

        }
      };

      return {
        show: false,
        form: new Form(),
        editFlag: false,
        rules: {
          name: [
            {
              validator: _.debounce(name, 1000),
              trigger: 'change'
            }
          ]
        },
        processConfigTypeList: []
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
        let res = await queryAllConfigType();
        if (res.status == 'success' && res.content.length > 0) {
          this.processConfigTypeList = res.content.map((val) => {
            val.edit = false
            return val
          });
          this.processConfigTypeList.sort((a, b) => {
            return a.id < b.id;
          })
        }
      },
      async create(){
        let res = await createConfigType(this.form)
        if (res.status == 'success') {
          this.getPage()
        }
      },
      async edit(data){
        let res = await editConfigType(data);
        if (res.status == "success") {
          this.getConfigType()
        }
      },
      delete_getPage(data) {
        this.$.delete('此操作将永久删除该配置项, 是否继续?', () => {
          this.remove(data);
        })
      },
      async remove(data){
        let res = await deleteConfigType({ids: data});
        if (res.status == "success") {
          this.getConfigType()
        }
      }
    }
  }
</script>

<style>
  #procedureDefinition #configType .el-dialog.el-dialog--tiny {
    bottom: 15%
  }

  #procedureDefinition #configType .el-dialog__body {
    height: calc(100% - 54px);
    padding: 20px;
    overflow: auto;
  }

  #procedureDefinition #configType .el-form {
    width: 100%;
    height: 100%;
  }

  #procedureDefinition #configType .col {
    border: solid 1px RGB(210, 210, 210);
    height: 100%;
    width: 48%;
    float: right;
    padding: 15px;
  }

  #procedureDefinition #configType .col:first-of-type {
    float: left
  }

  #procedureDefinition #configType .col ul li {
    line-height: 46px;
    height: 46px;
    font-size: 14px;
  }

  #procedureDefinition #configType .col ul li span {
    float: right;
    cursor: pointer;
    line-height: 46px;
    margin-right: 7px;
    font-size: 16px;
  }

  #procedureDefinition #configType .col.list .el-input {
    width: calc(100% - 60px)
  }
</style>
