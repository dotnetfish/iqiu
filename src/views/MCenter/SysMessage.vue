<template>
  <section class="apply me-wrap">
    <div v-for="(item,index) in messagelist" :key=index>
        <div style="display:flex">
            <img src="@/assets/sys.png" style="width:44px;height:44px">
            <div style="font-size:14px;color: #999999;margin-left:14px;height:44px;line-height:44px">公告</div>
            <div style="font-size:14px;color: #999999;margin-left:10px;height:44px;line-height:44px">{{item.createTime | formatDate}}</div>
        </div>
        <div class="content">{{item.content}}</div>
        <div style="width:910px;height:2px;background:rgba(240,240,240,1);margin-top:30px;margin-bottom: 16px;"></div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </section>
</template>

<script>
import Cropper from "@/components/MCenter/Cropper.vue";
import { Button, Input, Message, Pagination} from "element-ui";
import { sysMessagelist, readsysMessage } from "@/api/api";
import { usersLoginInfo } from "@/api/mcenterapi";

export default {
  name: "SysMessage",
  components: {
    Cropper,
    [Button.name]: Button,
    [Input.name]: Input,
    [Message.name]: Message,
    [Pagination.name]: Pagination,
  },
  data() {
    return {
      squareUrl: "",
      userName: "",
      userid:"",
      messagelist:[],
      total:'',
      pageSize:10,
      pageIndex:1,
    };
  },
  filters: {
    formatDate: function (value) {
        let date = new Date(value);
        let yy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return yy + "年" + mm + "月" + dd + "日" + " " + h + ":" + m + ":" + s;
        },
  },
  methods: {
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getsysMessagelist()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getsysMessagelist()
      },
      //获取列表消息
      getsysMessagelist() {
          let data = {
            pageNum:this.pageIndex,
            pageSize:this.pageSize,
          }
          sysMessagelist(data).then((res) => {
            //   console.log("系统消息列表==",res)
              if(res.data.length!=0){
                this.total = res.total
                this.messagelist = res.data
              }else{
                  this.total = 0
              }
          })
      },
      getreadsysMessage(){
          readsysMessage().then((res) => {
          })
      },
    usersLoginInfo() {
      usersLoginInfo()
        .then((response) => {
          if (response.code === 0) {
            this.squareUrl = response.data.avatarUrl;
            this.userName = response.data.uname;
            this.userid = response.data.id;
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
    this.getsysMessagelist();
    this.getreadsysMessage();
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

.content {
    font-size: 14px;
    color: #999999;
    margin-left: 58px;
    margin-top: 4px;
    width: 500px;
}
</style>