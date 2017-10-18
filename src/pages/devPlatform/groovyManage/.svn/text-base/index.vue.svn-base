<template>
	<div id="groovyManage">
		<mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
			<template slot="tool">
				<el-button type="primary" icon="document" @click="treeCreate_getPage" :disabled="!selectNode"></el-button>
				<!--<el-button type="primary" icon="edit" @click="treeEdit_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)"></el-button>-->
				<!--<el-button type="primary" icon="delete" @click="treeDelete_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)"></el-button>-->
			</template>
			<div class="mes-content" slot="container">
				<div class="mes-tool">
					<el-button type="primary" @click="create_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)">新建<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i class="el-icon-delete el-icon--right"></i>
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
						<el-table-column fixed="right" label="操作" width="200" v-if="table.data.length>0" slot="operationTool">
							<template scope="scope">
								<el-button @click.native.prevent="edit_getPage(scope.row)" type="text" size="small">
									编辑
								</el-button>
                <el-button @click.native.prevent="check_getPage(scope.row)" type="text" size="small">
                  配置脚本
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
		<treeCreateForm ref="treeCreate_form"></treeCreateForm>
		<treeEditForm ref="treeEdit_form"></treeEditForm>
		<createForm ref="create_form"></createForm>
		<editForm ref="edit_form"></editForm>
    <checkForm ref="check_form"></checkForm>
	</div>
</template>

<script>
	import {
		getTree,
		queryData,
		treeDelete,
		deleting
	} from "./service";

	import treeCreateForm from "./treeCreate"
	import treeEditForm from "./treeEdit"
	import createForm from "./create"
	import editForm from "./edit"
  import checkForm from "./check"

	export default {
		components: {
			treeCreateForm,
			treeEditForm,
			createForm,
			editForm,
      checkForm
		},
		created() {
			this.init();
		},
		data() {
			return {
				type:"1",
				treeData: false,
				table: {
					option: [{
						prop: "name",
						label: "函数名"
					}, {
						prop: "description",
						label: "描述"
					}],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				mutiDeleteData:[]
			};
		},
		methods: {
			init() {
				this.getTree()
				this.queryData()
			},
			async getTree() {
				let res = await getTree({type:this.type});
				if(res.status == "success") {
					this.treeData = this.$.transformTree(res.content, {
						pNode: '函数分类'
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
						functionTypeId: this.selectNode ? this.selectNode.id : "",
						search:this.searchData,
            type:"1"
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
				this.$.delete('此操作将永久删除该函数分类, 是否继续?',() => {
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
      check_getPage(data) {
        this.$refs.check_form.getPage(data)
      },
			delete_getPage(data) {
				this.$.delete('此操作将永久删除该函数, 是否继续?',() => {
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
				this.$.delete('此操作将永久删除所选函数, 是否继续?',() => {
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
