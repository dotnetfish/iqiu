<template>
  <section class="apply me-wrap">
    <div
      style="font-size:24px;font-weight:500;color:rgba(51,51,51,1);margin-bottom:20px;"
    >任务中心</div>
    <div class="baseinformation">
      <div style="margin-right:20px">
        <!-- <cropper @updataImg="updataImg"> -->
        <img :src="squareUrl" alt="logo" style="width:120px;height:120px;border-radius: 50%" />
        <!-- </cropper> -->
      </div>
      <div>
        <div
          style="font-size:16px;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:rgba(51,51,51,1);margin-top:17px"
        >{{userName}}</div>
        <div style="display:flex;margin-top:14px">
          <div>
            <img src="@/assets/task/nowrank.png" style="width:35px;height:16px" />
          </div>
          <div style="width:200px;margin-left:15px;">
            <el-progress :percentage="50"></el-progress>
          </div>
          <div>
            <img src="@/assets/task/nextrank.png" style="width:35px;height:16px" />
          </div>
        </div>
        <div
          style="font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(83,199,241,1);margin-top:20px"
        >等级说明</div>
        <div
          style="font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(102,102,102,1);margin-top:4px"
        >提示：可以通过发送弹幕和赠送礼物，获得更多经验值</div>
      </div>
    </div>

    <div style="width:910px;height:2px;background:rgba(240,240,240,1);margin-top:30px"></div>

    <div class="new-old">
      <div style="width:96px;height:28px;font-size:20px;margin-left:44px;line-height:28px">
        <button class="new-task" @click="changeblue()" ref="newtask">新手任务</button>
      </div>
      <div style="width:96px;height:28px;margin-left:60px;line-height:28px">
        <button class="old-task" @click="changeblue()" ref="oldtask">日常任务</button>
      </div>
    </div>
    <div style="display:flex;height:4px;width:100%;margin-bottom:47px">
      <div class="blueone" v-if="showblue==true"></div>
      <div class="bluetow" v-if="showblue==false"></div>
    </div>
    <!-- 新手任务 -->
    <div v-if="showblue == true">
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[0].url ></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">首次签到打卡</div><div class="task-reward">获取积分100，获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[0].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[0].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[1].url></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">观看三十分钟以上，可当日累计时长</div><div class="task-reward">获取积分100，获得经验5</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[1].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[1].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
      </div>
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[2].url></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">完善个人资料</div><div class="task-reward">获取积分200，获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[2].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[2].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[3].url></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">分享到QQ、微信、朋友圈、微博</div><div class="task-reward">获取积分200，获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[3].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[3].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
      </div>
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[4].url></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">发送三条弹幕</div><div class="task-reward">获取积分100，获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[4].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[4].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[6].url></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">首次关注主播10个</div><div class="task-reward">获取积分100，获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[6].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[6].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
      </div>
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[9].url></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">绑定邮箱、微信号</div><div class="task-reward">获取积分200，获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[9].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[9].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[7].url></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">收藏直播间</div><div class="task-reward">获取积分100，获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[7].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[7].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
      </div>
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[5].url></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">送一次礼物</div><div class="task-reward">获取积分100，获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[5].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[5].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="task">
          <div style="width:44px;height:44px"><img :src= nlist[8].url></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">首次充值，任意金额即可</div><div class="task-reward">获取积分1000，获得经验30</div></div>
          <div style="width:66px;margin-left:10px" v-if="nlist[8].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="nlist[8].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 日常任务 -->
    <div v-if="showblue == false">
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img src="@/assets/task/task1.png"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">首次签到打卡</div><div class="task-reward">获取积分50,获得经验5</div></div>
          <div style="width:66px;margin-left:10px" v-if="dlist[13].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="dlist[13].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="task">
          <div style="width:44px;height:44px"><img src="@/assets/task/task2.png"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">观看三十分钟以上</div><div class="task-reward">获取积分50，获得经验5</div></div>
          <div style="width:66px;margin-left:10px" v-if="dlist[0].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="dlist[0].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
      </div>
      <div class="merge">
      <div class="task">
        <div style="width:44px;height:44px"><img src="@/assets/task/task4.png"></div>
        <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">分享到QQ、微信、朋友圈、微博。</div><div class="task-reward">获取积分200,获得经验5</div></div>
        <div style="width:66px;margin-left:10px" v-if="dlist[1].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="dlist[1].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
      </div>
      <div class="divider"></div>
        <div class="task">
          <div style="width:44px;height:44px"><img src="@/assets/task/task5.png"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">发送弹幕</div><div class="task-reward">获得经验5</div></div>
          <div style="width:66px;margin-left:10px" v-if="dlist[12].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="dlist[12].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
      </div>
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img src="@/assets/task/task11.png"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">主播社区发动态、帖子、收藏、转发</div><div class="task-reward">获取积分50,获得经验5</div></div>
          <div style="width:66px;margin-left:10px" v-if="dlist[8].status == 0 && dlist[9].status == 0 && dlist[10].status == 0 && dlist[11].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-else>
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="task">
          <div style="width:44px;height:44px"><img src="@/assets/task/task6.png"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">首次关注主播</div><div class="task-reward">获取积分10,获得经验1</div></div>
          <div style="width:66px;margin-left:10px" v-if="dlist[3].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="dlist[3].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
      </div>
      <div class="merge">
        <div class="task">
          <div style="width:44px;height:44px"><img src="@/assets/task/task10.png"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">收藏直播间</div><div class="task-reward">获取积分200,获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="dlist[4].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="dlist[4].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="task">
          <div style="width:44px;height:44px"><img src="@/assets/task/task9.png"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">送礼物</div><div class="task-reward">获取积分100,获得经验10</div></div>
          <div style="width:66px;margin-left:10px" v-if="dlist[2].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-if="dlist[2].status == 1">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
        </div>
      </div>
      <div class="merge">
      <div class="task">
          <div style="width:44px;height:44px"><img src="@/assets/task/task8.png"></div>
          <div style="width:290px;height:44px;margin-left:5px"><div class="task-title">充值用户等级、包月、包年球票</div><div class="task-reward">获取积分1000，获得经验20</div></div>
          <div style="width:66px;margin-left:10px" v-if="dlist[7].status == 0 && dlist[5].status == 0 && dlist[6].status == 0">
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/no.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">未完成</div>
          </div>
          <div style="width:66px;margin-left:10px" v-else>
            <div style="display:flex;justify-content:center;width:43px;margin-bottom:2px"><img src="@/assets/task/dui.png" style="width:30px;height:30px"></div>
            <div style="color:rgba(153,153,153,1);">已完成</div>
          </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import Cropper from "@/components/MCenter/Cropper.vue";
