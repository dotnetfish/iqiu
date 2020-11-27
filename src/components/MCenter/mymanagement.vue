<template>
  <section class="apply me-wrap">
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
          prop="cid"
          label="主播ID"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="cname"
          label="主播昵称"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="jurisdictionName"
          label="我的权限"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="overTime"
          label="结束时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.overTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="outroom(scope.row.cid)"><span style="color:#F9772A">辞职</span></el-button>
          <el-button type="text" size="small" @click="list(scope.row.cid)"><span style="color:#F9772A">封禁名单</span></el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      title="封禁名单"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close=close
      center>
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
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
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
      <span slot="footer" class="dialog-footer">
        <el-button round type="primary" style="color: #ffffff;background-color: #F9772A;border: 0;margin-right:30px;width:100px" @click="dialogVisible = false,getmanagerRooms()">确定</el-button>
      </span>
    </el-dialog>
    <!-- <el-pagination
        hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
  </section>
</template>

<script>
import { managerRooms, delManagers, forbidName, unForbidUser } from "@/api/api";

export default {
  name: "mymanagement",
  components: {
  },
  data() {
    return {
        pageSize:10,
        pageIndex:1,
        total:0,
        // unionId:'',
        dialogVisible:false,
        tablelist:[],
    };
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
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getuniontransfer()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getuniontransfer()
      },
    //封禁名单
    list(cid){
      this.dialogVisible = true
      this.getforbidName(cid)
    },
      getforbidName(cid){
        let data = {
          uid: '',
          cid: cid,
          jurisdictionName: '',
          operateUid: '',
          forbidEndTime: '',
          pageNum: this.pageIndex,
          pageSize:this.pageSize,
        }
        forbidName(data).then((res) => {
          this.tablelist = res.data
          this.total = res.total
            });
      },

      //关闭回调
      close(){
        this.dialogVisible = false
        this.getmanagerRooms()
      },
    //解除禁言
    del(row){
        // console.log("1111111=",row)
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
    //辞职
    outroom(cid){
        let data = {
            cid: cid
          }
          delManagers(data).then((res) => {
          this.$message.success('辞职成功')
          this.getmanagerRooms()
      });
    },
      //获取我管理的列表
      getmanagerRooms(){
          let data = {
            // pageNum:this.pageIndex,
            // pageSize:this.pageSize,
          }
          managerRooms(data).then((res) => {
            // this.total = res.total
        this.tablelist = res.data;
      });
      },
  },
  mounted() {
      this.getmanagerRooms()
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_index.scss";
.apply {
  padding: 28px;
  line-height: 1;
  color: $color-title1;
  font-size: 14px;

  .apply-title {
    margin-bottom: 30px;
    font-size: 28px;
    text-align: center;
  }
}
::v-deep .el-input__inner:focus{
      border-color:  #F9772A !important;      
  }
</style>