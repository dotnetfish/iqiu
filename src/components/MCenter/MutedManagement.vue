<!--Created by fly on 2019/12/30-->
<template>
  <div>
    <el-form :inline="true" :model="formData">
      <el-form-item>
        <el-button class="addBtn" type="primary" size="small" @click="dialogVisible = true">添加禁言</el-button>
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
          prop="uid"
          label="UID"
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
        <el-table-column label="禁言时间" align="center">
          <template slot-scope="scope">
            {{ setTime(scope.row.forbidEndTime).timeStr }}
          </template>
        </el-table-column>

        <el-table-column
          prop=""
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
              @click="handleCancel(scope.row)">解除禁言
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination
      :hide-on-single-page="true"
      :total="total"
      :page-size="20"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      background
      layout="sizes, prev, pager, next, total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
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
        <el-button round type="primary" @click="handleSet">添加</el-button>
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
        dialogFormData: {
          beForbidUid: "",
          forbidType: "",
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
        total: 0,
      }
    },
    computed: {
      userStatus() {
        console.log('检测到登录状态改变', this.$store.state.userStatus)
        return this.$store.state.userStatus
      }
    },
    methods: {
      formatter(row) {
        return this.formatterMap[row.forbidType]
      },
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
      handleCancel(row) {
        MessageBox.confirm('此操作将解除禁言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row);
          // this.dialogFormData.beForbidUid = row.uid;
          // this.dialogFormData.forbidType = 0;
          this.$set(this.dialogFormData, "beForbidUid", row.uid)
          this.$set(this.dialogFormData, "forbidType", 0)
          this.forbidUser("解除禁言成功").then(() => {
            this.handleClose()
          })
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });
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
        this.forbidUser("禁言添加成功")
      }
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
</style>


