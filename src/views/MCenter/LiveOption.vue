<!--Created by fly on 2019/12/29-->
<template>
  <div class="live-option">
    <el-form :model="form" ref="form" label-width="80px" label-position="left">
      <el-form-item label="房间ID:" prop="" class="item">
        {{ info.id }}
        <el-button @click="handleJump(info.id)" class="ml20 mr20" type="primary" plain size="small" style="color: #ffffff;background-color: #F9772A;border: 0;">进入直播间</el-button>
        粉丝数：{{ info.followCount }}
      </el-form-item>
      <el-form-item label="rtmp地址:">
          <span style="width:60%; display:inline-block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{rtmp_url}}</span>
          <el-button type="primary" class="cobyOrderSn" round style="height: 24px;line-height: 1px;margin-left: 10px;width: 58px;color: #ffffff;background-color: #F9772A;border: 0;"
                     size="small" v-clipboard:copy="rtmp_url"> 复制
          </el-button>
      </el-form-item>
      <el-form-item label="直播码:">
          <span style="width:60%; display:inline-block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{rtmp_code_url}}</span>
          <el-button type="primary" class="cobyOrderSn" round style="height: 24px;line-height: 1px;margin-left: 10px;width: 58px;color: #ffffff;background-color: #F9772A;border: 0;"
                     size="small" v-clipboard:copy="rtmp_code_url"> 复制
          </el-button>
      </el-form-item>
      <el-form-item label="房间标题:" prop="" class="item">
        <el-input v-model="name" maxlength="25"
                  show-word-limit placeholder="请输入房间标题" clearable size="medium"
                  style="width:300px;"></el-input>
        <el-button class="ml20" type="primary" plain size="small" style="color: #ffffff;background-color: #F9772A;border: 0;">修改</el-button>
        <br>
        <span class="tips">房间标题通过审核后，需要间隔5分钟才能再次修改</span>
      </el-form-item>
      <el-form-item label="房间公告:" prop="desc" class="item">
        <el-input v-model="notice" type="textarea" placeholder="暂无公告~" rows="4" maxlength="80"
                  show-word-limit
                  style="width:400px"></el-input>
        <br>
        <span class="tips">房间公告通过审核后，需要间隔5分钟才能再次修改</span>
      </el-form-item>
      <el-form-item label="房间分类:" prop="" class="item">
        {{ classification }}
        <el-button
          class="ml20"
          type="primary"
          size="small"
          style="color: #ffffff;background-color: #F9772A;border: 0;"
          plain
          @click="classificationVisible = true"
        >选择分类
        </el-button>
      </el-form-item>
