<template>
	<el-dialog title="新建生产线" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="生产线名称" prop="name">
				<el-input v-model="form.name" placeholder="生产线名称"></el-input>
			</el-form-item>
			<!--<el-form-item label="位置" prop="location">-->
			<!--<el-input v-model="form.location" placeholder="位置"></el-input>-->
			<!--</el-form-item>-->
			<!-- <el-form-item label="产能" prop="location">
        <el-input v-model="form.capacity" placeholder="产能"></el-input>
      </el-form-item>-->
			<!-- <el-form-item label="分类" prop="category">
        <el-select v-model="form.category" placeholder="分类">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>-->
			<el-form-item label="描述" prop="description">
				<el-input type="textarea" v-model="form.description" placeholder="描述"></el-input>
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
		create,
		queryProductLine
	} from "./service";

	class Form {
		constructor() {
			this.name = "";
			// this.location = "";
			// this.category = "";
			this.description = "";
			//    this.capacity = "";
		}
	}

	export default {
		created() {},
		computed: {},
		data() {
			return {
				show: false,
				form: {},
				rules: {}
			}
		},
		methods: {
			getPage() {
				this.form = new Form();
				this.rules = {
					name: [{
							required: true,
							message: '请输入产线名称',
							trigger: 'change'
						}, {
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(queryProductLine),
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
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.areaId = this.$parent.selectNode.id
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