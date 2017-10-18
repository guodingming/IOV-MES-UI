<template>
	<!--编辑Agent页面-->
	<el-dialog title="编辑Agent" :visible.sync="show" size="tiny" id="editService" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="IP" prop="ip">
        <el-input v-model="form.ip" placeholder="IP"></el-input>
      </el-form-item>
      <el-form-item label="工作站" prop="workstationId">
        <el-select v-model="form.workstationId" placeholder="工作站">
          <el-option v-for="item in workstaionList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
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
    ipRepeat,
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
      this.ip = data.ip;
      this.workstationId = data.workstationId;
      this.description = data.description;
		}
	}

	export default {
    computed: {
      workstaionList: function () {
        return this.$parent.workstaionList
      }
    },
		created() {},
		data() {
			return {
				show: false,
        form: {},
        rules: {},
        fnIdList:[]
			}
		},
		methods: {
			getPage(data) {
        this.rules={
          workstationId: [{
            required: true,
            message: '请选择工作站',
            trigger: 'change'
          }
          ],
          ip: [{
            required: true,
            message: '请输入IP',
            trigger: 'change'
          },{
            pattern: this.$.regular.common.ip.pattern,
            message: this.$.regular.common.ip.message,
            trigger: 'change'
          },{
            validator: this.$.checkRepeat(ipRepeat,this.form.id,"ip"),
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
