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
          prop="createTime"
          label="月份"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="giftTotalCoin"
          label="礼物收益"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="channelTotalCoin"
          label="主播提成收益"
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
          prop="marginCoin"
          label="本月押金"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="noTransferCoin"
          label="上次未结算"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="trimCoin"
          label="调整金额"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="totalCoin"
          label="合计"
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
            <div style="display:flex;justify-content:center;">
                <div v-if="scope.row.status==0" style="color:#159A26">已结算</div>
                <div v-if="scope.row.status==1" style="color:red">未结算</div>
            </div>
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
  </section>
</template>

<script>
import { unionRole, uniontransfer } from "@/api/api";

export default {
  name: "Guildincomedata",
  components: {
  },
  data() {
    return {
        dataForm:{
          startTime:'',
          endTime:'',
        },
        pageSize:10,
        pageIndex:1,
        total:0,
        unionId:'',
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
      //获取公会收入明细列表
      getuniontransfer(){
          let data = {
            unionId: this.unionId,
            startTime:this.dataForm.startTime,
            endTime:this.dataForm.endTime,
            pageNum:this.pageIndex,
            pageSize:this.pageSize,
          }
          uniontransfer(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      //查询
      Getsearch(){
          let data = {
            startTime:this.dataForm.startTime,
            endTime:this.dataForm.endTime,
            unionId: this.unionId,
            pageNum:1,
            pageSize:10,
          }
          uniontransfer(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getuniontransfer();
          })
      },
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