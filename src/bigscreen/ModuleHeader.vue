<template>
  <div class="module-box">
    <div style="flex:0 1 25%">
      <dv-border-box-13 style="width:100%;height:200px;">
        <h3 style="padding-top: 15px;padding-left: 15px;padding-right: 15px">类型统计</h3>
        <!-- <Chart /> -->
        <div style="display: flex;justify-content: center;align-items: center;">
          <dv-decoration-9 style="width:120px;height:120px;margin-right:30px;" dur=5><h1 style="color: rgba(255,215,0);">48</h1></dv-decoration-9>
          <dv-decoration-9 style="width:120px;height:120px;margin-left: 30px;" dur=5><h1 style="color: rgba(255,215,0);">38</h1></dv-decoration-9>
      </div> 
       <div style="display: flex;justify-content: center;align-items: center;">
        <span style="padding-right: 50px;">节点类型总数</span>
        <span style="padding-left: 50px;">边类型总数</span>
      </div>  

      
      </dv-border-box-13>

      <dv-border-box-13 style="width:100%;height:400px;">
        <h3 style="padding-top: 15px;padding-left: 15px;padding-right: 15px">健康指数</h3>
        <RadarChart/>
        <!-- <dv-capsule-chart :config="config" style="width:100%;height:350px" /> -->
      </dv-border-box-13>
    </div>

    <div style="flex:0 1 50%">
      <dv-border-box-1 style="width:100%;height:600px;">
       <!-- 图谱 -->
       <iframe src="/static/3d-force-graph/index.html" ref="iframe" width="100%" height="600px" scrolling="no"></iframe>
      </dv-border-box-1>
    </div>

    <div style="flex:0 1 25%">
      <dv-border-box-13 style="width:100%;height:200px;">
        <h3 style="padding-top: 15px;padding-left: 15px;padding-right: 15px">图谱统计</h3>
        <div style="display: flex;justify-content: center;align-items: center;">
          <dv-decoration-9 style="width:123px;height:123px;margin-right:30px;" dur=5><h2 style="color: rgba(255,215,0);">606041</h2></dv-decoration-9>
          <dv-decoration-9 style="width:123px;height:123px;margin-left: 30px;" dur=5><h2 style="color: rgba(255,215,0);">1694475</h2></dv-decoration-9>
      </div> 
       <div style="display: flex;justify-content: center;align-items: center;">
        <span style="padding-right: 60px;">节点总数</span>
        <span style="padding-left: 55px;">边总数</span>
      </div>  
        <!-- <dv-capsule-chart :config="config" style="width:100%;height:300px" /> -->
      </dv-border-box-13>

      <dv-border-box-13 style="width:100%;height:400px;">
        <h3 style="padding-top: 15px;padding-left: 15px;padding-right: 15px">区域分析</h3>
        <!-- <dv-conical-column-chart :config="config3" style="width:100%;height:300px;" /> -->
        <Map />
      </dv-border-box-13>
    </div>
  </div>  
      
</template>

<script>
import Map from './Map.vue'
import RadarChart from './RadarChart.vue'

export default {
  components:{
    Map,
    RadarChart
  },
  data(){
    return {
      config:{
        data: [
          {
            name: '南阳',
            value: 167
          },
          { 
            name: '周口',
            value: 67
          },
          {
            name: '漯河',
            value: 123
          },
          {
            name: '郑州',
            value: 55
          },
          {
            name: '西峡',
            value: 98
          }
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '单位',
        showValue: true
      },
      config2:{
        data: [66, 45],
        shape: 'roundRect'
      },
      config3:{
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 71
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 35
          },
          {
            name: '漯河',
            value: 15
          }
        ],
        img: [
          require('../assets/img/1st.png'),
          require('../assets/img/2st.png'),
          require('../assets/img/3st.png'),
          require('../assets/img/4st.png'),
          require('../assets/img/5st.png'),
          require('../assets/img/6st.png'),
          require('../assets/img/7st.png'),
        ]
      },
      config4:{
        centerPoint: [0.48, 0.35],
        points: [
          {
            position: [0.52, 0.235],
            text: '新乡'
          },
          {
            position: [0.43, 0.29],
            text: '焦作'
          },
          {
            position: [0.59, 0.35],
            text: '开封'
          },
          {
            position: [0.53, 0.47],
            text: '许昌'
          },
          {
            position: [0.45, 0.54],
            text: '平顶山'
          },
          {
            position: [0.36, 0.38],
            text: '洛阳'
          },
          {
            position: [0.62, 0.55],
            text: '周口'
          },
          {
            position: [0.56, 0.56],
            text: '漯河'
          },
          {
            position: [0.37, 0.66],
            text: '南阳'
          },
          {
            position: [0.55, 0.81],
            text: '信阳'
          },
          {
            position: [0.55, 0.67],
            text: '驻马店'
          },
          {
            position: [0.37, 0.29],
            text: '济源'
          },
          {
            position: [0.20, 0.36],
            text: '三门峡'
          },
          {
            position: [0.76, 0.41],
            text: '商丘'
          },
          {
            position: [0.59, 0.18],
            text: '鹤壁'
          },
          {
            position: [0.68, 0.17],
            text: '濮阳'
          },
          {
            position: [0.59, 0.10],
            text: '安阳'
          }
        ],
        bgImgUrl: require('../assets/img/map.jpg'),
        centerPointImg: {
          url: require('../assets/img/mapCenterPoint.png')
        },
        pointsImg: {
          url: require('../assets/img/mapPoint.png')
        }
      }
    }
  }

}
</script>
