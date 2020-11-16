<template>
  <el-dialog
    width="30%"
    title='举报'
    :close-on-click-modal="false"
    :before-close="enter"
    :visible.sync="flag"
  >
    <div style="display:flex;">
        <div style="width:100px;text-align:right;margin-right:20px;font-size:18px;color:#666666">主播昵称</div>
        <div style="font-size:18px;color:#666666">{{uname}}</div>
    </div>
    <div style="display:flex;margin-top:40px">
        <div style="width:100px;text-align:right;margin-right:20px;font-size:18px;color:#666666">主播ID</div>
        <div style="font-size:18px;color:#666666">{{cid}}</div>
    </div>
    <div style="display:flex;margin-top:30px">
        <div style="width:100px;text-align:right;margin-right:20px;font-size:18px;color:#666666;height:40px;line-height:40px">关停时长</div>
        <div style="font-size:18px;color:#666666">
        <el-select v-model="value" placeholder="关停时长" clearable>
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select></div>
    </div>
    <div style="display:flex;margin-top:30px">
        <div style="width:100px;text-align:right;margin-right:20px;font-size:18px;color:#666666;height:40px;line-height:40px">关停原因</div>
        <el-input type="text" v-model="reason" style="width:300px;"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="enter1" style="color: #ffffff;background-color: #F9772A;border: 0;">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { unionLiveRecordInfo, forbidUsers } from "@/api/api";
export default{
  name: "Violationdetails",
  data() {
    return {
        options: [
          {
            value: 1,
            label: "24小时"
          },
          {
            value: 2,
            label: "7天"
          },
          {
            value: 3,
            label: "30天"
          },
          {
            value: 4,
            label: "永久"
          },
          ],
          value:1,
          reason:'',
    };
  },
  props: {
    flag:{
      type:Boolean
    },
    cid:{
      type:String
    },
    uname:{
      type:String
    }
  },
  methods: {
    //退出
    enter(){
      this.$emit('cancel')
    },
    enter1(){
        let data = {
            forbidType:this.value,
            jurisdictionName:'',
            jurisdictionId:'',
            uid:this.cid,
            content:'',
            reason:this.reason,
            cid:this.cid,
        }
        forbidUsers(data).then((res) => {
            if(res.code==0){
                this.$message.success('封禁成功');
            }else{
                this.$message.error(res.msg);
            }
          })
        this.$emit('cancel')
    }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner:focus{
      border-color:  #F9772A !important;      
  }
</style>

