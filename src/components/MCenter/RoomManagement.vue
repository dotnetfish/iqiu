<!--Created by fly on 2019/12/30-->
<template>
  <div>
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="用户ID"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-input v-model="dataForm.roomname" placeholder="房间昵称"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="Getuserlist()" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="formData">
      <el-form-item>
        <el-button class="addBtn" type="primary" size="small" @click="dialogVisible = true,getjurisdiction()" style="color: #ffffff;background-color: #F9772A;border: 0;">添加房管</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
        :data="tableData"
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
          prop="uname"
          label="昵称"
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
        <!-- feng -->
        <el-table-column
          prop="forbidNum"
          label="封禁数量"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column label="加入时间" align="center">
          <template slot-scope="scope">
            {{ setTime(scope.row.createTime).timeStr }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="离任时间" align="center">
          <template slot-scope="scope">
            {{ setTime(scope.row.createTime).timeStr }}
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              style="color: #ffffff;background-color: #F9772A;border: 0;"
              @click="handleCancel(scope.$index, scope.row)">解除房管
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--    <el-pagination-->
    <!--      :hide-on-single-page="true"-->
    <!--      :total="total"-->
    <!--      :page-size="20"-->
    <!--      :page-sizes="[10, 20, 30, 40, 50, 100]"-->
    <!--      background-->
    <!--      layout="sizes, prev, pager, next, total"-->
    <!--      @size-change="handleSizeChange"-->
    <!--      @current-change="handleCurrentChange"-->
    <!--    />-->
    <el-dialog
      title="添加房管"
      :visible.sync="dialogVisible"
      width="30%"
      center
      @closed="handleClose">
      <el-form label-width="80px" :model="dialogFormData">
        <el-form-item label="用户id">
          <el-input v-model="dialogFormData.uid" placeholder="请输入用户Uid"></el-input>
        </el-form-item>
        <el-form-item label="配置权限">
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
        <el-form-item label="房管任期">
          <el-radio v-model="value" :label=0>永久</el-radio>
          <el-radio v-model="value" :label=1>其他时长<el-input v-model="day" style="width:50px" v-if="value==1"></el-input>天</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round type="primary" @click="handleSet" style="color: #ffffff;background-color: #F9772A;border: 0;">确认</el-button>
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
    Avatar,
    Tag,
    Button,
    Message,
    MessageBox,
    FormItem,
    Form,
    Dialog,
    Input
  } from 'element-ui';
  import { managerList, setManager } from "@/api/mcenterapi";
  import setTime from "@/utils/setTime";
  import { addManagers, jurisdiction, myManagers } from "@/api/api";

  export default {
    name: "RoomManagement",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Avatar.name]: Avatar,
      [Input.name]: Input,
      [Tag.name]: Tag,
      [Button.name]: Button,
      [Message.name]: Message,
      [FormItem.name]: FormItem,
      [Form.name]: Form,
      [MessageBox.name]: MessageBox,
      [Dialog.name]: Dialog,
    },
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        day:0,
        value: 0,
        jurisdictionlist:'',
        dataForm:{
          uid:'',
          roomname:''
        },
        dialogFormData: {
          uid: "",
          operator: 0,
          jurisdictionName:'',
          jurisdictionIds:'',
          checkList:[],
          daynum:0,
        },
        formData: {
          p: 1,
          size: 20,
        },
        total: 0,
      }
    },
    methods: {
      setTime: setTime,
      handleSizeChange(val) {
        this.formData.size = val;
        this.formData.p = 1
        this.getManagementList()
      },
      handleCurrentChange(val) {
        this.formData.p = val
        this.getManagementList()
      },
      handleCancel(index, row) {
        MessageBox.confirm('此操作将解除管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data =
            {
              operator: 1,
              uid: row.uid
            }
          this.setManager(data, "管理员解除成功");
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      Getuserlist() {
        let data = {
          uid: this.dataForm.uid,
          uidName: this.dataForm.roomname,
        }
        myManagers(data).then((res) => {
          this.tableData = res.data
        })
      },
      getManagementList() {
        managerList(this.formData).then((response) => {
          if (response.code === 0) {
            if (response.data != null) {
              this.tableData = response.data
            } else {
              this.tableData = [];
            }

          } else {
            console.error(response.error);
          }
        })
          .catch(function (error) {
            console.error(error);
          });

      },
      setManager(data, msg) {
        setManager(data).then((response) => {
          if (response.code === 0) {
            this.getManagementList();
            Message.success({
              message: msg,
            });
            this.dialogVisible = false
          } else {
            Message.error({
              message: response.msg,
            });
          }
        })
      },
      handleClose() {
        this.$set(this.dialogFormData, "uid", "")
      },
      handleSet() {
        if (!this.dialogFormData.uid) return this.Message.error("请输入用户昵称或Uid")
        if(this.value!=0){
          this.daynum = this.day
        }else{
          this.daynum = 0
        }
        let data = {
          jurisdictionName: this.dialogFormData.jurisdictionName,
          jurisdictionIds: this.dialogFormData.jurisdictionIds,
          uids: this.dialogFormData.uid,
          overTime:this.daynum,
        }
        addManagers(data).then((res) => {
          if(res.code==0){
            Message.success({
              message: '添加成功',
            });
          }
          this.dialogVisible = false
          this.getmyManagers()
            });
        // this.setManager(this.dialogFormData, "管理员添加成功")
      },
      //房管权限列表
      getjurisdiction(){
        jurisdiction().then((res) => {
          this.jurisdictionlist = res.data;
          // console.log('5555555555555555555555=',this.jurisdictionlist)
            });
      },
      //权限类型
      change(){
        this.dialogFormData.jurisdictionName = ''
        this.dialogFormData.jurisdictionIds = ''
        // console.log("5555555555555555555555=",this.dialogFormData.checkList)
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
      //我的房管
      getmyManagers(){
        let data = {
          uid: '',
          uidName: ''
        }
        myManagers(data).then((res) => {
              this.tableData = res.data
          })
      }
    },
    mounted() {
      // this.getManagementList()
      this.getmyManagers()
      // this.getjurisdiction()
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
  ::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #F9772A !important;
}
  ::v-deep .el-radio__input.is-checked .el-radio__inner {
    background: #F9772A !important;
    border-color: #F9772A !important;
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
::v-deep .el-input__inner:focus{
      border-color:  #F9772A !important;      
  }
</style>


