<!-- 事件分析-事件图谱 -->
<!-- 11.6合并版 -->
<template>
  <div>
    <!-- 关系图/知识图谱：笛卡尔坐标系上的 Graph -->
    <div class="two">
      
      <div class="form">
                                                        <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  :model="formInline1" class="demo-form-inline">
            <el-form-item label="公司名称">
              <el-input  v-model="formInline1.company" placeholder="公司名称：" size="mini"></el-input>
<!--              搜索联想-->
<!--              <el-autocomplete-->
<!--                  class="inline-input"-->
<!--                  v-model="formInline1.company"-->
<!--                  :fetch-suggestions="querySearch"-->
<!--                  placeholder="公司名称"-->
<!--                  size="mini"-->
<!--              ></el-autocomplete>-->
            </el-form-item>

            <el-form-item label="事件类型">
              <el-select   v-model="formInline1.event_type" placeholder="事件类型：" size="mini">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker  v-model="formInline1.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
            </el-form-item>

            <el-form-item label="结束时间">
              <el-date-picker v-model="formInline1.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button class="grayish_btn" @click="onSubmit1" icon="el-icon-search" size="mini">查询</el-button>
            </el-form-item>
<!--            <el-form-item>-->
<!--              <el-button class="grayish_btn" @click="onSubmit1" icon="el-icon-search" size="mini">查询</el-button>-->
<!--            </el-form-item>-->
          </el-form>
        </div>
      <el-card :body-style={padding:0} style='height: 510px;'>
         <!-- 1、上标 -->
         <span class="superscript" style="width: 20px; height: 40px;">事件图谱</span>
         <div>
          <div ref="echarts_1" style="height: 500px"></div>
         </div>
        <!-- 2、产品搜索栏 -->
      </el-card>
    </div>
    <el-dialog  :visible.sync="dialogVisible" width="100%" >
      <!-- 详细信息 -->
      <el-card style=" height:100%;margin-bottom:10px ; " :body-style={padding:0} >
        <div style="display:flex;">
          <el-divider direction="vertical" class="sublabel"></el-divider>
          <span class='title'>事件详情</span>
        </div>
    <el-table :data="detailData"
              style="width: 100%"
              :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
              border
              :row-style="{height:'28px'}"
              :cell-style="{padding:'0px'}"
              header-row-class-name="active_header"
              header-cell-class-name="active_header"
              cell-class-name="content_center"
    >
      <el-table-column
          width="500"
          prop="事件名称"
          label="事件名称">
      </el-table-column>
      <el-table-column
          width="300"
          prop="法人代表"
          label="法人代表">
      </el-table-column>
      <el-table-column
          width="200"
          prop="事件日期"
          label="事件日期">
      </el-table-column>
      <el-table-column
          width="50"
          prop="分歧度"
          label="分歧度">
      </el-table-column>
      <el-table-column
          width="80"
          prop="等级"
          label="风险等级">
      </el-table-column>
    </el-table>

      </el-card>
    </el-dialog>

  </div>




  
</template>

