<template>
  <section class="apply me-wrap">
    <div style="display:flex;margin-left:14px">
        <div style="width:140px;text-align:left;color:#333333;font-size: 20px;">公会封面</div>
        <div>
            <el-upload
                class="upload-demo"
                :file-list=fileList
                list-type="picture-card"
                :on-change="beforeUpload1"
                ref="inputer"
                action="https://jsonplaceholder.typicode.com/posts/">
                <i class="el-icon-upload"></i>
                <!-- <div class="el-upload__text">点击上传封面</div> -->
                <div class="el-upload__tip" slot="tip" style="color:#F93434">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
    </div>
    <div style="display:flex;margin-left:14px;margin-top:34px">
        <div style="width:140px;text-align:left;color:#333333;font-size: 20px;height:40px;line-height:40px">公会名称</div>
        <div>
            <el-input v-model="name" placeholder="不超过十个字" maxlength="10"></el-input>
        </div>
    </div>
    <div style="display:flex;margin-left:14px;margin-top:34px">
        <div style="width:140px;text-align:left;color:#333333;font-size: 20px;">公会介绍</div>
        <div>
            <el-input type="textarea" v-model="content" placeholder="不超过300字" maxlength="300"></el-input>
        </div>
    </div>
    <div style="display:flex;margin-left:14px;margin-top:34px">
        <div style="width:140px;text-align:left;color:#333333;font-size: 20px;height:40px;line-height:40px">公会负责人</div>
        <div>
            <el-input v-model="bossname"></el-input>
        </div>
    </div>
    <div style="display:flex;margin-left:14px;margin-top:34px">
        <div style="width:140px;text-align:left;color:#333333;font-size: 20px;">上传证件照</div>
        <div style="margin-right:60px">
            <el-upload
                class="upload-demo"
                :on-change="beforeUpload2"
                :file-list=fileList1
                list-type="picture-card"
                action="https://jsonplaceholder.typicode.com/posts/">
                <i class="el-icon-upload">正面</i>
                <!-- <div class="el-upload__text">点击上传正面</div> -->
            </el-upload>
        </div>
        <div>
            <el-upload
                class="upload-demo"
                :on-change="beforeUpload3"
                :file-list=fileList2
                list-type="picture-card"
                action="https://jsonplaceholder.typicode.com/posts/">
                <i class="el-icon-upload">反面</i>
                <!-- <div class="el-upload__text">点击上传反面</div> -->
            </el-upload>
        </div>
    </div>
    <div style="display:flex;margin-left:14px;margin-top:34px">
        <div style="width:140px;text-align:left;color:#333333;font-size: 20px;height:40px;line-height:40px">公会联系方式</div>
        <div>
            <el-input v-model="tel"></el-input>
        </div>
    </div>
    <div style="display:flex;margin-left:14px;margin-top:34px">
        <div style="width:140px;text-align:left;color:#333333;font-size: 20px;">公会招募信息</div>
        <div>
            <el-input type="textarea" v-model="sign" placeholder="不超过300字" maxlength="300"></el-input>
        </div>
    </div>
    <div style="display:flex;margin-left:14px;margin-top:34px">
        <div style="width:140px;text-align:left;color:#333333;font-size: 20px;">营业执照</div>
        <div style="margin-right:60px">
            <el-upload
                class="upload-demo"
                :on-change="beforeUpload4"
                :file-list=fileList3
                list-type="picture-card"
                action="https://jsonplaceholder.typicode.com/posts/">
                <i class="el-icon-upload"></i>
                <!-- <div class="el-upload__text">点击上传照片</div> -->
            </el-upload>
        </div>
    </div>
    <div style="display:flex;margin-top:34px;margin-left:154px">
        <div style="color:#ffffff;font-size:18px;height:40px;line-height:40px;width:200px;text-align:center;background-color:#F9772A;cursor: pointer;" @click="getunionupdate">提交</div>
    </div>
  </section>
</template>

<script>
import { getKey, myUnion, unionupdate, unionRole } from "@/api/api";

