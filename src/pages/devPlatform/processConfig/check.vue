<template>
	<el-dialog id="check" title="配置" :visible.sync="show" size="full" :close-on-click-modal="false">
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="属性配置" name="config"></el-tab-pane>
			<el-tab-pane label="扩展属性" name="extend"></el-tab-pane>
		</el-tabs>
		<el-row v-if="activeName=='config'">
			<el-col :span="12">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>基础属性</span>
					</div>
					<el-form :model="form">
						<el-form-item label="表单类型">
							<el-input v-model="form.formType" placeholder="表单类型" disabled>
							</el-input>
						</el-form-item>
						<el-form-item label="表单">
							<el-input v-model="form.form" placeholder="表单" disabled>
							</el-input>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
			<el-col :span="12" v-if="extendData.length > 0">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>扩展属性</span>
					</div>
					<el-form>
						<el-form-item v-for="item in extendData" :label="item.dictionaryCnName">
							<el-input v-if="item.type=='char'||item.type=='other'" v-model="item.value" :placeholder="item.dictionaryCnName" disabled>
							</el-input>
							<el-input v-if="item.type=='file'" v-model="item.fileName" :placeholder="item.dictionaryCnName" disabled>
							</el-input>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<div class="mes-table" v-if="activeName=='extend'">
			<mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="false">
			</mes-table>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getExtendAttr,
		getExtend,
		getBaseConfig
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.formType = data.formType;
			this.form = data.formName;
		}
	}

	export default {
		data() {
			return {
				show: false,
				activeName: 'config',
				form: new Form(),
				table: {
					option: [{
						prop: "dictionaryCnName",
						label: "属性名称"
					}, {
						prop: "type",
						label: "数据类型"
					}, {
						prop: "createDate",
						label: "创建时间"
					}],
					loading: false,
					pageSize: 5,
					pageNum: 1
				},
				extendData: []
			}
		},
		methods: {
			getPage(data) {
				this.bringData = data;
				this.show = true
				this.queryBase();
				this.queryExtendAttr();
				this.queryExtend();
			},
			async queryBase() {
				let res = await getBaseConfig({processId: this.bringData.id});
				this.form = new Form(res.content[0])
			},
			async queryExtendAttr() {
				let res = await getExtendAttr({
					processId: this.bringData.id
				});
				if(res.status == "success") {
					this.extendData = res.content || [];
					this.extendData = this.extendData.map((val) => {
						if(val.type == "file"&&val.value) {
							let fullName = val.value.substring(val.value.lastIndexOf("/") + 1);
							val.fileName = fullName.substring(fullName.indexOf("-") + 1)
						}
						return val
					});
				}
			},
			async queryExtend() {
				this.table.loading = true;
				let data = {
					condition: {
						processId: this.bringData.id
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let res = await getExtend(data);
				if(res.status == "success") {
					this.table.data = res.content.rows || [];
					this.table.pageTotal = res.content.total;
				} else {
					this.table.data = [];
					this.table.pageTotal = 0;
				}
				this.table.loading = false;
			},
			pageChange(currentPage) {
				this.table.pageNum = currentPage
				this.queryExtend();
			},
			sizeChange(size) {
				this.table.pageSize = size
				this.queryExtend();
			}
		}
	}
</script>

<style>
	#processConfig #check .el-dialog--full {
		overflow: hidden;
		top:5%;
		bottom:5%;
		left:5%;
		right:5%;
		width: auto;
		height: auto;
		transform: none;
	}
	#processConfig #check .el-tabs {
		padding-top: 20px;
		padding-left: 20px
	}

	#processConfig #check .el-dialog__body {
		height: calc(100% - 54px);
		padding: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}

	#processConfig #check .el-dialog__body .el-row {
		height: calc(100% - 77px);
	}

	#processConfig #check .el-dialog__body .el-row .el-col {
		height: 100%;
		padding: 20px
	}

	#processConfig #check .el-dialog__body .el-row .el-col .el-card {
		height: 100%;
	}
	#processConfig #config .el-dialog__body .el-row .el-col .el-card .el-card__body{
		height: calc(100% - 57px);
		overflow-y: auto;
	}

	#processConfig #check .mes-table {
		top: 140px;bottom:61px
	}
</style>
