<!--Created by fly on 2019/12/30-->
<template>
  <div class="anchor-room room me-wrap">
<!--    <LiveOptionSelectGame v-show="isShowSelectGame" @back="isShowSelectGame=false"></LiveOptionSelectGame>-->
    <section v-show="!isShowSelectGame">
<!--      <el-row class="title">-->
<!--        <span>房间管理</span>-->
<!--      </el-row>-->
      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane name="1" :key="1">
            <div slot="label">
              <span style="font-size: 16px">房间设置</span>
            </div>
            <live-option v-if="active==1 && !isShowSelectGame" @showSelectGame="isShowSelectGame = true"></live-option>
          </el-tab-pane> -->
          <el-tab-pane name="1" :key="1">
            <div slot="label">
              <span style="font-size: 16px">房管名单</span>
            </div>
            <room-management v-if="active==1 && !isShowSelectGame" @showSelectGame="isShowSelectGame = true"></room-management>
          </el-tab-pane>
          <el-tab-pane name="3" :key="3">
            <div slot="label">
              <span style="font-size: 16px">封禁名单</span>
            </div>
            <muted-management v-if="active==3">
            </muted-management>
          </el-tab-pane>
          <el-tab-pane name="4" :key="4">
            <div slot="label">
              <span style="font-size: 16px">操作记录</span>
            </div>
            <operation v-if="active==4">
            </operation>
          </el-tab-pane>
          <!-- <el-tab-pane name="2" :key="2">
            <div slot="label">
              <span style="font-size: 16px">我管理的房间名单</span>
            </div>
            <mymanagement v-if="active==5">
            </mymanagement>
          </el-tab-pane> -->
<!--          <el-tab-pane name="4" :key="4">-->
<!--            <div slot="label">-->
<!--              <span style="font-size: 16px">发言要求</span>-->
<!--            </div>-->
<!--            <ForbidOption v-if="active==4">-->
<!--            </ForbidOption>-->
<!--          </el-tab-pane>-->
        </el-tabs>
      </el-row>
    </section>

  </div>
</template>

<script>
  import { TabPane, Tabs, Row, Col } from 'element-ui';
  import RoomManagement from '../../components/MCenter/RoomManagement.vue';
  import MutedManagement from '../../components/MCenter/MutedManagement.vue';
  import Operation from '../../components/MCenter/Operation.vue';
  // import mymanagement from '../../components/MCenter/mymanagement.vue';
  import LiveOption from "./LiveOption";
  // import ForbidOption from "./ForbidOption";
  // import LiveOptionSelectGame from "./LiveOptionSelectGame";

  export default {
    name: "AnchorRoom",
    components: {
      [TabPane.name]: TabPane,
      [Tabs.name]: Tabs,
      [Row.name]: Row,
      [Col.name]: Col,
      RoomManagement,
      MutedManagement,
      LiveOption,
      Operation,
      // mymanagement
      // ForbidOption,
      // LiveOptionSelectGame
    },
    data() {
      return {
        active: 1,
        activeName: '1',
        isShowSelectGame:false,
      };
    },
    methods: {
      handleClick(tab) {
        this.active = tab.name
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .title {
    margin-bottom: 20px;
    font-size: 22px;
    @extend .bold;
  }

  .anchor-room.room {
    ::v-deep #tab-1, ::v-deep #tab-2, ::v-deep #tab-3, ::v-deep #tab-4 {
      width: 100px !important;
      height: 40px !important;
      line-height: 40px !important;
      font-size: 18px;
      text-align: center;
      padding: 0;
    }

    ::v-deep .el-tabs__item.is-active {
      background-color: transparent;
    }

    ::v-deep .el-tabs__active-bar.is-top {
      width: 100px !important;
      height: 2px;
    }
  }
</style>

