<template>
  <div>
    <div class="list">
      <div class="towrank">
        <div style="width:96px;height:28px;font-size:20px;margin-left:84px;line-height:28px">
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
      showblue:true,
      id:''
    };
  },
  methods: {
    changeblue() {
      this.showblue = !this.showblue;
      if(this.showblue == true) {
        this.$refs.newtask.style.color = 'rgba(51, 51, 51, 1)';
        this.$refs.oldtask.style.color = 'rgba(122,122,122,1)';
      }else{
        this.$refs.oldtask.style.color = 'rgba(51, 51, 51, 1)';
        this.$refs.newtask.style.color = 'rgba(122,122,122,1)';
      }
    },
    // getUrlId () {
    //   console.log('2222222222222222')
    //   var url = decodeURI(location.search) // 获取url中"?"符后的字串 ('?modFlag=business&role=1')
    //   var theRequest = {}
    //   if (url.indexOf('?') !== -1) {
    //     var str = url.substr(1) // substr()方法返回从参数值开始到结束的字符串；
    //     var strs = str.split('&')
    //     for (var i = 0; i < strs.length; i++) {
    //       theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
    //     }
    //     this.id = theRequest.id// 此时的theRequest就是我们需要的参数；
    //   } else return false
    // },
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
    // this.getUrlId()
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

.blueone {
  width: 36px;
  height: 4px;
  background: rgba(83, 199, 241, 1);
  border-radius: 2px;
  margin-left: 92px;
}

.bluetow {
  width: 36px;
  height: 4px;
  background: rgba(83, 199, 241, 1);
  border-radius: 2px;
  margin-left: 248px;
}
</style>