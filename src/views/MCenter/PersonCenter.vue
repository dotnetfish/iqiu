<!--个人中心-->
<!--Created by fly on 2019/12/24-->
<!--<span slot="label"><img src="@/assets/person/data.png" /> 我的资料</span>-->
<template>
  <div class="person-center ">
    <el-row style="width: 1200px;margin:auto">
      <el-col>
        <div class="left-table">
          <el-tabs :tab-position="tabPosition" v-model="activeName" class="tab" @tab-click="handleClick">
<!--            <el-tab-pane disabled>-->
<!--              <div class="person-title" slot="label">个人中心</div>-->
<!--            </el-tab-pane>-->
            <el-tab-pane name="0" :key="0">
                            <div class="person-title" slot="label" @click="show=false,show1=false,show2=false,show3=false,show4=false">个人中心</div>
<!--              <div slot="label" class="person-subtitle">-->
<!--                <div class="ml5">我的资料</div>-->
<!--              </div>-->
              <person-info @showInfoEdit="showInfoEdit" @showWalt="showWalt" @showCostDetail="showCostDetail" @AnchorApply="AnchorApply"
                           v-if="tabBool[0]&&edit==1">
              </person-info>  
<!--              <person-edit v-if="tabBool[0]&&edit==2" @back="back">-->
<!--              </person-edit>-->
<!--              <person-cost-detalis v-if="tabBool[0]&&edit==3" @back="back"></person-cost-detalis>-->
<!--              <PersonWallt ref="wallt" :is-dialog="true" @rechargeSuccess="$emit('sendGiftSuccess')"></PersonWallt>-->
            </el-tab-pane>
            <el-tab-pane name="3" :key="3">
              <div slot="label" class="person-title"  @click="show=!show,activeName='3'">
                主播相关
              </div>
            </el-tab-pane>
            <el-tab-pane label="申请主播" name="3" :key="3" v-if="show">
              <div slot="label" class="person-subtitle">
                <div class="ml5">申请主播</div>
              </div>
              <AnchorApply></AnchorApply>
            </el-tab-pane>
            <!-- <el-tab-pane label="直播数据" name="12" :key="12" v-if="show">
              <div slot="label" class="person-subtitle" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">
                <div class="ml5">直播数据</div>
              </div>
              <Playdata></Playdata>
            </el-tab-pane> -->
            <el-tab-pane label="直播设置" name="13" :key="13" v-if="show">
              <div slot="label" class="person-subtitle" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">
                <div class="ml5">直播设置</div>
              </div>
              <Playset></Playset>
            </el-tab-pane>
            <el-tab-pane label="我的收入" name="14" :key="14" v-if="show">
              <div slot="label" class="person-subtitle" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">
                <div class="ml5">我的收入</div>
              </div>
              <Myincome></Myincome>
            </el-tab-pane>
            <el-tab-pane label="我的公会" name="15" :key="15" v-if="show">
              <div slot="label" class="person-subtitle" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">
                <div class="ml5">我的公会</div>
              </div>
              <Myguild @getname="getname"></Myguild>
            </el-tab-pane>
            <el-tab-pane label="公会签约" name="16" :key="16" v-if="show">
              <div slot="label" class="person-subtitle" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">
                <div class="ml5">公会签约</div>
              </div>
              <Guildsigning :gname="gname" :endtime="endtime"></Guildsigning>
            </el-tab-pane>
            <el-tab-pane name="5" :key="5" v-if="show">
              <div slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">直播记录</div>
              <anchor-live-log></anchor-live-log>  
            </el-tab-pane>
             <el-tab-pane name="4" :key="4" v-if="show">
              <div slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">房间管理</div>
              <anchor-room></anchor-room>
            </el-tab-pane>
            <el-tab-pane name="32" :key="32" v-if="show">
              <div slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">我是房管</div>
              <mymanagement></mymanagement>
            </el-tab-pane>
            <el-tab-pane name="17" :key="17" v-if="showguildhome">
              <div slot="label" class="person-title"  @click="show1=!show1,activeName='17'">
                公会首页
              </div>
            </el-tab-pane>
            <el-tab-pane label="公会主页" name="17" :key="17" v-if="show1">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">公会主页</div>
              <Guildhome></Guildhome>
            </el-tab-pane>
            <el-tab-pane label="公会申请" name="18" :key="18" v-if="show1">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">公会申请</div>
              <Guildapply></Guildapply>
            </el-tab-pane>
            <el-tab-pane name="19" :key="19" v-if="showhost">
              <div slot="label" class="person-title"  @click="show2=!show2,activeName='19'">
                主播设置
              </div>
            </el-tab-pane>
            <el-tab-pane label="主播列表" name="19" :key="19" v-if="show2">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">主播列表</div>
              <Hostlist></Hostlist>
            </el-tab-pane>
            <el-tab-pane label="主播申请" name="20" :key="20" v-if="show2">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">主播申请</div>
              <Hostapply></Hostapply>
            </el-tab-pane>
            <el-tab-pane label="当前开播" name="21" :key="21" v-if="show2">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">当前开播</div>
              <Nowliving></Nowliving>
            </el-tab-pane>
            <el-tab-pane label="流失预警" name="22" :key="22" v-if="show2">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">流失预警</div>
              <Losswarn></Losswarn>
            </el-tab-pane>
            <el-tab-pane label="主播监控" name="31" :key="31" v-if="show2">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">主播监控</div>
              <Hostwatch></Hostwatch>
            </el-tab-pane>
            <el-tab-pane label="违规举报" name="23" :key="23" v-if="show2">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">违规举报</div>
              <Violation></Violation>
            </el-tab-pane>
            <el-tab-pane name="24" :key="24" v-if="showdata">
              <div slot="label" class="person-title"  @click="show3=!show3,activeName='24'">
                结算数据
              </div>
            </el-tab-pane>
            <el-tab-pane label="主播结算数据" name="24" :key="24" v-if="show3">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">主播结算数据</div>
              <Settledata></Settledata>
            </el-tab-pane>
            <el-tab-pane label="主播结算设置" name="26" :key="26" v-if="show3">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">主播结算设置</div>
              <Settleset></Settleset>
            </el-tab-pane>
            <el-tab-pane label="公会收入明细" name="25" :key="25" v-if="show3">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">公会收入明细</div>
              <Guildincomedata></Guildincomedata>
            </el-tab-pane>
            <el-tab-pane label="公会提现" name="27" :key="27" v-if="show3">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">公会提现</div>
              <Guildcash></Guildcash>
            </el-tab-pane>
            <el-tab-pane name="28" :key="28" v-if="showset">
              <div slot="label" class="person-title"  @click="show4=!show4,activeName='28'">
                公会设置
              </div>
            </el-tab-pane>
            <el-tab-pane label="公会管理员" name="28" :key="28" v-if="show4">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">公会管理员</div>
              <Guildadministrator></Guildadministrator>
            </el-tab-pane>
            <el-tab-pane label="分组设置" name="29" :key="29" v-if="show4">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">分组设置</div>
              <Uniongroup></Uniongroup>
            </el-tab-pane>
            <el-tab-pane label="信息修改" name="30" :key="30" v-if="show4">
                <div  slot="label" class="ml5" style="display: flex;justify-content: flex-start;align-items: center;font-size: 18px;">信息修改</div>
              <Informationupdate></Informationupdate>
            </el-tab-pane>
            <el-tab-pane name="6" :key="6">
              <div class="person-title" slot="label" @click="show=false,show1=false,show2=false,show3=false,show4=false">任务中心</div>
              <TaskCenter></TaskCenter>
            </el-tab-pane>
            <el-tab-pane name="10" :key="10">
              <div class="person-title" slot="label" @click="show=false,show1=false,show2=false,show3=false,show4=false">我的钱包</div>
              <Mywallet></Mywallet>
            </el-tab-pane>
            <el-tab-pane name="11" :key="11">
              <div class="person-title" slot="label" @click="show=false,show1=false,show2=false,show3=false,show4=false">我的收益</div>
              <Myearnings></Myearnings>
            </el-tab-pane>
            <el-tab-pane name="7" :key="7">
              <div class="person-title" slot="label" @click="show=false,show1=false,show2=false,show3=false,show4=false">我的勋章</div>
              <Mymedal></Mymedal>
            </el-tab-pane>
            <el-tab-pane name="8" :key="8">
              <div class="person-title" slot="label" @click="show=false,show1=false,show2=false,show3=false,show4=false">粉丝牌申请</div>
              <Fansapply></Fansapply>
            </el-tab-pane>
            <el-tab-pane name="9" :key="9">
              <div class="person-title" slot="label" @click="show=false,show1=false,show2=false,show3=false,show4=false">系统消息<div class="count" v-if="count == true"></div></div>
              <SysMessage></SysMessage>
            </el-tab-pane>
            <!-- <el-tab-pane name="5" :key="5">
              <div class="person-title" slot="label">直播记录</div>  
            </el-tab-pane>
             <el-tab-pane name="4" :key="4">
              <div class="person-title" slot="label">房间管理</div>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Row, Col, Tabs, TabPane, Button, Dialog } from 'element-ui';
  import PersonInfo from './PersonInfo.vue';
  // import PersonWallt from '@/components/MCenter/PersonWallt.vue';
  // import PersonEdit from './PersonEdit.vue';
  // import PersonCostDetalis from './PersonCostDetalis';
  import AnchorLiveLog from "./AnchorLiveLog";
  import Guildsigning from './Guildsigning';
  import Guildapply from './Guildapply';
  import Guildhome from './Guildhome';
  import Hostlist from './Hostlist';
  import Hostapply from './Hostapply';
  import Nowliving from './Nowliving';
  import Losswarn from './Losswarn';
  import Violation from './Violation';
  import Settledata from './Settledata';
  import Settleset from './Settleset';
  import Guildincomedata from './Guildincomedata';
  import Guildadministrator from './Guildadministrator';
  import Hostwatch from './Hostwatch';
  import Informationupdate from './Informationupdate';
  import mymanagement from '@/components/MCenter/mymanagement.vue';
  import Uniongroup from './Uniongroup';
  import Guildcash from './Guildcash';
  import Myguild from './Myguild';
  import Myincome from './Myincome';
  import AnchorRoom from './AnchorRoom';
  import AnchorApply from './AnchorApply';
  import Playdata from './Playdata';
  import Playset from './Playset';
  import Myearnings from './Myearnings';
  import TaskCenter from './TaskCenter';
  import Mymedal from './Mymedal';
  import Mywallet from './Mywallet';
  import SysMessage from './SysMessage';
  import Fansapply from './Fansapply';
  import { haveMessage,unionRole } from "@/api/api";


  export default {
    name: "PersonCenter",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [TabPane.name]: TabPane,
      [Tabs.name]: Tabs,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      // [nav-menu.name]: nav-menu,
      AnchorRoom,
      PersonInfo,
      Myincome,
      // PersonWallt,
      // PersonEdit,
      // PersonCostDetalis,
      AnchorApply,
      TaskCenter,
      Mymedal,
      Fansapply,
      SysMessage,
      Mywallet,
      Myearnings,
      Playdata,
      Playset,
      Myguild,
      Guildsigning,
      AnchorLiveLog,
      Guildhome,
      Guildapply,
      Hostlist,
      Hostapply,
      Nowliving,
      Losswarn,
      Violation,
      Settledata,
      Guildincomedata,
      Settleset,
      Guildcash,
      Guildadministrator,
      Uniongroup,
      Informationupdate,
      Hostwatch,
      mymanagement,
    },
    data() {
      return {
        show:false,
        show1:false,
        show2:false,
        show3:false,
        show4:false,
        showguildhome:false,
        showhost:false,
        showdata:false,
        showset:false,
        tabPosition: 'left',
        activeName: "0",
        edit: 1,
        dialogOpenVisible: false,
        costDetail: false,
        tabBool: [true, false, false],
        count:'',
        gname:'',
        endtime:'',
        menu:[],
      };
    },
    created() {
      // if(this.$route.query.isAuthor) this.activeName = "3"
    },
    mounted() {
      this.gethaveMessage()
      this.getunionRole()
    },
    methods: {
      //公会权限
      getunionRole(){
          unionRole().then((res) => {
              if(res.data.role==2){
                this.menu = res.data.menu.split(",")
                for(let i = 0;i<this.menu.length;i++){
                  if(this.menu[i]=='经纪人后台'){
                    this.showguildhome = true
                  }else if(this.menu[i]=='主播列表'){
                    this.showhost = true
                  }else if(this.menu[i]=='主播结算数据'){
                    this.showdata = true 
                  }else if(this.menu[i]=='工会设置'){
                    this.showset = true
                  }
                }
              }else if(res.data.role==1){
                this.showguildhome = true
                this.showhost = true
                this.showdata = true
                this.showset = true
              }
          })
      },
      //获取签约公会名字
      getname(n,m){
        this.gname = n;
        this.endtime = m;
        this.activeName = '16'
      },
      gethaveMessage() {
        haveMessage().then((res) => {
          if(res.data.isHave == 1) {
            this.count = true
          }
        })
      },
      handleClick(tab) {
        this.$emit('handleCancleTab');
        this.tabBool = this.tabBool.map((curreVal, index) => {
          if (tab.name < 4) {
            if (tab.name == 0) {
              this.edit = 1;
            }
            // if (tab.name == 2) {
            //   this.costDetail = false;
            // }
            if (tab.name == index) {
              return true;
            } else {
              return false;
            }
          } else {
            this.$emit('handleClick', tab);
          }
        })
      },
      AnchorApply(data) {
        this.activeName = data
      },
      showInfoEdit(data) {
        this.edit = data
      },
      showCostDetail(data) {
        this.edit = data
      },
      back(data) {
        this.edit = data
      },
      showWalt() {
        this.$refs.wallt.show(true)
        // if (data) {
        //   this.activeName = '2';
        //   this.tabBool[2] = true;
        // }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/_index.scss";

  .person-center {
    overflow: auto;
    /*text-align: center;*/
    width: 100%;
    height: 100%;

    ::v-deep .el-divider--horizontal {
      width: auto;
      margin: 24px 0;
    }

    ::v-deep .el-tabs__content {
      /*background-color: #fff;*/
      /*margin-left: 10px;*/
      /*padding: 30px 30px 50px 30px;*/
    }

    .person-center-tabs {
      width: 100%;
      height: 55px;
      line-height: 55px;
      font-size: 14px;
      text-align: center;
      /*margin-right: 5px;*/
      .person-subtitle {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 18px;

        img {
          width: 19px;
          height: 19px;
        }
      }
    }

    .left-table {
      .el-tabs {
          ::v-deep #tab-0 {
            @extend .person-center-tabs
          }
        @for $i from 2 through 7 {
          ::v-deep #tab-#{$i} {
            @extend .person-center-tabs
          }
        }
      }

      ::v-deep .el-tabs__item.is-active {
        color: #F9772A;
      }
      ::v-deep .el-tabs__item {
        color: #666;
        padding: 0 30px;
        width: 200px;
        font-weight: 600;
        height: 55px;
        line-height: 55px;
      }

      ::v-deep .el-tabs__active-bar {
        background-color: #F9772A;
      }

      ::v-deep .el-tabs__item:hover {
        color: #F9772A;
        cursor: pointer;
      }

      ::v-deep .el-tabs__item.is-disabled {
        height: 55px;
        line-height: 55px;
      }

      ::v-deep .el-tabs__item .person-title {
        height: 55px;
        line-height: 55px;
        font-size: 20px;
        text-align: left;
      }
    }

    ::v-deep .el-tabs--left .el-tabs__header.is-left {
      margin-right: 34px;
      background-color: #fff;
    }

    ::v-deep .el-tabs--left .el-tabs__nav-wrap.is-left::after,
    ::v-deep .el-tabs--left .el-tabs__nav-wrap.is-right::after,
    ::v-deep .el-tabs--right .el-tabs__nav-wrap.is-left::after,
    ::v-deep .el-tabs--right .el-tabs__nav-wrap.is-right::after {
      width: 0px;
      height: 0px;
    }

    ::v-deep .el-tabs--left .el-tabs__active-bar.is-left {
      /*height: 0;*/
      top: 10px;
      left: 0;
      right: auto;
      height: 34px!important;
      width: 4px;

    }
  }
