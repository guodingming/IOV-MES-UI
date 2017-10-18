<template>
	<el-dialog title="测试" :visible.sync="show" size="large" id="test">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="输入参数" prop="params">
				<el-input type="textarea" v-model="form.params" placeholder="输入参数"></el-input>
			</el-form-item>
      <el-form-item label="返回结果" prop="response">
        <el-input type="textarea" v-model="form.response" :rows="10" placeholder="返回结果"></el-input>
      </el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
		    <el-button class="btnTest" type="primary" @click="submit()" :disabled="loading">测试</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
    test
	} from "./service";

	class Form {
		constructor(data={}) {
			this.params = "";
			this.response = data.response;
		}
	}

	export default {
		data() {
			const params = (rule, value, callback) => {
				if(value) {
					function isJSON (str) {
					  str = str.replace(/\s/g, '').replace(/\n|\r/, '');
					  if (/^\{(.*?)\}$/.test(str))
					    return /"(.*?)":(.*?)/g.test(str);
					  if (/^\[(.*?)\]$/.test(str)) {
					    return str.replace(/^\[/, '')
					      .replace(/\]$/, '')
					      .replace(/},{/g, '}\n{')
					      .split(/\n/)
					      .map(function (s) { return isJSON(s); })
					      .reduce(function (prev, curr) { return !!curr; });
					  }
					  return false;
					}
					if(isJSON(value)){
						callback()
					}
					else{
						callback(new Error("请输入json格式数据"))
					}
				}
				else{
					callback()
				}
			};
			return {
				show: false,
				form: new Form(),
				rules: {
          params: [{
							validator: _.debounce(params,500),
							trigger: 'change'
					}]
				},
				loading:false,
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
        this.form.code = data.code;
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.show = true
			},
			submit() {
				this.loading = true
				this.$refs['form'].validate((valid) => {
					if(valid) {

            let data = {
              code:this.form.code
            }
            if(this.form.params){
              data.params = JSON.parse(this.form.params)
            }
            test(data).then((res) => {
              this.loading = false
              this.form.response = res.content
          });
					} else {
						this.loading = false
						return false;
					}
				});
			},
		}
	}
</script>

<style>
#test .el-dialog--large{
	width: 50%;
}
#test .btnTest{
	width:100%
}
#test .el-dialog__body{
	padding:30px 20px 10px 20px;
}

</style>
