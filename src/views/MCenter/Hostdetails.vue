<template>
  <el-dialog
    width="80%"
    title='主播详情'
    :close-on-click-modal="false"
    :before-close="enter"
    :visible.sync="flag"
  >
    <div style="display:flex;margin-bottom:20px">
      <div><img :src=userinfo.avatarUrl style="width:120px;height:120px;margin-right:30px"></div>
      <div>
        <div style="font-weight: 500;color: #333333;font-size: 24px;">{{userinfo.uname}}</div>
        <div style="font-weight: 400;color: #666666;font-size: 16px;margin-top:38px">联系方式:{{userinfo.mobile}}</div>
        <div style="display:flex;margin-top:14px">
          <div style="font-weight: 400;color: #666666;font-size: 16px;margin-right:20px">签约日期:{{userinfo.createTime | formatDate1}}</div>
          <div style="font-weight: 400;color: #666666;font-size: 16px;">粉丝关注数:{{userinfo.followNum}}</div>
        </div>
      </div>
    </div>
    <el-table
        :data="detailslist"
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
          label="日期"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="duration"
          label="开播时长"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.duration | FormatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="followCountEnd,followCountStart"
          label="新增关注数"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.followCountEnd-scope.row.followCountStart}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="totalCredit"
          label="礼物收益"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="totalCoin"
          label="公会抽成收益"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="uv"
          label="违规次数"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="screenMode"
          label="分组"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="到期时间"
          align="center"
          header-align="center"
        >
        <div>{{time | formatDate}}</div>
        </el-table-column>
      </el-table>
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
      <el-button type="primary" @click="enter" style="color: #ffffff;background-color: #F9772A;border: 0;">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { unionLiveRecordInfo, unionLiveRecordFirstInfo } from "@/api/api";
export default{
  name: "Hostdetails",
  data() {
    return {
      index:0,
      pageSize:10,
      pageIndex:1,
      total:0,
      userinfo:'',
      detailslist:[],
    };
  },
  props: {
    flag:{
      type:Boolean
    },
    cid:{
      type:String
    },
    time:{
      type:Number 
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
    formatDate1: function (value) {
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
      return yy + "年" + mm + "月" + dd + "日";
    },
    FormatDate: function (value) {
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
      return h + "时" + m + "分";
    },
  },
  methods: {
    //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getmyGiftJoin()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getmyGiftJoin()
      },
    getdetails(){
      // console.log("545454==",this.time)
      let data = {
        cid: this.cid,
        startTime:'',
        endTime:'',
        pageNum:this.pageIndex,
        pageSize:this.pageSize,
      }
      unionLiveRecordInfo(data).then((res) => {
        this.total = res.total
        this.detailslist = res.data;
      });
    },
    //退出
    enter(){
      this.$emit('cancel')
    },
    //个人信息
    getinfo(){
      let data = {
        cid: this.cid,
      }
      unionLiveRecordFirstInfo(data).then((res) => {
        this.userinfo = res.data
      });
    }
  },
  mounted() {
    setTimeout(()=>{
      this.getdetails()
    },200)
    setTimeout(()=>{
      this.getinfo()
    },200)
  },
};
</script>

