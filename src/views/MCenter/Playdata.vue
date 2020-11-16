<template>
  <section class="apply me-wrap">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-date-picker v-model="dataForm.time"  type="date" value-format="timestamp" placeholder="日期选择(请输入半年内日期)"></el-date-picker>
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
          prop="startTime"
          label="开始时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.startTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="duration"
          label="直播时长"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.duration | FormatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="followCount"
          label="新增粉丝"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="totalCoin"
          label="收获球币"
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
// import { unionLiveRecordList, } from "@/api/api";

export default {
  name: "Playdata",
  components: {
  },
  data() {
    return {
      total:0,
      pageSize:10,
      pageIndex:1,
      tableData:[],
      dataForm:{
          time:''
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
    FormatDate: function (value) {
        let date = new Date(value);
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return h + ":" + m + ":" + s;
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
      getunionLiveRecordList() {
          let data = {
            pageNum:this.pageIndex,
            pageSize:this.pageSize,
            cid:this.$store.state.userStatus.userInfo.uid,
            unionId:'',
            startTime:'',
            endTime:'',
          }
          unionLiveRecordList(data).then((res) => {
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
            time: this.dataForm.time,
          }
          sysMessagelist(data).then((res) => {
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
    this.getunionLiveRecordList();
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