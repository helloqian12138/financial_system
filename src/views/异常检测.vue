<!-- 预警服务-异常检测 -->
<template>
    <div>
    <!-- 卡片化的标签页 -->
    <el-tabs type="border-card">
    <!-- 【1】股市 -->
    <el-tab-pane label="股市">
      <el-card style='height: 1050px;margin-bottom: 10px;' :body-style={padding:0}>
      <!-- height:400px -->
      <!-- 1、上标 -->
      <span class="superscript" style="width: 20px; height: 40px;">股票异常检测</span>
      <!-- 2、产品搜索栏 -->
  
      <div class="form">
                                                          <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  class="demo-form-inline" :model="formInline1" ref="formInline2">
  
<!--              <el-form-item label="行业" prop="行业">-->
<!--              <el-select  size="mini" v-model="formInline1.industry">-->
<!--                  <el-option label="行业1" value="行业1"></el-option>-->
<!--                  <el-option label="行业2" value="行业2"></el-option>-->
<!--              </el-select>-->
<!--              </el-form-item>-->
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
              <el-button class="grayish_btn" @click="onSubmit1" size="mini">查询</el-button>
              </el-form-item>
  
  
          </el-form>
      </div>
      <!-- 添加半圆饼图 -->
      <half-doughnut :key='1' :myHalfData="myHalfData1"></half-doughnut>
      <!-- <half-doughnut/ :prop=""> -->
      <!-- 表格 -->
      <div class="table">
              <el-table :data="tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                    border  
                    height="500"
                    :row-style="{height:'30px'}"
                    :cell-style="{padding:'5px'}"
                    header-row-class-name="active_header"
                    header-cell-class-name="active_header"
                    cell-class-name="content_center"
                    style="width: 100px">          <!-- style="width: 40%"               height="215"  -->
                <template v-for="(val,key) in tableLabel1">
<!--                  You should not mix 'v-for' with 'v-if'-->
<!--                  条件渲染-->
                <el-table-column  :prop="key"  :key='key'
                                 :label='typeof val === "object" ? val.label : val'
                                 :filters=filterText
                                 :filter-method="filterTag"
                                 v-if=' val.special'
                />
                  <el-table-column  :prop="key"  :key='key'
                                    :label='typeof val === "object" ? val.label : val'

                                    v-if=' !val.special'
                  />
                </template>
                <!--插槽里面没有东西就可以用单标签  -->
                  <el-table-column
                          prop="scale"
                          label="操作">
                          <template slot-scope="scope">
<!--                            <span class="text"  v-on:click="detail(scope.row,this.formInline1.start_date)">查看详情</span>-->
                            <span class="text"  v-on:click="testDeatil(scope.row)">查看详情</span>
                          </template>
                      </el-table-column>
              </el-table>
            </div>

<!--        分页-->
        <div class="block" style="margin-top:15px;">
          <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="currentPage"

                         :page-size="10"
                         layout="total, prev, pager, next, jumper"
                         :total="tableData1.length">
          </el-pagination>

        </div>
  
      </el-card>
    </el-tab-pane>
    <!-- 【2】债市 -->
    <el-tab-pane label="债市">
      <el-card style='height: 1050px;margin-bottom: 10px;' :body-style={padding:0}>
      <!-- height:400px -->
      <!-- 1、上标 -->
      <span class="superscript" style="width: 20px; height: 40px;">债市异常检测</span>
      <!-- 2、产品搜索栏 -->
  
      <div class="form">
                                                          <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  class="demo-form-inline" :model="formInline2" ref="formInline2">