</style>


<style lang="scss">
  .fl {
    float: left;
  }

  .ml5 {
    margin-left: 8px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .person-btn {
    margin-top: 60px;
    text-align: center;

    ::v-deep .el-button {
      width: 152px;
      height: 40px;
      font-size: 15px;
    }
  }

  .code-down {
    // position: relative;
    .code-show {
      // width: 180px;
      // height: 202px;
      margin-top: -30px;
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
      // box-shadow: 1px 2px 10px 0px #9B9B9B;
      .title {
        font-size: 16px;
        color: #333;
        line-height: 22px;
        font-weight: 500;
      }

      .info {
        margin-top: 10px;
        font-size: 12px;
        line-height: 17px;
        color: #666;
      }

      .code-pic {
        width: 120px;
        height: 120px;
        margin: 10px auto;
        border-radius: 4px;
        border: 0.5px solid #ccc;

        img {
          width: 110px;
          height: 110px;
          margin: 5px;
        }
      }

      .down-zhushou {
        margin-top: 0px;
        margin-bottom: -20px;
        height: 46px;
        line-height: 46px;
        // border-top: 1px solid #D9D9D9;
        font-size: 14px;

        /*a {*/
        /*  padding-left: 35px;*/
        /*  background: url('../../assets/icon_kt3.png') no-repeat left center;*/
        /*}*/
      }
    }
  }
  
  .count {
    color: rgb(255, 60, 60);
    background-color: rgb(255, 60, 60);
    border-radius: 150px;
    width: 6px;
    height: 6px;
    font-size: 12px;
    position: absolute;
    top: 20px;
    left: 112px;
  }
</style>