import { Progress } from "element-ui";
import { newTaskList, dayTaskList } from "@/api/api";
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
      showblue: true,
      newlist:[],
      daylist:[],
      nlist: [{
        type:1,
        status:1,
        url: '@/assets/task/task1.png'
      },{
        type:2,
        status:0,
        url:'@/assets/task/task2.png'
      },{
        type:3,
        status:0,
        url:'@/assets/task/task3.png'
      },{
        type:4,
        status:0,
        url:'@/assets/task/task4.png'
      },{
        type:5,
        status:0,
        url:'@/assets/task/task5.png'
      },{
        type:6,
        status:0,
        url:'@/assets/task/task9.png'
      },{
        type:7,
        status:0,
        url:'@/assets/task/task6.png'
      },{
        type:8,
        status:1,
        url:'@/assets/task/task10.png'
        
      },{
        type:9,
        status:0,
        url:'@/assets/task/task8.png'
      },{
        type:10,
        status:0,
        url:'@/assets/task/task7.png'
      },
      ],
      dlist: [{
        type:1,
        status:1,
        url: '@/assets/task/task2.png'
      },{
        type:2,
        status:0,
        url:'@/assets/task/task4.png'
      },{
        type:3,
        status:0,
        url:'@/assets/task/task9.png'
      },{
        type:4,
        status:0,
        url:'@/assets/task/task6.png'
      },{
        type:5,
        status:0,
        url:'@/assets/task/task10.png'
      },{
        type:6,
        status:0,
        url:'@/assets/task/task8.png'
      },{
        type:7,
        status:0,
        url:'@/assets/task/task8.png'
      },{
        type:8,
        status:0,
        url:'@/assets/task/task8.png'
        
      },{
        type:9,
        status:0,
        url:'@/assets/task/task11.png'
      },{
        type:10,
        status:0,
        url:'@/assets/task/task11.png'
      },
      {
        type:11,
        status:0,
        url:'@/assets/task/task11.png'
      },{
        type:12,
        status:0,
        url:'@/assets/task/task11.png'
      },{
        type:13,
        status:0,
        url:'@/assets/task/task5.png'
      },
      {
        type:14,
        status:0,
        url:'@/assets/task/task1.png'
      },
      ],
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
    getnewTaskList() {
      newTaskList().then((res) => {
        this.newlist = res
        console.log("9999999999999999989999999",res)
      });
    },
    getdayTaskList() {
      dayTaskList().then((res) => {
        this.daylist = res
        console.log("9999999999999999989999998",res)
      });
    },
  },
  mounted() {
    this.usersLoginInfo();
    // if(this.$store.state.userStatus.userInfo.uid) {
    //   this.getnewTaskList();
    // }
    // if(this.$store.state.userStatus.userInfo.uid) {
    //   this.getdayTaskList();
    // }
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
  height: 120px;
  width: 100%;
  // border: rgb(221, 221, 245) solid 1px;
}

.new-old {
  height: 28px;
  width: 100%;
  display: flex;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
}

.new-task {
  background-color: white;
  border: 0px;
  outline: 0;
  color: rgba(51, 51, 51, 1);
}

.old-task {
  background-color: white;
  border: 0px;
  outline: 0;
  color:rgba(122,122,122,1);
}

.blueone {
  width: 38px;
  height: 4px;
  background: rgba(83, 199, 241, 1);
  border-radius: 2px;
  margin-left: 71px;
}

.bluetow {
  width: 38px;
  height: 4px;
  background: rgba(83, 199, 241, 1);
  border-radius: 2px;
  margin-left: 227px;
}

.task {
  height: 44px;
  width: 100%;
  display: flex;
  // margin-bottom: 20px;
}

.task-title {
  height:22px;
  font-size:16px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:22px;
}

.task-reward {
  height:17px;
  font-size:12px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:17px;
  margin-top: 3px;
}

.done {
  width:66px;
  height:28px;
  background:rgba(83,199,241,1);
  border-radius:14px;
  border:0;
  color: #fff;
  outline: 0;
}

.nodone {
  width:66px;
  height:28px;
  border-radius:14px;
  border:2px solid rgba(153,153,153,1);
  background:rgb(255, 255, 255);
  color: rgba(153,153,153,1);
}

.merge {
  display: flex;
  height: 75px;
  width: 910px;
  align-items: center;
}

.divider {
  width:1px;
  height:45px;
  border:1px solid rgba(240,240,240,1);
  margin-right: 27px;
}
</style>