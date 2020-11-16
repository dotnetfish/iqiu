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
          label="主播id"
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
        </template>
      </el-table-column>
      </el-table>
    </el-row>
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
import { managerRooms, delManagers } from "@/api/api";

export default {
  name: "mymanagement",
  components: {
  },
  data() {
    return {
        // pageSize:10,
        // pageIndex:1,
        // total:0,
        // unionId:'',
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
    //   handleSizeChange(val){
    //     this.pageSize = val
    //     this.pageIndex = 1
    //     this.getuniontransfer()
    //   },
    //   handleCurrentChange(val) {
    //     this.pageIndex = val
    //     this.getuniontransfer()
    //   },
    //辞职
    outroom(cid){
        let data = {
            cid: cid
          }
          delManagers(data).then((res) => {
          this.$message.success('辞职成功')
          this.getmanagerRooms
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