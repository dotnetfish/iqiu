<template>
  <div class="live-option">
    <el-form ref="form">
      <el-form-item label="最低注册时间:" class="item">
        <el-input v-model.number="allowCreateTime" type="primary" placeholder="0"
                  style="width:60px"></el-input>
        天
      </el-form-item>
      <el-form-item label="全局禁言:">
        <el-checkbox v-model="allForbid">仅超管、主播、管理员可发言</el-checkbox>
      </el-form-item>
      <el-form-item label="非粉丝用户禁言:">
        <el-checkbox v-model="onlyAllowFans">仅粉丝可发言（超管、主播、管理员不受限制）</el-checkbox>
      </el-form-item>

      <el-button
        type="primary"
        size="small"
        @click="handleSave"
      >
        保存设置
      </el-button>
      <span class="tips">发言要求审核后，需要间隔5分钟才能再次修改</span>
    </el-form>
  </div>
</template>

<script>
  import { Button, Input, Message, Form, FormItem, Checkbox } from "element-ui";
  import { channelInfos, updateChannel } from "@/api/mcenterapi";

  export default {
    name: "ForbidOption",
    components: {
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Checkbox.name]: Checkbox,
      [Button.name]: Button,
      [Input.name]: Input,
    },
    data() {
      return {
        info: {},
        allowCreateTime: 0,
        allForbid: false,
        onlyAllowFans: false,
      };
    },
    methods: {
      channelInfos() {
        return channelInfos({
          stream: 1
        })
          .then(response => {
            if (response.code === 0) {
              // console.log(response, 'responseresponseresponseresponseresponse');
              this.allForbid = response.data.allForbid; // 全局禁言: 仅超管主播管理员可发言, true-打开, false-关闭, 不修改的话什么也不传
              this.allowCreateTime = response.data.allowCreateTime; // 允许发言的最低天数, 0-365, 不修改的话什么也不传
              this.onlyAllowFans = response.data.onlyAllowFans; // 仅粉丝可发言, true-打开, false-关闭, 不修改的话什么也不传
              this.info = response.data;
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
        this.updateChannel({
          allowCreateTime: this.allowCreateTime,
          allForbid: this.allForbid,
          onlyAllowFans: this.onlyAllowFans
        });
      }
    },
    created() {
      this.channelInfos();
    }
  };
</script>
<style scoped lang="scss">
  @import "@/assets/css/_index.scss";
  .tips {
    margin-left: 20px;
    font-size: 12px;
    color: $color-title3;
  }
</style>
