<!--Created by fly on 2019/12/25-->
<template>
  <div class="person-edit me-wrap">
    <span class="title pointer" @click="$emit('back', 1)"><i class="el-icon-arrow-left"></i>修改资料</span>
    <div class="name">当前昵称：{{ userStatus.userInfo.uname }}</div>
    <el-input v-model="input" minlength="5" class="input-name" placeholder="本次修改需要2000球币"></el-input>
    <el-button type="primary" size="mini" class="save" @click="save">确定修改</el-button>
    <el-button type="primary" size="mini" class="cancel" @click="cancel">取消</el-button>
    <div class="tips">说明:</div>
    <div class="tips">1.第一次可免费修改昵称，以后每次修改呢称需要20000球币。</div>
    <div class="tips">2.新昵称需符合注册规范，可使用数字，字母，汉字，不超过5-30个字符。</div>
    <div class="tips">3.如遇服务器更新或其它问题导致昵称修改失败，请联系客服。</div>
    <div class="use-icon">修改头像</div>
    <el-row class="name-wrap">
      <el-col :span="8" :offset="5">
        <cropper @updataImg="updataImg"></cropper>
      </el-col>
      <el-col :span="5">
        <el-avatar class="avatar" :size="120" :src="squareUrl" style="background-color: transparent"></el-avatar>
        <div class="avatar-tips">预览头像</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Row, Col, Input, Button, Avatar, Message } from 'element-ui';
  import Cropper from '@/components/MCenter/Cropper.vue';
  import { updateUser, usersLoginInfo } from "@/api/mcenterapi";
  import storages from "@/utils/storage.js";

  export default {
    name: "PersonEdit",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Input.name]: Input,
      [Button.name]: Button,
      [Avatar.name]: Avatar,
      [Message.name]: Message,
      Cropper
    },
    data() {
      return {
        squareUrl: require('@/assets/img/user-avatar-default.png'),
        input: '',
      };
    },
    computed: {
      userStatus: {
        get() {
          return this.$store.state.userStatus
        },
        set(val) {
          this.$store.commit('updateUserStatus', val)
        }
      }
    },
    methods: {
      back() {
        this.$emit('back', 1)
      },
      save() {
        let data =
          {
            uname: this.input
          };
        this.updateUser(data, '名字修改成功')
      },
      cancel() {
        this.input = "";
      },
      updateUser(data, messages) {
        updateUser(data).then((response) => {
          if (response.code === 0) {
            this.usersLoginInfo()
            Message.success({
              message: messages,
            })
          } else {
            Message.error({
              message: response.error,
            })
          }
        })
          .catch(function (error) {
            // debugger
            Message.error({
              message: error.data.msg,
            })

          });
      },
      usersLoginInfo() {
        usersLoginInfo().then((response) => {
          if (response.code === 0) {
            this.squareUrl = response.data.avatarUrl || require('@/assets/img/user-avatar-default.png');
            // this.input = response.data.uname;
            // 更新vuex
            this.userStatus.userInfo.avatarUrl = response.data.avatarUrl
            this.userStatus.userInfo.uname = response.data.uname
            storages.setItem('userStatus', this.userStatus) // 用户信息存入storage
          } else {
            console.error(response.error);
          }
        })
          .catch(function (error) {
            console.error(error);
          })
      },
      updataImg(url) {
        this.squareUrl = url;
        let data =
          {
            avatarUrl: url
          };
        this.updateUser(data, '头像上传成功')
      }
    },

    mounted() {
      this.usersLoginInfo();
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .title {
    line-height: 30px;
    font-size: 22px;
    color: $color-title1;

    @extend .bold;
  }

  .name {
    text-align: left;
    margin: 30px 0 20px;

    line-height: 25px;
    font-size: 18px;
    color: $color-title1;
  }

  .input-name {
    width: 235px;
  }

  .save,.cancel {
    margin-left: 20px;
    padding: 0;
    width: 80px;
    height: 32px;

    font-size: 15px;
    color: #F9F9F9;
  }
  .cancel {
    color: $color-title1;
    background-color: #F2F2F2;
    border: 0 none;
  }

  .tips {
    margin-top: 6px;
    font-size: 12px;
    color: $color-title3;
    line-height: 17px;
  }

  .use-icon {
    margin-top: 70px;
    line-height: 25px;
    font-size: 18px;
    color: $color-title1;
    @extend .bold;
  }

  .avatar {
    margin-top: 45px;
  }

  .avatar-tips {
    width: 126px;
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(119, 119, 119, 1);
    line-height: 20px;
  }

  ::v-deep .el-input input::placeholder {
    color: $color-title3;
  }

  ::v-deep .el-input input {
    border-color: #979797;
  }

  ::v-deep .person-edit .name .input__inner {
    height: 30px;
  }
</style>
