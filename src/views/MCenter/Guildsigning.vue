<template>
  <section class="apply me-wrap">
      <div style="display:flex;margin-top:40px">
          <div style="display:flex">
              <div>
                  <img src='@/assets/timg.jpg' style="width:120px;height:120px;border-radius:120px;">
              </div>
              <div style="margin-left:30px">
                  <div style="font-size: 24px;color: #333333;">个人资料</div>
                  <div style="display:flex;margin-top:37px">
                    <div style="font-size: 14px;color: #666666;margin-right:20px">房间号:{{$store.state.userStatus.userInfo.uid}}</div>
                    <!-- <div style="font-size: 14px;color: #666666;">订阅：{{info[0].count}}</div> -->
                  </div>
              </div>
          </div>
      </div>
      <div style="margin-top:40px">
          <div style="display:flex;align-items:center">
              <div style="width:110px;text-align:right;color: #666666;font-size:16px">
                  申请签约公会
              </div>
              <div style="margin-left:30px" v-if="gname==''">
                  <el-input v-model="guildname" placeholder="请输入公会id" style="width:300px;margin-right:50px"></el-input>
              </div>
              <div style="margin-left:30px" v-if="gname!=''">
                  <el-input v-model="gname" :disabled="true" placeholder="请输入公会id" style="width:300px;margin-right:50px"></el-input>
              </div>
          </div>
          <div style="display:flex;align-items:center;margin-top:43px;">
              <div style="width:110px;text-align:right;color: #666666;font-size:16px">
                  签约时间
              </div>
              <div style="margin-left:30px;">
                  <el-select v-model="value" placeholder="请选择签约时间">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </div>
          </div>
          <div style="display:flex;align-items:center;margin-top:43px;">
              <div style="width:110px;text-align:right;color: #666666;font-size:16px">
                  主播提成
              </div>
              <div style="margin-left:30px;color:#333333;font-size:16px">
                  70%
              </div>
          </div>
          <div style="width: 591px;height: 162px;background: #F0F0F0;border-radius: 10px;margin-top:43px;">
              <div style="display:flex;margin-left:24px;">
                  <div style="margin-top:20px;"><img src="@/assets/guild/no3.png"></div>
                  <div style="color: #666666;font-size:18px;margin-top:22px;margin-left:4px">提示</div>
              </div>
              <div style="margin-top:10px;margin-left:24px;color:#999999;">
                  1.绑定手机号后享受更安全及提醒务
              </div>
              <div style="margin-top:10px;margin-left:24px;color:#999999;">
                  2.绑定手机号后享受更安全及提醒务绑定号后享受更安全及提醒务及提醒务安全及提
              </div>
          </div>
      </div>
      <div style="display:flex;margin-top:60px;margin-bottom:100px;align-items:center">
          <el-button @click="submit()" style="color: #ffffff;background-color: #F9772A;border: 0;width:180px;margin-right:20px">提交申请</el-button>
          <div style="margin-left:22px;color: #EB2727;font-size:16px">提交申请7天后未通过自动取消</div>
      </div>
      <div style="margin-top:110px;color: #333333;font-size: 24px;">推荐签约公会</div>
      <div style="width:910px;height:2px;background:rgba(240,240,240,1);margin-top:30px;margin-bottom: 16px;"></div>
      <div style="display:flex;margin-top:20px ">
          <div style="font-size: 20px;color:#333333;margin-right:113px" @click="changeblue(true)">人气排行</div>
          <div style="font-size: 20px;color:#333333" @click="changeblue(false)">收入排行</div>
      </div>
      <div style="display:flex;height:4px;width:100%;margin-bottom:18px">
        <div class="blueone" v-if="showblue==true"></div>
        <div class="bluetow" v-if="showblue==false"></div>
    </div>
    <div style="display:flex;margin-top:40px;flex-wrap:wrap;" v-if="showblue==true">
        <div v-for="(item,index) in info" :key="index">
            <div style="width: 430px;height: 300px;background: #F0F0F0;border-radius: 8px;margin-right:14px;margin-top:14px">
                <div style="display:flex;margin-left:40px">
                <div style="margin-top:18px;">
                    <img src='@/assets/timg.jpg' style="width:100px;height:100px;border-radius:100px;">
                </div>
                <div style="margin-left:30px;margin-top:18px;">
                    <div style="font-size: 22px;color: #333333;">{{item.name}}</div>
                    <div style="font-size: 12px;color: #666666;margin-top:26px">公会ID：{{item.id}}</div>
                    <div style="font-size: 12px;color: #666666;margin-top:7px">签约主播：{{item.count}}</div>
                    <div style="font-size: 12px;color: #666666;margin-top:7px">创建时间：{{item.time}}</div>
                </div>
            </div>
            <div style="display:flex;margin-top:30px">
                <div style="margin-left:40px;margin-right:10px;width: 2px;height: 18px;background: #F9772A;border-radius: 2px;"></div>
                <div>
                    <div style="color: #333333;font-size:18px">主营品类</div>
                    <div style="color: #666666;font-size:14px;margin-top:12px;width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.type}}</div>
                </div>
                </div>
                <div style="display:flex;margin-top:30px">
                <div style="margin-left:40px;margin-right:10px;width: 2px;height: 18px;background: #F9772A;border-radius: 2px;"></div>
                <div>
                    <div style="color: #333333;font-size:18px">公会介绍</div>
                    <div style="color: #666666;font-size:14px;margin-top:12px;width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.speak}}</div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div style="display:flex;margin-top:40px;flex-wrap:wrap;" v-if="showblue==false">
        <div v-for="(item,index) in moneyinfo" :key="index">
            <div style="width: 430px;height: 300px;background: #F0F0F0;border-radius: 8px;margin-right:14px;margin-top:14px">
                <div style="display:flex;margin-left:40px">
                <div style="margin-top:18px;">
                    <img src='@/assets/timg.jpg' style="width:100px;height:100px;border-radius:100px;">
                </div>
                <div style="margin-left:30px;margin-top:18px;">
                    <div style="font-size: 22px;color: #333333;">{{item.name}}</div>
                    <div style="font-size: 12px;color: #666666;margin-top:26px">公会ID：{{item.id}}</div>
                    <div style="font-size: 12px;color: #666666;margin-top:7px">签约主播：{{item.count}}</div>
                    <div style="font-size: 12px;color: #666666;margin-top:7px">创建时间：{{item.time}}</div>
                </div>
            </div>
            <div style="display:flex;margin-top:30px">
                <div style="margin-left:40px;margin-right:10px;width: 2px;height: 18px;background: #F9772A;border-radius: 2px;"></div>
                <div>
                    <div style="color: #333333;font-size:18px">主营品类</div>
                    <div style="color: #666666;font-size:14px;margin-top:12px;width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.type}}</div>
                </div>
                </div>
                <div style="display:flex;margin-top:30px">
                <div style="margin-left:40px;margin-right:10px;width: 2px;height: 18px;background: #F9772A;border-radius: 2px;"></div>
                <div>
                    <div style="color: #333333;font-size:18px">公会介绍</div>
                    <div style="color: #666666;font-size:14px;margin-top:12px;width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.speak}}</div>
                </div>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import { channelAdd, channelRank, cashRank } from "@/api/api";

