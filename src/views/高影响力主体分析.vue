<template>

    <el-row> 
      <el-tabs type="border-card"> 
        <!-- 1、横向对比 -->
        <el-tab-pane label="横向对比">
           <!-- 搜索栏 -->
          <div class="form">
                                                          <!-- inline="true"表单域在一行 -->
            <el-form :inline="true"  :model="formInline1" class="demo-form-inline">
              <el-form-item label="市场">
                <el-select   v-model="formInline1.market" placeholder="选择市场" size="mini">
                  <el-option v-for="item in options_market" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="主体类型">
                <el-select   v-model="formInline1.industry" placeholder="选择行业" size="mini">
                  <el-option v-for="item in options_industry" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="时间粒度">
                <el-select   v-model="formInline1.timeType" placeholder="选择时间粒度" size="mini">
                  <el-option v-for="item in optionsTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间">
  <!--              <span class="demonstration">月</span>-->
                <el-date-picker
                    v-if="formInline1.timeType==='month'"
                    v-model="formInline1.pre_date"
                    type="month"
                    size="mini"
                    placeholder="选择月">
                </el-date-picker>
                <quter-component  v-if="formInline1.timeType==='quarter'" v-model="formInline1.quarter_date"></quter-component>
                <half-year v-if="formInline1.timeType==='half_year'" v-model="formInline1.pre_date"/>
              </el-form-item>
  <!--            <el-form-item label="时间">-->
  <!--              <el-date-picker  v-model="formInline1.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>-->
  <!--            </el-form-item>-->

  <!--            <el-form-item label="结束时间">-->
  <!--              <el-date-picker v-model="formInline1.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>-->
  <!--            </el-form-item>-->
              <el-form-item>
                <el-button class="grayish_btn" @click="onSubmit1" icon="el-icon-search" size="mini">查询</el-button>
              </el-form-item>

            </el-form>
          </div>



<!--          <div class="one_twins_card">-->
<!--              &lt;!&ndash; 一左 &ndash;&gt;-->
<!--              <el-card style=" height:300px;width: 30%;" :body-style={padding:0}>         &lt;!&ndash;:body-style={padding:0}取消卡片边距，btn就能在左上角 &ndash;&gt;-->
<!--                <span class="superscript" style="width: 20px; height: 40px;">总体分析</span>-->
<!--                <div class="num_card" :body-style="{display: 'flex'}">-->
<!--                  &lt;!&ndash; <el-row > &ndash;&gt;-->
<!--                        &lt;!&ndash; <el-col :span="11"> &ndash;&gt;-->
<!--                          <div>-->
<!--                            <p class="desc">高影响力风险主体总量:</p>-->
<!--                            <p class="desc_value">{{ totalRisk }}个</p>-->
<!--                          </div>-->


<!--                          <el-divider style="width:60%"></el-divider>-->


<!--                        &lt;!&ndash; </el-col>-->
<!--                        <el-col :span="2">-->
<!--                          <el-divider direction="vertical"  content-position="center"></el-divider>-->

<!--                        </el-col> &ndash;&gt;-->
<!--                        -->
<!--                        &lt;!&ndash; <el-col :span="11"> &ndash;&gt;-->
<!--                          <div>-->
<!--                            <p class="desc">高影响力主体风险类型:</p>-->
<!--                            <p class="desc_value">{{totalType}}种</p>-->
<!--                          </div>-->
<!--                        &lt;!&ndash; </el-col> &ndash;&gt;-->
<!--                  &lt;!&ndash; </el-row> &ndash;&gt;-->

<!--              </div>-->
<!--              </el-card>-->
<!--              -->
<!--              &lt;!&ndash; 一右 &ndash;&gt;-->
<!--              <el-card style=" height:300px;width: 68%;" :body-style={padding:0}>-->
<!--                <div>-->
<!--                  <span class="superscript" style="width: 20px; height: 40px;">风险分布</span>-->
<!--                  &lt;!&ndash; 两个饼状图 &ndash;&gt;-->
<!--                  <div class="twins_pie">-->

<!--                    <div ref="echarts_1" style="height:280px;width:400px"></div>-->
<!--                    <div ref="echarts_2" style="height:280px;width:400px"></div>-->

<!--                    &lt;!&ndash; <div ref="echarts1" style="height: 100px"></div> &ndash;&gt;-->
<!--                    &lt;!&ndash; <div ref="echarts2" style="height: 100px"></div> &ndash;&gt;-->
<!--                  </div>-->


