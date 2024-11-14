<!--目前数据没有详细到市区，所以两点改动：1 chinaMapHidden注释掉了点击事件，2 echarts里的数据切换改为接口固定数据-->
<template>
  <div>
    <div class="echartsGroup">
      <!-- 返回中国地图 -->
      <div class="button" v-show="isReturnChina" @click="returnChinaFn()">返回中国地图</div>
      <!-- echarts 图表 -->
      <div ref="china_map" style="height: 450px;width:800px"></div>
    </div>
  </div>
</template>
<script>
import tmpJson from 'echarts/map/json/china.json'
import * as echarts from "echarts"
import 'echarts/map/js/china.js' // 核心文件
// require('echarts/theme/macarons') 
export default {
  props: {
    newMapData:[]
  },
  data() {
    return {
      mapData: [//自己做的模拟数据 后续根据业务展示
        {name: '湖北',value:88},
        {name: '广东',value:11024},
        {name: '上海',value:5},
        {name: '山东',value:15},
        {name: '湖南',value:14},
        {name: '重庆',value:0},
        {name: '四川',value:65},
        {name: '新疆',value:36},
        {name: '黑龙江',value:12},
        {name: '西藏',value:68},
        {name: '青海',value:31},
        {name: '内蒙古',value:28},
        {name: '陕西',value:12},
        {name: '辽宁',value:88},
        {name: '云南',value:23},
      ],
      provData:[
        {name:'深圳市',value:99},
        {name:'深圳市',value:1005},
        {name:'佛山市',value: 55564}
      ],
      guangdong:[  //省份公司的数据
        {name: '深圳市',value:23,children:['福田','南山','龙华']},
      ],
      provinces:{   //数据
        台湾: 'taiwan',
        河北: 'hebei',
        山西: 'shanxi',
        辽宁: 'liaoning',
        吉林: 'jilin',
        黑龙江: 'heilongjiang',
        江苏: 'jiangsu',
        浙江: 'zhejiang',
        安徽: 'anhui',
        福建: 'fujian',
        江西: 'jiangxi',
        山东: 'shandong',
        河南: 'henan',
        湖北: 'hubei',
        湖南: 'hunan',
        广东: 'guangdong',
        海南: 'hainan',
        四川: 'sichuan',
        贵州: 'guizhou',
        云南: 'yunnan',
        陕西: 'shanxi1',
        甘肃: 'gansu',
        青海: 'qinghai',
        新疆: 'xinjiang',
        广西: 'guangxi',
        内蒙古: 'neimenggu',
        宁夏: 'ningxia',
        西藏: 'xizang',
        北京: 'beijing',
        天津: 'tianjin',
        上海: 'shanghai',
        重庆: 'chongqing',
        香港: 'xianggang',
        澳门: 'aomen'
      },
      isReturnChina:true, //是否显示返回中国地图
      options:null,   //echarts 存数据
    };
  },
  watch:{
    newMapData(newValue){
      console.log(1)
      this.chinaMaprsult('china',newValue)
    }
  },
  mounted() {
    window.clickRoute= this.clickRoute;

    // this.$nextTick(_=>{
    //   this.chinaMaprsult('china')
    //   console.log("mounted调用成功")
    // })
        this.chinaMaprsult('china',null)
  },
  methods: {
    // 中国地图点击省份 显示当前省份的详细的地区。
    chinaMapHidden(chinaMap) {//（调用）
      console.log("chinaMapHidden调用成功")
      // let that = this
      // chinaMap.off('click')//这里解决多次触发点击事件 但是还会执行2次  引用echarts地图，点击各个省份时，点击一个调用两次接口，再点击一次，调用四次接口，再点击调用八次。。。。依次叠加，问题在于，没有将地图上的点击事件清空
      // chinaMap.on('click',async function(params){
      //   if (params.name in that.provinces) {
      //     var tmp=that.provinces[params.name]
      //     let s = await import('echarts/map/js/province/'+tmp+'.js')
      //     console.log(s)
      //     if (s){
      //       // chinaMap.clear
      //       let tmpData=[
      //   {name:'深圳市',value:99},
      //   {name:'深圳市',value:1005},
      //   {name:'佛山市',value: 55564}
      // ]
      //       that.chinaMaprsult(params.name,tmpData)
      //     }
      //   }
      // })
    },
    // 渲染地图
       chinaMaprsult(name=null,tmpData){
      console.log("chinaMaprsult调用成功")
      let _this = this;
      // console.log(name)
      name=='china'?this.isReturnChina=false:this.isReturnChina=true;     //省份地图就显示返回按钮
      let chinaMap = echarts.init(this.$refs.china_map)  //获取dom元素，初始化
      // let tmpJson=import('echarts/map/json/china.json')
      console.log(tmpJson)
      echarts.registerMap('china',tmpJson)
      var data=this.data
      this.options = {
        // tooltip: { // 鼠标移到图里面的浮动提示框
        //     formatter:function (params) {
        //         return params.name
        //     }
        // },
        
        visualMap:  //图例
            {
          min: 800,
          max: 3000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: [ 'lightgreen', 'yellow']
          }},
        tooltip: { // 鼠标移到图里面的浮动提示框
          trigger: 'item',  //数据项图形触发
          // triggerOn: 'click', //这里根据业务需要给点击事件做跳转,所以不能做悬浮了,如果做悬浮 点击不了文字跳转
          formatter:
              '风险数量: {c0}<br />'
          // function(params){
          //   console.log(params)
          //   let dat=params.data
          //     return params.data
          //
          // }
          //     function(params) {
          //   var name = params.name
          //   var toolipData = []
          //   _this.provinceData.forEach(item=>{
          //     if(name == item.name){
          //       toolipData = item.children
          //     }
          //   })
          //   var htmlStr = ''
          //   toolipData.forEach(item=>{
          //     htmlStr += `<li class="list-li" name="${item}"><div οnclick="clickRoute()" >${item}</div></li>`
          //   })
          //       console.log(toolipData)
          //       console.log(params.name)
          //   return `<div class="list-wrap"><div class="list-title">${name}</div><ul class="list-ul">${htmlStr}</ul></div>`
          // },
        },

        geo: {
          map: name , // 拿到对应的地图
          roam: false,
          nameProperty:'NAME',
          label: { // 页面初始化加载的文字
            normal: {
              show: true,
              textStyle: {
                color: "#ccc", // 页面初始化的地图文字颜色
                fontSize:10// // 页面初始化的地图文字大小
              },
            },
            // formatter:'{b}: {@score}{c}'
          },

          itemStyle: { //设置样式
            // normal:
            //     {
            //   borderWidth: .5, //区域边框宽度
            //   borderColor: 'rgba(119, 156, 255, 1)',
            //   areaColor: {
            //     x: 0,
            //     y: 0,
            //     x2: 0,
            //     y2: 1,
            //     colorStops: [{
            //       offset: 0,
            //       color: '#073684' // 0% 处的颜色
            //     }, {
            //       offset: 1,
            //       color: '#061E3D' // 100% 处的颜色
            //     }],
            //   },
            // },
            // emphasis: { // 移入背景颜色
            //   // areaColor: '#ff00ff',
            //   areaColor: '#F9D92E',
            //   show: true,
            //   textStyle: {
            //     color: '#000',
            //     fontSize: "12px"
            //   }
            // },
          },
        },
        dataset:{
          //老的逻辑，为了根据点击切换市区数据
          // source: name==='china'?this.mapData:tmpData
          source:tmpData
        },
        series: [
          {
            type: "map",
            geoIndex: 0,
            itemStyle: {//地图区域的多边形 图形样式
              normal: {//是图形在默认状态下的样式
                label: {
                  show: true,//是否显示标签
                  textStyle: {
                    color: "black"
                  }
                }
              },
              zoom: 5,  //地图缩放比例,默认为1
              emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                label: { show: true }
              }
            },
            label: {
              normal: {
                show: true, //显示省份标签
                textStyle:{color:"#696969"},//省份标签字体颜色
              },
              emphasis: {
                show: true,
                textStyle: {
                }
              }
            },

          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'fill',
              scale:0
            },
            showEffectOn: 'render',
            label: {
              lineHeight: 30,
              normal: {
                show: true,
                color: '#081727',
                position: 'inside',
                padding:[5,0,0,0],
                verticalAlign: 'middle',
                formatter: function(para) {
                  return '{cnNum|' + para.data.value[2] + '}'
                  // return para.data.value[2]
                },
                rich: {
                  cnNum: {
                    fontSize: 16,
                    color: '#081727',
                    lineHeight:28,
                  }
                }
              },
            },
            symbol: 'roundRect',
            // symbolRotate: 20,
            symbolSize: [40,28],
            data: [],
            zlevel: 1,
          }
        ],
      }
      chinaMap.setOption(this.options)
      console.log(chinaMap.getOption())
      console.log(echarts.getMap('china'))
      this.chinaMapHidden(chinaMap)
    },
    // 返回中国地图（调用）
    returnChinaFn(){
      console.log("returnChinaFn调用成功")
      this.chinaMaprsult('china');
    },
    // 点击跳转页面
    clickRoute(){
      console.log("clickRoute调用成功")
      alert("点击了,做其他操作!")
      // this.$router.push('/')
    },
  }
}
</script>
<style scoped>
.echartsGroup{
  width: 500px;
  height: 500px;
  position:relative;

}
.echartsGroup .button{
  width:100px;
  height:40px;
  line-height:40px;
  text-align:center;
  border:1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  position:absolute;
  top:10px;
  left:10px;
  z-index:99;
}

.list-ul{
  list-style: none;
}
.list-li{
  pointer-events: all;
  cursor: pointer;
}
</style>
