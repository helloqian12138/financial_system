<template>
  <!-- 一行二等分 -->
  <div class="module-box">
    <div style="flex:0 1 25%">
       <dv-border-box-13 style="width:100%;height:300px;">
        <h3 style="padding-top: 15px;padding-left: 15px;padding-right: 15px">舆情预警</h3>
        <!-- <CapsuleChart :colorsChart="['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff']"/> -->
        <!-- <CapsuleChart :dataChart="items"/> -->
        <div style="display: flex;justify-content: center;align-items: center;">
          <dv-scroll-board :config="config1" style="width:95%;height:220px;justify-content: center;align-items: center" />
         </div>
      </dv-border-box-13>
    </div>
   

    <div style="flex:0 1 50%">
      <dv-border-box-13 style="width:100%;height:300px;">
        <h3 style="padding-top: 15px;padding-left: 15px;padding-right: 15px">系统性风险指数</h3>
        <!-- <CapsuleChart :dataChart="items"/> -->
        <LineChart />

      </dv-border-box-13>
    </div>

    <div style="flex:0 1 25%">
      <dv-border-box-13 style="width:100%;height:300px;">
        <h3 style="padding-top: 15px;padding-left: 15px;padding-right: 15px">异常监测结果</h3>
        <!-- <CapsuleChart :dataChart="items"/> -->
         <div style="display: flex;justify-content: center;align-items: center;">
          <dv-scroll-board :config="config2" style="width:95%;height:220px;" />
         </div>
        
      </dv-border-box-13>
    </div>
    
  </div>

</template>

<script>
import CapsuleChart from './CapsuleChart.vue';
import LineChart from './LineChart.vue'

export default {
components:{
CapsuleChart,
LineChart
},
data(){
return {
  // 表格设置
  config1 : { 
    header: ['主体代码&nbsp', '行业', '&nbsp&nbsp&nbsp&nbsp&nbsp预警时刻','&nbsp&nbsp&nbsp风险水平','风险类型&nbsp'],
    data: [
        {
          主体代码:'688001.SH',
          行业:'计算机',
          预警时刻:'2023/6/29 16:00',
          风险水平:'严重',
          风险类型:'流动风险',
        },
        {
          主体代码:'688002.SH',
          行业:'计算机',
          当前预警时刻:'2023/6/29 16:00',
          预警类型:'严重',
          风险类型:'市场风险',
        },
        {
          主体代码:'688002.SH',
          行业:'计算机',
          当前预警时刻:'2023/6/29 16:00',
          预警类型:'严重',
          风险类型:'市场风险',
        },
        {
          主体代码:'688002.SH',
          行业:'计算机',
          当前预警时刻:'2023/6/29 16:00',
          预警类型:'严重',
          风险类型:'市场风险',
        },
        {
          主体代码:'688002.SH',
          行业:'计算机',
          当前预警时刻:'2023/6/29 16:00',
          预警类型:'严重',
          风险类型:'市场风险',
        },
      ],
    

  evenRowBGC:'#0A2732',
  oddRowBGC:'0A2732',
  headerBGC:'rgba(61,89,171,0.5)',
  align: ['right'],
  

},


  config2 :
  { 
    data: [
    ['教育',  7],
    ['金融业',  1],
    ['房地产业',  2],
    ['制造业',  3],
    ['房地产业',  4],
    ['批发和零售业',  5],

  ], 
  evenRowBGC:'#0A2732',
  oddRowBGC:'0A2732',
  

},

items:[
    {
    name: '股权质押',
    value: 683
    },
    {
    name: '转让股价',
    value: 234
    },
    {
    name: '股份增持',
    value: 240
    },
    {
    name: '债券发行',
    value: 523
    },
    {
    name: '高管变动',
    value: 345
    },
    {
    name: '产品发布',
    value: 320
    },
    {
    name: '破产',
    value: 280
    },
    {
    name: '业绩下滑',
    value: 271
    },
]
}
}
}
</script>
