<template>
  <!-- 半圆饼图-Half Doughnut Chart -->
  <div id="banyuan" style="width: 800px; height: 400px;padding-left:250px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    var myChart = echarts.init(document.getElementById("banyuan"));
    var option = {
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "异常类型占比",
        left: "center",
        textStyle: {
          fontSize: 17,
          lineHeight: 85,
        },
      },
      grid: {
              left: '3%',
              right: '4%',
              bottom: '0%',
              top: '0%',

            },
      legend: {
        top: "15%",
        left: "center",
      },
      series: [
        {
          name: "proportion of abnormal risk",
          type: "pie",
          radius: ["40%", "80%"],
          center: ["50%", "70%"],
          // adjust the start angle
          startAngle: 180,
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + " (" + param.percent * 2 + "%)";
            },
          },
          data: [
            { value: 300, name: "股价波动异常" },
            { value: 350, name: "高频交易" },
            { value: 200, name: "资产泡沫" },
            { value: 120, name: "事件风险波及" },
            { value: 110, name: "风险事件时长" },
            { value: 280, name: "事件热度异常" },
            {
              // make an record to fill the bottom 50%
              value: 300+350+200+120+110+280,
              itemStyle: {
                // stop the chart from rendering this piece
                color: "none",
                decal: {
                  symbol: "none",
                },
              },
              label: {
                show: false,
              },
            },
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