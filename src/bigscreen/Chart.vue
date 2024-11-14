<template>
 <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
 <div ref="chart" style="width: 100%;height:200px;"></div>
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
            var option = {
                color:'#f60', //系列柱颜色
                tooltip: {},
                // legend: {
                //     data: ['销量']
                // },
                xAxis: {
                    data: ['1月', '2月', '3月', '裤子', '高跟鞋', '袜子'],
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                },
                yAxis: {
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                },
                series: [
                    {
                    name: '销量',
                    type: 'bar',
                    data:this.items || [10,20,30,40,50,60,70]
                    }
                ],
                grid:{
                    left:'5%',
                    right:'5%',
                    top:'10%',
                    bottom:'5%',
                    containLabel:true
                }
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        initWebsocket(){
           
                this.initChart();
            
        }
    }
}
</script>