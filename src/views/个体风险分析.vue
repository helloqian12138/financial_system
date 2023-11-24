<!-- 个体风险分析 -->
<template>
  <div>
    <div>
        <el-card style='height: auto;' :body-style={padding:0}> 
       <!-- height:400px -->
       <!-- 1、上标 -->
        <span class="superscript" style="width: 20px; height: 40px;">个体风险分析</span>
        <!-- 2、产品搜索栏 -->

        <div class="form">
                                                         <!-- inline="true"表单域在一行 -->
            <el-form :inline="true"  class="demo-form-inline" :model="formInline" ref="formInline">
              <el-form-item label="市场">
                <el-select  v-model="formInline.market">
                  <el-option label="股票" value="股票"></el-option>
                  <el-option label="基金" value="基金"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="行业" >
                <el-select   v-model="formInline.industry">
                  <el-option v-for="item in options_industry" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <quter-component v-model="formInline.quarter_year" placeholder="选择季度" />
<!--              <el-form-item label="开始时间">-->
<!--                <el-date-picker-->
<!--                    v-model="formInline.start_date"-->
<!--                    type="date"-->
<!--                    placeholder="年/月/日" -->
<!--                    size="mini">-->
<!--                </el-date-picker>-->
<!--              </el-form-item>-->

<!--              <el-form-item label="结束时间">-->
<!--              <el-date-picker-->
<!--                  v-model="formInline.end_date"-->
<!--                  type="date"-->
<!--                  placeholder="年/月/日" -->
<!--                  size="mini">-->
<!--              </el-date-picker>-->
<!--            </el-form-item>-->
              <el-form-item>
                <el-button class="grayish_btn" @click="onSubmit" size="mini">查询</el-button>
              </el-form-item>
          </el-form>
        </div>


        <!-- 3、个体风险分析返回数据 -->
        <div class="content">
          <el-table
              :data="tableData"
              style="width: 100%;padding: 0px 20px 0px 20px;"
              :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
              border  

              
              :row-style="{height:'28px'}"
              :cell-style="{padding:'0px'}"
              header-row-class-name="active_header"
              header-cell-class-name="active_header"
              cell-class-name="content_center">
            
              <el-table-column
              prop="name"
              label="公司名称"
              width="100">
            </el-table-column>
            <el-table-column label="风险水平">
              <el-table-column
                prop="财务杠杆"
                label="财务杠杆"
                sortable
                width="70">
              </el-table-column>
              <el-table-column
                prop="经营杠杆"
                label="经营杠杆"
                sortable
                width="70">
              </el-table-column>
              <el-table-column
                prop="综合杠杆"
                label="综合杠杆"
                sortable
                width="70">
              </el-table-column>
              <el-table-column
                prop="流动比率"
                label="流动比率"
                sortable
                width="70">
              </el-table-column>
            </el-table-column>
              <el-table-column label="（一）流动风险">
                <el-table-column
                  prop="速动比率"
                  label="速动比率"
                  sortable
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="应收账款周转天数(天)"
                  label="应收账款周转天数（天）"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="流动风险综合指数"
                  label="流动风险综合指数"
                  width="120"
                  sortable>
                </el-table-column>
              </el-table-column>

              <el-table-column label="（二）市场风险">
                <el-table-column
                  prop="在险价值"
                  label="在险价值"
                  sortable
                  width="120">
                </el-table-column>
              </el-table-column>

                <el-table-column label="（三）经营风险">
                  <el-table-column
                    prop="资产收益率标准差"
                    label="资产收益率标准差"
                    sortable
                    width="120">
                  </el-table-column>
              </el-table-column>

              <el-table-column label="（四）信用风险">
                  <el-table-column
                    prop="资产负债率"
                    label="资产负债率"
                    sortable
                    width="100">
                  </el-table-column>

                  <el-table-column
                    prop="投资盈利率"
                    label="投资盈利率"
                    sortable
                    width="100">
                  </el-table-column>

              </el-table-column>
            <el-table-column
                prop="声誉风险综合指数"
                label="声誉风险"
                width="100">
            </el-table-column>
            <el-table-column
                prop="政策风险综合指数"
                label="政策风险"
                width="100">
            </el-table-column>
            <el-table-column
                prop="法律风险综合指数"
                label="法律风险"
                width="100">
            </el-table-column>
            <el-table-column
                prop="操作风险综合指数"
                label="操作风险"
                width="100">
            </el-table-column>
              <el-table-column
              prop="综合风险等级"
              label="综合风险等级"
              width="100">
            </el-table-column>


          </el-table>


        </div> 

        <!-- 4、说明card -->
        <el-card style='height: 500px; margin: 10px 20px 2px 20px;background-color: rgba(200, 200, 200, 0.812);'>
          <span class="kala_text" >
            指标说明：

            一、风险水平

            1.杠杆用来评价企业的风险，一定要结合收入的变动、业务的变动，光看杠杆大小是没有意义的，杠杆只是将这种变动放大，或者向上放大，或者向下放大。

            2.具体指标有：

            1）财务杠杆：由于债务融资产生的固定利息费用的存在，使得息税前利润的变动引起每股收益产生更大变动程度的现象。财务杠杆越大，负债带来的利息抵税作用也越大，同时财务风险也会提高。

            2）经营杠杆：由于存在固定性经营成本，销售收入的较小变动会引起息税前利润较大的变动的现象。经营杠杆率越高，利润变动越剧烈，企业的经营风险越大。

            3）综合杠杆：综合杠杆，是经营杠杆和财务杠杆结合在一起共同发挥的连锁作用，可以用于衡量销售量的变动对普通股每股收益变动的影响程度。

            二、流动性风险

            1.流动性风险是指由于资金筹措不力，现金流动不畅，发生停滞、断流等，不能偿还到期债务形成的风险。

            2.具体指标有：

            1）流动比率：用来衡量企业流动资产在短期债务到期以前，可以变为现金用于偿还负债的能力。流动比率越高，说明企业资产的变现能力越强，流动性风险越低。

            2）速动比率：是衡量企业流动资产中可以立即变现用于偿还流动负债的能力。速动比率越高，流动性风险越低。

            3）应收账款周转天数(天)：应收账款周转天数表示在一个会计年度内，应收账款从发生到收回周转一次的平均天数（平均收款期）。应收账款周转天数越短，流动性风险越低。

            4）流动风险综合指数：即对上述3个指标进行指标合并，所获得的综合指标，流动风险综合指数越大，该公司遭受流动风险的可能性越小。

            三、市场风险

            1.市场风险是指未来市场价格(利率、汇率、股票价格和商品价格)的不确定性对企业实现其既定目标的不利影响。(对于一般上市公司市场风险 主要体现在股价的收益率上)

            2.具体指标有：

            1）风险价值(VaR)：在一定概率水平（置信度）下，某一金融资产或证券组合价值在未来特定时期内的最大可能损失。风险价值越大，该公司遭受市场风险的可能性越小。

            四、经营风险

            1.经营风险是由于生产经营变动或市场环境改变导致企业未来的经营性现金流量发生变化，从而影响企业的市场价值的可能性。

            2.具体指标有：

            1）资产收益率标准差：资产收益率是衡量银行盈利能力的一个指标，资产收益率的标准差则表示收益的波动性，可以用其衡量经营风险。资产收益率标准差越大，说明收益的波动性越大，即该公司的经营风险的可能性越大。

            五、信用风险

            1.信用风险是借款人因各种原因未能及时、足额偿还债务或银行贷款而违约的可能性。发生违约时，债权人或银行必将因为未能得到预期的收益而承担财务上的损失。

            2.具体指标有：

            1）资产负债率：反映在总资产中有多大比例是通过借债来筹资的。资产负债率越大，信用风险越大。

            2）资产报酬率：资产报酬率越高，表明企业投入产出的水平越好，企业的资产运营越有效。资产报酬率越高，该公司遭受信用风险的可能性越小。

            3）信用风险综合指数：即对上述2个指标进行指标合并，所获得的综合指标，信用风险综合指数越大，该公司遭受信用风险的可能性越小。

            六、资产负债风险

            1.资产负债风险是指当负债所取得的经营收益不足以抵偿负债的资金成本时所产生的财务风险。

            2.具体指标有：

            1）资产负债率：如果资产负债比率达到100%或超过100%，说明公司已经没有净资产或资不抵债。因此，资产负债率越大，该公司遭受资产负债风险的可能性越大。

            七、获现风险

            1.获现风险是企业利用各种资源获取现金出现问题的可能性。

            2.具体指标有：

            1）销售现金比率：反映每元销售得到的净现金流入量。销售现金比率越大，获现风险越小。

            2）每股营业现金流量：反映每股经营所得到的净现金。每股营业现金流量越大，获现风险越小。

            3）全部资产现金回收率：说明企业资产产生现金的能力。全部资产现金回收率越大，获现风险越小。

            4）获现风险综合指数：即对上述3个指标进行指标合并，所获得的综合指标，获现风险综合指数越大，该公司遭受获现风险的可能性越小。
          </span>
        </el-card>
      </el-card>
      </div>
  </div>
