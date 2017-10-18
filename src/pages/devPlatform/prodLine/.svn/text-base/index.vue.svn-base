<template>
	<div id="prodLine">
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
					<el-button type="primary" @click="create_getPage" :disabled="!selectNode||!!(selectNode&&selectNode.isRoot)||!!(selectNode&&selectNode.children)">新建<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<span class="split"></span>
					<el-button type="success" @click="release" :disabled="mutiDeleteData.length == 0">发布<i class="icon-play"></i>
					</el-button>
					<el-button type="warning" @click="cancel" :disabled="mutiDeleteData.length == 0">取消发布<i class="icon-stop"></i>
					</el-button>
					<el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search" @keyup.enter.native="search">
					</el-input>
				</div>
				<div class="mes-table" v-if="table.data">
					<mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="true" @selectChange="selectChange">
						<el-table-column fixed="right" label="操作" width="200" v-if="table.data.length>0" slot="operationTool">
							<template scope="scope">
								<el-button :disabled="scope.row.isConfigProcess =='0'" @click.native.prevent="design_getPage(scope.row)" type="text" size="small">
									工艺路径设计
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
		<createForm ref="create_form"></createForm>
		<editForm ref="edit_form"></editForm>
		<designForm ref="design_form"></designForm>
	</div>
</template>

<script>
	import {
		queryProductLine,
		queryProduct,
		updateRelease,
		queryData,
		deleting,
		edit
	} from "./service";

	import createForm from "./create"
	import editForm from "./edit"
	import designForm from "./design"

	export default {
		components: {
			createForm,
			editForm,
			designForm
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
						prop: "releaseTime",
						label: "发布时间"
					}, {
						prop: "isReleaseTB",
						label: "发布状态"
					}],
					data: false,
					loading: true,
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
				this.queryData()
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
			create_getPage() {
				this.$refs.create_form.getPage()
			},
			edit_getPage(data) {
				this.$refs.edit_form.getPage(data)
			},
			design_getPage(data) {
				this.$refs.design_form.getPage(data)
			},
			delete_getPage(data) {
				this.$.delete('将该产品产线删除, 是否继续?', () => {
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
				this.$.delete('将所选产品产线删除, 是否继续?', () => {
					deleting({
						ids: this.mutiDeleteData
					}).then((res) => {
						this.queryData()
					})
				})
			},
			release() {
				this.$.delete('是否发布所选工程?', () => {
					updateRelease({
						ids: this.mutiDeleteData.join(","),
						release: "1"
					}).then((res) => {
						this.queryData()
					})
				})
			},
			cancel(data) {
				this.$.delete('是否取消发布所选工程?', () => {
					updateRelease({
						ids: this.mutiDeleteData.join(","),
						release: "0"
					}).then((res) => {
						this.queryData()
					})
				})
			}
		}
	};
</script>

<style>
	#prodLine .el-loading-mask {
		z-index: 998;
	}
</style>