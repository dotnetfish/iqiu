<template>
  <section class="apply me-wrap">
    <div v-if="info!=''">
      <div style="display:flex;margin-top:40px">
          <div style="display:flex">
              <div>
                  <img :src="info.logo" style="width:120px;height:120px;border-radius:120px;">
              </div>
              <div style="margin-left:30px">
                  <div style="font-size: 24px;color: #333333;">{{info.name}}</div>
                  <div style="font-size: 14px;color: #666666;margin-top:37px">公会ID：{{info.id}}</div>
                  <div style="font-size: 14px;color: #666666;margin-top:8px">签约主播：{{info.channelNum}}</div>
                  <div style="font-size: 14px;color: #666666;margin-top:8px">创建时间：{{info.createTime | FormatDate}}</div>
              </div>
          </div>
          <div style="width: 359px;height: 137px;background: #FFFFFF;box-shadow: 0px 2px 4px 3px rgba(233, 233, 235, 0.72);border-radius: 5px;margin-left:200px">
              <!-- <div style="display:flex;margin-top:32px">
                  <div style="font-size: 16px;color: #999999;width:300px;margin-left:60px">当前公会排名:</div>
                  <div style="width:100%;text-align:right;font-size:16px;color:#999999;margin-right:40px">{{info[0].node}}</div>
              </div>
              <div style="display:flex;margin-top:14px">
                  <div style="font-size: 14px;color: #999999;width:300px;margin-left:60px">个人排名:</div>
                  <div style="width:100%;text-align:right;font-size:14px;color:#999999;margin-right:40px">{{info[0].usernode}}</div>
              </div> -->
              <div style="display:flex;margin-top:14px">
                  <div style="font-size: 14px;color: #999999;width:280px;margin-left:40px">到期时间:</div>
                  <div style="width:100%;text-align:right;font-size:14px;color:#999999;margin-right:30px">{{info.overTime | formatDate}}</div>
              </div>
          </div>
      </div>
      <div style="width:910px;height:2px;background:rgba(240,240,240,1);margin-top:30px;margin-bottom: 16px;"></div>
      <div style="display:flex;margin-top:50px">
          <div style="margin-right:18px"><img src="@/assets/guild/no1.png" style="width:28px;height:28px"></div>
          <div>
              <div style="color: #333333;font-size:20px">主营品类</div>
              <div style="color: #666666;font-size:16px;margin-top:12px">{{info.businessType}}</div>
          </div>
      </div>
      <div style="display:flex;margin-top:80px">
          <div style="margin-right:18px"><img src="@/assets/guild/no2.png" style="width:28px;height:28px"></div>
          <div>
              <div style="color: #333333;font-size:20px">公会介绍</div>
              <div style="color: #666666;font-size:16px;margin-top:12px">{{info.dec}}</div>
          </div>
      </div>
      <div style="display:flex;margin-top:80px">
          <div style="margin-right:18px"><img src="@/assets/guild/no1.png" style="width:28px;height:28px"></div>
          <div>
              <div style="color: #333333;font-size:20px">联系方式</div>
              <div style="display:flex;margin-top:50px;margin-top:12px">
                <div style="color: #666666;font-size:16px;margin-right:24px">{{info.contact}}</div>
              </div>
          </div>
      </div>
      <div style="display:flex;margin-top:140px;margin-bottom:100px">
          <el-button @click="goon()" style="color: #ffffff;background-color: #F9772A;border: 0;width:180px;margin-right:20px;height:42px">续签</el-button>
          <el-button @click="outguild()" style="color: #F9772A;background-color: #ffffff;border: #F9772A solid 1px ;width:180px;margin-bottom: 8rem;">退出公会</el-button>
      </div>
    </div>
    <div v-else>
      <img src="@/assets/none.png">
    </div>
  </section>
</template>

<script>
import { myUnion, delMyUnion } from "@/api/api";

export default {
  name: "Myguild",
  components: {
  },
  data() {
    return {
        info:'',
        // info:{
        //     logo:'@/assets/timg.jpg',
        //     name:'黑鹰集团',
        //     id:10000,
        //     channelNum:20,
        //     createTime:'2020-12-01',
        //     node:3,
        //     usernode:10/20,
        //     overTime:'2020-10-26 24:00:00',
        //     businessType:'而游戏公会这个组织发展了这么多年，发生过的形形色色的事情不胜枚举',
        //     dec:'而游戏公会这个组织发展了这么多年，发生过的形形色色的事情不胜枚举,那些从火星文到奇怪符号的公会名称更是看得人一头雾水',
        //     contact:12345,
        //     qq:55665,
        // }
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
      return yy + "年" + mm + "月" + dd + "日";
    },
  },
  methods: {
      //获取公会信息
      getmyUnion() {
        myUnion().then((res) => {
            this.info = res.data    
      });
          // console.log("88888888888888888888888888888888888888=",this.info)
      },
      //续签
      goon () {
      var a = this.info.id
      var b = this.info.overTime
      this.$emit('getname',a,b)
    },
    //退出公会
    outguild(){
      let data = {
        unionId:this.info.id,
        cid:this.$store.state.userStatus.userInfo.uid
      }
      delMyUnion(data).then((res) => {
         this.$message.success('退出成功');    
      });
    }
  },
  mounted() {
    this.getmyUnion();
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