<!--              </div>-->
<!--              </el-card>-->
<!--          </div>-->

          <!-- 第二层表格与图像 -->
          <div class="two">
            <el-card :body-style={padding:0} style='width: 100%;'>
              <!-- 1、上标 -->
              <span class="superscript" style="width: 20px; height: 40px;">影响力排名</span>

      <!--        模型暂时不支持-->
      <!--         <el-form :inline="true"  class="demo-form-inline" :model="formInline4" ref="formInline">-->
      <!--            <el-form-item label="个体类型" style="margin: 0px;padding-left: 80px;padding-top: 5px">-->
      <!--              <el-select  v-model="formInline4.type"  size="mini">-->
      <!--                <el-option label="私募" value="私募"></el-option>-->
      <!--                <el-option label="公募" value="公募"></el-option>-->
      <!--              </el-select>-->
      <!--            </el-form-item>-->
      <!--        </el-form>-->
              
              <!-- 2、内容 -->
              <div class="content">

                <div class="table" style="width: 100%; float: left; overflow: hidden">
                  <el-table :data="tableData" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
                        border  
                        height="250" 
                        :row-style="{height:'28px'}"
                        :cell-style="{padding:'0px'}"
                        header-row-class-name="active_header"
                        header-cell-class-name="active_header"
                        cell-class-name="content_center"
                        style="width: 98%">          <!-- style="width: 40%"               height="215"  -->
                      <el-table-column v-for='(val,key) in tableLabel' :prop="key" :label="val"  :key="key"/><!--插槽里面没有东西就可以用单标签  -->
                      <el-table-column
                              prop="scale"
                              label="操作">
                              <template slot-scope="scope">
                                <span class="text"  v-on:click="detail(scope.row)">查看详情</span>
                              </template>
                          </el-table-column>
                  </el-table>
                </div>

              <div>
                <!-- 详细信息弹窗，默认关闭 -->
                <el-dialog  :visible.sync="detailsdialog" width="100%" @open="open()" >
                  <!-- title="收货地址" -->
                  <el-card >
                  <!-- 详细信息 -->
                  <el-card style=" height:600px;margin-bottom:10px ; " :body-style={padding:0} >    
                    <span class="superscript" style="width: 20px; height: 40px;">详细信息</span>
                    <el-table :data="detailData" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                    border  
                        :row-style="{height:'28px'}"
                        :cell-style="{padding:'0px'}"
                        header-row-class-name="active_header"
                        header-cell-class-name="active_header"
                        cell-class-name="content_center"
                        style="margin:15px;">     
                        <el-table-column
                        prop="comp_name"
                        label="主体名称"
                        width="120">
                      </el-table-column>
                      <el-table-column label="市场结构">
                        <el-table-column
                          prop="DC"
                          label="度中心性"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="BC"
                          label="介数中心性"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="CC"
                          label="接近中心性"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="weighted-PR"
                          label="加权PageRank"
                          width="120">
                        </el-table-column>
                        <el-table-column
                            prop="SLC"
                            label="局部中心性"
                            width="120">
                        </el-table-column>
                      </el-table-column>
                        <el-table-column label="个体规模">
                          <el-table-column
                            prop="region"
                            label="所在区域"
                            width="120">
                          </el-table-column>
                          <el-table-column
                            prop="held_num"
                            label="持股数量(股)"
                            width="120">
                          </el-table-column>
                          <el-table-column
                              prop="asset"
                              label="当前资金规模(万)"
                              width="120">
                          </el-table-column>
                        </el-table-column>
      <!--                  <el-table-column-->
      <!--                  prop="主体风险"-->
      <!--                  label="主体风险"-->
      <!--                  width="120">-->
      <!--                </el-table-column>-->
                      <el-table-column
                        prop="Total_score"
                        label="影响力综合分数"
                        width="120">
                      </el-table-column>
                      <el-table-column
                        prop="grade"
                        label="影响等级"
                        width="120">
                      </el-table-column>
      <!--                <el-table-column-->
      <!--                        prop="scale"-->
      <!--                        label="操作">-->
      <!--                        <template slot-scope="scope">-->
      <!--                          <span class="text"  v-on:click="detail(scope.row)">查看风险指标详情</span>-->
      <!--                        </template>-->
      <!--                    </el-table-column>-->
                    </el-table>
                    <div style="display:flex;">
                      <el-divider direction="vertical" class="sublabel"></el-divider>
                      <span class='title'>个体规模分析</span>
                    </div>
      <!--              模型暂时不支持-->
      <!--              <el-form :inline="true"  class="demo-form-inline" :model="formInline4" ref="formInline">-->
      <!--                <el-form-item label="指标" style="margin: 0px;padding-left: 80px;padding-top: 5px">-->
      <!--                  <el-select  v-model="formInline4.type"  size="mini">-->
      <!--                    <el-option label="基金规模" value="基金规模"></el-option>-->
      <!--                    <el-option label="持股数量" value="持股数量"></el-option>-->
      <!--                  </el-select>-->
      <!--                </el-form-item>-->
      <!--              </el-form>-->
                    <DifferentialChart :asset="asset" :datelis="datelis" :held_num="held_num"/>
              


                  </el-card>
                          
                  <!-- 关联主体 -->
                  <el-card style=" height:300px;margin-bottom:10px " :body-style={padding:0} >
                    <span class="superscript" style="width: 20px; height: 40px;">关联主体</span>
                      
                    <!-- 表单 -->
                    <div class="form">
                                                              <!-- inline="true"表单域在一行 -->
                        <el-form :inline="true"  :model="formInline2" class="demo-form-inline" style="margin: 10px;">
                          <template>
                            <el-radio v-model="typeRela" label="key_node">关键节点</el-radio>
                            <el-radio v-model="typeRela" label="other">相似节点</el-radio>
                          </template>
                          <el-form-item>
                            <el-button class="grayish_btn" @click="onSubmit2" icon="el-icon-search" size="mini">查询</el-button>
                          </el-form-item>
                        </el-form>
                    </div>
                    <!-- 关联主体点 -->
                    <div style="display:flex;padding-left:130px" v-if="showRelated">
                      <el-button  v-for='(val,key) in relatedRes'  :key="key"  round style=" height:100px; width:300px ;margin-right:50px">{{val}}</el-button>
                    </div>
                  </el-card>

                  <!-- 影响范围 -->
      <!--            <el-card style=" height:400px; " :body-style={padding:0} >    -->
      <!--              <span class="superscript" style="width: 20px; height: 40px;margin-bottom: 10px;">风险影响</span>-->
      <!--              <div class="form">-->
      <!--                                                        &lt;!&ndash; inline="true"表单域在一行 &ndash;&gt;-->
      <!--                  <el-form :inline="true"  :model="formInline3" class="demo-form-inline">-->
      <!--                    <template>-->
      <!--                      <el-radio v-model="typeSpread" label="industry">行业</el-radio>-->
      <!--                      <el-radio v-model="typeSpread" label="regions">地域</el-radio>-->
      <!--                    </template>-->
      <!--&lt;!&ndash;                    <el-form-item >&ndash;&gt;-->
      <!--&lt;!&ndash;                      <el-checkbox v-model="formInline3.ndustry_selection">行业</el-checkbox>&ndash;&gt;-->
      <!--&lt;!&ndash;                    </el-form-item>&ndash;&gt;-->

      <!--&lt;!&ndash;                    <el-form-item >&ndash;&gt;-->
      <!--&lt;!&ndash;                      <el-checkbox v-model="formInline3.regional_selection">地域</el-checkbox>&ndash;&gt;-->
      <!--&lt;!&ndash;                    </el-form-item>&ndash;&gt;-->

      <!--                    <el-form-item>-->
      <!--                      <el-button class="grayish_btn" @click="onSubmit3" icon="el-icon-search" size="mini">查询</el-button>-->
      <!--                    </el-form-item>-->
      <!--                  </el-form>-->
      <!--              </div>-->
      <!--              <div class="flex-charts">-->
      <!--                <div ref="echarts_4" style="height:300px;width:50%"></div>-->
      <!--                <div ref="echarts_5" style="height:300px;width:50%"></div>-->
      <!--            </div>-->
      <!--            </el-card>-->
                </el-card>
                </el-dialog>
              </div>

                <div class='bar' style="width: 100%; float: left; overflow: hidden">
                  <div ref="echarts_3" style="height:300px;width:100%"></div>
                </div>

            </div>


            </el-card>


          </div>
   
        </el-tab-pane>


        <!-- 2、纵向对比 -->
        <el-tab-pane label="纵向对比">
          <!-- 搜索栏 -->
          <div class="form">
                                                          <!-- inline="true"表单域在一行 -->
            <el-form :inline="true"  :model="formInline1" class="demo-form-inline">
              <el-form-item label="市场">
                <el-select   v-model="formInline1.market" placeholder="选择市场" size="mini">
                  <el-option v-for="item in options_market" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="主体类型">
                <el-select   v-model="formInline1.industry" placeholder="选择行业" size="mini">
                  <el-option v-for="item in options_industry" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间粒度">
                <el-select   v-model="formInline1.timeType" placeholder="选择时间粒度" size="mini">
                  <el-option v-for="item in optionsTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="开始时间">

                <el-date-picker
                    v-if="formInline1.timeType==='month'"
                    v-model="formInline1.start_pre"
                    type="month"
                    size="mini"
                    placeholder="选择月">
                </el-date-picker>
                <quter-component  v-if="formInline1.timeType==='quarter'" v-model="formInline1.start_quarter"></quter-component>
                <half-year v-if="formInline1.timeType==='half_year'" v-model="formInline1.start_pre"/>
