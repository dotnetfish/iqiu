<template>
  <section class="apply me-wrap" v-show="!loading">
    <template v-if="!userInfo.isAnchor">
      <template v-if="status == 'UNCOMMITTED'">
        <h3 class="apply-title">简单三步，轻松开播</h3>
        <el-steps :active="active" align-center >
          <el-step title="绑定手机">
          </el-step>
          <el-step title="填写资料"></el-step>
          <el-step title="自我介绍"></el-step>
        </el-steps>
        <section class="step-1" v-if="active === 1">
          <el-form :model="form" :rules="rules" ref="form" label-width="70px" class="form-wrap">
            <el-form-item label="手机号" prop="mobile" class="item">
              <el-input v-model="form.mobile" placeholder="请输入手机号" clearable size="medium"
                        style="width:160px"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code" class="item">
              <el-input v-model="form.code" placeholder="请输入验证码" clearable size="medium"
                        style="width:160px;margin-right: 10px"></el-input>
              <el-button type="primary" plain size="small" @click="getMobileCode" :disabled="coutDown!= 60">{{
                coutDown==60?'获取验证码':coutDown }}
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" class="btn-next" @click="submitForm">下一步</el-button>
            </el-form-item>
          </el-form>
        </section>
        <section class="step-2" v-if="active === 2">
          <el-form :model="form2" :rules="rules2" ref="form2" label-width="80px" class="form-wrap">
            <el-form-item label="真实姓名" prop="realName" class="item">
              <el-input v-model="form2.realName" placeholder="请输入真实姓名" clearable size="medium"
                        style="width:160px"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNumber" class="item">
              <el-input v-model="form2.idNumber" placeholder="请输入身份证号" clearable size="medium"
                        style="width:160px;"></el-input>
            </el-form-item>
            <el-form-item label="身份验证" style="margin-left: -270px;margin-bottom: 0px">
            </el-form-item>
            <!--        <span>身份验证</span>-->
            <div class="upload-wrap">
              <el-upload class="upload-demo" action='#' :auto-upload="false" :on-change="beforeUpload1" :show-file-list="false">
                <img :src="imgList.frontImageUrlBase64 || require('@/assets/img/Mcenter-apply-icon1.png')" style="width:150px;height: 100px;">
              </el-upload>
              <el-upload class="upload-demo" action='#' :auto-upload="false" :on-change="beforeUpload2" :show-file-list="false">
                <img :src="imgList.backImageUrlBase64 || require('@/assets/img/Mcenter-apply-icon2.png')" style="width:150px;height: 100px;margin: 0 30px;">
              </el-upload>
              <el-upload class="upload-demo" action='#' :auto-upload="false" :on-change="beforeUpload3" :show-file-list="false">
                <img :src="imgList.handImageUrlBase64 || require('@/assets/img/Mcenter-apply-icon3.png')" style="width:150px;height: 100px;">
              </el-upload>

              <!--            <img style="width:118px;height: 86px;" src="@/assets/img/Mcenter-apply-icon1.png">-->
              <!--            <img style="width:118px;height: 86px;" src="@/assets/img/Mcenter-apply-icon2.png">-->
              <!--            <img style="width:118px;height: 86px;" src="@/assets/img/Mcenter-apply-icon3.png">-->
            </div>

            <el-form-item>
              <el-button type="primary" size="small" class="btn-next" @click="submitForm2">下一步</el-button>
            </el-form-item>
          </el-form>
        </section>
        <section class="step-3" v-if="active === 3">
          <el-form :model="form3" :rules="rules3" ref="form3" class="form-wrap">
            <el-form-item prop="desc" class="item">
              <el-input v-model="form3.desc" type="textarea" placeholder="简单描述下自己吧~" rows="4" maxlength="80"
                        show-word-limit
                        style="width:340px"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small" class="btn-next" style="margin-left: 0" @click="submitForm3">下一步
              </el-button>
            </el-form-item>
          </el-form>
        </section>
      </template>
      <template v-if="status == 'REFUSED'">
        <div class="isAnchor">审核失败
        </div>
      </template>
      <template v-if="status == 'RUNNING'">
        <div class="isAnchor">审核中
        </div>
      </template>
    </template>
    <div class="anchor" v-else>
      <div class="isAnchor">你已经是一名主播了，赶快去开启开播吧！
      </div>
      <a target="_blank" :href="DOWNLOAD_APP_URL">
        <el-button type="primary" size="small" class="beginbo">开始直播
        </el-button>
      </a>


    </div>
  </section>
