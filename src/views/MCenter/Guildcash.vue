<template>
  <section class="apply me-wrap">
      <div style="font-weight: 500;color: #333333;font-size: 18px;margin-bottom:20px">每月10月25号可进行结算提现，未提现余额自动结算至默认结算账户</div>
      <div style="display:flex;margin-bottom:20px">
          <div style="font-weight: 500;color: #333333;font-size: 24px;margin-right:20px;height:40px;line-height:40px">可提现余额(元)</div>
          <div><el-input v-model="unioncashdata"></el-input></div>
          <div style="width: 120px;height: 40px;background: #F9772A;border-radius: 7px;line-height:40px;text-align:center;color:#ffffff;margin-left:20px;cursor: pointer;" @click="card()">提现到卡</div>
      </div>
      <div style="width:110%;height:28px;background: #F0F0F0;margin-bottom:20px;margin-left:-32px"></div>
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
          prop="createTime"
          label="提现时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="bankName"
          label="提现账户"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="totalCoin"
          label="提现金额"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结算时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.endTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
                <div v-if="scope.row.status==0">未审核</div>
                <div v-if="scope.row.status==1">审核通过未打款</div>
                <div v-if="scope.row.status==2">已打款</div>
                <div v-if="scope.row.status==3">审核拒绝</div>
            </div>
        </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- <el-pagination
        hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
    <el-dialog title="填写银行卡信息" :visible.sync="dialogVisiblebank" width="30%">
          <div style="display:flex;margin-left:40px">
            <div style="width:60px;height:40px;line-height:40px;font-size: 18px;">姓名:</div>
            <el-input
              v-model="bankname"
              placeholder="输入持卡人姓名"
              style="width:300px"
            ></el-input>
          </div>
          <div style="display:flex;margin-top:40px;margin-left:40px">
            <div style="width:60px;height:40px;line-height:40px;font-size: 18px;">发卡行:</div>
            <el-input
              v-model="bankarea"
              placeholder="请输入发卡银行"
              style="width:300px"
            ></el-input>
          </div>
          <div style="display:flex;margin-top:40px;margin-left:40px">
            <div style="width:60px;height:40px;line-height:40px;font-size: 18px;">卡号:</div>
            <el-input
              v-model="bankcard"
              placeholder="请输入银行卡号"
              style="width:300px"
            ></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
        <el-button round type="primary" @click="getbindBank" style="color: #ffffff;background-color: #F9772A;border: 0;">提交</el-button>
      </span>
        </el-dialog>
  </section>
</template>

<script>
import { cashApply, unioncash, unionRole, cashRecord, bindBank } from "@/api/api";

export default {
  name: "Settleset",
  components: {
  },
  data() {
    return {
        dialogVisiblebank:false,
        id:'',
        bankname:'',
        bankarea:'',
        bankcard:'',
        // pageSize:10,
        // pageIndex:1,
        // total:0,
        unionId:'',
        tablelist:'',
        unioncashdata:'',
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
    }
  },
  methods: {
      card(){
          if(!this.$store.state.userStatus.userInfo.bankCard){
              this.getcashApply()
          }else{
              this.dialogVisiblebank = true
          }
      },
      //申请提款
      getcashApply(){
          let data = {
            unionId: this.unionId,
            type:3
          }
          cashApply(data).then((res) => {
              if(res.code==0){
                  this.$message.success('提交成功待审核');
                  this.getunioncash()
              }else{
                  this.$message.error(res.msg);
              }
      });
      },
      //绑定银行卡
    getbindBank(){
      let data = {
        bankCard: this.bankcard,
        bankUname: this.bankname,
        bankName: this.bankarea,
      }
      bindBank(data).then((res)=>{
        if(res.code==0){
          Message.success({
          message: "绑定成功",
        });
        this.dialogVisiblebank=false;
        }else{
          Message.error({
          message: res.msg,
        });
        }
      })
    },
      //改变页数
    //   handleSizeChange(val){
    //     this.pageSize = val
    //     this.pageIndex = 1
    //     this.getchannelApplyList()
    //   },
    //   handleCurrentChange(val) {
    //     this.pageIndex = val
    //     this.getchannelApplyList()
    //   },

      //获取列表
      getcashRecord(){
          let data = {
            unionId: this.unionId,
          }
          cashRecord(data).then((res) => {
            // this.total = res.total
        this.tablelist = res.data;
      });
      },
      //查询
    //   Getsearch(){
    //       let data = {
    //         cid:this.dataForm.uid,
    //         unionId: this.unionId,
    //         pageNum:1,
    //         pageSize:10,
    //       }
    //       channelApplyList(data).then((res) => {
    //         this.total = res.total
    //     this.tablelist = res.data;
    //   });
    //   },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getunioncash();
          })
      },
      //可提现金额
      getunioncash(){
          let data = {
            unionId: this.unionId,
          }
          unioncash(data).then((res) => {
              this.unioncashdata = res.data.totalCoin
              this.getcashRecord();
      });
      }
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
::v-deep .el-input__inner:focus{
      border-color:  #F9772A !important;      
  }
  
</style>