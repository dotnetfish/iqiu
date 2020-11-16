<template>
  <section class="apply me-wrap">
      <div style="display:flex;margin-top:40px">
          <div style="display:flex">
              <div>
                  <img src='@/assets/timg.jpg' style="width:120px;height:120px;border-radius:120px;">
              </div>
              <div style="margin-left:30px">
                  <div style="font-size: 24px;color: #333333;">{{uniondata1[0].name}}</div>
                  <div style="margin-top:18px;width:60px;background: #F9772A;border-radius: 7px;height:16px;color:#FFFFFF;font-size:12px;line-height:16px;text-align:center">普通公会</div>
                  <div style="font-size: 16px;color: #666666;margin-right:20px;margin-top:30px">创建时间:{{uniondata1[0].createTime}}</div>
              </div>
          </div>
    </div>
    <div style="width:910px;height:2px;background:rgba(240,240,240,1);margin-top:30px;margin-bottom: 16px;"></div>
    <div style="display:flex;margin-top:26px;margin-bottom:80px">
        <div style="width:100px;margin-right:90px">
            <div style="width:100px;text-align:center;font-size:26px;color: #F9772A;font-weight: 600;">{{uniondata1[0].channelNum}}</div>
            <div style="margin-top:18px;color:#666666;font-size:14px;width:100px;text-align:center">主播数量</div>
        </div>
        <div style="width:100px;margin-right:90px">
            <div style="width:100px;text-align:center;font-size:26px;color: #F9772A;font-weight: 600;">{{uniondata1[0].livingNum}}</div>
            <div style="margin-top:18px;color:#666666;font-size:14px;width:100px;text-align:center">当前开播数</div>
        </div>
        <div style="width:100px;margin-right:90px">
            <div style="width:100px;text-align:center;font-size:26px;color: #F9772A;font-weight: 600;">{{uniondata1[0].channelApplyNum}}</div>
            <div style="margin-top:18px;color:#666666;font-size:14px;width:100px;text-align:center">主播申请</div>
        </div>
        <div style="width:100px;margin-right:90px">
            <div style="width:100px;text-align:center;font-size:26px;color: #F9772A;font-weight: 600;">{{uniondata1[0].totalCoin}}</div>
            <div style="margin-top:18px;color:#666666;font-size:14px;width:100px;text-align:center">当日收益</div>
        </div>
        <div style="width:100px;margin-right:90px">
            <div style="width:100px;text-align:center;font-size:26px;color: #F9772A;font-weight: 600;">{{uniondata1[0].accusationNum}}</div>
            <div style="margin-top:18px;color:#666666;font-size:14px;width:100px;text-align:center">当日违规次数</div>
        </div>
    </div>
    <div class="type-points">
      <div class="let-points" @click="changetype(1)" ref="typeone">7天</div>
      <div class="o-zhi" @click="changetype(2)" ref="typetow">15天</div>
      <div class="total-score" @click="changetype(3)" ref="typethree">30天</div>
    </div>
    <div ref="myChart" :style="{width: '800px', height: '500px'}"></div>
  </section>
</template>