<!--              <el-form-item label="行业" prop="行业">-->
<!--              <el-select  size="mini" v-model="formInline2.industry">-->
<!--                  <el-option label="行业1" value="行业1"></el-option>-->
<!--                  <el-option label="行业2" value="行业2"></el-option>-->
<!--              </el-select>-->
<!--              </el-form-item>-->
              <el-form-item label="开始时间" prop="开始时间">
              <el-date-picker
                  v-model="formInline2.start_date"
                  type="date"
                  placeholder="年/月/日" 
                  size="mini">
              </el-date-picker>
              </el-form-item>
  
              <el-form-item label="结束时间" prop="结束时间">
              <el-date-picker
                  v-model="formInline2.end_date"
                  type="date"
                  placeholder="年/月/日" 
                  size="mini">
              </el-date-picker>
          </el-form-item>
              <el-form-item>
              <el-button class="grayish_btn" @click="onSubmit2" size="mini">查询</el-button>
              </el-form-item>
  
  
          </el-form>
      </div>
      <!-- 添加半圆饼图 -->
      <half-doughnut :key='2' :myHalfData="myHalfData3"></half-doughnut>
      <!-- 表格 -->
      <div class="table">
              <el-table :data="tableData2.slice((currentPage-1)*pageSize,currentPage*pageSize)" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                    border  
                    height="500"
                    :row-style="{height:'30px'}"
                    :cell-style="{padding:'5px'}"
                    header-row-class-name="active_header"
                    header-cell-class-name="active_header"
                    cell-class-name="content_center"
                    style="width: 100px">          <!-- style="width: 40%"               height="215"  -->
                <template v-for="(val,key) in tableLabel2">
                  <!--                  You should not mix 'v-for' with 'v-if'-->
                  <!--                  条件渲染-->
                  <el-table-column  :prop="key"  :key='key'
                                    :label='typeof val === "object" ? val.label : val'
                                    :filters=filterText
                                    :filter-method="filterTag"
                                    v-if=' val.special'
                  />
                  <el-table-column  :prop="key"  :key='key'
                                    :label='typeof val === "object" ? val.label : val'

                                    v-if=' !val.special'
                  />
                </template>
                  <el-table-column
                          prop="scale"
                          label="操作">
                          <template slot-scope="scope">
                            <span class="text"  v-on:click="detail(scope.row,formInline2.start_date)">查看详情</span>
                          </template>
                      </el-table-column>
              </el-table>
            </div>
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage"

                       :page-size="10"
                       layout="total, prev, pager, next, jumper"
                       :total="tableData2.length">
        </el-pagination>
      
      
  
  
      </el-card>
    </el-tab-pane>
    <!-- 【3】期货 -->
    <el-tab-pane label="期货">
      <el-card style='height: 1050px;margin-bottom: 10px;' :body-style={padding:0}>
      <!-- height:400px -->
      <!-- 1、上标 -->
      <span class="superscript" style="width: 20px; height: 40px;">合约交易异常</span>
      <!-- 2、产品搜索栏 -->
  
      <div class="form">
                                                          <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  class="demo-form-inline" :model="formInline3" ref="formInline3">
<!--              <el-form-item label="商品种类" prop="商品种类">-->

<!--                  <el-select   v-model="formInline3.industry" placeholder="选择商品" size="mini">-->
<!--                    <el-option v-for="item in futureOption" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--                  </el-select>-->

<!--              </el-form-item>-->
              <el-form-item label="开始时间" prop="开始时间">
              <el-date-picker
                  v-model="formInline3.start_date"
                  type="date"
                  placeholder="年/月/日" 
                  size="mini">
              </el-date-picker>
              </el-form-item>
  
              <el-form-item label="结束时间" prop="结束时间">
              <el-date-picker
                  v-model="formInline3.end_date"
                  type="date"
                  placeholder="年/月/日" 
                  size="mini">
              </el-date-picker>
          </el-form-item>
              <el-form-item>
              <el-button class="grayish_btn" @click="onSubmit3" size="mini">查询</el-button>
              </el-form-item>
  
  
          </el-form>
      </div>
      <!-- 添加半圆饼图 -->
      <half-doughnut :key='3' :myHalfData="myHalfData2"></half-doughnut>
      <!-- 表格 -->
      <div class="table">
              <el-table :data="tableData3.slice((currentPage-1)*pageSize,currentPage*pageSize)" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                    border  
                    height="500"
                    :row-style="{height:'30px'}"
                    :cell-style="{padding:'5px'}"
                    header-row-class-name="active_header"
                    header-cell-class-name="active_header"
                    cell-class-name="content_center"
                    style="width: 100px">          <!-- style="width: 40%"               height="215"  -->
                <template v-for="(val,key) in tableLabel3 ">
                  <!--                  You should not mix 'v-for' with 'v-if'-->
                  <!--                  条件渲染-->
                  <el-table-column  :prop="key"  :key='key'
                                    :label='typeof val === "object" ? val.label : val'
                                    :filters=filterText
                                    :filter-method="filterTag"
                                    v-if=' val.special'
                  />
                  <el-table-column  :prop="key"  :key='key'
                                    :label='typeof val === "object" ? val.label : val'

                                    v-if=' !val.special'
                  />
                </template>
                <!--插槽里面没有东西就可以用单标签  -->
                  <el-table-column
                          prop="scale"
                          label="操作">
                          <template slot-scope="scope">
                            <span class="text"  v-on:click="detail(scope.row,formInline3.start_date)">查看详情</span>
                          </template>
                      </el-table-column>
              </el-table>
            </div>

        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage"

                       :page-size="10"
                       layout="total, prev, pager, next, jumper"
                       :total="tableData3.length">
        </el-pagination>

      </el-card>
    </el-tab-pane>
  </el-tabs>
    <!-- #1弹窗：股价波动异常、高频交易 -->
    <el-dialog  :visible.sync="detailsdialog1" width="100%" @open="open()" >
            <!-- 详细信息 -->
            <el-card style=" height:100%;margin-bottom:10px ; " :body-style={padding:0} >
              <div style="display:flex;">
                <el-divider direction="vertical" class="sublabel"></el-divider>
                <span class='title'>异常统计</span>
              </div>

                <Histogram :x-data="xData" :y-data="yData" :legend="legend" :title="titleText"/>