<script >
import qs from 'qs'
// import { getData } from "../api";
import * as echarts from "echarts"
import http from '../utils/request'
import {Loading} from "element-ui";
export default {
  name:'event_graph',
  components:{

  },
  data() {
    return {
      dialogVisible:false,
      detailData:[],
      tableData:[],
// 【接收数据】
      sentiment:[],
      clout:[],
      targetId:'',
      formInline1: {
          company: '',
          event_type: '',
          start_date:'',
          end_date:'',
        },
        


// 【选择框】
      options:[
        {
          value: '',
          label: '全部'
        },
          {
        value: '股权增持',
        label: '股权增持'
      }, {
        value: '股东减持',
        label: '股东减持'
      }, {
        value: '股权质押',
        label: '股权质押'
      }, {
        value: '其他',
        label: '其他'
      },
        {
          value: '重大财产损失',
          label: '重大财产损失'
        },
        {
          value: '重大安全事故',
          label: '重大安全事故'
        },
        {
          value: '股权冻结',
          label: '股权冻结'
        },
        {
          value: '高层死亡',
          label: '高层死亡'
        },
        {
          value: '破产清算',
          label: '破产清算'
        },
        {
          value: '重大对外赔付',
          label: '重大对外赔付'
        },

      ]
      ,
    
      option_detail_company: [{
        value: '公司1',
        label: '公司1'
      }, {
        value: '公司2',
        label: '公司2'
      }],
      option_detail_time: [{
        value: '一天内',
        label: '一天内'
      }, {
        value: '近三天',
        label: '近三天'
      }
      , {
        value: '一周内',
        label: '一周内'
      }
      , {
        value: '一个月内',
        label: '一个月内'
      }
      , {
        value: '一年内',
        label: '一年内'
      }
    ],
      option_prediction: [
      {
          value: '一小时内',
          label: '一小时内'
        }, {
          value: '三小时内',
          label: '三小时内'
        }
        , {
          value: '六小时内',
          label: '六小时内'
        }
        , 
        {
          value: '一天内',
          label: '一天内'
        }, {
          value: '近三天',
          label: '近三天'
        }
        , {
          value: '一周内',
          label: '一周内'
        }
        , {
          value: '一个月内',
          label: '一个月内'
        }
        , {
          value: '一年内',
          label: '一年内'
        }
      ],





// 【知识图谱】
      old_data:[
           {事件标题:"XX股东XX时间增持XX股票事件",
            情感倾向:"中性",
            事件热度:"45",
            时间:"2022/1/4",},
             { 事件标题: "XX股东XX时间增持XX股票事件",
            情感倾向:"积极",
            事件热度:"30",
            时间:"2022/1/4",},
             { 事件标题: "XX股东XX时间增持XX股票事件",
            情感倾向:"消极",
            事件热度:"45",
            时间:"2022/1/4",},
             { 事件标题: "XX股东XX时间增持XX股票事件",
            情感倾向:"消极",
            事件热度:"30",
            时间:"2022/1/4",},
             { 事件标题: "XX股东XX时间增持XX股票事件",
            情感倾向:"中性",
            事件热度:"30",
            时间:"2022/1/4",},
             { 事件标题: "XX股东XX时间增持XX股票事件",
            情感倾向:"积极",
            事件热度:"30",
            时间:"2022/3/8",},
             { 事件标题: "XX股东XX时间增持XX股票事件",
            情感倾向:"中性",
            事件热度:"45",
            时间:"2022/3/10",},
             { 事件标题: "XX股东XX时间增持XX股票事件",
            情感倾向:"消极",
            事件热度:"45",
            时间:"2022/3/10",},
             { 事件标题: 8,
            情感倾向:"中性",
            事件热度:"30",
            时间:"2022/3/10",},
             { 事件标题: 9,
            情感倾向:"消极",
            事件热度:"30",
            时间:"2022/3/14",},
             { 事件标题: 10,
            情感倾向:"中性",
            事件热度:"45",
            时间:"2022/3/14",},
             { 事件标题:11,
            情感倾向:"积极",
            事件热度:"45",
            时间:"2022/3/18",},
             { 事件标题: 12,
            情感倾向:"中性",
            事件热度:"45",
            时间:"2022/3/18",},
             { 事件标题: 13,
            情感倾向:"积极",
            事件热度:"45",
            时间:"2022/3/18",},
             { 事件标题: 14,
            情感倾向:"中性",
            事件热度:"45",
            时间:"2022/3/18",},
             { 事件标题: 15,
            情感倾向:"消极",
            事件热度:"45",
            时间:"2022/3/30",},
             { 事件标题: 16,
            情感倾向:"中性",
            事件热度:"45",
            时间:"2022/3/26",},
             { 事件标题: 17,
            情感倾向:"消极",
            事件热度:"30",
            时间:"2022/3/26",},
             { 事件标题: 18,
            情感倾向:"中性",
            事件热度:"45",
            时间:"2022/3/26",},],



      // 图数据
      // 查看详情-card2-事件热度分析
      circularData1: [
                  { value: 735, name: '积极' },
                  { value: 735, name: '消极' }
                  // { value: 580, name: 'Email' },
                  // { value: 484, name: 'Union Ads' },
                  // { value: 300, name: 'Video Ads' }
        ],
      circularData2: [
                { value: 4445, name: '积极' },
                { value: 735, name: '消极' }
                // { value: 580, name: 'Email' },
                // { value: 484, name: 'Union Ads' },
                // { value: 300, name: 'Video Ads' }
      ],


  }
},

    mounted(){
          //关系图
          //基于准备好的dom，初始化echarts实例
          // var ROOT_PATH = 'https://echarts.apache.org/examples';
          // console.log(this.old_data.情感倾向)
          const echarts1 = echarts.init(this.$refs.echarts_1)
          var legends = ['消极', '中性', '积极'];
          var colors=[ "#D9001B","#009DD9","#90F204"]
          const markLineList=[] //垂直线
          const timeList=[]//存不重复的时间
          const nor_time=[]//存所有的时间
          const nodeid=[]
          const new_data=[]



          var count=0
          for(let {时间: time} of this.old_data){
              nor_time.push(time)
          // 返回值等于-1 说明数组timeList中不存在time,则存入
              if(timeList.indexOf(time)==-1 ){
                timeList.push(time)
                nodeid.push(count)
                markLineList.push({xAxis: count})
                count=count+1
              }

          }

          timeList.sort(function (a, b) {
            return a - b; //a - b < 0: 代表后一个比前一个大，就是升序
          })

          const x_y=[]
          // console.log(timeList.length)
          for (var i = 0; i < timeList.length; i++) {

            var x=i
            var y=1//初始为1让坐标轴暴露更明显
            for (var item of nor_time){
              if(item===timeList[i] ){
                y+=1
                x_y.push([x,y])
            }
          }



          // console.log(x_y)
          }

          for (var i = 0; i < this.old_data.length; i++) {
              var index=legends.indexOf(this.old_data[i].情感倾向)

              new_data.push({
                  id:i,
                  name:this.old_data[i].事件标题,
          // label注释掉，tooltip才会正常显示
          //         label: {
          //
          //               show: true,
          //               position: "bottom",
          //                 fontSize: 13,
          //             width:2,
          //             overflow:'break',
          //           formatter:'{b}:',
          //           // data:legends[index],
          //           // color: "rgb(0, 0, 0)",
          //         },
                  // color: colors[index],
                  symbolSize:this.old_data[i].事件热度,
                  // symbolSize:20,
                  value: x_y[i],
                  itemStyle: {
                      borderColor: '#fff',
                      borderWidth: 2,
                      shadowBlur: 2,
                      shadowColor: '#999999',
                      color: colors[index],
                  },
                tooltip:{show:true,
                  trigger:'axis',
                  triggeron:'mousemove',
                  formatter:'event'
                },

          })}


          // console.log(new_data)
          const option = {
            // 右上角存图
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              // title: {
              //     text: '笛卡尔坐标系上的 Graph'
              // },
              xAxis:[ {
                  // type : 'category',
                  // boundaryGap : false,
                  data : timeList
              }
              ],
              yAxis: {
                  show:false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
                  // type : 'category',//注释后，数轴0开始，不然点会遮住坐标轴
                  // boundaryGap : false,//位于点还是位于区域
                  // data: ['a','b','c','d']
              },
              legend: {
                data: ['消极', '中性', '积极'],  //图例的数据
                top: "15%",   //图例的位置
                icon:"circle",  //图例的形状
                x: 'right',        //图例在右侧
                orient: 'vertical',  //图例纵向排布   horizontal为横向排布
                textStyle: {         //图例字体的颜色
                    color: "#ffffff"
                }},
              series: [
                {
                  type: 'graph',
                  // layout: 'none',
                  coordinateSystem: 'cartesian2d',

                  // 垂直线
                  markLine: {
                      symbol: ['none', 'none'],
                      label: { show: false },
                      data: markLineList,
                      lineStyle: {//标注线样式
                          type: 'dashed',//虚线
                          color: '#999999',//标注线颜色
                    },
                  },
                  // label: {
                  //
                  //   show: true,
                  //   position: "bottom",
                  //   fontSize: 13,
                  //   width:5,
                  //   overflow:'truncate',
                  //   formatter:'{b}:',
                  //   // data:legends[index],
                  //   // color: "rgb(0, 0, 0)",
                  // },
                  // 边两段的类型和大小
                  edgeSymbol: ['circle', 'circle'],
                  edgeSymbolSize: [4,4],
                  //
                  data:new_data,
                  //显示节点备注
                  // itemStyle : {
                  //   normal: {label : {show: true}},
                  //   textStyle: {
                  //   color: '#000'
                  // }
                  //   },
                //  边
                  links: [
                      {source: 0, target: 5},
                      {source: 5, target: 6},
                      {source: 1, target: 7},
                      {source: 2, target: 8},
                      {source: 3, target: 13},
                      {source: 8, target: 9},
                      ],
                  lineStyle: {//关系线样式
                      type: 'solid',//实线
                      color: "rgb(0, 0, 0,80%)",//标注线颜色
                      width: "2",
                  },
                }]
          }
          echarts1.setOption(option)
      console.log(echarts1.getOption())
          echarts1.on('click',function (params){
            // console.log(params.name)
      })
      // this.tableData=JSON.parse(sessionStorage.getItem('eventData'))
      if (this.tableData.length!==0)
        this.changeChart()
      // let target=JSON.parse(sessionStorage.getItem('target'))
      // this.formInline1.company=target[0]
      // this.formInline1.event_type=target[1]
      // this.formInline1.start_date=target[2]
      // this.formInline1.end_date=target[3]
    },

    

  methods:{

    test(){
      console.log('test')
    },
    // 调整表格列宽
    calculateColumnWidth(prop) {
      const text = String(this.tableData[0][prop]); // 使用第一行的数据作为示例
      const calculatedWidth = text.length;
      console.log('console.log(calculatedWidth):',calculatedWidth)
      if(calculatedWidth>10 && calculatedWidth<=50){
        const baseWidth= 20 + calculatedWidth * 0.3
        return `${baseWidth}px`;
      }
      if(calculatedWidth>50){
        const baseWidth= 20 + calculatedWidth * 0.5
        return `${baseWidth}px`;
      }
      else{
        return "20px";
      }
    },
  
    //新闻联想搜索
    querySearch(queryString, cb) {
      // console.log(queryString)
      // console.log(cb)
      http.get(
          "/search/search_news/?name=?"+queryString,

          // paramsSerializer: params => {
          //   return qs.stringify(params, { indices: false })
      ).then(response => {
        // console.log(response.data)
        // console.log(cb)
        let result=response.data
        let re=[]
        for (let i of result){
          re.push({"value":i})
        }
        cb(re)
      })},
    // 1、表
    onSubmit1(){//事件分析
       this.tableData.length=0
      let options={
        text:'请稍等'
      }
      let loadingInstance = Loading.service(options);
        http.get(
                "/event2/event_analyse/",
                {params:{
                    name: this.formInline1.company,
                    event_type:this.formInline1.event_type,
                    start:this.formInline1.start_date,
                    end:this.formInline1.end_date,
                    need:1
        }}).then(response => {
            this.tableData = response.data.data.data
          let links= response.data.data.edges
          let intLink=[]
          // for (let i in links){
          //   intLink.push({source:parseInt(links[i]['source']),target:parseInt(links[i]['target'])})
          // }


          for (let i in links){
            intLink.push({source:this.tableData.find(function(obj) {
              return obj.order === parseInt(links[i]['source'])}).title,
            target:this.tableData.find(function(obj) {
              return obj.order === parseInt(links[i]['target'])}).title

            })

          }
          console.log(intLink)
            this.changeChart(intLink)
          })
      loadingInstance.close()
       },
    changeChart(links){
      // console.log(this.tableData)
      //关系图
      //基于准备好的dom，初始化echarts实例
      // var ROOT_PATH = 'https://echarts.apache.org/examples';
      const echarts1 = echarts.init(this.$refs.echarts_1)
      const markLineList=[] //垂直线
      const timeList=[]//存不重复的时间
      const nor_time=[]//存所有的时间
      const nodeid=[]
      const new_data=[]
      var count=0
      for(let {publish_time: time} of this.tableData){
        // console.log(time)
        nor_time.push(time)
        // 返回值等于-1 说明数组timeList中不存在time,则存入
        if(timeList.indexOf(time)===-1 ){
          timeList.push(time)
          nodeid.push(count)
          markLineList.push({xAxis: count})
          count=count+1
        }

      }
      // console.log(timeList)
      timeList.sort(function (a, b) {
        if( a.split(' ')[0]<b.split(' ')[0]  || a.split(' ')[0]===b.split(' ')[0] && a.split(' ')[1]<b.split(' ')[1])
          return -1; //a - b < 0: 代表后一个比前一个大，就是升序
        else if ( a.split(' ')[0]>b.split(' ')[0] || a.split(' ')[0]===b.split(' ')[0] && a.split(' ')[1]>b.split(' ')[1])
          return 1
        else return 0
      })
      // console.log(timeList)
      let tmp=[]
      // 仅显示部分新闻
      if (this.tableData.length>20) {
        var p = 20 / this.tableData.length
        this.$notify.info({
          title: '提示',
          message: '事件图谱仅显示部分数据'
        });
        for (let i = 0; i < this.tableData.length; i++) {
          // let index=legends.indexOf(this.old_data[i].情感倾向)
          let y = Math.floor(Math.random() * 10 ) + 1 //随机散列开
          if (Math.random() < p) {
            let x = timeList.indexOf(this.tableData[i].publish_time)
            while (tmp.find(value => value === [x, y]))
              y=Math.floor(Math.random() * 10 ) + 1 //随机散列开
            tmp.push([x, y])
            // console.log(x, y)
            new_data.push({
              id: parseInt(this.tableData[i].order),
              name: this.tableData[i].title, //根据name连边
              // name: this.tableData[i].title,
              // label: {
              //   normal: {
              //     show: true,
              //     position: "bottom",
              //     textStyle: {
              //       fontSize: 8
              //     },},
              //
              //   // data:legends[index],
              //   color: "rgb(0, 0, 0)",
              // },
              // color: colors[index],
              symbolSize: this.tableData[i].clout * 30,
              // symbolSize:20,
              value: [x, y],
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 2,
                shadowBlur: 2,
                shadowColor: '#999999',
                color: 'green',

              },
              tooltip: {
                show: true,
                trigger: 'axis',
                triggeron: 'mousemove',
                formatter: 'event'
              },

            })
          }
        }
      }
      else {
        for (let i = 0; i < this.tableData.length; i++) {
          // let index=legends.indexOf(this.old_data[i].情感倾向)
          let y = Math.floor(Math.random() * 10) + 1
          let x = timeList.indexOf(this.tableData[i].publish_time)
          while (tmp.find(value => value === [x, y]))
            y=Math.floor(Math.random() * 10) + 1
          tmp.push([x, y])
          console.log(x, y)
          new_data.push({
            id: parseInt(this.tableData[i].order),
            name: this.tableData[i].title, //根据name连边
            // label: {
            //   normal: {
            //     show: true,
            //     position: "bottom",
            //     textStyle: {
            //       fontSize: 8
            //     },},
            //
            //   // data:legends[index],
            //   color: "rgb(0, 0, 0)",
            // },
            // color: colors[index],
            symbolSize: this.tableData[i].clout * 30,
            // symbolSize:20,
            value: [x, y],
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
              shadowBlur: 2,
              shadowColor: '#999999',
              color: 'green',

            },
            tooltip: {
              show: true,
              trigger: 'axis',
              triggeron: 'mousemove',
              formatter: 'event'
            },
          })
        }
      }
      const option = {
        // 右上角存图
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // title: {
        //     text: '笛卡尔坐标系上的 Graph'
        // },
        xAxis:[ {
          // type : 'category',
          // boundaryGap : false,
          data : timeList
        }
        ],
        yAxis: {
          show:false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
          // type : 'category',//注释后，数轴0开始，不然点会遮住坐标轴
          // boundaryGap : false,//位于点还是位于区域
          // data: ['a','b','c','d']
        },
        legend: {
          data: ['消极', '中性', '积极'],  //图例的数据
          top: "15%",   //图例的位置
          icon:"circle",  //图例的形状
          x: 'right',        //图例在右侧
          orient: 'vertical',  //图例纵向排布   horizontal为横向排布
          textStyle: {         //图例字体的颜色
            color: "#ffffff"
          }},
        // legend: {
        //       normal: {
        //         data: ['消极', '中性', '积极'],
        //         show: true,}
        //     },
        series: [
          {
            type: 'graph',
            // layout: 'none',
            coordinateSystem: 'cartesian2d',

            // 垂直线
            markLine: {
              symbol: ['none', 'none'],
              label: { show: false },
              data: markLineList,
              lineStyle: {//标注线样式

                type: 'dashed',//虚线
                color: '#999999',//标注线颜色

              },
            },

            // 边两段的类型和大小
            edgeSymbol: ['circle', 'circle'],
            edgeSymbolSize: [4,4],
            //
            data:new_data,

            //显示节点备注
            // itemStyle : {
            //   normal: {label : {show: true}},
            //   textStyle: {
            //     color: '#000'
            //   }
            // },
            //  边
            links: links,

                // [
            //   {source: 0, target: 5},
            //   {source: 5, target: 6},
            //   {source: 1, target: 7},
            //   {source: 2, target: 8},
            //   {source: 3, target: 13},
            //   {source: 8, target: 9},
            // ],
            lineStyle: {//关系线样式
              type: 'solid',//实线
              color: "rgb(0, 0, 0,80%)",//标注线颜色
              width: "2",
            }
          }]
      }
      echarts1.setOption(option)
      console.log(echarts1.getOption())
      // 点击事件弹窗
      echarts1.on('click',(parms)=>{
        console.log(parms)
        http.get('/event2/event_graph/',
            {params:{
              id:parms.data.id
              }}
        ).then((res)=>{
          console.log(res.data)
          this.detailData.length=0
          this.detailData.push(res.data)
          this.dialogVisible=true
        })
      })
    },


       open(){
        this.$nextTick(() => {
        //  执行echarts方法
        //   this.initEcharts1()
          this.initEcharts2()
        })
      },

  }
}

