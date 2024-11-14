<template>
<div>
  <el-carousel :interval="5000" arrow="always" height="380px" :autoplay="false" indicator-position="outside" style="margin-top: 9px">
    <el-carousel-item v-for="item in 8" :key="item">
<!--      <h3 class="medium">{{ item }}</h3>-->
<!--      <el-button type="mini" icon="el-icon-arrow-left" circle style="margin: 3px" @click="sendMessage"> </el-button>-->
      <div ref="chartContainer" style="width:1150px; height: 330px;margin: 1px"></div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import * as echarts from "echarts";
import http from "@/utils/request";
export default {
  name: "systemRiskFuture",
  data(){
    return{
      date:[],
      rate:[],
      macro:[],
      montary:[],
      income:[],
      investment:[],
      loan:[],
      lever:[],
      other:[],
      whole:[],
      title:['利率','宏观指标','货币','收入和融资','银行理财','信贷','整体杠杆','其他']
    }
  },
  mounted() {
    this.initGraph()

  },
  methods:{
    sendMessage(){
      this.$emit('transmit', 'systemRiskComponent')

    },
    initGraph(){
      http.get('/risk/future_risk/').then((res)=>{
        this.date=res.data.date
        this.rate=res.data.rate
        this.macro=res.data.macro
        this.montary=res.data.montary
        this.income=res.data.income
        this.investment=res.data.investment
        this.loan=res.data.loan
        this.lever=res.data.lever
        this.other=res.data.other
        this.whole.push(this.rate)
        this.whole.push(this.macro)
        this.whole.push(this.montary)
        this.whole.push(this.income)
        this.whole.push(this.investment)
        this.whole.push(this.loan)
        this.whole.push(this.lever)
        this.whole.push(this.other)
      }).then(()=>{
        for(let i = 0; i < 8; i++) {
        let echart = echarts.init(this.$refs.chartContainer[i])

        const option = {
          title:{text:this.title[i],
          left:'center'
          },
          tooltip: {
            trigger: 'axis'
          },
            legend: {
              top:30,

            },
          xAxis: {
            type: 'category',
            data: this.date
          },
          yAxis: {
            type: 'value'
          },
          series: this.whole[i]
        };
        echart.setOption(option)
      }}

      )

    },

  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #d3dce6;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>