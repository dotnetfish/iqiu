<!--Created by fly on 2019/12/27-->
<template>
  <div class="me-wrap container">
    <!--    <el-row class="title">-->
    <!--      <span>直播记录</span>-->
    <!--    </el-row>-->
    <el-form :inline="true" :model="formData">
      <el-form-item label="日期选择">
        <el-date-picker
            v-model="formData.dayTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="findLiveRecordDay">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
          :data="tableData"
          row-class-name="costCell"
          :header-cell-style="{'background-color': '#f0f0f0'}"
          stripe
          style="width: 100%">
        <el-table-column
            prop="startTime"
            label="时间"
            align="center"
            header-align="center"
        >
          <template slot-scope="scope">
            {{setTime(scope.row.startTime).timeStr}}
          </template>
        </el-table-column>
        <el-table-column
            prop="duration"
            label="直播时长"
            align="center"
            header-align="center"
        >
          <template slot-scope="scope">
            {{setTime(scope.row.duration).duringStr}}
          </template>
        </el-table-column>
        <el-table-column
            prop="uv"
            label="在线观看"
            align="center"
            header-align="center"
        >
        </el-table-column>
        <el-table-column
            prop="followCount"
            label="新增粉丝"
            align="center"
            header-align="center"
        >
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination
      style="margin-top:20px"
        :hide-on-single-page="true"
        :total="total"
        :page-size="20"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        background
        layout="sizes, prev, pager, next, total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
    import { Row, Col, Table, TableColumn, Pagination, Tag, Form, FormItem, Button, DatePicker } from 'element-ui';
    import { findLiveRecordDay } from "@/api/mcenterapi";
    import setTime from "@/utils/setTime";

    export default {
        name: "AnchorLiveLog",
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Tag.name]: Tag,
            [Pagination.name]: Pagination,
            [FormItem.name]: FormItem,
            [Form.name]: Form,
            [Button.name]: Button,
            [DatePicker.name]: DatePicker,
        },
        data() {
            return {
                formData: {
                    p: 1,
                    size: 20,
                    dayTime: "",
                },
                tableData: [],
                pagesize: 10,
                page: 1,
                total: 0,
              totalDuration: 0,
            }
        },
        methods: {
            setTime: setTime,
            findLiveRecordDay() {
                findLiveRecordDay(this.formData).then((response) => {
                    if (response.code === 0) {
                        if (response.data != null) {
                            this.tableData = response.data.records.list;
                            this.total = response.data.records.totalCount;
                            this.totalDuration = response.data.totalDuration;
                        }

                    } else {
                        console.error(response.error);
                    }
                })
                    .catch(function (error) {
                        console.error(error);
                    });

            },
            handleSizeChange(val) {
                this.formData.size = val;
                this.formData.p = 1
                this.findLiveRecordDay()
            },
            handleCurrentChange(val) {
                this.formData.p = val
                this.findLiveRecordDay()
            }

        },
        created() {
            this.findLiveRecordDay();
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .container {
    height: 100%;
  }

  .title {
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

</style>
