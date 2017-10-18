<template>
	<div id="productBom">
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
					<el-button type="primary" @click="create_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)||(selectNode&&selectNode.children)">BOM导入<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i class="el-icon-delete el-icon--right"></i>
					</el-button>
					<el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search" @keyup.enter.native="search">
					</el-input>
				</div>
				<div class="mes-table" v-if="table.data">
					<mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="true" @selectChange="selectChange">
						<el-table-column fixed="right" label="操作" width="180" v-if="table.data.length>0" slot="operationTool">
							<template scope="scope">
								<el-button @click.native.prevent="edit_getPage(scope.row)" type="text" size="small">
									编辑
								</el-button>
								<el-button @click.native.prevent="detail_getPage(scope.row)" type="text" size="small">
									详情
								</el-button>
								<el-button @click.native.prevent="prop_getPage(scope.row)" type="text" size="small">
									属性
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
		<detailForm ref="detail_form"></detailForm>
		<propForm ref="prop_form"></propForm>
	</div>
</template>

<script>
	import {
		queryProductLine,
		queryProduct,
		queryData,
		deleting,
		getFN
	} from "./service";

	import createForm from "./create"
	import editForm from "./edit"
	import detailForm from "./detail"
	import propForm from "./prop"

	export default {
		components: {
			createForm,
			editForm,
			detailForm,
			propForm
		},
		created() {
			this.init();
		},
		data() {
			return {
				treeData: false,
				table: {
					option: [{
						prop: "pdName",
						label: "产品名称"
					}, {
						prop: "code",
						label: "编码"
					}, {
						prop: "version",
						label: "版本"
					}, {
						prop: "status",
						label: "校验状态"
					}],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				fnList: [],
				cascaderData:[],
				mutiDeleteData: []
			};
		},
		methods: {
			init() {
				this.getProductLine()
				this.getTree()
				this.queryData()
				this.queryFN()
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
			},
			async queryFN() {
				let res = await getFN();
				if(res.status == "success") {
					this.fnList = res.content || []
				}
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
			edit_getPage(data) {
				this.$refs.edit_form.getPage(data)
			},
			detail_getPage(data) {
				this.$refs.detail_form.getPage(data)
			},
			prop_getPage(data) {
				this.$refs.prop_form.getPage(data)
			},
			delete_getPage(data) {
				this.$.delete('此操作将永久删除该BOM, 是否继续?', () => {
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
				this.$.delete('此操作将永久删除所选BOM, 是否继续?', () => {
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