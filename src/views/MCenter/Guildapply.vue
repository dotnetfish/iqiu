<template>
  <section class="apply me-wrap">
    <div style="display: flex; margin-left: 14px">
      <div
        style="width: 140px; text-align: left; color: #333333; font-size: 20px"
      >
        公会封面
      </div>
      <div>
        <!-- <el-upload
          class="avatar-uploader"
          :before-upload="beforeUpload1"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          ref="inputer"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <img v-if="fileList[0].url" :src="fileList[0].url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__text">点击上传封面</div>
          <div class="el-upload__tip" slot="tip" style="color: #F93434">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload> -->
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img style="width:200px;height:200px" v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div style="display: flex; margin-left: 14px; margin-top: 34px">
      <div
        style="
          width: 140px;
          text-align: left;
          color: #333333;
          font-size: 20px;
          height: 40px;
          line-height: 40px;
        "
      >
        公会名称
      </div>
      <div>
        <el-input
          v-model="name"
          placeholder="不超过十个字"
          maxlength="10"
        ></el-input>
      </div>
    </div>
    <div style="display: flex; margin-left: 14px; margin-top: 34px">
      <div
        style="width: 140px; text-align: left; color: #333333; font-size: 20px"
      >
        公会介绍
      </div>
      <div>
        <el-input
          type="textarea"
          v-model="content"
          placeholder="不超过300字"
          maxlength="300"
        ></el-input>
      </div>
    </div>
    <div style="display: flex; margin-left: 14px; margin-top: 34px">
      <div
        style="
          width: 140px;
          text-align: left;
          color: #333333;
          font-size: 20px;
          height: 40px;
          line-height: 40px;
        "
      >
        公会负责人
      </div>
      <div>
        <el-input v-model="bossname"></el-input>
      </div>
    </div>
    <div style="display: flex; margin-left: 14px; margin-top: 34px">
      <div
        style="width: 140px; text-align: left; color: #333333; font-size: 20px"
      >
        上传证件照
      </div>
      <div style="margin-right: 60px">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload1"
        >
          <img style="width:200px;height:200px" v-if="imageUrl1" :src="imageUrl1" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-upload
          class="upload-demo"
          :file-list="fileList1"
          :on-change="beforeUpload2"
          ref="inputer"
          list-type="picture-card"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击上传正面</div>
        </el-upload> -->
      </div>
      <div>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload2"
        >
          <img style="width:200px;height:200px" v-if="imageUrl2" :src="imageUrl2" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-upload
          class="upload-demo"
          :on-change="beforeUpload3"
          :file-list="fileList2"
          ref="inputer"
          list-type="picture-card"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击上传反面</div>
        </el-upload> -->
      </div>
    </div>
    <div style="display: flex; margin-left: 14px; margin-top: 34px">
      <div
        style="
          width: 140px;
          text-align: left;
          color: #333333;
          font-size: 20px;
          height: 40px;
          line-height: 40px;
        "
      >
        公会联系方式
      </div>
      <div>
        <el-input v-model="tel"></el-input>
      </div>
    </div>
    <div style="display: flex; margin-left: 14px; margin-top: 34px">
      <div
        style="width: 140px; text-align: left; color: #333333; font-size: 20px"
      >
        公会主营品类
      </div>
      <div>
        <el-input
          type="textarea"
          v-model="sign"
          placeholder="不超过300字"
          maxlength="300"
        ></el-input>
      </div>
    </div>
    <div style="display: flex; margin-left: 14px; margin-top: 34px">
      <div
        style="width: 140px; text-align: left; color: #333333; font-size: 20px"
      >
        营业执照
      </div>
      <div style="margin-right: 60px">
        <!-- <el-upload
          class="upload-demo"
          :on-change="beforeUpload4"
          :file-list="fileList3"
          ref="inputer"
          list-type="picture-card"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击上传照片</div>
        </el-upload> -->
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess3"
          :before-upload="beforeAvatarUpload3"
        >
          <img style="width:200px;height:200px" v-if="imageUrl3" :src="imageUrl3" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div style="display: flex; margin-top: 34px; margin-left: 154px">
      <div
        style="
          color: #ffffff;
          font-size: 18px;
          height: 40px;
          line-height: 40px;
          width: 200px;
          text-align: center;
          background-color: #F9772A;
          cursor: pointer;
        "
        @click="getunionadd"
      >
        提交
      </div>
    </div>
  </section>
