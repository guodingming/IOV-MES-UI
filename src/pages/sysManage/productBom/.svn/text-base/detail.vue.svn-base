<template>
	<el-dialog title="BOM详情" :visible.sync="show" size="full" id="detail" :close-on-click-modal="false">
		<div class="mes-tree" v-scroll>
			<mes-ztree :data="treeData" :option="options"></mes-ztree>
		</div>
		<div class="mes-table" v-if="table.data">
			<mes-table :table-data="table.data"
				:table-option="table.option"
				:table-loading="table.loading">
			</mes-table>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getMaterialTree,getMaterialAmount
	} from "./service";

	class Form {
		constructor(data={}) {
			this.id = data.id;
			this.pdName = data.pdName;
			this.code = data.code;
			this.version = data.version;
		}
	}

	export default {
		data() {
			return {
				show: false,
				treeData: false,
				table: {
					option: [{
						prop: "code",
						label: "编码"
					},{
						prop: "out_veaion",
						label: "版本"
					},{
						prop: "amount_num",
						label: "数量"
					},{
						prop: "status",
						label: "类型"
					},{
						prop: "attrition_rate",
						label: "损耗率"
					}],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				bringData:{},
				options: {
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						onClick: (event, treeId, treeNode) => {
              this.selectNode = treeNode
              this.queryData()
            }
					}
				}
			}
		},
		methods: {
			getPage(data) {
				this.bringData = data
				this.getTree()
				this.queryData()
				this.show = true
			},
			async getTree() {
				let res = await getMaterialTree({bomId:this.bringData.id});
				if(res.status == "success") {
					this.treeData = res.content
				} else {
					this.treeData = []
				}
				this.selectNode = null
			},
			async queryData() {
				this.table.loading = true;
				let data = {
					code: this.selectNode ? this.selectNode.id : "",
					bomId:this.bringData.id
				}
				let res = await getMaterialAmount(data);
				if(res.status == "success") {
					this.table.data = res.content || [];
				} else {
					this.table.data = [];
				}
				this.table.loading = false;
			}
		}
	}
</script>

<style>
#productBom #detail .el-date-editor.el-input,#productBom #detail .el-input-number{
	width:100%
}
#productBom #detail .el-dialog__body{
	position: absolute;
	top:54px;
	bottom:0;
	left:0;
	right:0;
}
#productBom #detail .mes-tree{
	position: absolute;
	top:0;
	left:0;
	width:400px;
	bottom:0;
}
#productBom #detail .mes-table{
	position: absolute;
	top:0;
	left:400px;
	right:0;
	bottom:0;
}
</style>