</template>

<script>
  import { Steps, Step, Button, Input, Form, FormItem, Message, Upload } from 'element-ui';
  import { encrypt } from "@/modules/utils/crypto.js";
  import { getCodeEncrypt, checkCode, checkStatus, checkSecond, checkThird } from "@/api/api";
  import { usersLoginInfo } from "@/api/mcenterapi";

  export default {
    name: "AnchorApply",
    components: {
      [Steps.name]: Steps,
      [Step.name]: Step,
      [Button.name]: Button,
      [Input.name]: Input,
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Upload.name]: Upload,
    },
    // watch: {
    //   'form2.frontImageUrl': {
    //     handler: function () {
    //       this.frontImageUrl =  this.form2.frontImageUrl || require('@/assets/img/Mcenter-apply-icon1.png')
    //
    //     },
    //     immediate: true
    //   }
    // },

    data() {
      var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        }
        if (/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
          callback();
        } else {
          callback(new Error('手机号格式有误'));
        }
      };
      return {
        status:'', // 0 UNCOMMITTED 未提交申请 1 REFUSED 审核失败 2 RUNNING 审核中 3 SUCCESS 成功 4 LOGOUT 已注销
        userInfo: {},
        loading: true,
        active: 1,
        coutDown: 60,
        form: {
          mobile: '',
          code: ''
        },
        rules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkMobile, trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
        },
        imgList: {

        },
        form2: {
          realName: '',
          idNumber: ''
        },
        rules2: {
          realName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          idNumber: [
            { required: true, message: '请输入身份证号', trigger: 'blur' }
          ],
        },
        form3: {
          desc: '',
        },
        rules3: {
          desc: [
            { required: true, message: '请输入自我介绍', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      beforeUpload1(file){
        const isLt2M = file.size / 1024/ 1024 < 10;
        // console.log(file);
        if (!isLt2M) {
          Message.error('上传图片大小不能超过 10MB!')
          return false
        }
        this.getImgUrl(file.raw, 'frontImageUrl')
      },
      beforeUpload2(file){
        const isLt2M = file.size / 1024 / 1024 < 10;
        // console.log(file);
        if (!isLt2M) {
          Message.error('上传图片大小不能超过 10MB!')
          return false
        }
        this.getImgUrl(file.raw, 'backImageUrl')
      },
      beforeUpload3(file){
        const isLt2M = file.size / 1024 / 1024 < 10;
        // console.log(file);
        if (!isLt2M) {
          Message.error('上传图片大小不能超过 10MB!')
          return false
        }
        this.getImgUrl(file.raw, 'handImageUrl')
      },
      getImgUrl(file, key) {
        this.getBase64(file).then(resBase64 => {
          // this.fileBase64 = resBase64.split(',')[1]//直接拿到base64信息
          let file = resBase64.slice(resBase64.indexOf(',') + 1)
          let data2 ={
            "file": file,
            secondDir: "string",
            "uploadType": "AVATAR"
          }
          this.$axios.post(process.env.VUE_APP_ZY_API + "/aiqiu/v1/app/upload/fileBase", data2, {
              headers: {'Content-Type': 'text/plain'}
            }
          ).then(response => {
            // console.log('剪裁后-上传response',response)
            // console.log('剪裁后-上传response',response.data.data[0])
            if (response.data.code === 0) {
              this.$set(this.form2, key,response.data.data[0])
              this.$set(this.imgList, key+"Base64",resBase64)
              // this.form2[key] = response.data.data[0]
              // console.log(response);
            } else {
              Message.error(response.data.msg)
            }
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
      usersLoginInfo() {
        return usersLoginInfo().then((response) => {
          if (response.code === 0) {
            this.loading = false
            this.userInfo = response.data;
            // this.userInfo = {
            //   isAuthor: false
            // };
          } else {
            console.error(response.error);
          }
        })
          .catch(function (error) {
            console.error(error);
          });
      },
      getCheckStatus() {
        checkStatus().then(res => {
          if (res.code === 0) {
            this.active = res.data.step
            // this.active =  2
            this.status = res.data.channelApplyStatus
            // this.status = "UNCOMMITTED"
          } else {
            this.Message.error(res.msg)
          }
        }).catch(() => {
          this.Message.error('网络异常，请稍后再试')
        })
      },
      getMobileCode() {
        this.$refs.form.validateField('mobile', (errorMessage) => {
          // console.log(errorMessage, 'errorMessage');
          if (!errorMessage) {
            // console.log(this.form.mobile);
            let param = encodeURIComponent(encrypt('message', this.form.mobile))
            getCodeEncrypt(param).then(res => {
              if (res.code === 0) {
                let countDownSet = setInterval(() => {
                  this.coutDown--
                  // console.log(this.coutDown);
                  if (this.coutDown <= 0) {
                    this.verifyStatus = true
                    clearInterval(countDownSet)
                    this.coutDown = 60
                  }
                }, 800)
              } else {
                this.Message.error(res.msg)
              }
            }).catch(() => {
              this.Message.error('网络异常，请稍后再试')

            })
          }
        })
      },
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            checkCode({ mobile: encrypt('message', this.form.mobile), code: this.form.code }).then(res => {
              if (res.code === 0) {
                this.active = res.data.step;
              } else {
                this.Message.error(res.msg)
              }
            }).catch(err => {
              this.Message.error(err.data.msg || '网络异常，请稍后再试1')

            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      submitForm2() {
        this.$refs.form2.validate((valid) => {
          if (valid) {
            checkSecond(this.form2).then(res => {
              if (res.code === 0) {
                this.active = res.data.step;
              } else {
                this.Message.error(res.msg)
              }
            }).catch(err => {
              // console.log(err);
              this.Message.error(err.data.msg || '网络异常，请稍后再试1')

            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      submitForm3() {
        this.$refs.form3.validate((valid) => {
          if (valid) {
            checkThird(this.form3).then(res => {
              if (res.code === 0) {
                this.getCheckStatus()
                // this.userInfo.isAnchor = true;
              } else {
                this.Message.error(res.msg)
              }
            }).catch(err => {
              this.Message.error(err.data.msg || '网络异常，请稍后再试1')

            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      handleBindMobile() {
        if (this.phone) {
          this.Message.success('您已绑定')
        } else {
          this.Message('12')
        }
      },
    },
    created() {
      this.usersLoginInfo().then(() => {
        if (!this.userInfo.isAnchor) this.getCheckStatus();
      })
    }
  }
</script>

<style scoped lang="scss">
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

  .form-wrap {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .item {
      width: 350px;
    }

    ::v-deep.el-form-item {
      /*margin-bottom: 10px;*/
    }

    .btn-next {
      margin-top: 30px;
      margin-left: -80px;
      width: 134px;
    }

  }

  .anchor {
    text-align: center;
  }

  .isAnchor {
    margin: 120px auto 90px;
    text-align: center;
    font-size: 28px;
  }
  .upload-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::v-deep .beginbo {
    background-color: #F9772A;
    border: 0;
  }
  .el-steps.el-steps--horizontal ::v-deep .el-step.is-horizontal.is-center ::v-deep .el-step__head.is-finish {
    color: #F9772A !important;
    border-color: #F9772A !important;
  }

  // .el-steps.el-steps--horizontal ::v-deep .el-step.is-horizontal.is-center ::v-deep .el-step__title.is-finish {
  //   color: #37c424;
  // }
  // .el-steps.el-steps--horizontal ::v-deep .el-step.is-horizontal.is-center ::v-deep.el-step__description.is-finish {
  //   color: #9c2127;
  // }
  // .el-steps.el-steps--horizontal ::v-deep .el-step.is-horizontal.is-center ::v-deep .el-step__head.is-process {
  //   color: #F9772A !important;
  //   border-color: #F9772A !important;
  // }
</style>
