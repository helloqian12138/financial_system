<template>

    <el-row> 
       <!-- 搜索栏 -->

        <div class="form">
                                                        <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  :model="formInline1" class="demo-form-inline">
            <el-form-item label="市场">
              <el-select   v-model="formInline1.market" placeholder="选择市场" size="mini">
                <el-option v-for="item in options_market" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="行业">
              <el-select   v-model="formInline1.industry" placeholder="选择行业" size="mini">
                <el-option v-for="item in options_industry" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker  v-model="formInline1.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
            </el-form-item>

            <el-form-item label="结束时间">
              <el-date-picker v-model="formInline1.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit1" icon="el-icon-search" size="mini">查询</el-button>
            </el-form-item>
          </el-form>
        </div>



       <div class="one_twins_card">
          <!-- 一左 -->
          <el-card style=" height:300px" :body-style={padding:0}>         <!--:body-style={padding:0}取消卡片边距，btn就能在左上角 -->
            <span class="superscript" style="width: 20px; height: 40px;">总体分析</span>
            <div class="num_card" :body-style="{display: 'flex'}">
              <el-row >
                    <el-col :span="11">
                      <div class="num">
                        <p class="desc">风险主体总量</p>
                        <p class="desc_value">{{ totalRisk }}个</p>
                      </div>
                     

                    </el-col>
                    <el-col :span="2">
                      <el-divider direction="vertical"  content-position="center"></el-divider>
                    </el-col>
                    
                    <el-col :span="11">
                      <div class="num">
                        <p class="desc">主体风险类型</p>
                        <p class="desc_value">{{totalType}}种</p>
                      </div>
                    </el-col>
              </el-row>

           </div>
          </el-card>
          
          <!-- 一右 -->
          <el-card style=" height:300px" :body-style={padding:0}>
            <div>
              <span class="superscript" style="width: 20px; height: 40px;">风险分布</span>
              <!-- 两个饼状图 -->
              <div class="twins_pie">

                <div ref="echarts_1" style="height:200px;width:300px"></div>
                <div ref="echarts_2" style="height:200px;width:300px"></div>

                <!-- <div ref="echarts1" style="height: 100px"></div> -->
                <!-- <div ref="echarts2" style="height: 100px"></div> -->
              </div>


           </div>
          </el-card>
    </div>




    <!-- 第二层表格与图像 -->
    <div class="two">
      <el-card :body-style={padding:0} style='height: 400px;width: 100%;'>
         <!-- 1、上标 -->
         <span class="superscript" style="width: 20px; height: 40px;">影响力排名</span>

        
        <!-- 2、内容 -->
        <div class="content">

          <div class="table" style="width: 50%; float: left; overflow: hidden">
            <el-table :data="tableData" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
                  border  
                  height="250" 
                  :row-style="{height:'28px'}"
                  :cell-style="{padding:'0px'}"
                  header-row-class-name="active_header"
                  header-cell-class-name="active_header"
                  cell-class-name="content_center"
                  style="width: 90%">          <!-- style="width: 40%"               height="215"  -->
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
            <el-card style=" height:300px;margin-bottom:10px ; " :body-style={padding:0} >    
              <span class="superscript" style="width: 20px; height: 40px;">详细信息</span>
              <el-table :data="detailData"
              border  
                  :row-style="{height:'28px'}"
                  :cell-style="{padding:'0px'}"
                  header-row-class-name="active_header"
                  header-cell-class-name="active_header"
                  cell-class-name="content_center"
                  style="margin:15px;">     
                  <el-table-column
                  prop="n"
                  label="主体名称"
                  width="70">
                </el-table-column>
                <el-table-column label="市场结构">
                  <el-table-column
                    prop="D"
                    label="度中心性"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="B"
                    label="介数中心性"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="C"
                    label="接近中心性"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="P"
                    label="PageRank"
                    width="100">
                  </el-table-column>
                </el-table-column>
                  <el-table-column label="个体规模">
                    <el-table-column
                      prop="资金规模"
                      label="资金规模"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="持股数量"
                      label="持股数量"
                      width="100">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column
                  prop="主体风险"
                  label="主体风险"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="zhfs"
                  label="影响力综合分数"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="leve"
                  label="影响等级"
                  width="70">
                </el-table-column>
                <el-table-column
                        prop="scale"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                          <span class="text"  v-on:click="detail(scope.row)">查看风险指标详情</span>
                        </template>
                    </el-table-column>
              </el-table>
            </el-card>
                    
            <!-- 关联主体 -->
            <el-card style=" height:200px;margin-bottom:10px " :body-style={padding:0} >    
              <span class="superscript" style="width: 20px; height: 40px;">关联主体</span>
                 
              <!-- 表单 -->
              <div class="form">
                                                        <!-- inline="true"表单域在一行 -->
                  <el-form :inline="true"  :model="formInline2" class="demo-form-inline" style="margin: 10px;">
                    <template>
                      <el-radio v-model="type" label="key_node">关键节点</el-radio>
                      <el-radio v-model="type" label="other">相似节点</el-radio>
                    </template>
                    <el-form-item>
                      <el-button class="grayish_btn" @click="onSubmit2" icon="el-icon-search" size="mini">查询</el-button>
                    </el-form-item>
                  </el-form>
              </div>
              <!-- 关联主体点 -->
              <div style="display:flex;padding-left:130px" v-if="showRelated">
                <el-button  v-for='(val,key) in relatedRes'  :key="key" type="primary" round style=" height:60px; width:180px ;margin-right:50px">{{val}}:{{key}}</el-button>
              </div>
            </el-card>

            <!-- 影响范围 -->
            <el-card style=" height:400px; " :body-style={padding:0} >    
              <span class="superscript" style="width: 20px; height: 40px;">影响范围</span>
              <div class="form">
                                                        <!-- inline="true"表单域在一行 -->
                  <el-form :inline="true"  :model="formInline3" class="demo-form-inline">
                    <el-form-item >
                      <el-checkbox v-model="formInline3.ndustry_selection">行业</el-checkbox>
                    </el-form-item>

                    <el-form-item >
                      <el-checkbox v-model="formInline3.regional_selection">地域</el-checkbox>
                    </el-form-item>

                    <el-form-item>
                      <el-button class="grayish_btn" @click="onSubmit2" icon="el-icon-search" size="mini">查询</el-button>
                    </el-form-item>
                  </el-form>
              </div>
              <div class="flex-charts">
                <div ref="echarts_4" style="height:300px;width:50%"></div>
                <div ref="echarts_5" style="height:300px;width:50%"></div>
            </div>
            </el-card>
          </el-card>
          </el-dialog>
        </div>


          <div class='bar' style="width: 50%; float: left; overflow: hidden">
            <div ref="echarts_3" style="height:300px;width:100%"></div>
          </div>

      </div>


      </el-card>
    </div>


    

  </el-row>
