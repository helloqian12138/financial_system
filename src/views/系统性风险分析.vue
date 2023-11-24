<!-- 系统风险分析，原市场分析拆分、新增、11.6合并-->
<template>
    <div>
      <!-- 图谱，之前的在risk -->
      <div class="one">
          <el-card style='height: 550px;margin-bottom: 10px;' :body-style={padding:0}> 
         <!-- height:400px -->
         <!-- 1、上标 -->
          <span class="superscript" style="width: 20px; height: 40px;">系统风险分析</span>
          <!-- 2、产品搜索栏 -->
  
          <div class="form">
                                                           <!-- inline="true"表单域在一行 -->
              <el-form :inline="true"  class="demo-form-inline" :model="formInline1" ref="formInline1">
                <el-form-item label="市场" prop="市场">
                  <el-select size="mini" v-model="formInline1.market">
                    <el-option label="股票" value="股票"></el-option>
                    <el-option label="基金" value="基金"></el-option>
                  </el-select>
                </el-form-item>
  
                <el-form-item label="行业" prop="行业">
                  <el-select  size="mini" v-model="formInline1.industry">
                    <el-option label="行业1" value="行业1"></el-option>
                    <el-option label="行业2" value="行业2"></el-option>
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
                  <el-button class="grayish_btn" @click="onSubmit2" size="mini">查询</el-button>
                </el-form-item>
  
            </el-form>
          </div>
          
          <el-row :gutter="20">
          <el-col :span="18">
    
              图谱待定
  
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
      
        </div>

        <MarketRisk/>
    </div>
  </template>
  
  <script>
  import MarketRisk from "/src/views/MarketRisk.vue";

  export default {
    components:{
      MarketRisk,
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
      value_label:'采矿业',
      value:0.25
  },
  {
      value_label:'文化、体育和娱乐业',
      value:0.18
  },
  {
      value_label:'制造业',
      value:0.17
  },
  {
      value_label:'租赁和商务服务业',
      value:0.17
  },
  {
      value_label:'交通运输、仓储和邮政业',
      value:0.14
  },
  {
      value_label:'软件和信息技术服务业',
      value:0.14
  },
  {
      value_label:'环境和公共设施管理业',
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
        text-align: center !important;
        // height: 1px;
      }
      /deep/ .content_center{//表的内容
        text-align: center !important;
      }
    
  </style>
  