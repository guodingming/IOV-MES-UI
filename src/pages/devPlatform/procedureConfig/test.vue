<template>
  <el-dialog id="test" title="测试标准配置" :visible.sync="show" size="full" :close-on-click-modal="false">
    <el-form :model="file" ref="file" :inline="true">
      <el-form-item>
        <el-input v-model="file.filenameCn" placeholder="导入测试标准" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload ref="upload" :action="upload" :data="file" class="mes-upload" :auto-upload="false"
                   :on-success="create_upload" :on-change="changeFile" :show-file-list="false">
          <el-button class="select-file" type="primary" @click="clear">选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="testImport">导入
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="testExport">导出
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
    testDownload,
    testUpload,
    testByPage
  } from "./service";

  class File {
    constructor(data = {}) {
      this.produceProcessId = data.processId;
      this.fileName = "";
      this.filenameCn = "";
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
              label: "属所生产工序ID",
              prop: "produceProcessId"
            },
            {
              label: "配置名称",
              prop: "tiName"
            },
            {
              label: "标准值",
              prop: "tiStandard"
            },
            {
              label: "上线值",
              prop: "tiUpper"
            },
            {
              label: "下限值",
              prop: "tiLower"
            }],
          data: [],
          loading: false,
          pageSize: 10,
          pageNum: 1,
          height:this.$.clientHeight() * 0.7
        },
        upload: testUpload
      }
    },
    methods: {
      getPage(data) {
        this.bringData = data;
        this.file = new File(data);
        this.queryTest();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      create_upload(response, file, fileList) {
        this.queryTest();
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
      async queryTest() {
        this.table.loading = true;
        let data = {
          condition: {
            produceProcessId: this.bringData.processId
          },
          pageSize: this.table.pageSize,
          pageNum: this.table.pageNum
        }
        let res = await testByPage(data);
        if (res.status == "success") {
          this.table.data = res.content.rows || [];
          this.table.pageTotal = res.content.total;
        } else {
          this.table.data = [];
          this.table.pageTotal = 0;
        }
        this.table.loading = false;
      },
      async testImport() {
        this.$.delete('确认导入测试标准, 是否继续?', () => {
          this.$refs.upload.submit();
        })
      },
      testExport() {
        let params = {
          produceProcessId:this.bringData.processId
        };
        let url = testDownload + "?";
        for (let item in params) {
          url = url + item + "=" + params[item] + "&";
        }
        url = url.substring(0, url.lastIndexOf("&"));
        window.location.href = url
      },
      pageChange(currentPage) {
        this.table.pageNum = currentPage
        this.queryTest();
      },
      sizeChange(size) {
        this.table.pageSize = size
        this.queryTest();
      }
    }
  }
</script>

<style>
  #procedureConfig .mes-upload {
    margin-top: 0;
  }

  #procedureConfig #test .el-dialog--full {
    overflow: hidden;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    width: auto;
    height: auto;
    transform: none;
  }

  #procedureConfig #test .el-tabs {
    padding-top: 20px;
    padding-left: 20px
  }

  #procedureConfig #test .mes-table {
    top: 140px;
  }
</style>
