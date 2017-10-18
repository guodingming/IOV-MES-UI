<template>
	<div id="repairStation">
		<mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
			<template slot="extra">
				<el-form label-width="60px">
					<el-form-item label="产品线">
						<mes-cascader ref="cascader" :data="cascaderData" @change="getTree">
						</mes-cascader>
					</el-form-item>
				</el-form>
			</template>
			<div class="mes-content" slot="container">
				<div class="mes-tool">
					<el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search" @keyup.enter.native="search">
					</el-input>
				</div>
				<div class="mes-table" v-if="table.data">
					<mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="false">
						<el-table-column fixed="right" label="操作" width="120" v-if="table.data.length>0" slot="operationTool">
							<template scope="scope">
								<!--<el-button @click.native.prevent="entryInfo_getPage(scope.row)" type="text" size="small">-->
								<!--不良信息录入-->
								<!--</el-button>-->
								<el-button @click.native.prevent="repair_getPage(scope.row)" type="text" size="small">
									维修信息
								</el-button>
							</template>
						</el-table-column>
					</mes-table>
				</div>
			</div>
		</mes-table-layout>
		<entryInfo ref="entry_info"></entryInfo>
		<repair ref="repair"></repair>
	</div>
</template>

<script>
	import {
		queryProductLine,
		queryProduct,
		queryData
	} from "./service";

	import entryInfo from "./entryInfo"
	import repair from "./repair"

	export default {
		components: {
			entryInfo,
			repair
		},
		created() {
			this.init();
		},
		data() {
			return {
				treeData: false,
				table: {
					option: [{
							label: "工序",
							prop: "processName"
						},
						{
							label: "工站",
							prop: "workstationDeviceId"
						},
						{
							label: "工单号",
							prop: "workOrderNum"
						},
						{
							label: "批次号",
							prop: "workOrderBatchNum"
						},
						{
							label: "状态",
							prop: "statusTB"
						},
						{
							label: "结果",
							prop: "isSuccessTB"
						},
						{
							label: "操作人",
							prop: "userName"
						}
					],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				cascaderData: [],
				mutiDeleteData: []
			};
		},
		methods: {
			init() {
				this.getProductLine()
				this.getTree()
				this.queryData()
			},
			async getProductLine() {
				let res = await queryProductLine()
				this.cascaderData = this.$.processArray(res.content, null, {})
			},
			async getTree(id, ids) {
				let res = await queryProduct({
					pdLineId: id
				});
				if(res.status == "success") {
					this.treeData = this.$.transformTree(res.content, {
						pNode: '产品列表',
						listArray: true
					})
				} else {
					this.treeData = []
				}
				this.selectNode = null
			},
			treeClick: function(node) {
				this.selectNode = node
				this.queryData()
			},
			async queryData() {
				this.table.loading = true;
				let data = {
					condition: {
						pdId: this.selectNode ? this.selectNode.id : "",
						search: this.searchData
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let res = await
				queryData(data);
				if(res.status == "success") {
					this.table.data = res.content.rows || [];
					this.table.data = this.table.data.map((val) => {
						if(val.status == "1") {
							val.statusTB = "返修"
						}
						if(val.status == "2") {
							val.statusTB = "报废"
						}
						if(val.isSuccess == "0") {
							val.isSuccessTB = "失败"
						}
						if(val.isSuccess == "1") {
							val.isSuccessTB = "成功"
						}
						return val
					});
					this.table.pageTotal = res.content.total;
				} else {
					this.table.data = [];
					this.table.pageTotal = 0;
				}
				this.table.loading = false;
			},
			entryInfo_getPage(data) {
				this.$refs.entry_info.getPage(data)
			},
			repair_getPage(data) {
				this.$refs.repair.getPage(data)
			},
			search() {
				this.queryData();
			},
			pageChange(currentPage) {
				this.table.pageNum = currentPage
				this.queryData();
			},
			sizeChange(size) {
				this.table.pageSize = size
				this.queryData();
			}
		}
	};
</script>

<style scoped>

</style>