export default {
  name: "Guildsigning",
  components: {
  },
  data() {
    return {
        options: [{
          value: 3,
          label: '3个月'
        }, {
          value: 6,
          label: '6个月'
        }, {
          value: 9,
          label: '9个月'
        }, {
          value: 12,
          label: '1年'
        }],
        value:3,
        showblue:true,
        type:1,
        guildname:'',
        info:'',
        moneyinfo:'',
    };
  },
  props: {
    gname:{
      type:String
    },
    endtime:{
      type:String
    }
  },
  methods: {
      //续签时名字
    //   getname () {
    //   this.guildname = this.$route.query.a
    // //   console.log('sssss=', this.$route.query.a)
    // },
      //排行类型切换
      changeblue(index) {
      this.showblue = index;
    },
    //提交申请
    submit(){
        let date = new Date();
        let year = date.getFullYear(); // 年
        let month = date.getMonth() + 1; // 月
        let day = date.getDate();
        let hour = date.getHours(); // 时
        hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
        let minute = date.getMinutes(); // 分
        minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
        let second = date.getSeconds(); // 秒
        second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
        let nowDate = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
        let time = new Date(nowDate.replace(/-/g, '/')).getTime()
        time = this.value*30*24*60*60*1000 + time;
        if(this.gname!=''){
            this.guildname = this.gname;
            this.type = 2;
            time = this.endtime + this.value * 30 * 24 * 60 * 60 * 1000
        }
        // console.log("777777777777777777777777=",time)
        let data = {
            unionId: this.guildname,
            overTime: time,
            scale: 30,
            cid:this.$store.state.userStatus.userInfo.uid,
            type: this.type,
        }
        channelAdd(data).then((res) => {
          if(res.code==0){
            this.$message({
            message: "提交成功",
            type: "success"
          });
          }  
      });
    },
      //获取公会两部份排行
      getchannelRank() {
        //   console.log("777777777777777777777777=",this.gname)
        //   this.guildname = this.gname;
          let data = {
            search: '',
        }
          channelRank(data).then((res) => {  
            //   console.log("777777777777777777777777=",res.data)
              this.info = res.data
      });
      },
      getcashRank() {
          let data = {
            search: '',
        }
          cashRank(data).then((res) => {  
            //   console.log("777777777777777777777777=",res.data)
              this.moneyinfo = res.data
      });
      },
  },
  mounted() {
    this.getchannelRank();
    this.getcashRank();
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
  .blueone {
  width: 80px;
  height: 4px;
  background: #F9772A;
  border-radius: 2px;
  margin-top: 14px;
}

.bluetow {
  width: 80px;
  height: 4px;
  background: #F9772A;
  border-radius: 2px;
  margin-top: 14px;
  margin-left: 193px;
}
</style>