<script>
import { unionindex, unionRole } from "@/api/api";
import echarts from 'echarts'
export default {
  name: "Guildhome",
  components: {
  },
  data() {
    return {
        type:1,
        uniondata:'',
        guildid:'',
        unionId:'',
        daylist:[],
        moneylist:[],
        numlist:[],
        uniondata1:[{
            name: '嘿嘿嘿',
            createTime: '2020.11.9',
            channelNum: 200,
            channelApplyNum:34,
            livingNum: 12,
            totalCoin:8000,
            accusationNum:2,
            }]
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
      return mm + "/" + dd;
    },
  },
  props: {
  },
  methods: {
      changetype(type) {
      this.type = type;
      if(this.type==1) {
        this.$refs.typeone.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typeone.style.background='#F9772A';
        this.$refs.typetow.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typetow.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typethree.style.background='rgba(255, 255, 255, 1)';
      } else if(this.type===2) {
        this.$refs.typeone.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typeone.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.background='#F9772A';
        this.$refs.typethree.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typethree.style.background='rgba(255, 255, 255, 1)';
      } else {
        this.$refs.typeone.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typeone.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typetow.style.color='rgba(102, 102, 102, 1)';
        this.$refs.typetow.style.background='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.color='rgba(255, 255, 255, 1)';
        this.$refs.typethree.style.background='#F9772A';
      }
      this.getunionindex()
    },
      //获取公会信息
      getunionindex(){
          let data = {
              unionId: this.unionId,
              type: this.type,
          }
          this.daylist=[]
          this.moneylist=[]
          this.numlist=[]
          unionindex(data).then((res) => {
              this.uniondata = res.data
              for(let i=0;i<res.data.length;i++){
                  let date = new Date(this.uniondata[i].createTime);
                  let mm = date.getMonth() + 1;
                  let dd = date.getDate();
                  let DD = mm + "/" + dd
                  this.daylist.push(DD)
              }
              for(let j=0;j<res.data.length;j++){
                  this.moneylist.push(this.uniondata[j].totalCoin)
              }
              for(let m=0;m<res.data.length;m++){
                  this.numlist.push(this.uniondata[m].livingNum)
              }
            //   console.log('99999999999999999999=',this.daylist)
              this.showEcharts()
          })
      },
      //公会角色
      getunionRole(){
          unionRole().then((res) => {
              this.unionId = res.data.unionId
              this.getunionindex();
          })
      },
      //绘制图形
      showEcharts(){
              // 基于准备好的dom，初始化echarts实例
              let myChart = this.$echarts.init(this.$refs.myChart);
              // 绘制图表
              myChart.setOption({
            	legend: {
                   selectedMode: true,//可点击
                   data: ['主播开播数',  '当日收益'],
                   bottom: 0	
               },
               grid: {
                   left: 100
               },
               xAxis: [
                   {
                       type: 'category',
                       data: this.daylist,
                       splitLine: {//不显示分割线
                           show: false
                       }
                   }
               ],
               yAxis: [
                   {
                       type: 'value',
                       name: '主播开播数',
                       splitLine: {//显示分割线
                           show: true
                       }
                   },
                   {
                       type: 'value',
                       name: '当日收益',
                       splitLine: {
                           show: true
                       }
                   }
               ],
               series: [
                   {
                       name: '主播开播数',
                       type: 'bar',
                       data: this.numlist,
                       itemStyle: {
          					color:' #F9772A'
          				}
                   },
                   {
                       name: '当日收益',
                       type: 'line',
                       yAxisIndex: 1,//索引从0开始
                       data: this.moneylist,
                       itemStyle: {
                       	color:'#7E36FF'
                       }
                   }
               ]
              });
                //建议加上以下这一行代码，不加，当浏览器窗口缩小时，echarts显示不全。
                window.addEventListener('resize', function() {
					myChart.resize()
				});              			
	}
  },
  mounted() {
      this.getunionRole();
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
.type-points {
  display: flex;
  width: 210px;
  height: 38px;
  margin-bottom: 20px;
}

.let-points {
  width: 70px;
  height: 100%;
  background:#F9772A;
  border:#999999 solid 1px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 38px;
  text-align: center;
  cursor:pointer;
}

.o-zhi {
  width: 70px;
  height: 38px;
  background: rgba(255, 255, 255, 1);
  border-top:#999999 solid 1px;
  border-bottom:#999999 solid 1px;
  font-size: 14px;
  font-weight: 500;
  color: #999999;
  line-height: 38px;
  text-align: center;
  cursor:pointer;
}

.total-score {
  width: 70px;
  height: 38px;
  background: rgba(255, 255, 255, 1);
  border:#999999 solid 1px;
  font-size: 14px;
  font-weight: 500;
  color:#999999;
  line-height: 38px;
  text-align: center;
  cursor:pointer;
}
</style>