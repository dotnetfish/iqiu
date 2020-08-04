<template>
  <section class="apply me-wrap">
    <div
      style="font-size:24px;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:rgba(51,51,51,1);margin-bottom:20px;"
    >任务中心</div>
    <div class="baseinformation">
      <div style="margin-right:20px"><!-- <cropper @updataImg="updataImg"> -->
        <img :src="squareUrl" alt="logo" style="width:120px;height:120px;border-radius: 50%" /><!-- </cropper> -->
      </div>
    <div>
        <div style="font-size:16px;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:rgba(51,51,51,1);margin-top:17px">{{userName}}</div>
        <div style="display:flex;margin-top:14px">
            <div><img src="@/assets/task/nowrank.png" style="width:35px;height:16px"></div>
            <div style="width:200px;margin-left:15px;"><el-progress :percentage="50"></el-progress></div>
            <div><img src="@/assets/task/nextrank.png" style="width:35px;height:16px"></div>
        </div>
        <div style="font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(83,199,241,1);margin-top:20px">等级说明</div>
        <div style="font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(102,102,102,1);margin-top:4px">提示：可以通过发送弹幕和赠送礼物，获得更多经验值</div>
      </div>
    </div>
  </section>
</template>

<script>
import Cropper from "@/components/MCenter/Cropper.vue";
import { Progress } from 'element-ui';
import { usersLoginInfo } from "@/api/mcenterapi";
export default {
  name: "TaskCenter",
  components: {
    Cropper,
    [Progress.name]: Progress,
  },
  data() {
    return {
      squareUrl: "",
      userName: "",
    };
  },
  methods: {
    //     updataImg(url) {
    //     this.squareUrl = url;
    //     let data =
    //       {
    //         avatarUrl: url
    //       };
    //     this.updateUser(data, '头像上传成功')
    //   },

    usersLoginInfo() {
      usersLoginInfo()
        .then((response) => {
          if (response.code === 0) {
            this.squareUrl = response.data.avatarUrl;
            this.userName = response.data.uname;
          } else {
            console.error(response.error);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  mounted() {
    this.usersLoginInfo();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_index.scss";
.apply {
  padding: 28px;
  line-height: 1;
  color: $color-title1;
  font-size: 14px;

  .apply-title {
    margin-bottom: 30px;
    font-size: 28px;
    text-align: center;
  }
}
.baseinformation {
  display: flex;
  height: 150px;
  width: 100%;
  border: blue solid 1px;
}
</style>