<!--      <el-form-item label="选择比赛:" prop="" class="item">-->
<!--&lt;!&ndash;        {{ classification }}&ndash;&gt;-->
<!--        <el-button-->
<!--          class="ml20"-->
<!--          type="primary"-->
<!--          size="small"-->
<!--          plain-->
<!--          @click="$emit('showSelectGame')"-->
<!--        >选择比赛-->
<!--        </el-button>-->
<!--      </el-form-item>-->
      <el-button
        type="primary"
        size="small"
        @click="handleSave"
        style="color: #ffffff;background-color: #F9772A;border: 0;"
      >
        保存设置
      </el-button>
    </el-form>


    <!--    <el-row class="rom-title">-->
    <!--      <span>房间标题</span>-->
    <!--    </el-row>-->
    <!--    <el-row class="input">-->
    <!--      <el-input-->
    <!--        v-model="name"-->
    <!--        size="middle"-->
    <!--        placeholder="请输入房间昵称"-->
    <!--        maxlength="25"-->
    <!--        show-word-limit-->
    <!--      ></el-input>-->
    <!--    </el-row>-->
    <!--    <el-row class="rom-title mt60">-->
    <!--      <span>直播分类</span>-->
    <!--    </el-row>-->
    <!--    <el-row>-->
    <!--      <div style="font-size: 13px;">-->
    <!--        {{ classification }}-->
    <!--        <el-button-->
    <!--          type="primary"-->
    <!--          round-->
    <!--          style="height: 24px;line-height: 1px;margin-left: 30px"-->
    <!--          size="small"-->
    <!--          @click="classificationVisible = true"-->
    <!--        >选择分类-->
    <!--        </el-button>-->
    <!--      </div>-->
    <!--    </el-row>-->
    <!--    <el-row class="rom-title mt60">-->
    <!--      <span>直播公告</span>-->
    <!--    </el-row>-->
    <!--    <el-row class="input">-->
    <!--      <el-input-->
    <!--        type="textarea"-->
    <!--        placeholder="请输入直播公告"-->
    <!--        v-model="notice"-->
    <!--        maxlength="100"-->
    <!--        show-word-limit-->
    <!--      ></el-input>-->
    <!--      &lt;!&ndash;      <el-input v-model="notice" size="middle" placeholder="请输入直播公告"></el-input>&ndash;&gt;-->
    <!--    </el-row>-->
    <!--    <el-row class="rom-title">-->
    <!--      <span>rtmp地址:</span>-->
    <!--    </el-row>-->
    <!--    <el-row style="text-align: left;margin-left: 10px">-->
    <!--      <div>{{ rtmp_url }}</div>-->
    <!--    </el-row>-->
    <!--    <el-row style=";margin-top: 20px;margin-left: -20px">-->
    <!--      <el-button-->
    <!--        type="primary"-->
    <!--        class="cobyOrderSn"-->
    <!--        round-->
    <!--        style="height: 24px;line-height: 1px;margin-left: 30px"-->
    <!--        size="small"-->
    <!--        v-clipboard:copy="rtmp_url"-->
    <!--      >-->
    <!--        复制-->
    <!--      </el-button>-->
    <!--      <el-button-->
    <!--        type="primary"-->
    <!--        class="cobyOrderSn"-->
    <!--        round-->
    <!--        style="height: 24px;line-height: 1px;margin-left: 230px"-->
    <!--        size="small"-->
    <!--        @click="handleSave"-->
    <!--      >-->
    <!--        保存设置-->
    <!--      </el-button>-->
    <!--    </el-row>-->
    <el-dialog :visible.sync="classificationVisible" width="452px">
      <div class="classificationtype">
        <el-row style="margin-top: -10px">
          <span style="font-size: 17px;font-weight: bold">选择分类</span>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col
            :span="5"
            v-for="(o, index) in classificationType"
            :key="index"
            style="margin-top: 10px;"
          >
            <el-radio v-model="classificationIndex" :label="index" border>
              <div class="tip">{{ classificationType[index] }}</div>
            </el-radio>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-button
            type="primary"
            style="height: 30px;line-height: 1px;color: #ffffff;background-color: #F9772A;border: 0;"
            @click="handleClassification"
          >确 定
          </el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Row, Col, Button, Input, Message, Dialog, Radio, Form, FormItem } from "element-ui";
  import { channelInfos, updateChannel } from "@/api/mcenterapi";
  import { CategoryList } from "@/api/api";

  import Vue from "vue";
  import Clipboard from "../../directive/clipboard/index.js";

  Vue.use(Clipboard);
  export default {
    name: "LiveOption",
    components: {
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Row.name]: Row,
      [Col.name]: Col,
      [Button.name]: Button,
      [Input.name]: Input,
      [Dialog.name]: Dialog,
      [Message.name]: Message,
      [Radio.name]: Radio,
    },
    data() {
      return {
        form: {},
        name: "",
        info: {},
        notice: "",
        classification: "未分类",
        classificationCode: null,
        classificationVisible: false,
        classificationType: [],
        classificationTypeCode: [],
        classificationIndex: 0,
        rtmp_url: "",
        rtmp_code_url: "",
      };
    },
    methods: {
      handleJump(roomId) {
        // console.log(roomId);
        const { href } = this.$router.resolve(`/${ roomId }`)
        window.open(href, "_blank");
      },
      handleClassification() {
        this.classification = this.classificationType[this.classificationIndex];
        this.classificationCode = this.classificationTypeCode[this.classificationIndex];

        this.classificationVisible = false;
      },
      getMenuList(data) {
        CategoryList(data,{})
          .then(response => {
            if (response.code === 0) {
              if (response.data != null) {
                response.data.forEach(item => {
                  //执行代码
                  this.classificationType.push(item.name);
                  this.classificationTypeCode.push(item.code);
                });
              }
              let data2 = {
                stream: 1,
                cid: this.$store.state.userStatus.userInfo.uid
              };
              this.channelInfos(data2);
            } else {
              console.error(response.error);
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      },
      channelInfos(data) {
        // debugger
        channelInfos(data)
          .then(response => {
            if (response.code === 0) {
              this.classificationTypeCode.forEach((item, index) => {
                //执行代码
                if (item == response.data.type) {
                  this.classificationIndex = index;
                  this.classification = this.classification;
                  this.classification = this.classificationType[
                    this.classificationIndex
                    ];
                }
              });
              this.name = response.data.name;
              this.info = response.data;
              this.notice = response.data.notice;
              if (response.data.pushStreamUrl) {
                let urlMap = response.data.pushStreamUrl.split('live/')
                this.rtmp_url = urlMap[0] + 'live/';
                this.rtmp_code_url = urlMap[1];
              }

            } else {
              console.error(response.error);
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      },
      updateChannel(data) {
        // debugger;
        updateChannel(data).then(response => {
          if (response.code == 0) {
            Message.success({
              message: "直播间设置修改成功"
            });
          } else {
            Message.error({
              message: response.error
            });
          }
        });
      },
      handleSave() {
        let data = {
          notice: this.notice,
          name: this.name,
          // type: this.classification
          type: this.classificationCode
        };
        this.updateChannel(data);
      }
    },
    created() {
      let data = {
        name: "pcindex"
      };
      this.getMenuList(data);
    }
  };
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .ml20 {
    margin-left: 20px;
  }

  .mr20 {
    margin-right: 20px;
  }

  .mt60 {
    margin-top: 60px !important;
  }

  .title {
    font-size: 22px;
    color: $color-title1;
    @extend .bold;
  }

  .rom-title {
    margin: 30px 0px 20px 0px;
    color: $color-title1;
    font-size: 18px;
    @extend .bold;
  }

  .input {
    width: 60%;
  }

  .classificationtype {
    text-align: center;
  }

  .tips {
    margin-left: 72px;
    font-size: 12px;
    color: $color-title3;
  }
  ::v-deep .el-input__inner:focus{
      border-color:  #F9772A !important;      
  }
</style>

<style lang="scss">
  .live-option {
    .el-radio__input {
      display: none;
    }
    .classificationtype .is-checked {
      /*background-color: #e8f0ff;*/
    }

    .el-radio.is-bordered {
      border-radius: 30px;
      height: 30px;
    }
    .el-radio.is-bordered.is-checked{
      border: #F9772A solid 1px;
    }
    .el-radio__input {
      border-radius: 30px;
      height: 30px;
    }

    .tip {
      margin-top: -18px;
      margin-left: 7px;
      // border: #F9772A solid 1px;
      color:#F9772A
    }
  }
  // ::v-deep .el-radio.is-bordered.is-checked{
  //   border: #F9772A solid 1px;
  // }
</style>
