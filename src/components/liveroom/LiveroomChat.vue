<template>
  <div class="live-chat">
    <!--横幅礼物-->
    <transition-group name="gift" appear tap="div" class="gift-item">
      <div v-for="(item) in showingList" :key="item.vueKey">
        <div v-if="item.active" class="gift-item-wrap" :class="classObject(item)">
          <img class="gift-avatar" :src="item.user.avatar" alt="">
          <div class="gift-content">
            <div class="gift-title">{{ item.user.name }}</div>
            <div class="gift-name">送出 {{ item.gift.name }}</div>
          </div>
          <img class="gift-icon" :src="item.gift.picture" alt="">
          <div class="gift-count font-gift">x <span>{{ item.gift.number }}</span></div>
        </div>
      </div>
    </transition-group>

    <!--聊天室-->
    <section class="chat-wrap">
      <!-- 举报框 -->
      <!-- <div v-if="flag==true" class="reportborder">
        <div style="display:flex">
          <img :src="userimg" style="width:56px;height:56px;margin-left:27px;margin-top:3px">
          <div style="margin-top:36px;margin-left:5px;font-size:14px">{{username}}</div>
          <img src="@/assets/close2.png" @click="flag = false" style="margin-top:36px;margin-left:98px;width:16px;height:16px;cursor: pointer;">
        </div>
        <div style="margin-top:14px;margin-left:14px;font-size:14px;height:50px;white-space: normal;width: 92%;word-break: break-all;">个性签名:{{usersign}}</div>
        <div class="reportbuttom" @click="reportinfo()">举报用户</div>
      </div> -->
      <!-- 举报内容 -->
      <div v-if="flag1==true" class="reportborderinfo">
        <div style="width: 306px;height: 29px;background: #1BB5EC;">
          <span style="margin-left:14px;color:#ffffff">用户举报</span>
          <img src="@/assets/close3.png" @click="flag1 = false" style="margin-top:6px;margin-left:200px;width:16px;height:16px;cursor: pointer;">
        </div>
        <div style="display:flex">
          <div class="reportbuttom1" >举报头像</div>
          <div class="reportbuttom2" >举报昵称</div>
          <div class="reportbuttom1" @click="reportbaninfo()">举报弹幕</div>
        </div>
      </div>
      <!-- 举报弹幕 -->
      <div v-if="flag2==true" class="reportbaninfo">
        <div style="width: 306px;height: 30px;background: #1BB5EC;display:flex">
          <div style="margin-left:126px;color:#ffffff;font-size:14px;height: 30px;line-height: 30px;">弹幕举报</div>
          <div><img src="@/assets/close3.png" @click="flag2 = false" style="margin-top:6px;margin-left:94px;width:16px;height:16px;cursor: pointer;"></div>
        </div>
        <div class="name-content">
          <div style="margin-top:14px;margin-left:14px;font-size:14px;white-space:normal;word-break:break-all;width:92%;letter-spacing:1px;line-height:125%">{{username}}:{{usercontent}}</div>
        </div>
        <div style="margin-left:20px;margin-top:16px;font-size:14px;color:#333333">举报类型</div>
        <div style="display:flex;flex-wrap:wrap">
          <div class="reportbuttom3" >垃圾广告营销</div>
          <div class="reportbuttom1" >侮辱谩骂</div>
          <div class="reportbuttom1" >违法反动</div>
          <div class="reportbuttom1">淫秽色情</div>
          <div class="reportbuttom3">嘲讽/不友善</div>
        </div>
      </div>
      <!--聊天内容-->
      <section ref="chat" class="chat" id="chat" @scroll="chatScroll" @click.stop="handleBan">
        <div class="chat-item" v-for="(item,index) in msgList" :key="item.sign">
          <!--消息三种类型 1 发言 name: content 2 礼物 name num pic 3 系统通知 颜色不同-->
          <!--文本消息-->
          <template v-if="item._lctype === -1">
            <img class="role-icon" v-if="item._lcattrs.user.role != 0"
                 :src="require('@/assets/img/live-chat-role'+item._lcattrs.user.role+'.png')" alt="">
              <div style="position:relative;">
                <img :src="item._lcattrs.user.fansCardUrl" style="width: 42px;height: 16px;margin-right:6px;" v-if="item._lcattrs.user.fansCardUrl">
                <span style="position:absolute;color:#FFFFFF;left:6px;text-align:center;top:-1px;width:45px;transform: scale(0.7);">{{item._lcattrs.user.fansCardName}}</span>
                <img :src="item._lcattrs.user.icon" style="width: 40px;height: 16px;margin-right:6px;" v-if="item._lcattrs.user.icon">
                <span class="item-name" :data-item="index" @click="reportuser(item._lcattrs.user.name,item._lcattrs.user.avatar,item._lcattrs.user.sign,item._lctext)">{{ item._lcattrs.user.name }}: </span>
              <span class="item-content" :style="{'color':item._lcattrs.msgColor}" v-if="item._lcattrs.msgColor">{{ item._lctext }}</span>
              <span class="item-content" :style="{'color':'#000000'}" v-else>{{ item._lctext }}</span>
              </div>
              <!-- <div style="margin-right:4px;">
                <img :src="item.icon" style="width: 46px;height: 18px;margin-top: 3px;">
              </div>
              <span class="item-name" :data-item="index">{{ item._lcattrs.user.name }}:</span>
              <span class="item-content" :style="{'color':col}">{{ item._lctext }}</span> -->
          </template>
          <!--系统消息&禁言-->
          <template v-else-if="item._lctype === 1 || item._lctype === 5">
            <span class="main"
                  :class="{'ban':item._lctype === 5, 'hongbao': item._lctype === 1 && (item._lcattrs && item._lcattrs.sm.type === 0)}">{{ item._lctext }}</span>
          </template>
          <!--礼物  老张涨涨送给主播甜甜圈 66-->
          <template v-else-if="item._lctype === 2">
            <span class="gift">{{ item._lcattrs.user.name }}送给主播{{ item._lcattrs.gift.name }}</span>
            <img class="gift-icon" :src="item._lcattrs.gift.picture" alt="">
            <span class="gift">{{ item._lcattrs.gift.number }}</span>
          </template>
          <!--<span v-if="item._lctype === 1" class="item-name" :data-item="item.content">{{ item._lctext }}</span>-->
        </div>
      </section>
      <!--新消息-->
      <div class="new-message-btn" v-show="newMessage > 0" @click.stop="handleScrollToEnd"> {{newMessage}}个新消息</div>
      <!--禁言弹窗-->
      <LiveroomBan ref="ban" :userInfo="userInfo"></LiveroomBan>
      <!--红包-->
