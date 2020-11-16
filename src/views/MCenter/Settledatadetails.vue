<template>
  <el-dialog
    width="80%"
    title='主播结算数据详情'
    :close-on-click-modal="false"
    :before-close="enter"
    :visible.sync="flag"
  >
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
          prop="cid"
          label="主播id"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="cName"
          label="主播昵称"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="totalCoinSum"
          label="主播礼物收益"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="unionTotalCoin"
          label="公会抽成收益"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="scale"
          label="抽成比例(%)"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="resultTotalCoin"
          label="结算收益"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="group"
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
        <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
                <div v-if="scope.row.type==1">新签</div>
                <div v-if="scope.row.type==2">续约</div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="开始时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="overTime"
          label="签约到期时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.overTime | formatDate}}</div>
        </template>
        </el-table-column>
      </el-table>
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
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="enter" style="color: #ffffff;background-color: #F9772A;border: 0;">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { channelSalaryInfo } from "@/api/api";
export default{
  name: "Settledatadetails",
  data() {
    return {
      index:0,
    //   pageSize:10,
    //   pageIndex:1,
    //   total:0,
      userinfo:'',
      dataForm:{
          startTime:'',
          endTime:'',
        },
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
    uname:{
      type:String
    },
    unionId:{
      type:String
    },
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
    //   handleSizeChange(val){
    //     this.pageSize = val
    //     this.pageIndex = 1
    //     this.getdetails()
    //   },
    //   handleCurrentChange(val) {
    //     this.pageIndex = val
    //     this.getdetails()
    //   },
    getdetails(){
      // console.log("545454==",this.time)
      let data = {
        unionId:this.unionId,
        cid: this.cid,
        startTime:this.dataForm.startTime,
        endTime:this.dataForm.endTime,
        // pageNum:this.pageIndex,
        // pageSize:this.pageSize,
      }
      channelSalaryInfo(data).then((res) => {
        // this.total = res.total
        this.detailslist = res.data;
      });
    },
    //查询
    Getsearch(){
        let data = {
        unionId:this.unionId,
        cid: this.cid,
        startTime:this.dataForm.startTime,
        endTime:this.dataForm.endTime,
        // pageNum:1,
        // pageSize:10,
      }
      channelSalaryInfo(data).then((res) => {
        // this.total = res.total
        this.detailslist = res.data;
      });
    },
    //退出
    enter(){
      this.$emit('cancel')
    },
  },
  mounted() {
    setTimeout(()=>{
      this.getdetails()
    },200)
  },
};
</script>

