<template>
	<el-dialog title="附件配置" :visible.sync="show" size="full" :close-on-click-modal="false" id="accessoryConfig">
		<mes-table-layout :hideCrumb="true" :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
      <template slot="tool">
        <el-button type="primary" icon="document" @click="treeEdit_getPage(bringData)"></el-button>
      </template>
			<div class="mes-content" slot="container">
        <el-tabs v-model="activeName" @tab-click="changeTab" type="card" >
          <el-tab-pane :key="item.id" v-for="item in labelData" :label="item.name" :name="item.id">
          </el-tab-pane>
        </el-tabs>
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
						<el-table-column fixed="right" label="操作" width="120" v-if="table.data.length>0" slot="operationTool">
							<template scope="scope">
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
    <treeEditForm ref="treeEdit_form"></treeEditForm>
	</el-dialog>
</template>

<script>
	import {
    getLabel,
    queryDeviceProcess,
		accessConfigQueryData,
    accessConfigDeleting
	} from "./service";

	import createForm from "./accessoryConfigCreate"
	import editForm from "./accessoryConfigEdit"
  import treeEditForm from "./accessoryConfigTreeEdit"

	export default {
		components: {
			createForm,
			editForm,
      treeEditForm
		},
		data() {
			return {
				show:false,
				treeData: false,
        labelData:[],
        activeName: "",
				table: {
					option: [
					//{
					//	prop: "name",
						//label: "名称"
					//},
					{
						prop: "name",
						label: "设备附件"
					},{
            prop: "createDate",
            label: "创建时间"
          }],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				mutiDeleteData:[],
        processList:[],
        annexList:[]
			};
		},
		methods: {
			getPage(data) {
				this.bringData = data
				this.queryData()
        this.getTree()
        this.getLabel()
        this.show = true
			},
      async getTree() {
        let res = await queryDeviceProcess({deviceId: this.bringData.id});
        if(res.status == "success") {
          this.treeData = this.$.transformTree(res.content, {
            pNode: '工序列表',
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
      async getLabel() {
        let res = await getLabel();
        this.labelData = res.content
        this.activeName = this.labelData[0].id
      },
			async queryData() {
				this.table.loading = true;
        this.mutiDeleteData = [];
				let data = {
					condition: {
						search:this.searchData,
            deviceProcessId:this.selectNode.id,
            deviceAnnexId:this.activeName
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let res = await accessConfigQueryData(data);
				if(res.status == "success") {
					this.table.data = res.content.rows || [];
					this.table.pageTotal = res.content.total;
				} else {
					this.table.data = [];
					this.table.pageTotal = 0;
				}
				this.table.loading = false;
			},

      changeTab: function() {
        this.queryData()
      },
      treeEdit_getPage(data) {
        this.$refs.treeEdit_form.getPage(data,this.getTree)
      },
			create_getPage() {
				this.$refs.create_form.getPage(this.bringData,this.queryData,this.activeName,this.selectNode)
			},
			delete_getPage(data) {
				this.$.delete('此操作将永久删除该附件配置, 是否继续?',() => {
          accessConfigDeleting({
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
				this.$.delete('此操作将永久删除所选附件配置, 是否继续?',() => {
          accessConfigDeleting({
						ids: this.mutiDeleteData
					}).then((res) => {
						this.queryData()
					})
				})
			}
		}
	};
</script>
<style>
  #accessoryConfig .mes-tree{
    top:-14px;
  }
  #accessoryConfig .mes-tool{
    top: 46px;
    padding: 17px 20px 0;
  }
  #accessoryConfig .mes-table {
    top: 102px;
    padding: 20px;
  }
</style>
