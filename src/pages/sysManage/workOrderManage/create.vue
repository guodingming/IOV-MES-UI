<template>
	<el-dialog title="新建工单" :visible.sync="show" size="small" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-row :gutter="40">
				<el-col :span="12">
					<el-form-item label="订单名称" prop="orderName">
						<el-input v-model="form.orderName" placeholder="订单名称" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="工单号生成规则">
						<mes-cascader ref="workOrder" :data="workOrderData" @level1="levelWorkOrder" v-model="form.workOrder">
						</mes-cascader>
					</el-form-item>
					<el-form-item label="工单BOM" prop="bomWorkId">
						<el-select v-model="form.bomWorkId" placeholder="请选择工单BOM" filterable>
							<el-option v-for="item in bomWorkList" :value="item.id" :label="item.pdName"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="工单计划开始时间" prop="planStartTime">
						<el-date-picker v-model="form.planStartTime" type="datetime" placeholder="工单计划开始时间"></el-date-picker>
					</el-form-item>
					<el-form-item label="连板数" prop="num">
						<el-input v-model="form.num" placeholder="连板数"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="工艺路径" prop="projectId">
						<el-select v-model="form.projectId" placeholder="请选择工艺路径" filterable>
							<el-option v-for="item in routeList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="批次号生成规则">
						<mes-cascader ref="batchNo" :data="batchNoData" @level1="levelBatchNo" v-model="form.batchNo">
						</mes-cascader>
					</el-form-item>
					<el-form-item label="工单数量" prop="workOrderTotal">
						<el-input v-model="form.workOrderTotal" placeholder="工单数量"></el-input>
					</el-form-item>
					<el-form-item label="工单计划结束时间" prop="planStartTime">
						<el-date-picker v-model="form.planEndTime" type="datetime" placeholder="工单计划结束时间" :picker-options="endTimeOptions"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
	</el-dialog>
</template>

<script>
	import {
		getRulesByType,
		queryPorject,
		queryBomWork,
		queryArea,
		create
	} from "./service";

	class Form {
		constructor() {
			this.workOrderName = "";
			this.workOrderTotal = "";
			this.planStartTime = "";
			this.planEndTime = "";
			this.batchNo = [];
			this.barcodeRulesId = "";
			this.barcodeRulesTypeId = "";
			this.description = "";
			this.projectId = "";
			this.orderId = "";
			this.traceCodeRulesId = "";
			this.workOrder = [];
			this.workOrderRulesId = "";
			this.workOrderRulesTypeId = "";
			this.orderName = "";
			this.bomWorkId = "";
			this.status = "0";
			this.num = "";
		}
	}

	export default {
    computed: {
      endTimeOptions: function() {
        return {
            disabledDate: (date) => {
            if(this.form.planStartTime && this.form.planStartTime.getTime() - 86400000 < date.getTime()) {
          return false
        }
        return true
      }
      }
      }
    },
		data() {
			return {
				show: false,
				form: {},
				rules: {},
				routeList: [],
				bomWorkList: [],
				workOrderData: [],
				batchNoData: []
			}
		},
		methods: {
			getPage() {
				this.form = new Form();
				this.getProject();
				this.getBomWork();
				this.form.orderName = this.$parent.selectNode.name;
				this.form.orderId = this.$parent.selectNode.id;
				this.form.pdId = this.$parent.pd;
				this.workOrderData = this.$.processArray(this.$parent.ruleTypeList, null, {
					children: []
				});
				this.batchNoData = this.$.processArray(this.$parent.ruleTypeList, null, {
					children: []
				});
        this.rules = {
          bomWorkId: [{
            required: true,
            message: '请选择工单BOM',
            trigger: 'change'
          }],
          num: [{
            validator: this.$.validateRequire('请填写连板数'),
            trigger: 'change'
          },
            {
              pattern: this.$.regular.common.number.pattern,
              message: this.$.regular.common.number.message,
              trigger: 'change'
            }
          ],
          workOrderTotal: [{
            validator: this.$.validateRequire('请填写工单数'),
            trigger: 'change'
          },
            {
              pattern: this.$.regular.common.number.pattern,
              message: this.$.regular.common.number.message,
              trigger: 'change'
            }
          ],
          projectId: [{
            required: true,
            message: '请选择工艺路径',
            trigger: 'change'
          }],
          planStartTime: [{
            validator: this.$.validateRequire('请填写开始时间'),
            trigger: 'change'
          }],
          planEndTime: [{
            validator: this.$.validateRequire('请填写结束时间'),
            trigger: 'change'
          }]
        }

				if(this.$refs.form) {
					setTimeout(() => {
						this.$refs.form.resetFields();
					})
				}
				this.show = true
			},
			async levelWorkOrder(id, ids) {
				if(id) {
					let res = await getRulesByType({
						typeId: id
					})
					let data = this.$.processArray(res.content)
					this.$refs.workOrder.setChild(id, ids, data)
				}
			},
			async levelBatchNo(id, ids) {
				if(id) {
					let res = await getRulesByType({
						typeId: id
					})
					let data = this.$.processArray(res.content)
					this.$refs.batchNo.setChild(id, ids, data)
				}
			},
			async getProject() {
				let param = {
					pdId: this.$parent.pd,
          isRelease:"1"
				};
				let res = await queryPorject(param);
				if(res.status == "success") {
					this.routeList = res.content || []
				} else {
					this.routeList = []
				}
			},
			async getBomWork() {
				let param = {
					pdId: this.$parent.pd
				};
				let res = await queryBomWork(param);
				if(res.status == "success") {
					this.bomWorkList = res.content || []
				} else {
					this.bomWorkList = []
				}
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.planStartTime = this.$.parseDate(this.form.planStartTime)
						this.form.planEndTime = this.$.parseDate(this.form.planEndTime)
						this.form.workOrderRulesTypeId = this.form.workOrder[0]
						this.form.workOrderRulesId = this.form.workOrder[1]
						this.form.barcodeRulesTypeId = this.form.batchNo[0]
						this.form.barcodeRulesId = this.form.batchNo[1]
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
	.el-date-editor.el-input,
	.el-input-number {
		width: 100%
	}
</style>