</template>
  
  <script>
  import * as echarts from "echarts"
  import http from '../utils/request'
  export default {
    data() {
      return {
        width:null,
        result:{},
        showRelated:false,
        relatedRes:[],
        seleced:'',
        type:null,
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

        // 选择框——2行业选项
        options_industry: [{
        value: "新闻和出版业",
        label: "新闻和出版业"}, {
        value: "保险业",
        label: "保险业"}, {
        value: "铁路运输业",
        label: "铁路运输业"}, {
        value: "电力、热力生产和供应业",
        label: "电力、热力生产和供应业"}, {
        value: "专业技术服务业",
        label: "专业技术服务业"}, {
        value: "汽车制造业",
        label: "汽车制造业"}, {
        value: "零售业",
        label: "零售业"}, {
        value: "医药制造业",
        label: "医药制造业"}, {
        value: "电气机械和器材制造业",
        label: "电气机械和器材制造业"}, {
        value: "科技推广和应用服务业",
        label: "科技推广和应用服务业"}, {
        value: "金属制品业",
        label: "金属制品业"}, {
        value: "非金属矿物制品业",
        label: "非金属矿物制品业"}, {
        value: "软件和信息技术服务业",
        label: "软件和信息技术服务业"}, {
        value: "计算机、通信和其他电子设备制造业",
        label: "计算机、通信和其他电子设备制造业"}, {
        value: "化学原料和化学制品制造业",
        label: "化学原料和化学制品制造业"}, {
        value: "航空运输业",
        label: "航空运输业"}, {
        value: "石油、煤炭及其他燃料加工业",
        label: "石油、煤炭及其他燃料加工业"}, {
        value: "石油和天然气开采业",
        label: "石油和天然气开采业"}, {
        value: "电信、广播电视和卫星传输服务",
        label: "电信、广播电视和卫星传输服务"}, {
        value: "土木工程建筑业",
        label: "土木工程建筑业"}, {
        value: "互联网和相关服务",
        label: "互联网和相关服务"}, {
        value: "有色金属冶炼和压延加工业",
        label: "有色金属冶炼和压延加工业"}, {
        value: "商务服务业",
        label: "商务服务业"}, {
        value: "资本市场服务",
        label: "资本市场服务"}, {
        value: "铁路、船舶、航空航天和其他运输设备制造业",
        label: "铁路、船舶、航空航天和其他运输设备制造业"}, {
        value: "多式联运和运输代理业",
        label: "多式联运和运输代理业"}, {
        value: "装卸搬运和仓储业",
        label: "装卸搬运和仓储业"}, {
        value: "水的生产和供应业",
        label: "水的生产和供应业"}, {
        value: "批发业",
        label: "批发业"}, {
        value: "文教、工美、体育和娱乐用品制造业",
        label: "文教、工美、体育和娱乐用品制造业"}, {
        value: "房地产业",
        label: "房地产业"}, {
        value: "开采专业及辅助性活动",
        label: "开采专业及辅助性活动"}, {
        value: "通用设备制造业",
        label: "通用设备制造业"}, {
        value: "煤炭开采和洗选业",
        label: "煤炭开采和洗选业"}, {
        value: "食品制造业",
        label: "食品制造业"}, {
        value: "农副食品加工业",
        label: "农副食品加工业"}, {
        value: "有色金属矿采选业",
        label: "有色金属矿采选业"}, {
        value: "研究和试验发展",
        label: "研究和试验发展"}, {
        value: "酒、饮料和精制茶制造业",
        label: "酒、饮料和精制茶制造业"}, {
        value: "教育",
        label: "教育"}, {
        value: "专用设备制造业",
        label: "专用设备制造业"}, {
        value: "房屋建筑业",
        label: "房屋建筑业"}, {
        value: "纺织服装、服饰业",
        label: "纺织服装、服饰业"}, {
        value: "橡胶和塑料制品业",
        label: "橡胶和塑料制品业"}, {
        value: "水上运输业",
        label: "水上运输业"}, {
        value: "货币金融服务",
        label: "货币金融服务"}, {
        value: "黑色金属冶炼和压延加工业",
        label: "黑色金属冶炼和压延加工业"}, {
        value: "住宿业",
        label: "住宿业"}, {
        value: "燃气生产和供应业",
        label: "燃气生产和供应业"}, {
        value: "道路运输业",
        label: "道路运输业"}, {
        value: "生态保护和环境治理业",
        label: "生态保护和环境治理业"}, {
        value: "纺织业",
        label: "纺织业"}, {
        value: "化学纤维制造业",
        label: "化学纤维制造业"}, {
        value: "其他制造业",
        label: "其他制造业"}, {
        value: "广播、电视、电影和录音制作业",
        label: "广播、电视、电影和录音制作业"}, {
        value: "仪器仪表制造业",
        label: "仪器仪表制造业"}, {
        value: "皮革、毛皮、羽毛及其制品和制鞋业",
        label: "皮革、毛皮、羽毛及其制品和制鞋业"}, {
        value: "造纸和纸制品业",
        label: "造纸和纸制品业"}, {
        value: "印刷和记录媒介复制业",
        label: "印刷和记录媒介复制业"}, {
        value: "餐饮业",
        label: "餐饮业"}, {
        value: "公共设施管理业",
        label: "公共设施管理业"}, {
        value: "其他金融业",
        label: "其他金融业"}, {
        value: "土地管理业",
        label: "土地管理业"}, {
        value: "林业",
        label: "林业"}, {
        value: "农业",
        label: "农业"}, {
        value: "废弃资源综合利用业",
        label: "废弃资源综合利用业"}, {
        value: "畜牧业",
        label: "畜牧业"}, {
        value: "文化艺术业",
        label: "文化艺术业"}, {
        value: "建筑装饰、装修和其他建筑业",
        label: "建筑装饰、装修和其他建筑业"}, {
        value: "黑色金属矿采选业",
        label: "黑色金属矿采选业"}, {
        value: "其他采矿业",
        label: "其他采矿业"}, {
        value: "机动车、电子产品和日用产品修理业",
        label: "机动车、电子产品和日用产品修理业"}, {
        value: "家具制造业",
        label: "家具制造业"}, {
        value: "建筑安装业",
        label: "建筑安装业"}, {
        value: "其他服务业",
        label: "其他服务业"}, {
        value: "社会工作",
        label: "社会工作"}, {
        value: "渔业",
        label: "渔业"}, {
        value: "体育",
        label: "体育"}, {
        value: "居民服务业",
        label: "居民服务业"}, {
        value: "邮政业",
        label: "邮政业"}, {
        value: "金属制品、机械和设备修理业",
        label: "金属制品、机械和设备修理业"}, {
        value: "卫生",
        label: "卫生"}, {
        value: "木材加工和木、竹、藤、棕、草制品业",
        label: "木材加工和木、竹、藤、棕、草制品业"}, {
        value: "农、林、牧、渔专业及辅助性活动",
        label: "农、林、牧、渔专业及辅助性活动"}, {
        value: "非金属矿采选业",
        label: "非金属矿采选业"}, {
        value: "租赁业",
        label: "租赁业"}, {
        value: "水利管理业",
        label: "水利管理业"}, 

      
      ],
        // 整合收据进行接收（3个）
        formInline1: {
            market: '',
            industry: '',
            start_date:'',
            end_date:'',
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
          name: '主体名称',
          main_risk: '主体风险',
          zhfs: '影响力综合分数',
          leve: '影响等级',
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
                    textStyle: {//主标题文本样式
                      fontSize: 13,
                    },
                    padding:[ 5,0,20,0],//[5,10] | [ 5,6, 7, 8] ,标题内边距[上，x，下，x]
                  },

                  series: [
                    {
                      data: this.pieDataIndus,
                      type: 'pie',
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
      width(){
        return '60px'
      },
    // 影响力排名
    onSubmit1(){
      console.log("影响力排名")
      // console.log(this.formInline1)
        http.get(
                "/rank/network/",
                {params:{
                    market: this.formInline1.market,
                    industry: this.formInline1.industry,
                    start_date:this.formInline1.start_date,
                    end_date:this.formInline1.end_date,
        }}).then(response => {
          let xData=[]
            this.tableData= response.data.rank
              this.barData=response.data.index
              for (let i of this.barData) {
                xData.push(i.n)
                // delete i['n']
              }
          // console.log(xData)
          this.result=response.data
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
              data:[]
            },
            yAxis: [
              {
                type: "value",}
            ],
            title: {
              text: '中心性分析',
              x:'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
              y:"bottom",
              textStyle: {//主标题文本样式
                fontSize: 13,
              },
              padding:[ 5,0,10,0],//[5,10] | [ 5,6, 7, 8] ,标题内边距[上，x，下，x]
            },
            series: [
              {
                name: '介接近中心性',
                data: this.barData.map(item => item.C),
                type: 'bar'
              },
              {
                name: '介数中心性',
                data: this.barData.map(item => item.B),
                type: 'bar'
              },
              {
                name: 'PageRank',
                data: this.barData.map(item => item.P),
                type: 'bar'
              },
              {
                name: '度中心性',
                data: this.barData.map(item => item.D),
                type: 'bar'
              }
            ],
          }
          echarts3.setOption(option_3)


        })
    },
    // 关联主体、影响范围
    onSubmit2(){
      http.get('/rank/relate/',
      {params:{
            name:this.seleced,
            type: this.type,
          market:this.formInline1.market,
            industry: this.formInline1.industry,
            start_date:this.formInline1.start_date,
            end_date:this.formInline1.end_date,
      }}).then(res=>{
        for (let i in res.data)
        {this.relatedRes.push(res.data[i])
          }
        console.log(this.relatedRes)
        this.showRelated=true
      })
    },
    detail(row){
      this.seleced=row.name

      this.detailData.length=0
      let tmp
      for (let i in this.result.index)
      {
        console.log(this.result.index[i].n)
        if (this.result.index[i].n===this.seleced)
          tmp=this.result.index[i]
       }
      console.log(this.result.rank)
      for (let i in this.result.rank)
        if (this.result.rank[i].name===this.seleced)
          tmp=Object.assign(this.result.rank[i],tmp)
          // tmp=[...this.result.rank[i],tmp]
      this.detailData=Array(tmp)
        console.log(this.detailData)
      // console.log(row.name)//返回这一行所有的内容
      //这个地方需要连一个新接口
      //提供弹窗的数据
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
    padding-left: 50px;

  }
  
  // 第一层
  .one_twins_card{
    margin-top:0px;
    margin-bottom:10px;
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
    margin-top: 60px;
    margin-left: 80px;
    margin-right: 80px;
    margin-bottom: 20px;
    display:flex;
    flex-direction:column;//主轴显示
    justify-content:space-center;//左右贴边
    // align-items:center;//居中

    .desc{
      // margin-bottom:10px;
      // margin-left:20px;
      // margin-right:50px;
      text-align: center;//居中
      font-weight: bold;//字体加粗
      font-size: 16px;

    }
    .desc_value{
      // margin-left:40px;
      // margin-right:50px;
      text-align: center;//居中
      font-size: 15px;
      color:#02A7F0;;
    }

    .el-divider--vertical {
    /* display: inline-block; */
    height: 3em;//分割线宽度
    text-align: center;//居中
   
    // margin-right:100px;

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
        margin-top: 30px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;

    }
  }

  
  //第二层
.two{

  // 表格中操作
  .content{
    display:flex;
    justify-content:space-between;
    .table{
    padding: 20px 2px 2px 20px;//返回表格添加间隙 上 右


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
      font-size: 12px;
      text-align: center !important;
      // height: 1px;
    }
    /deep/ .content_center{//表的内容
      text-align: center !important;
      font-size: 12px;
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
 
  
  
  
  
  
   
   
  
  
  
  </style>
  
  
  