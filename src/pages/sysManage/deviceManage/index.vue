<template>
	<div id="deviceManage">
		<mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
			<template slot="extra">
				<el-form label-width="40px">
					<el-form-item label="车间">
						<mes-cascader
							:data="cascaderData"
		          			ref="cascader"
							@level1="level1"
							@level2="level2"
							@change="changeArea">
	          			</mes-cascader>
					</el-form-item>
				</el-form>
			</template>
			<template slot="tool">
				<el-button type="primary" icon="document" @click="treeCreate_getPage" :disabled="!(selectNode&&selectNode.isRoot)"></el-button>
				<el-button type="primary" icon="edit" @click="treeEdit_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)"></el-button>
				<el-button type="primary" icon="delete" @click="treeDelete_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)"></el-button>
			</template>
			<div class="mes-content" slot="container">
				<div class="mes-tool">
					<el-button type="primary" @click="create_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)">新建<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<el-button type="primary" @click="config_getPage">设备配置类型<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i class="el-icon-delete el-icon--right"></i>
					</el-button>
					<el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search" @keyup.enter.native="search">
					</el-input>
				</div>
				<div class="mes-table" v-if="table.data">
					<mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="true" @selectChange="selectChange">
						<el-table-column fixed="right" label="操作" width="200" v-if="table.data.length>0" slot="operationTool">
							<template scope="scope">
								<el-button @click.native.prevent="accessoryConfig_getPage(scope.row)" type="text" size="small">
									附件配置
								</el-button>
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
		<accessoryConfigForm ref="accessoryConfig_form"></accessoryConfigForm>
		<configTypeForm ref="configType_form"></configTypeForm>
		<treeCreateForm ref="treeCreate_form"></treeCreateForm>
		<treeEditForm ref="treeEdit_form"></treeEditForm>
		<createForm ref="create_form"></createForm>
		<configForm ref="config_form"></configForm>
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
		treeDelete,
		deleting
	} from "./service";

	import accessoryConfigForm from "./accessoryConfig"
	import configTypeForm from "./configType"
	import treeCreateForm from "./treeCreate"
	import configForm from "./config"
	import treeEditForm from "./treeEdit"
	import createForm from "./create"
	import editForm from "./edit"

	export default {
		components: {
			accessoryConfigForm,
			configTypeForm,
			treeCreateForm,
			treeEditForm,
			createForm,
			configForm,
			editForm
		},
		created() {
			this.init();
		},
		computed: {

		},
		data() {
			return {
				treeData: false,
				table: {
					option: [{
						prop: "ip",
						label: "IP"
					}, {
						prop: "name",
						label: "设备名称"
					}, {
						prop: "assetCode",
						label: "资产编号"
					}, {
						prop: "description",
						label: "附加描述"
					}],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				mutiDeleteData: [],
        cascaderData:[],
				selectNode: ""
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
			changeArea(id){
				this.area = id
				this.queryData()
			},
			async getTree() {
				let res = await getTree();
				if(res.status == "success") {
					this.treeData = this.$.transformTree(res.content, {
						pNode: '设备类型列表',
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
        this.mutiDeleteData = [];
				let data = {
					condition: {
						areaId: this.area,
						deviceTypeId: this.selectNode ? this.selectNode.id : "",
						search: this.searchData
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let res = await queryData(data);
				if(res.status == "success") {
					this.table.data = res.content.rows || [];
					this.table.pageTotal = res.content.total;
				} else {
					this.table.data = [];
					this.table.pageTotal = 0;
				}
				this.table.loading = false;
			},

			accessoryConfig_getPage(data) {
				this.$refs.accessoryConfig_form.getPage(data)
			},
			config_getPage() {
				this.$refs.config_form.getPage()
			},

			configType_getPage(data) {
				this.$refs.configType_form.getPage(data)
			},

			treeCreate_getPage() {
				this.$refs.treeCreate_form.getPage()
			},
			treeEdit_getPage() {
				this.$refs.treeEdit_form.getPage(this.selectNode)
			},
			treeDelete_getPage() {
				this.$.delete('此操作将永久删除该设备类型, 是否继续?', () => {
					treeDelete({
						ids: this.selectNode.id
					}).then((res) => {
						this.getTree()
					})
				})
			},
			create_getPage() {
				this.$refs.create_form.getPage()
			},
			edit_getPage(data) {
				this.$refs.edit_form.getPage(data)
			},
			delete_getPage(data) {
				this.$.delete('此操作将永久删除该设备, 是否继续?', () => {
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
			multiDelete() {
				this.$.delete('此操作将永久删除所选设备, 是否继续?', () => {
					deleting({
						ids: this.mutiDeleteData
					}).then((res) => {
						this.queryData()
					})
				})
			}
		}
	};
</script>

<style scoped>

</style>
