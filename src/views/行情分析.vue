<template>
    <div >
      <!-- 卡片化的标签页 -->
      <el-tabs type="card">
        <!-- 1、大盘指数 -->
            <el-tab-pane label="大盘指数">
              <el-card style=" height:80px; border: 1px solid #7f7f7f;" :body-style={padding:0} >         <!--:body-style={padding:0}取消卡片边距，btn就能在左上角 -->
                  <div class="card_label" style=" height: 26px;width: 100%; text-align: center;">条件查询</div>

                  <div class="form">                                                         <!-- inline="true"表单域在一行 -->
                    <el-form :inline="true"  :model="formInline1" class="demo-form-inline">
                      <el-form-item label="开始时间">
                        <el-date-picker  v-model="formInline1.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="结束时间">
                        <el-date-picker v-model="formInline1.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
                      </el-form-item>
                      <el-form-item>
                        <el-button class="grayish_btn" @click="onSubmit1"  size="mini" style=" margin-right: 20px;">查询</el-button>
                      </el-form-item>

                    </el-form>
                  </div>
              </el-card>
              <div class="line_labels">
                  <span style="margin-left:10px;margin-right:370px">上证指数</span>
                  <span style="margin-right:370px">深成指数</span>
                  <span>创业指数</span>
              </div>

              <div class="line_charts">
                        <!--:body-style={padding:0}取消卡片边距，btn就能在左上角 -->
                        <!-- margin-right可以改距离，但padding不行 -->
   

                  <div ref="echarts_1" style="height:300px;width:390px; border: 10px solid #e0e0e0;margin-right:20px"></div>

                  <div ref="echarts_2" style="height:300px;width:390px; border: 10px solid #e0e0e0;margin-right:20px"></div>

                  <div ref="echarts_3" style="height:300px;width:390px; border: 10px solid #e0e0e0"></div>
              </div>
            </el-tab-pane>

        <!-- 2、板块 -->
            <el-tab-pane label="板块">
              <el-card style=" height:80px; border: 1px solid #7f7f7f;" :body-style={padding:0} >         <!--:body-style={padding:0}取消卡片边距，btn就能在左上角 -->
                  <div class="card_label" style=" height: 26px;width: 100%; text-align: center;">条件查询</div>

                  <div class="form">                                                         <!-- inline="true"表单域在一行 -->
                    <el-form :inline="true"  :model="formInline2" class="demo-form-inline">
                      <!-- <el-form-item label="开始时间">
                        <el-date-picker  v-model="formInline.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="结束时间">
                        <el-date-picker v-model="formInline.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
                      </el-form-item> -->
                      <el-form-item label="板块 " style=" margin-right: 40px;">
                        <el-select   v-model="formInline2.sector" placeholder="请选择板块" size="mini">
                          <el-option v-for="item in options_sector" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                                </el-form-item>
                      <el-form-item>
                        <el-button class="grayish_btn" @click="onSubmit2"  size="mini" style=" margin-right: 20px;">查询</el-button>
                      </el-form-item>

                    </el-form>
                  </div>
              </el-card>
              <div class="table"  style="  padding: 20px 10px 2px 0px;"><!--板块表格 -->
                          <el-table :data="tableData_sector" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                                  border  
                                  :row-style="{height:'28px'}"
                                  :cell-style="{padding:'3px'}"
                                  header-row-class-name="active_header"
                                  header-cell-class-name="active_header"
                                  cell-class-name="content_center"
                                  style="width: 100%; border: 1px solid #7f7f7f">          <!-- style="width: 40%"               height="215"  -->
                                
                                  <el-table-column prop="ranking" label="排名" sortable></el-table-column>
                                  <el-table-column v-for='(val,key) in tableLabel_sector' :prop="key" :label="val" ><!--插槽里面没有东西就可以用单标签  -->
                                  </el-table-column>
                          </el-table>
              </div>


            </el-tab-pane>

        <!-- 3、查询 -->
            <el-tab-pane label="查询">
              <el-tabs type="card">
                  <!-- 股票 -->
                  <el-tab-pane label="股票">
                      <el-card style=" height:80px; border: 1px solid #7f7f7f;" :body-style={padding:0} >         <!--:body-style={padding:0}取消卡片边距，btn就能在左上角 -->
                      <div class="card_label" style=" height: 26px;width: 100%; text-align: center;">条件查询</div>

                      <div class="form">                                                         <!-- inline="true"表单域在一行 -->
                        <el-form :inline="true"  :model="formInline3_1" class="demo-form-inline">
                          <el-form-item label="开始时间">
                            <el-date-picker  v-model="formInline3_1.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
                          </el-form-item>
                          <el-form-item label="结束时间">
                            <el-date-picker v-model="formInline3_1.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
                          </el-form-item>
                          <el-form-item label="股票名称 " style=" margin-right: 40px;">
                            <el-input  v-model="formInline3_1.stock" placeholder="请输入股票名称" size="mini"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button class="grayish_btn" @click="onSubmit3_stock"  size="mini" style=" margin-right: 20px;">查询</el-button>
                          </el-form-item>
                          <el-form-item>
                            <el-button class="grayish_btn" @click="chart_stock"  size="mini" style=" margin-right: 20px;">查看股票图像</el-button>
                          </el-form-item>
                


                        </el-form>
                      </div>
                      </el-card>
                      <div class="table"  style="  padding: 20px 10px 2px 0px;">   <!-- 股票表格 -->
                                  <el-table :data="tableData_stock" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                                          border  
                                          :row-style="{height:'28px'}"
                                          :cell-style="{padding:'3px'}"
                                          header-row-class-name="active_header"
                                          header-cell-class-name="active_header"
                                          cell-class-name="content_center"
                                          style="width: 100%; border: 1px solid #7f7f7f">          <!-- style="width: 40%"               height="215"  -->
                                        
                                      <el-table-column v-for='(val,key) in tableLabel_inquiry' :prop="key" :label="val" ><!--插槽里面没有东西就可以用单标签  -->
                                      </el-table-column>

                                      <el-table-column prop="follow" label="关注">
                                        <template slot-scope="scope">
                                          <el-button type="primary" @click="follow"  size="mini" >关注</el-button>
                                        </template>
                                      </el-table-column>


                                  </el-table>
                      </div>
                    


                  </el-tab-pane>

                  <!-- 基金 -->
                  <el-tab-pane label="基金">
                    <el-card style=" height:80px; border: 1px solid #7f7f7f;" :body-style={padding:0} >         <!--:body-style={padding:0}取消卡片边距，btn就能在左上角 -->
                      <div class="card_label" style=" height: 26px;width: 100%; text-align: center;">条件查询</div>

                      <div class="form">                                                         <!-- inline="true"表单域在一行 -->
                        <el-form :inline="true"  :model="formInline3_2" class="demo-form-inline">
                          <el-form-item label="开始时间">
                            <el-date-picker  v-model="formInline3_2.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
                          </el-form-item>
                          <el-form-item label="结束时间">
                            <el-date-picker v-model="formInline3_2.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
                          </el-form-item>
                          <el-form-item label="基金名称 " style=" margin-right: 40px;">
                            <el-input  v-model="formInline3_2.fund" placeholder="请输入股票名称" size="mini"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button class="grayish_btn" @click="onSubmit3_fund"  size="mini" style=" margin-right: 20px;">查询</el-button>
                          </el-form-item>
                          <el-form-item>
                            <el-button class="grayish_btn" @click="chart_fund"  size="mini" style=" margin-right: 20px;">查看基金图像</el-button>
                          </el-form-item>

                        </el-form>
                      </div>
                    </el-card>
                      <div class="table"  style="  padding: 20px 10px 2px 0px;"><!--基金表格 -->
                                  <el-table :data="tableData_fund" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                                          border  
                                          :row-style="{height:'28px'}"
                                          :cell-style="{padding:'3px'}"
                                          header-row-class-name="active_header"
                                          header-cell-class-name="active_header"
                                          cell-class-name="content_center"
                                          style="width: 100%; border: 1px solid #7f7f7f">          <!-- style="width: 40%"               height="215"  -->
                                        
                                      <el-table-column v-for='(val,key) in tableLabel_inquiry' :prop="key" :label="val" ><!--插槽里面没有东西就可以用单标签  -->
                                      </el-table-column>

                                      <el-table-column prop="follow" label="关注">
                                        <template slot-scope="scope">
                                          <el-button type="primary" @click="follow"  size="mini" >关注</el-button>
                                        </template>
                                      </el-table-column>
                                  </el-table>
                      </div>
                    


                  </el-tab-pane>
                </el-tabs>
            </el-tab-pane>

        <!-- 4、我的管理 -->
        <el-tab-pane label="我的管理">
            <el-tabs type="card">
              <!-- 股票 -->
              <el-tab-pane label="股票">
              </el-tab-pane>
              <!-- 基金 -->
              <el-tab-pane label="基金">
              </el-tab-pane>
            </el-tabs>
              
          <div class="table"  style="  padding: 20px 10px 2px 0px;"><!-- 我的管理的表格 -->
                                  <el-table :data="tableData_management" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                                          border  
                                          :row-style="{height:'28px'}"
                                          :cell-style="{padding:'3px'}"
                                          header-row-class-name="active_header"
                                          header-cell-class-name="active_header"
                                          cell-class-name="content_center"
                                          style="width: 100%; border: 1px solid #7f7f7f">          <!-- style="width: 40%"               height="215"  -->
                                        
                                      <el-table-column v-for='(val,key) in tableLabel_management' :prop="key" :label="val" ><!--插槽里面没有东西就可以用单标签  -->
                                      </el-table-column>

                                      <el-table-column prop="follow" label="关注">
                                        <template slot-scope="scope">
                                          <el-button type="primary" @click="follow"  size="mini" >关注</el-button>
                                        </template>
                                      </el-table-column>
                                  </el-table>
          </div>
                    


        </el-tab-pane>
      </el-tabs>
      
        <!-- 弹窗1 -->
        <div>
          	<!-- 详细信息弹窗，默认关闭 -->
         	<el-dialog 
           :visible.sync="detailsdialog_fund" 
           @open="open()"
           width="80%">
              <div ref="echarts_4" style="height:300px; border: 10px solid #e0e0e0;margin-right:20px"></div>
              <div ref="echarts_5" style="height:300px; border: 10px solid #e0e0e0;margin-right:20px"></div>

            
          </el-dialog>
        </div>

        <!-- 弹窗2 -->
        <div>
          	<!-- 详细信息弹窗，默认关闭 -->
         	<el-dialog 
           :visible.sync="detailsdialog_stock" 
           @open="open()"
           width="80%">
              <div ref="echarts_4" style="height:300px; border: 10px solid #e0e0e0;margin-right:20px"></div>
              <div ref="echarts_5" style="height:300px; border: 10px solid #e0e0e0;margin-right:20px"></div>

            
          </el-dialog>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts"