</template>

<script>
import quterComponent from "@/components/quterComponent";
import http from '../utils/request'
export default {
  components:{
    quterComponent
  },
  data () {
    return {
      options_industry: [{'value': '房地产业', 'label': '房地产业'}, {'value': '软件和信息技术服务业', 'label': '软件和信息技术服务业'}, {'value': '互联网和相关服务', 'label': '互联网和相关服务'}, {'value': '电信、广播电视和卫星传输服务', 'label': '电信、广播电视和卫星传输服务'}, {'value': '生态保护和环境治理业', 'label': '生态保护和环境治理业'}, {'value': '公共设施管理业', 'label': '公共设施管理业'}, {'value': '铁路、船舶、航空航天和其他运输设备制造业', 'label': '铁路、船舶、航空航天和其他运输设备制造业'}, {'value': '非金属矿物制品业', 'label': '非金属矿物制品业'}, {'value': '计算机、通信和其他电子设备制造业', 'label': '计算机、通信和其他电子设备制造业'}, {'value': '汽车制造业', 'label': '汽车制造业'}, {'value': '金属制品业', 'label': '金属制品业'}, {'value': '农副食品加工业', 'label': '农副食品加工业'}, {'value': '电气机械和器材制造业', 'label': '电气机械和器材制造业'}, {'value': '石油加工、炼焦和核燃料加工业', 'label': '石油加工、炼焦和核燃料加工业'}, {'value': '有色金属冶炼和压延加工业', 'label': '有色金属冶炼和压延加工业'}, {'value': '医药制造业', 'label': '医药制造业'}, {'value': '专用设备制造业', 'label': '专用设备制造业'}, {'value': '化学纤维制造业', 'label': '化学纤维制造业'}, {'value': '通用设备制造业', 'label': '通用设备制造业'}, {'value': '化学原料及化学制品制造业', 'label': '化学原料及化学制品制造业'}, {'value': '造纸及纸制品业', 'label': '造纸及纸制品业'}, {'value': '橡胶和塑料制品业', 'label': '橡胶和塑料制品业'}, {'value': '酒、饮料和精制茶制造业', 'label': '酒、饮料和精制茶制造业'}, {'value': '其他制造业', 'label': '其他制造业'}, {'value': '纺织业', 'label': '纺织业'}, {'value': '家具制造业', 'label': '家具制造业'}, {'value': '印刷和记录媒介复制业', 'label': '印刷和记录媒介复制业'}, {'value': '黑色金属冶炼和压延加工业', 'label': '黑色金属冶炼和压延加工业'}, {'value': '食品制造业', 'label': '食品制造业'}, {'value': '废弃资源综合利用业', 'label': '废弃资源综合利用业'}, {'value': '木材加工及木、竹、藤、棕、草制品业', 'label': '木材加工及木、竹、藤、棕、草制品业'}, {'value': '纺织服装、服饰业', 'label': '纺织服装、服饰业'}, {'value': '仪器仪表制造业', 'label': '仪器仪表制造业'}, {'value': '文教、工美、体育和娱乐用品制造业', 'label': '文教、工美、体育和娱乐用品制造业'}, {'value': '皮革、毛皮、羽毛及其制品和制鞋业', 'label': '皮革、毛皮、羽毛及其制品和制鞋业'}, {'value': '综合', 'label': '综合'}, {'value': '土木工程建筑业', 'label': '土木工程建筑业'}, {'value': '房屋建筑业', 'label': '房屋建筑业'}, {'value': '建筑装饰和其他建筑业', 'label': '建筑装饰和其他建筑业'}, {'value': '建筑安装业', 'label': '建筑安装业'}, {'value': '批发业', 'label': '批发业'}, {'value': '零售业', 'label': '零售业'}, {'value': '电力、热力生产和供应业', 'label': '电力、热力生产和供应业'}, {'value': '燃气生产和供应业', 'label': '燃气生产和供应业'}, {'value': '水的生产和供应业', 'label': '水的生产和供应业'}, {'value': '商务服务业', 'label': '商务服务业'}, {'value': '道路运输业', 'label': '道路运输业'}, {'value': '航空运输业', 'label': '航空运输业'}, {'value': '水上运输业', 'label': '水上运输业'}, {'value': '铁路运输业', 'label': '铁路运输业'}, {'value': '邮政业', 'label': '邮政业'}, {'value': '仓储业', 'label': '仓储业'}, {'value': '装卸搬运和运输代理业', 'label': '装卸搬运和运输代理业'}, {'value': '卫生', 'label': '卫生'}, {'value': '广播、电视、电影和影视录音制作业', 'label': '广播、电视、电影和影视录音制作业'}, {'value': '新闻和出版业', 'label': '新闻和出版业'}, {'value': '文化艺术业', 'label': '文化艺术业'}, {'value': '体育', 'label': '体育'}, {'value': '有色金属矿采选业', 'label': '有色金属矿采选业'}, {'value': '煤炭开采和洗选业', 'label': '煤炭开采和洗选业'}, {'value': '黑色金属矿采选业', 'label': '黑色金属矿采选业'}, {'value': '石油和天然气开采业', 'label': '石油和天然气开采业'}, {'value': '开采辅助活动', 'label': '开采辅助活动'}, {'value': '非金属矿采选业', 'label': '非金属矿采选业'}, {'value': '住宿业', 'label': '住宿业'}, {'value': '餐饮业', 'label': '餐饮业'}, {'value': '科技推广和应用服务业', 'label': '科技推广和应用服务业'}, {'value': '专业技术服务业', 'label': '专业技术服务业'}, {'value': '研究和试验发展', 'label': '研究和试验发展'}, {'value': '教育', 'label': '教育'}, {'value': '林业', 'label': '林业'}, {'value': '农、林、牧、渔服务业', 'label': '农、林、牧、渔服务业'}, {'value': '畜牧业', 'label': '畜牧业'}, {'value': '渔业', 'label': '渔业'}, {'value': '农业', 'label': '农业'}, {'value': '机动车、电子产品和日用产品修理业', 'label': '机动车、电子产品和日用产品修理业'}],
// 表单-个体风险分析
  formInline: {
        market:'',
        industry:'',
        quarter_year:'',
    },
      //个体风险分析表格
      tableData: [
  {  
      name:'秦农商行',
      },
      {  
      name:'华夏商行',
      },
      ],
    }
  },
  mounted(){
  },
  methods:{
      // part2的提交
      onSubmit() {
    console.log("个体风险分析")
    http.get(
            "/risk/risk_individual/",
            {params:{
                industry: this.formInline.industry,//行业
                market: this.formInline.market,//省or市场
                date:this.formInline.quarter_year,
    }}).then(response => {
        this.tableData= response.data.data
        console.log(response)
        console.log(response.data)

      })
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
