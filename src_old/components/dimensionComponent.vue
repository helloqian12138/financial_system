<template>
  <div>
    <div ref="dimension"  style="width: 1200px; height: 450px;margin-left: 0px;margin-top: 0px;"></div>
    <div class="warning-component">
      <div class="warning-dates">
        <button class="button" @click="changeState">
          <span class="text">{{ state }}</span>
          <svg class="arrow" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
        </button>
        <div class="date-item">前日：<span>{{ prevDayDim }}</span></div>
        <div class="date-item">昨日：<span>{{ yesterdayDim }}</span></div>
        <div class="date-item">今日：<span>{{ todayDim }}</span></div>
        <div class="date-item">明日：<span>{{ tomorrowDim }}</span></div>

      </div>
    </div>
  </div>



</template>

<script>
import * as echarts from "echarts";
import http from "@/utils/request";

export default {
  props: {
    // xData:[],
    // yData: [],
    // legend:String,
    title:String,
    zoom:{
      type:Array,
      default: function () {
        return []
      }
    }
  },
  data(){
    return {
      datazoom:[],
      state:'个体风险状态',
      individualRisk:[],
      structureRisk:[],
      spillRisk:[],
      volatilityRisk:[],
      markArea:[],
      date:[],
      detail:'',
      prevDayDim:'',
      yesterdayDim:'',
      todayDim:'',
      tomorrowDim:'',
    }
  },

  mounted: function () {

    http.get('/risk/dimension/').then((res)=>{
      this.date=res.data.date
      this.individualRisk=res.data.individual
      this.structureRisk=res.data.structure
      this.spillRisk=res.data.spill
      this.volatilityRisk=res.data.volatility
      this.detail=res.data.detail
      this.markArea=res.data.markarea
      this.prevDayDim=res.data.detail[this.state][0]
      this.yesterdayDim=res.data.detail[this.state][1]
      this.todayDim=res.data.detail[this.state][2]
      this.tomorrowDim=res.data.detail[this.state][3]
      this.initChart()

        }
    )


  },
  watch:{
    // prevDayDim(){
    //   return this.detail[this.state][0]
    // },
    // yesterdayDim(){
    //   return this.detail[this.state][1]
    // },
    // todayDim(){
    //   return this.detail[this.state][2]
    // },
    // tomorrowDim(){
    //   return this.detail[this.state][3]
    // },
    zoom(newVal){
      this.datazoom=newVal

    },
    state(){

      this.prevDayDim=this.detail[this.state][0]
      this.yesterdayDim=this.detail[this.state][1]
      this.todayDim=this.detail[this.state][2]
      this.tomorrowDim=this.detail[this.state][3]

    }

  },
  methods:{
    changeState(){
      let lis=['个体风险状态','风险关联与溢出','市场系统结构','市场波动和趋势']
      this.state=lis.indexOf(this.state)+1>3? '个体风险状态':lis[lis.indexOf(this.state)+1]
    },
    initChart(){
      /*
      示例参考如下
      * https://echarts.apache.org/v4/examples/zh/editor.html?c=line-aqi
      *
      * https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/aqi-beijing.json
      *
      * */
      var myChart = echarts.init(this.$refs["dimension"])
      let option = {
        title: {
          text: '系统性风险指数维度分析',
          left: 'center',
        },
        // grid:{
        //   show:true,
        //   backgroundColor:'#eee'
        // },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.date
        },
        legend: {
          top:30,
          data: ['个体风险状态', '风险关联与溢出', '市场系统结构', '市场波动和趋势']
        },
        yAxis: {
          scale: true,
          splitLine: {
            show: false
          }
        },

        toolbox: {
          right: 80,
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            dataView: {
              show: true,
              title: '查看数据',
            },
            restore: {},
            saveAsImage: {}
          }
        },
        //以下是时间轴
        dataZoom: [{
          //也应该是动态的
          start:80,
          end:100
        }, {
          type: 'inside'
        }],
        //以上是时间轴

        series: [{
          name: '个体风险状态',
          type: 'line',
          smooth:0.8,
          data: this.individualRisk
        },
          {
            name: '风险关联与溢出',
            type: 'line',
            smooth:0.8,
            data: this.spillRisk
          },
          {
            name: '市场系统结构',
            type: 'line',
            smooth:0.8,
            data: this.structureRisk
          },
          {
            name: '市场波动和趋势',
            type: 'line',
            smooth:0.8,
            data: this.volatilityRisk,
            markArea:{
              label: { // 分界线上的文字标签
                // position: 'end',
                formatter: '预测值'
              },
              data:[[{
                xAxis:this.markArea[0]},
                {
                  xAxis:this.markArea[1]},
              ]]



            }
          },
        ],




      }
      myChart.setOption(option);
      // this.$nextTick(()=>{
      //   myChart.dispatchAction({
      //     type: 'dataZoom',
      //     batch: [{
      //       // 第一个 dataZoom 组件
      //       start: this.datazoom[0],
      //       end: this.datazoom[1]
      //     }]
      //   })
      // })

    }

  },

}
</script>

<style scoped>

.button {
  border-radius: 7px;
  width: 160px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  cursor: pointer;
  border: 3px solid rgb(94, 255, 209);
  background-color: rgb(94, 255, 209);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.137);
}

.text {

  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
//background-color: rgb(255, 255, 255);
  color: black;
}

.arrow path {
  fill: rgb(19, 19, 19);
}

.button:hover .arrow {
  animation: slide-in-left 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-in-left {
  0% {
    transform: translateX(-8px);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

.button:active {
  transform: scale(0.97);
}
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


</style>