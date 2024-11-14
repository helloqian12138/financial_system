<template>
  <div ref="changetrend" style="width: 800px; height: 320px;margin-left: 100px;margin-top: 0px;"></div>
</template>

<script>
import * as echarts from "echarts";
import http from "@/utils/request";
export default {
  data() {
    return {
      time:[],
      riskData:[],
      len:Number,
    };
  },
  mounted() {
    http.get('/warning/get_warning_count/?need=1').then((res)=>{

      for (let i in res.data) {
        this.time.push(res.data[i]["time"].replace('_','-'))
        this.riskData.push(res.data[i]["综合风险水平"])
      }
      this.len=this.time.length
      let selectedTime=this.time.slice(0,40)
      let selectedRisk=this.riskData.slice(0,40)
      var myChart = echarts.init(this.$refs.changetrend);
      // 绘制图表
      // function randomData() {
      //   now = new Date(+now + oneDay);
      //   value = value + Math.random() * 21 - 10;
      //   return {
      //     name: now.toString(),
      //     value: [
      //       [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
      //       Math.round(value),
      //     ],
      //   };
      // }
      // let data = [];
      // let now = new Date(1997, 9, 3);
      // let oneDay = 24 * 3600 * 1000;
      // let value = Math.random() * 1000;
      // for (var i = 0; i < 1000; i++) {
      //   data.push(randomData());
      // }
      // console.log(data)
      var option = {
        title: {
          text: "系统性风险整体变化趋势",
          left:'center',
          textStyle: {//主标题文本样式
            fontSize: 15,
            color:'#696969',
          },
          padding:[ 5,0,5,0],//[5,10] | [ 5,6, 7, 8] ,标题内边距[上，x，下，x]

        },

        grid: {
          left: '20%',//离左边远一点
          right: '4%',
          // bottom: '10%',
          top:'5%',//如果不填，会默认一个特别大的值，导致图的上面留白特别大
          // containLabel: true
        },

        tooltip: {
          trigger: "axis",
          // formatter:
          //     function (params) {
          //   params = params[0];
          //   var date = new Date(params.name);
          //   return (
          //     date.getDate() +
          //     "/" +
          //     (date.getMonth() + 1) +
          //     "/" +
          //     date.getFullYear() +
          //     " : " +
          //     params.value[1]
          //   );
          // },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: "category",
          splitLine: {
            show: false,
          },
          data:selectedTime
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "综合风险",
            type: "line",
            showSymbol: true,
            data: selectedRisk
            // data,
          },
        ],
      };
      myChart.setOption(option);
      var that=this
      let i =0
      setInterval(function () {
        // for (var i = 0; i < 5; i++) {
        //   data.shift();
        //   data.push(randomData());
        // }
          if (i===that.time.length-50)
            i=0
          selectedRisk=that.riskData.slice(i,50+i)
          selectedTime=that.time.slice(i,50+i)
          i++
        myChart.setOption({
          series: [
            {
              name: "综合风险",
              type: "line",
              showSymbol: true,
              data: selectedRisk,
            },
          ],
          xAxis: {

            type: "category",
            splitLine: {
              show: false,
            },
            data:selectedTime
          },
        });
      }, 1500);

    })

  },
  methods: {


  },
};
</script>

<style>
</style>