<template>
	<div id="palletPackageManager">
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
				<!--	<el-button type="primary" @click="create_getPage":disabled="!selectNode||(selectNode&&selectNode.isRoot)">新建<i class="el-icon-upload el-icon--right"></i>
					</el-button>-->
					<el-button type="primary" @click="package_getPage" :disabled="!selectNode||(selectNode&&selectNode.isRoot)">包装<i class="el-icon-upload el-icon--right"></i>
          					</el-button>
				<!--	<el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i class="el-icon-upload el-icon--right"></i>
					</el-button>-->
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
						<el-table-column fixed="right" label="操作" width="180" v-if="table.data.length>0" slot="operationTool">
							<template scope="scope">
								<el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small" :disabled="!selectNode||(selectNode&&selectNode.isRoot)">
									删除
								</el-button>
								<el-button @click.native.prevent="edit_getPage(scope.row)" type="text" size="small">
                  编辑
                </el-button>

							</template>
						</el-table-column>
					</mes-table>
				</div>
			</div>
		</mes-table-layout>
		<createForm ref="create_form"></createForm>
		<editForm ref="edit_form"></editForm>
		<packageForm ref="package_form"></packageForm>
	</div>
</template>

<script>
	import {
	queryProductLine,
		queryProduct,
		queryData,
		deleting
	} from "./service";
	import createForm from "./create"
  import editForm from "./edit"
  import packageForm from "./package"
	export default {
		components: {
			createForm,
		  packageForm,
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
						label: "栈板名称"
					},{
						prop: "palletKey",
						label: "栈板编码"
					},{
						prop: "quantity",
						label: "数量"
					},
				{
          	prop: "capacity",
          	label: "额定数量"
         	},
         ],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				 cascaderData: [],
				searchData: '',
				mutiDeleteData:[]
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
              this.cascaderData = this.$.processArray(res.content, null, {
              })
            },
			async getTree(id,ids) {
				let res = await queryProduct({pdLineId:id});
				if(res.status == "success") {
					this.treeData = this.$.transformTree(res.content, {
						pNode: '产品列表',
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
						pdId: this.selectNode ? this.selectNode.id : "",
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
			edit_getPage(data) {
      				this.$refs.edit_form.getPage(data)
      			},
      package_getPage(data) {
         this.$refs.package_form.getPage(data)
          },
			delete_getPage(data) {
				this.$.delete('将该用户移除用户组, 是否继续?',() => {
					deleting({
						pdId: this.selectNode.id,
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
				this.$.delete('将所选用户移除用户组, 是否继续?',() => {
					deleting({
						pdId: this.selectNode.id,
						ids: this.mutiDeleteData
					}).then((res) => {
						this.queryData()
					})
				})
			}
		}
	};
</script>
#palletManager .el-form-item__label {
    padding: 11px 10px 11px 0;
  }

  #palletManager .el-tree-node__label {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

<style scoped>

</style>
