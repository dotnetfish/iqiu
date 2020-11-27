<template>
  <section class="apply me-wrap">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="主播ID"></el-input>
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
          prop="scale"
          label="抽成比例(%)"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系方式"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="overTime"
          label="到期时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.overTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="look(scope.row.cid,scope.row.overTime,scope.row.group,scope.row.type)" style="color:#F9772A">查看详情</el-button>
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
    <Hostdetails v-if="flag" :cid='cid' :flag='flag' :type='type' :group='group' :time='time' ref="editor" @cancel='cancel()' @refreshDataList="refreshData()"></Hostdetails>
  </section>
</template>

<script>
import { channelList } from "@/api/api";
import Hostdetails from './Hostdetails'

export default {
  name: "Hostlist",
  components: {
      Hostdetails,
  },
  data() {
    return {
        dataForm:{
          uid:''
        },
        pageSize:10,
        pageIndex:1,
        total:0,
        tablelist:'',
        flag:false,
        cid:'',
        time:'',
        group:'',
        type:'',
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
      look(id,time,group,type){
        this.cid = id
        this.time = time
        this.group = group
        this.type = type
        // console.log("545454==",this.time)
        this.flag = true
      },
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
      getchannelList(){
          let data = {
            cid:this.dataForm.uid,
            pageNum:this.pageIndex,
            pageSize:this.pageSize,
          }
          channelList(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      Getsearch(){
          let data = {
            cid:this.dataForm.uid,
            pageNum:1,
            pageSize:10,
          }
          channelList(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      cancel(){
        this.flag = false
      }
  },
  mounted() {
      this.getchannelList()
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