<template>
  <div>
    <!-- 1、上标 -->
    <span class="superscript" style="width: 20px; height: 40px;">风险预警</span>
    <!-- 2、产品搜索栏 -->
    <div class="form">
                                                    <!-- inline="true"表单域在一行 -->
      <el-form :inline="true"  :model="formInline1" class="demo-form-inline">

<!--        <el-form-item label="预警市场">-->
<!--          <el-select   v-model="formInline1.market" placeholder="预警市场：" size="mini">-->
<!--            <el-option v-for="item in options_market" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="开始时间">
          <el-date-picker  v-model="formInline1.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-date-picker v-model="formInline1.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="grayish_btn" @click="onSubmit1" icon="el-icon-search" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 3、内容 -->
    <el-row :gutter="20">
      <el-col :span="15">
        <el-card style=" height:800px;">
          <!-- 标题&按钮 -->
          <div style="display: flex;justify-content: space-between;"> 
            <span style="font-size: 18px;font-weight: bold;">各省份风险情况（默认近半年数据）</span>
<!--            <div>-->
<!--              <el-button class="grayish_btn" style="margin-right: 10px;" size="mini">高风险地区</el-button>-->
<!--              <el-button class="grayish_btn" size="mini">风险率攀升</el-button>-->
<!--            </div>-->
          </div>
          <!-- 地图 -->
          <!-- <el-card style=" height:500px;"> -->
            <region :new-map-data="mapData"/>
          <!-- </el-card> -->
          <!-- 表 -->
          <el-table class='table' :data="tableData1" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
            border  
            height="300" 
            :row-style="{height:'28px'}"
            :cell-style="{padding:'0px'}"
            header-row-class-name="active_header"
            header-cell-class-name="active_header"
            cell-class-name="content_center">

              <el-table-column v-for='(val,key) in tableLabel1' :prop="key" :label="val" show-overflow-tooltip /><!--插槽里面没有东西就可以用单标签  -->
                                                                            <!-- show-overflow-tooltip可以省略展示较多的文字内容 -->
              
              <el-table-column
                  prop="scale"
                  label="操作">
                  <template slot-scope="scope">
                    <span class="text" v-on:click="detail1(scope.row)">查看详情</span>
                  </template>
              </el-table-column>
         </el-table>
        </el-card>

        <el-card style=" height:400px;">
          <span style="font-size: 18px;font-weight: bold;">行业预警排行</span>
             <!-- 2、产品搜索栏 -->
         <div class="form_small">
                                                    <!-- inline="true"表单域在一行 -->
            <el-form :inline="true"  :model="formInline2" class="demo-form-inline">

              <el-form-item label="交易所">
                <el-select   v-model="formInline2.industry" placeholder="选择交易所" size="mini">
                  <el-option v-for="item in options_industry" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item>
                <el-button class="grayish_btn" @click="indusRisk" icon="el-icon-search" size="mini">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        <!-- <el-card style=" height:200px;"> -->
          <div ref="echarts_2" style="height:320px;width:1000px">
          </div>
        <!-- </el-card> -->
        </el-card>

      </el-col>

      <el-col :span="9">
        <el-card style=" height:1200px;">
          <span style="font-size: 18px;font-weight: bold;">个体风险预警</span>
          <div class="form_small">
                                                    <!-- inline="true"表单域在一行 -->
            <el-form :inline="true"  :model="formInline3" class="demo-form-inline">

              <el-form-item label="交易所">
                <el-select   v-model="formInline3.industry" placeholder="选择交易所" size="mini">
                  <el-option v-for="item in options_industry" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item>
                <el-button class="grayish_btn" @click="individualRisk" icon="el-icon-search" size="mini">查询</el-button>
              </el-form-item>
            </el-form>
          </div>

<!--          <div >-->
<!--            <span>日</span>-->
<!--            <span>周</span>-->
<!--            <span>月</span>-->
<!--          </div>-->
          <div>
            预警次数
          </div>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card style="background-color: #c43434cc;">
<!--                <div  class="button" @click="alert('here')"> 严重</div>-->
                <el-button type="text" class="button" @click="choseType('严重')">严重</el-button>
                {{ critical }}
              </el-card>
            </el-col>
            <el-col :span="8" >
              <el-card style="background-color: #f1c049;">
<!--                <div> 中等</div>-->
                <el-button type="text" class="button" @click="choseType('中等')">中等</el-button>
                {{ mid }}
              </el-card>
            </el-col>
            <el-col :span="8" >
              <el-card style="background-color: #4dca8e;">