<!--              <span style="display:block;text-indent:2em;line-height: 25px;margin: 10px;">-->
<!--                股票1在2021-01-01至2021-02-01时间段内，在2021-1-8内达到股价峰值，为26元/每股，比该公司该段时间内平均股价（9元/每股），上涨15元，涨幅188.8%。在股价过高的情况下可能会导致风险增加、股票泡沫、不良收购等多种导致经济不稳定的风险因素的增加，在2021-01-09达到交易量峰值，为231支，比该公司该段时间内平均交易量（121股），上涨110股，涨幅为90.9%。在交易量过高的情况下可能会在一定程度上可能对市场稳定性、公平竞争和投资者信心造成负面影响。-->

<!--              </span>-->

            </el-card>
          </el-dialog>
      <!-- #2弹窗：资产泡沫 -->
      <el-dialog  :visible.sync="detailsdialog2" width="100%" @open="open()" >
        <!-- 详细信息 -->
        <el-card style=" height:100%;margin-bottom:10px ; " :body-style={padding:0} >
          <div style="display:flex;">
                <el-divider direction="vertical" class="sublabel"></el-divider>
                <span class='title'>异常统计</span>
              </div>
              <div style="height:100px;margin-left: 20px;">图谱</div>
              <el-table class='detail_table'
                    :data="tableData_detail_1_2"
                    style="width: 100%"
                    :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                    border
                    :row-style="{height:'28px'}"
                    :cell-style="{padding:'0px'}"
                    header-row-class-name="active_header"
                    header-cell-class-name="active_header"
                    cell-class-name="content_center"
                    height="215" >
                    <el-table-column v-for='(val,key) in tableLabel_detail_1_2' :prop="key" :label="val"  show-overflow-tooltip :min-width="calculateColumnWidth(key,tableData_detail_1_2)">

                    </el-table-column><!--插槽里面没有东西就可以用单标签  -->


                </el-table>
                <DifferentialChart/>
<!--              <span style="display:block;text-indent:2em;line-height: 25px;margin: 10px;">-->
<!--                股票1在2021-01-01至2021-02-01时间段内，在2021-1-8内达到股价峰值，为26元/每股，比该公司该段时间内平均股价（9元/每股），上涨15元，涨幅188.8%。在股价过高的情况下可能会导致风险增加、股票泡沫、不良收购等多种导致经济不稳定的风险因素的增加，在2021-01-09达到交易量峰值，为231支，比该公司该段时间内平均交易量（121股），上涨110股，涨幅为90.9%。在交易量过高的情况下可能会在一定程度上可能对市场稳定性、公平竞争和投资者信心造成负面影响。-->

<!--              </span>-->

        </el-card>
      </el-dialog>

      <!-- #3弹窗：事件风险波及、风险事件时长、事件热度异常 -->
      <el-dialog  :visible.sync="detailsdialog3" width="100%" @open="open()" >
        <!-- 详细信息 -->
        <el-card style=" height:100%;margin-bottom:10px ; " :body-style={padding:0} >
          <div style="display:flex;">
                <el-divider direction="vertical" class="sublabel"></el-divider>
                <span class='title'>异常统计</span>
              </div>
              <div style="height:100px;margin-left: 20px;">图谱</div>
              <el-table class='detail_table'
                    :data="tableData_detail_1_3"
                    style="width: 100%"
                    :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                    border


                    :row-style="{height:'28px'}"
                    :cell-style="{padding:'0px'}"
                    header-row-class-name="active_header"
                    header-cell-class-name="active_header"
                    cell-class-name="content_center"
                    height="215" >
                    <el-table-column v-for='(val,key) in tableLabel_detail_1_3' :prop="key" :label="val"  show-overflow-tooltip :min-width="calculateColumnWidth(key,tableData_detail_1_3)">

                    </el-table-column><!--插槽里面没有东西就可以用单标签  -->
                </el-table>

                <AreaChart :key='1' :myAreaChart="myAreaChart1"></AreaChart>


<!--              <span style="display:block;text-indent:2em;line-height: 25px;margin: 10px;">-->
<!--                股票1在2021-01-01至2021-02-01时间段内，在2021-1-8内达到股价峰值，为26元/每股，比该公司该段时间内平均股价（9元/每股），上涨15元，涨幅188.8%。在股价过高的情况下可能会导致风险增加、股票泡沫、不良收购等多种导致经济不稳定的风险因素的增加，在2021-01-09达到交易量峰值，为231支，比该公司该段时间内平均交易量（121股），上涨110股，涨幅为90.9%。在交易量过高的情况下可能会在一定程度上可能对市场稳定性、公平竞争和投资者信心造成负面影响。-->

<!--              </span>-->

        </el-card>
      </el-dialog>
  </div>
</template>

