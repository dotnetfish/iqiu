<template>
  <div class="anchor-room room me-wrap">
    <section v-show="!isShowSelectGame">
      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="1" :key="1">
            <div slot="label">
              <span style="font-size: 16px">礼物收入</span>
            </div>
            <Giftincome v-if="active==1 && !isShowSelectGame" @showSelectGame="isShowSelectGame = true"></Giftincome>
          </el-tab-pane>
          <el-tab-pane name="2" :key="2">
            <div slot="label">
              <span style="font-size: 16px">礼物清单</span>
            </div>
            <Giftlisting v-if="active==2"></Giftlisting>
          </el-tab-pane>
          <!-- <el-tab-pane name="3" :key="3">
            <div slot="label">
              <span style="font-size: 16px">贵宾收入</span>
            </div>
            <Vipincome v-if="active==3"></Vipincome>
          </el-tab-pane> -->
        </el-tabs>
      </el-row>
    </section>

  </div>
</template>

<script>
  import Vipincome from './Vipincome.vue';
  import Giftincome from "./Giftincome";
  import Giftlisting from "./Giftlisting";
  export default {
    name: "Myincome",
    components: {
      Giftincome,
      Giftlisting,
      Vipincome,
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

