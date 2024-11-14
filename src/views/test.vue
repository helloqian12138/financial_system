<template>
  <div>
<!--    <script type="module" src_old="https://unpkg.com/@splinetool/viewer@1.1.9/build/spline-viewer.js"></script>-->
<!--    <spline-viewer url="https://prod.spline.design/EV4wkoOZwj4KpemL/scene.splinecode"></spline-viewer>-->

    <div ref="graph" style="width:1150px; height: 330px"></div>
<!--    <el-card style=" height:600px;width: 31%;" :body-style={padding:0} overflow:hidden >-->
<!--      <div style="display:flex;">-->
<!--        <el-divider direction="vertical" class="sublabel"></el-divider>-->
<!--        <span class='title'>预警提示</span>-->
<!--      </div>-->
<!--      <vue-seamless-scroll :data="listData" class="warp">-->
<!--        <ul class="item">-->
<!--          <li v-for="(item, index) in listData" :key="index">-->
<!--            <span class="title" v-text="item.title"></span>-->
<!--            <span class="date" v-text="item.date">检测大</span>-->
<!--            <span class="t" v-text="item.t"></span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </vue-seamless-scroll>-->
<!--    </el-card>-->

  </div>

</template>

<script>

import http from "@/utils/request";
import * as echarts from "echarts";
export default {
  name: 'Example01Basic',
  components: {

  },
  data () {
    return {
      listData: [{
        'title': '无缝滚动第一行无缝滚动第一行',
        'date': '2017-12-16',
        't':'ss'
      }, {
        'title': '无缝滚动第二行无缝滚动第二行',
        'date': '2017-12-16',
        't':'qq'
      }, {
        'title': '无缝滚动第三行无缝滚动第三行',
        'date': '2017-12-16'
      }, {
        'title': '无缝滚动第四行无缝滚动第四行',
        'date': '2017-12-16'
      }, {
        'title': '无缝滚动第五行无缝滚动第五行',
        'date': '2017-12-16'
      }, {
        'title': '无缝滚动第六行无缝滚动第六行',
        'date': '2017-12-16'
      }, {
        'title': '无缝滚动第七行无缝滚动第七行',
        'date': '2017-12-16'
      }, {
        'title': '无缝滚动第八行无缝滚动第八行',
        'date': '2017-12-16'
      }, {
        'title': '无缝滚动第九行无缝滚动第九行',
        'date': '2017-12-16'
      }],
    }
  },
  mounted() {
    this.init()
    // console.log('start')
    // http.get('http://61.240.140.173:8000/graph/get_similarity_history/?company_id=91510100201958223R').then((res)=>{
    //   console.log(res.data.data)
    // })
    // this.loadFunc().then((v)=>{
    //   console.log(v)
    // })
    // console.log('end')
  },
  methods:{
    init(){
      const boxplotData =[100,200,560,222,456]
      let echart = echarts.init(this.$refs.graph)
      let option = {

        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },

        grid: [
          // 第一个grid用于折线图
          {
            left: '0%', // 或其他适合的百分比，留出左侧空间
            right: '95%', // 为右侧箱型图预留空间
            height: '80%', // 调整高度，按需设定
          },
          // 第二个grid用于箱型图，紧挨着第一个grid的右侧
          {
            left: '5%', // 紧接上一个grid右侧开始
            right: '0%', // 保持一定右侧边距

            height: '80%', // 调整高度，与第一个grid一致
          },
        ],
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: [{
          type: 'category',
          position: 'bottom',
          gridIndex: 0,
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },{
        type: 'category',
            data: ['1','2','3'], // 可以为空，因为我们不直接在x轴上显示数据
          gridIndex: 1,
          // show: false, // 可选，隐藏这个x轴的标签和轴线
            position: 'bottom',
      },],
        yAxis: [{
          type: 'value',

          gridIndex: 0
        },
      {
        type: 'value',
        show:false,
            gridIndex: 1
      }],
        series: [

          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            xAxisIndex: 0,
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            type: 'boxplot',
            data:[{value: boxplotData,} ],
            // 确保箱型图显示在折线图之后
            // zlevel: 3,
            // 箱型图的x轴数据应对应未来一个月的日期，由于这些日期没有具体值，我们使用null，ECharts会自动处理
            xAxisIndex: 1, // 确保使用同一个x轴
            yAxisIndex: 1, // 确保使用同一个x轴
            // ... 箱型图其他配置，如颜色、样式等
          },
        ]
      };
      echart.setOption(option)
    },
    loadFunc(){
      return new Promise((resolve,reject)=>{
        setTimeout( resolve,3000,'success')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.warp {
  height: 270px;
  width: 360px;
  margin: 0 auto;
  overflow: hidden;
   ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    li,
     span {
      display: block;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
}
</style>