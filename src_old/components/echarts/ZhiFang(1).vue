<template>
  <div id="zhifang" style="width: 85%; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    var myChart = echarts.init(document.getElementById("zhifang"));
    var option = {
      title:{
        text: "交易量/频次及股票变换趋势",
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
        data: ["交易量","收盘价"],
        padding:[70,0,0,100],
        orient: 'vertical',
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
            show:false
          },
          axisLabel:{
            interval:0,
            rotate:30
          },
          data: ['2021-1-1', '2021-1-2', '2021-1-3', '2021-1-4', '2021-1-5', '2021-1-6', '2021-1-7', '2021-1-8', '2021-1-9', '2021-1-10', '2021-1-11', '2021-1-12'],
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "交易量",
          position: "right",
          alignTicks: true,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: "{value}支",
            textStyle:{
               color:'blue'
            }           
          },
        },
        {
          type: "value",
          name: "收盘价",
          position: "left",
          alignTicks: true,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: "{value}元",
            textStyle:{
               color:'green'
            } 
          },
        },
      ],
      series: [
        {
          name: "交易量",
          type: "bar",
          data: [
            100, 120, 80, 230, 150,90, 170, 162, 250, 110, 60, 200,
          ],
        },
        {
          name: "收盘价",
          type: "line",
          yAxisIndex: 1,
          data: [
            10, 25, 30, 19, 12, 16, 26, 23, 20, 17, 21, 15,
          ],
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>

<style>
</style>