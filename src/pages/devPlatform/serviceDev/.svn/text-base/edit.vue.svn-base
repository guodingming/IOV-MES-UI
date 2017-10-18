<template>
	<!--编辑用户页面-->
	<el-dialog title="编辑服务" :visible.sync="show" size="tiny" id="editService" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="中文名称" prop="name">
        <el-input v-model="form.name" placeholder="中文名称"></el-input>
      </el-form-item>
      <el-form-item label="英文名称" prop="methodName">
        <el-input v-model="form.methodName" placeholder="英文名称"></el-input>
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
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
      this.name = data.name;
      this.fnId = data.fnId;
      this.methodName = data.methodName;
      this.description = data.description;
		}
	}

	export default {
		created() {},
		data() {
			return {
				show: false,
        form: {},
        rules: {},
        fnIdList:[],
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
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
              validator: this.$.checkRepeat(nameRepeat,this.form.id),
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
              validator: this.$.checkRepeat(nameRepeat,this.form.id,"code","该编码已存在"),
              trigger: 'change'
            }
            ]
          }
				this.show = true;
        this.getFn()
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
						edit(this.form).then((res) => {
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

<style >
  #editService .el-textarea__inner{
    height:130px;
  }
</style>
