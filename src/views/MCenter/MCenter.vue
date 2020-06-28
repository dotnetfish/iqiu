<!--Created by fly on 2020/1/9-->
<template>
  <div class="mcenter">
    <template v-if="isShow">
      <anchor-center v-if="isAnchor"></anchor-center>
      <person-center v-else></person-center>
    </template>
  </div>
</template>
<script>
  import PersonCenter from "./PersonCenter";
  import AnchorCenter from "./AnchorCenter";
  import { usersLoginInfo } from "@/api/mcenterapi";

  export default {
    name: "MCenter",
    components: {
      PersonCenter,
      AnchorCenter
    },
    data() {
      return {
        isShow: false,
        isAnchor: false
      }
    },
    methods:
      {
        usersLoginInfo() {
          usersLoginInfo().then((response) => {
            if (response.code === 0) {
              this.isShow =true;
              this.isAnchor = response.data.isAnchor
            } else {
              console.error(response.error);
            }
          })
            .catch(function (error) {
              console.error(error);
            });
        },
      },
    created() {
      this.usersLoginInfo();
    }
  }
</script>
<style scoped lang="scss">
  .mcenter {
    margin-top: 30px;
    padding-bottom: 20px;
  }
</style>