import http from '../utils/request'
export default {
  name:'quotation',
    //引入组件
  components: {

  },
  data() {
    return {
  
// 【详情页】
    // 详情页是否打开的判断标签
    detailsdialog_stock: false,
    detailsdialog_fund: false,


    // 详情页的图像数据
    lineData_1:[["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]],

// 【分页组件的数据】
        total:10,
        page_size:1,
        currentPage:2,
// 【整合接收数据】
        formInline1: {
        // 第1栏"大盘指数"
          start_date:'',
          end_date:'',
          },
          formInline2: {
        // 第2栏"板块"
          sector:'',
        },
       // 第3栏"查询"-股票
          formInline3_1: {

          start_date:'',
          end_date:'',
          stock: '',
        },
        // 第3栏"查询"-基金
          formInline3_2: {
          start_date:'',
          end_date:'',
          fund:'',
          // industry:'',//行业独有
          // province:'',//地域独有
      },
// 【搜索栏】
      options_sector:[
          {value: "行业板块",
          label: "行业板块"}, 
          {value: "地域板块",
          label: "地域板块"}, 
          {value: "概念板块",
          label: "概念板块"}, 
          ],
// 【表格】
// [table-label]
      tableLabel_sector: {//第2栏"板块"的表格
        code:'代码',
        板块: '板块名称',
        涨跌幅: '涨跌幅',
        换手率: '换手率',
        上涨家数: '上涨家数',
        下跌家数: '下跌家数',
        领涨股票: '领涨股票',
        涨跌幅_: '该股涨跌幅',
      },
      


      tableLabel_inquiry: {//第3栏"查询"的表格_fund and stock
        order:'序号',
        emcode: '板块名称',
        emname:'名称',
        growth: '涨跌幅',
        date:'时间',
        nav:'涨跌额',// change amount
        turnover: '成交量',
        volume : '成交额',
        amplitude: '振幅',
        max: '最高',
        min: '最低',
        open:'今开',
        prev_close:'昨收',
        turnoverRate: '换手率',

      },

      
      tableLabel_management:{//第4栏
        order:'序号',
        emcode: '板块名称',
        emname:'名称',
        growth: '涨跌幅',
        date:'时间',
        nav:'涨跌额',// change amount
        turnover: '成交量',
        volume : '成交额',
        amplitude: '振幅',
        max: '最高',
        min: '最低',
        open:'今开',
        prev_close:'昨收',
        turnoverRate: '换手率',
      },

// [table-data]
      // 第2栏"板块"表格
      tableData_sector: [{}
       
      ],

      // 第3栏"板块-股票"表格
      tableData_stock: [{}

      ],

      // 第3栏"板块-基金"表格
        tableData_fund: [
          { }
          

        ],
      // 第3栏"板块-我的管理"表格
        tableData_management: [


        ]

      }
    },
    mounted(){

    const echarts1 = echarts.init(this.$refs.echarts_1)
    const echarts2 = echarts.init(this.$refs.echarts_2)
    const echarts3 = echarts.init(this.$refs.echarts_3)
  
    // 折线图-1
    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let data = [[base, Math.random() * 300]];
    console.log(data)
    for (let i = 1; i < 20000; i++) {
      let now = new Date((base += oneDay));
      data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
    }
    const option_1 = {
      
      tooltip: {
        trigger: 'axis'
      },
      title: {
        // left: 'center',
        text: '上证指数',
        textStyle: {
          fontSize: 13,
        },
      },
      // 右上角存图
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          start: 0,
          end: 20
        }
      ],
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data: data
        }
      ]
    };
    echarts1.setOption(option_1)
    echarts2.setOption(option_1)
    echarts3.setOption(option_1)


      

    },

    methods: {

      // 3折线图
      onSubmit1(){//大盘指数-无数据 待完成
        console.log("查询")
        // 使用formInline1-两个参数
        // start_date:this.formInline1.start_date,
        // end_date:this.formInline1.end_date,）
      },
      // 表
      onSubmit2(){//板块
        console.log("板块查询")
        http.get(
                "/price/bkall/",
                {params:{
                    com_name: this.formInline2.sector,
                    // start_date:this.formInline.start_date,
                    // end_date:this.formInline.end_date,
        }}).then(response => {
            this.tableData_sector= response.data
            console.log(response)
            console.log(response.data)

          })
      },
      // 表
      onSubmit3_stock(){//股票
        console.log("股票查询")
        console.log(this.formInline3_1)
        http.get(
                "/price/stock/",
                {params:{
                    com_name: this.formInline3_1.stock,
                    start_date:this.formInline3_1.start_date,
                    end_date:this.formInline3_1.end_date,
        }}).then(response => {
            this.tableData_stock= response.data
            // 把股票图像数据也传过去（待完成）
            console.log(response)
            console.log(response.data)

          })
      },
      // 表
      onSubmit3_fund(){//基金
        console.log("基金查询")
        console.log(this.formInline3_2)
        http.get(
                "/price/fund/",
                {params:{
                    com_name: this.formInline3_2.fund,
                    start_date:this.formInline3_2.start_date,
                    end_date:this.formInline3_2.end_date,
        }}).then(response => {
            this.tableData_fund = response.data
            // 把基金图像数据也传过去（待完成）
            console.log(response)
            console.log(response.data)

          })
      },

      follow(){
        console.log("关注")
      },

      // 详情图像
      chart_stock(){
        console.log("查看详情")
        this.detailsdialog_stock = true//打开弹窗
      },
      chart_fund(){
        console.log("查看详情")
        this.detailsdialog_fund = true//打开弹窗
      },


      initEcharts() {
            // 查询、我的管理 详细页面图像
        const echarts4= echarts.init(this.$refs.echarts_4)
        const option_4 = {
          // Make gradient line here
          visualMap: [
            {
              show: false,
              type: 'continuous',
              seriesIndex: 0,
              min: 0,
              max: 400
            },
            
          ],
          // title: [
          //   {
          //   x :'center',
          //   y:'bottom',
              
          //     text: '各行业风险价值（机构处于极端困难情况时）的时序变化'
          //   },
          // ],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [
            {data: this.dateList(this.lineData_1)},
          
          ],
          yAxis: [
            {},
          ],

          series: [
            {
              type: 'line',
              showSymbol: true,
              // color：
              data: this.valueList(this.lineData_1)
            },
          
          ]
        };
        echarts4.setOption(option_4)

        const echarts5= echarts.init(this.$refs.echarts_5)
        const upColor = '#ec0000';
        const upBorderColor = '#8A0000';
        const downColor = '#00da3c';
        const downBorderColor = '#008F28';
        // Each item: open，close，lowest，highest
        const data0 = splitData([
          ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
          ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
          ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
          ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
          ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
          ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
          ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
          ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
          ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
          ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
          ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
          ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
          ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
          ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
          ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
          ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
          ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
          ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
          ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
          ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
          ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
          ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
          ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
          ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
          ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
          ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
          ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
          ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
          ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
          ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
          ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
          ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
          ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
          ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
          ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
          ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
          ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
          ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],
          ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],
          ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],
          ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],
          ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],
          ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],
          ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],
          ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],
          ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],
          ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],
          ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],
          ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],
          ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],
          ['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],
          ['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],
          ['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],
          ['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],
          ['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],
          ['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],
          ['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],
          ['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],
          ['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],
          ['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],
          ['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],
          ['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],
          ['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],
          ['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],
          ['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],
          ['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],
          ['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],
          ['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],
          ['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],
          ['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],
          ['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],
          ['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],
          ['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],
          ['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],
          ['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],
          ['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],
          ['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],
          ['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],
          ['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],
          ['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],
          ['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],
          ['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],
          ['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],
          ['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],
          ['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],
          ['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],
          ['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],
          ['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1]
        ]);
        function splitData(rawData) {
          const categoryData = [];
          const values = [];
          for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i]);
          }
          return {
            categoryData: categoryData,
            values: values
          };
        }
        function calculateMA(dayCount) {
          var result = [];
          for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
              result.push('-');
              continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
              sum += +data0.values[i - j][1];
            }
            result.push(sum / dayCount);
          }
          return result;
        }
        const option_5 = {
          // title: {
          //   text: '上证指数',
          //   left: 0
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            data: data0.categoryData,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: 'dataMin',
            max: 'dataMax'
          },
          yAxis: {
            scale: true,
            splitArea: {
              show: true
            }
          },
          dataZoom: [
            {
              type: 'inside',
              start: 50,
              end: 100
            },
            {
              show: true,
              type: 'slider',
              top: '90%',
              start: 50,
              end: 100
            }
          ],
          series: [
            {
              name: '日K',
              type: 'candlestick',
              data: data0.values,
              itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              },
              markPoint: {
                label: {
                  formatter: function (param) {
                    return param != null ? Math.round(param.value) + '' : '';
                  }
                },
                data: [
                  {
                    name: 'Mark',
                    coord: ['2013/5/31', 2300],
                    value: 2300,
                    itemStyle: {
                      color: 'rgb(41,60,85)'
                    }
                  },
                  {
                    name: 'highest value',
                    type: 'max',
                    valueDim: 'highest'
                  },
                  {
                    name: 'lowest value',
                    type: 'min',
                    valueDim: 'lowest'
                  },
                  {
                    name: 'average value on close',
                    type: 'average',
                    valueDim: 'close'
                  }
                ],
                tooltip: {
                  formatter: function (param) {
                    return param.name + '<br>' + (param.data.coord || '');
                  }
                }
              },
              markLine: {
                symbol: ['none', 'none'],
                data: [
                  [
                    {
                      name: 'from lowest to highest',
                      type: 'min',
                      valueDim: 'lowest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        show: false
                      },
                      emphasis: {
                        label: {
                          show: false
                        }
                      }
                    },
                    {
                      type: 'max',
                      valueDim: 'highest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        show: false
                      },
                      emphasis: {
                        label: {
                          show: false
                        }
                      }
                    }
                  ],
                  {
                    name: 'min line on close',
                    type: 'min',
                    valueDim: 'close'
                  },
                  {
                    name: 'max line on close',
                    type: 'max',
                    valueDim: 'close'
                  }
                ]
              }
            },
            {
              name: 'MA5',
              type: 'line',
              data: calculateMA(5),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            },
            {
              name: 'MA10',
              type: 'line',
              data: calculateMA(10),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            },
            {
              name: 'MA20',
              type: 'line',
              data: calculateMA(20),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            },
            {
              name: 'MA30',
              type: 'line',
              data: calculateMA(30),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            }
          ]
        }
        echarts5.setOption(option_5)

      },
      open(){
        this.$nextTick(() => {
        //  执行echarts方法
          this.initEcharts()
        })
      },
      // 数据格式改写
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
      // 接收页码
      CurrentChange(val){
        this.tableList(val)
      },
    }
};
</script>

<style lang="less" scoped>
.text{
  color:rgba(2, 167, 240, 0.729411764705882);
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
  

.grayish_btn{//浅灰色按钮
  color: #fff;//文字颜色
  background-color: #aaaaaa;//背景颜色
}
.card_label{
  font-size: 13px;
  // padding:10px; 
  color:#fff;
  background-color: #7f7f7f;
}
.form{//产品搜索栏
    display:flex;
    justify-content:space-between;//左右贴边
    margin-top:5px; 
    // height: 40px;
    padding-left: 40px;
    // padding: 30px;

}
.line_labels{
    margin-top:20px;
    display:flex;
    padding:5px; 
    // justify-content:space-between;
}
.line_charts{//多折线图
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
