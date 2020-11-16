<template>
  <section class="apply me-wrap">
    <div style="font-size:24px;font-weight:500;color:rgba(51,51,51,1);margin-bottom:20px;">我的钱包</div>
    <div style="width:904px;height:124px;border-radius: 4px;background: #F6F6F6;">
      <div style="width:904px;height:12px;background: #F9772A;border-radius: 4px;"></div>
      <div style="display:flex;height:112px">
        <div style="margin-left:10px">
          <div style="color: #333333;font-size: 18px;margin-left:15px;margin-top:15px">我的球币</div>
          <div style="color:#F9772A;font-size:32px;margin-left:15px;margin-top:23px">{{Summoney}}</div>
        </div>
        <div class="quick" @click="dialogVisible = true">快捷充值</div>
      </div>
      <!-- <div v-html="hss">{{hss}}</div> -->
    </div>
    <el-dialog :visible.sync="dialogVisible" width="34%">
      <div style="display:flex;background: #F0F0F0;height: 54px;padding-left: 24px;padding-top: 14px;">
        <div
          style="color: #999999;font-size: 14px;height:40px;line-height:40px;margin-right:12px;"
        >代充账号:</div>
        <div v-if="flag==false">
          <el-input v-model="touid" placeholder="请输入对方UID"></el-input>
        </div>
        <div v-else style="display:flex">
          <div>
            <img :src="avatarUrl" style="width:30px;height:30px;margin-top:5px;border-radius:50px;" />
          </div>
          <div style="margin-top:5px;margin-left:10px">
            <div style="margin-bottom:4px;font-size: 14px;">{{uname}}</div>
            <div style="font-size:12px;">UID:{{id}}</div>
          </div>
        </div>
        <div class="getuid" @click="GetToUser()" v-if="flag==false">确认</div>
        <div class="getuid" @click="noGetToUser()" v-else>取消</div>
      </div>
      <div class="default">
        <div v-for="(item,index) in defaultpaylist" :key="index">
          <div class="defaultmoney" @click="getcoin(item.coin,item.price)" tabindex="1">
            <div style="font-size:18px;color:#333333;text-align: center;margin-top: 7px;">{{item.price}}元</div>
            <div style="font-size:12px;color:#F9772A;margin-top:4px;text-align: center;">{{item.coin}}球币</div>
          </div>
        </div>
        <div class="defaultmoney" @click="isanymoney = true" v-if="isanymoney == false">
          <div style="font-size:18px;color:#333333;text-align: center;margin-top: 7px;">任意金额</div>
          <div style="font-size:12px;color:#F9772A;margin-top:4px;text-align: center;">1元=1000球币</div>
        </div>
        <div class="defaultmoney1" v-if="isanymoney == true" tabindex="1">
          <div style="font-size:18px;color:#333333;text-align: center;margin-top: 7px;"><input type="text" class="inputmoney" v-model="anymoney">元</div>
          <div style="font-size:12px;color:#F9772A;margin-top:4px;text-align: center;">1元=1000球币</div>
        </div>
      </div>
      <div style="background: #F9F9F9;height: 30px;padding-top: 20px;" v-if="isanymoney == false"><div style="margin-left: 28px;color:#F9772A;">可获得{{coinsum}}球币</div></div>
      <div style="background: #F9F9F9;height: 30px;padding-top: 20px;" v-else><div style="margin-left: 28px;color:#F9772A;">可获得{{anymoney*1000}}球币</div></div>
      <div style="margin-top:40px;margin-left: 28px;font-size: 14px;color: #333333;" v-if="isanymoney == false">请选择支付方式,支付<span style="color:#F9772A;font-size:24px">{{coinsum/1000}}</span>元</div>
      <div style="margin-top:40px;margin-left: 28px;font-size: 14px;color: #333333;" v-else>请选择支付方式,支付<span style="color:#F9772A;font-size:24px">{{anymoney}}</span>元</div>
      <div style="display:flex">
        <div class="alipay" @click="alipay()"><img src="@/assets/zhifubao.png" style="width: 16px;height: 16px;margin-top: 8px;margin-right: 10px;">支付宝</div>
        <div class="alipay" @click="alipay2()"><img src="@/assets/wxzf.jpg" style="width: 16px;height: 16px;margin-top: 8px;margin-right: 10px;">微信支付</div>
      </div>
      <div style="width:100%;height: 2px;background: #F9F9F9;margin-top:30px;"></div>
      <section style="text-align:center">
            <el-checkbox v-model="agreement" style="margin:15px auto 0;font-size:12px;">
              <span style="font-size:12px;">我已阅读并同意</span>
              <a
                target="_blank"
                :href=href
                class="know"
                style="font-size:12px;"
              >《充值须知》</a>
            </el-checkbox>
        </section>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
    <div
      style="font-size:24px;font-weight:500;color:rgba(51,51,51,1);margin-bottom:20px;margin-top:30px"
    >充值记录</div>
    <el-table :data="mypaylist" style="width: 100%;">
      <el-table-column prop="id" header-align="center" align="center" label="订单号"></el-table-column>
      <el-table-column prop="createTime" header-align="center" align="center" label="消费时间">
        <template slot-scope="scope">
          {{scope.row.createTime  | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="price" header-align="center" align="center" label="支付金额"></el-table-column>
      <el-table-column prop="status" header-align="center" align="center" label="订单状态">
        <template slot-scope="scope">
          <div v-if="scope.row.status==0">支付失败</div>
          <div v-if="scope.row.status==1">已支付</div>
          <div v-if="scope.row.status==2">支付失败</div>
        </template>
      </el-table-column>
      <!-- <el-table-column fixed="right" header-align="center" align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="wear(scope.row.fanCardId)" v-if="scope.row.status==0">佩戴</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination> -->
  </section>
</template>

<script charset="UTF-8">
import Cropper from "@/components/MCenter/Cropper.vue";
import {
  Progress,
  Table,
  TableColumn,
  Button,
  Pagination,
  Dialog,
  Input,
  Message,
  Checkbox,
} from "element-ui";
import { paylist, getToUser, payType, payadd, getPay } from "@/api/api";

export default {
  name: "Mymedal",
  components: {
    Cropper,
    [Progress.name]: Progress,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [Pagination.name]: Pagination,
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    [Message.name]: Message,
    [Checkbox.name]: Checkbox,  },
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
  data() {
    return {
      mypaylist: "",
      total: "",
      href:'',
      agreement:true,
      pageSize: 10,
      pageIndex: 1,
      dialogVisible: false,
      touid: "",
      Touid:'',
      flag: false,
      avatarUrl: "",
      id: "",
      Summoney:0,
      uname: "",
      anymoney:1,
      price:'',
      isanymoney:false,
      defaultpaylist:'',
      coinsum:0,
      Defaultpaylist: [{
        coin:5000,
        price:5
      },{
        coin:10000,
        price:10
      },{
        coin:20000,
        price:20
      },{
        coin:50000,
        price:50
      },{
        coin:100000,
        price:100
      },{
        coin:500000,
        price:500
      },]
    };
  },
  created: {},
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getpaylist();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getpaylist();
    },
    //获取个人资产
    Getpay(){
      this.href = process.env.VUE_APP_HREF+'/topup'
      // console.log("54544",href)
      getPay().then(res=>{
        if(res.data.coin){
          this.Summoney = res.data.coin 
        }
      })
    },
    //微信
    alipay2(){
      if(this.touid == ''){
        this.Touid = this.$store.state.userStatus.userInfo.uid
      }else{
        this.Touid = this.touid
      }
      if(this.isanymoney==true){
        this.price = this.anymoney
      }
      // console.log(this.touid)
      let data = {
        toUid:this.Touid,
        platform:'pc',
        price:this.price,
        type:2,
      }
      if(this.agreement==true){
        payadd(data).then(res=>{
        if(res.code==0){
          var a = JSON.parse(res.data.weixinPayInfo)
          // console.log("返回的链接=============",res)
          // console.log("返回的payid=",res.data.payId)
        let routeData = this.$router.resolve({ path:'/weixinhtml',query:{htmls:a.code_url,payid:res.data.payId}})
        // console.log(routeData)
        this.dialogVisible = false
        window.open(routeData.href,'_blank');
        }else{
          Message.error(res.msg);
        }
      })
      }else{
        Message.error("请同意协议");
      }
    },
    //唤醒支付宝
    alipay(){
      if(this.touid == ''){
        this.Touid = this.$store.state.userStatus.userInfo.uid
      }else{
        this.Touid = this.touid
      }
      if(this.isanymoney==true){
        this.price = this.anymoney
      }
      // console.log(this.touid)
      let data = {
        toUid:this.Touid,
        platform:'pc',
        price:this.price,
        type:1,
      }
      if(this.agreement==true){
        payadd(data).then(res=>{
          // var a = JSON.parse(res.data.weixinPayInfo)
          // console.log("返回的链接=============",a.code_url)
        if(res.code==0){
          // console.log("返回的链接=",res,"aa")
        let routeData = this.$router.resolve({ path:'/html',query:{htmls:res.data.payInfo}})
        // console.log(routeData)
        this.dialogVisible = false
        window.open(routeData.href,'_blank');
        }else{
          Message.error(res.msg);
        }
      })
      }else{
        Message.error("请同意协议");
      }
    },
    //多少球币
    getcoin(coin,price){
      this.isanymoney = false;
      this.anymoney = 1;
      this.coinsum = coin;
      this.price = price;
    },
    //支付宝表单
    // change() {
    //   const div = document.createElement("divform");
    //   div.innerHTML = ''
    //   document.body.appendChild(div);
    //   document.forms[0].submit();
    // },
    //获取默认充值金额
    getpayType(){
      let data = {
        type:3
      }
      payType(data).then((res)=>{
        this.defaultpaylist = res.data.payTypes 
        // console.log("默认充值金额组=",res)
      })
    },
    //获取代充信息
    GetToUser() {
      let data = {
        uid: this.touid,
      };
      getToUser(data).then((res) => {
        // console.log("代充信息=", res);
        if (res.code == 0) {
          this.flag = true;
          this.avatarUrl = res.data.avatarUrl;
          this.id = res.data.id;
          this.uname = res.data.uname;
        } else {
          Message.error(res.msg);
          this.flag = false;
        }
      });
    },
    noGetToUser() {
      this.touid = ''
      let data = {
        uid: "",
      };
      getToUser(data).then((res) => {
        this.flag = false;
      });
    },
    //获取充值记录列表
    getpaylist() {
      let data = {
        pageNum: this.pageIndex,
        pageSize: this.pageSize,
      };
      paylist().then((res) => {
        // console.log("我的充值记录=", res);
        if (res.data.length != 0) {
          this.total = res.total;
          this.mypaylist = res.data;
        } else {
          this.total = 0;
        }
      });
    },
  },
  mounted() {
    this.getpaylist();
    this.getpayType();
    setTimeout(() => {
        this.Getpay();
     }, 400);
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

.quick {
  width: 140px;
  height: 38px;
  line-height: 38px;
  color: white;
  text-align: center;
  background-color: #f9772a;
  border-radius: 30px;
  margin-top: 40px;
  margin-left: 600px;
  cursor: pointer;
}

.getuid {
  width: 60px;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #979797;
  line-height: 34px;
  text-align: center;
  font-size: 14px;
  margin-left: 20px;
  transition: all 0.2s;
  cursor: pointer;
  margin-top: 3px;
}

.getuid:hover {
  border: 1px solid #f9772a;
  color: #f9772a;
  // transition: all 0.2s
}

::v-deep .el-dialog__header {
  padding: 0;
}

// ::v-deep .el-dialog__header {
//   padding: 10px;
// }
.default{
  display: flex;
  flex-wrap: wrap;
  width: 97%;
  padding-left: 17px;
  background: #F9F9F9;
}

.defaultmoney{
  width: 122px;
height: 50px;
background: #FFFFFF;
border-radius: 5px;
border: 1px solid #F2F2F2;
margin-right: 10px;
margin-left: 10px;
margin-top: 20px;
transition: all 0.2s;
}

.defaultmoney1{
  width: 122px;
height: 50px;
background: #FFFFFF;
border-radius: 5px;
border: 1px solid #f9772a;
margin-right: 5px;
margin-left: 5px;
margin-top: 20px;
}

.defaultmoney:focus{
border: 1px solid #f9772a;
}

.inputmoney {
  border: 1px solid #bebebe;;
  width: 50px;
  outline: 0;
}

.alipay{
  width: 111px;
height: 32px;
background: #FFFFFF;
border-radius: 5px;
margin-left: 28px;
border: 1px solid #999999;
line-height: 32px;
cursor: pointer;
margin-top: 20px;
    display: flex;
    justify-content: center;
}

.know{
  color: #f9772a;
}

::v-deep .el-dialog__body{
  padding: 0;
  padding-bottom: 20px;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #f9772a;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #f9772a;
    border-color: #f9772a;
}

::v-deep .el-checkbox__inner:hover {
    border-color: #f9772a;
}
</style>