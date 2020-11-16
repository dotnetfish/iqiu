<template>
  <section class="apply me-wrap">
    <div style="font-size: 18px;font-weight: 500;color: #333333;margin-bottom:20px">同比上个周期开播次数，时段减少，收入降低和新增关注下降时主播流失征兆</div>
    <div class="type-points">
      <div class="let-points" @click="changetype(1)" ref="typeone">近7天</div>
      <div class="o-zhi" @click="changetype(2)" ref="typetow">近15天</div>
      <div class="total-score" @click="changetype(3)" ref="typethree">近30天</div>
    </div>
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
          prop="liveNum,liveFaceNum,liveNumType"
          label="有效开播天数"
          align="center"
          header-align="center"
          width="120"
        >
        <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
                <div>{{scope.row.liveNum}}</div>
                <div v-if="scope.row.liveNumType==1"><img src="@/assets/guild/4.png"></div>
                <div v-if="scope.row.liveNumType==2"><img src="@/assets/guild/5.png"></div>
                <div>{{scope.row.liveFaceNum}}</div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="liveTimeNum,liveTimeFaceNum,liveTimeNumType"
          label="开播时长"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
            <div>{{scope.row.liveTimeNum | FormatDate}}</div>
            <div v-if="scope.row.liveTimeNumType==1"><img src="@/assets/guild/4.png"></div>
            <div v-if="scope.row.liveTimeNumType==2"><img src="@/assets/guild/5.png"></div>
            <div>{{scope.row.liveTimeFaceNum.toFixed(2)}}%</div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="followNum,followFaceNum,followNumType"
          label="新增关注"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
                <div>{{scope.row.followNum}}</div>
                <div v-if="scope.row.followNumType==1"><img src="@/assets/guild/4.png"></div>
                <div v-if="scope.row.followNumType==2"><img src="@/assets/guild/5.png"></div>
                <div>{{scope.row.followFaceNum}}</div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="coinNum,coinFaceNum,coinNumType"
          label="收益情况"
          align="center"
          header-align="center"
          width="160"
        >
        <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
                <div>{{scope.row.coinNum}}</div>
                <div v-if="scope.row.coinNumType==1"><img src="@/assets/guild/4.png"></div>
                <div v-if="scope.row.coinNumType==2"><img src="@/assets/guild/5.png"></div>
                <div>{{scope.row.coinFaceNum.toFixed(2)}}%</div>
            </div>
        </template>
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
      </el-table>
  </section>
</template>

<script>
import { unionRole, unionflow } from "@/api/api";

export default {
  name: "Losswarn",
  components: {
  },
  data() {
    return {
        unionId:'',
        tablelist:[],
        type:1,
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
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return h + "时";
    },
  },
  methods: {
      //天数选择
      changetype(type) {
      this.type = type;
      if(this.type==1) {
        this.$refs.typeone.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typeone.style.background='#F9772A';
        this.$refs.typetow.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typetow.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typethree.style.background='rgba(255, 255, 255, 1)';
      } else if(this.type===2) {
        this.$refs.typeone.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typeone.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.background='#F9772A';
        this.$refs.typethree.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typethree.style.background='rgba(255, 255, 255, 1)';
      } else {
        this.$refs.typeone.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typeone.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typetow.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.background='#F9772A';
      }
      this.getunionflow()
    },
      //流量列表
      getunionflow(){
          let data = {
              unionId:this.unionId,
              type:this.type
          }
          unionflow(data).then((res) => {
              this.tablelist = res.data;
          })
      },
      //公会id
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getunionflow();
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
.type-points {
  display: flex;
  width: 210px;
  height: 38px;
  margin-bottom: 20px;
}

.let-points {
  width: 70px;
  height: 100%;
  background:#F9772A;
  border:#999999 solid 1px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 38px;
  text-align: center;
  cursor:pointer;
}

.o-zhi {
  width: 70px;
  height: 38px;
  background: rgba(255, 255, 255, 1);
  border-top:#999999 solid 1px;
  border-bottom:#999999 solid 1px;
  font-size: 14px;
  font-weight: 500;
  color: #999999;
  line-height: 38px;
  text-align: center;
  cursor:pointer;
}

.total-score {
  width: 70px;
  height: 38px;
  background: rgba(255, 255, 255, 1);
  border:#999999 solid 1px;
  font-size: 14px;
  font-weight: 500;
  color:#999999;
  line-height: 38px;
  text-align: center;
  cursor:pointer;
}
::v-deep .el-input__inner:focus{
      border-color:  #F9772A !important;      
  }
</style>