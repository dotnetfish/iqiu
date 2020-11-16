<template>
  <section class="apply me-wrap">
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
          prop="ID"
          label="ID号"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="server"
          label="开通服务"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="到期时间"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="money"
          label="提成"
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
import { xxxlist, } from "@/api/api";

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
      getxxxlist() {
          let data = {
            pageNum:this.pageIndex,
            pageSize:this.pageSize,
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
    this.getxxxlist();
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