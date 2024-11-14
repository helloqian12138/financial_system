<!-- 系统风险分析，原市场分析拆分、新增、11.6合并-->
<template>
    <div>
      <div class="one">
        <!-- 卡片化的标签页 -->


            <el-card style='height: 440px;margin-bottom:10px;' :body-style={padding:0}>
            <!-- height:400px -->
            <!-- 1、上标 -->
            <span class="superscript" style="width: 20px; height: 40px;">资本市场系统性风险指数监测
</span>

            <!-- 添加折线图 -->

              <component :is="compName" :zoom="datazoom" @datazoom="changeComp" ></component>
<!--            <system-risk-component/>-->

            </el-card>

            <el-card style="height: 550px;margin-top: 10px" :body-style={padding:0}>
              <span class="superscript" style="width: 20px; height: 20px;">维度时序</span>
              <dimension-component :zoom="datazoom"/>


            </el-card>
            <el-card style='height: 600px;margin-top: 10px;' :body-style={padding:0}>
              <!-- height:400px -->
              <!-- 1、上标 -->
              <span class="superscript" style="width: 20px; height: 40px;">系统性影响指标分析</span>

              <!-- 3、tab -->
              <el-tabs type="border-card" style='margin: 20px 20px 0 20px;' @tab-click="handleClick">

                <!-- 收益率传染 -->
                <el-tab-pane label="个体风险状态" :lazy='true'>
                <market-risk-component :zoom="datazoom" :title="'个体风险状态'"/>
                </el-tab-pane>

<!--                延迟渲染  lazy true-->
                <!-- 波动传染 -->
                <el-tab-pane label="风险关联与溢出" :lazy='true'>
                  <market-risk-component :zoom="datazoom" :title="'风险关联与溢出'"/>
                </el-tab-pane>

                <el-tab-pane label="市场系统结构" :lazy='true'>
                  <market-risk-component :zoom="datazoom" :title="'市场系统结构'"/>
                </el-tab-pane>

                <el-tab-pane label="市场波动和趋势" :lazy='true'>
                  <market-risk-component :zoom="datazoom" :title="'市场波动和趋势'"/>
                </el-tab-pane>
              </el-tabs>
<!--              <div class="warning-component">-->
<!--                <div class="warning-dates">-->
<!--                  <div class="date-item">前日：<span>{{ prevDayIndex }}</span></div>-->
<!--                  <div class="date-item">昨日：<span>{{ yesterdayIndex }}</span></div>-->
<!--                  <div class="date-item">今日：<span>{{ todayIndex }}</span></div>-->
<!--                  <div class="date-item">明日：<span>{{ tomorrowIndex }}</span></div>-->
<!--                </div>-->
<!--              </div>-->
            </el-card>

        <el-card style="height: 450px;margin-top: 10px" :body-style={padding:0}>
          <span class="superscript" style="width: 20px; height: 20px;">宏观经济指标</span>
          <system-risk-future/>


        </el-card>

            <!--            <market-risk-component/>-->
<!--            <MarketRisk/>-->


      </div>


    </div>
  </template>
  
  <script>
import systemRiskComponent from '@/components/systemRiskComponent';
import marketRiskComponent from "@/components/riskIndexComponent";
import dimensionComponent from "@/components/dimensionComponent";
import systemRiskFuture from "@/components/systemRiskFuture";
export default {
    name:'systematic_risk',
    components:{
      systemRiskFuture,
      dimensionComponent,
      systemRiskComponent,
      marketRiskComponent
},
    data () {
      return {
        datazoom:[],
        compName:'systemRiskComponent',
        prevDayIndex:'',
        yesterdayIndex:'',
        todayIndex:'',
        tomorrowIndex:'',
  state:'个体风险状态'
  }
    },
    mounted(){

    },
    methods:{
      changeComp(mesg){
        this.datazoom=mesg
        console.log(mesg)
      },
      // handleClick(tab, event) {
      //   this.state=tab.label
      // }
      changeState(){
        let lis=['个体风险状态','风险关联与溢出','市场系统结构','市场波动和趋势']
        this.state=lis.indexOf(this.state)+1>3? '个体风险状态':lis[lis.indexOf(this.state)+1]
      }
    },
  }
  </script>
  
  <style lang="less" scoped>
  .button {
    border-radius: 7px;
    width: 160px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    cursor: pointer;
    border: 3px solid rgb(94, 255, 209);
    background-color: rgb(94, 255, 209);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.137);
  }

  .text {

    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    //background-color: rgb(255, 255, 255);
    color: black;
  }

  .arrow path {
    fill: rgb(19, 19, 19);
  }

  .button:hover .arrow {
    animation: slide-in-left 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @keyframes slide-in-left {
    0% {
      transform: translateX(-8px);
      opacity: 0;
    }

    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  .button:active {
    transform: scale(0.97);
  }
  .warning-component {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    text-align: center;

    margin: auto;
  }

  .warning-dates {
    display: flex;
    justify-content: space-between;
    //margin-bottom: 10px;
  }

  .date-item {
    margin: 0 10px;
    font-weight: bold;
  }

  .warning-recent {
    color: #ff4d4f;
    font-weight: bold;
    margin-bottom: 10px;
  }

  </style>
  