<template>
  <div style="padding: 0rem 12rem">
    <div class="title">用户等级说明</div>
    <div style="width:100%"><div class="divider"></div></div>
    <div>
        <div class="smalltitle">1、等级说明:</div>
        <div class="content">登入签到后为Lv1，每升一级需要不同经验值，不同等级将获得不同特权。</div>
    </div>
    <div>
        <div class="smalltitle">2、等级特权:</div>
        <div class="content">1、Lv25 进场欢迎</div>
        <div class="content">2、Lv50 球票礼包（每月500球票/次）</div>
        <div class="content">3、Lv70 生日当天弹幕庆生</div>
        <div class="content">4、Lv85 分区喇叭广播</div>
        <div class="content">5、Lv100 定制进场欢迎特效</div>
    </div>
    <div>
        <div class="smalltitle">3、如何快速升级:</div>
        <div class="content">每日签到、完成任务（每项任务5经验值）</div>
        <div class="content">赠送礼物（10经验值）、评论（5经验值）</div>
        <div class="content">充值球票（20经验值）</div>
        <div class="content">充值贵宾（30经验值）</div>
        <div class="content">分享直播间（10经验值）</div>
        <div class="content">赠送定制邮轮（50经验值）</div>
        <div class="content">赠送普通邮轮（20经验值）</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang='scss'>
.title {
    display: flex;
    justify-content: center;
    margin-top:60px;
    margin-bottom: 60px;
    font-size: 24px;
    font-weight: bold;
}

.divider {
    // height: 0.2rem;
    width: 100%;
    margin: auto;
    // border: rgb(242, 242, 242) solid 0.2rem;
}

.smalltitle {
    font-weight: bold;
    font-size: 20px;
    color: #333333;
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
}

.content {
    font-weight: 400;
    font-size: 18px;
    margin-top: 6px;
    color: #333333;
    text-align: left;
}
</style>
