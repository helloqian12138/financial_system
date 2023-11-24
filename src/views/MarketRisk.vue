<template>
    <div>
      <div class="one">
        <el-card style='height: 750px;margin-bottom: 10px;' :body-style={padding:0}>
       <!-- height:400px -->
       <!-- 1、上标 -->
        <span class="superscript" style="width: 20px; height: 40px;">系统风险分析</span>
        <!-- 2、产品搜索栏 -->

        <div class="form">
                                                         <!-- inline="true"表单域在一行 -->
            <el-form :inline="true"  class="demo-form-inline" :model="formInline1" ref="formInline">
<!--              <el-form-item label="市场" prop="市场">-->
<!--                <el-select size="mini" v-model="formInline1.market">-->
<!--                  <el-option label="股票" value="股票"></el-option>-->
<!--                  <el-option label="基金" value="基金"></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->

              <el-form-item label="行业" prop="行业">
                <el-select  size="mini" v-model="formInline1.industry" multiple>
                  <el-option label="银行" value="银行"></el-option>
                  <el-option label="保险" value="保险"></el-option>
                  <el-option label="证券" value="证券"></el-option>
                  <el-option label="其他" value="其他"></el-option>
<!--                  <el-checkbox v-model="bank">银行</el-checkbox>-->
<!--                  <el-checkbox v-model="insurance">保险</el-checkbox>-->
<!--                  <el-checkbox v-model="security">证券</el-checkbox>-->
<!--                  <el-checkbox v-model="other">其他</el-checkbox>-->
                </el-select>
              </el-form-item>
              <el-form-item label="开始时间" prop="开始时间">
                <el-date-picker
                    v-model="formInline1.start_date"
                    type="date"
                    placeholder="年/月/日" 
                    size="mini">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="结束时间" prop="结束时间">
              <el-date-picker
                  v-model="formInline1.end_date"
                  type="date"
                  placeholder="年/月/日" 
                  size="mini">
              </el-date-picker>
            </el-form-item>
              <el-form-item>
                <el-button class="grayish_btn" @click="onSubmit1_query" size="mini">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button class="grayish_btn" @click="resetForm('formInline')" size="mini">清空</el-button>
              </el-form-item>
          </el-form>
        </div>
        <!-- 3、tab -->
        <el-tabs type="border-card" style='margin: 0 20px 0 20px;'>

          <!-- 收益率传染 -->
          <el-tab-pane label="收益率传染">
            <el-tabs type="card">
              <!-- 风险价值排名 -->
              <el-tab-pane label="风险价值排名">
                        <!-- 返回table数据-tab1系统风险分析 -->
              <div  class="content">
                <el-table class='table' :data="tableData_1_1" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
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
                <el-table-column v-for='(val,key) in tableLabel_1' :prop="key" :label="val" show-overflow-tooltip sortable>
              
              </el-table-column><!--插槽里面没有东西就可以用单标签  -->
                                                                              <!-- show-overflow-tooltip可以省略展示较多的文字内容 -->
               </el-table>
              </div> 
            </el-tab-pane>
              <!-- 风险价值动态变化 -->
              <el-tab-pane label="风险价值动态变化">
<!--                <addline />-->
                 <div ref="echarts_1" style="height:300px;width:800px;margin-left: 200px;"></div>
              </el-tab-pane>
              <!-- 溢出风险价值动态变化 -->
              <el-tab-pane label="溢出风险价值动态变化">
