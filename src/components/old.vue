<template>
  <div>
    <div ref="whole risk"  style="width: 1200px; height: 350px;margin-left: 0px;margin-top: 0px;"></div>
    <div class="warning-component">
      <div class="warning-dates">
        <div class="date-item">前日：<span>{{ prevDayRisk }}</span></div>
        <div class="date-item">昨日：<span>{{ yesterdayRisk }}</span></div>
        <div class="date-item">今日：<span>{{ todayRisk }}</span></div>
        <div class="date-item">明日：<span>{{ tomorrowRisk }}</span></div>
        <div class="warning-recent">
          最近预警：<span>{{ warningRisk }}</span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import http from "@/utils/request";

export default {

  data(){
    return {
      prevDayRisk:'',
      yesterdayRisk:'',
      todayRisk:'',
      tomorrowRisk:'',
      warningRisk:'',
      riskData:[],
      markLine: [],
      markPoint: [],
      markArea:[],

    }
  },

  mounted() {
    http.get('/risk/whole/').then((res)=>{
      this.riskData=res.data.wholerisk
      this.markPoint=res.data.markpoint
      this.markLine=res.data.markline
      this.markArea=res.data.markarea
      this.prevDayRisk=res.data.detail[0]
      this.yesterdayRisk=res.data.detail[1]
      this.todayRisk=res.data.detail[2]
      this.tomorrowRisk=res.data.detail[3]
      this.warningRisk=res.data.detail[4]
      // console.log(this.riskData,this.markLine,this.markPoint[0])
      this.initChart()
    })

    // this.initChart(this.dat)

  },

  methods:{
    initChart(){
      /*
      示例参考如下
      * https://echarts.apache.org/v4/examples/zh/editor.html?c=line-aqi
      *
      * https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/aqi-beijing.json
      *
      * */
      let data=this.riskData
      var myChart = echarts.init(this.$refs["whole risk"])
      let option = {
        title: {
          text: '系统性风险指数',
          left:'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {

          data: data.map(function (item) {
            return item[0];
          })
        },
        yAxis: {
          scale:true,
          splitLine: {
            show: false
          }
        },

        toolbox: {
          right: 120,
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            dataView:{
              show:true,
              title: '查看数据',
            },
            restore: {},
            saveAsImage: {}
          }
        },
        //以下是时间轴
        dataZoom: [{
          //也应该是动态的
          startValue: '2022-07-01'
        }, {
          type: 'inside'
        }],
        //以上是时间轴
        visualMap: {
          top: 10,
          right: 0,
          precision:2,
          pieces: [
            {
              gt: 0,
              lte: parseFloat(this.markLine[0]),
              color: '#096'
            },
            {
              gt: parseFloat(this.markLine[0]),
              lte: parseFloat(this.markLine[1]),
              color: '#ffde33'
            },
            //   {
            //   gt: 100,
            //   lte: 150,
            //   color: '#ff9933'
            // },
            //   {
            //   gt: 150,
            //   lte: 200,
            //   color: '#cc0033'
            // },
            //   {
            //   gt: 200,
            //   lte: 300,
            //   color: '#660099'
            // },
            //   {
            //   gt: 300,
            //   color: '#7e0023'
            // }
          ],
          outOfRange: {
            color: '#fa0744'
          }
        },
        series: {
          name: '系统性风险指数',
          type: 'line',
          data: data.map(function (item) {
            return item[1];
          }),

          //标记极端值
          markPoint:{
            symbol:'circle',
            symbolSize:10,
            data: [{
              itemStyle:{
                //标注的颜色
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0, color: 'purple' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#258ddc' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
              //x轴的index和y值
              coord: this.markPoint[0] // 其中 5 表示 xAxis.data[5]，即 '33' 这个元素。
              // coord: ['5', 33.4] // 其中 '5' 表示 xAxis.data中的 '5' 这个元素。
              // 注意，使用这种方式时，xAxis.data 不能写成 [number, number, ...]
              // 而只能写成 [string, string, ...]
            }]

          },
          markLine: {
            //阈值标记线  这里应该是动态的
            silent: true,
            symbol:'none',
            lineStyle:{
              color:'black'

            },
            data: [{
              yAxis: this.markLine[0]
            }, {
              yAxis:this.markLine[1]
            },

              //   {
              //   yAxis: 200
              // }, {
              //   yAxis: 300
              // }
            ]
          },
          markArea:{
            label: { // 分界线上的文字标签
              position: 'end',
              formatter: '预测值'
            },
            data:[[{
              xAxis:'Tue'},
              {
                xAxis:'Thu'},
            ]]



          }
        }
      }
      myChart.setOption(option);

    }

  },

}
</script>

<style scoped>
.warning-component {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  text-align: center;

  margin: auto;
}

.warning-dates {
  display: flex;
  justify-content: space-between;
//margin-bottom: 10px;
}

.date-item {
  margin: 0 10px;
  font-weight: bold;
}

.warning-recent {
  color: #ff4d4f;
  font-weight: bold;
  margin-bottom: 10px;
}
.chart-div {
  float: left;
}
</style>