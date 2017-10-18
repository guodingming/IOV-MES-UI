<template>
	<div id="frockUsage">
		<mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
			<template slot="extra">
				<el-form label-width="60px">
					<el-form-item label="企业" prop="parentId">
						<el-select v-model="enterprise" placeholder="请选择企业" @change="changeEnterprise">
							<el-option v-for="item in enterpriseList" :key="item.id" :label="item.company" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
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
		getTree,
		queryData,
		deleting
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
		computed: {

		},
		data() {
			return {
				treeData: false,
				table: {
					option: [{
						prop: "name",
						label: "车间名称"
					},{
						prop: "phone",
						label: "联系电话"
					},{
						prop: "location",
						label: "联系地址"
					},{
						prop: "description",
						label: "附加描述"
					}],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				enterprise:'',
				enterpriseList:[],
				mutiDeleteData:[]
			};
		},
		methods: {
			init() {
				this.getEnterprise()
				this.getTree()
				this.queryData()
			},
			async getEnterprise() {
				let res = await queryEnterprise();
				if(res.status == "success") {
					this.enterpriseList = res.content || [];
				} else {
					this.enterpriseList = [];
				}
			},
			changeEnterprise(data){
				this.getTree()
			},
			async getTree() {
				let res = await getTree({
					enterpriseId:this.enterprise
				});
				if(res.status == "success") {
					this.treeData = this.$.transformTree(res.content, {
						pNode: '工厂列表',
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
				let data = {
					condition: {
						siteInfoId: this.selectNode ? this.selectNode.id : "",
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

			create_getPage() {
				this.$refs.create_form.getPage()
			},
			edit_getPage(data){
				this.$refs.edit_form.getPage(data)
			},
			delete_getPage(data) {
				this.$.delete('此操作将永久删除该车间, 是否继续?',() => {
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
			selectChange(data){
				this.mutiDeleteData = data
			},
			multiDelete() {
				this.$.delete('此操作将永久删除所选车间, 是否继续?',() => {
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
