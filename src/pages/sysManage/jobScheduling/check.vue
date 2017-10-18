<template>
	<el-dialog title="查看" :visible.sync="show" size="full" :close-on-click-modal="false">
		<mes-table-layout :hideCrumb="true">
			<div class="mes-content" slot="container">
				<div class="mes-tool">
					<el-button type="primary" @click="create_getPage">添加<i class="el-icon-upload el-icon--right"></i>
				</el-button>
					<el-button type="danger" @click="multiDelete" :disabled="mutiDeleteData.length == 0">移除<i class="el-icon-delete el-icon--right"></i>
				</el-button>
					<el-input placeholder="请输入搜索信息" icon="search" v-model="searchData" :on-icon-click="search" @keyup.enter.native="search">
					</el-input>
				</div>
				<div class="mes-table" v-if="table.data">
					<mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="true" @selectChange="selectChange">
						<el-table-column fixed="right" label="操作" width="80" v-if="table.data.length>0" slot="operationTool">
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
		<createDeviceForm ref="createDevice_form"></createDeviceForm>
	</el-dialog>
</template>

<script>
	import {
		userQueryData,
		deviceQueryData,
		userDeleting,
		deviceDeleting
	} from "./service";

	import createForm from "./userCreate"
	import createDeviceForm from "./deviceCreate"

	export default {
		components: {
			createForm,
			createDeviceForm
		},
		data() {
			return {
				show: false,
				treeData: false,
				table: {
					option: [{
            prop: "workstationName",
            label: "工作站名称"
          }, {
            prop: "workCenterName",
            label: "工作中心名称"
          }, {
            prop: "productionLineName",
            label: "生产线名称"
          }, {
            prop: "areaName",
            label: "车间名称"
          }, {
            prop: "enterpriseName",
            label: "企业名称"
          }],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				mutiDeleteData: []
			};
		},
		methods: {
			getPage(data) {
				this.bringData = data
				this.queryData()
				this.show = true
			},
			// 查询设备信息
			async queryData() {
				this.table.loading = true;
				let data = {
					condition: {
						schedulingId: this.bringData.id,
						search: this.searchData
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let res;
        res = await deviceQueryData(data);
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
        this.$refs.createDevice_form.getPage(this.bringData,this.queryData)
			},
			delete_getPage(data) {
        this.$.delete('将该设备删除, 是否继续?',() => {
          deviceDeleting({
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
          deviceDeleting({
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
	.mes-table {
		top: 60px;
	}
</style>
