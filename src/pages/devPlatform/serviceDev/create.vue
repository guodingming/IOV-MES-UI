<template>
  <!--新建用户页面-->
  <el-dialog title="新建服务" :visible.sync="show" size="tiny" id="createService" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="中文名称" prop="name">
          <el-input v-model="form.name" placeholder="中文名称"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="methodName">
          <el-input v-model="form.methodName" placeholder="英文名称"></el-input>
        </el-form-item>
        <el-form-item label="服务编码" prop="code">
          <el-input v-model="form.code" placeholder="服务编码"></el-input>
        </el-form-item>
        <el-form-item label="函数" prop="fnId">
          <el-select v-model="form.fnId" placeholder="函数">
            <el-option v-for="item in fnIdList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea"  v-model="form.description" placeholder="描述"></el-input>
        </el-form-item>
    </el-form>
		<span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
  </el-dialog>

</template>

<script>
  import {
    nameRepeat,
    queryFunction,
    create
  } from "./service";

  class Form {
    constructor() {
      this.name = "";
      this.methodName = "";
      this.code = "";
      this.description = "";
      this.fnId = "";
    }
  }

  export default {
    created() {
      this.init()
    },
    data() {
      return {
        show: false,
        form: {},
        rules: {},
        fnIdList:[]
      }
    },
    methods: {
      init() {
        this.getFn()
      },
      getPage() {
        this.form = new Form();
        this.rules= {
            name: [{
              required: true,
              message: '请输入中文名称',
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            },{
              validator: this.$.checkRepeat(nameRepeat),
              trigger: 'change'
            }
            ],
              methodName: [{
              required: true,
              message: '请输入英文名称',
              trigger: 'change'
            },{
                pattern: this.$.regular.common.commonCn.pattern,
                message: this.$.regular.common.commonCn.message,
                trigger: 'change'
                }
            ],
            fnId: [{
              required: true,
              message: '请填写函数',
              trigger: 'change'
            }
            ],
              code: [{
              required: true,
              message: '请输入服务编码',
              trigger: 'change'
            },{
                pattern: this.$.regular.common.commonCn.pattern,
                message: this.$.regular.common.commonCn.message,
                trigger: 'change'
              },{
                validator: this.$.checkRepeat(nameRepeat,null,"code","该编码已存在"),
                trigger: 'change'
              }
            ]
          }
        if(this.$refs.form) {
          setTimeout(() => {
            this.$refs.form.resetFields();
        })
        }
        this.show = true
      },
      //得到函数列表
      async getFn() {
        queryFunction().then(result => {
          if (result.status == 'success' && result.content) {
          this.fnIdList = result.content
        } else {
          this.fnIdList = []
        }
      })
     },
      submit() {
        this.$refs['form'].validate((valid) => {
          if(valid) {
            this.show = false;
            this.form.serviceTypeId = this.$parent.selectNode.id
            create(this.form).then((res) => {
              this.$parent.queryData();
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
#createService .el-textarea__inner{
  height:130px;
}
</style>
