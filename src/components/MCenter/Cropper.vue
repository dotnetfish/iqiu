<template>
  <div class="ve-cropper">
    <el-upload class="upload-demo" action='#' drag :headers="uploadHeaders"
               :with-credentials="true" :before-upload="beforeUpload" :show-file-list="false">
      <slot></slot>
<!--            <i class="el-icon-upload"></i>-->
<!--      <img :src="require('@/assets/img/Mcenter-upload.png')" class="upload" alt="">-->
<!--      <div class="el-upload__text">添加头像</div>-->
<!--      <div class="el-upload__tip" slot="tip">请选择图片上传：支持JPG、PNG 等格式，图片需小于2M</div>-->
    </el-upload>
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
          ></vueCropper>
        </div>
        <div style="width:260px;">
          <div class="show-preview" :style="{'width': '200px', 'height':'200px'}">
            <div :style="previews.div" class="preview">
                <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Button, Dialog, Upload, Message } from 'element-ui';
  //import { upLoadFileBase} from "@/api/mcenterapi";
  import { VueCropper } from 'vue-cropper';
  export default {
    components: {
      [Dialog.name]: Dialog,
      [Upload.name]: Upload,
      [Button.name]: Button,
      [Message.name]: Message,
      VueCropper
    },
    data() {
      return {
        dialogVisible: false,
        previews: {},
        // 裁剪组件的基础配置option
        option: {
          img: '', // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 0.8, // 裁剪生成图片的质量
          outputType: 'jpeg', // 裁剪生成图片的格式
          canScale: true, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          // autoCropWidth: 500, // 默认生成截图框宽度
          // autoCropHeight: 500, // 默认生成截图框高度
          fixedBox: true, // 固定截图框大小 不允许改变
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [10, 10], // 截图框的宽高比例
          full: true, // 是否输出原图比例的截图
          canMoveBox: false, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: false, // 截图框是否被限制在图片里面
          infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        },
        picsList: [],  //页面显示的数组
        // 防止重复提交
        urlapi: process.env.VUE_APP_ZY_API + "/aiqiu/v1/upLoad/file?uploadType=AVATAR",
        loading: false,
        uploadHeaders:{
					'Content-Type': 'multipart/form-data'
        },

        //
        imgs: [],
				//判断图片的类型
				imgData: {
					accept: 'image/gif, image/jpeg, image/png, image/jpg',
				}
      }
    },
    methods: {
      beforeUpload(file){
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          Message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
        // 转base64
        this.getBase64(file).then(resBase64 => {
        // this.fileBase64 = resBase64.split(',')[1]//直接拿到base64信息
          this.$nextTick(() => {
            this.option.img = resBase64
            this.dialogVisible = true
          })
        })
      },
      // 获取本地图片转化为base 64
      getBase64(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          let fileResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {// 开始转
            fileResult = reader.result;
          }
          reader.onerror = function(error) {// 转 失败
            reject(error);
          }
          reader.onloadend = function() {//转 结束  咱就 resolve 出去
            resolve(fileResult);
          }
        });
      },
      // 实时预览函数
      realTime(data) {
        console.log('realTime');
        this.previews = data
      },

      // 点击裁剪，这一步是可以拿到处理后的地址
      finish() {
        this.$refs.cropper.getCropData((data) => {
          // 可能需要转码？？？
          let file = data.slice(data.indexOf(',') + 1)
          let data2 ={
              "file": file,
              secondDir: "string",
              "uploadType": "AVATAR"
            }
          this.$axios.post(process.env.VUE_APP_ZY_API + "/aiqiu/v1/app/upload/fileBase", data2, {
					headers: {'Content-Type': 'text/plain'}
         }
        ).then(response => {
          console.log('剪裁后-上传response',response)
          if (response.data.code === 0) {
              this.dialogVisible = false
              this.$emit('updataImg', response.data.data[0])
            } else {
               Message.error(response.data.msg)
            }
        })

        //   upLoadFileBase(data2).then((response) => {
        //     if (response.data.code === 0) {
        //       this.dialogVisible = false;
        //       this.$emit('updataImg', response.data.data[0]);
        //     } else {
        //        Message.error(response.data.msg)
        //     }
        //  })

      })
    },
  }
  }
</script>

<style scoped>

  .cropper-content {
    display: flex;


    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
     align-items: center;
  }

  .cropper-content .cropper {
    width: 260px;
    height: 260px;
  }

  .cropper-content .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
  }

  .cropper-content .show-preview .preview {
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #cccccc;
    background: #cccccc;
  }

  .upload {
    margin-top: 78px;
    height: 52px;
    width: 61px;
  }
  .el-upload__text {
    margin-top: 4px;
    font-size: 13px;
    color: #797A82;
  }
  .el-upload__tip {
    width: 211px;
    font-size: 14px;
    font-weight:400;
    color:rgba(119,119,119,1);
    line-height:20px;
  }

</style>


<style>
  .ve-cropper .el-upload-dragger {
    width: 120px;
    height: 120px;
    border: 0 none;

    /*background-color: #E9EAEC;*/
  }
  .el-upload-dragger .el-icon-upload {
    font-size: 40px;
  }
  .ve-cropper .el-upload-dragger .el-icon-upload {
    margin-top: -3px
  }

</style>
