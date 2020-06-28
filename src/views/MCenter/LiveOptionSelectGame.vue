<!--Created by fly on 2019/12/27-->
<template>
  <div class="">
    <span class="title pointer" @click="$emit('back', 1)"><i class="el-icon-arrow-left"></i>选择比赛</span>
    <el-row>
      <el-table
        :data="matches"
        :loading="loading"
        row-class-name="costCell"
        stripe
        style="width: 100%">
        <el-table-column
          prop="metchTime"
          label="时间"
          align="center"
          header-align="center"
          width="220"
        >
          <template slot-scope="scope">
            {{ setTime(scope.row.metchTime).timeStr }}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="metchTitle"
          label="赛事"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="对阵双方"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.metchHomeTeamName }} VS {{ scope.row.metchAwayTeamName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="已选择本场主播数"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.metchLives.length || 0 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="比赛状态"
          align="center"
          header-align="center"
        >
          <template>
            进行中
          </template>
        </el-table-column>

        <el-table-column
          prop="time"
          label="操作"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleSelectMetch(scope.row)">关注</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import { Row, Col, Table, TableColumn, Pagination, Button } from 'element-ui';
  import { matchesInstant, matchesSubscribe, matchesUnsubscribe } from "@/api/api";
  import setTime from "@/utils/setTime";

  // import Vue from 'vue';

  // Vue.use(InfiniteScroll);
  export default {
    name: "LiveOptionSelectGame",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Button.name]: Button,
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
        matches: [],
        loading: false,
        dialogVisible: false,
        lives: []
      }
    },
    methods: {
      setTime: setTime,
      handleSelectMetch(row) {
        return matchesSubscribe({ mid:row.metchId }).then(res => {
          console.log(res,'111111111');
        }).catch(() => {
        })
      }, handleUnSelectMetch(row) {
        return matchesUnsubscribe({ mid:row.metchId }).then(res => {
          console.log(res,'111111111');
        }).catch(() => {
        })
      },
      handleMore(lives = []) {
        this.dialogVisible = true;
        this.lives = lives
      },
      // 监听类型变化
      routeChange() {
        if (this.typeId == 'all') {
          this.gethot()
        } else if (this.typeId == 'basketball') {
          this.getInstant(2)
        } else if (this.typeId == 'football') {
          this.getInstant(1)
        }
      },
      getInstant(type) {
        this.loading = true;
        return matchesInstant({ type }).then(res => {
          this.fomatterData(res.data)
          this.loading = false;
          console.log(res);
        }).catch(() => {
          this.loading = false;
        })
      },
      fomatterData(data, reset = true) {
        // 比赛id^比赛开始时间(时间戳到秒)^赛事名^赛事图片^主队名^客对名^主队图片^客队图片^主队比分^客队比分^比赛状态
        // 比赛id^直播间1id-直播间1热度-主播1昵称-主播1图片-主播1状态^直播间2id-直播间2热度-主播2昵称-主播2图片-主播2状态
        if (reset) this.matches = []

        data.lives.forEach((item, index) => {

          // 比赛
          let metchArr = data.matches[index].split('^');
          let metchItem = {}
          let metchTime = new Date(setTime(metchArr[1]).yearStr2).getTime()
          let metchStatusStr = metchArr[10] == 0 ? '进行中' : metchArr[10] == 1 ? '未开始' : '已结束'; // 0 进行 1未开始，其他的都可以认为是已结束
          // let metchTime = metchArr[1]
          console.log(metchTime);

          metchItem = {
            metchId: metchArr[0],
            metchTime: metchArr[1],
            metchTitle: metchArr[2],
            metchPic: metchArr[3],
            metchHomeTeamName: metchArr[4],
            metchAwayTeamName: metchArr[5],
            metchHomeTeamPic: metchArr[6],
            metchAwayTeamPic: metchArr[7],
            metchHomeTeamScore: metchArr[8],
            metchAwayTeamScore: metchArr[9],
            metchStatus: metchArr[10],
            metchStatusStr: metchStatusStr
          }

          // 对应主播
          if (item) {
            let livesarr = item.split('^')
            let lives = [];

            livesarr.slice(1).forEach((item) => {
              let str = item.split('-');
              lives.push({
                roomId: str[0],
                roomHot: str[1],
                roomNick: str[2],
                // roomPic: str[3],
                roomPic: require('@/assets/img/user-avatar-default.png'), // 默认头像
                roomStatus: str[4],
                roomDesc: str[5],
              })
            })
            metchItem.metchLives = lives;
          } else {
            metchItem.metchLives = []
          }

          // if (!this.matches[metchTime]) this.$set(this.matches, metchTime, [])
          // 进行中的比赛
          if(metchItem.metchStatus == 0) this.matches.push(metchItem)
        })
      }
    },
    created() {
      this.getInstant(1)
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
