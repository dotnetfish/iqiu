<template>
  <div class="live-header">
    <img class="header-logo" :src="channelInfo.avatarUrl" alt="">
    <div class="header-content">
      <h3 class="title">
        {{ channelInfo.name }}
        <router-link target="_blank" class="label" v-show="channelInfo.typeName"
                     :to="{ path: '/zhibo', query: { 'typeId': channelInfo.type || 'all', name: channelInfo.typeName }}">
          {{ channelInfo.typeName }}
        </router-link>
      </h3>
      <div class="label-wrap">
        <span>主播：{{ channelInfo.uname }}</span>
        <span style="margin-left: 40px">房间号：{{ channelInfo.id }}</span>
        <i class="icon icon2"></i> <span>{{ channelInfo.onlinescore }}</span>
      </div>
    </div>
    <div class="header-like">
      <div class="count">{{ channelInfo.followCount }}</div>
      <div class="like" :class="{'follow': follow}" @click.stop="handleLike">
<!--        <i :class="{'follow': follow}"></i>-->
        {{follow?
        '已关注':'关注'}}
      </div>
    </div>
  </div>
</template>

<script>
    import { attentionAnchor, attentionCancelAnchor } from '@/api/liveroom'
    import { throttle } from "@/utils/debounceAndthrottle";

    export default {
        name: 'LiveroomHeader',
        props: {
            channelInfo: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            follow: {
                type: Boolean,
                defalut: false
            }

        },
        computed: {
            isLogin() {
                return this.$store.getters.isLogin
            }
        },
        methods: {
            handleLike: throttle(function () {
                console.log('like click');
                if (!this.isLogin) {
                    return this.$emit('login')
                } else if (this.follow) {
                    return attentionCancelAnchor({ cid: this.channelInfo.id }).then(res => {
                        console.log(res);
                        this.$emit('update:follow', false)
                        // this.$emit('updateChannelInfo')
                        --this.channelInfo.followCount

                    })
                } else if (!this.follow) {
                    return attentionAnchor({ cid: this.channelInfo.id, channel: 'PC_SITE' }).then(res => {
                        console.log(res);
                        this.$emit('update:follow', true)
                        // this.$emit('updateChannelInfo')
                        ++this.channelInfo.followCount

                    })
                }
            }, 1000),
            // handleJump(roomId) {
            //   // 跳转页面
            //   const { href } = this.$router.resolve(`/${ roomId }`)
            //   window.open(href, "_blank");
            // }
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .live-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 97px;
    background-color: #fff;
    border-radius: 10px 10px 0px 0px;

    .header-logo {
      flex:0 0 auto;
      padding: 0 20px;
      width: 65px;
      height: 65px;
      border-radius: 50%;
    }

    .header-content {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 50px;
      font-size: 14px;
      color: $color-title2;

      .title {
        margin: 0;
        padding: 0 0 4px;
        /*width: 250px;*/
        font-size: 20px;
        color: $color-title1;
        @include ellipsis;
        .label {
          margin-left: 10px;
          padding:1px 15px;
          font-size: 14px;
          line-height: 1;
          border-radius: 24px;
          color: $color-main;
          background-color: #fff;
          border: 1px solid $color-main;
        }
      }

      .label-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .label {
          color: $color-main;
          cursor: pointer;
        }

        .icon {
          margin-left: 20px;
          margin-right: 7px;
          width: 12px;
          height: 12px;

          /*&:nth-of-type(1) {*/
          /*  margin-left: 0;*/
          /*}*/
        }

        @for $i from 0 through 2 {
          .icon#{$i} {
            background: url('~@/assets/img/live-header-icon' +$i+ '.png') 0 0 no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    .header-like {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      margin-top: 10px;
      width: 172px;
      height: 34px;

      border-radius: 4px;
      overflow: hidden;
      font-size: 14px;

      .count {
        flex-basis: 50%;
        height: 34px;
        line-height: 34px;
        background-color: $bg-tab;
        color: $color-title3;
        text-align: center;
        @include ellipsis;
      }

      .like {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-basis: 50%;
        height: 100%;
        color: #fff;
        background-color: $color-main;
        cursor: pointer;

        &.follow {
          opacity: .7;

          i {
            background: url('~@/assets/img/live-header-like-o.png') 0 0 no-repeat;
            background-size: 100%;
          }
        }

        i {
          margin-right: 5px;
          width: 21px;
          height: 21px;
          background: url('~@/assets/img/live-header-like.png') 0 0 no-repeat;
          background-size: 100%;

          /*&.follow {*/
          /*opacity: .7;*/
          /*display: none;*/
          /*background: url('~@/assets/img/live-header-like-follow.png') 0 0 no-repeat;*/
          /*background-size: 100%;*/
          /*}*/
        }

      }
    }
  }

</style>
