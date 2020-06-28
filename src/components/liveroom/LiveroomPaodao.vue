<template>
  <div class="live-paodao" ref="paodao-wrap">
    <div class="paodao-item" ref="paodao" v-for="item in showingList" :key="item.vueKey"
         @click.stop="handleJump(item._lcattrs.rw.anchorId)">
      <img class="paodao-logo" :src="showingList[0]._lcattrs.rw.picture" alt="">
      <!--<span>xxx</span>赠送给主播{{ messageItem._lcattrs.rw.anchorName }}1 个 满汉全席！快来围观吧!-->
      <div class="paodao-content">
        <div v-if="!showingList[0]._lcattrs.user">{{ showingList[0]._lctext }}</div>
        <div v-else><span>{{ showingList[0]._lcattrs.user.name }}</span>赠送给主播 <span>{{ showingList[0]._lcattrs.rw.anchorName }}</span>{{ showingList[0]._lcattrs.rw.number }}个{{ showingList[0]._lcattrs.rw.name }}！快来围观吧!</div>
        <!--{{ showingList[0]._lctext }}-->
      </div>
    </div>
    <!--{{ messageItem }}-->
  </div>
</template>

<script>
  /*
 *
 * 跑道 设计思路
 * 同礼物横幅 只是默认取showList第一个展示 展示时间和展示次数通过接口计算
 *
 * 功能点
 * 悬停暂停
 * 动态展示时间及次数
 */
  const Velocity = require("velocity-animate");
  export default {
    name: 'LiveroomPaodao',
    props: {
      messageItem: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    data() {
      return {
        showingList: [], // 展示中的跑道
        taskList: [] // 待展示的跑道
      }
    },
    watch: {
      // 跑道
      messageItem: {
        handler: function (newValue) {
          // console.log(oldValue, 'oldValue');
          // console.log(newValue, 'newValue');
          if (!newValue) return;
          // 添加标识
          newValue.vueKey = new Date().getTime()
          this.taskList.push(newValue)
          this.$nextTick(() => {
            this.updateShowingList(newValue._lcattrs.rw.times)
          })
        },
        immediate: false
      },
    },
    mounted() {
    },
    methods: {
      /**
       * 更新定时器
       * @param type update/clear
       * @param item 展示项
       * @param callBack
       * @returns {number}
       */
      updateSetTimeout(type, item, callBack) {
        let timer = null;
        timer = setTimeout(() => {
          console.log(item._lcattrs.rw.duration, '显示时间');

          this.showingList.splice(0, 1)

          if (callBack) callBack()
        }, item._lcattrs.rw.duration * item._lcattrs.rw.times)

        // 清除绑定的定时器
        this.$once('hook:beforeDestroy', () => {
          console.log("hook:beforeDestroy");
          clearTimeout(timer);
        })
        return timer;
      },
      // 更新弹幕
      updateShowingList() {
        console.log('updateShowingList----start');

        if (this.showingList.length === 0 && this.taskList.length > 0) {
          const item = this.taskList.shift()
          // 定时移除显示
          this.timer = this.updateSetTimeout('clear', item, this.updateShowingList)
          this.showingList.push(item);
          // 动画
          this.$nextTick(() => {
            this.animation(item._lcattrs.rw.times)
          })
        }

        console.log('updateShowingList----end');
      },
      // 执行动画
      animation(loop) {
        if (!this.$refs['paodao'][0] || !this.$refs['paodao-wrap']) return console.log('跑道初始化失败');

        let loops = loop || 0;
        Velocity(this.$refs['paodao'][0], { right: this.$refs['paodao-wrap'].clientWidth + this.$refs['paodao'][0].clientWidth }, {
          duration: this.showingList[0]._lcattrs.rw.duration,
          easing: 'linear',
          complete: () => {
            // 回到初始位置
            this.$refs['paodao'][0].style.right = 0;
            // 根据接口返回展示次数
            loops--;
            if (loops > 0) this.animation(loops);
          }
        })
      },
      mouseenter() {
        Velocity(this.$refs['paodao'][0], 'pause')
      },
      mouseleave() {
        Velocity(this.$refs['paodao'][0], 'resume')
      },
      handleJump(roomId) {
        console.log(roomId);
        const { href } = this.$router.resolve(`/${ roomId }`)
        window.open(href, "_blank");
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .live-paodao {
    position: absolute;
    top:0;
    z-index: 1;
    width: 100%;
    height: 100px;
    overflow: hidden;

    .paodao-item {
      position: absolute;
      top: 20px;
      transform: translate(100%);
      right: 0;
      padding-left: 25px;
      padding-right: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      word-break: keep-all;
      white-space: nowrap;
      height: 36px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      /*background-color: red;*/
      background: url("~@/assets/img/live-paodao-icon.png") center right no-repeat, url("~@/assets/img/live-paodao-line.png") 0 0 content-box repeat;
      background-size: 29px 36px, 100% 100%;
    }

    .paodao-logo {
      margin-left: -25px;
      margin-right: 10px;
      height: 55px;
      width: 55px;
    }

    .paodao-content {
      margin-right: 30px;
      span {
        color: #FFAC00;
      }
    }
  }

</style>
