<template>
	<el-dialog title="编辑订单" :visible.sync="show" size="small" :close-on-click-modal="false">
		<el-form :model="form" :rules="rules" ref="form">
			<el-row :gutter="40">
				<el-col :span="12">
					<el-form-item label="订单号" prop="orderNum">
						<el-input v-model="form.orderNum" placeholder="订单号"></el-input>
					</el-form-item>
					<el-form-item label="客户" prop="customer">
						<el-input v-model="form.customer" placeholder="客户"></el-input>
					</el-form-item>
					<el-form-item label="下单时间" prop="orderTime">
						<el-date-picker v-model="form.orderTime" type="datetime" placeholder="下单时间"></el-date-picker>
					</el-form-item>
					<el-form-item label="生产计划开始时间" prop="startTime">
						<el-date-picker v-model="form.startTime" type="datetime" :picker-options="startTimeOptions" placeholder="生产计划开始时间"></el-date-picker>
					</el-form-item>
					<el-form-item label="仓储" prop="warehouse">
						<el-input v-model="form.warehouse" placeholder="仓储"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="订单名称" prop="name">
						<el-input v-model="form.name" placeholder="订单名称"></el-input>
					</el-form-item>
					<el-form-item label="产品数量" prop="pdNum">
						<el-input-number v-model="form.pdNum" placeholder="产品数量" :min="1"></el-input-number>
					</el-form-item>
					<el-form-item label="交货时间" prop="deliveryTime">
						<el-date-picker v-model="form.deliveryTime" type="datetime" placeholder="交货时间" :picker-options="deliveryTimeOptions"></el-date-picker>
					</el-form-item>
					<el-form-item label="生产计划结束时间" prop="endTime">
						<el-date-picker v-model="form.endTime" type="datetime" placeholder="生产计划结束时间" :picker-options="endTimeOptions"></el-date-picker>
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
		nameRepeat,
		edit
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.id = data.id;
			this.orderNum = data.orderNum;
			this.customer = data.customer;
			this.pdNum = data.pdNum;
			this.name = data.name;
			this.warehouse = data.warehouse;
			this.orderTime = data.orderTime ? new Date(data.orderTime) : "";
			this.deliveryTime = data.deliveryTime ? new Date(data.deliveryTime) : "";
			this.startTime = data.startTime ? new Date(data.startTime) : "";
			this.endTime = data.endTime ? new Date(data.endTime) : "";
		}
	}

	export default {
		data() {
			return {
				show: false,
				form: {},
				rules:{},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				}
			}
		},
    computed: {
      deliveryTimeOptions: function() {
        return {
            disabledDate: (date) => {
            if(this.form.orderTime && this.form.orderTime.getTime() - 86400000 < date.getTime()) {
          return false
        }
        return true
      }
      }
      },
      startTimeOptions: function() {
        return {
            disabledDate: (date) => {
            if((this.form.orderTime && this.form.orderTime.getTime() - 86400000 < date.getTime()) && (this.form.deliveryTime && this.form.deliveryTime.getTime() > date.getTime())) {
          return false
        }
        return true
      }
      }
      },
      endTimeOptions: function() {
        return {
            disabledDate: (date) => {
            if((this.form.startTime && this.form.startTime.getTime() - 86400000 < date.getTime()) && (this.form.deliveryTime && this.form.deliveryTime.getTime() > date.getTime())) {
          return false
        }
        return true
      }
      }
      }
    },
		methods: {
			getPage(data) {
				this.form = new Form(data);
				this.rules = {
					orderNum: [{
							required: true,
							message: '请填写订单号',
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(nameRepeat, this.form.id, "orderNum", "该订单号已存在"),
							trigger: 'change'
						}
					],
					customer: [{
							required: true,
							message: '请填写客户名称',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						}
					],
					name: [{
							required: true,
							message: '请填写订单名称',
							trigger: 'change'
						},
						{
							pattern: this.$.regular.common.commonCn.pattern,
							message: this.$.regular.common.commonCn.message,
							trigger: 'change'
						},
						{
							validator: this.$.checkRepeat(nameRepeat, this.form.id),
							trigger: 'change'
						}
					],
          orderTime: [{
            validator: this.$.validateRequire('请填写下单时间'),
            trigger: 'change'
          }],
          deliveryTime: [{
            validator: this.$.validateRequire('请填写交货时间'),
            trigger: 'change'
          }],
          startTime: [{
            validator: this.$.validateRequire('请填写开始时间'),
            trigger: 'change'
          }],
          endTime: [{
            validator: this.$.validateRequire('请填写结束时间'),
            trigger: 'change'
          }],
					warehouse: [{
						required: true,
						message: '请填写仓储',
						trigger: 'change'
					}, {
						pattern: this.$.regular.common.commonCn.pattern,
						message: this.$.regular.common.commonCn.message,
						trigger: 'change'
					}],
				}

				this.show = true
			},
			submit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.show = false;
						this.form.orderTime = this.$.parseDate(this.form.orderTime)
						this.form.deliveryTime = this.$.parseDate(this.form.deliveryTime)
						this.form.startTime = this.$.parseDate(this.form.startTime)
						this.form.endTime = this.$.parseDate(this.form.endTime)
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
	.el-date-editor.el-input,
	.el-input-number {
		width: 100%
	}
</style>
