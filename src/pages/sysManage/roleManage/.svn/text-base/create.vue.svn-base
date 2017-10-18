<template>
	<el-dialog title="新建角色" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="名称"></el-input>
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
		queryRole,
		create,
	} from "./service";

	class Form {
		constructor() {
			this.name = "";
			this.description = "";
		}
	}

	export default {
		created() {},
		data() {
			return {
				show: false,
        form: {},
        rules: {},
			}
		},
		methods: {
			getPage() {
        this.form = new Form();
        if(this.$refs.form) {
          this.$refs.form.resetFields();
        }else{
          this.rules = {
            name: [{
              required: true,
              message: '请输入角色名',
              trigger: 'change'
            },
              {
                pattern: this.$.regular.common.commonCn.pattern,
                message: this.$.regular.common.commonCn.message,
                trigger: 'change'
              },
              {
                validator: this.$.checkRepeat(queryRole),
                trigger: 'change'
              }
            ]
          }
        }
        this.show = true
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
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

<style scoped>

</style>
