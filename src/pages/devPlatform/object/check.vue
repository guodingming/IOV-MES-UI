<template>
  <el-dialog title="查看字段" :visible.sync="show" size="full" :close-on-click-modal="false" id="check">
    <el-tabs v-model="activeName" type="card">
			<el-tab-pane label="主对象" name="main"></el-tab-pane>
			<el-tab-pane label="扩展对象" name="expand"></el-tab-pane>
		</el-tabs>
		<div class="mes-table" v-if="activeName=='main'">
			<mes-table :table-data="table.mainData" :table-option="table.option" :table-loading="table.loading" :showCheckBox="false" :maxHeight="table.height">
				<el-table-column slot="prop" label="允许NULL" align="center">
					<template scope="scope">
            	<el-checkbox :checked="scope.row.isNull == 'true'" disabled></el-checkbox>
					</template>
				</el-table-column>
				<el-table-column slot="prop" label="是否主键" align="center">
					<template scope="scope">
            	<span class="icon-key" v-if="scope.row.isPk == 'true'"></span>
					</template>
				</el-table-column>
			</mes-table>
		</div>
		<div class="mes-table" v-if="activeName=='expand'">
			<mes-table align="center" :table-data="table.expandData" :table-option="table.option" :table-loading="table.loading" :showCheckBox="false" :maxHeight="table.height">
				<el-table-column slot="prop" label="允许NULL" align="center">
					<template scope="scope">
            	<el-checkbox :checked="scope.row.isNull == 'true'" disabled></el-checkbox>
					</template>
				</el-table-column>
				<el-table-column slot="prop" label="是否主键" align="center">
					<template scope="scope">
            	<span class="icon-key" v-if="scope.row.isPk == 'true'"></span>
					</template>
				</el-table-column>
			</mes-table>
		</div>
  </el-dialog>
</template>

<script>
  import {
		getField
  } from "./service";
  export default {
    data() {
      return {
        show: false,
				activeName: 'main',
        table: {
					mainData:[],
					expandData:[],
					option: [{
						prop: "column",
						label: "英文名称"
					}, {
						prop: "name",
						label: "中文名称"
					}, {
						prop: "type",
						label: "类型"
					}, {
						prop: "length",
						label: "长度"
					},{
						prop: "defaultValue",
						label: "默认值"
					}],
					loading: true,
					height:this.$.clientHeight()*0.9 - 155
				}
      }
    },
    methods: {
      getPage(data) {
      	this.tableId = data.id
      	this.activeName = 'main'
      	this.table.mainData = []
      	this.table.expandData = []
        this.getField()
        this.show = true;
      },
      async getField() {
      	this.table.loading = true
				let main = await getField({tableId:this.tableId,isExpand:"0"});
				this.table.mainData = main.content||[];
				let expand = await getField({tableId:this.tableId,isExpand:"1"});
				this.table.expandData = expand.content||[];
      	this.table.loading = false
			}
    }
  }
</script>

<style>
	#object #check .el-dialog--full {
		overflow: hidden;
		top:5%;
		bottom:5%;
		left:5%;
		right:5%;
		width: auto;
		height: auto;
		transform: none;
	}
	#object #check .el-tabs {
		padding-top: 20px;
		padding-left: 20px
	}
	
	#object #check .el-dialog__body {
		height: calc(100% - 54px);
		padding: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}
	#object #check .el-dialog__body .mes-table{
		top:120px
	}
	#object #check .el-dialog__body .mes-table .icon-key{
		color:rgb(234,179,28);
		font-size: 18px;
	}
	
</style>