<!--                原始时间组件-->
<!--                <el-date-picker  v-model="formInline1.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>-->
              </el-form-item>
              <el-form-item label="结束时间">

                <el-date-picker
                    v-if="formInline1.timeType==='month'"
                    v-model="formInline1.end_pre"
                    type="month"
                    size="mini"
                    placeholder="选择月">
                </el-date-picker>
                <quter-component  v-if="formInline1.timeType==='quarter'" v-model="formInline1.end_quarter"></quter-component>
                <half-year v-if="formInline1.timeType==='half_year'" v-model="formInline1.end_pre"/>

<!--                <el-date-picker v-model="formInline1.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>-->
              </el-form-item>
              <el-form-item>
                <el-button class="grayish_btn" @click="onSubmit4" icon="el-icon-search" size="mini">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="table" style=" overflow: hidden">
                  <el-table :data="historyData" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                        border  
                        height="400" 
                        :row-style="{height:'28px'}"
                        :cell-style="{padding:'0px'}"

                        header-row-class-name="active_header"
                        header-cell-class-name="active_header"
                        cell-class-name="content_center">          <!-- style="width: 40%"               height="215"  -->
                    <el-table-column v-for='(val,key) in timeLis' :prop="key" :label="val"  :key="key">
<!--                      <el-table-column v-for='(val,key) in historyDataLabel' :prop="key" :label="val"  :key="key"/>&lt;!&ndash;插槽里面没有东西就可以用单标签  &ndash;&gt;-->
                      <!--                      <el-table-column-->
                      <!--                              prop="scale"-->
                      <!--                              label="操作">-->
                      <!--                              <template slot-scope="scope">-->
                      <!--                                <span class="text"  v-on:click="detail(scope.row)">查看详情</span>-->
                      <!--                              </template>-->
                      <!--                          </el-table-column>-->

                    </el-table-column>

                  </el-table>
          </div>

              <div>
                <!-- 详细信息弹窗，默认关闭 -->
                <el-dialog  :visible.sync="detailsdialog" width="100%" @open="open()"  :modal="false" >
                  <!-- title="收货地址" -->
                  <el-card >
                  <!-- 详细信息 -->
                  <el-card style=" height:600px;margin-bottom:10px ; " :body-style={padding:0} >    
                    <span class="superscript" style="width: 20px; height: 40px;">详细信息</span>
                    <el-table :data="detailData" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                    border  
                        :row-style="{height:'28px'}"
                        :cell-style="{padding:'0px'}"
                        header-row-class-name="active_header"
                        header-cell-class-name="active_header"
                        cell-class-name="content_center"
                        style="margin:15px;">     
                        <el-table-column
                        prop="comp_name"
                        label="主体名称"
                        width="120">
                      </el-table-column>
                      <el-table-column label="市场结构">
                        <el-table-column
                          prop="DC"
                          label="度中心性"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="BC"
                          label="介数中心性"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="CC"
                          label="接近中心性"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="weighted-PR"
                          label="加权PageRank"
                          width="120">
                        </el-table-column>
                      </el-table-column>
                        <el-table-column label="个体规模">
                          <el-table-column
                            prop="region"
                            label="所在区域"
                            width="120">
                          </el-table-column>
                          <el-table-column
                            prop="held_num"
                            label="持股数量"
                            width="120">
                          </el-table-column>
                          <el-table-column
                              prop="asset"
                              label="当前资金规模(万)"
                              width="120">
                          </el-table-column>
                        </el-table-column>
      <!--                  <el-table-column-->
      <!--                  prop="主体风险"-->
      <!--                  label="主体风险"-->
      <!--                  width="120">-->
      <!--                </el-table-column>-->
                      <el-table-column
                        prop="Total_score"
                        label="影响力综合分数"
                        width="120">
                      </el-table-column>
                      <el-table-column
                        prop="grade"
                        label="影响等级"
                        width="120">
                      </el-table-column>
      <!--                <el-table-column-->
      <!--                        prop="scale"-->
      <!--                        label="操作">-->
      <!--                        <template slot-scope="scope">-->
      <!--                          <span class="text"  v-on:click="detail(scope.row)">查看风险指标详情</span>-->
      <!--                        </template>-->
      <!--                    </el-table-column>-->
                    </el-table>
                    <div style="display:flex;">
                      <el-divider direction="vertical" class="sublabel"></el-divider>
                      <span class='title'>个体规模分析</span>
                    </div>
      <!--              模型暂时不支持-->
      <!--              <el-form :inline="true"  class="demo-form-inline" :model="formInline4" ref="formInline">-->
      <!--                <el-form-item label="指标" style="margin: 0px;padding-left: 80px;padding-top: 5px">-->
      <!--                  <el-select  v-model="formInline4.type"  size="mini">-->
      <!--                    <el-option label="基金规模" value="基金规模"></el-option>-->
      <!--                    <el-option label="持股数量" value="持股数量"></el-option>-->
      <!--                  </el-select>-->
      <!--                </el-form-item>-->
      <!--              </el-form>-->
                    <DifferentialChart :asset="asset" :datelis="datelis" :held_num="held_num"/>
              


                  </el-card>
                          
                  <!-- 关联主体 -->
                  <el-card style=" height:300px;margin-bottom:10px " :body-style={padding:0} >
                    <span class="superscript" style="width: 20px; height: 40px;">关联主体</span>
                      
                    <!-- 表单 -->
                    <div class="form">
                                                              <!-- inline="true"表单域在一行 -->
                        <el-form :inline="true"  :model="formInline2" class="demo-form-inline" style="margin: 10px;">
                          <template>
                            <el-radio v-model="typeRela" label="key_node">关键节点</el-radio>
                            <el-radio v-model="typeRela" label="other">相似节点</el-radio>
                          </template>
                          <el-form-item>
                            <el-button class="grayish_btn" @click="onSubmit2" icon="el-icon-search" size="mini">查询</el-button>
                          </el-form-item>
                        </el-form>
                    </div>
                    <!-- 关联主体点 -->
                    <div style="display:flex;padding-left:130px" v-if="showRelated">
                      <el-button  v-for='(val,key) in relatedRes'  :key="key"  round style=" height:100px; width:300px ;margin-right:50px">{{val}}</el-button>
                    </div>
                  </el-card>

                </el-card>
                </el-dialog>
              </div>
                     
        </el-tab-pane>
