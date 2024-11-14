<template>
  <div>
    <div ref="index"  style="width: 1200px; height: 400px;margin-left: 0px;margin-top: 0px;"></div>

  </div>



</template>

<script>
import * as echarts from "echarts";
import http from "@/utils/request";

export default {
  props: {
    date:[],
    result:[],
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
      //数据库结构映射
    mapTable:{'个体风险状态':["经营风险","信用风险","流动性风险","市场风险","非流动性"],'风险关联与溢出':["条件在险价值差额","Coplua","协整关系","吸收率"],'市场系统结构':['聚类系数','密度变化','同配性'],
      '市场波动和趋势':['vixPlus指数','市场受损性']},
      datazoom:[],
    state:'个体风险状态'
    }
  },
watch:{
    title(newValue){
    this.state=newValue
    },
  zoom(newVal){
    this.datazoom=newVal
  }
},
  mounted() {
    var that=this
  http.get('/risk/index/?table='+this.title).then((res)=>{
    that.date=res.data.date
    that.result=res.data.result
    var series=[]
    let nameLis=[]
    for (let yaxis in this.result){
      nameLis.push(this.result[yaxis].name)
      series.push({
        data:this.result[yaxis].data,
        type:'line',
        name:this.result[yaxis].name
      })
    }

    this.initChart(nameLis,series)

  })


  },

  methods:{
    initChart(nameLis,series){
      /*
      示例参考如下
      * https://echarts.apache.org/v4/examples/zh/editor.html?c=line-aqi
      *
      * https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/aqi-beijing.json
      *
      * */
      var myChart = echarts.init(this.$refs["index"])
      let option = {
        title: {
          text: this.title,
          left:'center'
        },
        grid:{
          show:true,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          backgroundColor:'#eee'
        },
        legend: {
          top:30,
          data: nameLis
        }
        ,
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: this.date
        },
        yAxis: {
          scale:true,
          splitLine: {
            show: false
          }
        },

        toolbox: {
          right: 120,
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            dataView:{
              show:true,
              title: '查看数据',
            },
            restore: {},
            saveAsImage: {}
          }
        },
        //以下是时间轴
        dataZoom: [{
          //也应该是动态的
          startValue: '2022-07-01'
        }, {
          type: 'inside'
        }],
        //以上是时间轴

        series: series,

      }
      myChart.setOption(option);
      myChart.dispatchAction({
        type: 'dataZoom',
        batch: [{
          // 第一个 dataZoom 组件
          start: this.datazoom[0],
          end: this.datazoom[1]
        }]
      })
    }

  },

}
</script>

<style scoped>

</style>