<!--                <div>轻微</div>-->
                <el-button type="text" class="button"  @click="choseType('轻微')">轻微</el-button>
                {{ good }}
              </el-card>
            </el-col>
          </el-row>

          <el-card style=" height:400px;">
            <!-- 去掉图像外围的框，鼠标悬停标题变大，尽量不被外框遮挡 -->
            <div ref="echarts_1" style="height:300px;width:390px; "></div>


          </el-card>
          <!-- 表 -->
          <el-table class='table' :data="tableData2" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
            border  
            
            :row-style="{height:'28px'}"
            :cell-style="{padding:'0px'}"
            header-row-class-name="active_header"
            header-cell-class-name="active_header"
                    height="400"
            cell-class-name="content_center">
            <!-- header-row-class-name 表头行 加classname -->
            <!-- cell-class-name 单元格加名字 -->
          <!-- border有边框 -->
              <!-- stripe
              height="90%"
              :data="tableData"
              style="width: 80%;  margin-top:10px; margin-bottom:10px;" -->
              <el-table-column v-for='(val,key) in tableLabel2' :prop="key" :label="val" show-overflow-tooltip /><!--插槽里面没有东西就可以用单标签  -->
                                                                            <!-- show-overflow-tooltip可以省略展示较多的文字内容 -->
              
              <el-table-column
                  prop="scale"
                  label="操作">
                  <template slot-scope="scope">
                    <span class="text" v-on:click="detail2(scope.row)">查看详情</span>
                  </template>
              </el-table-column>
         </el-table>
        </el-card>
      </el-col>
  </el-row>

  <!-- 详情页1 -->
  <el-dialog 
         :visible.sync="detailsdialog_1" 
         width="80%">
         <el-table class='table' :data="tableData_detail_1" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
            border  
            
            :row-style="{height:'28px'}"
            :cell-style="{padding:'0px'}"
            header-row-class-name="active_header"
            header-cell-class-name="active_header"
            cell-class-name="content_center">
            <!-- header-row-class-name 表头行 加classname -->
            <!-- cell-class-name 单元格加名字 -->
          <!-- border有边框 -->
              <!-- stripe
              height="90%"
              :data="tableData"
              style="width: 80%;  margin-top:10px; margin-bottom:10px;" -->
              <el-table-column v-for='(val,key) in tableLabel_detail_1' :prop="key" :label="val" show-overflow-tooltip /><!--插槽里面没有东西就可以用单标签  -->
                                                                            <!-- show-overflow-tooltip可以省略展示较多的文字内容 -->

         </el-table>
  </el-dialog>

  <!-- 详情页2 -->
  <el-dialog 
         :visible.sync="detailsdialog_2" 
         width="80%">
         <el-table class='table' :data="tableData_detail_2" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
            border  
            fit="true"
            :row-style="{height:'28px'}"
            :cell-style="{padding:'0px'}" style="width: 100%"
            header-row-class-name="active_header"
            header-cell-class-name="active_header"
            cell-class-name="content_center">
            <!-- header-row-class-name 表头行 加classname -->
            <!-- cell-class-name 单元格加名字 -->
          <!-- border有边框 -->
              <!-- stripe
              height="90%"
              :data="tableData"
              style="width: 80%;  margin-top:10px; margin-bottom:10px;" -->
              <el-table-column v-for='(val,key) in tableLabel_detail_2' :prop="key" :label="val" show-overflow-tooltip /><!--插槽里面没有东西就可以用单标签  -->
                                                                            <!-- show-overflow-tooltip可以省略展示较多的文字内容 -->

           <el-table-column
               prop="scale"
               label="点击查看新闻源">
             <template slot-scope="scope">
<!--               <span class="text" v-on:click="detail2(scope.row)">查看详情</span>-->
               <el-button  icon="el-icon-s-promotion" @click="copy(scope.row.url)"></el-button>
             </template>
           </el-table-column>
         </el-table>
  </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts"
