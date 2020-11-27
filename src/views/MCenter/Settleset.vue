<template>
  <section class="apply me-wrap">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="主播ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="Getsearch()" style="color: #ffffff;background-color: #F9772A;border: 0;">查询</el-button>
      </el-form-item>
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
          label="主播ID"
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
          prop="group"
          label="分组"
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
        <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editHandle(scope.row.id)"><span style="color:#F9772A">调整</span></el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      title="抽成比例调整"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <div style="display:flex">
          <div style="color:#666666;width:120px;height:40px;line-height:40px;text-align:right;margin-right:24px">抽成比例(%):</div>
          <div><el-input v-model=scale></el-input></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submit()" style="color: #ffffff;background-color: #F9772A;border: 0;">提交</el-button>
      </span>
    </el-dialog>
    <el-pagination
        hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </section>
</template>

<script>
import { channelApplyList, unionRole, setScale } from "@/api/api";

export default {
  name: "Settleset",
  components: {
  },
  data() {
    return {
        dataForm:{
          uid:'',
        },
        dialogVisible:false,
        id:'',
        pageSize:10,
        pageIndex:1,
        total:0,
        scale:'',
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
      editHandle(id){
          this.id = id;
          this.dialogVisible = true
      },
      //修改抽成比例
      submit(){
          let data = {
            id:this.id,
            scale:this.scale,
          }
          setScale(data).then((res) => {
              if(res.code==0){
                  this.$message.success('修改成功');
              }else{
                  this.$message.error(res.msg);
              }
              this.dialogVisible = false
              this.getchannelApplyList()
      });
      },
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getchannelApplyList()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getchannelApplyList()
      },
      //获取结算数据列表
      getchannelApplyList(){
          let data = {
            cid:this.dataForm.uid,
            unionId: this.unionId,
            check:'',
            status:'',
            pageNum:this.pageIndex,
            pageSize:this.pageSize,
          }
          channelApplyList(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      //查询
      Getsearch(){
          let data = {
            cid:this.dataForm.uid,
            unionId: this.unionId,
            pageNum:1,
            pageSize:10,
          }
          channelApplyList(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getchannelApplyList();
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