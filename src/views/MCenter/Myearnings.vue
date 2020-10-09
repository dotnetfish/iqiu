<template>
  <section class="apply me-wrap">
    <div style="font-size:24px;font-weight:500;color:rgba(51,51,51,1);margin-bottom:20px;">我的钱包</div>
    <div style="width:904px;height:124px;border-radius: 4px;background: #F6F6F6;">
      <div style="width:904px;height:12px;background: #F9772A;border-radius: 4px;"></div>
      <div style="display:flex;height:112px">
        <div style="margin-left:10px">
          <div style="color: #333333;font-size: 18px;margin-left:15px;margin-top:15px">可提现金额(元)</div>
          <div style="color:#F9772A;font-size:32px;margin-left:15px;margin-top:23px">{{Summoney}}</div>
        </div>
      </div>
      <!-- <div v-html="hss">{{hss}}</div> -->
    </div>
    <div style="display:flex;margin-top:30px"><div class="money">提现金额(元)</div><div><input type="text" placeholder="最低提现金额100元" class="moneyinput" tabindex="1" v-model="howmoney"></div></div>
    <div style="display:flex;margin-top:30px">
        <div class="bankmoney">提现方式</div>
        <div class="alipay" @click="bankway(3)" ref="bank"><img src="@/assets/bank.png" style="width: 16px;height: 16px;margin-top: 8px;margin-right: 10px;">银行卡提现</div>
    </div>
    <div style="display:flex;margin-top:30px">
        <div class="moneytime">预计到账时间1-3个工作日时间</div>
    </div>
    <section style="margin-top:30px;margin-left:118px">
            <el-checkbox v-model="agreement" style="margin:15px auto 0;font-size:12px;">
              <span style="font-size:12px;">我已阅读并同意</span>
              <a
                target="_blank"
                :href=href
                class="know"
                style="font-size:12px;"
              >《提现须知》</a>
            </el-checkbox>
          </section>
    <div style="margin-top:10px">
        <div class="submit" @click="submit()">提交</div>
    </div>
  </section>
</template>

<script>
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
import { mySalary, paycash } from "@/api/api";

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
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      Summoney:'',
      howmoney:'',
      type:'',
      href:'',
      agreement:true,
    };
  },
  created: {},
  methods: {
    //选择提现方式
    bankway(type){
      if(type==3){
        this.$refs.bank.style.border = '1px solid #f9772a';
      }
      this.type=type
    },
    getmySalary(){
      this.href = process.env.VUE_APP_HREF+'/withdrawal'
        mySalary().then(res=>{
           this.Summoney = res.data.totalCoin
        })
    },
    submit() {
      if(this.howmoney>100 && this.howmoney<20000){
        if(this.agreement==true){
            let data = {
            totalCoin:this.howmoney,
            type:this.type,
        };
        paycash(data).then(res=>{
          if(res.code==0){
              Message.success("恭喜提现成功");
              this.howmoney = '';
              this.getmySalary();
          }else{
            if(this.type!=1 && this.type!=2 &&this.type!=3){
              Message.error("请选择提现方式");
            }else if(this.howmoney==""){
              Message.error("请选择提现金额");
            }else{
              Message.error(res.msg);
            }
          }
        })
        }else{
            Message.error("请同意协议");
        }
      }else{
        Message.error("提现金额需大于100元小于20000元");
      }
    }
  },
  mounted() {
    this.getmySalary();
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

.money{
font-size: 18px;
color: #666666;
height: 44px;
line-height: 44px;
margin-right: 16px;
width: 103px;
text-align: right;
}

.bankmoney{
font-size: 18px;
color: #666666;
height: 32px;
line-height: 32px;
margin-right: 16px;
width: 103px;
text-align: right;
}

.moneytime{
font-size: 18px;
color: #666666;
height: 44px;
line-height: 44px;
margin-right: 16px;
}

.submit{
    width: 199px;
height: 50px;
background: #F9772A;
border-radius: 4px;
font-size: 20px;
color: #FFFFFF;
line-height: 50px;
text-align: center;
margin-left: 118px;
cursor: pointer;
}
.moneyinput{
    height: 40px;
    // outline: #f9772a 1px solid;
    border: 1px solid rgb(197, 197, 196);
    outline: 0;
    border-radius: 2px;
}
.moneyinput:focus{
    border: 1px solid #f9772a;
    transition: all 0.2s;
}

.alipay{
  width: 130px;
height: 32px;
background: #FFFFFF;
border-radius: 5px;
border: 1px solid #999999;
line-height: 32px;
cursor: pointer;
display: flex;
justify-content: center;
}

.know{
  color: #f9772a;
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