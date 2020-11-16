<template>

  <div class="live-gif" v-show="showingList.length>0">
    <transition-group name="zoom-in" appear>
      <div class="gif-item" v-for="(item) in showingList" :key="item.vueKey">
        <img v-if="item.active && giftListToObject[item.gift.id]" class="gif-logo" :src="giftListToObject[item.gift.id].bigAnimationUrl" alt="">
      </div>
    </transition-group>
  </div>

</template>

<script>
  /*
 *
 * 设计思路
 * 只是默认取showList第一个展示 1s
 *
 */
  export default {
    name: 'LiveroomGif',
    props: {
      giftListToObject: {
        type: Object,
        default: () => {
          return {}
        }
      },
      giftItem: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        showingList: [], // 展示中的gif
        taskList: [] // 待展示的gif
      }
    },
    watch: {
      // gif
      giftItem: {
        handler: function (newValue) {
          // console.log(oldValue, 'oldValue');
          console.log(newValue, 'newValue');
          if (!newValue) return;
          // 添加标识
          newValue.vueKey = new Date().getTime()

          let item = JSON.parse(JSON.stringify(newValue));
          this.taskList.push(item)
          this.$nextTick(() => {
            this.updateShowingList()
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
       * @param item 展示项
       * @param callBack
       * @returns {number}
       */
      updateSetTimeout(item, callBack) {
        let timer = null;
        timer = setTimeout(() => {
          console.log(1000, '显示时间');
// 离开动画
          item.active = false;
          this.showingList.splice(0, 1)

          if (callBack) callBack()
        }, 2000)

        // 清除绑定的定时器
        this.$once('hook:beforeDestroy', () => {
          console.log("hook:beforeDestroy");
          clearTimeout(timer);
        })
        return timer;
      },
      // 更新弹幕
      updateShowingList() {
        console.log('updateShowingList----start-gif',this.showingList);
        console.log(this.giftListToObject,'giftListToObject');
        if (this.showingList.length === 0 && this.taskList.length > 0) {
          const item = this.taskList.shift()
          // 进场动画
          item.active = true;
          // 定时移除显示
          this.timer = this.updateSetTimeout(item, this.updateShowingList)
          this.showingList.push(item);
        }

        console.log('updateShowingList----end-gif');
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .live-gif {
    position: absolute;
    z-index: 25;
    top: 54px;
    left: 55px;
    width: 260px;
    height: 260px;

    .gif-logo {
      position: absolute;
      width: 260px;
      height: 260px;
    }
  }

</style>
