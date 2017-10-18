<template>
  <el-dialog title="资源文件配置物料" :visible.sync="show" size="large" :close-on-click-modal="false" id="configBOM">
    <el-transfer v-model="form.materialIds"
                 :data="allMaterials"
                 :props="props"
                 filterable
                 :button-texts="['移除', '添加']"
                 :titles="['所有物料', '已关联物料']"
                 filter-placeholder="请输入物料名称搜索"
                 :filter-method="filterMethod">
    </el-transfer>
    <span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
  </el-dialog>
</template>

<script>
  import {
    queryResourceFileMaterials,
    configMaterial,
    queryMaterial
  } from "./service";

  class Form {
    constructor(data = {}) {
      this.materialIds = [];
      this.resourceFileId = data.id;
    }
  }
  export default {
    data() {
      return {
        show: false,
        form: new Form(),
        materials: [],
        allMaterials: [],
        props: {
          key: "id",
          label: "name"
        }
      }
    },
    methods: {
      getPage(data) {
        this.form = new Form(data);
        this.getData();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async getData() {
        let result = await queryResourceFileMaterials({resourceFileId: this.form.resourceFileId});
        if (result.status == "success") {
          this.form.materialIds = result.content;
        } else {
          this.form.materialIds = []
        }
        let res = await queryMaterial();
        if (res.status == "success") {
          this.allMaterials = res.content.map((val) => {
            return {id: val.id, name: val.name}
          });
        } else {
          this.allMaterials = []
        }
      },
      filterMethod(query, item) {
        return item.name.indexOf(query) > -1;
      },
      submit() {
        this.show = false;
        configMaterial(this.form).then((res) => {
        })
      }
    }
  }
</script>

<style>
  #resourceDocument #configBOM .el-dialog {
    top: 10%;
    bottom: 10%;
    width: 900px;
  }

  #resourceDocument #configBOM .el-dialog__body {
    height: calc(100% - 116px);
    padding: 30px 70px
  }

  #resourceDocument #configBOM .el-transfer {
    height: 100%
  }

  #resourceDocument #configBOM .el-transfer-panel {
    height: 100%;
    width: 300px;
  }

  #resourceDocument #configBOM .el-transfer-panel__body {
    height: calc(100% - 72px);
  }

  #resourceDocument #configBOM .el-transfer-panel__list.is-filterable {
    height: calc(100% - 22px);
  }

  #resourceDocument #configBOM .el-transfer__buttons {
    padding: 0 48px;
  }
</style>
