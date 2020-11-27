<template>
  <section class="apply me-wrap">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="主播ID"></el-input>
      </el-form-item>
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
          prop="startTime"
          label="开播时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.startTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="durationSum"
          label="开播时长"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{parseInt(scope.row.durationSum/60/60)}}时{{parseInt((scope.row.durationSum-parseInt(scope.row.durationSum/60/60)*60*60)/60)}}分</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="havDay"
          label="有效开播天数"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="group"
          label="所在分组"
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
        <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="look(scope.row.cid,scope.row.uname)" style="color:#F9772A">查看详情</el-button>
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
    <Nowlivingdetails v-if="flag" :cid='cid' :flag='flag' :uname='uname' ref="editor" @cancel='cancel()' @refreshDataList="refreshData()"></Nowlivingdetails>
  </section>
</template>

<script>
import { unionLiveRecordList, unionLiveRecordInfo, unionRole } from "@/api/api";
import Nowlivingdetails from './Nowlivingdetails'

export default {
  name: "Nowliving",
  components: {
      Nowlivingdetails,
  },
  data() {
    return {
        dataForm:{
          uid:'',
          startTime:'',
          endTime:'',
        },
        pageSize:10,
        pageIndex:1,
        total:0,
        unionId:'',
        tablelist:'',
        flag:false,
        cid:'',
        uname:'',
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
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return h + "时" + m + "分";
    },
  },
  methods: {
      look(id,uname){
        this.cid = id
        this.uname = uname
        // console.log("545454==",this.time)
        this.flag = true
      },
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getunionLiveRecordList()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getunionLiveRecordList()
      },
      getunionLiveRecordList(){
          let data = {
            cid:this.dataForm.uid,
            unionId: this.unionId,
            startTime:this.dataForm.startTime,
            endTime:this.dataForm.endTime,
            pageNum:this.pageIndex,
            pageSize:this.pageSize,
          }
          unionLiveRecordList(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      Getsearch(){
          let data = {
            cid:this.dataForm.uid,
            startTime:this.dataForm.startTime,
            endTime:this.dataForm.endTime,
            unionId: this.unionId,
            pageNum:1,
            pageSize:10,
          }
          unionLiveRecordList(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getunionLiveRecordList();
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