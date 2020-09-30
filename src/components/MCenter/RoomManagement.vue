<!--Created by fly on 2019/12/30-->
<template>
  <div>
    <el-form :inline="true" :model="formData">
      <el-form-item>
        <el-button class="addBtn" type="primary" size="small" @click="dialogVisible = true" style="color: #ffffff;background-color: #F9772A;border: 0;">添加管理员</el-button>
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
          prop="name"
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
        <el-table-column label="任命时间" align="center">
          <template slot-scope="scope">
            {{ setTime(scope.row.createTime).timeStr }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleCancel(scope.$index, scope.row)">解除管理员
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
    Input
  } from 'element-ui';
  import { managerList, setManager } from "@/api/mcenterapi";
  import setTime from "@/utils/setTime";

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
        dialogFormData: {
          uid: "",
          operator: 0,
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
        this.setManager(this.dialogFormData, "管理员添加成功")
      }


    },
    mounted() {
      this.getManagementList()
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
</style>


