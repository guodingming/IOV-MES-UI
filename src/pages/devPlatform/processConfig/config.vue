<template>
	<el-dialog id="config" title="配置" :visible.sync="show" size="full" :close-on-click-modal="false">
		<el-tabs v-model="activeName" @tab-click="changeTab" type="card">
			<el-tab-pane label="属性配置" name="config"></el-tab-pane>
			<el-tab-pane label="扩展属性" name="extend"></el-tab-pane>
		</el-tabs>
		<el-row v-if="activeName=='config'">
			<el-col :span="12">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>基础属性</span>
					</div>
					<el-form :model="baseForm" ref="baseForm" :rules="rules">
            <el-form-item label="操作方式" prop="isAuto">
              <el-select v-model="baseForm.isAuto" placeholder="填写方式" @change="changeMethod">
                <el-option label="自动" value="0"></el-option>
                <el-option label="人工" value="1"></el-option>
              </el-select>
            </el-form-item>
						<el-form-item label="表单类型" prop="formTypeId" v-if="hand">
							<el-select v-model="baseForm.formTypeId" placeholder="表单类型" @change="changeFormType">
								<el-option v-for="item in formTypeList" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="表单" prop="formId" v-if="hand">
							<el-select v-model="baseForm.formId" placeholder="表单">
								<el-option v-for="item in formList" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
			<el-col :span="12" v-if="extendData.length > 0">
				<el-card class="box-card" v-if="activeName=='config' && extendData.length > 0">
					<div slot="header" class="clearfix">
						<span>扩展属性</span>
					</div>
					<el-form :model="form" ref="form">
						<el-form-item v-for="item in extendData" :label="item.dictionaryCnName">
							<el-input v-if="item.type=='char'||item.type=='other'" v-model="item.value" :placeholder="item.dictionaryCnName">
							</el-input>

							<el-input v-if="item.type=='file'" v-model="item.fileName" :placeholder="item.dictionaryCnName" disabled>
							</el-input>
							<el-upload v-if="item.type=='file'" :ref="item.id" :action="upload" :data="file" class="mes-upload" :on-success="create_upload" :on-change="changeFile" :show-file-list="false">
								<el-button size="small" type="primary" @click="clear(item.id)">上传文件</el-button>
							</el-upload>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<span v-if="activeName=='config'" slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
		<el-form :model="form" ref="form" v-if="activeName=='extend'" :inline="true">
			<el-form-item label="数据字典">
				<el-select v-model="form.dictionaryTypeId" placeholder="请选择" @change="dictionaryChange">
					<el-option v-for="item in dictionaryTypes" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="属性名称">
				<el-select v-model="form.dictionaryId" placeholder="请选择">
					<el-option v-for="item in attrKeyList" :key="item.id" :label="item.cnName" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="数据类型">
				<el-select v-model="form.type" placeholder="请选择">
					<el-option value="file" label="文件">
					</el-option>
					<el-option value="char" label="字符">
					</el-option>
					<el-option value="other" label="其他">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitExtend" :disabled="(!form.type)||(!form.dictionaryTypeId)||(!form.dictionaryId)">添加
				</el-button>
			</el-form-item>
		</el-form>
		<div class="mes-table" v-if="activeName=='extend'">
			<mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="false" @selectChange="selectChange">
				<el-table-column fixed="right" label="操作" width="90" v-if="table.data.length>0" slot="operationTool">
					<template scope="scope">
						<el-button @click.native.prevent="delete_getPage(scope.row)" type="text" size="small">
							删除
						</el-button>
					</template>
				</el-table-column>
			</mes-table>
		</div>
	</el-dialog>
</template>

