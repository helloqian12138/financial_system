<!-- 系统风险分析，原市场分析拆分、新增、11.6合并-->
<template>
    <div>
      <!-- 图谱，之前的在risk -->
      <div class="one">
        <!-- 卡片化的标签页 -->
        <el-tabs type="border-card">
          <!-- 【1】股市 -->
          <el-tab-pane label="股市">
            <el-card style='height: 420px;margin-bottom:10px;' :body-style={padding:0}>
            <!-- height:400px -->
            <!-- 1、上标 -->
            <span class="superscript" style="width: 20px; height: 40px;">股票市场系统性风险分析</span>
            <!-- 2、产品搜索栏 -->

            <div class="form">
                                                                <!-- inline="true"表单域在一行 -->
                <el-form :inline="true"  class="demo-form-inline" :model="formInline1" ref="formInline1">

                    <el-form-item label="开始时间" prop="开始时间">
                      <el-date-picker
                          v-model="formInline1.start_date"
                          type="date"
                          placeholder="年/月/日"
                          size="mini"
                          >
                      </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束时间" prop="结束时间">
                    <el-date-picker
                        v-model="formInline1.end_date"
                        type="date"
                        placeholder="年/月/日"
                        size="mini"
                        >
                    </el-date-picker>
                </el-form-item>
                    <el-form-item>
                    <el-button class="grayish_btn" @click="onSubmit1" size="mini" >查询</el-button>
                    </el-form-item>


                </el-form>
            </div>
            <!-- 添加折线图 -->
            <DynamicLine/>
            <!-- <half-doughnut :key='1' :myHalfData="myHalfData1"></half-doughnut> -->
            </el-card>
            <MarketRisk/>
          </el-tab-pane>

        <!-- 【2】债市 -->
        <el-tab-pane label="债市">
          <el-card style='height: 420px;margin-bottom: 10px;' :body-style={padding:0}>
            <!-- height:400px -->
            <!-- 1、上标 -->
            <span class="superscript" style="width: 20px; height: 40px;">债市异常检测</span>
            <!-- 2、产品搜索栏 -->

            <div class="form">
                                                                <!-- inline="true"表单域在一行 -->
                <el-form :inline="true"  class="demo-form-inline" :model="formInline2" ref="formInline2">
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
            <!-- 添加折线图 -->
          <DynamicLine/>
            <!-- <half-doughnut :key='1' :myHalfData="myHalfData1"></half-doughnut> -->
          </el-card>
          <MarketRisk/>
        </el-tab-pane>

          <!-- 【3】期货 -->
          <el-tab-pane label="期货">
            <el-card style='height: 800px;margin-bottom: 10px;' :body-style={padding:0}>
            <!-- height:400px -->
            <!-- 1、上标 -->
            <span class="superscript" style="width: 20px; height: 40px;">期货市场分析</span>
              <!-- 添加关系图谱 -->
              <el-row :gutter="20">
                <el-col :span="18">
                  <div style="margin:20px">
                    <!-- 图谱待定 -->
                    <QiPao></QiPao>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div style="margin-right: 10px;">
                      <!-- 表 -->
                      <el-table class='table' :data="tableData1"

                          :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)',marginright:'20px'}"
                          header-row-class-name="active_header"
                          header-cell-class-name="active_header"
                          cell-class-name="content_center"

                          :row-style="{height:'28px',marginright:'20px'}"
                          :cell-style="{padding:'0px',marginright:'20px'}"
                          style="margin-right:20px;">
                        <!-- border -->
                          <el-table-column
                              prop="value_label"
                              label="行情风险评估"
                              width='200px'>
                          </el-table-column>
                          <el-table-column
                              prop="value"
                              label="评估值"
                              width='100px'
                              >
                          </el-table-column>

                      </el-table>
                  </div>
                </el-col>
              </el-row>
            </el-card>
            <MarketRisk/>
          </el-tab-pane>
        </el-tabs>

      </div>


    </div>
  </template>
  
  <script>
import MarketRisk from "/src/views/MarketRisk.vue";
import DynamicLine from "@/components/echarts/DynamicLine.vue";
import QiPao from "@/components/QiPao";
  export default {
    name:'systemRisk',
    components:{
    MarketRisk,
    DynamicLine,
      QiPao,

},
    data () {
      return {
  // 【整合接收数据】
          formInline1: {
          market:'',
          industry:'',
          start_date:'',
          end_date:'',
      },
      formInline2: {
          market:'',
          industry:'',
          start_date:'',
          end_date:'',
      },
  // 【表格】
      tableData1: [
  {
      value_label:'沪银主连',
      value:0.25
  },
  {
      value_label:'沪铝主连',
      value:0.18
  },
  {
      value_label:'氧化铝主连',
      value:0.17
  },
  {
      value_label:'苹果主连',
      value:0.17
  },
  {
      value_label:'沪金主连',
      value:0.14
  },
  {
      value_label:'国际铜主连',
      value:0.14
  },
  {
      value_label:'合成橡胶主连',
      value:0.14
  },
  {
      value_label:'综合评估',
      value:"良好"
  },
  ],
      tableData2: [
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
      tableLabel: {
          编号: '编号',
          异常关联类型: '异常关联类型',
          涉及股票: '涉及股票',
          监测时间: '监测时间',
          股票价格: '股票价格',
          交易数量: '交易数量',
          风险等级: '风险等级',
      },
  }
    },
    mounted(){

    },
    methods:{

      onSubmit1(){},
      onSubmit2(){},
      detail(row){}
    },
  }
  </script>
  
  <style lang="less" scoped>
  /deep/ .form{//产品搜索栏
    
    display:flex;
    justify-content:space-between;//左右贴边
    margin-top:10px; 
    // height: 40px;
    margin-left: 20px;
    margin-bottom: 0px !important;
    padding-bottom: 0px !important;

  
   }
   .grayish_btn{//浅灰色按钮
    color: #fff;//文字颜色
    background-color: #aaaaaa;//背景颜色
  }
   // 调整表头间隔、设置表头下方边框颜色
   .table{
  // 和选项框隔开
  // margin:10px;
  // font-size: 12px;
  padding: 0px 5px 2px 5px;//返回表格添加间隙 上 右


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
}
  </style>
  