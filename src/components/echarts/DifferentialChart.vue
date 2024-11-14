<!-- line chart动态数据变化趋势图 -->
<template>
  <div>
  <el-empty description="暂无数据" v-show="!show"></el-empty>
  <div ref="lines" style="width: 800px; height: 300px;padding-left:250px" v-show="show"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props:{
    datelis:[],
    asset:[],
    held_num:[],
  },
  data() {
    return {
      show:false

    };
  },
  watch:{
    datelis(){
      //不为空字符串列表
      console.log(this.held_num)
      if (this.asset.findIndex((value) => value!=='' )!== -1 || this.held_num.findIndex((value) => value!=='')!== -1) {
        console.log(1)
        this.show = true
        this.initChart()
      }
    }
  },
  mounted() {

  },
  methods: {
    initChart(){
      var myChart = echarts.init(this.$refs.lines);
      // 绘制图表
      var option = {
        title: {
          text: "资产和持股规模",
          left: "center",
          textStyle: {
            fontSize: 17,
            lineHeight: 10,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["资产","持股"],
          padding:[25,0,0,0],
          //orient: 'vertical',
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.datelis,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "资产",
            type: "line",
            stack: "Total",
            data: this.asset,
          },
          {
            name: "持股",
            type: "line",
            stack: "Total",
            data: this.held_num,
            // [4500, 5000, 5020, 4900, 4300, 6000, 6600,6200,7000,5500,4900,6100,
            //     6700,7050,8000,9000,11000,12000,8600,8200,9500
            //   ],
          },
        ],
      }
      myChart.setOption(option);

    }

  },
};
</script>

<style>
</style>