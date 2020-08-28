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
                            <div class="person-title" slot="label">个人中心</div>
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
            <el-tab-pane disabled>
              <div slot="label" class="person-title">
                主播相关
              </div>
            </el-tab-pane>
            <el-tab-pane label="申请主播" name="3" :key="3">
              <div slot="label" class="person-subtitle">
                <div class="ml5">申请主播</div>
              </div>
              <AnchorApply></AnchorApply>
            </el-tab-pane>
            <el-tab-pane name="6" :key="6">
              <div class="person-title" slot="label">任务中心</div>
              <!-- <TaskCenter></TaskCenter> -->
            </el-tab-pane>
            <el-tab-pane name="5" :key="5">
              <div class="person-title" slot="label">直播记录</div>  
            </el-tab-pane>
             <el-tab-pane name="4" :key="4">
              <div class="person-title" slot="label">房间管理</div>
            </el-tab-pane>
            <slot></slot>
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
  import AnchorApply from './AnchorApply';
  import TaskCenter from './TaskCenter';

  export default {
    name: "PersonCenter",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [TabPane.name]: TabPane,
      [Tabs.name]: Tabs,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      PersonInfo,
      // PersonWallt,
      // PersonEdit,
      // PersonCostDetalis,
      AnchorApply,
      TaskCenter
    },
    data() {
      return {
        tabPosition: 'left',
        activeName: "0",
        edit: 1,
        dialogOpenVisible: false,
        costDetail: false,
        tabBool: [true, false, false],
      };
    },
    created() {
      if(this.$route.query.isAuthor) this.activeName = "3"
    },
    methods: {
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
        color: $color-main;
      }
      ::v-deep .el-tabs__item {
        color: #666;
        padding: 0 30px;
        width: 200px;
        font-weight: 600;
      }

      ::v-deep .el-tabs__active-bar {
        background-color: $color-main;
      }

      ::v-deep .el-tabs__item:hover {
        color: $color-main;
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
</style>

