<template>
  <!--编辑包装箱-->
  <el-dialog title="编辑包装箱" :visible.sync="show" size="small" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="包装箱名称" prop="name">
            <el-input v-model="form.name" placeholder="包装箱名称"></el-input>
          </el-form-item>
          <el-form-item label="额定数量" prop="capacity">
            <el-input v-model="form.capacity" placeholder="额定数量"></el-input>
          </el-form-item>
          <el-form-item label="条码分类" prop="barcodeTypeId">
            <el-select v-model="form.barcodeTypeId" placeholder="条码分类" @change="getBarCode">
              <el-option v-for="item in barCodeTypeList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="条码" prop="barcodeId">
            <el-select v-model="form.barcodeId" placeholder="条码">
              <el-option v-for="item in barCodeList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签分类" prop="labelTypeId">
            <el-select v-model="form.labelTypeId" placeholder="标签分类" @change="getLable">
              <el-option v-for="item in lableTypeList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标签" prop="labelId">
            <el-select v-model="form.labelId" placeholder="标签">
              <el-option v-for="item in lableList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description" placeholder="描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
  </el-dialog>
</template>

<script>
  import {
    getBarCodeType,
    getBarCode,
    getLableType,
    getLable,
    queryByCondition,
  //  getParent,
    edit
  } from "./service";

  class Form {
    constructor(data = {}) {
      this.id = data.id;
      this.name = data.name;
    //  this.boxKey = data.boxKey;
      this.barcodeTypeId = data.barcodeTypeId;
      this.labelTypeId = data.labelTypeId;
     // this.parentId = data.parentId;
     // this.isForcedPack = data.isForcedPack;
    //  this.quantity = data.quantity;
      this.capacity = data.capacity;
      this.barcodeId = data.barcodeId;
      this.labelId = data.labelId;
      this.description = data.description;
      this.pdId = data.pdId;
    }
  }
  export default {

    data() {
      return {
        show: false,
        form: {},
        rules: {},
        barCodeTypeList: [],
        lableTypeList: [],
        barCodeList: [],
        lableList: [],
      //  parentList: [],
      }
    },
    methods: {
      getPage(data) {
        this.form = new Form(data);
        this.getBarCodeType();
        this.getBarCode();
        this.getLableType();
        this.getLable();
        this.rules= {
            name:[{
              required: true,
              message: '请输入包装箱名',
              trigger: 'change'
            },{
              pattern: this.$.regular.common.commonCn.pattern,
              message: this.$.regular.common.commonCn.message,
              trigger: 'change'
            },{
              validator: this.$.checkRepeat(queryByCondition,this.form.id),
              trigger: 'change'
            }
            ],
            capacity:[{
              validator: this.$.validateRequire('请填写额定数量'),
              trigger: 'change'
            },{
              pattern: this.$.regular.common.number.pattern,
              message: this.$.regular.common.number.message,
              trigger: 'change'
            }
            ],
            barcodeTypeId:[{
              required: true,
              message: '请选择条码分类',
              trigger: 'change'
            }
            ],
            barcodeId:[{
              required: true,
              message: '请选择条码',
              trigger: 'change'
            }
            ],
            labelTypeId:[{
              required: true,
              message: '请选择标签分类',
              trigger: 'change'
            }
            ],
            labelId:[{
              required: true,
              message: '请选择标签',
              trigger: 'change'
            }
            ],
          }
        this.show = true;
      },
      async getBarCodeType() {
        let res = await getBarCodeType();
        if (res.status == "success") {
          this.barCodeTypeList = res.content || []
        } else {
          this.barCodeTypeList = []
        }
      },
      async getBarCode() {
        let res = await getBarCode({typeId: this.form.barcodeTypeId});
        if (res.status == "success") {
          this.barCodeList = res.content || []
        } else {
          this.barCodeList = []
        }
      },
      async getLableType() {
        let res = await getLableType();
        if (res.status == "success") {
          this.lableTypeList = res.content || []
        } else {
          this.lableTypeList = []
        }
      },
      async getLable() {
        let res = await getLable({typeId: this.form.labelTypeId});
        if (res.status == "success") {
          this.lableList = res.content || []
        } else {
          this.lableList = []
        }
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.show = false;
            this.form.serviceTypeId = this.$parent.selectNode.id
            edit(this.form).then((res) => {
              this.$parent.queryData();
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  #editService .el-textarea__inner {
    height: 130px;
  }
</style>