import region from "../components/region.vue";
import http from '../utils/request'
export default {
  name:'risk_warning',
  //引入组件
components: {
  region
},
  data() {
    return {
      type:'',
      change:true,
      mapData:'',
      pieData:[],
      critical:'',
      mid:'',
      good:'',
// 【整合接收数据】（3个）
// 1-"风险预警"

      formInline1: {
        market: '',
        start_date:'',
        end_date:'',
      },
// 小1-"行业预警排行"
      formInline2: {
        industry:'',
      },
// 小2-"个体风险预警"
      formInline3: {
        industry:'',
      },

// 【搜索栏】
  // 第1栏"风险预警"(预警市场)
       
    options_market: [{
      value: '股票',
      label: '股票'
    }, {
      value: '债券',
      label: '债券'
    }, {
      value: '期货',
      label: '期货'
    }, {
      value: '全部',
      label: '全部'
    }
  ],
  options_industry:[{
      value: '',
      label: '全部'
    }, {
      value: '深圳证券交易所',
      label: '深圳证券交易所'
    }, {
      value: '上海证券交易所',
      label: '上海证券交易所'
    },
    // {
    //   value: '北交所',
    //   label: '北京证券交易所'
    // },
  ],

  options_exchange:[{
      value: '',
      label: '全部'
    }, {
      value: '深圳证券交易所',
      label: '深圳证券交易所'
    }, {
      value: '上海证券交易所',
      label: '上海证券交易所'
    }, {
      value: '北京证券交易所',
      label: '北京证券交易所'
    }],

// 【表格,不包括详情页】
tableLabel1: {
// num: '事件序号',
province: '省份',
counts: '严重风险总量',
  early_warning_time: '最新预警时刻',
  warning_score:'预警平均值',
  increase:'风险同比增加',
},
      origiData:[],//用于筛选时保存数据
tableLabel2:{
// order: '排名',
code: '股票代码',
name: '企业名称',
warning_type: '风险水平',

},

tableData1: [{
num: '1',
province: '北京',
total_risks: 21,
warning_time: '2023/6/29 16:00',
warning_average:80,
YOY:'+10',
},
{
num: '2',
province: '河北',
total_risks: 21,
warning_time: '2023/6/29 16:00',
warning_average:80,
YOY:'+10',
},
{
num: '3',
province: '山西',
total_risks: 21,
warning_time: '2023/6/29 16:00',
warning_average:80,
YOY:'+10',
},
{
num: '4',
province: '山东',
total_risks: 21,
warning_time: '2023/6/29 16:00',
warning_average:80,
YOY:'+10',
},
{
num: '5',
province: '黑龙江',
total_risks: 21,
warning_time: '2023/6/29 16:00',
warning_average:80,
YOY:'+10',
},
],

tableData2: [
//     {
// order: '1',
// code: '688001.SH',
// name: '华兴源创',
// warning: 80,
//
// },
// {
// order: '2',
// code: '688001.SH',
// name: '华兴源创',
// warning: 75,
//
// },
// {
// order: '3',
// code: '688001.SH',
// name: '华兴源创',
// warning: 75,
//
// },
// {
// order: '4',
// code: '688001.SH',
// name: '华兴源创',
// warning: 75,
//
// },
],
// 【详情页】
  // 详情页是否打开的判断标签
  detailsdialog_1: false,
  detailsdialog_2: false,

  tableData_detail_1:[{}],
  tableData_detail_2:[{}],

  // 区域
  tableLabel_detail_1:{
    code:'主体代码',
    name:'名称',
    province:'省份',
    // 行业:'行业',
    early_warning_time:'当前预警时刻',
    // exchange:'交易所',
    risk_type:'风险类型',
    warning_type:'风险等级',
    warning_score:'风险值',
    last_time:'上次预警时刻',
    increase:'同比',

  },
  // 个体
  tableLabel_detail_2:{
        code:'主体代码',
        name:'名称',
        province:'省份',
        // 行业:'行业',
        early_warning_time:'当前预警时刻',
        exchange:'交易所',
        risk_type:'风险类型',
        warning_type:'风险水平',
        warning_score:'风险概率',
        url:'相关链接'
  },

    }
  },
  mounted(){
    this.initMapData()
    this.individualRisk()
    this.indusRisk()
//     const echarts2 = echarts.init(this.$refs.echarts_2)
//
//
//     const option_2 = {
//     // 右上角存图
//     toolbox: {
//       feature: {
//         saveAsImage: {}
//       }
//     },
//
//     grid: {
//       left: '20%',//离左边远一点
//       right: '4%',
//       // bottom: '10%',
//       top:'8%',//如果不填，会默认一个特别大的值，导致图的上面留白特别大
//       // containLabel: true
//     },
//     xAxis: {
//       type: 'value',
//       // boundaryGap: [0, 0.01]
//     },
//     yAxis: {
//       type: 'category',
//       data: ['房地产业', '信息传输、软件和信息技术服务业', '水利、环境和公共设施管理业', '制造业', '建筑业','综合','批发和零售业','电力、热力、燃气及水生产和供应业','租赁和商务服务业','交通运输、仓储和邮政业','卫生和社会工作','文化、体育和娱乐业','采矿业','住宿和餐饮业','科学研究和技术服务业','教育','农、林、牧、渔业','居民服务、修理和其他服务业']
//
// //   },
//     },
//     series: [
//       {
//         // color:'#6d7d87',
//         type: 'bar',
//         data: [18203, 23489, 29034, 104970, 131744, 630230,18203, 23489, 29034, 104970, 131744, 630230,19325, 23438, 31000, 121594, 134141, 681807,]
//       },
//       // {
//       //   name: '2012',
//       //   type: 'bar',
//       //   data: [19325, 23438, 31000, 121594,19325, 23438, 31000, 121594, 134141, 681807, 134141, 681807,18203, 23489, 29034, 104970, 131744, 630230,]
//       // }
//     ]
//   }
//
//
//
//
//     echarts2.setOption(option_2)
  },
  methods: {
    copy(url){

      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value)
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      });
      oInput.remove()
      window.open(url, "_blank");
    },
    choseType(type){
      if( this.change ||this.type!==type)//初始状态 或选择了新的类型
      {
        this.tableData2=this.origiData
        this.tableData2=this.tableData2.filter(item=>item.warning_type===type)
        this.type=type
        this.change=!this.change
      }
      else if(!this.change)
      {
        this.tableData2=this.origiData
        this.change=!this.change
      }
      // for(let i in this.tableData2){
      //   if (i.warning_type!==type)
      //     this.tableData2.
    },
    initMapData(){
      http.get('/warning/region_all_risk/',{params:{
        //  不传时间默认最近半年
        }}).then((res)=>{
        this.mapData=res.data
      })
    },


    onSubmit1() {
      http.get('/warning/warning_rank/',{params:{
          // exchange:this.exchange
          market:this.formInline1.market,
          start:this.formInline1.start_date,
          end:this.formInline1.end_date,
        }}).then((res)=>{
        this.tableData2=res.data
        this.origiData=res.data

      })
      http.get('/warning/region_rank/',{params:{
          // exchange:this.exchange
          market:this.formInline1.market,
          start:this.formInline1.start_date,
          end:this.formInline1.end_date,
        }}).then((res)=>{
        this.tableData1 = eval(unescape(res.data.replace(/\\u/g, '%u')))
        // this.tableData1=res.data
      })
      http.get('/warning/region_all_risk/',{params:{
          //  不传时间默认最近半年
          start:this.formInline1.start_date,
          end:this.formInline1.end_date,
        }}).then((res)=>{
        this.mapData=res.data
      })
    },
    individualRisk() {
      const echarts1 = echarts.init(this.$refs.echarts_1)
      http.get('/warning/individual_rank/', {
        params: {
          // exchange:this.exchange
          exchange: this.formInline3.industry,
          start:this.formInline1.start_date,
          end:this.formInline1.end_date,

        }
      }).then((res) => {
        this.pieData.length=0
        this.critical = res.data['指数']['严重']
        this.mid = res.data['指数']['中等']
        this.good = res.data['指数']['轻微']
        let tmp=res.data['环形图']
        for(let key in tmp)
        {
          let arr={}
          arr['name']=key
          arr['value']=tmp[key]
          this.pieData.push(arr)
        }

        echarts1.clear()
        const option_1={
          // 右上角存图
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['30%', '65%'],//调整饼图内圆和外圆大小
              center:['50%','65%'],//调整饼在画布上的距离，此时偏下
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true
              },
              data: this.pieData
              //     [
              //   { value: 40, name: '重大声誉风险' },
              //   { value: 38, name: '流动风险' },
              //   { value: 32, name: '获现风险' },
              //   { value: 30, name: '市场风险' },
              //   { value: 28, name: '经营风险' },
              //   { value: 26, name: '信用风险' },
              //   { value: 22, name: '资产负债风险' }
              // ]
            }
          ]
        }
        echarts1.setOption(option_1,true)
      })
      http.get('/warning/warning_rank/',{params:{
          // exchange:this.exchange
          exchange: this.formInline3.industry,
          start:this.formInline1.start_date,
          end:this.formInline1.end_date,
        }}).then((res)=>{
        this.tableData2=res.data
        this.origiData=res.data
      })

    },
    indusRisk() {
      const echarts2 = echarts.init(this.$refs.echarts_2)
      http.get('/warning/indus_rank/', {
        params: {
          // exchange:this.exchange
          exchange: this.formInline2.industry,
          start:this.formInline1.start_date,
          end:this.formInline1.end_date,
        }
      }).then((res) => {

        let xData=[],yData=[]
        let tmp=res.data
        for(let key in tmp)
        {
          xData.push(tmp[key])
          yData.push(key)
        }


        const option_2 = {
          // 右上角存图
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },

          grid: {
            left: '20%',//离左边远一点
            right: '4%',
            // bottom: '10%',
            top:'8%',//如果不填，会默认一个特别大的值，导致图的上面留白特别大
            // containLabel: true
          },
          xAxis: {
            type: 'value',
            // boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: yData

//   },
          },
          series: [
            {
              // color:'#6d7d87',
              type: 'bar',
              data: xData
            },
            // {
            //   name: '2012',
            //   type: 'bar',
            //   data: [19325, 23438, 31000, 121594,19325, 23438, 31000, 121594, 134141, 681807, 134141, 681807,18203, 23489, 29034, 104970, 131744, 630230,]
            // }
          ]
        }


        echarts2.setOption(option_2)
      })
    },
    regionRisk() {
      http.get('/warning/region_rank/', {
        params: {
          // exchange:this.exchange
          exchange: this.formInline3.industry,
          start:this.formInline1.start_date,
          end:this.formInline1.end_date,
        }
      }).then((res) => {
        this.pieData.length = 0
        let data = eval(unescape(res.data.replace(/\\u/g, '%u')))
        this.critical = data['指数']['严重']
        this.mid = data['指数']['中等']
        this.good = data['指数']['轻微']

      })
    },
    // 详情页1
    detail1(row){
    // console.log("查看详情-各省份风险情况")
      http.get('/warning/region_rank_detail/', {
        params: {
          // exchange:this.exchange
          region: row.province,
          // start:this.formInline1.start_date,
          // end:this.formInline1.end_date,
        }
      }).then((res) => {
        // this.tableData_detail_1 = eval(unescape(res.data.replace(/\\u/g, '%u')))
        this.tableData_detail_1=res.data
      })
    console.log(row)//返回这一行所有的内容
    this.detailsdialog_1 = true//打开弹窗


    // http.get(
    //           "/",
    //           {params:{
    //             id: row.order,//新闻id 是吗？

    //   }}).then(response => {
    //       this.detailData_table1 = response.data//待修改
    //       this.detail_content=response.data.content

    //       console.log(response.data)
          

    //     })


    },
    // 详情页2
    detail2(row){
    console.log("查看详情-个体风险预警")
    console.log(row)//返回这一行所有的内容
      // console.log(this.tableData2)
      this.tableData_detail_2=Array(row)
    // for(let i in this.tableData2)
    // {
    //
    //   if (this.tableData2[i]['name']===row['name'] && this.tableData2[i]['early_warning_time']===row['early_warning_time'])
    //       this.tableData_detail_2=this.tableData2[i]
    // }
      this.detailsdialog_2 = true//打开弹窗
    // http.get(
    //           "/",
    //           {params:{
    //             id: row.order,//新闻id 是吗？

    //   }}).then(response => {
    //       this.detailData_table1 = response.data//待修改
    //       this.detail_content=response.data.content

    //       console.log(response.data)
          

    //     })
    },

  }
};
</script>

