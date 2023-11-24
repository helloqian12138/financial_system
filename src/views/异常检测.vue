<!-- 预警服务-异常检测 -->
<template>
    <div>
    <!-- 卡片化的标签页 -->
    <el-tabs type="border-card">
    <!-- 【1】股市 -->
    <el-tab-pane label="股市">
      <el-card style='height: 800px;margin-bottom: 10px;' :body-style={padding:0}> 
      <!-- height:400px -->
      <!-- 1、上标 -->
      <span class="superscript" style="width: 20px; height: 40px;">股票异常检测</span>
      <!-- 2、产品搜索栏 -->
  
      <div class="form">
                                                          <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  class="demo-form-inline" :model="formInline1" ref="formInline2">
  
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
              <el-button class="grayish_btn" @click="onSubmit1" size="mini">查询</el-button>
              </el-form-item>
  
  
          </el-form>
      </div>
      <!-- 添加半圆饼图 -->
      <half-doughnut/>
      <!-- 表格 -->
      <div class="table">
              <el-table :data="tableData1" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
                    border  
                    height="250" 
                    :row-style="{height:'30px'}"
                    :cell-style="{padding:'5px'}"
                    header-row-class-name="active_header"
                    header-cell-class-name="active_header"
                    cell-class-name="content_center"
                    style="width: 100px,">          <!-- style="width: 40%"               height="215"  -->
                  <el-table-column v-for='(val,key) in tableLabel1' :prop="key" :label="val" /><!--插槽里面没有东西就可以用单标签  -->
                  <el-table-column
                          prop="scale"
                          label="操作">
                          <template slot-scope="scope">
                            <span class="text"  v-on:click="detail(scope.row)">查看详情</span>
                          </template>
                      </el-table-column>
              </el-table>
            </div>
  
  
      </el-card>
    </el-tab-pane>
    <!-- 【2】债市 -->
    <el-tab-pane label="债市">
      <el-card style='height: 800px;margin-bottom: 10px;' :body-style={padding:0}> 
      <!-- height:400px -->
      <!-- 1、上标 -->
      <span class="superscript" style="width: 20px; height: 40px;">债市异常检测</span>
      <!-- 2、产品搜索栏 -->
  
      <div class="form">
                                                          <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  class="demo-form-inline" :model="formInline2" ref="formInline2">
              <el-form-item label="行业" prop="行业">
              <el-select  size="mini" v-model="formInline2.industry">
                  <el-option label="行业1" value="行业1"></el-option>
                  <el-option label="行业2" value="行业2"></el-option>
              </el-select>
              </el-form-item>
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
      <half-doughnut/>
      <!-- 表格 -->
      <div class="table">
              <el-table :data="tableData2" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
                    border  
                    height="250" 
                    :row-style="{height:'30px'}"
                    :cell-style="{padding:'5px'}"
                    header-row-class-name="active_header"
                    header-cell-class-name="active_header"
                    cell-class-name="content_center"
                    style="width: 100px,">          <!-- style="width: 40%"               height="215"  -->
                  <el-table-column v-for='(val,key) in tableLabel2' :prop="key" :label="val" /><!--插槽里面没有东西就可以用单标签  -->
                  <el-table-column
                          prop="scale"
                          label="操作">
                          <template slot-scope="scope">
                            <span class="text"  v-on:click="detail(scope.row)">查看详情</span>
                          </template>
                      </el-table-column>
              </el-table>
            </div>
      
      
  
  
      </el-card>
    </el-tab-pane>
    <!-- 【3】期货 -->
    <el-tab-pane label="期货">
      <el-card style='height: 800px;margin-bottom: 10px;' :body-style={padding:0}> 
      <!-- height:400px -->
      <!-- 1、上标 -->
      <span class="superscript" style="width: 20px; height: 40px;">合约交易异常</span>
      <!-- 2、产品搜索栏 -->
  
      <div class="form">
                                                          <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  class="demo-form-inline" :model="formInline3" ref="formInline3">
              <el-form-item label="商品种类" prop="商品种类">
              <el-select  size="mini" v-model="formInline3.industry">
                  <el-option label="商品1" value="商品1"></el-option>
                  <el-option label="商品2" value="商品2"></el-option>
              </el-select>
              </el-form-item>
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
      <half-doughnut/>
      <!-- 表格 -->
      <div class="table">
              <el-table :data="tableData3" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
                    border  
                    height="250" 
                    :row-style="{height:'30px'}"
                    :cell-style="{padding:'5px'}"
                    header-row-class-name="active_header"
                    header-cell-class-name="active_header"
                    cell-class-name="content_center"
                    style="width: 100px,">          <!-- style="width: 40%"               height="215"  -->
                  <el-table-column v-for='(val,key) in tableLabel3' :prop="key" :label="val" /><!--插槽里面没有东西就可以用单标签  -->
                  <el-table-column
                          prop="scale"
                          label="操作">
                          <template slot-scope="scope">
                            <span class="text"  v-on:click="detail(scope.row)">查看详情</span>
                          </template>
                      </el-table-column>
              </el-table>
            </div>
      
      
  
  
      </el-card>

    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import HalfDoughnut from "../components/echarts/HalfDoughnut.vue";
  
export default {
  components:{
    HalfDoughnut
  },
  data () {
      return {
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
          编号: '编号',
          异常关联类型: '异常关联类型',
          涉及股票: '涉及股票',
          监测时间: '监测时间',
          股票价格: '股票价格',
          交易数量: '交易数量',
          风险等级: '风险等级',
      },
      tableLabel2: {
          编号: '编号',
          异常关联类型: '异常关联类型',
          涉及主体: '涉及主体',
          监测时间: '监测时间',
          股票价格: '股票价格',
          交易数量: '交易数量',
          风险等级: '风险等级',
      },
      tableLabel3: {
          编号: '编号',
          异常关联类型: '异常关联类型',
          涉及商品: '涉及商品',
          合约名称: '合约名称',
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
    /deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
      border-bottom: 1px solid rgba(224, 223, 223, 0.771) !important;
      padding: 0px 0; 
      min-width: 0;
    }
    .el-table .el-table__cell {
      padding: 12px 0; 
      min-width: 0;
    } 
    /deep/ .active_header{//表头
      color: #333333;
      font-size: 15px;
      text-align: center !important;
      // height: 1px;
    }
    /deep/ .content_center{//表的内容
      text-align: center !important;
      // font-size: 10px;
    }
    .text{
      color:rgba(2, 167, 240, 0.729411764705882);
    }

}    
</style>
