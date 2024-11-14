<template>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div ref="chart" style="width: 100%;height:250px;"></div>
   </template>
   
   <script>
   import * as echarts from 'echarts'
   
   export default {
       data(){
           return {
               items:[]
           }
       },
       mounted(){
           this.initWebsocket();
       },
       methods:{
           initChart(){
               // 基于准备好的dom，初始化echarts实例
               var myChart = echarts.init(this.$refs.chart);
   
               // 指定图表的配置项和数据
               let option = {
                    xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    position: "bottom",
                    axisLine: true,
                    axisLabel: {
                        color: "rgba(255,255,255,.8)",
                        fontSize: 12,
                    },
                    },
                    yAxis: {
                    type: "value",
                    name: "年度生产量",
                    nameLocation: "end",
                    nameGap: 24,
                    nameTextStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: 14,
                    },
                    splitNumber: 4,
                    axisLine: {
                        lineStyle: {
                        opacity: 0,
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                        color: "#fff",
                        opacity: 0.1,
                        },
                    },
                    axisLabel: {
                        color: "rgba(255,255,255,.8)",
                        fontSize: 12,
                    },
                    },
                    grid: {
                    left: 50,
                    right: 10,
                    bottom: 25,
                    top: "18%",
                    },
                    series: [
                    {
                        data:  [220, 182, 191, 234, 290, 330, 310],
                        type: "line",
                        smooth: true,
                        symbol: "emptyCircle",
                        symbolSize: 8,
                        itemStyle: {
                        // normal: {
                        //     color: "#fff",
                        // },
                        },
                     },
                     {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: "line",
                        smooth: true,
                        symbol: "emptyCircle",
                        symbolSize: 8,
                        itemStyle: {
                        // normal: {
                        //     color: "#fff",
                        // },
                        },
                     },
        ],
      };

               myChart.setOption(option);
           },
           initWebsocket(){
              
                   this.initChart();
               
           }
       }
   }
   </script>