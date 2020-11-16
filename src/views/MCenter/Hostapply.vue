<template>
  <section class="apply me-wrap">
    <div style="display:flex;">
        <div style="font-weight: 500;color:#333333;font-size: 24px;margin-right:68px;cursor: pointer;" @click="flag=1,getchannelApplyList(0)">未处理</div>
        <div style="font-weight: 500;color:#333333;font-size: 24px;margin-right:128px;cursor: pointer;" @click="flag=2,getchannelApplyList(1)">已处理</div>
    </div>
    <div style="display:flex;margin-top:20px;margin-bottom:20px">
        <div v-if="flag==1" class="line"></div>
        <div v-if="flag==2" class="line1"></div>
    </div>
    <div v-if="flag==1">
        <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="主播ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="Getsearch()" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
        :data="tablelist"
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
          prop="cid"
          label="主播id"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="主播昵称"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="头像"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div><img :src=scope.row.avatar style="width:50px;height:50px;border-radius:50px;"></div>
        </template>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系方式"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="overTime"
          label="签约时长"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.overTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="申请时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="scale"
          label="抽成比例(%)"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
                <div v-if="scope.row.type==1">新签</div>
                <div v-if="scope.row.type==2">续约</div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="处理时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.updateTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          header-align="center"
        >
        <template>
            <div style="color:#903232">未处理</div>
        </template>
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editHandle(scope.row.scale,scope.row.type,scope.row.id)"><span style="color:#F9772A">审核</span></el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <div style="display:flex">
          <div style="color:#666666;width:120px;height:40px;line-height:40px;text-align:right;margin-right:24px">抽成比例(%):</div>
          <div><el-input v-model="scale"></el-input></div>
      </div>
      <div style="display:flex;margin-top:24px">
          <div style="color:#666666;width:120px;height:40px;line-height:40px;text-align:right;margin-right:24px;">类别:</div>
          <div><el-input v-model="type"></el-input></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button round type="primary" @click="isagree(1)" style="color: #ffffff;background-color: #F9772A;border: 0;margin-right:30px;width:100px">同意</el-button>
        <el-button round type="primary" @click="isagree(3)" style="color: #ffffff;background-color: #999999;border: 0;width:100px;">拒绝</el-button>
      </span>
    </el-dialog>
    </div>
    <div v-if="flag==2">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="主播ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="value" placeholder="请选择状态">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="Getsearch(value)" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
        :data="tablelist"
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
          prop="cid"
          label="主播id"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="主播昵称"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="头像"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div><img :src=scope.row.avatar style="width:50px;height:50px;border-radius:500px;"></div>
        </template>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系方式"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="overTime"
          label="签约时长"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.overTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="申请时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="scale"
          label="抽成比例(%)"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
                <div v-if="scope.row.type==1">新签</div>
                <div v-if="scope.row.type==2">续约</div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="处理时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.updateTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div style="color:#159A26" v-if="scope.row.status==1">已同意</div>
            <div style="color:red" v-if="scope.row.status==3">已拒绝</div>
        </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="back(scope.row.scale,scope.row.type,scope.row.id)"><span style="color:#F9772A">撤销</span></el-button>
        </template>
      </el-table-column> -->
      </el-table>
    </el-row>
    </div>
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
  </section>
</template>

<script>
import { channelApplyList, unionRole, channelAddCheck } from "@/api/api";

export default {
  name: "Hostapply",
  components: {
  },
  data() {
    return {
        pageSize:10,
        pageIndex:1,
        tablelist:[],
        dialogVisible:false,
        total:0,
        check:0,
        type:'',
        scale:'',
        status:'',
        unionId:'',
        cid:'',
        flag:1,
        options: [{
          value: 1,
          label: '已同意'
        }, {
          value: 3,
          label: '已拒绝'
        }],
        value:'',
        dataForm:{
            uid:''
        }
    }
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
      //撤销
      back(scale,type,cid){
          let data = {
              id:cid,
              type:type,
              cashType:1,
              scale:scale,
              status:2,
              reason:'',
          }
          channelAddCheck(data).then(res=>{
              this.dialogVisible = false
              this.getchannelApplyList(1)
              if(res.code==0){
                  this.$message.success('撤销成功');
              }else{
                  this.$message.error(res.msg);
              }
          })
      },
      //审核
      isagree(status){
          let data = {
              id:this.cid,
              type:this.type,
              cashType:1,
              scale:this.scale,
              status:status,
              reason:'',
          }
          channelAddCheck(data).then(res=>{
              this.dialogVisible = false
              this.getchannelApplyList(0)
              if(res.code==0){
                  this.$message.success('审核成功');
              }else{
                  this.$message.error(res.msg);
              }
          })
      },
      editHandle(scale,type,id){
          this.scale = scale;
          this.type = type;
          this.cid = id;
        //   console.log("565656566",id)
          this.dialogVisible = true
      },
      Getsearch(status){
          if(status){this.status=status;this.check=1}
          let data = {
              cid:this.dataForm.uid,
              check:this.check,
              status:this.status,
              pageNum: this.pageIndex,
              pageSize:this.pageSize,
              unionId: this.unionId
          }
          channelApplyList(data).then(res=>{
              this.tablelist = res.data
          })
      },
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        if(this.flag=1){
            this.getchannelApplyList(0)
        }else{
            this.getchannelApplyList(1)
        }
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        if(this.flag=1){
            this.getchannelApplyList(0)
        }else{
            this.getchannelApplyList(1)
        }
      },
      //列表
      getchannelApplyList(check){
          let data = {
              cid:this.dataForm.uid,
              check:check,
              status:this.status,
              pageNum: this.pageIndex,
              pageSize:this.pageSize,
              unionId: this.unionId
          }
          channelApplyList(data).then(res=>{
              this.tablelist = res.data
            //   console.log("999999999999999=",res.data)
          })
      },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getchannelApplyList(0);
          })
      },
  },
  mounted() {
      this.getunionRole()
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
.line{
    background-color: #F9772A;
    height: 2px;
    width: 72px;
}
.line1{
    background-color: #F9772A;
    height: 2px;
    width: 72px;
    margin-left: 140px;
}
::v-deep .el-input__inner:focus{
      border-color:  #F9772A !important;      
  }
</style>