<template>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div ref="chart" style="width: 100%;height:340px;"></div>
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
               let 
               option = {
        title: {
            text: ''
        },
        tooltip: {},
        legend: {

            data: ['第一标准', '第二标准','第三标准'],
            x:"center",
            y:'bottom',
            textStyle:{
                color:"#fff"
            }
        },
        color: ['#4c95d9', '#f6731b', '#8cd43f'],
        radar: {
            name:{
                textStyle: {
                    //设置颜色
                    color:'#fff'
                }
            },
            indicator: [
                { name: 'test1', max: 6500},
                { name: 'test2', max: 16000},
                { name: 'test3', max: 30000},
                { name: 'test4', max: 38000},
                { name: 'test5', max: 52000},
                { name: 'test6', max: 25000}
            ],
            center: ['50%','50%'],
            radius: "58%"
        },
        series: [{
            name: '',
            type: 'radar',
            itemStyle : {
                normal : {
                    splitLine: {
                        lineStyle: {

                        }
                    },
                    label: {
                        show: false,
                        textStyle:{
                        },
                        formatter:function(params) {
                            return params.value;}
                    },
                }
            },
            data : [
                {
                    value : [2400, 10000, 28000, 35000, 50000, 19000],
                    name : '第一标准'
                },
                {
                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                    name : '第二标准'
                },
                {
                    value : [6000, 14000, 18000, 21000, 32000, 11000],
                    name : '第三标准'
                }
            ]
        }]
    };

               myChart.setOption(option);
           },
           initWebsocket(){
              
                   this.initChart();
               
           }
       }
   }
   </script>