<template>
  <el-dialog id="chip" title="产品标定配置" :visible.sync="show" size="full" :close-on-click-modal="false">
    <el-form :model="file" ref="form" :inline="true">
      <el-form-item>
        <el-input v-model="file.filenameCn" placeholder="产品标定配置" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload ref="upload" :action="upload" :data="file" class="mes-upload" :auto-upload="false"
                   :on-success="create_upload" :on-change="changeFile" :show-file-list="false">
          <el-button class="select-file" type="primary" @click="clear">选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="demarcateImport">导入
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="demarcateExport">导出
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
    demarcateUpload,
    demarcateDownload,
    demarcateByPage
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
              label: "sd_id",
              prop: "sdId"
            },
            {
              label: "sd_name",
              prop: "sdName"
            },
            {
              label: "sd_data",
              prop: "sdData"
            }],
          data: [],
          loading: false,
          pageSize: 10,
          pageNum: 1,
          height:this.$.clientHeight() * 0.7
        },
        upload: demarcateUpload
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
        let res = await demarcateByPage(data);
        if (res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.pageTotal = res.content.total;
        } else {
          this.table.data = [];
          this.table.pageTotal = 0;
        }
        this.table.loading = false;
      },
      demarcateImport() {
        this.$.delete('确认导入产品标定配置, 是否继续?', () => {
          this.$refs.upload.submit();
        })
      },
      demarcateExport() {
        let params = {
          produceProcessId:this.bringData.processId
        };
        let url = demarcateDownload + "?";
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
