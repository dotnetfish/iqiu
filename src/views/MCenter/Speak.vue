<template>
  <section class="apply me-wrap">
    <div class="type-points">
      <div class="type1" @click="changetype(1)" ref="typeone">黑词屏蔽</div>
      <div class="type2" @click="changetype(2)" ref="typetow">用户屏蔽</div>
      <div class="type3" @click="changetype(3)" ref="typethree">屏蔽记录</div>
    </div>
    <div v-if="type==1" style="margin-top:50px">
        <div style="display:flex">
            <el-input v-model="blacks" placeholder="请输入要屏蔽的黑词" maxlength="10" show-word-limit style="width:300px;margin-right:50px"></el-input>
            <el-button @click="addword()" style="color: #ffffff;background-color: #F9772A;border: 0;">屏蔽</el-button>
        </div>
        <div style="color:#EB2727;margin-top:10px;font-size: 16px;">最多可屏蔽20个({{wordlist.length}}/20)</div>
        <div style="margin-top:14px;display:flex;flex-wrap:wrap">
          <div v-for="(item,index) in wordlist" :key="index" style="display:flex;">
            <div class="wordborder">{{item.word}} <img src="@/assets/close2.png" style="width:8px;height:8px;margin-left:16px;margin-right:16px;cursor: pointer;" @click="delword(item.id)"></div>
          </div>
        </div>
    </div>
    <div v-if="type==2" style="margin-top:50px">
        <div style="display:flex">
            <div style="margin-right:10px;margin-top:2px;font-size: 16px;">是否开启用户屏蔽:</div>
            <el-switch
            v-model="isopen"
            active-color="#F9772A"
            inactive-color="#999999">
        </el-switch>
        </div>
        <div style="color:#EB2727;margin-top:41px;font-size: 16px;">开播时，直播间将屏蔽满足以下任一条件的用户发言</div>
        <div style="display:flex;align-items:center;height:40px;margin-top:17px">
            <div style="font-size: 16px;">用户等级小于</div>
            <select v-model="value" class="timechoose">
                    <option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </option>
                </select>
            <!-- <el-input v-model="level" style="width:50px;margin-left:10px;margin-right:10px;"></el-input> -->
            <!-- <div style="font-size: 16px;">级</div> -->
        </div>
        <div style="display:flex;align-items:center;height:40px;margin-top:17px">
            <div style="font-size: 16px;">注册时间小于</div>
            <select v-model="value1" class="timechoose">
                    <option
                    v-for="item in options1"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value1">
                    </option>
                </select>
            <!-- <el-input v-model="day" style="width:50px;margin-left:10px;margin-right:10px;"></el-input>
            <div style="font-size: 16px;">天</div> -->
        </div>
        <el-button @click="save()" style="color: #ffffff;background-color: #F9772A;border: 0;margin-top:50px">保存设置</el-button>
    </div>
    <div v-if="type==3" style="margin-top:27px">
        <div style="font-size:16px;color:#999999;margin-bottom:10px">当前已屏蔽{{this.tableData.length}}条弹幕（可能会有延迟）</div>
      <el-table
        :data="tableData"
        row-class-name="costCell"
        :header-cell-style="{'background-color': '#f0f0f0'}"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="uname"
          label="用户昵称"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="用户发言"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="reason"
          label="屏蔽原因"
          align="center"
          header-align="center"
        >
        </el-table-column>
      </el-table>
    </div>
    <div v-if="type==3">
    <el-pagination
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </section>
</template>

<script>
import { word,wordList,userLimitRecordList, closeUserLimit, startUserLimit, userSendMes, userLimit, delWord } from "@/api/api";

