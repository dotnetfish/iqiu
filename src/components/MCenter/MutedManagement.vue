<!--Created by fly on 2019/12/30-->
<template>
  <div>
    <el-form :inline="true" :model="formData">
      <el-form-item>
        <el-button class="addBtn" type="primary" size="small" @click="dialogVisible = true,getjurisdiction()" style="color: #ffffff;background-color: #F9772A;border: 0;">添加禁言</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="用户ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.ruid" placeholder="房管ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.type" placeholder="管控类型" clearable>
          <el-option
              v-for="item in jurisdictionlist"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="dataForm.Time"  type="date" value-format="timestamp" placeholder="封禁时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="Getuserlist()" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
        :data="tablelist"
        row-class-name="costCell"
        :header-cell-style="{'background-color': '#f0f0f0'}"

        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="uid"
          label="UID"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="operateUname"
          label="操作房管"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="jurisdictionName"
          label="管控类型"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="reason"
          label="违规原因"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="违规内容"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="禁言开始时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="forbidEndTime"
          label="禁言结束时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.forbidEndTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="有效时间"
          align="center"
          header-align="center"
          :formatter="formatter"
        >
        </el-table-column>
        <!--        <el-table-column-->
        <!--          prop=""-->
        <!--          label="操作人"-->
        <!--          align="center"-->
        <!--          header-align="center"-->
        <!--        >-->
        <!--        </el-table-column>-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              style="color: #ffffff;background-color: #F9772A;border: 0;"
              @click="del(scope.row)">解除禁言
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
      title="禁言用户"
      :visible.sync="dialogVisible"
      width="30%"
      center
      @closed="handleClose">
      <el-form label-width="80px" :model="dialogFormData">
        <el-form-item label="用户昵称">
          <el-input v-model="dialogFormData.beForbidUid" placeholder="请输入用户昵称或Uid"></el-input>
        </el-form-item>
        <el-form-item label="禁言类型">
          <el-checkbox-group v-model="dialogFormData.checkList" @change=change>
            <div style="display:flex;flex-wrap:wrap">
            <div v-for="(item,index) in jurisdictionlist" :key="index">
              <div style="width:110px">
                <el-checkbox :label=item.name></el-checkbox>
                </div>
              </div>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="禁言时长">
          <el-select v-model="dialogFormData.forbidType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round type="primary" @click="handleSet" style="color: #ffffff;background-color: #F9772A;border: 0;">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Table,
    TableColumn,
    Tag,
    Button,
    Message,
    Dialog,
    Pagination,
    MessageBox,
    Select,
    Option,
    FormItem, Form, Input
  } from 'element-ui';
  import { forbidList, forbidUser } from "@/api/mcenterapi";
  import setTime from "@/utils/setTime";
  import utils from "@/utils/index";
  import { forbidUsers, forbidName, jurisdiction, unForbidUser } from "@/api/api";

  export default {
    name: "MutedManagement",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Tag.name]: Tag,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [Pagination.name]: Pagination,
      [Select.name]: Select,
      [Option.name]: Option,
      [FormItem.name]: FormItem,
      [Form.name]: Form,
      [Input.name]: Input,
      [Message.name]: Message
    },
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        dataForm:{
          uid:'',
          ruid:'',
          type:'',
          Time:''
        },
        jurisdictionlist:'',
        tablelist:{},
        dialogFormData: {
          checkList:[],
          beForbidUid: "",
          forbidType: "",
          jurisdictionName:'',
          jurisdictionIds:'',
          channelId: this.$store.state.userStatus.userInfo.uid,
          forbidRoomType: 0,
        },
        options: [
          {
            key: 5,
            value: "10分钟"
          },
          {
            key: 6,
            value: "30分钟"
          },
          {
            key: 7,
            value: "1小时"
          },
          {
            key: 1,
            value: "24小时"
          },
          {
            key: 8,
            value: "3天"
          },
          {
            key: 2,
            value: "7天"
          },
          {
            key: 3,
            value: "30天"
          },
          {
            key: 9,
            value: "6个月"
          },
          {
            key: 4,
            value: "永久"
          }], // 禁言类型: 0 取消禁言; 5:10分钟, 6:30分钟, 7:1小时, 1:24小时, 8:3天, 2:7天, 3:30天, 9:6个月, 4:永久(20年)
        formatterMap: {},
        formData: {
          cid: this.$store.state.userStatus.userInfo.uid,
          p: 1,
          size: 20,
        },
        total:0,
        pageSize:10,
        pageIndex:1,
      }
    },
    filters: {
    formatDate: function (value) {
        let date = new Date(value);
        let yy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return yy + "年" + mm + "月" + dd + "日" + " " + h + ":" + m + ":" + s;
        },
  },
    computed: {
      userStatus() {
        console.log('检测到登录状态改变', this.$store.state.userStatus)
        return this.$store.state.userStatus
      }
    },
    methods: {
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getforbidName()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getforbidName()
      },
      //查询
      Getuserlist() {
      let data = {
        uid: this.dataForm.uid,
        jurisdictionName: this.dataForm.type,
        operateUid: this.dataForm.ruid,
        forbidEndTime: this.dataForm.Time,
        pageNum: 1,
        pageSize:10,
      };
      forbidName(data).then((res) => {
        this.tablelist = res.data
      });
    },
      formatter(row) {
        return this.formatterMap[row.forbidType]
      },
      setTime: setTime,
      // handleCancel(row) {
      //   MessageBox.confirm('此操作将解除禁言, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     console.log(row);
      //     // this.dialogFormData.beForbidUid = row.uid;
      //     // this.dialogFormData.forbidType = 0;
      //     this.$set(this.dialogFormData, "beForbidUid", row.uid)
      //     this.$set(this.dialogFormData, "forbidType", 0)
      //     this.forbidUser("解除禁言成功").then(() => {
      //       this.handleClose()
      //     })
      //   }).catch(() => {
      //     Message({
      //       type: 'info',
      //       message: '已取消删除'
      //     });
      //   });
      // },
      del(row){
        console.log("1111111=",row)
        let data = {
          forbidType: row.forbidType,
          jurisdictionId: row.jurisdictionId,
          uid: row.uid,
          cid: this.$store.state.userStatus.userInfo.uid,
        }
        unForbidUser(data).then((res) => {
          this.getforbidName()
            });

      },
      getForbidList() {
        forbidList(this.formData).then((response) => {
          if (response.code === 0) {
            if (response.data != null) {
              this.tableData = response.data.list;
              this.title = response.data.totalPage
            } else {
              this.tableData = [];
              this.title = 0
            }

          } else {
            console.error(response.error);
          }
        })
          .catch(function (error) {
            console.error(error);
          });
      },
      forbidUser(msg) {
        return forbidUser(this.dialogFormData).then((response) => {
          if (response.code === 0) {
            this.$set(this.dialogFormData, "beForbidUid", "")
            this.getForbidList();
            Message.success({
              message: msg,
            });
            this.dialogVisible = false
          } else {
            Message.error({
              message: response.msg || "请稍后再试",
            });
            console.error(response.error);
          }
        })
          .catch((error) => {
            Message.success({
              message: error.response.msg || "请稍后再试",
            });
            console.error(error.response);
          });
      },
      handleClose() {
        this.$set(this.dialogFormData, "beForbidUid", "")
        this.$set(this.dialogFormData, "forbidType", "")
      },
      handleSet() {
        if (!this.dialogFormData.beForbidUid) return this.Message.error("请输入用户昵称或Uid")
        if (!this.dialogFormData.forbidType) return this.Message.error("请选择禁言时间")
        let data = {
          jurisdictionName: this.dialogFormData.jurisdictionName,
          jurisdictionId: this.dialogFormData.jurisdictionIds,
          content:'666',
          reason:'太6了',
          cid: this.$store.state.userStatus.userInfo.uid,
          uid: this.dialogFormData.beForbidUid,
          forbidType: this.dialogFormData.forbidType
        }
        forbidUsers(data).then((res) => {
          if(res.code==0){
            Message.success({
              message: '封禁成功',
            });
            this.getforbidName()
          }
          this.dialogVisible = false
            });
        // this.forbidUser("禁言添加成功")
      },
      //禁言类型列表
      getjurisdiction(){
        jurisdiction().then((res) => {
          this.jurisdictionlist = res.data;
          console.log("55555555555==",this.jurisdictionlist)
            });
      },
            //权限类型
      change(){
        this.dialogFormData.jurisdictionName = ''
        this.dialogFormData.jurisdictionIds = ''
        for(let i=0;i<this.dialogFormData.checkList.length;i++){
          if(i==this.dialogFormData.checkList.length-1){
            this.dialogFormData.jurisdictionName = this.dialogFormData.jurisdictionName + this.dialogFormData.checkList[i]
            for(let j=0;j<this.jurisdictionlist.length;j++){
              if(this.dialogFormData.checkList[i] ==  this.jurisdictionlist[j].name){
                this.dialogFormData.jurisdictionIds = this.dialogFormData.jurisdictionIds + this.jurisdictionlist[j].id
              }
            }
          }else{
            this.dialogFormData.jurisdictionName = this.dialogFormData.checkList[i] + ',' + this.dialogFormData.jurisdictionName
            for(let j=0;j<this.jurisdictionlist.length;j++){
              if(this.dialogFormData.checkList[i] ==  this.jurisdictionlist[j].name){
                this.dialogFormData.jurisdictionIds = this.jurisdictionlist[j].id + ',' + this.dialogFormData.jurisdictionIds
              }
            }
          }
        }
      },
      //封禁名单
      getforbidName(){
        let data = {
          uid: this.dataForm.uid,
          jurisdictionName: this.dataForm.type,
          operateUid: this.dataForm.ruid,
          forbidEndTime: this.dataForm.Time,
          pageNum: this.pageIndex,
          pageSize:this.pageSize,
        }
        forbidName(data).then((res) => {
          this.tablelist = res.data
          this.total = res.total
            });
      }
    },
    mounted() {
      this.getforbidName();
      this.getjurisdiction()
    },
    created() {
      this.formatterMap = utils.options2formatter(this.options)
      this.getForbidList()
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .title {
    text-align: left;
    margin: 20px 20px 20px 10px;
  }

  .table {
    text-align: right;
    margin-top: 16px
  }

  .btn {
    font-size: 14px;
  }
  ::v-deep .el-input__inner:focus{
      border-color:  #F9772A !important;      
  } 
    ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#F9772A !important;
  border-color: #F9772A !important;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #F9772A !important;
}
::v-deep .el-checkbox.is-bordered.is-checked{
  border-color: #F9772A !important;
}
::v-deep .el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:  #F9772A !important;
}
</style>


