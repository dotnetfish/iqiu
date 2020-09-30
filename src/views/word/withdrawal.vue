<template>
  <div style="padding: 0rem 12rem">
    <div class="title">关于爱球直播收益提现说明</div>
    <div style="width:100%"><div class="divider"></div></div>
    <div>
        <div class="smalltitle">什么是爱球直播收益？</div>
        <div class="content">您通过爱球直播平台提供直播等服务后取得的税前收入，就是爱球直播收益，该定义在法律允许范围内的最终解释权归广西海鸟网络科技有限公司所有。</div>
    </div>
    <div>
        <div class="smalltitle">爱球直播收益怎样提现？</div>
        <div class="content">(1) 进入主播中心提现页面，填写您的真实信息：您的姓名，您要使用的银行卡号码，及银行卡号码对应的银行名称。</div>
        <div class="content">温馨提示：您填写的相关信息应当与您直播间主播认证的身份信息一致，并保证所填信息的真实性、准确性、有效性，否则将可能导致打款失败。如因前述原因导致打款失败，该责任将由您自行承担，请慎重填写并注意核对。</div>
        <div class="content">(2)微信提现：通过您在提现中心绑定的微信提现，到账为零钱</div>
        <div class="content">(3)填写您要提现的收益金额。注：佣金提现必须为整数，且提现金额不得低于100元；单笔上限20000元，每日每个主播上限到账20000元，申请提现金额不做限制。</div>
        <div class="content">(4)提现时间：每个月10日，25日为提现日</div>
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
    justify-content: flex-start;
    margin-top: 30px;
    margin-bottom: 14px;
    font-size: 16px;
    font-weight: bold;
}

.divider {
    // height: 0.2rem;
    width: 100%;
    margin: auto;
    border: rgb(242, 242, 242) solid 1px;
}

.smalltitle {
    font-weight: bold;
    font-size: 16px;
    color: #333333;
    margin-top: 14px;
    display: flex;
    justify-content: flex-start;
}
.smalltitle1 {
    font-weight: bold;
    font-size: 16px;
    color: #333333;
    text-align: left;
}
.content {
    font-weight: 400;
    font-size: 14px;
    color: #333333;
    text-align: justify;
}
</style>