<script>
import HalfDoughnut from "../components/echarts/HalfDoughnut.vue";
import DifferentialChart from "@/components/echarts/DifferentialChart.vue";
import Histogram from "@/components/echarts/Histogram.vue";
import AreaChart from "@/components/echarts/AreaChart.vue";
import http from "@/utils/request";
import {Loading} from "element-ui";


export default {
  name:'abnormal_detection',

  components:{
    HalfDoughnut,
    DifferentialChart,
    Histogram,
    AreaChart,

  },
  data () {
      return {
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 10, // 每页的数据条数
        filterText:[],
        titleText:'',
        legend:'',
        xData:[],
        yData:[],
        //记录当前所选的市场
        selectedIndustry:'',
// 期货
        futureOption:[{'value': 'NIZL.SHF', 'label': '沪镍'}, {'value': 'RRZL.DCE', 'label': '粳米'}, {'value': 'LHZL.DCE', 'label': '生猪'}, {'value': 'CSZL.DCE', 'label': '玉米淀粉'}, {'value': 'RBZL.SHF', 'label': '螺纹钢'}, {'value': 'APZL.CZC', 'label': '苹果'}, {'value': 'CFZL.CZC', 'label': '棉花'}, {'value': 'BZL.DCE', 'label': '豆二'}, {'value': 'URZL.CZC', 'label': '尿素'}, {'value': 'AUZL.SHF', 'label': '沪金'}, {'value': 'BCZL.SHF', 'label': '国际铜'}, {'value': 'PBZL.SHF', 'label': '沪铅'}, {'value': 'AZL.DCE', 'label': '豆一'}, {'value': 'SPZL.SHF', 'label': '纸浆'}, {'value': 'LZL.DCE', 'label': '塑料'}, {'value': 'SFZL.CZC', 'label': '硅铁'}, {'value': 'BUZL.SHF', 'label': '沥青'}, {'value': 'TAZL.CZC', 'label': 'PTA'}, {'value': 'HCZL.SHF', 'label': '热卷'}, {'value': 'SRZL.CZC', 'label': '白糖'}, {'value': 'CJZL.CZC', 'label': '红枣'}, {'value': 'SAZL.CZC', 'label': '纯碱'}, {'value': 'WRZL.SHF', 'label': '线材'}, {'value': 'CZL.DCE', 'label': '玉米'}, {'value': 'ZNZL.SHF', 'label': '沪锌'}, {'value': 'EBZL.DCE', 'label': '苯乙烯'}, {'value': 'RSZL.CZC', 'label': '菜籽'}, {'value': 'FBZL.DCE', 'label': '纤维板'}, {'value': 'MAZL.CZC', 'label': '甲醇'}, {'value': 'PPZL.DCE', 'label': '聚丙烯'}, {'value': 'IZL.DCE', 'label': '铁矿石'}, {'value': 'PZL.DCE', 'label': '棕榈油'}, {'value': 'FGZL.CZC', 'label': '玻璃'}, {'value': 'RUZL.SHF', 'label': '橡胶'}, {'value': 'AGZL.SHF', 'label': '沪银'}, {'value': 'SNZL.SHF', 'label': '沪锡'}, {'value': 'FUZL.SHF', 'label': '燃油'}, {'value': 'PGZL.DCE', 'label': 'LPG'}, {'value': 'PFZL.CZC', 'label': '短纤'}, {'value': 'SCZL.SHF', 'label': '原油'}, {'value': 'EGZL.DCE', 'label': '乙二醇'}, {'value': 'JMZL.DCE', 'label': '焦煤'}, {'value': 'MZL.DCE', 'label': '豆粕'}, {'value': 'NRZL.SHF', 'label': '20号胶'}, {'value': 'VZL.DCE', 'label': 'PVC'}, {'value': 'YZL.DCE', 'label': '豆油'}, {'value': 'JDZL.DCE', 'label': '鸡蛋'}, {'value': 'AOZL.SHF', 'label': '氧化铝'}, {'value': 'SSZL.SHF', 'label': '不锈钢'}, {'value': 'RMZL.CZC', 'label': '菜粕'}, {'value': 'CYZL.CZC', 'label': '棉纱'}, {'value': 'LUZL.SHF', 'label': '低硫燃油'}, {'value': 'OIZL.CZC', 'label': '菜油'}, {'value': 'JZL.DCE', 'label': '焦炭'}, {'value': 'ALZL.SHF', 'label': '沪铝'}, {'value': 'CUZL.SHF', 'label': '沪铜'}, {'value': 'SMZL.CZC', 'label': '锰硅'}, {'value': 'PKZL.CZC', 'label': '花生'}],
        // 判断是否弹窗打开
  // 判断是否弹窗打开
      detailsdialog1:false,
      detailsdialog2:false,
      detailsdialog3:false,
      // detailsdialog4:false,

  // 【图表数据】
  //半圆图
      myHalfData1: [
            // { value: 300, name: "股价波动异常" },
            // { value: 350, name: "高频交易" },
            // { value: 200, name: "资产泡沫" },
            // { value: 120, name: "事件风险波及" },
            // { value: 110, name: "风险事件时长" },
            // { value: 280, name: "事件热度异常" },
            // {
            //   // make an record to fill the bottom 50%
            //   value: 300+350+200+120+110+280,
            //   itemStyle: {
            //     color: "none",
            //   },
            // },
          ],
        myHalfData3:[],
        myHalfData2:[
            // { value: 300, name: "股价波动异常" },
            // { value: 350, name: "高频交易" },
            // { value: 200, name: "资产泡沫" },
            // {
            //   // make an record to fill the bottom 50%
            //   value: 300+350+200,
            //   itemStyle: {
            //     // stop the chart from rendering this piece
            //     color: "none",
            //   },
            // },
          ],
  // 面积图
      myAreaChart1:[],



  // 【整合接收数据】
      formInline1: {
          industry:'',
          start_date:'',
          end_date:'',
      },
      formInline2: {
          industry:'',
          start_date:'',
          end_date:'',
      },
      formInline3: {
          industry:'',
          start_date:'',
          end_date:'',
      },
  // 【表格】
      tableData1: [
          { 
              异常关联类型: '股价波动异常',
              涉及股票: '股票1',
              },
          { 
              异常关联类型: '高频交易',
              涉及股票: '股票1',
          },
          { 
              异常关联类型: '资产泡沫',
              涉及股票: '股票1',
          },
            
          ],
      tableData2: [
          { 
              异常关联类型: '股价波动异常',
              涉及股票: '债券1',
              },
          { 
              异常关联类型: '高频交易',
              涉及股票: '债券2',
          },
          { 
              异常关联类型: '资产泡沫',
              涉及股票: '债券3',
          },
            
          ],
      tableData3: [
          { 
              异常关联类型: '股价波动异常',
              涉及商品: '玉米',
              },
          { 
              异常关联类型: '高频交易',
              涉及商品: '大豆',
          },
          { 
              异常关联类型: '资产泡沫',
              涉及商品: '棕榈油',
          },
            
          ],
      tableLabel1: {
          编码: '编号',
        异常关联类型: {label:'异常关联类型' ,
          special:true
        },
          名称: '涉及股票',
          监测时间: '监测时间',
          股票价格: '股票价格',
          交易数量: '交易数量',
          风险等级: '风险等级',

      },
      tableLabel2: {
        编码: '编号',
        异常关联类型: {label:'异常关联类型' ,
          special:true
        },
        名称: '涉及主体',
          监测时间: '监测时间',
          股票价格: '债券价格',
          交易数量: '交易数量',
          风险等级: '风险等级',


      },
      tableLabel3: {
        编码: '编号',
          异常关联类型: {label:'异常关联类型' ,
            special:true
  },
          涉及商品: '涉及商品',
          合约名称: '合约名称',
          监测时间: '监测时间',
          股票价格: '股票价格',
          交易数量: '交易数量',
          风险等级: '风险等级',

      },
      tableLabel_detail_1_1:
      {
        编号: '编号',
        异常主体:'异常主体',
        关联对象:'关联对象',
        异常关联类型:'异常关联类型',
        关联相似度:'关联相似度',
        涉及事件详情:'涉及事件详情',
        高影响力主体分析:'高影响力主体分析',
        风险等级:'风险等级',
      },
      tableData_detail_1_1:[
      {
        编号: '',
        异常主体:'股票1',
        关联对象:'股票2',
        异常关联类型:'高频交易',
        关联相似度:'关联相似度',
        涉及事件详情:'事件分析',
        高影响力主体分析:'高影响力主体分析',
        风险等级:'',
      },

      ],
      tableLabel_detail_1_2:
      {
        编号: '编号',
        异常主体:'异常主体',
        关联对象:'关联对象',
        异常关联类型:'异常关联类型',
        关联相似度:'关联相似度',
        涉及事件详情:'涉及事件详情',
        高影响力主体分析:'高影响力主体分析',
        风险等级:'风险等级',
      },
      tableData_detail_1_2:[
      {
        编号: '',
        异常主体:'股票1',
        关联对象:'股票2',
        异常关联类型:'高频交易',
        关联相似度:'关联相似度',
        涉及事件详情:'事件分析',
        高影响力主体分析:'高影响力主体分析',
        风险等级:'',
      },

      ],
      tableLabel_detail_1_3:
      {
        编号: '编号',
        异常主体:'异常主体',
        关联对象:'关联对象',
        异常关联类型:'异常关联类型',
        关联相似度:'关联相似度',
        涉及事件详情:'涉及事件详情',
        高影响力主体分析:'高影响力主体分析',
        风险等级:'风险等级',
      },
      tableData_detail_1_3:[
      {
        编号: '',
        异常主体:'股票1',
        关联对象:'股票2',
        异常关联类型:'高频交易',
        关联相似度:'关联相似度',
        涉及事件详情:'事件分析',
        高影响力主体分析:'高影响力主体分析',
        风险等级:'',
      },

      ],
  }
    },
    mounted(){
    },
    methods:{

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },



      filterTag(value, row) {
        return row.异常关联类型 === value;
      },

      onSubmit1(){
        // console.log(this.formInline1.start_date,this.formInline1.end_date)
        console.log()
        if (String(this.formInline1.start_date)===String(this.formInline1.end_date)){
          this.$message({
            showClose: true,
            message: '请重新选择时间',
            type: 'warning'
          });

        }
        else {
          let options={
            text:'请稍等'
          }
          let loadingInstance = Loading.service(options);
          this.selectedIndustry = 'stock'
          if (this.myHalfData1.length !== 0)
            this.myHalfData1.length = 0
          this.currentPage=1
          http.get('/anomaly/all_anomaly/', {
            params: {
              sc: 'stock',
              indus: this.formInline1.industry,
              sdate: this.formInline1.start_date,
              edate: this.formInline1.end_date
            }
          }).then((res) => {
            // console.log(res.data.date)
            // this.$notify.info({
            //   title: '提示',
            //   message: '仅显示部分结果'
            // });
            let total = 0
            for (let i in res.data.date) {
              if (res.data.date[i]!==0){
                total += Number(res.data.date[i])

                this.myHalfData1.push({value: Number(res.data.date[i]), name: i})
              }
            }
            if (total!==0){
              this.myHalfData1.push({
                value: total,
                itemStyle: {
                  color: "none",
                }
              })

            }


          })
          http.get('/anomaly/item_anomaly/', {
            params: {
              sc: 'stock',
              indus: this.formInline1.industry,
              sdate: this.formInline1.start_date,
              edate: this.formInline1.end_date
            }
          }).then((res) => {
            this.filterText=[]
            this.tableData1 = res.data.data
            const unique =  Array.from(new Set(this.tableData1.map(item => item.异常关联类型)));
            console.log(unique)
            for (let i in unique)
            {
             let  tmp={ text: unique[i], value: unique[i] }
            if ( !this.filterText.some(item => JSON.stringify(item) === JSON.stringify(tmp)))
              this.filterText.push(tmp)
            }
            console.log(this.filterText)

          })
          loadingInstance.close()
        }

      },
      onSubmit2(){
        if (String(this.formInline2.start_date)===String(this.formInline2.end_date)){
          this.$message({
            showClose: true,
            message: '请重新选择时间',
            type: 'warning'
          });
        }
        else {
          let options={
            text:'请稍等'
          }
          this.currentPage=1
          let loadingInstance = Loading.service(options);
          this.selectedIndustry = 'bond'
          if (this.myHalfData3.length !== 0)
            this.myHalfData3.length = 0
          http.get('/anomaly/all_anomaly/', {
            params: {
              sc: 'bond',
              indus: this.formInline2.industry,
              sdate: this.formInline2.start_date,
              edate: this.formInline2.end_date
            }
          }).then((res) => {
            // this.$notify.info({
            //   title: '提示',
            //   message: '仅显示部分结果'
            // });
            console.log(res.data.date)
            let total = 0
            for (let i in res.data.date) {
              if (res.data.date[i]!==0){
                total += Number(res.data.date[i])
                this.myHalfData3.push({value: Number(res.data.date[i]), name: i})
              }
            }

            if (total!==0){
              this.myHalfData3.push({
                value: total,
                itemStyle: {
                  color: "none",
                }
              })

            }

            http.get('/anomaly/item_anomaly/', {
              params: {
                sc: 'bond',
                indus: this.formInline2.industry,
                sdate: this.formInline2.start_date,
                edate: this.formInline2.end_date
              }
            }).then((res) => {
              this.filterText=[]
              this.tableData2 = res.data.data
              const unique =  Array.from(new Set(this.tableData2.map(item => item.异常关联类型)));
              console.log(unique)
              for (let i in unique)
              {
                let  tmp={ text: unique[i], value: unique[i] }
                if ( !this.filterText.some(item => JSON.stringify(item) === JSON.stringify(tmp)))
                  this.filterText.push(tmp)
              }
            })
          })
          loadingInstance.close()
        }
      },
      onSubmit3(){
        if (String(this.formInline3.start_date)===String(this.formInline3.end_date)){
          this.$message({
            showClose: true,
            message: '请重新选择时间',
            type: 'warning'
          });
        }
        else {
          this.currentPage=1
          let options={
            text:'请稍等'
          }
          let loadingInstance = Loading.service(options);
          this.selectedIndustry = 'future'
          if (this.myHalfData2.length !== 0)
            this.myHalfData2.length = 0
          http.get('/anomaly/all_anomaly/', {
            params: {
              sc: 'future',
              indus: this.formInline3.industry,
              sdate: this.formInline3.start_date,
              edate: this.formInline3.end_date
            }
          }).then((res) => {
            // this.$notify.info({
            //   title: '提示',
            //   message: '仅显示部分结果'
            // });
            console.log(res.data.date)
            let total = 0
            for (let i in res.data.date) {
              if (res.data.date[i]!==0){
                total += Number(res.data.date[i])
                this.myHalfData2.push({value: Number(res.data.date[i]), name: i})
              }
            }
            if (total!==0){

              this.myHalfData2.push({
                value: total,
                itemStyle: {
                  color: "none",
                }
              })
            }

            http.get('/anomaly/item_anomaly/', {
              params: {
                sc: 'future',
                indus: this.formInline3.industry,
                sdate: this.formInline3.start_date,
                edate: this.formInline3.end_date
              }
            }).then((res) => {
              this.filterText=[]
              this.tableData3 = res.data.data
              const unique =  Array.from(new Set(this.tableData3.map(item => item.异常关联类型)));
              console.log(unique)
              for (let i in unique)
              {
                let  tmp={ text: unique[i], value: unique[i] }
                if ( !this.filterText.some(item => JSON.stringify(item) === JSON.stringify(tmp)))
                  this.filterText.push(tmp)
              }
            })
          })
          loadingInstance.close()
        }
      },
      // 调整表格列宽
      calculateColumnWidth(prop,data) {
          const text = String(data[0][prop]); // 使用第一行的数据作为示例
          const calculatedWidth = text.length;
          // console.log('console.log(calculatedWidth):',calculatedWidth)
          if(calculatedWidth>10 && calculatedWidth<=50){
            const baseWidth= 20 + calculatedWidth * 0.5
            return `${baseWidth}px`;
          }
          if(calculatedWidth<=10){
            const baseWidth= 15
            return `${baseWidth}px`;
          }
          else{
            const baseWidth= 20 + calculatedWidth * 0.5
            return `${baseWidth}px`;
          }
    },
      //股
      testDeatil(row){
        let that=this
        if(row.异常关联类型==='价格波动异常'||row.异常关联类型==='高频交易异常' ||row.异常关联类型==='资产泡沫异常') {
          this.detailsdialog1 = true//打开弹窗
          http.get('/anomaly/sc_anomaly/', {
            params: {
              date: this.formInline1.start_date,
              sc: that.selectedIndustry,
              id: row.名称,
              type: row.异常关联类型
            }
          }).then((res) => {
            let name=res.data.name!==''?res.data.name:row.名称
            let y = []
            let x = []
            if (row.异常关联类型 === '价格波动异常')
              for (let i in res.data.data) {

                y.push(res.data.data[i].价格波动异常值)
                x.push(res.data.data[i].监测时间)
                this.legend = '价格波动'
                this.titleText = name+'价格波动情况'
              }
            if (row.异常关联类型 === '高频交易异常')
              for (let i in res.data.data) {
                y.push(res.data.data[i].高频交易值)
                x.push(res.data.data[i].监测时间)
                this.legend = '交易量波动'
                this.titleText = name+'交易量变化情况'
              }
            if (row.异常关联类型 === '资产泡沫异常')
              for (let i in res.data.data) {
                y.push(res.data.data[i].资产泡沫值)
                x.push(res.data.data[i].监测时间)
                this.legend = '资产泡沫值'
                this.titleText = name+'资产泡沫'
              }

            this.xData = x.reverse()
            this.yData = y.reverse()
            // this.lineData['yData']=y
            // console.log(this.lineData)
          })
          http.get('/anomaly/anomaly_event/', {
            params: {
              time: this.formInline1.start_date,
              market: that.selectedIndustry,
              subject: row.名称,
              type: row.异常关联类型
            }
          }).then((res) => {
            console.log(res.data)
          })
        }



        if (row.异常关联类型==='资产泡沫') {
          this.detailsdialog2 = true//打开弹窗
        }
        if (row.异常关联类型==='事件风险波及'||row.异常关联类型==='风险事件时长'||row.异常关联类型==='事件热度异常') {
          this.detailsdialog3 = true//打开弹窗
        }
        // console.log(row)
        // http.get('/anomaly/anomaly_relevant_analyse/', {
        //   params: {
        //     subject: row.名称,
        //     time: row.监测时间,
        //     market: this.selectedIndustry,
        //     type: row.异常关联类型
        //   }
        // }).then((res) => {
        //   console.log(res.data)
        // })
      },
      detail(row,date) {

        let that = this
        if (this.selectedIndustry !== 'future') {
          if (row.异常关联类型 === '价格波动异常' || row.异常关联类型 === '高频交易异常' || row.异常关联类型 === '资产泡沫异常') {
            this.detailsdialog1 = true//打开弹窗
            http.get('/anomaly/sc_anomaly/', {
              params: {
                date: date,
                sc: that.selectedIndustry,
                id: row.名称,
                type: row.异常关联类型
              }
            }).then((res) => {
              let name=res.data.name!==''?res.data.name:row.名称
              console.log(name)
              let y = []
              let x = []
              if (row.异常关联类型 === '价格波动异常')
                for (let i in res.data.data) {
                  y.push(res.data.data[i].价格波动异常值)
                  x.push(res.data.data[i].监测时间)
                  this.legend = '价格波动'
                  this.titleText = name+'价格波动情况'
                }
              if (row.异常关联类型 === '高频交易异常')
                for (let i in res.data.data) {
                  y.push(res.data.data[i].高频交易值)
                  x.push(res.data.data[i].监测时间)
                  this.legend = '交易量波动'
                  this.titleText = name+'交易量变化情况'
                }
              if (row.异常关联类型 === '资产泡沫异常')
                for (let i in res.data.data) {
                  y.push(res.data.data[i].资产泡沫值)
                  x.push(res.data.data[i].监测时间)
                  this.legend = '资产泡沫值'
                  this.titleText = name+'资产泡沫'
                }
              this.xData = x.reverse()
              this.yData = y.reverse()
              // this.lineData['yData']=y
              // console.log(this.lineData)
            })
          }
          if (row.异常关联类型 === '资产泡沫') {
            this.detailsdialog2 = true//打开弹窗

          }
          if (row.异常关联类型 === '事件风险波及' || row.异常关联类型 === '风险事件时长' || row.异常关联类型 === '事件热度异常') {
            this.detailsdialog3 = true//打开弹窗

          }
        } else {
          if (row.异常关联类型 === '价格波动异常' || row.异常关联类型 === '高频交易异常') {
            this.detailsdialog1 = true//打开弹窗
            http.get('/anomaly/sc_anomaly/', {
              params: {
                sc: 'future',
                date: date,
                id: row.合约名称,
                type: row.异常关联类型
              }
            }).then((res) => {
              let y = []
              let x = []
              if (row.异常关联类型 === '价格波动异常')
                for (let i in res.data.data) {
                  y.push(res.data.data[i].价格波动异常值)
                  x.push(res.data.data[i].监测时间)
                }
              this.legend = '价格波动率'
              if (row.异常关联类型 === '高频交易异常')
                for (let i in res.data.data) {
                  y.push(res.data.data[i].高频交易值)
                  x.push(res.data.data[i].监测时间)
                }
              this.legend = '交易量波动'
              this.xData = x.reverse()
              this.yData = y.reverse()
            })
          }
          if (row.异常关联类型 === '资产泡沫') {
            this.detailsdialog2 = true//打开弹窗

          }
          if (row.异常关联类型 === '事件风险波及' || row.异常关联类型 === '风险事件时长' || row.异常关联类型 === '事件热度异常') {
            this.detailsdialog3 = true//打开弹窗

          }
        }
        //关联实体
        // http.get('/anomaly/anomaly_relevant_analyse/', {
        //   params: {
        //     subject: row.合约名称,
        //     monitoring_time: row.监测时间,
        //     market: this.selectedIndustry,
        //     type: row.异常关联类型
        //   }
        // }).then((res) => {
        //   console.log(res.data)
        // })
      },

    // 打开弹窗图像
      open(){
              // this.$nextTick(() => {
              // //  执行echarts方法
              //   this.initEcharts()
              // })
      },


    },
  }
