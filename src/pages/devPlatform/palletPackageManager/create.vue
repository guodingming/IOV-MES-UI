<template>
  <!--新建栈板-->
  <el-dialog title="新建栈板" :visible.sync="show" size="small" id="createPallet" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="栈板名称" prop="name">
            <el-input v-model="form.name" placeholder="栈板名称"></el-input>
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
   // getParent,
    queryByCondition,
    create
  } from "./service";

  class Form {
    constructor() {
      this.name = "";
     // this.boxKey = "";
      this.barcodeTypeId = "";
      this.labelTypeId = "";
    //  this.parentId = "";
     // this.isForcedPack = "";
     // this.quantity = "";
      this.capacity = ""
      this.barcodeId = "";
      this.labelId = "";
      this.description = "";
      this.pdId = "";

    }
  }

  export default {
    created() {
    },
    computed: {},
    data() {
      const name = (rule, value, callback) => {
        if (value) {
        queryByCondition({
        						name: value
        					}).then((res) => {
        						if(res.content.length > 0) {
        							callback(new Error('该栈板名称已被使用'));
        						} else {
        							callback()
        						}
        					})

        } else {
          callback()
        }
      };
      return {
        show: false,
        form: new Form(),
        barCodeTypeList: [],
        lableTypeList: [],
        barCodeList: [],
        lableList: [],
      //  parentList: [],
        rules: {
          name:[{
            required: true,
            message: '请输入栈板名',
            trigger: 'change'
          },
          {
          	validator: _.debounce(name, 1000),
          	trigger: 'change'
          }
          ]
        }

      }
    },
    methods: {
      getPage() {
        this.form = new Form();
        this.getBarCodeType();
        this.getLableType();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
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
            this.form.pdId = this.$parent.selectNode.id
            create(this.form).then((res) => {
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

<style scoped>
  #palletManager #createPallet .el-textarea__inner{
  height:130px;
}
</style>
