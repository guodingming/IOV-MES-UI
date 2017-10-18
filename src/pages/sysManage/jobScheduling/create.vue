<template>
  <el-dialog title="新建作业排班" :visible.sync="show" size="tiny" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="班次" prop="schedulingTypeId">
        <el-select v-model="form.schedulingTypeId" placeholder="班次">
          <el-option v-for="item in schedulingTypeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作中心" prop="workCenterId">
        <el-cascader
          placeholder="请选择工作中心"
          filterable
          :show-all-levels="false"
          :options="cascader"
          @active-item-change="changeCascader"
          @change="change"
          :props="{value: 'id',label: 'name',children: 'children'}"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="工作站" prop="workstationIds">
        <el-select v-model="form.workstationIds" multiple placeholder="工作站">
          <el-option v-for="item in deviceList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="用户组" prop="userGroupId">-->
      <!--<el-select v-model="form.userGroupId" placeholder="请选择用户组" @change="changeUserGroup">-->
      <!--<el-option v-for="item in userGroupList" :key="item.id" :label="item.name" :value="item.id">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="人员" prop="userIds">-->
      <!--<el-select v-model="form.userIds" placeholder="请选择人员" multiple filterable>-->
      <!--<el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
  </el-dialog>

</template>

<script>
  import {
    create,
    getSchedulingType,
    queryEnterprise,
    queryArea,
    queryProductionLine,
    queryWorkCenter,
    getDevice,
    queryFty
  } from "./service";

  class Form {
    constructor() {
      this.schedulingTypeId = "";
      this.areaId = "";
      this.enterpriseId = "";
      this.productionLineId = "";
      this.workCenterId = "";
      this.workstationIds = [];
      this.isStart = "0";
    }
  }
  export default {
    created() {
      this.init()
    },
    data() {
      const workstationIds = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择工作站'))
        } else {
          callback()
        }
      };
      return {
        show: false,
        form: new Form(),
        schedulingTypeList: [],
        deviceList: [],
        enterpriseList: [],
        siteAreaOption: [],
        areaList: [],
        productionLineList: [],
        workCenterList: [],
        cascader: [],
        userInfo: [],
        rules: {
          schedulingTypeId: [{
            required: true,
            message: '请选择班次',
            trigger: 'change'
          }],
          enterpriseId: [{
            required: true,
            message: '请选择企业',
            trigger: 'change'
          }],
          areaId: [{
            required: true,
            message: '请选择工厂',
            trigger: 'change'
          }],
          productionLineId: [{
            required: true,
            message: '请选择生产线',
            trigger: 'change'
          }],
          workCenterId: [{
            required: true,
            message: '请选择工作中心',
            trigger: 'change'
          }],
          workstationIds: [{
            required: true,
            validator: workstationIds,
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      init() {
        this.getschedulingTypeData()
        this.getEnterprise()
      },
      getPage() {
        this.form = new Form();
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.show = true
      },
      async changeCascader(data){
        if (data.length == 1) {
          let id = data[0]
          let res = await queryFty({enterpriseId: id})
          this.$.getKey(this.cascader, "id", id).children = res.content.map((val) => {
            val.children = []
            return val
          })
        }
        else if (data.length == 2) {
          let id = data[1]
          let res = await queryArea({siteInfoId: id})
          this.$.getKey(this.$.getKey(this.cascader, "id", data[0]).children, "id", id).children = res.content.map((val) => {
            val.children = []
            return val
          })
        }
        else if (data.length == 3) {
          let id = data[2]
          let res = await queryProductionLine({areaId: id})
          this.$.getKey(this.$.getKey(this.$.getKey(this.cascader, "id", data[0]).children, "id", data[1]).children, "id", id).children = res.content.map((val) => {
            val.children = []
            return val
          })
        }
        else if (data.length == 4) {
          let id = data[3]
          let res = await queryWorkCenter({productionLineId: id})
          this.$.getKey(this.$.getKey(this.$.getKey(this.$.getKey(this.cascader, "id", data[0]).children, "id", data[1]).children, "id", data[2]).children, "id", id).children = res.content
        }
      },
      change(val) {
        this.form.enterpriseId = val[0];
        this.form.areaId = val[2];
        this.form.productionLineId = val[3];
        this.form.workCenterId = val[4];
        this.getDeviceData()
      },
      //得到班次列表
      async getschedulingTypeData() {
        getSchedulingType().then(result => {
          if (result.status == 'success' && result.content) {
            this.schedulingTypeList = result.content
          } else {
            this.schedulingTypeList = []
          }
        })
      },
      //得到企业列表
      async getEnterprise() {
        queryEnterprise().then(result => {
          if (result.status == 'success' && result.content) {
            this.cascader = result.content.map((val) => {
              val.name = val.company;
              val.children = []
              return val
            })
          }
        });
      },
      //得到设备列表
      async getDeviceData() {
        let res = await getDevice({workCenterId: this.form.workCenterId});
        if (res.status == "success") {
          this.deviceList = res.content
        } else {
          this.deviceList = []
        }
      },

      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.show = false;
            this.form.pdId = this.$parent.selectNode.id
            this.form.workstationIds = this.form.workstationIds.join(",")
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

</style>