</el-tabs>
  </el-row>
</template>
  
<script>
import * as echarts from "echarts"
import http from '../utils/request'
import DifferentialChart from "@/components/echarts/DifferentialChart.vue";
import halfYear from "@/components/halfYear";
import quterComponent from "@/components/quterComponent";
import qs from "qs";
import {Loading} from "element-ui";
  export default {
    name:'influential_entities',
    components:{
      DifferentialChart,
      halfYear,
      quterComponent,
},
    data() {
      return {
        datelis:[],
        asset:[],
        held_num:[],
        width:null,
        result:{},
        showRelated:false,
        relatedRes:[],
        seleced:'',
        typeRela:null,
        typeSpread:null,
        totalRisk:Number,
        totalType:Number,
// 【详情页】
        // 详情页是否打开的判断标签
        detailsdialog: false,

        detailData: [
         {
          主体名称:'主体1'
         }
        ],
        
// 【搜索栏】
        // 选择框——1市场选项
        options_market: [{
          value: 'stock',
          label: '股票'
        }, {
          value: '期货',
          label: '期货'
        }, {
          value: '债券',
          label: '债券'
        }],
        optionsTime:[
          {label: '半年',value:'half_year'},
          {label: '季度',value:'quarter'},
          {label: '月',value:'month'},
        ],
        // 选择框——2行业选项
        options_industry: [
          {label:'机构投资者',value:'institutional_investors'},
          {label:'私募',value:'PrivFund'},
          {label:'上市企业',value:'listedComp'},
          {label:'海外机构',value:'ForeignComp'},
          {label:'量化机构',value:'QuantFund'},
        ],
        // 整合收据进行接收（3个）
        formInline1: {
            timeType:'',
            quarter_date:'',
            pre_date:'',
            market: '',
            industry: '',
            start_pre:'',
            start_quarter:'',
            end_pre:'',
          end_quarter:'',
          },
        // 详情页
        formInline2: {
          key_nodes: false,
          transmissibility_max: false,
        },
        formInline3: {
          regional_selection: false,//地域选择
          ndustry_selection: false,//行业选择
        },
        formInline4: {
          type:'',
        },


        // 图表数据
        pieDataIndus:[],
        pieDataType:[],
        tableData: [
          { name: '主体1',
            main_risk: '市场风险',
            zhfs: 85,
            leve: "中",},

        ],
        tableLabel: {
          comp_name: '主体名称',
          Total_score: '影响力综合分数',
          grade: '影响等级',
          spread_ability:'传播能力'
        },
        historyData:[],
        timeLis:[],
        historyDataLabel: {

          // duration:'时间',
          comp_name: '主体名称',
          Total_score: '影响力综合分数',
          // grade: '影响等级',
          // spread_ability:'传播能力'
        },
                // 柱状图
        barData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
        ],

        
        


      }},
    
    mounted(){
               // 饼状图
              const echarts1 = echarts.init(this.$refs.echarts_1)
              const echarts2 = echarts.init(this.$refs.echarts_2)
              http.get('/risk_model/get_data/').then(response=>{
                for (let key in response.data['行业分布']){
                  this.pieDataIndus.push({name:key,value:response.data['行业分布'][key]})
                }
                for (let key in response.data['风险分布']){
                  this.pieDataType.push({name:key,value:response.data['风险分布'][key]})
                }
                this.totalType=response.data['风险类型']
                this.totalRisk=response.data['个体总数']
                const option_1 = {
                  // 右上角存图
                  toolbox: {
                    feature: {
                      saveAsImage: {}
                    }
                  },
                  tooltip: {
                    trigger: "item",
                  },
                  title: {
                    text: '风险行业分布',

                    x:'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                    y:'bottom',

                    textStyle: {//主标题文本样式
                      fontSize: 13,
                      color:'#696969',
                    },
                    padding:[ 35,0,5,0],//[5,10] | [ 5,6, 7, 8] ,标题内边距[上，x，下，x]
                  },

                  series: [
                    {
                      data: this.pieDataIndus,
                      type: 'pie',
                      avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                      minAngle: 5,               //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互

                    }
                  ],

                }

                const option_2 = {
                  // 右上角存图
                  toolbox: {
                    feature: {
                      saveAsImage: {}
                    }
                  },
                  tooltip: {
                    trigger: "item",
                  },
                  title: {
                    text: '风险类型分布',
                    x:'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                    textStyle: {//主标题文本样式
                      fontSize: 13,
                      color:'#696969',
                    },
                    padding:[ 5,0,20,0],//[5,10] | [ 5,6, 7, 8] ,标题内边距
                  },

                  series: [
                    {
                      data: this.pieDataType,
                      type: 'pie',
                    }
                  ],
                }
                this.$nextTick(()=>{
                  echarts1.setOption(option_1)
                  echarts2.setOption(option_2)
                })
              })

  },
    methods:{
      // width(){
      //   return '60px'
      // },
    // 影响力排名
      onSubmit1(){
        console.log("影响力排名")
        console.log(this.formInline1.start_date)
        // console.log(this.formInline1)
        //时间格式不一样，所以要分参数quarter_date
        let options={
          text:'请稍等'
        }
        let loadingInstance = Loading.service(options);
        if (this.formInline1.timeType!=='quarter') {
          http.get(
              "/rank/network/",
              {
                params: {
                  market: this.formInline1.market,
                  com_type: this.formInline1.industry,
                  time: this.formInline1.pre_date,
                  time_type: this.formInline1.timeType
                },
                //   防止带中括号
                paramsSerializer: params => {
                  return qs.stringify(params, {indices: false})
                }
              }).then(response => {
                loadingInstance.close()
            if (response.data.length === 0)
              alert('没有结果')
            else {
              let dat = response.data
              this.tableData = dat
              this.barData = dat

              console.log(this.tableData)
              this.result = response.data
              // 柱状图
              const echarts3 = echarts.init(this.$refs.echarts_3)
              const option_3 = {
                // 右上角存图
                toolbox: {
                  feature: {
                    saveAsImage: {}
                  }
                },
                legend: {
                  // 图例文字颜色
                  textStyle: {
                    color: "#333",
                  },
                },
                grid: {
                  left: "20%",
                },
                // 提示框
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: 'shadow'
                  }
                },
                xAxis: {
                  type: "category", // 类目轴
                  // xData太多显示不出来
                  data: []
                },
                yAxis: [
                  {
                    type: "value",
                  }
                ],
                title: {
                  text: '中心性分析',
                  x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                  y: "bottom",
                  textStyle: {//主标题文本样式
                    fontSize: 13,
                  },
                  padding: [5, 0, 10, 0],//[5,10] | [ 5,6, 7, 8] ,标题内边距[上，x，下，x]
                },
                series: [
                  {
                    name: '介接近中心性',
                    data: this.barData.map(item => item.CC),
                    type: 'bar'
                  },
                  {
                    name: '介数中心性',
                    data: this.barData.map(item => item.BC),
                    type: 'bar'
                  },
                  {
                    name: '加权PageRank',
                    data: this.barData.map(item => item['weighted-PR']),
                    type: 'bar'
                  },
                  {
                    name: '度中心性',
                    data: this.barData.map(item => item.DC),
                    type: 'bar'
                  },

                ],
              }
              echarts3.setOption(option_3)
            }
          }).finally(
              ( )=>loadingInstance.close()
          )
        }
        else {
          {
            http.get(
                "/rank/network/",
                {
                  params: {
                    market: this.formInline1.market,
                    com_type: this.formInline1.industry,
                    time: this.formInline1.quarter_date,
                    time_type: this.formInline1.timeType
                  },
                  //   防止带中括号
                  paramsSerializer: params => {
                    return qs.stringify(params, {indices: false})
                  }
                }).then(response => {
                  loadingInstance.close()
              if (response.data.length === 0)
                alert('没有结果')
              else {
                let dat = response.data
                this.tableData = dat
                this.barData = dat

                console.log(this.tableData)
                this.result = response.data
                // 柱状图
                const echarts3 = echarts.init(this.$refs.echarts_3)
                const option_3 = {
                  // 右上角存图
                  toolbox: {
                    feature: {
                      saveAsImage: {}
                    }
                  },
                  legend: {
                    // 图例文字颜色
                    textStyle: {
                      color: "#333",
                    },
                  },
                  grid: {
                    left: "20%",
                  },
                  // 提示框
                  tooltip: {
                    trigger: "axis",
                    axisPointer: {
                      type: 'shadow'
                    }
                  },
                  xAxis: {
                    type: "category", // 类目轴
                    // xData太多显示不出来
                    data: []
                  },
                  yAxis: [
                    {
                      type: "value",
                    }
                  ],
                  title: {
                    text: '中心性分析',
                    x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                    y: "bottom",
                    textStyle: {//主标题文本样式
                      fontSize: 13,
                    },
                    padding: [5, 0, 10, 0],//[5,10] | [ 5,6, 7, 8] ,标题内边距[上，x，下，x]
                  },
                  series: [
                    {
                      name: '介接近中心性',
                      data: this.barData.map(item => item.CC),
                      type: 'bar'
                    },
                    {
                      name: '介数中心性',
                      data: this.barData.map(item => item.BC),
                      type: 'bar'
                    },
                    {
                      name: '加权PageRank',
                      data: this.barData.map(item => item['weighted-PR']),
                      type: 'bar'
                    },
                    {
                      name: '度中心性',
                      data: this.barData.map(item => item.DC),
                      type: 'bar'
                    },

                  ],
                }
                echarts3.setOption(option_3)
              }
            }).finally(
               ( )=>loadingInstance.close()
            )
          }
        }

      },

    // 关联主体、影响范围
    onSubmit2(){
      this.relatedRes.length=0
      http.get('/rank/relate/',
      {params:{
            name:this.seleced,
            type: this.typeRela,
            market:this.formInline1.market,
            industry: this.formInline1.industry,
            start_date:this.formInline1.start_date,
            end_date:this.formInline1.end_date,
      }}).then(res=>{
        // console.log(res.data)
        if (res.data!=='null'){
          this.relatedRes.length=0
          for (let i in res.data)
          {this.relatedRes.push(res.data[i])
          }
          console.log(this.relatedRes)
          this.showRelated=true
        }
        else
          this.$message({
            showClose: true,
            message: '未查询到结果',
            type: 'info'
          });

      })
    },
    // 按行业、地域
      onSubmit3(){
      // this.relatedRes.length=0
        http.get('/rank/spread/',
            {params:{
                name:this.seleced,
                type: this.typeSpread,
                market:this.formInline1.market,
                industry: this.formInline1.industry,
                start_date:this.formInline1.start_date,
                end_date:this.formInline1.end_date,
              }}).then(res=>{
          console.log(res.data.data)

        })
      },
      // 纵向对比表单提交
      onSubmit4() {
        if (this.formInline1.timeType !== 'quarter') {
          http.get('/rank/history/',
              {
                params: {
                  market: this.formInline1.market,
                  com_type: this.formInline1.industry,
                  time_type: this.formInline1.timeType,
                  start: this.formInline1.start_pre,
                  end: this.formInline1.end_pre,
                },
                paramsSerializer: params => {
                  return qs.stringify(params, {indices: false})
                }
              }).then(res => {
            if (res.data.length === 0)
              alert('没有结果')
            else {
              // let tmp = res.data
              // this.getSpanArr(tmp)
              this.historyData=res.data.data
              this.timeLis=res.data.time
            }


          })
        } else {
          http.get('/rank/history/',
              {
                params: {
                  market: this.formInline1.market,
                  com_type: this.formInline1.industry,
                  time_type: this.formInline1.timeType,
                  start: this.formInline1.start_quarter,
                  end: this.formInline1.end_quarter,
                },
                paramsSerializer: params => {
                  return qs.stringify(params, {indices: false})
                }
              }).then(res => {
            if (res.data.length === 0)
              alert('没有结果')
            else {
              // let tmp = res.data.data
              // this.getSpanArr(tmp)
              this.historyData=res.data.data
              this.timeLis=res.data.time

            }
          })
        }
      },
      getSpanArr(list) {
        // 先给所有的数据都加一个v.rowspan = 1
        list.forEach(item => {
          item.rowspan = 1;
          // item.rowspan1 = 1;
          // 有几列想合并就设置几个

        });
        // 双层循环
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            //此处可根据相同字段进行合并
            if (list[i].duration=== list[j].duration) {
              list[i].rowspan++;
              list[j].rowspan--;
            }
            // if (list[i].duration=== list[j].duration  && list[i].Total_score === list[j].Total_score ) {
            //   list[i].rowspan1++;
            //   // list[j].rowspan1--;
            // }
          }
          console.log(list[i].rowspan)
          // 这里跳过已经重复的数据
          i = i + list[i].rowspan - 1;
          // i = i + list[i].rowspan1 - 1;
        }
        this.historyData.length=0
        this.historyData = list;
        console.log(this.historyData)
      },

      // 复杂表格合并相同列
      ObjectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // 第一列
        if (columnIndex === 0) {
          return {
            rowspan: row.rowspan,
            colspan: 1,
          };
        }
        // 第二列
        // if (columnIndex === 1) {
        //   return {
        //     rowspan: row.rowspan1,
        //     colspan: 1,
        //   };
        // }
        // row.XXX的值跟上述函数对应

      },

    detail(row){
      this.seleced=row.comp_name
      this.datelis.length=0
      this.asset.length=0
      this.held_num.length=0
      http.get('/rank/asset/',
          {params:{
              comp_name:this.seleced,
            }}).then(res=>{
            for (let i in res.data)
            {
              this.datelis.push(res.data[i]['duration'].slice(0,11))
              this.asset.push(res.data[i]['asset'])
              this.held_num.push(res.data[i]['held_num'])
            }

      })
      this.detailData.length=0
      for (let i in this.tableData)
      {
        if (this.tableData[i]['comp_name']===this.seleced)
          this.detailData=Array(this.tableData[i])
      }
      // let tmp
      // for (let i in this.result.index)
      // {
      //   console.log(this.result.index[i].n)
      //   if (this.result.index[i].n===this.seleced)
      //     tmp=this.result.index[i]
      //  }
      // console.log(this.result.rank)
      // for (let i in this.result.rank)
      //   if (this.result.rank[i].name===this.seleced)
      //     tmp=Object.assign(this.result.rank[i],tmp)
      //     // tmp=[...this.result.rank[i],tmp]
      // this.detailData=Array(tmp)
        console.log(this.detailData)
      // console.log(row.name)//返回这一行所有的内容

      this.detailsdialog = true//打开弹窗
    },
    initEcharts() {
       // 详情页的线形图
        // 详情图的柱状图、饼图
        // 1、柱状图
        var echarts4 = echarts.init(this.$refs.echarts_4);
        var option_4={
              title: {
                text: "影响范围统计-行业",
                left:"center",
                textStyle:{
                fontSize:17,
                lineHeight:60
                }
              },
              tooltip: {},
              xAxis: {
                data: ["银行", "保险", "运输"],
                name:"行业",
                nameTextStyle:{
                  padding:[0,0,-40,-260],
                  verticalAlign:'bottom'
                }
              },
              yAxis: {
                name:'影响行业的数量',
                axisTick:{
                  show:true,
                },
                axisLine:{
                  show:true,
                },
                nameTextStyle:{
                  position: 'left',
                  nameLocation: 'middle', 
                  nameGap: 60, 
                  nameRotate: 90 
                } 
              },
              series: [
                {
                name: "数量",
                type: "bar",
                data: [45, 20, 30],
                barWidth:60,
                itemStyle:{
                  normal: {
                    color: function (params) {
                      let colorList = [
                      'blue',
                      'green',
                      'red',
                      ];
                      let colorItem = colorList[params.dataIndex];
                      return colorItem;
                    },
                    label:{          
                      show:true,
                      position:'top',          
                    }
                  }
                }
                },
              ],
                }
        echarts4.setOption(option_4)
          // 2、饼图

        const  echarts5 = echarts.init(this.$refs.echarts_5);
        const option_5 = {
        title: {
          text: "影响行业占比份额",
          left: "center",
          textStyle:{
          fontSize:17,
          lineHeight:85
          }
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "30",
          top:"40"
        },
        series: [
          {
          name: "占比份额",
          type: "pie",
          radius: "55%",
          LabelOverlap: true,
          data: [
            { value: 45, name: "银行" },
            { value: 20, name: "保险" },
            { value: 30, name: "运输" },
          ],
          itemStyle:{
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
            borderWidth:2,
            borderColor:'#fff'
          }
          },
        ],


            }

        echarts5.setOption(option_5)
    } ,


      open(){
              this.$nextTick(() => {
              //  执行echarts方法
                this.initEcharts()
              })
            },

  }


  };
  </script>
  
  <style lang="less" scoped>
