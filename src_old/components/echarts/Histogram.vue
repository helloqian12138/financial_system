<!-- 直方图和折线图的结合图 -->
<template>
  <div id="zhifang" style="width: 85%; height: 400px;margin-left: 100px;"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    xData:[],
    yData: [],
    legend:String,
    title:String,
  },
  data(){
    return{
      x:this.xData,
      y:this.yData,

    }
  },
  watch:{
    xData(newV){
      console.log(newV)
      this.initGraph()
      console.log(this.legend)
    }
  },
  methods:{
    initGraph()
    {
      var myChart = echarts.init(document.getElementById("zhifang"));
      var option = {
        title: {
          text: this.title,
          left: "center",
          textStyle: {
            fontSize: 17,
            lineHeight: 30,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          right: "20%",
        },
        legend: {
          data: this.legend,
          padding: [70, 0, 0, 100],
          orient: 'vertical',
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLabel: {
              // interval: 0,
              rotate: 30
            },
            data: this.xData
          },
        ],
        yAxis: [
          {
            type: "value",
            name: this.legend,
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: 'blue'
              }
            },
          },
          // {
          //   type: "value",
          //   name: "收盘价",
          //   position: "left",
          //   alignTicks: true,
          //   axisLine: {
          //     show: true,
          //   },
          //   axisLabel: {
          //     formatter: "{value}元",
          //     textStyle: {
          //       color: 'green'
          //     }
          //   },
          // },
        ],
        series: [
          {
            name: this.legend,
            type: "line",
            smooth:true,
            markPoint: {
              symbol: 'circle', // 设置拐点小圆点
              // symbolSize:8, // 设置拐点小圆点大小
            },
            data: this.yData
          },
          // {
          //   name: "收盘价",
          //   type: "line",
          //   yAxisIndex: 1,
          //   data: [
          //     10, 25, 30, 19, 12, 16, 26, 23, 20, 17, 21, 15,
          //   ],
          // },
        ],
      };
      myChart.setOption(option);
    }
  },
};
</script>

<style>
</style>