export default {
  name: "Guildapply",
  components: {
  },
  data() {
    return {
        unionId:'',
        name:'',
        content:'',
        bossname:'',
        tel:'',
        sign:'',
        accessKeyId:'',
        accessKeySecret:'',
        downloadUrl:'',
        downloadUrl1:'',
        downloadUrl2:'',
        downloadUrl3:'',
        info:[],
        fileList:[{url:''}],
        fileList1:[{url:''}],
        fileList2:[{url:''}],
        fileList3:[{url:''}],
    };
  },
  methods: {
      //修改
      getunionupdate(){
          let data = {
              id:this.unionId,
              name: this.name,
              manager: this.bossname,
              managerContact: this.tel,
              managerUrl:this.downloadUrl1,
              managerReUrl:this.downloadUrl2,
              businessUrl:this.downloadUrl3,
              logo: this.downloadUrl,
              contact: this.tel,
              recruit:this.sign,
              dec:this.content,
              businessType:''
          }
          unionupdate(data).then((res) => {
            if(res.code==0){
                this.$message({
            message: "修改成功",
            type: "success",
          });
            }else{
                this.$message({
            message: res.msg,
            type: "error",
          });
            }
      });
      },
      //照片
      beforeUpload1(file){
      const OSS = require('ali-oss/dist/aliyun-oss-sdk')
      let client = new OSS({
      region: 'oss-cn-shenzhen',
      accessKeyId: 'this.accessKeyId',
      accessKeySecret: 'this.accessKeySecret',
      bucket: 'iqiulive-static'
    });
    getKey(data).then((res) => {
        client.options.accessKeyId = res.data.ak
        client.options.accessKeySecret = res.data.as
      });
      const Name = this.$refs.inputer.uploadFiles[0].name
      const suffix = Name.substr(Name.indexOf('.'))              // 文件后缀
      const filename ='/avatar/' + Name          // 组成新文件名     
      const data = this.$refs.inputer.uploadFiles[0].raw;
      this.downloadUrl = 'http://static.cloudartisan.cn/avatar/' + Name
      setTimeout(() => {
        client.multipartUpload(filename, data).then(res => {   // 上传
            this.$message({
            message: "添加成功",
            type: "success",
          });
            var string = res.res.requestUrls[0];
        }).catch(err => {
        })
     }, 1000);
      },
      beforeUpload2(file){
      const OSS = require('ali-oss/dist/aliyun-oss-sdk')
      let client = new OSS({
      region: 'oss-cn-shenzhen',
      accessKeyId: 'this.accessKeyId',
      accessKeySecret: 'this.accessKeySecret',
      bucket: 'iqiulive-static'
    });
    getKey(data).then((res) => {
        client.options.accessKeyId = res.data.ak
        client.options.accessKeySecret = res.data.as
      });
      const Name = this.$refs.inputer.uploadFiles[0].name
      const suffix = Name.substr(Name.indexOf('.'))              // 文件后缀
      const filename ='/avatar/' + Name          // 组成新文件名     
      const data = this.$refs.inputer.uploadFiles[0].raw;
      this.downloadUrl1 = 'http://static.cloudartisan.cn/avatar/' + Name
      setTimeout(() => {
        client.multipartUpload(filename, data).then(res => {   // 上传
            this.$message({
            message: "添加成功",
            type: "success",
          });
            var string = res.res.requestUrls[0];
        }).catch(err => {
        })
     }, 1000);
      },
      beforeUpload3(file){
      const OSS = require('ali-oss/dist/aliyun-oss-sdk')
      let client = new OSS({
      region: 'oss-cn-shenzhen',
      accessKeyId: 'this.accessKeyId',
      accessKeySecret: 'this.accessKeySecret',
      bucket: 'iqiulive-static'
    });
    getKey(data).then((res) => {
        client.options.accessKeyId = res.data.ak
        client.options.accessKeySecret = res.data.as
      });
      const Name = this.$refs.inputer.uploadFiles[0].name
      const suffix = Name.substr(Name.indexOf('.'))              // 文件后缀
      const filename ='/avatar/' + Name          // 组成新文件名     
      const data = this.$refs.inputer.uploadFiles[0].raw;
      this.downloadUrl2 = 'http://static.cloudartisan.cn/avatar/' + Name
      setTimeout(() => {
        client.multipartUpload(filename, data).then(res => {   // 上传
            this.$message({
            message: "添加成功",
            type: "success",
          });
            var string = res.res.requestUrls[0];
        }).catch(err => {
        })
     }, 1000);
      },
      beforeUpload4(file){
      const OSS = require('ali-oss/dist/aliyun-oss-sdk')
      let client = new OSS({
      region: 'oss-cn-shenzhen',
      accessKeyId: 'this.accessKeyId',
      accessKeySecret: 'this.accessKeySecret',
      bucket: 'iqiulive-static'
    });
    getKey(data).then((res) => {
        client.options.accessKeyId = res.data.ak
        client.options.accessKeySecret = res.data.as
      });
      const Name = this.$refs.inputer.uploadFiles[0].name
      const suffix = Name.substr(Name.indexOf('.'))              // 文件后缀
      const filename ='/avatar/' + Name          // 组成新文件名     
      const data = this.$refs.inputer.uploadFiles[0].raw;
      this.downloadUrl3 = 'http://static.cloudartisan.cn/avatar/' + Name
      setTimeout(() => {
        client.multipartUpload(filename, data).then(res => {   // 上传
            this.$message({
            message: "添加成功",
            type: "success",
          });
            var string = res.res.requestUrls[0];
        }).catch(err => {
        })
     }, 1000);
      },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
          })
      },
      //获取公会信息
      getmyUnion() {
        myUnion().then((res) => {
            this.info = res.data
            this.name = this.info.name
            this.content = this.info.dec
            this.bossname = this.info.manager
            this.tel = this.info.contact
            this.sign = this.info.businessType
            this.downloadUrl = this.info.logo
            this.downloadUrl1 = this.info.managerUrl
            this.downloadUrl2= this.info.managerReUrl
            this.downloadUrl3 = this.info.businessUrl
            this.fileList[0].url = this.downloadUrl
            this.fileList1[0].url = this.downloadUrl1
            this.fileList2[0].url = this.downloadUrl2
            this.fileList3[0].url = this.downloadUrl3  
      });
      },
  },
  mounted() {
      this.getmyUnion();
      this.getunionRole();
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
::v-deep .el-upload-dragger{
    width: 134px;
    height: 134px;
}
::v-deep .el-textarea__inner:focus{
    border-color:  #F9772A !important;
}
::v-deep .el-textarea__inner{
    width: 500px;
    height: 120px;
}
</style>