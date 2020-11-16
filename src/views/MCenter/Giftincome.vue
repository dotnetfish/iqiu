<template>
  <section class="apply me-wrap">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-date-picker v-model="dataForm.startTime"  type="date" value-format="timestamp" placeholder="开始日期选择"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="dataForm.endTime"  type="date" value-format="timestamp" placeholder="结束日期选择"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="Getuserlist()" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
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
          prop="createTime"
          label="生产时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="myScale"
          label="平台抽成"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="scale"
          label="公会抽成"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="totalCoin"
          label="主播最终收入"
          align="center"
          header-align="center"
        >
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
import { myGiftJoin, } from "@/api/api";

export default {
  name: "Giftincome",
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
        this.getmyGiftJoin()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getmyGiftJoin()
      },
      //获取列表消息
      getmyGiftJoin() {
          let data = {
            pageNum:this.pageIndex,
            pageSize:this.pageSize,
            startTime:'',
            endTime:'',
          }
          myGiftJoin(data).then((res) => {
            //   console.log("系统消息列表==",res)
              if(res.data.length!=0){
                this.total = res.total
                this.tableData = res.data
              }else{
                  this.total = 0
              }
          })
      },
      //查询
      Getuserlist() {
          let data = {
            pageNum:1,
            pageSize:10,
            startTime: this.dataForm.startTime,
            endTime: this.dataForm.endTime,
          }
          myGiftJoin(data).then((res) => {
            // this.tableData = res.data
            //   console.log("系统消息列表==",res)
              if(res.data.length!=0){
                this.total = res.total
                this.tableData = res.data
              }else{
                  this.total = 0
              }
          })
      },

  },
  mounted() {
    this.getmyGiftJoin();
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