<template>
  <div>
    <div class="list">
      <div class="towrank">
        <div style="width:96px;height:28px;font-size:20px;margin-left:44px;line-height:28px">
          <button class="day" @click="changeblue()" ref="newtask">日榜</button>
        </div>
        <div style="width:96px;height:28px;margin-left:60px;line-height:28px">
          <button class="week" @click="changeblue()" ref="oldtask">周榜</button>
        </div>
      </div>
      <div style="display:flex;height:4px;width:100%;margin-bottom:47px">
        <div class="blueone" v-if="showblue==true"></div>
        <div class="bluetow" v-if="showblue==false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { rankingList } from "@/api/api";
import LiveroomHeader from "@/components/liveroom/LiveroomHeader";
export default {
  name: "Liveroomrank",
  components: {
    LiveroomHeader,
  },
  data() {
    return {
      rankinglist: [],
    };
  },
  methods: {
    getrankingList() {
      let data = {
        type: 1,
        cid: 2,
        uid: 3,
      };
      rankingList(data).then((res) => {
        this.rankinglist = res.data;
      });
    },
  },
  mounted() {
    // this.getrankingList()
  },
};
</script>

<style scoped lang="scss">
.list {
  width: 100%;
  height: 150px;
  border: rgb(0, 255, 255) solid 1px;
}

.towrank {
  height: 28px;
  width: 100%;
  display: flex;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
}

.day {
  background-color: white;
  border: 0px;
  outline: 0;
  color: rgba(51, 51, 51, 1);
}

.week {
  background-color: white;
  border: 0px;
  outline: 0;
  color:rgba(122,122,122,1);
}
</style>