<!--      <LiveroomHongbao :userLogin="userLogin" v-for="(item,index) in hongbaoList" :key="index"-->
<!--                       :hongbaoItem="item" @login="$emit('login')"  @receiveHongBaoSuccess="$emit('hongBaoSuccess')"></LiveroomHongbao>-->
      <!--礼物gif-->
      <LiveroomGif :giftItem="giftItem" :giftListToObject="giftListToObject"></LiveroomGif>
    </section>
  </div>
</template>

<script>
  import LiveroomBan from '@/components/liveroom/LiveroomBan'
  // import LiveroomHongbao from '@/components/liveroom/LiveroomHongbao'
  import LiveroomGif from '@/components/liveroom/LiveroomGif'
  import { accusationadd } from '@/api/api'

  import { debounce } from "@/utils/debounceAndthrottle";

  /*
  * 层级
  * 禁言菜单30>礼物特效25>红包20>礼物横幅15>榜单5>消息
  *
  * 礼物横幅 设计思路
  * showingList 展示中的列表 最大长度3 加入时添加setTimeout，如果展示时间内用户名称和礼物名称相同，则改变礼物数量并重新计算展示时间，时间到了查找showingList里（用户名称和礼物名称）的对应项并删除
  * taskList 任务列表 添加礼物信息push到最后，更新showingList时shift取出
  * updateShowingList  （条件是 展示区<3条、缓存区>0）区分入参 兼容同一人统一礼物已展示情况
  *
  * 礼物横幅样式规则
  * 0~0.99元
  * 1~99元
  * 100元~499元
  * 500元以上
  *
  * 优化点
  * 消失前 同一用户同一礼物 更新数量及重新计算展示时间 最多展示3个 遍历对比取值判断可以接受
  */
  export default {
    name: 'LiveroomChat',
    components: {
      LiveroomBan,
      // LiveroomHongbao,
      LiveroomGif
    },
    props: {
      giftItem: Object,
      userLogin: {
        type: Object,
        default: () => {
          return {}
        }
      },
      col: {
        type: String
      },
      userInfo: {
        type: Object,
        default: () => {
          return {}
        }
      },
      msgList: {
        type: Array,
        default: () => {
          return []
        }
      },
      hongbaoList: {
        type: Array,
        default: () => {
          return []
        }
      },
      giftListToObject: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    // computed: {
    //   classObject: function (item) {
    //     console.log(item);
    //     return {
    //       active: true,
    //       'text-danger': true
    //     }
    //   }
    // },
    watch: {
      // 弹幕中获取新的礼物
      giftItem: {
        handler: function (newValue) {
          // console.log(oldValue, 'oldValue');
          // console.log(newValue, 'newValue');
          if (!newValue) return;
          // 添加标识
          newValue.showId = newValue.gift.anchorName + '_' + newValue.gift.id
          newValue.active = false
          newValue.vueKey = new Date().getTime()
          let item = JSON.parse(JSON.stringify(newValue));
          this.taskList.push(item)
          this.$nextTick(() => {
            this.updateShowingList(item)
          })
        },
        immediate: false
      },
      // 弹幕信息
      msgList: {
        handler: function () {
          // console.log(oldValue, 'oldValue');
          // console.log(newValue, 'newValue');
          if (this.$refs.chat) {
            let scrollTarget = this.$refs.chat;
            // 到底或者 滚动高度大于视图高度
            let isScrollToEnd = (scrollTarget.scrollHeight - scrollTarget.scrollTop === scrollTarget.clientHeight) || (scrollTarget.scrollHeight <= scrollTarget.clientHeight + 15);// hack scrollHeight默认大于clientHeight问题

            console.log(scrollTarget.scrollTop, 'scrollTarget.scrollTop');
            console.log(scrollTarget.scrollHeight, 'scrollTarget.scrollHeight');
            console.log(scrollTarget.clientHeight, 'scrollTarget.clientHeight');
            console.log(isScrollToEnd, 'isScrollToEnd');

            this.$nextTick(() => {
              // 添加消息 有scrollTop 或者 内容>视口
              let isAddMessage = scrollTarget.scrollTop > 0 || scrollTarget.scrollHeight >= scrollTarget.clientHeight + 15
              console.log(isAddMessage);
              if (isScrollToEnd) {
                this.newMessage = 0;
                scrollTarget.scrollTop = scrollTarget.scrollHeight
              } else if (isAddMessage) {
                // 未显示的消息增加
                this.newMessage++
              }
            })
          }
        },
        immediate: false
      }
    },
    data() {
      return {
        // hongbaoList: [],
        banDialog: false,
        // scrollTarget: null,
        newMessage: 0, // 未显示的消息
        flag:false,
        flag1:false,
        flag2:false,
        username:'',
        userimg:'',
        usersign:'',
        usercontent:'',
        showingList: [
          // {
          //   showId: '冯曦妤_12915206930636800',
          //   active: true,
          //   vueKey: 1,
          //   "gift": {
          //     "anchorId": "6919164",
          //     "anchorName": "冯曦妤",
          //     "id": 12915206930636802,
          //     "name": "浪味仙",
          //     "number": 1,
          //     "picture": "https://pic.imifan.live/gifts/langXianXian/2019101819283913031452620677141.png",
          //     "showGift": true,
          //     "totalFee": 10
          //   },
          //   "pType": 0,
          //   "pid": "6919164",
          //   "sign": "286403A393C275046C3053CA7EBE4ADD",
          //   "user": {
          //     "avatar": "https://pic.imifan.live/avatar/2019103119455113183057850163209.png",
          //     "id": "3486074",
          //     "name": "晨曦吻月晨曦吻月曦吻月晨曦吻月曦吻月晨曦吻月晨曦吻月"
          //   }
          // }, {
          //   showId: '冯曦妤_12915206930636801',
          //   active: true,
          //   vueKey: 2,
          //   "gift": {
          //     "anchorId": "6919164",
          //     "anchorName": "冯曦妤",
          //     "id": 12915206930636802,
          //     "name": "浪味仙",
          //     "number": 1,
          //     "picture": "https://pic.imifan.live/gifts/langXianXian/2019101819283913031452620677141.png",
          //     "showGift": true,
          //     "totalFee": 10000
          //   },
          //   "pType": 0,
          //   "pid": "6919164",
          //   "sign": "286403A393C275046C3053CA7EBE4ADD",
          //   "user": {
          //     "avatar": "https://pic.imifan.live/avatar/2019103119455113183057850163209.png",
          //     "id": "3486074",
          //     "name": "晨曦吻月晨曦吻月曦吻月晨曦吻月曦吻月晨曦吻月晨曦吻月"
          //   }
          // }, {
          //   showId: '冯曦妤_12915206930636802',
          //   active: true,
          //   vueKey: 3,
          //   "gift": {
          //     "anchorId": "6919164",
          //     "anchorName": "冯曦妤",
          //     "id": 12915206930636802,
          //     "name": "浪味仙",
          //     "number": 1,
          //     "picture": "https://pic.imifan.live/gifts/langXianXian/2019101819283913031452620677141.png",
          //     "showGift": true,
          //     "totalFee": 10000000
          //   },
          //   "pType": 0,
          //   "pid": "6919164",
          //   "sign": "286403A393C275046C3053CA7EBE4ADD",
          //   "user": {
          //     "avatar": "https://pic.imifan.live/avatar/2019103119455113183057850163209.png",
          //     "id": "3486074",
          //     "name": "晨曦吻月晨曦吻月曦吻月晨曦吻月曦吻月晨曦吻月晨曦吻月"
          //   }
          // }, {
          //   showId: '冯曦妤_12915206930636803',
          //   active: true,
          //   vueKey: 4,
          //   "gift": {
          //     "anchorId": "6919164",
          //     "anchorName": "冯曦妤",
          //     "id": 12915206930636802,
          //     "name": "浪味仙",
          //     "number": 1,
          //     "picture": "https://pic.imifan.live/gifts/langXianXian/2019101819283913031452620677141.png",
          //     "showGift": true,
          //     "totalFee": 1000
          //   },
          //   "pType": 0,
          //   "pid": "6919164",
          //   "sign": "286403A393C275046C3053CA7EBE4ADD",
          //   "user": {
          //     "avatar": "https://pic.imifan.live/avatar/2019103119455113183057850163209.png",
          //     "id": "3486074",
          //     "name": "晨曦吻月晨曦吻月曦吻月晨曦吻月曦吻月晨曦吻月晨曦吻月"
          //   }
          // },
          // {
          //   showId: '冯曦妤_12915206930636802',
          //   active:true,
          //   vueKey:2,
          //   "gift": {
          //     "anchorId": "6919164",
          //     "anchorName": "冯曦妤",
          //     "id": 12915206930636802,
          //     "name": "浪味仙",
          //     "number": 1,
          //     "picture": "https://pic.imifan.live/gifts/langXianXian/2019101819283913031452620677141.png",
          //     "showGift": true,
          //     "totalFee": 10
          //   },
          //   "pType": 0,
          //   "pid": "6919164",
          //   "sign": "286403A393C275046C3053CA7EBE4ADD",
          //   "user": {
          //     "avatar": "https://pic.imifan.live/avatar/2019103119455113183057850163209.png",
          //     "id": "3486074",
          //     "name": "晨曦吻月"
          //   }
          // }
        ], // 展示中的礼物横条
        taskList: [] // 待展示的礼物横条
      }
    },
    created() {
      // test 红包
      // this.hongbaoList.push({
      //
      // })
      // this.hongbaoList.push({
      //
      // })
      // this.updateShowingList()
      // console.log(this.giftItem, 'giftItem');
    },
    mounted() {
      // this.scrollTarget = document.getElementById("chat")
    },
    methods: {
      //举报用户
      reportuser(name,img,sign,content){
        this.username = name;
        this.userimg = img;
        this.usersign = sign;
        this.usercontent = content;
        this.flag = true;
      },
      reportinfo(){
        this.flag = false;
        this.flag1 = true;
      },
      reportbaninfo(){
        this.flag1 = false;
        this.flag2 = true;
      },
      /**
       * 0~0.99元
       * 1~99元
       * 100元~499元
       * 500元以上
       * */
      classObject(item) {
        console.log(item.gift.totalFee);
        return {
          'gift-item-0': item.gift.totalFee >= 0 && item.gift.totalFee <= 99,
          'gift-item-1': item.gift.totalFee >= 99 && item.gift.totalFee <= 9900,
          'gift-item-2': item.gift.totalFee >= 10000 && item.gift.totalFee <= 49900,
          'gift-item-3': item.gift.totalFee >= 50000,
        }
      },
      // 点击用户姓名 判断条件权限 是否线上禁用弹窗
      handleBan(e) {
        console.log(e);
        // if (e.target.className.toLowerCase() == "item-name" && e.target.dataset.item) {
          this.$refs.ban.show(this.msgList[e.target.dataset.item])
          console.log(this.msgList[e.target.dataset.item]);
          console.log(e.target.dataset.item);
        // }
      },
      // 节流处理 滚动到底 push信息也会触发
      chatScroll: debounce(function (e) {
        if (e && e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight) {
          this.newMessage = 0;
          e.target.scrollTop = e.target.scrollHeight
        }
        console.log(e);
      }, 500, false),
      // chatScroll(e) {
      //   if (e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight) {
      //     this.newMessage = 0;
      //     e.target.scrollTop = e.target.scrollHeight
      //   }
      //   console.log(e);
      // },
      // 手动点击回到底部
      handleScrollToEnd() {
        let scrollTarget = this.$refs.chat;
        scrollTarget.scrollTop = scrollTarget.scrollHeight;
        this.newMessage = 0;
      },
      /**
       * 横幅显示时间
       * 大于100块，2分钟
       * 大于50块数目小于10块，1.5分钟
       * 大于10块小于50块并且礼物数小于10，显示1分钟
       * 其他情况是，3秒+礼物的总价格*3毫秒
       * 异常 3s
       */
      showingTime(totalFee) {
        if (isNaN(totalFee)) totalFee = 0;
        if (totalFee > 100 * 100) {
          return 1000 * 60 * 2;
        } else if (totalFee > 50 * 100) {
          return 1000 * 60 * 1.5;
        } else if (totalFee > 10 * 100) {
          return 1000 * 60 * 1;
        } else {
          return 1000 * 3 + totalFee * 3;
        }
      },
      /**
       * 移除过期横幅及更新定时器
       * @param type update/clear
       * @param item 展示项
       * @param callBack
       * @returns {number}
       */
      updateSetTimeout(type, item, callBack) {
        let timer = null;
        timer = setTimeout(() => {
          console.log(item.showId, 'showId');
          console.log(this.showingTime(item.gift.totalFee), '显示时间');

          // 离开动画
          item.active = type == 'update' ? true : false;
          // 通过showId更新位置
          let showId = item.showId
          let index = this.showingList.findIndex(item => (item.showId == showId))
          if (index !== undefined) this.showingList.splice(index, 1)

          if (callBack) callBack()
        }, this.showingTime(item.gift.totalFee))

        // 清除绑定的定时器
        this.$once('hook:beforeDestroy', () => {
          console.log("hook:beforeDestroy");
          clearTimeout(timer);
        })
        return timer;
      },
      // 更新横幅
      updateShowingList(newMessage) {
        console.log('updateShowingList----start');

        let isUpdate = false; // 更新现有横幅/需要继续插入显示列表
        // 优先判断是否是 同一用户用一种礼物
        if (newMessage && this.showingList.length > 0 && this.showingList.length < 3) {
          console.log(newMessage, 'newMessage');
          // 显示两个同名字同礼物的横幅  更新显示的时间是第一个时间
          this.showingList.forEach((item) => {
            if (isUpdate) return;
            if (item.showId == newMessage.showId) {
              console.log('重复遍历');
              // 有在显示的横幅 移除队列最新推入项
              this.taskList.pop()
              // 更新显示的横幅
              item.gift.number = item.gift.number + newMessage.gift.number
              // 更新定时器
              clearTimeout(item.timer);
              item.timer = this.updateSetTimeout('update', item);
              isUpdate = true;
            }
          })
        }

        console.log(isUpdate, 'isUpdate');
        if (!isUpdate && this.showingList.length < 3 && this.taskList.length > 0) {
          const item = this.taskList.shift()
          // 进场动画
          item.active = true;
          // 定时移除显示
          item.timer = this.updateSetTimeout('clear', item, this.updateShowingList)

          // item.timer = setTimeout(() => {
          //   let showId = item.showId;
          //
          //     // 离开动画
          //   item.active = true;
          //   console.log(item.gift.anchorName,'item.gift.anchorName');
          //
          //   let index = this.showingList.findIndex((item,index) => {
          //     console.log(this.showingList[index].gift.anchorName);
          //     return (item.showId == showId)
          //   })
          //   if(index !== undefined) this.showingList.splice(index,1)
          //   // 更新队列
          //   this.updateShowingList()
          //
          // }, this.showingTime(item.gift.totalFee))

          this.showingList.push(item);
        }

        console.log('updateShowingList----end');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .live-chat {
    position: relative;

    .chat-wrap {
      position: relative;
      height: calc(74vh - 260px);
      border-top: 1px solid $color-border;
      border-bottom: 1px solid $color-border;
    }

    .gift-item {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 15;
      width: 100%;
      line-height: 1;

      .gift-item-wrap {
        position: relative;
        display: flex;
        height: 100%;

        .gift-avatar {
          position: absolute;
          left: 0;
          top: 0;
          margin-top: -5px;
          width: 60px;
          height: 60px;
          box-sizing: border-box;
          border: 3px solid #FFEDBF;
          border-radius: 50%;
        }

        .gift-content {
          width: 144px;
          padding-left: 17px;
        }

        .gift-title {
          margin-top: 10px;
          margin-bottom: 4px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 244, 157, 1);
          text-shadow: 1px 1px 1px rgba(45, 45, 45, 0.45);
          @include ellipsis(1);
        }

        .gift-name {
          font-size: 12px;
          color: #fff;
        }

        .gift-icon {
          margin-top: -12px;
          margin-right: 12px;
          width: 48px;
          height: 48px;
        }

        .gift-count {
          margin-top: 6px;
          font-size: 24px;
          color: #3B90FF;

          span {
            font-size: 38px;
          }
        }
      }

      .gift-item-0 {
        margin-top: 32px;
        height: 49px;
        background: url('~@/assets/img/live-gift-bg0.png') 0 0 no-repeat;
        background-size: 100% 100%;

        .gift-count {
          color: #3B90FF;
        }

        .gift-avatar {
          display: none;
        }
      }

      .gift-item-1 {
        margin-top: 32px;
        height: 49px;
        background: url('~@/assets/img/live-gift-bg1.png') 0 0 no-repeat;
        background-size: 100% 100%;

        .gift-count {
          color: #ED5B1E;
        }

        .gift-avatar {
          display: none;
        }
      }

      .gift-item-2 {
        margin-top: 32px;
        height: 53px;
        padding-left: 30px;
        background: url('~@/assets/img/live-gift-bg2.png') 0 0 no-repeat;
        background-size: 100% 100%;
        background-clip: content-box;

        .gift-count {
          color: #FF6D15;
        }

        .gift-content {
          padding-left: 36px;
          width: 90px;
        }

        .gift-title {
          margin-top: 12px;
          font-size: 14px;
        }

        .gift-icon {
          margin-top: -15px;
          margin-right: 8px;
          width: 60px;
          height: 60px;
        }
      }

      .gift-item-3 {
        margin-top: 32px;
        height: 53px;
        padding-left: 30px;
        background: url('~@/assets/img/live-gift-bg3.png') 0 0 no-repeat;
        background-size: 100% 100%;
        background-clip: content-box;

        .gift-count {
          color: #4967F0;
        }

        .gift-content {
          padding-left: 36px;
          width: 90px;
        }

        .gift-title {
          margin-top: 12px;
          font-size: 14px;
        }

        .gift-icon {
          margin-top: -15px;
          margin-right: 8px;
          width: 60px;
          height: 60px;
        }
      }
    }

    .chat {
      height: 100%;
      padding: 0 15px;
      /*height: calc(100vh - 490px);*/
      font-size: 12px;
      line-height: 18px;
      color: $color-title2;

      overflow-x: hidden;
      overflow-y: scroll;

      .main {
        color: $color-main;
      }

      .ban {
        color: $color-ban;
      }

      .hongbao {
        color: $color-red-envelope;
      }

      .gift {
        color: $color-gift;
      }


      .chat-item {
        display: flex;
        align-items:flex-start;
        padding: 7px 0;
      }

      .item-name {
        flex: 1;
        cursor: pointer;
        height: 24px;
        font-size: 14px;
        line-height: 24px;
        @extend .main;
      }
// 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
      .item-content {
        margin-left: 4px;
        height: 24px;
        line-height: 24px;
        white-space: normal;
        word-break: break-all;
        font-size: 14px;
        cursor: default;
        // color: $color-title2;
        // color: col;
      }

      .gift-icon {
        width: 32px;
        height: 32px;
      }

      .role-icon {
        margin-right: 4px;
        width: 26px;
        height: 14px;
        margin-top: 2px;
      }
    }

    .new-message-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: rgba(246, 249, 255, 1);
      cursor: pointer;
    }
  }

  .reportborder{
  width: 314px;
  height: 165px;
  background: url(../../assets/rank/report.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  overflow: hidden;
  position: fixed;
  z-index: 999;
  margin-top: 108px;
  margin-left: 20px;
  }

  .reportborderinfo{
  width: 306px;
  height: 93px;
  box-shadow: 0px 2px 4px 0px #D8D8D8;
  position: fixed;
  background: white;
  z-index: 999;
  margin-top: 108px;
  margin-left: 20px;
  }

  .reportbaninfo{
  width: 306px;
  height: 417px;
  box-shadow: 0px 2px 4px 0px #D8D8D8;
  position: fixed;
  background: white;
  z-index: 999;
  margin-top: 22px;
  margin-left: 20px;
  }

  .reportbuttom{
    width: 64px;
    height: 20px;
    background: #FFFFFF;
    border-radius: 5px;
    border: 1px solid #999999;
    margin-left: 20px;
    font-size: 12px;
    text-align: center;
    line-height: 19px;
    cursor: pointer;
  }

  .reportbuttom1{
    width: 64px;
    height: 20px;
    background: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #999999;
    margin-left: 20px;
    font-size: 12px;
    text-align: center;
    line-height: 19px;
    margin-top: 20px;
    cursor: pointer;
    color:#666666;
  }

  .reportbuttom2{
    width: 64px;
    height: 20px;
    background: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #999999;
    margin-left: 20px;
    font-size: 12px;
    text-align: center;
    line-height: 19px;
    margin-top: 20px;
    color: #666666;
    cursor: pointer;
  }

  .reportbuttom3{
    width: 88px;
    height: 20px;
    background: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #999999;
    margin-left: 20px;
    font-size: 12px;
    text-align: center;
    line-height: 19px;
    margin-top: 20px;
    color: #666666;
    cursor: pointer;
  }

  .name-content{
    width: 286px;
    height: 91px;
    background: #F2F2F2;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
  }
</style>