<script>
	import {
		queryBomProduce,
		queryFormType,
		queryForm,
		getDictionaryType,
		getExtendKey,
		createExtend,
		deleteExtend,
		getExtendAttr,
		getExtend,
		upload,
		create
	} from "./service";

	class Form {
		constructor(data = {}) {
			this.processId = data.id;
			this.type = "";
			this.dictionaryId = "";
			this.dictionaryTypeId = "";
		}
	}
	class BaseForm {
		constructor(data = {}) {
			this.processId = data.id;
      this.isAuto = "0";
			this.bomProduceId = "";
			this.formTypeId = "";
			this.formId = "";
			this.extendProperties = [];
		}
	}

	class File {
		constructor(data = {}) {
			this.processId = data.id;
			this.fileName = "";
			this.filenameCn = "";
		}
	}

	export default {
		data(data) {
			return {
				show: false,
				activeName: 'config',
        hand:false,
				form: new Form(data),
				baseForm: new BaseForm(data),
				file: new File(data),
				table: {
					option: [{
						prop: "dictionaryCnName",
						label: "属性名称"
					}, {
						prop: "type",
						label: "数据类型"
					}, {
						prop: "createDate",
						label: "创建时间"
					}],
					data: [],
					loading: false,
					pageSize: 5,
					pageNum: 1
				},
				dictionaryTypes: [],
				dictionaryType: "",
				attrKeyList: [],
				bomProduceList: [],
				formTypeList: [],
				extendDataFile: "",
				formList: [],
				extendData: [],
				upload: upload,
				rules: {
					bomProduceId: [{
						required: true,
						message: '请选择生产BOM',
						trigger: 'change'
					}],
          isAuto: [{
            required: true,
            message: '请选择填写类型',
            trigger: 'change'
          }],
					formTypeId: [{
						required: true,
						message: '请选择表单类型',
						trigger: 'change'
					}],
					formId: [{
						required: true,
						message: '请选择表单',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			getPage(data) {
				this.bringData = data;
				this.file = new File(data);
				this.changeTab();
				this.queryDictionaryType();
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
        if(this.$refs.baseForm) {
          this.$refs.baseForm.resetFields();
        }
				this.show = true
			},
			changeTab() {
				if(this.activeName == "config") {
					this.baseForm = new BaseForm(this.bringData);
					this.queryExtendAttr();
					this.getBomProduce();
					this.getFormType();
				}
				if(this.activeName == "extend") {
					this.form = new Form(this.bringData);
					this.queryExtend();
				}
			},
      changeMethod(){
        if(this.baseForm.isAuto=="1"){
          this.hand = true;
          this.baseForm.formTypeId = "";
          this.baseForm.formId = "";
        }else{
          this.hand = false;
        }
      },
			async queryExtendAttr() {
				let res = await getExtendAttr({
					processId: this.bringData.id
				});
				if(res.status == "success") {
					this.extendData = res.content || [];
					this.extendData = this.extendData.map((val) => {
						if(val.type == 'file') {
							val.fileName = ""
						}
						val.value = ""
						return val
					});
				}
			},
			create_upload(response, file, fileList) {
				if(response.status == "success") {
					this.extendData = this.extendData.map((val) => {
						if(val.id == this.extendDataFile) {
							val.value = response.content
						}
						return val
					});
				}
			},
			clear(data) {
				this.extendDataFile = data;
        if (this.$refs[data]) {
          this.$refs[data].clearFiles
        }
			},
			changeFile(file, fileList) {
				this.file.fileName = encodeURI(file.name)
				if(file) {
					this.extendData = this.extendData.map((val) => {
						if(val.id == this.extendDataFile) {
							val.fileName = file.name
						}
						return val
					});
				}
			},
			changeFormType() {
				this.baseForm.formId = ""
				this.getForm();
			},
			//得到生产BOM列表
			async getBomProduce() {
				queryBomProduce().then(result => {
					if(result.status == 'success' && result.content) {
						this.bomProduceList = result.content
					} else {
						this.bomProduceList = []
					}
				})
			},
			//得到表单类型
			async getFormType() {
				queryFormType().then(result => {
					if(result.status == 'success' && result.content) {
						this.formTypeList = result.content
					} else {
						this.formTypeList = []
					}
				})
			},
			//得到表单
			async getForm() {
				queryForm({
					formTypeId: this.baseForm.formTypeId
				}).then(result => {
					if(result.status == 'success' && result.content) {
						this.formList = result.content
					} else {
						this.formList = []
					}
				})
			},
			async queryExtend() {
				this.table.loading = true;
				let data = {
					condition: {
						processId: this.bringData.id
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let res = await getExtend(data);
				if(res.status == "success") {
					this.table.data = res.content.rows || [];
					this.table.pageTotal = res.content.total;
				} else {
					this.table.data = [];
					this.table.pageTotal = 0;
				}
				this.table.loading = false;
			},
			async queryDictionaryType() {
				let res = await getDictionaryType();
				if(res.status == "success") {
					this.dictionaryTypes = res.content || []
				}
			},
			dictionaryChange() {
				this.form.dictionaryId = "";
				this.form.type = "";
				this.queryExtendKey();
			},
			async queryExtendKey() {
				let res = await getExtendKey({
					mesDpDataDictionaryTypeId: this.form.dictionaryTypeId
				});
				if(res.status == "success") {
					this.attrKeyList = res.content || []
				}
			},
			pageChange(currentPage) {
				this.table.pageNum = currentPage
				this.queryExtend();
			},
			sizeChange(size) {
				this.table.pageSize = size
				this.queryExtend();
			},
			selectChange(data) {
				this.mutiDeleteData = data
			},
			delete_getPage(data) {
				this.$.delete('此操作将永久删除该属性, 是否继续?', () => {
					deleteExtend({
						ids: data.id
					}).then((res) => {
						this.queryExtend()
					})
				})
			},
			submit() {
				this.$refs['baseForm'].validate((valid) => {
					if(valid) {
            this.show = false;
						this.baseForm.extendProperties = this.extendData;
						console.info(this.baseForm)
						create(this.baseForm).then((res) => {});
					} else {
						return false;
					}
				});
			},
			async submitExtend() {
				createExtend(this.form).then((res) => {
					this.form.dictionaryId = "";
					this.form.type = "";
					this.queryExtend()
				});
			}
		}
	}
</script>

<style>
	#processConfig #config .el-dialog--full {
		overflow: hidden;
		top: 5%;
		bottom: 5%;
		left: 5%;
		right: 5%;
		width: auto;
		height: auto;
		transform: none;
	}

	#processConfig #config .el-tabs {
		padding-top: 20px;
		padding-left: 20px
	}

	#processConfig #config .el-dialog__body {
		height: calc(100% - 111px);
		padding: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}

	#processConfig #config .el-dialog__body .el-row {
		height: calc(100% - 77px);
	}

	#processConfig #config .el-dialog__body .el-row .el-col {
		height: 100%;
		padding: 20px
	}

	#processConfig #config .el-dialog__body .el-row .el-col .el-card {
		height: 100%;
	}

	#processConfig #config .el-dialog__body .el-row .el-col .el-card .el-card__body {
		height: calc(100% - 57px);
		overflow-y: auto;
	}

	#processConfig #config .el-form {
		padding: 20px
	}

	#processConfig #config .el-form .el-form-item {
		margin: 0 20px 0 0
	}

	#processConfig #config .el-form .el-form-item .el-form-item__label {
		padding-right: 10px
	}

	#processConfig #config .mes-table {
		top: 210px;
	}
</style>
