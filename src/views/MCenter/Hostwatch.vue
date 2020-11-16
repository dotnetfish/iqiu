<template>
  <section class="apply me-wrap">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.cid" placeholder="主播id" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="Getsearch()" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="liveRecomend">
        <div class="liveRecomend-title">
        </div>
        <div style="margin: 0 -12px;width:1224px">
          <livelistitem :liveList="tablelist" :itemStyle="{width: 'calc(25% - 24px)'}"
                        @homeListEventTanck="homeListHotTanck"></livelistitem>
        </div>
    </div>
    <!-- <el-row>
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
      </el-table>
    </el-row> -->
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
import { channelSee, unionRole } from "@/api/api";
import livelistitem from "@/components/live-list-item.vue"

export default {
  name: "Hostwatch",
  components: {
    livelistitem
  },
  data() {
    return {
        dataForm:{
          type:'',
          cid:'',
        },
        id:'',
        // pageSize:10,
        // pageIndex:1,
        // total:0,
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
    }
  },
  methods: {
    homeListHotTanck(param) { //living_room_enter_click
        this.homeClickEvent('living_room_enter_click', '热门推荐', param.id, param.name)
      },
      //改变页数
      // handleSizeChange(val){
      //   this.pageSize = val
      //   this.pageIndex = 1
      //   this.getchannelSee()
      // },
      // handleCurrentChange(val) {
      //   this.pageIndex = val
      //   this.getchannelSee()
      // },
      //获取监控列表
      getchannelSee(){
          let data = {
            cid:this.dataForm.cid,
            unionId: this.unionId,
            // pageNum:this.pageIndex,
            // pageSize:this.pageSize,
          }
          channelSee(data).then((res) => {
            // this.total = res.total
        this.tablelist = res.data;
      });
      },
      //查询
      Getsearch(){
          let data = {
            cid:this.dataForm.cid,
            unionId: this.unionId,
            // pageNum:1,
            // pageSize:10,
          }
          channelSee(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getchannelSee();
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
  .liveRecomend {
    width: 1202px;
    min-width: 1202px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .liveRecomend-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  
</style>