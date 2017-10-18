<template>
  <el-dialog title="包装" :visible.sync="show" size="full" :close-on-click-modal="false" id="package">
    <el-form :inline="true" :model="form" ref="form">
      <el-row :gutter="40">
        <el-form-item label="包装箱码">
          <el-input v-model="form.boxKey" placeholder="包装箱码" @keyup.enter.native="submit1"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit1">确定
             </el-button>
           </el-form-item>
        <el-form-item label="额定数量">
            <el-input v-model="form.capacity" placeholder="额定数量" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.quantity" placeholder="数量" ></el-input>
        </el-form-item>
      </el-row>
    </el-form>
   <el-form :inline="true" :model="form" ref="form1">
      <el-row :gutter="40">
        <el-form-item label="产品条码">
          <el-input v-model="form.number" placeholder="产品条码" @keyup.enter.native="submit"></el-input>
        </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="submit">确定
          </el-button>
      </el-form-item>
      </el-row>
    </el-form>
    <el-form :inline="true" :model="form" ref="form1">
       <el-row :gutter="30">
         <el-form-item>
           <el-button type="primary" @click="submit2">强制装箱
             </el-button>
         </el-form-item>
       </el-row>
    </el-form>
    <div class="mes-table">
      <mes-table :max-height="table.height"
                 :table-data="table.data"
                 :table-option="table.option"
                 :table-loading="table.loading"
                 :total="table.pageTotal"
                 :pageSize="table.pageSize"
                 :pageChange="pageChange"
                 :sizeChange="sizeChange"
                 :pageNum="table.pageNum"
                 :showCheckBox="false"
                 @selectChange="selectChange">
        <el-table-column fixed="right" label="操作" width="100" v-if="table.data.length>0" slot="operationTool">
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
  queryByPdId,
  saveProductToBox,
  queryPage
  } from "./service";
  class Form {
    constructor(data = {}) {
    this.capacity="";
    this.pdId="";
    this.boxKey = "";
    this.number="";
    }
  }
  export default {
    components: {

    },
    data() {
      return {
        show: false,
        form: new Form(),
        table: {
          option: [
            {
              prop: "pdName",
              label: "产品名称"
            }, {
              prop: "hardVersion",
              label: "硬件信息"
            },
            {
              prop: "softVersion",
               label: "软件信息"
                  }, {
              prop: "workOrderBatchNum",
              label: "批次号"
            },{
              prop: "workOrderBatchNum",
              label: "包装箱号"
            }],
          data: [],
          loading: false,
          pageSize: 10,
          pageNum: 1,
          height: this.$.clientHeight() * 0.8 - 196,
        },
        sendData: {}
      }
    },

    methods: {
      getPage(data) {
        this.form = new Form(data);
        //this.queryByPdId();
        this.queryPage();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async queryPage() {
        this.table.loading = true;
        let data = {
          condition: {
          pdId:this.$parent.selectNode.id
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await queryPage(data);
        				if(res.status == "success") {
        					this.table.data = res.content.rows || [];
        					this.table.pageTotal = res.content.total;
        				} else {
        					this.table.data = [];
        					this.table.pageTotal = 0;
        				}
     this.table.loading = false;
      },
      async queryByPdId() {
      console.info({pdId:this.$parent.selectNode.id,boxKey:this.form.boxKey});
              let res = await queryByPdId({pdId:this.$parent.selectNode.id,boxKey:this.form.boxKey});

              console.info(res);
              if (res.status == "success") {
                //this.form.boxKey = res.content.boxKey;
                this.form.capacity = res.content.capacity;
                this.form.quantity = res.content.quantity;
              } else {
              this.form = new Form();
              }
            },
      pageChange(currentPage) {
        this.table.pageNum = currentPage
        this.queryPage();
      },
      sizeChange(size) {
        this.table.pageSize = size
        this.queryPage();
      },
      selectChange(data){
        this.mutiDeleteData = data
      },
      delete_getPage(data) {
        this.$.delete('此操作将永久删除该属性, 是否继续?', () => {
          deletProductInfo({
            ids: data.id
          }).then((res) => {
            this.queryPage();
          })
        })
      },
      submit() {
            saveProductToBox({number:this.form.number,boxKey:this.form.boxKey}).then((res) => {
              this.queryPage();
            });
      },
      submit1() {
         this.queryByPdId().then((res) => {

            });
       },
    submit2() {
      this.form = new Form();
          }
    }
  }
</script>

<style>
 #productPackage #package .mes-table {
    top: 250px;
  }

</style>
