<template>
  <section class="apply me-wrap">
      <el-button type="primary" size="small" @click="getassistantMenu(unionId)" style="color: #ffffff;background-color: #F9772A;border: 0;margin-bottom:20px">添加管理员</el-button>
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
          prop="uid"
          label="用户id"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="用户名"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="联系方式"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          header-align="center"
        >
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">开启</div>
          <div v-if="scope.row.status == 0">禁用</div>
        </template>
        </el-table-column>
       <el-table-column fixed="right" header-align="center" align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateManager1(scope.row.id,scope.row.uid,scope.row.status,scope.row.menu)"><span style="color:#F9772A">编辑</span></el-button>
          <el-button type="text" size="small" @click="delManager(scope.row.id)"><span style="color:#F9772A">删除</span></el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-row>
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
    <el-dialog
      title="添加管理员"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <el-form label-width="80px" :model="dialogFormData">
        <el-form-item label="用户id">
          <el-input v-model="dialogFormData.uid" placeholder="请输入用户Uid"></el-input>
        </el-form-item>
        <el-form-item label="配置权限">
          <el-checkbox-group v-model="dialogFormData.menu" @change=change>
            <div style="display:flex;flex-wrap:wrap">
            <div v-for="(item,index) in menu" :key="index">
              <div style="width:110px">
                <el-checkbox :label=item.name></el-checkbox>
                </div>
              </div>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态">
          <select v-model="value" class="timechoose">
                    <option
                    v-for="item in dialogFormData.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </option>
                </select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round type="primary" @click="add()" style="color: #ffffff;background-color: #F9772A;border: 0;">添加</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑管理员"
      :visible.sync="dialogVisible1"
      width="30%"
      center>
      <el-form label-width="80px" :model="dialogFormData">
        <el-form-item label="用户id">
          <el-input v-model="dialogFormData.uid" placeholder="请输入用户Uid"></el-input>
        </el-form-item>
        <el-form-item label="配置权限">
          <el-checkbox-group v-model="dialogFormData.menu" @change=change>
            <div style="display:flex;flex-wrap:wrap">
            <div v-for="(item,index) in menu" :key="index">
              <div style="width:110px">
                <el-checkbox :label=item.name></el-checkbox>
                </div>
              </div>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态">
          <select v-model="value" class="timechoose">
                    <option
                    v-for="item in dialogFormData.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </option>
                </select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round type="primary" @click="updateManager()" style="color: #ffffff;background-color: #F9772A;border: 0;">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { assistantList, assistantAdd, assistantMenu, unionRole, assistantDel, assistantUpdate1 } from "@/api/api";

export default {
  name: "Guildadministrator",
  components: {
  },
  data() {
    return {
        pageSize:10,
        pageIndex:1,
        total:0,
        id:'',
        dialogVisible:false,
        dialogVisible1:false,
        unionId:'',
        menu:[],
        tablelist:[],
        dialogFormData:{
            uid:'',
            unionId:'',
            jurisdictionName:'',
            menu:[],
            status:'',
            options: [{
        value: 0,
        label: '禁用'
      }, {
        value: 1,
        label: '开启'
      }],
        },
        value: 1,
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
    },
  },
  methods: {
      change(){
          console.log("5555555555555555555555=",this.dialogFormData.menu)
        this.dialogFormData.jurisdictionName = ''
        for(let i=0;i<this.dialogFormData.menu.length;i++){
          if(i==this.dialogFormData.menu.length-1){
            this.dialogFormData.jurisdictionName = this.dialogFormData.jurisdictionName + this.dialogFormData.menu[i]
          }else{
            this.dialogFormData.jurisdictionName = this.dialogFormData.menu[i] + ',' + this.dialogFormData.jurisdictionName
          }
        }
        console.log("5555555555555555555555=",this.dialogFormData.jurisdictionName)
        // console.log("5555555555555555555555=",this.value)
      },
      //编辑时弹窗
      updateManager1(id,uid,status,menu){
          this.id = id
          this.dialogFormData.uid = uid
          this.value = status
          this.dialogVisible1 = true
          this.dialogFormData.menu = menu.split(',')
          let data = {
            unionId: this.unionId,
          }
          assistantMenu(data).then((res) => {
        this.menu = res.data;
      });
      },
      //编辑管理员信息
      updateManager(id){
          let data = {
              uid:this.dialogFormData.uid,
              unionId:this.unionId,
              menu:this.dialogFormData.jurisdictionName,
              status:this.value
          }
          assistantUpdate1(data).then((res) => {
              this.dialogVisible1 = false
              this.$message.success('编辑成功');
              this.getassistantList()
      });
      },
      //删除管理员
      delManager(id){
          let data = {
              id:id,
          }
          assistantDel(data).then((res) => {
              this.$message.success('删除成功');
              this.getassistantList()
      });
      },
      //添加管理员
      add(){
          let data = {
              uid:this.dialogFormData.uid,
              unionId:this.unionId,
              menu:this.dialogFormData.jurisdictionName,
              status:this.value
          }
          assistantAdd(data).then((res) => {
              this.$message.success('添加成功');
              this.dialogVisible = false;
              this.getassistantList()
      });
      },
      //管理员菜单
      getassistantMenu(){
          this.dialogVisible = true
          let data = {
            unionId: this.unionId,
          }
          assistantMenu(data).then((res) => {
        this.menu = res.data;
      });
      },
      //改变页数
      handleSizeChange(val){
        this.pageSize = val
        this.pageIndex = 1
        this.getassistantList()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getassistantList()
      },
      //获取管理员列表
      getassistantList(){
          let data = {
            unionId: this.unionId,
            pageNum:this.pageIndex,
            pageSize:this.pageSize,
          }
          assistantList(data).then((res) => {
            this.total = res.total
        this.tablelist = res.data;
      });
      },
      //查询
    //   Getsearch(){
    //       let data = {
    //         startTime:this.dataForm.startTime,
    //         endTime:this.dataForm.endTime,
    //         unionId: this.unionId,
    //         pageNum:1,
    //         pageSize:10,
    //       }
    //       uniontransfer(data).then((res) => {
    //         this.total = res.total
    //     this.tablelist = res.data;
    //   });
    //   },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getassistantList();
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
  ::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #F9772A !important;
}
  ::v-deep .el-radio__input.is-checked .el-radio__inner {
    background: #F9772A !important;
    border-color: #F9772A !important;
  }

  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#F9772A !important;
  border-color: #F9772A !important;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #F9772A !important;
}
::v-deep .el-checkbox.is-bordered.is-checked{
  border-color: #F9772A !important;
}
::v-deep .el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:  #F9772A !important;
}
.timechoose{
    background-color:rgb(255, 255, 255);
    width: 100px;
    border: rgb(203, 204, 204) solid 1px;
    height: 40px;
    outline: 0;
    margin-left: 6px;
    margin-right: 6px;
}
</style>