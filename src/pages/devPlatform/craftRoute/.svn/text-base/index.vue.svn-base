<template>
	<div id="craftRoute">
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
					<div class="top">
						<mes-table max-height="120" :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :showCheckBox="false">
							<el-table-column fixed="right" label="操作" width="120" v-if="table.data.length>0" slot="operationTool">
								<template scope="scope">
									<el-button @click.native.prevent="check_getPage(scope.row)" type="text" size="small">
										查看工艺路径
									</el-button>
								</template>
							</el-table-column>
						</mes-table>
					</div>

					<div class="bottom">
						<div class="mes-tool">
							<el-button type="success" @click="deploy" :disabled="mutiDeleteData.length == 0">部署<i class="icon-play"></i>
							</el-button>
							<el-button type="warning" @click="unDeploy" :disabled="mutiDeleteData.length == 0">取消部署<i class="icon-stop"></i>
							</el-button>
						</div>
						<mes-table :max-height="table.height" :table-data="table.orderData" :table-option="table.orderOption" :table-loading="table.orderLoading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="true" @selectChange="selectChange">
							<el-table-column fixed="right" label="操作" width="180" v-if="table.orderData.length>0" slot="operationTool">
								<template scope="scope">
									<el-button @click.native.prevent="design_getPage(scope.row)" type="text" size="small">
										工艺路径设计
									</el-button>
									<el-button @click.native.prevent="config_getPage(scope.row)" type="text" size="small">
										工序查看
									</el-button>
								</template>
							</el-table-column>
						</mes-table>
					</div>
				</div>

			</div>
		</mes-table-layout>
		<checkForm ref="check_form"></checkForm>
		<designForm ref="design_form"></designForm>
		<configForm ref="config_form"></configForm>
	</div>
</template>

<script>
	import {
		queryProductLine,
		queryProduct,
		queryData,
		deleting,
		queryOrder,
		unDeploy,
		deploy
	} from "./service";

	import checkForm from "./check"
	import designForm from "./design"
	import configForm from "./config"

	export default {
		components: {
			checkForm,
			designForm,
			configForm
		},
		created() {
			this.init();
		},
		data() {
			return {
				treeData: false,
				table: {
					option: [{
						prop: "name",
						label: "名称"
					}, {
						prop: "version",
						label: "版本"
					}, {
						prop: "enabledTime",
						label: "启用时间"
					}, {
						prop: "releaseTime",
						label: "发布时间"
					}, {
						prop: "isEnabledTB",
						label: "启用状态"
					}, {
						prop: "isReleaseTB",
						label: "发布状态"
					}],
					orderOption: [{
						prop: "bomName",
						label: "BOM名称"
					}, {
						prop: "workOrderNum",
						label: "工单号"
					}, {
						prop: "deployStatusTB",
						label: "部署状态"
					}],
					data: [],
					orderData: [],
					height: this.$.clientHeight() - 439,
					loading: false,
					orderLoading: false,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				cascaderData:[],
				mutiDeleteData: []
			};
		},
		methods: {
			init() {
				this.getProductLine()
				this.getTree()
			},
			async getProductLine() {
				let res = await queryProductLine()
				this.cascaderData = this.$.processArray(res.content, null, {})
			},
			async getTree(id,ids) {
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
				this.queryOrder()
			},
			async queryData() {
				this.table.loading = true;
				this.mutiDeleteData = [];
				let data = {
					condition: {
						pdId: this.selectNode ? this.selectNode.id : "",
						search: this.searchData
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let res = await queryData(data);
				if(res.status == "success") {
					this.table.data = res.content.rows || [];
					this.table.data = this.table.data.map((val) => {
						if(val.isEnabled == "0") {
							val.isEnabledTB = "停用"
						}
						if(val.isEnabled == "1") {
							val.isEnabledTB = "启用"
						}
						if(val.isRelease == "0") {
							val.isReleaseTB = "未发布"
						}
						if(val.isRelease == "1") {
							val.isReleaseTB = "已发布"
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
			async queryOrder() {
				this.table.orderLoading = true;
				let data = {
					condition: {
						pdId: this.selectNode ? this.selectNode.id : "",
						search: this.searchData
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let res = await queryOrder(data);
				if(res.status == "success") {
					this.table.orderData = res.content.rows || [];
					this.table.orderData = this.table.orderData.map((val) => {
						if(val.deployStatus == "0") {
							val.deployStatusTB = "未部署"
						}
						if(val.deployStatus == "1") {
							val.deployStatusTB = "已部署"
						}
						return val
					});

					this.table.pageTotal = res.content.total;
				} else {
					this.table.orderData = [];
					this.table.pageTotal = 0;
				}
				this.table.orderLoading = false;
			},
			check_getPage(data) {
				this.$refs.check_form.getPage(data)
			},
			design_getPage(data) {
				this.$refs.design_form.getPage(data)
			},
			config_getPage(data) {
				this.$refs.config_form.getPage(data)
			},
			delete_getPage(data) {
				this.$.delete('将永久删除该工艺路径, 是否继续?', () => {
					deleting({
						ids: data.id
					}).then((res) => {
						this.queryData()
					})
				})
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
			},
			selectChange(data) {
				this.mutiDeleteData = data
			},
			deploy() {
				let routeIds = [];
				for(let item of this.table.orderData) {
					if(this.mutiDeleteData.indexOf(item.id) != -1) {
						routeIds.push(item.routeId)
					}
				}
				this.$.delete('是否部署所选工程?', () => {
					deploy({
						ids: routeIds.join(",")
					}).then((res) => {
						this.queryOrder()
					})
				})
			},
			unDeploy() {
				let routeIds = [];
				for(let item of this.table.orderData) {
					if(this.mutiDeleteData.indexOf(item.id) != -1) {
						routeIds.push(item.routeId)
					}
				}
				this.$.delete('是否取消部署所选工程?', () => {
					unDeploy({
						ids: routeIds.join(",")
					}).then((res) => {
						this.queryOrder()
					})
				})
			}
		}
	};
</script>

<style scoped>
	.top {
		/*height: 30%;*/
	}
	
	.bottom {
		margin-top: 50px
		/*height: 50%;*/
	}
	
	.bottom .mes-tool {
		position: relative;
		padding: 0;
	}
</style>