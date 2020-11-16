<!--Created by fly on 2019/12/30-->
<template>
  <div>
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="用户ID"></el-input>
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
          prop="operateUname"
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
          prop="forbidEndTime"
          label="封禁时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleCancel(scope.row.uid)">解除
            </el-button>
          </template>
        </el-table-column> -->
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
      title="添加管理员"
      :visible.sync="dialogVisible"
      width="30%"
      center
      @closed="handleClose">
      <el-form label-width="80px" :model="dialogFormData">
        <el-form-item label="用户昵称">
          <el-input v-model="dialogFormData.uid" placeholder="请输入用户昵称或Uid"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round type="primary" @click="handleSet">确认</el-button>
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
    Input,
    DatePicker,
    Select,
    Option,
  } from 'element-ui';
  import { managerList, setManager,forbidRecord } from "@/api/mcenterapi";
  import { forbidRecords, jurisdiction  } from "@/api/api";
  import setTime from "@/utils/setTime";

  export default {
    name: "Operation",
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
      [DatePicker.name]: DatePicker,
      [Select.name]: Select,
      [Option.name]: Option,
    },
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        total:0,
        pageSize:10,
        pageIndex:1,
        tablelist:{},
        jurisdictionlist:[],
        dialogFormData: {
          uid: "",
          operator: 0,
        },
        dataForm:{
          uid:'',
          type:'',
          Time:''
        },
        formData: {
          p: 1,
          size: 20,
        },
        total: 0,
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
    methods: {
      setTime: setTime,
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getforbidRecord()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getforbidRecord()
      },
      handleCancel(uid) {
        MessageBox.confirm('此操作将解除管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data =
            {
              uid: uid
            }
          this.setManager(data, "管理员解除成功");
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消解除'
          });
        });
      },
      //禁言类型列表
      getjurisdiction(){
        jurisdiction().then((res) => {
          this.jurisdictionlist = res.data;
          console.log("55555555555==",this.jurisdictionlist)
            });
      },
      //获取操作列表
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
      //解除操作
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
      //查询
      Getuserlist() {
      let data = {
        uid: this.dataForm.uid,
        jurisdictionName: this.dataForm.type,
        forbidEndTime: this.dataForm.Time,
        pageNum: 1,
        pageSize:10,
      };
      forbidRecords(data).then((res) => {
        this.total = res.total
        this.tablelist = res.data;
      });
    },
    getforbidRecord() {
      let data = {
        uid: this.dataForm.uid,
        jurisdictionName: this.dataForm.type,
        forbidEndTime: this.dataForm.Time,
        pageNum: this.pageIndex,
        pageSize:this.pageSize,
      };
      forbidRecords(data).then((res) => {
        this.total = res.total
        this.tablelist = res.data;
      });
    },
      handleClose() {
        this.$set(this.dialogFormData, "uid", "")
      },
      handleSet() {
        if (!this.dialogFormData.uid) return this.Message.error("请输入用户昵称或Uid")
        this.setManager(this.dialogFormData, "管理员添加成功")
      }


    },
    mounted() {
      // this.getManagementList()
      this.getforbidRecord()
      this.getjurisdiction()
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
</style>