<!--                <addline />-->
                 <div ref="echarts_2" style="height:300px;width:800px;margin-left: 200px;"></div>
              </el-tab-pane>
              <!-- 格兰杰因果关系网络 -->
              <el-tab-pane label="格兰杰因果关系网络">
                <el-button class="grayish_btn" @click="onSubmit_grayish" >查看格兰杰因果关系网络</el-button>
                <div ref="echarts_5" style="height:1000px;width:1000px;margin-left: 200px;"></div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>


          <!-- 波动传染 -->
          <el-tab-pane label="波动传染">
            <el-tabs type="card">
              <!-- 波动率预测 -->
              <el-tab-pane label="波动率预测">
                <div ref="echarts_3" style="height:350px;width:800px; margin-left: 200px"></div>
              </el-tab-pane>
              <!-- 累计风险分数 -->
              <el-tab-pane label="累计风险分数">
                <div ref="echarts_4" style="height:300px;width:800px;margin-left: 200px;"></div>
              </el-tab-pane>
              <!-- 累计风险分数 -->
              <el-tab-pane label="系统风险贡献率">
                <el-table class='table' :data="tableData_1_2" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
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
                <el-table-column v-for='(val,key) in tableLabel_2' :prop="key" :label="val" show-overflow-tooltip sortable>
              
              </el-table-column><!--插槽里面没有东西就可以用单标签  -->
                                                                              <!-- show-overflow-tooltip可以省略展示较多的文字内容 -->
               </el-table>
              </el-tab-pane>
    
            </el-tabs>
          </el-tab-pane>
        </el-tabs>


      </el-card>
    
      </div>

    </div>
  </template>
  
  <script>
  import * as echarts from "echarts"
  import http from '../utils/request'
  import addline from "../components/addline.vue";
  export default {
    //引入组件
  // components: {
  //   addline
  // },
    data() {
      return {
         cp:{},
        dat:{},
        ra:[],
        // bank:false,
        // insurance:false,
        // security:false,
        // other:false,
// 【整合接收数据】
// 表单1-"系统风险分析"

    formInline1: {
        market:[],
        industry:[],
        start_date:'',
        end_date:'',
    },
// 表单2-个体风险分析
formInline2: {
        market:'',
        industry:'',
        start_date:'',
        end_date:'',
    },


// 【表格】
// [table-label]
        // tab1"收益率传染"表格
        tableLabel_1: {
            id:'编号',
            name:'名称',
            Data:'β系数',
            COVAR:'条件风险价值',
            VAR_005:'风险价值(机构处于极端状况)',
            VAR_05:'风险价值(机构处于常态)',
            DELTA_COVAR:'溢出风险价值',
            risk_level:'风险等级',
      },
        // tab2-“系统风险贡献率”的表格
        tableLabel_2:{
          name:'名称',
          pcas:'系统风险贡献率',
          rank:'排名'
        },


// [table-data]
        // tab1"收益率传染"表格
      tableData_1_1: [
        // {  num:0,
        //     name:'秦农商行',
        //     Data:0.129,
        //     condention_var:-0.06564,
        //     var_extre:-0.11661,
        //     var_norm:-0.03489,
        //     overflow:0.01061,
        //     risk_level:'一级风险',},
        //     {  num:1,
        //     name:'华夏商行',
        //       Data:0.129,
        //     condention_var:-0.06564,
        //     var_extre:-0.11661,
        //     var_norm:-0.03489,
        //     overflow:0.01061,
        //     risk_level:'一级风险',},
        //     {  num:2,
        //     name:'xx商行',
        //     β:0.129,
        //     condention_var:-0.06564,
        //     var_extre:-0.11661,
        //     var_norm:-0.03489,
        //     overflow:0.01061,
        //     risk_level:'一级风险',},
      ],
       // tab2-“系统风险贡献率”的表格
       tableData_1_2: [],

      //个体风险分析表格
      tableData_card2: [
        {  
            name:'秦农商行',
            },
            {  
            name:'华夏商行',
            },
      ],
//【线形图数据】


      }
    },
    mounted(){},



    methods: {
      // 清空功能
      resetForm(formInline) {
        this.$refs[formInline].resetFields();
        console.log(this.formInline)
        console.log('正在清空')
        
      },

      onSubmit1_query() {//确定
        console.log("系统风险分析查询")
        console.log(this.formInline1.market)
        console.log(this.formInline1.industry)
        http.get(
                "/risk/risk_set",
                {params:{
                    name1: this.formInline1.industry,//行业
                    name2: this.formInline1.market,//市场
                    start_date:this.formInline1.start_date,
                    end_date:this.formInline1.end_date,
        }}).then(response => {
            this.tableData_1_1= response.data.data['covar_table']
          this.tableData_1_2= response.data.data['ra']
            this.dat=response.data.data['data']
            this.ra=response.data.data['ra']
            this.cp=response.data.data['cp']
          //拿到所有数据
          //风险价值动态变化
          const echarts1 = echarts.init(this.$refs.echarts_1)
          { let keys,x,bank,insurance,security,other,legend

          for (keys in this.cp['Var']){
            if (keys=== 'x'){
               x=this.cp['Var']['x']
            }
            if (keys=== 'bank'){
              bank=this.cp['Var']['bank']
            }
            if (keys=== 'insurance'){
              insurance=this.cp['Var']['insurance']
            }
            if (keys=== 'zhengquan'){
              security=this.cp['Var']['zhengquan']
            }
            if (keys=== 'other'){
              other=this.cp['Var']['other']
            }
            if (keys=== 'data1'){
              legend=this.cp['Var']['data1']
            }
          }
          const option_1 = {
          // 右上角存图
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
            legend: {
              data: legend},
            title: [
              {
              x :'center',
              y:'bottom',

                text: '各行业风险价值（机构处于极端困难情况时）的时序变化'
              },
            ],
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
            data:x
            },

            yAxis: [
              {},
            ],

            series: [
              {
                type: 'line',
                showSymbol: true,
                // color：
                name:'银行',
                data:bank
              },
              {
                type: 'line',
                showSymbol: true,
                // color：
                name:'保险',
                data:insurance
              },
              {
                type: 'line',
                showSymbol: true,
                // color：
                name:'证券',
                data:security
              },
              {
                type: 'line',
                showSymbol: true,
                // color：
                name:'其他',
                data:other
              },

            ]
          };
          echarts1.setOption(option_1)}
    //溢出风险动态变化
          const echarts2 = echarts.init(this.$refs.echarts_2)
          {let keys,x,bank,insurance,security,other,legend

          for (keys in this.cp['Delta_Covar']){
            if (keys=== 'x'){
              x=this.cp['Delta_Covar']['x']
            }
            if (keys=== 'bank'){
              bank=this.cp['Delta_Covar']['bank']
            }
            if (keys=== 'insurance'){
              insurance=this.cp['Delta_Covar']['insurance']
            }
            if (keys=== 'zhengquan'){
              security=this.cp['Delta_Covar']['zhengquan']
            }
            if (keys=== 'other'){
              other=this.cp['Delta_Covar']['other']
            }
            if (keys=== 'data1'){
              legend=this.cp['Delta_Covar']['data1']
            }
          }
          const option_2 = {
            // 右上角存图
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            legend: {
              data: legend},
            title: [
              {
                x :'center',
                y:'bottom',

                text: '各行业风险价值（机构处于极端困难情况时）的时序变化'
              },
            ],
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              data:x
            },

            yAxis: [
              {},
            ],

            series: [
              {
                type: 'line',
                showSymbol: true,
                // color：
                name:'银行',
                data:bank
              },
              {
                type: 'line',
                showSymbol: true,
                // color：
                name:'保险',
                data:insurance
              },
              {
                type: 'line',
                showSymbol: true,
                // color：
                name:'证券',
                data:security
              },
              {
                type: 'line',
                showSymbol: true,
                // color：
                name:'其他',
                data:other
              },

            ]
          };
            echarts2.setOption(option_2)}

            // 波动率预测

            const echarts3 = echarts.init(this.$refs.echarts_3)
          {let keys,GRACH_Volatility,Real_Volatility,x

            for (keys in this.dat['GARCH']){
              if (keys=== 'GARCH_Volatility'){
                GRACH_Volatility=this.dat['GARCH']['GARCH_Volatility']
              }
              if (keys=== 'Real_Volatility'){
                Real_Volatility=this.dat['GARCH']['Real_Volatility']
              }
              if (keys=== 'x'){
                x=this.dat['GARCH']['x']
              }}


            const option_3 = {
              // 右上角存图
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              // Make gradient line here

              // visualMap: [//将第一个数据组用不同啊颜色展示
              //   {
              //     show: false,
              //     type: 'continuous',
              //     seriesIndex: 0,
              //     min: 0,
              //     max: 400
              //   },

              // ],
              // title: [
              //   {
              //   x : 'center',
              //   y:'bottom',

              //     text: '各行业溢出风险价值的时序变化'
              //   },
              // ],
              legend: {
                data: ['GARCH(1,1) Volatility', 'Real Volatility']
              },
              tooltip: {
                trigger: 'axis'
              },
              xAxis: {
                data:x
              },
              yAxis: [
                {},
              ],

              series: [
                {
                  name: 'GARCH(1,1) Volatility',
                  type: 'line',
                  showSymbol: true,
                  color:'#654e3e',//深褐色
                  data: GRACH_Volatility
                },
                {
                  name: 'Real Volatility',
                  type: 'line',
                  showSymbol: true,
                  color:'#b0896d',//浅褐色
                  data: Real_Volatility,//加入新数据
                },

              ]
            };
            echarts3.setOption(option_3)}

            //累计风险分数
            const echarts4 = echarts.init(this.$refs.echarts_4)
          {let keys,PCA1,PCA10,PCA5,PCA25,x

            for (keys in this.dat['PCA']){
              if (keys=== 'PCA1'){
                PCA1=this.dat['PCA']['PCA1']
              }
              if (keys=== 'PCA10'){
                PCA10=this.dat['PCA']['PCA10']
              }
              if (keys=== 'x'){
                x=this.dat['PCA']['x']
              }
            if (keys=== 'PCA25'){
              PCA25=this.dat['PCA']['PCA25']
            }
            if (keys=== 'PCA5'){
              PCA5=this.dat['PCA']['PCA5']
            }}

            const option_4 = {
              // 右上角存图
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              title: {
                text: '主成分解释股票收益率变动的比例'

              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              legend: {
                data: ['PC1', 'PC5', 'PC10', 'PC25']
              },


              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: x,
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: 'PC1',
                  type: 'line',
                  stack: 'Total',
                  areaStyle: {},
                  emphasis: {
                    focus: 'series'
                  },
                  data: PCA1
                },
                {
                  name: 'PC5',
                  type: 'line',
                  stack: 'Total',
                  areaStyle: {},
                  emphasis: {
                    focus: 'series'
                  },
                  data: PCA5
                },
                {
                  name: 'PC10',
                  type: 'line',
                  stack: 'Total',
                  areaStyle: {},
                  emphasis: {
                    focus: 'series'
                  },
                  data:PCA10
                },
                {
                  name: 'PC25',
                  type: 'line',
                  stack: 'Total',
                  areaStyle: {},
                  emphasis: {
                    focus: 'series'
                  },
                  data: PCA25
                },

              ]
            }
            echarts4.setOption(option_4)

          }
          })
      },

      // 查看格兰杰因果关系网络
      onSubmit_grayish(){
        console.log("查看格兰杰因果关系网络")
        http.get(
            "/risk/risk_net",).then(response => {
              let links= response.data.data['links']
              let nodes=response.data.data['nodes']
        const graph=echarts.init(this.$refs.echarts_5)
        let option = {
          title: {
            text: '格兰杰因果关系网络',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {},
          // legend: [
          //   {
          //     data: graph.categories.map(function (a) {
          //       return a.name;
          //     })
          //   }
          // ],
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: '格兰杰因果关系网络',
              type: 'graph',
              layout: 'circular',
              circular: {
                rotateLabel: true
              },
              data: nodes,
              links: links,
              // categories: graph.categories,
              roam: true,
              label: {
                position: 'right',
                formatter: '{b}'
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              }
            }
          ]
        };
          graph.setOption(option)
      })

      },

      // part2的提交
      onSubmit2_query() {
        console.log("个体风险分析")
        http.get(
                "/risk/risk_individual",
                {params:{
                    name1: this.formInline.industry,//行业
                    name2: this.formInline.market,//省or市场
                    start_date:this.formInline.start_date,
                    end_date:this.formInline.end_date,
        }}).then(response => {
            this.tableData_card2= response.data.data.cover_table
            console.log(response)
            console.log(response.data)

          })
      },
      //还有Query and Clear和图表没做

      dateList(data){
        const dateList =data.map(function (item) {
          return item[0];
          });
          return dateList
      },

      valueList(data){
        const valueList =data.map(function (item) {
          return item[1];
          });
          return valueList
      },


    }

      };
  
  </script>
  


<style lang="less" scoped>
.grayish_btn{//浅灰色按钮
  color: #fff;//文字颜色
  background-color: #aaaaaa;//背景颜色
}


  .form{//产品搜索栏
    
    display:flex;
    justify-content:space-between;//左右贴边
    margin-top:10px; 
    // height: 40px;
    padding-left: 20px;

  }
  .content{
    
    font-size: 12px;


  }
    
    // 调整表头间隔、设置表头下方边框颜色
    /deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
      border-bottom: 1px solid rgba(224, 223, 223, 0.771) !important;
      padding: 8px 0 !important;//这个页面表头大，可以调整一下间距
      min-width: 0 !important;
    }
    .el-table .el-table__cell {
      padding: 12px 0; 
      min-width: 0;
    }
    /deep/ .active_header{//表头
      color: #110101;
      font-size: 9px;
      text-align: center !important;
      // height: 1px;
    }
    /deep/ .content_center{//表的内容
      text-align: center !important;
      font-size: 10px;
    }
.kala_text {
  white-space: pre-wrap;
  word-break: break-word;
}
  
</style>
  