</script>

<style lang='less' scoped>
.form{//产品搜索栏
    
    display:flex;
    justify-content:space-between;//左右贴边
    margin-top:10px; 
    // height: 40px;
    padding-left: 20px;
  
   }
   .grayish_btn{//浅灰色按钮
    color: #fff;//文字颜色
    background-color: #aaaaaa;//背景颜色
  }
   // 调整表头间隔、设置表头下方边框颜色
  .table{
    padding: 0px 20px 2px 20px;//返回表格添加间隙 上 右
    // font-size: 12px;
    // color: #606266;

    // 调整表头间隔、设置表头下方边框颜色
    .text{
      color:rgba(2, 167, 240, 0.729411764705882);
    }

}
.detail_table{
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 0px;
/deep/ .el-table {
  width: 98.5% !important;
}
}
 // 右侧空只能这样调整，左侧必须用margin
 /deep/ .el-table {
    width: 97.5% !important;
    // margin-right: 10px;
  }

  // 调整表头间隔、设置表头下方边框颜色
  /deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  // border-bottom: 1px solid #333333 !important;
  padding: 1px 1px 1px 1px;
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
.sublabel{ // 小标签标识
    // font-size: 13px;
    // padding:2px;
    margin-top:10px;
    background-color: rgba(2, 167, 240, 0.5);
    width: 5px;
    height: 35px;
}
.title{
    padding-left: 4px;
    margin-top:15px;
    font-weight: bold;//字体加粗
    display:flex;
    justify-content:flex-start
}


</style>
