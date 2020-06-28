<template>
  <section>
    <div class="ban-mask" v-if="banDialog" @click.stop.self="banDialog = false">
    </div>

    <transition name="el-fade-in-linear">
      <div class="ban-wrap" v-if="banDialog">
        <img :src="banUserInfo._lcattrs.user.avatar" alt="" class="ban-logo">
        <h3 class="ban-name">{{ banUserInfo._lcattrs.user.name }}</h3>
        <div class="ban-uid">UID:{{ banUserInfo._lcattrs.user.id }}</div>
        <!--        <div class="ban-btn" @click.stop="handleBan(item.value)" v-for="item in banList" :key="item.value">{{ item.title-->
        <!--          }}-->
        <!--        </div>-->
        <div class="ban-btn">
          房间禁言：
          <el-select v-model="roomBan" style="width:100px;margin-right:10px;" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" @click.stop="handleBan(roomBan, 0)">确定</el-button>
        </div>
        <div class="ban-btn" v-if="userInfo.channelRoleType===9">
          全站禁言：
          <el-select v-model="allBan" style="width:100px;margin-right:10px;" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" @click.stop="handleBan(allBan, 1)">确定</el-button>
        </div>
<!--        <div class="ban-btn" v-if="userInfo.channelRoleType===9" @click.stop="handleBan(4)">全站永久禁言</div>-->
        <div class="ban-btn" v-if="userInfo.channelRoleType===2" @click.stop="handleSetManager(0)">设为房管</div>
      </div>
    </transition>
  </section>
</template>

<script>
  /*
  * 主播和房管无法禁言已被禁言的人，提示”该用户已被禁言
  * 超管可再次禁言已被禁言的用户，效果为覆盖之前的禁言时间
  * 禁言后输入框部分显示禁言时间，且无法输入文字。
  * */

  import { forbidUser, setManager } from '@/api/liveroom';
  import { throttle } from "@/utils/debounceAndthrottle";
  import { Select, Option, Button } from 'element-ui';

  export default {
    name: 'LiveroomBan',
    props: {
      userInfo: Object, // channelRoleType 0(普通用户), 1(房管), 2(主播), 9(超管)
    },
    components: {
      [Select.name]: Select,
      [Option.name]: Option,
      [Button.name]: Button,
    },
    data() {
      return {
        options: [
          {
            key: 5,
            value: "10分钟"
          },
          {
            key: 6,
            value: "30分钟"
          },
          {
            key: 7,
            value: "1小时"
          },
          {
            key: 1,
            value: "24小时"
          },
          {
            key: 8,
            value: "3天"
          },
          {
            key: 2,
            value: "7天"
          },
          {
            key: 3,
            value: "30天"
          },
          {
            key: 9,
            value: "6个月"
          },
          {
            key: 4,
            value: "永久"
          }], // 禁言类型: 0 取消禁言; 5:10分钟, 6:30分钟, 7:1小时, 1:24小时, 8:3天, 2:7天, 3:30天, 9:6个月, 4:永久(20年)
        sending: false,
        banDialog: false,
        roomBan: "",
        allBan: "",
        banList: [{  // 0 取消禁言; 5:10分钟, 6:30分钟, 7:1小时, 1:24小时, 8:3天, 2:7天, 3:30天, 9:6个月, 4:永久(20年)
          value: 1,
          title: '禁言24小时'
        }, {
          value: 2,
          title: '禁言7天'
        }, {
          value: 3,
          title: '禁言30天'
        }],
        banUserInfo: {}
      }
    },
    mounted() {
    },
    methods: {
      show(item) {
        // 权限不足 ( 未使用当前用户被禁言 || this.userInfo.forbid)
        if (this.userInfo.channelRoleType === 0) return;
        this.roomBan = "";
        this.allBan = "";

        this.banDialog = true;
        this.banUserInfo = item;
        console.log(item);
      },
      handleBan: throttle(function (value, forbidRoomType) {
        console.log(value, 'ban');
        if(!value) {
          return this.Message.error({
            message: "请选择禁言天数",
          })
        }
        this.sending = true;
        return forbidUser({
          beForbidUid: this.banUserInfo._lcattrs.user.id,
          channelId: this.$route.params.liveroom,
          forbidType: value,
          forbidRoomType: forbidRoomType
        }).then(res => {
          console.log(res);
          this.banDialog = false;
          this.Message.success({
            message: res.msg,
          })
          this.sending = false;
          this.roomBan = "";
          this.allBan = "";
        }).catch(res => {
          if (res.data.msg) this.Message.error({
            message: res.data.msg,
          })
          this.sending = false;
          console.log(res);
        })
      }, 1000),
      handleSetManager: throttle(function (value) {
        console.log(value, 'ban');
        this.sending = true;
        return setManager({
          operator: value, // 操作:0 添加; 1 删除
          uid: this.banUserInfo._lcattrs.user.id
        }).then(res => {
          this.banDialog = false;
          this.Message.success({
            message: res.msg,
          })
          this.sending = false;
        }).catch(res => {
          if (res.data.msg) this.Message.error({
            message: res.data.msg,
          })
          this.sending = false;
        })
      }, 1000),
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .ban-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 29;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .ban-wrap {
    position: absolute;
    top: 54px;
    left: 50px;
    z-index: 30;
    width: 260px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 16px 0px rgba(30, 32, 39, 0.11);
    border-radius: 10px;
    text-align: center;

    .ban-btns {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .ban-logo {
      margin-top: 15px;
      margin-bottom: 8px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }

    .ban-name {
      margin: 0;
      font-size: 14px;
      color: $color-title1;
      @extend .bold;
    }

    .ban-uid {
      margin-top: 7px;
      margin-bottom: 7px;
      font-size: 12px;
      color: $color-title3;
    }

    .ban-btn {
      margin: 0 12px;
      height: 55px;
      line-height: 55px;
      font-size: 12px;
      color: $color-main;
      cursor: pointer;
      border-bottom: 1px solid #F4F4F4;

      &:nth-last-child(1) {
        border-bottom: 0;
        font-size: 14px;
      }
    }
  }
</style>
