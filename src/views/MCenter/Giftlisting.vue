<template>
  <section class="apply me-wrap">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-date-picker v-model="dataForm.startTime"  type="date" value-format="timestamp" placeholder="开始日期选择" :picker-options="pickerDisabled"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="dataForm.endTime"  type="date" value-format="timestamp" placeholder="结束日期选择" :picker-options="pickerDisabled"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="Getuserlist()" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
        <div style="font-size:16px;color:#999999;margin-bottom:10px">每日显示前一日礼物清单，礼物价值为球币价值，非分成后数值</div>
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
          prop="createTime"
          label="获取时间"
          align="center"
          header-align="center"
          width='250'
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="giftName"
          label="礼物名称"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="numberSum"
          label="礼物数量"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sendUid"
          label="送礼物的id"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="priceSum"
          label="礼物价值"
          align="center"
          header-align="center"
        >
        </el-table-column>
      </el-table>
    </el-row>
    <div v-if="sum!=0" style="margin-top:14px;text-align:right">收入总计：{{this.sum}}</div>
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
import { giftRecord, } from "@/api/api";

export default {
  name: "Giftlisting",
  components: {
  },
  data() {
    return {
      total:0,
      pageSize:10,
      pageIndex:1,
      tableData:[],
      dataForm:{
          startTime:'',
          endTime:'',
        },
      sum:1,
      pickerDisabled: {
        disabledDate: (time) => {
          return time.getTime() >= new Date() * 1 + 600 * 1000;
        }
      }
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
        this.getxxxlist()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getxxxlist()
      },
      //获取列表消息
      getgiftRecord() {
        let t1 = new Date().getFullYear();
        let t2 = (new Date().getMonth() + 1) + "/" + (new Date().getDate());
        let timeStr1 = t1 + '/' + t2 + ' ' + '00:00:00'
        let timeStr2 = t1 + '/' + t2 + ' ' + '23:59:59'
        console.log(t1 + "/" + t2)
        console.log(timeStr2)
        let time1 = new Date(timeStr1.replace(/-/g,'/')).getTime();
        let time2 = new Date(timeStr2.replace(/-/g,'/')).getTime();
        // time1 = time1 - 24*60*60*1000
        // time2 = time2 - 24*60*60*1000
          let data = {
            // pageNum:this.pageIndex,
            // pageSize:this.pageSize,
            startTime: time1,
            endTime: time2,
          }
          giftRecord(data).then((res) => {
            this.tableData = res.data
            this.sum = res.total
            //   console.log("系统消息列表==",res)
              // if(res.data.length!=0){
              //   this.total = res.total
              //   this.tableData = res.data
              // }else{
              //     this.total = 0
              // }
          })
      },
      //查询
      Getuserlist() {
          let data = {
            startTime: this.dataForm.startTime,
            endTime: this.dataForm.endTime,
            // pageNum:1,
            // pageSize:10,
            // time: this.dataForm.time,
          }
          giftRecord(data).then((res) => {
            this.tableData = res.data
            this.sum = res.total
            //   console.log("系统消息列表==",res)
              // if(res.data.length!=0){
              //   this.total = res.total
              //   this.tableData = res.data
              // }else{
              //     this.total = 0
              // }
          })
      },

  },
  mounted() {
    this.getgiftRecord();
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