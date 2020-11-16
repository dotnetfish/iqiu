<template>
  <div>
      <div id="qrcode" ref="qrcode" style="width: 200px;margin:auto;margin-top:200px"></div>
      <div style="text-align:center;margin-top: 20px;">请微信扫码支付</div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>请确认是否已完成支付</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Getmessage()">确认支付</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import axios from "@/api/axios";
import { zfbinfo } from "@/api/api";
import { Dialog,Button,Message} from "element-ui";
export default {
  data() {
    return {
      num:0,
      dialogVisible:false
    };
  },
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Message.name]: Message,
  },
    mounted() {
      setTimeout(() => {
      let qrcode = new QRCode('qrcode',{
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: this.$route.query.htmls // 设置二维码内容或跳转地址
        })
     }, 200);
     setTimeout(() => {
      this.getmessage()
     }, 200);
  },
  created(){
    this.timer = setInterval(this.getmessage,10000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods:{
    getmessage(){
      this.num = this.num + 1;
      // console.log("aaaaaaaaaaaaaaas",this.$route.query.payid)
      if(this.num<6){
        let data = {
        payId: this.$route.query.payid
      }
      zfbinfo(data).then((res) => {       
        if(res.data.status==1){
          this.$router.push({ path: '/paysuccess' })
        } 
        console.log("aaaaaaaaaaaaaaa",res)
      });
      }else{
        this.dialogVisible = true;
      }
      // axios.post('/wxzf/pay/orderquery').then(res=>{
      //   console.log("aaaaaaaaaaaaaaa",res)
      // })
    },
    Getmessage(){
        let data = {
        payId: this.$route.query.payid
      }
      zfbinfo(data).then((res) => {       
        if(res.data.status==1){
          this.$router.push({ path: '/paysuccess' })
        }else{
          Message.error({
              message: "还未支付成功，请重新确认",
            });
        } 
      });
      this.dialogVisible = false
    }
  },
};
</script>