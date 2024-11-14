<!-- 直方图和折线图的结合图 -->
<template>
     <div ref="AreaChart" style="height:300px;width:1000px; border: 1px solid #e0e0e0;margin:20px"></div>

  </template>
  
<script>
import * as echarts from "echarts";

  export default {
    props:['myHalfData'],
    data () {
    return {
        myData:this.myHalfData
    }
  },
    mounted() {
        const echarts2 = echarts.init(this.$refs.AreaChart)
        const option_2={
            // 右上角存图
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
              title: {
                text: '事件热度分析'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              legend: {
                data: ['渠道1', '渠道2', '渠道3']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: ['0', '1', '2', '3', '4', '5', '6'],
                  name: '天'
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '渠道1',
                  type: 'line',
                  stack: 'Total',
                  areaStyle: {},
                  emphasis: {
                    focus: 'series'
                  },
                  data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                  name: '渠道2',
                  type: 'line',
                  stack: 'Total',
                  areaStyle: {},
                  emphasis: {
                    focus: 'series'
                  },
                  data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                  name: '渠道3',
                  type: 'line',
                  stack: 'Total',
                  areaStyle: {},
                  emphasis: {
                    focus: 'series'
                  },
                  data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                  name: 'Direct',
                  type: 'line',
                  stack: 'Total',
                  areaStyle: {},
                  emphasis: {
                    focus: 'series'
                  },
                  data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                  name: 'Search Engine',
                  type: 'line',
                  stack: 'Total',
                  label: {
                    show: true,
                    position: 'top'
                  },
                  areaStyle: {},
                  emphasis: {
                    focus: 'series'
                  },
                  data: [820, 932, 901, 934, 1290, 1330, 1200]
                }
              ]
            }
          echarts2.setOption(option_2)
     
    },
  };
  </script>
  
  <style>
  </style>