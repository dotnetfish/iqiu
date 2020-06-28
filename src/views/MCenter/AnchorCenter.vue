<!--主播中心-->
<!--Created by fly on 2019/12/27-->
<template>
  <person-center @handleClick="handleClick" @handleCancleTab="handleCancleTab">
    <el-tab-pane label="房间管理" style="min-width: 500px" name="4" :key="4">
      <div slot="label" class="person-subtitle">
        <div class=" ml5">房间管理</div>
      </div>
      <anchor-room @back="back"></anchor-room>
    </el-tab-pane>
    <el-tab-pane label="直播记录" style="min-width: 500px" name="5" :key="5">
      <div slot="label" class="person-subtitle">
        <div class=" ml5">直播记录</div>
      </div>
      <anchor-live-log></anchor-live-log>
    </el-tab-pane>
<!--    <el-tab-pane label="我的收益" name="6" :key="6">-->
<!--      <div slot="label" class="person-subtitle">-->
<!--        <div class="ml5">我的收益</div>-->
<!--      </div>-->
<!--      <anchor-my-income @showInfoEdit="showInfoEdit" v-if="active==6&&edit==0"></anchor-my-income>-->
<!--      <person-edit v-if="active==6&&edit==2"></person-edit>-->
<!--      <anchor-withdraw-detalis v-if="active==6&&edit==3"></anchor-withdraw-detalis>-->
<!--      <anchor-income-detalis v-if="active==6&&edit==4"></anchor-income-detalis>-->
<!--    </el-tab-pane>-->
  </person-center>
</template>

<script>
  import { TabPane } from 'element-ui';
  import PersonCenter from './PersonCenter';
  // import PersonEdit from './PersonEdit';
  // import AnchorWithdrawDetalis from "./AnchorWithdrawDetalis";
  // import AnchorIncomeDetalis from "./AnchorIncomeDetalis";
  // import AnchorMyIncome from "./AnchorMyIncome";
  import AnchorLiveLog from "./AnchorLiveLog";
  import AnchorRoom from "./AnchorRoom";

  export default {
    name: "AnchorCenter",
    components: {
      [TabPane.name]: TabPane,
      // AnchorMyIncome,
      PersonCenter,
      // PersonEdit,
      // AnchorWithdrawDetalis,
      // AnchorIncomeDetalis,
      // LiveOption,
      AnchorLiveLog,
      AnchorRoom
    },
    data() {
      return {
        active: 1,
        tabBool: [false, true, false, false, false, false, false],
        edit: 0,
      };
    },
    methods: {
      handleClick(tab) {
        this.active = tab.name
        // this.tabBool = this.tabBool.map((curreVal, index) => {
        //   if (tab.name == 4) {
        //     this.edit = 1;
        //   }
        //   if (tab.name == index) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // })
      },
      showInfoEdit(data) {
        this.edit = data;
      },
      handleCancleTab() {
        this.edit = 0;
      },
      back(data) {
        this.active = data
      },
    }
  }
</script>