</template>

<script>
import { getKey, unionadd } from "@/api/api";

export default {
  name: "Guildapply",
  components: {},
  data() {
    return {
      name: "",
      content: "",
      bossname: "",
      tel: "",
      sign: "",
      accessKeyId: "",
      accessKeySecret: "",
      downloadUrl: "",
      downloadUrl1: "",
      downloadUrl2: "",
      downloadUrl3: "",
      fileList: [{ url: "" }],
      fileList1: [{ url: "" }],
      fileList2: [{ url: "" }],
      fileList3: [{ url: "" }],
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      imageUrl3: "",
    };
  },
  methods: {
    //申请
    getunionadd() {
      let data = {
        name: this.name,
        manager: this.bossname,
        managerContact: this.tel,
        managerUrl: this.downloadUrl1,
        managerReUrl: this.downloadUrl2,
        businessUrl: this.downloadUrl3,
        logo: this.downloadUrl,
        contact: this.tel,
        businessType: this.sign,
        dec: this.content,
        recruit: "",
      };
      unionadd(data).then((res) => {
        if (res.code == 0) {
          this.$message({
            message: "申请成功待审核",
            type: "success",
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess1(res, file) {
      this.imageUrl1 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file) {
      this.imageUrl3 = URL.createObjectURL(file.raw);
    },
    //1
    beforeAvatarUpload(file) {
      console.log(file);
      const OSS = require("ali-oss/dist/aliyun-oss-sdk");
      let client = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "this.accessKeyId",
        accessKeySecret: "this.accessKeySecret",
        bucket: "iqiulive-static",
      });
      getKey(data).then((res) => {
        client.options.accessKeyId = res.data.ak;
        client.options.accessKeySecret = res.data.as;
      });

      // console.log('33333=',this.$refs.inputer.uploadFiles);
      var key = new Date().getTime();//生成时间戳
      // file.name = key
      // const Name = file.name;
      const Name = file.name;
      // console.log("生成key", file);
      const filename = "/avatar/" + key + Name; // 组成新文件名
      const data = file;

      setTimeout(() => {
        client
          .multipartUpload(filename, data)
          .then((res) => {
            if (res.res.status === 200) {
              console.log('333333333=',res);
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.imageUrl = "http://static.cloudartisan.cn/avatar/" + key + Name
              this.downloadUrl = "http://static.cloudartisan.cn/avatar/" + key + Name;
            }
            // 上传
          })
          .catch((err) => {});
      }, 200);
    },
    //2
    beforeAvatarUpload1(file) {
      console.log(file);
      const OSS = require("ali-oss/dist/aliyun-oss-sdk");
      let client = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "this.accessKeyId",
        accessKeySecret: "this.accessKeySecret",
        bucket: "iqiulive-static",
      });
      getKey(data).then((res) => {
        client.options.accessKeyId = res.data.ak;
        client.options.accessKeySecret = res.data.as;
      });

      // console.log(this.$refs.inputer.uploadFiles);
      var key = new Date().getTime();//生成时间戳
      const Name = file.name;
      const filename = "/avatar/" + key + Name; // 组成新文件名
      const data = file;

      setTimeout(() => {
        client
          .multipartUpload(filename, data)
          .then((res) => {
            if (res.res.status === 200) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.imageUrl1 = "http://static.cloudartisan.cn/avatar/" + key + Name
              this.downloadUrl1 = "http://static.cloudartisan.cn/avatar/" + key + Name;
            }
            // 上传
          })
          .catch((err) => {});
      }, 200);
    },
    //3
    beforeAvatarUpload2(file) {
      console.log(file);
      const OSS = require("ali-oss/dist/aliyun-oss-sdk");
      let client = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "this.accessKeyId",
        accessKeySecret: "this.accessKeySecret",
        bucket: "iqiulive-static",
      });
      getKey(data).then((res) => {
        client.options.accessKeyId = res.data.ak;
        client.options.accessKeySecret = res.data.as;
      });

      // console.log(this.$refs.inputer.uploadFiles);
      var key = new Date().getTime();//生成时间戳
      const Name = file.name;
      const filename = "/avatar/" + key + Name; // 组成新文件名
      const data = file;

      setTimeout(() => {
        client
          .multipartUpload(filename, data)
          .then((res) => {
            if (res.res.status === 200) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.imageUrl2 = "http://static.cloudartisan.cn/avatar/" + key + Name
              this.downloadUrl2 = "http://static.cloudartisan.cn/avatar/" + key + Name;
            }
            // 上传
          })
          .catch((err) => {});
      }, 200);
    },
    //4
    beforeAvatarUpload3(file) {
      console.log(file);
      const OSS = require("ali-oss/dist/aliyun-oss-sdk");
      let client = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "this.accessKeyId",
        accessKeySecret: "this.accessKeySecret",
        bucket: "iqiulive-static",
      });
      getKey(data).then((res) => {
        client.options.accessKeyId = res.data.ak;
        client.options.accessKeySecret = res.data.as;
      });

      // console.log(this.$refs.inputer.uploadFiles);
      var key = new Date().getTime();//生成时间戳
      const Name = file.name;
      const filename = "/avatar/" + key + Name; // 组成新文件名
      const data = file;

      setTimeout(() => {
        client
          .multipartUpload(filename, data)
          .then((res) => {
            if (res.res.status === 200) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.imageUrl3 = "http://static.cloudartisan.cn/avatar/" + key + Name
              this.downloadUrl3 = "http://static.cloudartisan.cn/avatar/" + key + Name;
            }
            // 上传
          })
          .catch((err) => {});
      }, 200);
    },
    OSS() {
      const OSS = require("ali-oss/dist/aliyun-oss-sdk");
      let client = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "this.accessKeyId",
        accessKeySecret: "this.accessKeySecret",
        bucket: "iqiulive-static",
      });
      getKey(data).then((res) => {
        client.options.accessKeyId = res.data.ak;
        client.options.accessKeySecret = res.data.as;
      });
    },
    //照片
    // beforeUpload1(file) {
    //   // console.log("999999999999==", this.fileList);
    //   const OSS = require("ali-oss/dist/aliyun-oss-sdk");
    //   let client = new OSS({
    //     region: "oss-cn-shenzhen",
    //     accessKeyId: "this.accessKeyId",
    //     accessKeySecret: "this.accessKeySecret",
    //     bucket: "iqiulive-static",
    //   });
    //   getKey(data).then((res) => {
    //     client.options.accessKeyId = res.data.ak;
    //     client.options.accessKeySecret = res.data.as;
    //   });
    //   console.log("66666666666666666666666==", this.$refs.inputer.uploadFiles);
    //   const Name = this.$refs.inputer.uploadFiles[1].name;
    //   console.log("7777777777777777777==", Name);
    //   // const suffix = Name.substr(Name.indexOf('.'))              // 文件后缀
    //   const filename = "/avatar/" + Name; // 组成新文件名
    //   const data = this.$refs.inputer.uploadFiles[1].raw;
    //   this.downloadUrl = "http://static.cloudartisan.cn/avatar/" + Name;
    //   this.fileList[0].url = this.downloadUrl;
    //   setTimeout(() => {
    //     client
    //       .multipartUpload(filename, data)
    //       .then((res) => {
    //         // 上传
    //         this.$message({
    //           message: "添加成功",
    //           type: "success",
    //         });
    //         var string = res.res.requestUrls[0];
    //       })
    //       .catch((err) => {});
    //   }, 1000);
    //   console.log("999999999999==", this.fileList);
    // },
    // beforeUpload2(file) {
    //   const OSS = require("ali-oss/dist/aliyun-oss-sdk");
    //   let client = new OSS({
    //     region: "oss-cn-shenzhen",
    //     accessKeyId: "this.accessKeyId",
    //     accessKeySecret: "this.accessKeySecret",
    //     bucket: "iqiulive-static",
    //   });
    //   getKey(data).then((res) => {
    //     client.options.accessKeyId = res.data.ak;
    //     client.options.accessKeySecret = res.data.as;
    //   });
    //   const Name = this.$refs.inputer.uploadFiles[1].name;
    //   // const suffix = Name.substr(Name.indexOf('.'))              // 文件后缀
    //   const filename = "/avatar/" + Name; // 组成新文件名
    //   const data = this.$refs.inputer.uploadFiles[1].raw;
    //   this.downloadUrl1 = "http://static.cloudartisan.cn/avatar/" + Name;
    //   this.fileList1[0].url = this.downloadUrl1;
    //   setTimeout(() => {
    //     client
    //       .multipartUpload(filename, data)
    //       .then((res) => {
    //         // 上传
    //         this.$message({
    //           message: "添加成功",
    //           type: "success",
    //         });
    //         var string = res.res.requestUrls[0];
    //       })
    //       .catch((err) => {});
    //   }, 1000);
    // },
    // beforeUpload3(file) {
    //   const OSS = require("ali-oss/dist/aliyun-oss-sdk");
    //   let client = new OSS({
    //     region: "oss-cn-shenzhen",
    //     accessKeyId: "this.accessKeyId",
    //     accessKeySecret: "this.accessKeySecret",
    //     bucket: "iqiulive-static",
    //   });
    //   getKey(data).then((res) => {
    //     client.options.accessKeyId = res.data.ak;
    //     client.options.accessKeySecret = res.data.as;
    //   });
    //   console.log("999999999999==", this.$refs.inputer.uploadFiles);
    //   const Name = this.$refs.inputer.uploadFiles[1].name;
    //   // const suffix = Name.substr(Name.indexOf('.'))              // 文件后缀
    //   const filename = "/avatar/" + Name; // 组成新文件名
    //   //  console.log("999999999999==",this.$refs.inputer.uploadFiles)
    //   const data = this.$refs.inputer.uploadFiles[1].raw;
    //   this.downloadUrl2 = "http://static.cloudartisan.cn/avatar/" + Name;
    //   this.fileList2[0].url = this.downloadUrl2;
    //   setTimeout(() => {
    //     client
    //       .multipartUpload(filename, data)
    //       .then((res) => {
    //         console.log(res);
    //         // 上传
    //         this.$message({
    //           message: "添加成功",
    //           type: "success",
    //         });
    //         var string = res.res.requestUrls[0];
    //       })
    //       .catch((err) => {});
    //   }, 1000);
    // },
    // beforeUpload4(file) {
    //   const OSS = require("ali-oss/dist/aliyun-oss-sdk");
    //   let client = new OSS({
    //     region: "oss-cn-shenzhen",
    //     accessKeyId: "this.accessKeyId",
    //     accessKeySecret: "this.accessKeySecret",
    //     bucket: "iqiulive-static",
    //   });
    //   getKey(data).then((res) => {
    //     client.options.accessKeyId = res.data.ak;
    //     client.options.accessKeySecret = res.data.as;
    //   });
    //   this.$refs.inputer.uploadFiles = "";

    //   //  console.log("999999999999==",this.$refs.inputer.uploadFiles[1].name)
    //   console.log("999999999999==", this.$refs.inputer.uploadFiles);
    //   const Name = this.$refs.inputer.uploadFiles[1].name;
    //   // const suffix = Name.substr(Name.indexOf('.'))              // 文件后缀
    //   const filename = "/avatar/" + Name; // 组成新文件名
    //   const data = this.$refs.inputer.uploadFiles[1].raw;
    //   this.downloadUrl3 = "http://static.cloudartisan.cn/avatar/" + Name;
    //   this.fileList3[0].url = this.downloadUrl3;
    //   setTimeout(() => {
    //     client
    //       .multipartUpload(filename, data)
    //       .then((res) => {
    //         // 上传
    //         this.$message({
    //           message: "添加成功",
    //           type: "success",
    //         });
    //         var string = res.res.requestUrls[0];
    //       })
    //       .catch((err) => {});
    //   }, 1000);
    // },
  },
  mounted() {},
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
::v-deep .el-input__inner:focus {
  border-color: #F9772A !important;
}
::v-deep .el-upload-dragger {
  width: 134px;
  height: 134px;
}
::v-deep .el-textarea__inner:focus {
  border-color: #F9772A !important;
}
::v-deep .el-textarea__inner {
  width: 500px;
  height: 120px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>