</script>

<style lang="less" scoped>
// 调整表头间隔、设置表头下方边框颜色
/deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
      border-bottom: 1px solid rgba(224, 223, 223, 0.771) !important;
      padding: 0px 0 !important;
      min-width: 0 !important;
    }
    .el-table .el-table__cell {
      padding: 12px 0; 
      min-width: 0;
    }
    /deep/ .active_header{//表头
      color: #333333;
      font-size: 13px;
      text-align: center !important;
      // height: 1px;
    }
    /deep/ .content_center{//表的内容
      text-align: center !important;
      font-size: 13px;
    }


.one{
  .form{//产品搜索栏
    
    display:flex;
    justify-content:space-between;//左右贴边
    margin-top:5px; 
    // height: 40px;
    padding-left: 20px;

  }
  .content{
    padding: 0px 20px 2px 20px;//返回表格添加间隙 上 右
    font-size: 12px;


    
    }
  .text{
    color:rgba(2, 167, 240, 0.729411764705882);
  }

  }
.two{
  margin-top:10px; 
}
// 详情页
.flex-charts{//并列图
    // margin-top:20px; 
    display:flex;
    justify-content:space-between;
    // padding:20px;
}
.grayish_btn{//浅灰色按钮
    color: #fff;//文字颜色
    background-color: #aaaaaa;//背景颜色
  }
</style>