export default {
  name: "Speak",
  components: {
  },
  data() {
    return {
      total:0,
      pageSize:10,
      pageIndex:1,
      wordlist:'',
      level:'',
      day:'',
      isopen:true,
      tableData:[],
      blacks:'',
      dataForm:{
          time:''
        },
      type:1,
      options: [{
        value: 2,
        label: '2级'
      }, {
        value: 3,
        label: '3级'
      }, {
        value: 4,
        label: '4级'
      }, {
        value: 5,
        label: '5级'
      }],
      value: 2,
      options1: [{
        value1: 3,
        label: '3天'
      }, {
        value1: 7,
        label: '7天'
      }, {
        value1: 15,
        label: '15天'
      }, {
        value1: 30,
        label: '30天'
      }],
      value1: 3,
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
    //添加黑词
    addword(){
      if(this.blacks == ''){
        this.$message.error('请输入黑词');
      }else{
          let data = {
          word: this.blacks
        }
        word(data).then((res) => {
          if(res.code==0){
            this.$message.success('屏蔽成功');
            this.blacks = ''
            this.getwordList()
          }else{
            this.$message.error(res.msg);
          }
            })
      }
    },
      //保存设置
      save(){
        if(this.isopen==true){
          let data = {
            level:this.value,
            createDay:this.day
          }
          startUserLimit(data).then((res) => {
            if(res.code==0){
              this.$message.success('保存成功');
            }else{
              this.$message.error(res.msg);
            }
          })
        }else{
          closeUserLimit().then((res) => {
            this.$message.success('保存成功');
          })
        }
      },
      //导航选择
      changetype (type) {
      this.type = type
      if (this.type === 1) {
        this.$refs.typeone.style.color = '#333333'
        this.$refs.typetow.style.color = '#999999'
        this.$refs.typethree.style.color = '#999999'
      } else if (this.type === 2) {
        this.$refs.typeone.style.color = '#999999'
        this.$refs.typetow.style.color = '#333333'
        this.$refs.typethree.style.color = '#999999'
      } else {
        this.$refs.typeone.style.color = '#999999'
        this.$refs.typetow.style.color = '#999999'
        this.$refs.typethree.style.color = '#333333'
      }
    },
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getuserLimitRecordList()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getuserLimitRecordList()
      },
      //获取列表消息
      getuserLimitRecordList() {
        let data = {
          cid:this.$store.state.userStatus.userInfo.uid,
          pageNum: this.pageIndex,
          pageSize:this.pageSize,
        }
          userLimitRecordList(data).then((res) => {
            this.total = res.total
              this.tableData = res.data
          })
      },
      //获取等级天数
      getuserLimit(){
        let data = {
          cid:this.$store.state.userStatus.userInfo.uid
        }
          userLimit(data).then((res) => {
              this.day = res.data.createDay;
              this.level = res.data.level;
              if(res.data.status==0){
                this.isopen = false;
              }else{
                this.open = true;
              }
          })
      },
      //获取黑词列表
      getwordList(){
        let data = {
          cid:this.$store.state.userStatus.userInfo.uid
        }
          wordList(data).then((res) => {
              this.wordlist = res.data
          })
      },
      delword(wordid){
        let data = {
          id:wordid
        }
          delWord(data).then((res) => {
            this.$message.success('删除成功');
            this.getwordList()
          })
      }

  },
  mounted() {
    this.getuserLimitRecordList();
    this.getuserLimit();
    this.getwordList();
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
.type-points {
  display: flex;
  width: 100%;
  height: 50px;
  background: #F0F0F0;
}
.type1{
    font-size: 16px;
    color: #333333;
    height: 50px;
    line-height: 50px;
    margin-left: 44px;
    margin-right: 44px;
    cursor: pointer;
}
.type2{
    font-size: 16px;
    color: #999999;
    height: 50px;
    line-height: 50px;
    margin-left: 44px;
    margin-right: 44px;
    cursor: pointer;
}
.type3{
    font-size: 16px;
    color: #999999;
    height: 50px;
    line-height: 50px;
    margin-left: 44px;
    margin-right: 44px;
    cursor: pointer;
}
::v-deep .el-input__inner:focus{
      border-color:  #F9772A !important;      
  }

.wordborder{
  height: 24px;
  line-height: 24px;
  // width: 140px;
  border: #F9772A solid 1px;
  font-size: 14px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: center;
  padding-left: 16px;
}

.timechoose{
    background-color:rgb(255, 255, 255);
    width: 60px;
    border: rgb(203, 204, 204) solid 1px;
    height: 40px;
    outline: 0;
    margin-left: 6px;
    margin-right: 6px;
}
</style>