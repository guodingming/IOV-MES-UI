<template>
	<div id="workOrderManage">
		<mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
			<template slot="extra">
				<el-form label-width="40px">
					<el-form-item label="产品">
            <el-select v-model="pd" placeholder="请选择产品" @change="changePd">
              <el-option-group
                v-for="group in pdList"
                :key="group.id"
                :label="group.name">
                <el-option
                  v-for="item in group.children"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-option-group>
            </el-select>
					</el-form-item>
				</el-form>
			</template>
			<div class="mes-content" slot="container">
				<div class="mes-tool">
					<el-button type="primary" @click="create_getPage":disabled="!selectNode||(selectNode&&selectNode.isRoot)||(!pd)">新建<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">删除<i class="el-icon-delete el-icon--right"></i>
					</el-button>
					<span class="split"></span>
					<el-button type="success" @click="start" :disabled="mutiDeleteData.length != 1">开始<i class="icon-play"></i>
					</el-button>
					<el-button type="warning" @click="stop" :disabled="mutiDeleteData.length != 1">停止<i class="icon-stop"></i>
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
								<el-button  @click.native.prevent="operation_getPage(scope.row)" type="text" size="small">
									投产
								</el-button>
                <el-button   type="text" size="small">
									上料
								</el-button>
                <el-button :disabled="!selectNode||(selectNode&&selectNode.isRoot)||(!pd)" @click.native.prevent="edit_getPage(scope.row)" type="text" size="small">
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
		<operationForm ref="operation_form"></operationForm>
		<createForm ref="create_form"></createForm>
		<editForm ref="edit_form"></editForm>
	</div>
</template>

<script>
	import {
    getRuleTypes,
		queryPd,
		getTree,
		queryData,
		deleting,
		start,
		stop
	} from "./service";

	import createForm from "./create"
	import editForm from "./edit"
	import operationForm from "./operation"

	export default {
		components: {
      operationForm,
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
						prop: "workOrderNum",
						label: "工单号"
					},{
						prop: "workOrderTotal",
						label: "工单数量"
					},{
						prop: "planStartTime",
						label: "计划开始时间"
					},{
						prop: "planEndTime",
						label: "计划结束时间"
					},{
						prop: "realStartTime",
						label: "实际开始时间"
					},{
						prop: "realEndTime",
						label: "实际结束时间"
					},{
						prop: "status",
						label: "状态"
					}],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				pd:'',
				pdList:[],
				mutiDeleteData:[],
        ruleTypeList:[]
			};
		},
		methods: {
			init() {
				this.getPd();
				this.getTree();
				this.queryData();
        this.queryRuleTypeList();
			},
			async getPd() {
				let res = await queryPd();
				if(res.status == "success") {
					this.pdList = res.content || [];
				} else {
					this.pdList = [];
				}
			},
			changePd(data){
				this.getTree()
			},
			async getTree() {
				let res = await getTree({
					pdId:this.pd
				});
				if(res.status == "success") {
					this.treeData = this.$.transformTree(res.content, {
						pNode: '订单列表',
						name:'name',
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
						orderId: this.selectNode ? this.selectNode.id : "",
            pdId: this.pd,
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
      operation_getPage(data) {
			    this.$refs.operation_form.getPage(data)
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
			},
			start() {
				this.$.delete('是否开始执行所选工单?',() => {
					start({
						ids: this.mutiDeleteData.join(",")
					}).then((res) => {
						this.queryData()
					})
				})
			},
			stop(data) {
				this.$.delete('是否停止执行所选工单?',() => {
					stop({
						ids: this.mutiDeleteData.join(",")
					}).then((res) => {
						this.queryData()
					})
				})
			},
      async queryRuleTypeList() {
			    let res = await getRuleTypes();
			    if (res.status == 'success') {
			        this.ruleTypeList = res.content||[];
          } else {
			        this.ruleTypeList = [];
          }
      }
		}
	};
</script>

<style scoped>

</style>
