<template>
	<div id="packConfig">
		<mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
			<template slot="tool">
				<el-button type="primary" icon="document" @click="treeCreate_getPage"></el-button>
				<el-button type="primary" icon="edit" @click="treeEdit_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)"></el-button>
				<el-button type="primary" icon="delete" @click="treeDelete_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)"></el-button>
			</template>
			<div class="mes-content" slot="container">
				<div class="mes-tool">
					<el-button type="primary" @click="create_getPage":disabled="!selectNode||(selectNode&&selectNode.isRoot)">新建<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search" @keyup.enter.native="search">
					</el-input>
				</div>
				<div class="mes-table" v-if="table.data">
					<mes-table :table-data="table.data"
						:table-option="table.option"
						:table-loading="table.loading"
						:total="table.pageTotal"
						:pageSize="table.pageSize"
						:pageChange="pageChange"
						:sizeChange="sizeChange"
						:pageNum="table.pageNum"
						:showCheckBox="true"
						@selectChange="selectChange">
						<el-table-column fixed="right" label="操作" width="90" v-if="table.data.length>0" slot="operationTool">
							<template scope="scope">
								<el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small" :disabled="!selectNode||(selectNode&&selectNode.isRoot)">
									删除
								</el-button>
							</template>
						</el-table-column>
					</mes-table>
				</div>
			</div>
		</mes-table-layout>
		<treeCreateForm ref="treeCreate_form"></treeCreateForm>
		<treeEditForm ref="treeEdit_form"></treeEditForm>
		<createForm ref="create_form"></createForm>
	</div>
</template>

<script>
	import {
		getDept,
		getTree,
		queryData,
		treeDelete,
		deleting
	} from "./service";

	import treeCreateForm from "./treeCreate"
	import treeEditForm from "./treeEdit"
	import createForm from "./create"

	export default {
		components: {
			treeCreateForm,
			treeEditForm,
			createForm
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
						prop: "name",
						label: "姓名"
					},{
						prop: "deptName",
						label: "部门"
					},{
						prop: "jobNumber",
						label: "工号"
					}],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				deptList: [],
				mutiDeleteData:[]
			};
		},
		methods: {
			init() {
				this.getDept()
				this.getTree()
				this.queryData()
			},
			async getDept() {
				let res = await getDept();
				if(res.status == "success") {
					this.deptList = res.content || []
				} else {
					this.deptList = []
				}
			},
			async getTree() {
				let res = await getTree();
				if(res.status == "success") {
					this.treeData = this.$.transformTree(res.content, {
						pNode: '用户组',
						listArray:true
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
						userGroupId: this.selectNode ? this.selectNode.id : "",
						search:this.searchData
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
			treeCreate_getPage() {
				this.$refs.treeCreate_form.getPage()
			},
			treeEdit_getPage() {
				this.$refs.treeEdit_form.getPage(this.selectNode)
			},
			treeDelete_getPage() {
				this.$.delete('此操作将永久删除该部门, 是否继续?',() => {
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
			delete_getPage(data) {
				this.$.delete('将该用户移除用户组, 是否继续?',() => {
					deleting({
						groupId: this.selectNode.id,
						userIds: data.id
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
			selectChange(data){
				this.mutiDeleteData = data
			},
			multiDelete() {
				this.$.delete('将所选用户移除用户组, 是否继续?',() => {
					deleting({
						groupId: this.selectNode.id,
						userIds: this.mutiDeleteData
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
