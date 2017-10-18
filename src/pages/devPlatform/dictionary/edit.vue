<template>
		<!--编辑角色页面-->
		<el-dialog title="编辑数据字典" :visible.sync="show" size="tiny" :close-on-click-modal="false">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item label="名称" prop="cnName" disabled>
					<el-input v-model="form.cnName" placeholder="名称"></el-input>
				</el-form-item>
        <el-form-item label="键" prop="keyk">
          <el-input v-model="form.keyk" placeholder="键"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="valuev">
          <el-input v-model="form.valuev" placeholder="值"></el-input>
        </el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="form.description" placeholder="描述"></el-input>
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
		edit,
    keyRepeat
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.cnName = data.cnName;
			this.description = data.description;
      this.keyk = data.keyk;;
      this.valuev = data.valuev;;
		}
	}

	export default {
		created(){
		},
		data(){
			return{
				show: false,
        form: {},
        rules: {}
			}
		},
		methods:{
			getPage(data) {
				this.form = new Form(data);
        this.rules= {
            cnName: [{
              required: true,
              message: '请输入数据字典名称',
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            }
            ],
            keyk: [{
              required: true,
              message: '请输入数据字典的键',
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            },{
              validator: this.$.checkRepeat(keyRepeat,this.form.id,"keyk","该键名已存在"),
              trigger: 'change'
            }
            ],
            valuev: [{
              required: true,
              message: '请输入数据字典的值',
              trigger: 'change'
            },{
              pattern: this.$.regular.devPlatform.value.pattern,
              message: this.$.regular.devPlatform.value.message,
              trigger: 'change'
            }
            ]
          }
				this.show = true;
			},

			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
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

<style scoped>
</style>
