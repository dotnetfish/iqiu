<template>
  <section class="apply me-wrap">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.group" placeholder="分组名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="Getsearch()" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button @click="add()" style="color: #ffffff;background-color: #F9772A;border: 0;">添加分组</el-button>
      </el-form-item> -->
    </el-form>
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
          prop="cid"
          label="主播id"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="主播昵称"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系方式"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="scale"
          label="抽成比例(%)"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
                <div v-if="scope.row.type==1">新签</div>
                <div v-if="scope.row.type==2">续约</div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="overTime"
          label="到期时间"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
            <div>{{scope.row.overTime | formatDate}}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="group"
          label="当前分组"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editHandle(scope.row.cid,scope.row.group)"><span style="color:#F9772A">修改</span></el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      title="修改分组"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <div style="display:flex">
          <div style="color:#666666;width:120px;height:40px;line-height:40px;text-align:right;margin-right:24px">分组昵称:</div>
          <div><el-input v-model=group></el-input></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submit()" style="color: #ffffff;background-color: #F9772A;border: 0;">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加分组"
      :visible.sync="dialogVisible1"
      width="30%"
      center>
      <div style="display:flex">
          <div style="color:#666666;width:120px;height:40px;line-height:40px;text-align:right;margin-right:24px">分组昵称:</div>
          <div><el-input v-model=group></el-input></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitadd()" style="color: #ffffff;background-color: #F9772A;border: 0;">提交</el-button>
      </span>
    </el-dialog>
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
  </section>
</template>

<script>
import { uniongroup, unionRole, setGroup } from "@/api/api";

export default {
  name: "Uniongroup",
  components: {
  },
  data() {
    return {
        dataForm:{
          group:'',
        },
        group:'',
        dialogVisible:false,
        dialogVisible1:false,
        id:'',
        // pageSize:10,
        // pageIndex:1,
        // total:0,
        unionId:'',
        tablelist:'',
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
      editHandle(cid,group){
          this.id = cid;
          this.group = group
          this.dialogVisible = true
      },
      //添加分组
      add(){
          this.dialogVisible1 = true
      },
      submitadd(){
          let data = {
            cid:'',
            group:this.group,
            unionId: this.unionId,
          }
          setGroup(data).then((res) => {
              if(res.code==0){
                  this.$message.success('添加成功');
              }else{
                  this.$message.error(res.msg);
              }
              this.dialogVisible1 = false
              this.getuniongroup()
      });
      },
      //设置分组
      submit(){
          let data = {
            cid:this.id,
            group:this.group,
            unionId: this.unionId,
          }
          setGroup(data).then((res) => {
              if(res.code==0){
                  this.$message.success('修改成功');
              }else{
                  this.$message.error(res.msg);
              }
              this.dialogVisible = false
              this.getuniongroup()
      });
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
      //获取结算数据列表
      getuniongroup(){
          let data = {
            group:this.dataForm.group,
            unionId: this.unionId,
            // pageNum:this.pageIndex,
            // pageSize:this.pageSize,
          }
          uniongroup(data).then((res) => {
            // this.total = res.total
        this.tablelist = res.data;
      });
      },
      //查询
      Getsearch(){
          let data = {
            group:this.dataForm.group,
            unionId: this.unionId,
            // pageNum:1,
            // pageSize:10,
          }
          uniongroup(data).then((res) => {
            // this.total = res.total
        this.tablelist = res.data;
      });
      },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getuniongroup();
          })
      },
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