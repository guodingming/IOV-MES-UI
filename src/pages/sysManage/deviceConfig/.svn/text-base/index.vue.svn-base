<template>
	<div id="deviceConfig">
		<mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
			<template slot="extra">
				<el-form ref="form" label-width="40px">
					<el-form-item label="车间">
						<mes-cascader
							:data="cascaderData"
		          			ref="cascader"
							@level1="level1"
							@level2="level2"
							@change="getTree">
	          			</mes-cascader>
					</el-form-item>
				</el-form>
			</template>
			<div class="mes-content" slot="container" :class="{'none':configTypeList.length==0}">
				<el-tabs v-model="configType" type="card" @tab-click="queryData">
					<el-tab-pane :key="item.id" v-for="item in configTypeList" :label="item.name" :name="item.id">
					</el-tab-pane>
				</el-tabs>
				<div class="mes-tool">
					<el-button type="primary" @click="create_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)||(selectNode&&selectNode.children&&selectNode.children.length>0)||configTypeList.length==0">
						配置<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">
						删除<i class="el-icon-delete el-icon--right"></i>
					</el-button>
					<el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search" @keyup.enter.native="search">
					</el-input>
				</div>
				<div class="mes-table">
					<mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="true" @selectChange="selectChange">
						<el-table-column fixed="right" label="操作" width="120" v-if="table.data.length>0" slot="operationTool">
							<template scope="scope">
								<el-button @click.native.prevent="edit_getPage(scope.row)" type="text" size="small">
									编辑
								</el-button>
								<el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small">
									删除
								</el-button>
							</template>
						</el-table-column>
					</mes-table>
				</div>

			</div>
		</mes-table-layout>
		<createForm ref="create_form"></createForm>
		<editForm ref="edit_form"></editForm>
	</div>
</template>

<script>
	import {
		queryEnterprise,
		querySite,
		queryArea,
		getTree,
		queryData,
		deleting,
		queryDeviceConfigTypes
	} from "./service";
	import createForm from "./create"
	import editForm from "./edit"

	export default {
		components: {
			createForm,
			editForm
		},
		created() {
			this.init();
		},
		computed: {},
		data() {
			return {
				treeData: false,
				table: {
					option: [{
						prop: "name",
						label: "配置名称"
					}, {
						prop: "type",
						label: "配置类型"
					}, {
						prop: "content",
						label: "内容"
					}, {
						prop: "version",
						label: "版本"
					}, {
						prop: "createDate",
						label: "创建时间"
					}],
					data: [],
					loading: false,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				mutiDeleteData: [],
				selectNode: "",
				configTypeList: [],
        cascaderData:[],
				configType: ""
			};
		},
		methods: {
			init() {
				this.getEnterprise()
				this.getTree()
				this.queryData()
			},
			async getEnterprise() {
				let res = await queryEnterprise()
				this.cascaderData = this.$.processArray(res.content, {"name": "company"}, {children: []})
			},
			async level1(id, ids) {
				let res = await querySite({enterpriseId: id})
				let data = this.$.processArray(res.content, null, {children: []})
				this.$refs.cascader.setChild(id, ids, data)
			},
			async level2(id, ids) {
				let res = await queryArea({siteInfoId: id})
				this.$refs.cascader.setChild(id, ids, res.content)
			},
			async getTree(id) {
				let res = await getTree({areaId: id});
				if(res.status == "success") {
					this.treeData = this.$.transformTree(res.content, {
						pNode: "设备列表",
						listArray: true
					})
				} else {
					this.treeData = []
				}
				this.selectNode = null
			},
			treeClick: function(node) {
				this.selectNode = node
				this.getDeviceConfigTypes(node.id)
			},
			async getDeviceConfigTypes(data) {
				let res = await queryDeviceConfigTypes({
					deviceId: data
				});
				if(res.status == 'success' && res.content.length > 0) {
					this.configTypeList = res.content
					this.configType = res.content[0].id
					this.queryData()
				} else {
					this.configTypeList = []
				}
			},
			async queryData() {
				this.table.loading = true;
        this.mutiDeleteData = [];
				let data = {
					condition: {
						search: this.searchData
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let deviceId = this.selectNode ? this.selectNode.id : ""
				let deviceConfigTypeId = this.configType
				let res = await queryData(deviceId, deviceConfigTypeId, data);
				if(res.status == "success") {
					this.table.data = res.content.rows || [];
					this.table.data = this.table.data.map((val) => {
						if(val.filename) {
							val.content = val.filename
						}
						return val
					})
					this.table.pageTotal = res.content.total;
				} else {
					this.table.data = [];
					this.table.pageTotal = 0;
				}
				this.table.loading = false;
			},
			create_getPage() {
				this.$refs.create_form.getPage({
					deviceId: this.selectNode.id,
					deviceConfigTypeId: this.configType
				})
			},
			edit_getPage(data) {
				this.$refs.edit_form.getPage(data)
			},
			delete_getPage(data) {
				this.$.delete('此操作将永久删除该记录, 是否继续?', () => {
					deleting({
						ids: data.id
					}).then((res) => {
						this.queryData()
					})
				})
			},
			multiDelete() {
				this.$.delete('此操作将永久删除所选记录, 是否继续?', () => {
					deleting({
						ids: this.mutiDeleteData
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
			}
		}
	};
</script>

<style>
	#deviceConfig .tool .el-form-item {
		margin-bottom: 12px
	}

	#deviceConfig .mes-content {
		height: 100%;
		padding: 20px
	}

	#deviceConfig .el-tabs {
		clear: both;
	}

	#deviceConfig .mes-tool {
		top: 77px
	}

	#deviceConfig .mes-table {
		top: 137px
	}

	#deviceConfig .none .el-tabs__header {
		border-bottom: none;
	}

	#deviceConfig .none .mes-tool {
		top: 0;
	}

	#deviceConfig .none .mes-table {
		top: 60px;
	}
</style>
