<template>
  <form @submit="submit">
	<el-dialog title="添加扩展对象" :visible.sync="show" size="full" :close-on-click-modal="false" id="expand">
		<el-col class="tool">
			<el-button type="primary" icon="plus" @click="addField">添加字段</el-button>
		</el-col>
		<el-table :data="tableData" border style="width: 100%" :max-height="height" v-loading="tableLoading" >
			<el-table-column fixed type="index" label="序号" width="70"></el-table-column>
			<el-table-column label="中文名">
				<template scope="scope">
					<input class="mes-input" type="text" placeholder="请输入信息" v-model="scope.row.name" :disabled="!scope.row.isCreate"
						pattern="^[\u4E00-\u9FA5a-zA-Z0-9_]*$"></input>
				</template>
			</el-table-column>
			<el-table-column label="英文名">
      				<template scope="scope">
         					<input class="mes-input" type="text" placeholder="请输入信息" v-model="scope.row.column" :disabled="!scope.row.isCreate"
         						required pattern="^[a-zA-Z0-9_]*$"></input>
      				</template>
      			</el-table-column>
			<el-table-column label="类型">
				<template scope="scope">
					<el-select v-model="scope.row.type" placeholder="类型" filterable :disabled="!scope.row.isCreate">
					    <el-option v-for="item in typeList"
					      :value="item">
					    </el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="长度">
				<template scope="scope">
					<input class="mes-input" type="text" placeholder="请输入信息" v-model="scope.row.length" :disabled="!scope.row.isCreate"
						pattern="^[0-9,]*$"></input>
				</template>
			</el-table-column>
			<el-table-column label="默认值">
				<template scope="scope">
					<input class="mes-input" type="text" placeholder="请输入信息" v-model="scope.row.defaultValue" :disabled="!scope.row.isCreate"
						pattern="^[a-zA-Z0-9_]*$"></input>
				</template>
			</el-table-column>
			<el-table-column label="允许NULL">
				<template scope="scope">
					<el-switch v-model="scope.row.isNull" on-text="是" off-text="否" on-value="true" off-value="false" :disabled="!scope.row.isCreate"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="是否主键">
				<template scope="scope">
					<el-switch v-model="scope.row.isPk" on-text="是" off-text="否" on-value="true" off-value="false" :disabled="!scope.row.isCreate"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="删除" fixed="right" width="90">
				<template scope="scope">
					<el-button @click.native.prevent="deleteField(scope.$index)" type="text" size="small" :disabled="!scope.row.isCreate">
						<i class="el-icon-delete"></i>&nbsp;&nbsp;删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <button class="mes-submit-button" type="submit">确定</button>
		  </span>
	</el-dialog>
  </form>
</template>

<script>
	import {
		getField,
		saveExpandField
	} from "./service";
	class Field {
		constructor() {
			this.column = "";
			this.name = "";
			this.type = "INT";
			this.length = "";
			this.isPk = false;
			this.isNull = false;
			this.defaultValue = "";
			this.isExpand = "1";
			this.isCreate = true;
		}
	}
	export default {
		data() {
			return {
				show: false,
				height:this.$.clientHeight()-260,
				tableData: [],
				tableLoading:false,
				typeList:["VARCHAR","BIGINT","LONGTEXT","DATETIME","INT","TINYINT","DECIMAL","DOUBLE","DATE","SMALLINT","CHAR","MEDIUMINT","BIT","MEDIUMTEXT","TIMESTAMP","TEXT","FLOAT","BLOB","LONGBLOB","TIME","SET","ENUM","MEDIUMBLOB"]
			}
		},
		methods: {
			getPage(data) {
				this.tableId = data.id
				this.tableData = []
				this.getField()
				this.show = true;
			},
			async getField() {
      			this.tableLoading = true
				let res = await getField({tableId:this.tableId,isExpand:"1"});
				this.tableData = res.content||[];
      			this.tableLoading = false
			},
			addField(){
				if(!this.checkValid()){
					this.$message({
						type: 'info',
						message: '字段名必填'
					});
				}
				else if(!this.checkRepeat()){
					this.$message({
						type: 'info',
						message: '字段名不允许重复'
					});
				}
				else{
					this.tableData.push(new Field())
				}
			},
			deleteField(index){
				this.tableData.splice(index, 1)
			},
			checkRepeat(){
				return _.uniq(this.tableData.map((val) => {
					return val.column
				})).length == this.tableData.length
			},
			checkValid(){
				return this.tableData.every((val) => {
					return val.column&&val.column!=""
				})
			},
			submit() {
				if(!this.checkValid()){
					this.$message({
						type: 'info',
						message: '字段名必填'
					});
				}
				else if(!this.checkRepeat()){
					this.$message({
						type: 'info',
						message: '字段名不允许重复'
					});
				}
				else{
					this.show = false;
					saveExpandField({
						tableId: this.tableId,
						columnList:this.tableData.filter((val)=>{
							return val.isCreate
						})
					}).then((res) => {
						this.$parent.queryData();
					});
				}
			}
		}
	}
</script>

<style>
#object #expand .el-table--enable-row-transition .el-table__body td{
	padding:15px 0
}

#object #expand .tool{
	padding-bottom:25px
}
#object #expand .el-dialog__footer{
	padding-top:25px;
  padding-right:70px;
}
</style>
