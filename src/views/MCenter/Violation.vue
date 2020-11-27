<template>
  <section class="apply me-wrap">
      <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-date-picker v-model="dataForm.startTime"  type="date" value-format="timestamp" placeholder="开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="dataForm.endTime"  type="date" value-format="timestamp" placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="Getsearch()" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
      </el-form-item>
    </el-form>
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
          prop="createTime"
          label="举报时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            {{scope.row.createTime | formatDate}}
        </template>
        </el-table-column>
        <el-table-column
          prop="cid"
          label="主播ID"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="主播昵称"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="举报类型"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="举报内容"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div v-if="scope.row.status==0" style="color:red">未处理</div>
            <div v-if="scope.row.status==1" style="color:#159A26">已处理</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="img"
          label="举报图片"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <el-button type="text" size="small" @click="editHandle(scope.row.img)" style="color:#F9772A">查看图片</el-button>
        </template>
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="look(scope.row.cid,scope.row.uname)" style="color:#F9772A">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
      title="图片"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <div style="display:flex">
          <div v-for="(item,index) in img" :key="index" style="display:flex;flex-wrap:wrap;">
              <div style="margin-right:20px"><img :src='item' style="width:100px;height:100px" ></div>
          </div>
      </div>
    </el-dialog>
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
    <Violationdetails v-if="flag" :cid='cid' :flag='flag' :uname='uname' ref="editor" @cancel='cancel()' @refreshDataList="refreshData()"></Violationdetails>
  </section>
</template>

<script>
import { unionRole, unionaccusationList } from "@/api/api";
import Violationdetails from './Violationdetails'

export default {
  name: "Violation",
  components: {
      Violationdetails
  },
  data() {
    return {
        unionId:'',
        tablelist:[],
        dataForm:{
          startTime:'',
          endTime:'',
        },
        flag:false,
        cid:'',
        uname:'',
        pageSize:10,
        pageIndex:1,
        total:0,
        img:'',
        dialogVisible:false,
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
    FormatDate: function (value) {
      let date = new Date(value);
      let yy = date.getFullYear();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return h + "时";
    },
  },
  methods: {
      look(id,uname){
        this.cid = id
        this.uname = uname
        this.flag = true
      },
      //查看图片弹窗
      editHandle(img){
        if(!img){this.$message.error('该用户没有上传图片');}
        this.img = img.split(",")
        // console.log("5555555555555=",this.img)
        this.dialogVisible=true;
      },
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getunionaccusationList()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getunionaccusationList()
      },
      //查询
      Getsearch(){
          let data = {
              unionId:this.unionId,
              startTime:this.dataForm.startTime,
              endTime:this.dataForm.endTime,
              pageNum: 1,
              pageSize:10,
          }
          unionaccusationList(data).then((res) => {
              this.tablelist = res.data;
          })
      },
      //举报列表
      getunionaccusationList(){
          let data = {
              unionId:this.unionId,
              startTime:this.dataForm.startTime,
              endTime:this.dataForm.endTime,
              pageNum: this.pageIndex,
              pageSize:this.pageSize,
          }
          unionaccusationList(data).then((res) => {
              this.tablelist = res.data;
          })
      },
      //公会id
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getunionaccusationList();
          })
      },
      cancel(){
        this.flag = false
      }
  },
  mounted() {
    this.getunionRole()
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