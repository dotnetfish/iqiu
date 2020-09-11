<template>
  <div class="home">
    <homeNav :navLogo="true"></homeNav>
    <homeSign v-if="this.$store.state.userStatus.userInfo.uid"></homeSign>
    <homeLive></homeLive>
<!--    <homeFooter></homeFooter>-->
  </div>
</template>

<script>
  import homeNav from '@/views/home/homeNav.vue'
  import homeLive from '@/views/home/homeLive.vue'
  import homeSign from '@/views/home/homeSign.vue'
  // import homeFooter from '@/views/home/homeFooter.vue'

  export default {
    name: 'Home',
    components: {
      homeNav,
      homeLive,
      homeSign,
      // homeFooter
    },
    data() {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_var.scss";

  .color-test {
    display: flex;
    justify-content: center;
    font-size: 30px;
    color: $color-main;
  }
</style>
