<template>
  <el-dialog id="chip" title="产品芯片配置" :visible.sync="show" size="full" :close-on-click-modal="false">
    <el-form :model="file" ref="form" :inline="true">
      <el-form-item>
        <el-input v-model="file.filenameCn" placeholder="导入产品芯片" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload ref="upload" :action="upload" :data="file" class="mes-upload" :auto-upload="false"
                   :on-success="create_upload" :on-change="changeFile" :show-file-list="false">
          <el-button class="select-file" type="primary" @click="clear">选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="chipImport">导入
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chipExport">导出
        </el-button>
      </el-form-item>
    </el-form>
    <div class="mes-table">
      <mes-table :max-height="table.height" :table-data="table.data" :table-option="table.option" :table-loading="table.loading"
                 :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange"
                 :pageNum="table.pageNum" :showCheckBox="false">
      </mes-table>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getExtend,
    chipUpload,
    chipDownload,
    chipByPage
  } from "./service";

  class File {
    constructor(data = {}) {
      this.fileName = "";
      this.filenameCn = "";
      this.produceProcessId = "";
    }
  }

  export default {
    data(data) {
      return {
        show: false,
        file: new File(data),
        table: {
          option: [
            {
              label: "工序",
              prop: "procedureName"
            },
            {
              label: "序号",
              prop: "serialId"
            },
            {
              label: "地址",
              prop: "addr"
            },
            {
              label: "字节数",
              prop: "byteNum"
            },
            {
              label: "数据源类型",
              prop: "sourceTypeName"
            },
            {
              label: "字节内容",
              prop: "content"
            },
            {
              label: "存储方式",
              prop: "storeTypeName"
            },
            {
              label: "操作码",
              prop: "operCodeName"
            },
            {
              label: "芯片序号",
              prop: "chipSequence"
            },
            {
              label: "编程器类型",
              prop: "programmerTypeName"
            },
            {
              label: "模式名称",
              prop: "modelName"
            },
            {
              label: "延时",
              prop: "delayTime"
            },
            {
              label: "说明",
              prop: "operDescribe"
            }],
          data: [],
          loading: false,
          pageSize: 10,
          pageNum: 1,
          height:this.$.clientHeight() * 0.7
        },
        upload: chipUpload
      }
    },
    methods: {
      getPage(data) {
        this.bringData = data;
        this.file = new File(data);
        this.file.produceProcessId = data.processId;
        this.queryChip();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      create_upload(response, file, fileList) {
        this.queryChip();
        console.info(response)
      },
      clear() {
        if (this.$refs.upload) {
          this.$refs.upload.clearFiles
        }
      },
      changeFile(file, fileList) {
        this.file.fileName = encodeURI(file.name);
        this.file.filenameCn = file.name;
      },
      async queryChip() {
        this.table.loading = true;
        let data = {
          condition: {
            produceProcessId: this.bringData.processId
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await chipByPage(data);
        if (res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.pageTotal = res.content.total;
        } else {
          this.table.data = [];
          this.table.pageTotal = 0;
        }
        this.table.loading = false;
      },
      chipImport() {
        this.$.delete('确认导入芯片列表, 是否继续?', () => {
          this.$refs.upload.submit();
        })
      },
      chipExport() {
        let params = {
          produceProcessId:this.bringData.processId
        };
        let url = chipDownload + "?";
        for (let item in params) {
          url = url + item + "=" + params[item] + "&";
        }
        url = url.substring(0, url.lastIndexOf("&"));
        window.location.href = url
      },
      pageChange(currentPage) {
        this.table.pageNum = currentPage
        this.queryChip();
      },
      sizeChange(size) {
        this.table.pageSize = size
        this.queryChip();
      }
    }
  }
</script>

<style>
  #procedureConfig .mes-upload {
    margin-top: 0;
  }

  #procedureConfig #chip .el-dialog--full {
    overflow: hidden;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    width: auto;
    height: auto;
    transform: none;
  }

  #procedureConfig #chip .el-tabs {
    padding-top: 20px;
    padding-left: 20px
  }

  #procedureConfig #chip .mes-table {
    top: 140px;
  }
</style>
