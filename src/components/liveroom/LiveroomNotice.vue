<template>
<div>
  <div class="live-notice">
    <div class="content">
      {{ msg }}
    </div>
    <div class="content-hover">
      {{ msg }}
    </div>
  </div>
  <!-- <div class="list">
  </div> -->
</div>
</template>

<script>
  export default {
    name: 'LiveroomNotice',
    props: {
      msg: String
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  @mixin notice-icon() {
    &:after {
      content: '';
      position: absolute;
      top: 15px;
      left: 10px;
      width: 20px;
      height: 20px;
      background: url('~@/assets/img/live-notice-icon.png') 0 0 no-repeat;
      background-size: 100%;
    }
  }

  .list {
    width: 100%;
    height: 150px;
    border: rgb(0, 255, 255) solid 1px;
  }
  .live-notice {
    position: relative;
    height: 51px;
    line-height: 51px;
    font-size: 14px;
    color: $color-title3;
    cursor: pointer;
    background-color: #fff;
    .content {
      padding-left: 35px;
      padding-right: 31px;
      @include ellipsis;
      @include notice-icon;
    }

    .content-hover {
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;
      display: none;
      width: 100%;
      box-sizing: content-box;
      padding: 15px 21px 30px 35px;
      line-height: 20px;
      background: linear-gradient(180deg, rgba(248, 250, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
      box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.12);
      @include notice-icon;
    }

    &:hover {
      .content-hover {
        display: block;
      }
    }


  }

</style>