/deep/ .el-checkbox__label {//弹窗单选框的表单样式
    padding-right: 40px;
    padding-left: 40px;
}
.grayish_btn{//浅灰色按钮
  color: #fff;//文字颜色
  background-color: #aaaaaa;//背景颜色
}
/deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
      border-bottom: 1px solid rgba(242, 242, 242, 0.654901960784314) !important;
      padding: 0px 0 !important;
      min-width: 0 !important;
    }
    .el-table .el-table__cell {
      padding: 12px 0; 
      min-width: 0;
    }
    /deep/ .active_header{//表头
      color: #333333;
      // font-size: 9px;
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
.form{//2、产品搜索栏
    
    display:flex;
    justify-content:space-between;//左右贴边
    // margin-top:5px; 
    // height: 40px;
    padding-left: 10px;
    margin-bottom: 0px;
    padding-bottom: 0px;

  }
  
  // 第一层
  .one_twins_card{
    margin-top:0px;
    margin-bottom:3px;
    display:flex;
    justify-content:space-between;//左右贴边
    .el-card {
      width:49.5%;
    } 
    .el-col-2 {
     width: 2%;

}
    // 数据
    .num_card{
    margin-top: 40px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;


    .desc{
      text-align: center;//居中
      font-weight: bold;//字体加粗
      font-size: 17px;
      color:'#696969';

    }
    .desc_value{
      text-align: center;//居中
      font-size: 18px;
      color:#02A7F0;;
    }




    .el-divider--horizontal {
    display: flex;
    justify-content:center;
    height: 1px;
    width: 80%;
    margin: 24px 70px 24px 30px;//上 右 下 左
  }
    .el-statistic {
        font-size: 13px;
        color:#02A7F0;;//没改成，之后再改
      }
  }
    .twins_pie{
        display:flex;
        justify-content:space-between;
        // padding:10px;
        // margin-top: 30px;
        // margin-left: 20px;
        // margin-right: 20px;
        // margin-bottom: 20px;

    }
  }

  
  //第二层
.two{

  // 表格中操作
  .content{
    // display:flex;
    // justify-content:space-between;
    .table{
    padding: 20px 10px 2px 10px;//返回表格添加间隙 上 右


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
      font-size: 13px;
      text-align: center !important;
      // height: 1px;
    }
    /deep/ .content_center{//表的内容
      text-align: center !important;
      font-size: 13px;
    }
  

    }
    .bar{
      padding: 20px 40px 2px 2px;//返回表格添加间隙 上 右
    }

  }
  
  .flex-charts{//并列图
    // margin-top:20px; 
    display:flex;
    justify-content:space-between;
    // padding:20px;
}
}

.grayish_btn{//浅灰色按钮
    color: #fff;//文字颜色
    background-color: #aaaaaa;//背景颜色
    margin-bottom: 20px;
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
  
  
  