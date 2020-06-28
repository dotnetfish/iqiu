<!--Created by fly on 2019/12/27-->
<template>
  <div class="me-wrap">
    <span class="title pointer" @click="$emit('back', 1)"><i class="el-icon-arrow-left"></i>充值记录</span>
    <el-row v-infinite-scroll="load">
      <el-table
        :data="tableData"
        row-class-name="costCell"
        stripe
        style="width: 100%">
        <el-table-column
          prop="money"

          label="充值金额"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="mili"
          label="充值米粒"
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
          prop="status"
          label="标签"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
<!--            <el-tag-->
<!--              :type="scope.row.status == '1' ?  'success' : 'danger'"-->
<!--              disable-transitions>{{scope.row.status== '1' ? '充值成功' : '充值失败'}}-->
<!--            </el-tag>-->
            {{scope.row.status== '1' ? '充值成功' : '充值失败'}}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import { Row, Col, Table, TableColumn, Pagination, Tag, InfiniteScroll } from 'element-ui';
  import { payList } from "@/api/mcenterapi";
  import Vue from 'vue';

  Vue.use(InfiniteScroll);
  export default {
    name: "PersonCostDetalis",
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
        page: 1,
        totalNum: 0,
        count: 2,
        max: 100,
      }
    },
    methods: {
      load() {
        let data =
          {
            assetType: "MICOIN",
            p: this.page++,
            size: this.pagesize
          };
        this.payList(data);

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
      payList(data) {
        payList(data).then((response) => {
          if (response.code === 0) {
            if (response.data != null) {
              response.data.forEach((item) => {
                //执行代码
                let data = {
                  money: item.totalFee / 100,
                  mili: item.totalFee,
                  time: this.getTime(item.createTime),
                };
                if (item.tradeStatus != "TRADE_PREPAID") {
                  data.status = "1"
                } else {
                  data.status = "0"
                }
                this.tableData.push(data);
              })
            }

          } else {
            console.error(response.error);
          }
        })
          .catch(function (error) {
            console.error(error);
          });
      },
    },
    mounted() {
      let data =
        {
          assetType: "MICOIN",
          p: this.page++,
          size: this.pagesize
        };
      this.payList(data);
    }

  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .title {
    display: inline-block;
    margin-bottom: 20px;
    color: $color-title1;
    text-align: left;
    font-size: 22px;
    margin-bottom: 40px;
    /*margin: 20px 20px 20px 10px;*/
    @extend .bold;
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
