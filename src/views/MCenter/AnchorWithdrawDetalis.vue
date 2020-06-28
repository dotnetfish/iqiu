<!--Created by fly on 2019/12/27-->
<template>
 <div >
  <el-row class="title">
    <span>提现明细</span>
  </el-row>
   <el-row  v-infinite-scroll="load"  >
   <el-table
     :data="tableData"
     row-class-name="costCell"
     stripe
     style="width: 100%">
     <el-table-column
       prop="money"
       label="收益"
       align="center"
       header-align="center"
      >
     </el-table-column>
     <el-table-column
       prop="time"
       label="时间"
       align="center"
       header-align="center"
       >
     </el-table-column>
     <el-table-column
       prop="payChannel"
       label="标签"
       align="center"
       header-align="center"
      >
     </el-table-column>
   </el-table>
   </el-row>
 </div>
</template>

<script>
  import {Row, Col, Table, TableColumn, Pagination, Tag,InfiniteScroll} from 'element-ui';
  import{salaryRecordList} from  "@/api/mcenterapi";
  import Vue from 'vue';
  Vue.use(InfiniteScroll);
  export default {
    name: "AnchorWithdrawDetalis",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Tag.name]: Tag,
      [Pagination.name]: Pagination,
    },
    data() {
      return {
        tableData: [],
        pagesize: 10,
        currentPage: 1,
        page:1,
        }
      },
      methods: {
        handleCurrentChange(val){
          this.currentPage = val;

        },
        load() {
          console.info(1);
          let data =
            {
              p: this.page++,
              size: this.pagesize
            };
          this.salaryRecordList(data);
        },
        salaryRecordList(data)
        {
          salaryRecordList(data).then((response) => {
            if (response.code === 0) {
              if (response.data != null) {
                response.data.forEach((item) => {
                  //执行代码
                  let data = {
                    money: item.taxAfter,
                    time: this.getTime(item.createTime),
                  };
                  if (item.payChannel == "WECHATPAY") {
                    data.payChannel = "微信"
                  }
                  else if (item.payChannel == "ALIPAY") {
                    data.payChannel = "支付宝"
                  } else if (item.payChannel == "APPLEPAY")
                  {
                    data.payChannel = "苹果支付"
                  } else if (item.payChannel == "YUNZHANGHUN")
                  {
                    data.payChannel = "云账户"
                  }
                  else {
                    data.payChannel = "人工支付"
                  }
                  this.tableData.push(data);
                })
              }

            }
            else {
              console.error(response.error);
            }
          })
            .catch(function (error) {
              console.error(error);
            });
        },
        getTime(nS) {
          var date = new Date(parseInt(nS));
          var year = date.getFullYear();
          var mon = date.getMonth() + 1;
          var day = date.getDate();
          var hours = date.getHours();
          var minu = date.getMinutes();
          var sec = date.getSeconds();

          return year + '/' + mon + '/' + day + ' ' + hours + ':' + minu + ':' + sec;

        },

      },
    mounted() {
      let data =
        {
          p: this.page++,
          size: this.pagesize
        };
      this.salaryRecordList(data);

    }

  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .title
  {
    text-align: left;
    margin: 20px 20px 20px 10px;
    font-size: 22px;
  }
  .table {
    text-align: right;
    margin-top: 16px
  }
  ::v-deep .costCell {
    height: 84px;
    .cell {
      font-size: 18px;
      color: $color-title1
    }
  }
  ::v-deep .el-table th.is-leaf > .cell{
    font-size: 18px;
    color: $color-title1;
    font-weight: 400;
  }
</style>