<style lang="less" scoped>

//div按钮
.button{
  .hover {
    background-color: #0056b3;
  }

  .active {
    background-color: #003e80;
  }
  display: block;
  //background-color: #007bff;
  color: #000000;
  //padding: 10px 20px;
  border: none;
}
// 地图布局，与下方表格的距离
/deep/ .echartsGroup[data-v-02ef51f8] {
  // width: 500px;
  height: 460px;
  // position: relative;
}
.el-form-item {
  margin-bottom: 0px;
}
.form{//产品搜索栏
  // display:flex;
  // justify-content:space-between;//左右贴边
  margin-top:5px; 
  // // height: 40px;
  padding-left: 10px;
  margin-bottom: 10px;
  // padding: 0px;

}
.form_small{
  margin-top:5px; 
  // // height: 40px;
  padding-left: 10px;
}
.table{
  // 和选项框隔开
  margin-top:10px;
  font-size: 12px;


  // 调整表头间隔、设置表头下方边框颜色
  /deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  // border-bottom: 1px solid #333333 !important;
  padding: 1px 0; 
  min-width: 0;
  }
  // 去除表格cell间隔
  .el-table .el-table__cell {
    padding: 0px 0; 
    min-width: 0;
    // border-color:#333333;

  }
  /deep/ .active_header{//表头
    color: #333333;
    font-size: 13px;
    text-align: center !important;
    // border-color:#333333;

    // height: 1px;
  }
  /deep/ .content_center{//表的内容
    text-align: center !important;
    font-size: 13px;
    // border-color:#333333;
  }
}
.text{
  color:rgba(2, 167, 240, 0.729411764705882);
}
.grayish_btn{//浅灰色按钮
    color: #fff;//文字颜色
    background-color: #aaaaaa;//背景颜色
  }

</style>
