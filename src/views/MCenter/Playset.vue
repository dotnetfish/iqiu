<template>
  <div class="anchor-room room me-wrap">
    <section v-show="!isShowSelectGame">
      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="1" :key="1">
            <div slot="label">
              <span style="font-size: 16px">直播设置</span>
            </div>
            <live-option v-if="active==1 && !isShowSelectGame" @showSelectGame="isShowSelectGame = true"></live-option>
          </el-tab-pane>
          <el-tab-pane name="2" :key="2">
            <div slot="label">
              <span style="font-size: 16px">发言设置</span>
            </div>
            <Speak v-if="active==2"></Speak>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </section>

  </div>
</template>

<script>
  import Speak from './Speak.vue';
  import LiveOption from "./LiveOption";
  export default {
    name: "Playset",
    components: {
      Speak,
      LiveOption,
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

