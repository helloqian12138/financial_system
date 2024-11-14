<!-- 11.6合并版 -->
<template>
  <div>
    <div class="form">
                                                        <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  :model="formInline1" class="demo-form-inline">
            <el-form-item label="公司名称">
              <el-input  v-model="formInline1.company" placeholder="全称或简称" size="mini"></el-input>
<!--              搜索联想-->
<!--              <el-autocomplete-->
<!--                  class="inline-input"-->
<!--                  v-model="formInline1.company"-->
<!--                  :fetch-suggestions="querySearch"-->
<!--                  placeholder="公司名称"-->
<!--                  size="mini"-->
<!--              ></el-autocomplete>-->
            </el-form-item>

            <el-form-item label="事件类型">
              <el-select   v-model="formInline1.event_type" placeholder="事件类型：" size="mini">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker  v-model="formInline1.start_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
            </el-form-item>

            <el-form-item label="结束时间">
              <el-date-picker v-model="formInline1.end_date" type="date" placeholder="年-月-日" size="mini"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button class="grayish_btn" @click="onSubmit1" icon="el-icon-search" size="mini">查询</el-button>
            </el-form-item>
          </el-form>
    </div>

    <div class="one">
      <el-card class="card" style='height: 1000px;' :body-style={padding:0}> 
       <!-- height:400px -->
       <!-- 1、上标 -->
        <span class="superscript" style="width: 20px; height: 40px;">事件分析</span>
        <!-- 2、返回数据（图表） -->
        <div  class="content">
          <el-empty description="" v-if="noNews"></el-empty>
          <el-table class='table' :data="tableData" :fit='true' :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
              border
              height="900"
                    style="width: 100%"
              v-if="!noNews"
              :row-style="{height:'28px'}"
              :cell-style="{padding:'0px'}"
              header-row-class-name="active_header"
              header-cell-class-name="active_header"
              cell-class-name="content_center">

                <el-table-column v-for="(val, key) in tableLabel" :prop="key"  :label="val"
                                 :width="widthDict(key)"
                                 v-show="tableData.length!==0" />

                <!-- <el-table-column v-for='(val,key) in tableLabel' :prop="key" :label="val" :width=calculateColumnWidth(val) />插槽里面没有东西就可以用单标签  -->
                                                                              <!-- :min-width="calculateColumnWidth(key)"可以省略展示较多的文字内容 -->

                <el-table-column
                    prop="scale"
                    label="操作">
                    <template slot-scope="scope">
                      <span class="text" v-on:click="detail(scope.row)">查看详情</span>
                    </template>
                </el-table-column>
        </el-table>
        </div> 
      </el-card>

      <!-- 详情页 -->
      <div>
          <!-- 详细信息弹窗，默认关闭 -->
          <el-dialog 
            :visible.sync="detailsdialog"  
            @open="open()"
            width="90%">
            <!-- 详情页part1 -->
            <el-card class="card" :body-style={padding:0}>
               <!-- 1-上标 -->
              <span class="superscript" style="width: 20px; height: 40px;">事件详情</span>
                <!-- 1-表 -->
              <el-table class='detail_table1' :data="detailData_table1" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
                border
                height="300px"
                :default-expand-all="true"     
                :row-style="{height:'28px'}"
                :cell-style="{padding:'0px'}"
                header-row-class-name="active_header"
                header-cell-class-name="active_header"
                cell-class-name="content_center">
                
                <el-table-column v-for='(val,key) in detailLabel_table' :prop="key" :label="val" :min-width="calculateColumnWidth(key)" /><!--插槽里面没有东西就可以用单标签  -->
              </el-table>
<!--              没显示正文-->
              <div style="height: 100% ;margin: 20px;">
                <h4 style="margin-bottom: 5px;">事件正文：</h4>
                <span style="display:block;text-indent:2em;line-height: 25px; ">{{this.detail_content}}</span> <!-- 首行缩进 -->
              </div>
            </el-card >

            <!-- 详情页part2 -->
            <el-card class="card" :body-style={padding:0}>
               <!-- 2-上标 -->
              <span class="superscript" style="width: 20px; height: 40px;">事件热度分析</span>
                <!-- 2-表单 -->
                <div class="form">
                                                        <!-- inline="true"表单域在一行 -->
                  <el-form :inline="true"  :model="formInline2" class="demo-form-inline">
                    <el-form-item label="关联公司名：">
                      <el-select v-model="formInline2.detail_company" placeholder="选择公司：" size="mini">
                        <el-option v-for="item in option_detail_company" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="间隔时间：">
                      <el-select v-model="formInline2.detail_time" placeholder="选择时间：" size="mini">
                        <el-option v-for="item in option_detail_time" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                      <el-button class="grayish_btn" @click="detail_onSubmit1" icon="el-icon-search" size="mini">查询</el-button>
                    </el-form-item>
                  </el-form>
              </div>
              <!-- 2-图 -->
              <div class="flex-charts">
                <div ref="echarts_2" style="height:300px;width:1000px; border: 1px solid #e0e0e0;margin:20px"></div>

                <div ref="echarts_3" style="height:300px;width:1000px; border: 1px solid #e0e0e0;margin:20px"></div>
              </div>
              <!-- <span>
                公司1xx事件一天时间内，在中国证券报的7时刻达到热度峰值，当前的热度状态为下降，预测未来一小时内的热度趋势为下降
              </span> -->

             
            </el-card >

              <!-- 详情页part3 -->
              <el-card class="card" :body-style={padding:0}>
               <!-- 3-上标 -->
              <span class="superscript" style="width: 20px; height: 40px;">其他关联事件</span>
                <!-- 3-表单 -->
                <div class="form">
                                                        <!-- inline="true"表单域在一行 -->
                  <el-form :inline="true"  :model="formInline3" class="demo-form-inline">
                    <el-form-item label="选择事件对象：">
                      <el-select v-model="formInline3.detail_company" placeholder="选择事件对象：" size="mini">
                        <el-option v-for="item in option_detail_company" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>

<!--                    <el-form-item label="事件相关：">-->
<!--                      <el-checkbox v-model="formInline3.related_event">本公司相关其他事件</el-checkbox>-->
<!--                      &lt;!&ndash; <el-radio v-model="radio" label="2">备选项</el-radio> &ndash;&gt;-->
<!--                    </el-form-item>-->

                    <el-form-item label="选择时间：">
                      <el-select v-model="formInline3.detail_time" placeholder="选择时间：" size="mini">
                        <el-option v-for="item in option_detail_time" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                      <el-button class="grayish_btn" @click="detail_onSubmit2" icon="el-icon-search" size="mini">查询</el-button>
                    </el-form-item>
                  </el-form>
              </div>
              
              <!-- 3-表 -->
              <el-table class='detail_table2' :data="detailData_table2" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
                border
                height="600"   
                :row-style="{height:'28px'}"
                :cell-style="{padding:'0px'}"
                header-row-class-name="active_header"
                header-cell-class-name="active_header"
                cell-class-name="content_center">
                
                <el-table-column v-for='(val,key) in detailLabel_table' :prop="key" :label="val" :min-width="calculateColumnWidth(key)" /><!--插槽里面没有东西就可以用单标签  -->
              </el-table>
            </el-card >

              <!-- 详情页part4 -->
              <el-card class="card" :body-style={padding:0}>
               <!-- 4-上标 -->
              <span class="superscript" style="width: 20px; height: 40px;">总体情感分析</span>
                <!-- 2-表单 -->
                <div class="form">
                                                        <!-- inline="true"表单域在一行 -->
                  <el-form :inline="true"  :model="formInline4" class="demo-form-inline">
                    <el-form-item label="选择事件对象：">
                      <el-select v-model="formInline4.detail_company" placeholder="选择事件对象：" size="mini">
                        <el-option v-for="item in option_detail_company" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="选择时间：">
                      <el-select v-model="formInline4.detail_time" placeholder="选择时间：" size="mini">
                        <el-option v-for="item in option_detail_time" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                      <el-button class="grayish_btn" @click="detail_onSubmit3" icon="el-icon-search" size="mini">查询</el-button>
                    </el-form-item>
                  </el-form>
              </div>
              <!-- 2-图 -->
              <div class="flex-charts">
                <div ref="echarts_4" style="height:300px;width:2000px; border: 1px solid #e0e0e0;margin:20px"></div>

              </div>


             
            </el-card >



        </el-dialog>
      </div>  <!-- 详情页结束 -->
    </div> <!-- 上一个板块结束 -->
  </div>




  
</template>

<script >
import qs from 'qs'
// import { getData } from "../api";
import * as echarts from "echarts"
// import pagination from '@/components/pagination.vue'
import http from '../utils/request'
import {Loading} from "element-ui";
export default {
  name:"eventBase",
  components:{

  },
  data() {
    return {
// 【接收数据】
      sentiment:[],
      clout:[],
      targetId:'',
      formInline1: {
          company: '',
          event_type: '',
          start_date:'',
          end_date:'',
        },
        // 详情页(3个)
        formInline2: {
          detail_company:'',
          detail_time:'',
        },
        formInline3: {
          detail_company:'',
          related_event: false,// Checkbox 多选框单独使用可以表示两种状态之间的切换,初始化为关闭
          detail_time:'',
        
        },
        formInline4: {
          detail_company:'',
          detail_time:'',
        },


// 【选择框】
      options: [
        {
          value: '',
          label: '全部'
        },
          {
        value: '股权增持',
        label: '股权增持'
      }, {
        value: '股东减持',
        label: '股东减持'
      }, {
        value: '股权质押',
        label: '股权质押'
      }, {
        value: '其他',
        label: '其他'
      },
    {
      value: '重大财产损失',
          label: '重大财产损失'
    },
        {
          value: '重大安全事故',
          label: '重大安全事故'
        },
        {
          value: '股权冻结',
          label: '股权冻结'
        },
        {
          value: '高层死亡',
          label: '高层死亡'
        },
        {
          value: '破产清算',
          label: '破产清算'
        },
        {
          value: '重大对外赔付',
          label: '重大对外赔付'
        },

    ],//issue_type只有  增持事件 减持事件 股权质押  
    
      option_detail_company: [{
        value: '公司1',
        label: '公司1'
      }, {
        value: '公司2',
        label: '公司2'
      }],
      option_detail_time: [{
        value: '一天内',
        label: '一天内'
      }, {
        value: '近三天',
        label: '近三天'
      }
      , {
        value: '一周内',
        label: '一周内'
      }
      , {
        value: '一个月内',
        label: '一个月内'
      }
      , {
        value: '一年内',
        label: '一年内'
      }
    ],
      option_prediction: [
      {
          value: '一小时内',
          label: '一小时内'
        }, {
          value: '三小时内',
          label: '三小时内'
        }
        , {
          value: '六小时内',
          label: '六小时内'
        }
        , 
        {
          value: '一天内',
          label: '一天内'
        }, {
          value: '近三天',
          label: '近三天'
        }
        , {
          value: '一周内',
          label: '一周内'
        }
        , {
          value: '一个月内',
          label: '一个月内'
        }
        , {
          value: '一年内',
          label: '一年内'
        }
      ],




// 【表格】
      tableLabel: {
                  order: '事件id',
                  type: '事件类型',
                  objects: '涉及对象',
                  title: '事件标题',
                  abstract:'事件摘要',
                  keyword:'事件关键词',
                  publish_time:'发布时间',
                  event_heat:'事件热度',
                  risk_grade:'风险等级',

        },
  
      tableData: [
        { order: 1,
          type: '',
          objects: [
          ],
          title: '',
          abstract:'',
          keyword:'',
          publish_time:'',
          event_heat:'',
          risk_grade:'',}
      ],
      noNews:true,



// 【详情页】
    detailsdialog: false,// 详情页是否打开的判断标签
    // 表格
      detailLabel_table: {
          objects: '涉及对象',
          title: '事件标题',
          abstract:'事件摘要',
          keyword:'事件关键词',
          // content:'事件正文',
          site_name:'发布渠道',
          // sentiment:'情感倾向',
          url:'报导链接',
          publish_time:'发布时间',
          potiential_risks:'潜在风险',
          // risk_grade:'风险等级',

      },

      detailData_table1: [
      { order: 735, risk_grade: '积极' },
        { order: 735, risk_grade: '消极' }],                  



      detailData_table2: [],

      // 详情页事件内容
      detail_content:'作者：周立 张昕迎8月31日晚间8点左右，中国人民银行、国家金融监督管理总局联合发布《关于降低存量首套住房贷款利率有关事项的通知》。据有关负责人介绍，符合条件的存量首套住房贷款是指，2023年8月31日前金融机构已发放，已签订合同但未发放的，以及借款人实际住房情况符合所在城市首套住房标准的存量住房商业性个人住房贷款。对于符合条件的存量住房贷款，自2023年9月25日起，可由借款人主动向承贷银行提出申请，也鼓励银行以发布公告、批量办理等方式，为借款人提供更为便利的服务。调整方式上，既可以变更合同约定的住房贷款利率加点幅度，也可以由银行新发放贷款置换存量贷款。具体利率调整幅度由借贷双方协商确定，但调整后的利率，不能低于原贷款发放时所在城市的首套住房贷款利率政策下限。新发放贷款只能用于偿还存量贷款，仍纳入商业性个人住房贷款管理。“恨不得明天就是9月25日”对于“高位站岗”买房者来说，这是不亚于过年的好消息。8月31日晚间，广州市民唐轩（化名）告诉时代财经，其在2020年下半年购置首套房，当时贷款利率是LPR+30BP，而当时了解到最低的是LPR+15BP。面对高BP，唐轩看到无数人通过其他途径置换房贷时总会忍不住心动，但又觉得风险太大，于是静静等待存量降的消息。看到今天政策发布的那一刻，除了兴奋，唐轩内心还有一丝担忧，“恨不得明天就是9月25日，我现在就担心到时候要排队。”家里有首套房贷款的张威（化名）也关注到了这个重磅消息，连夜微信询问银行个贷经理，当前是否有资格办理相关业务，对方表示，“目前无法回答，我们银行还没出政策呢。”但对于2021年成为“站岗者”的刘颖（化名）来说，兴奋程度并不如前几位买房者，“这是件好事，但估计比较难申请，协商也会很麻烦，而且肯定是要排队的。”刘颖告诉时代财经，自己是LPR+20BP，广州2021年首套房最低利率应该就是LPR，“申请的话，可能最多低0.2BP，估计能降0.1BP就不错了。”不过，也有买房者研究完政策后，感觉自己没有“捡到便宜”。“当时我是LPR+35BP，也是当年北京执行的首套房的最低利率，现在执行的是LPR+55BP。”不论如何，近年来我国房地产市场供求关系发生了重大变化，借款人和银行对于有序调整优化资产负债均有诉求。存量住房贷款利率的下降，对借款人来说，可节约利息支出，有利于扩大消费和投资。对银行来说，可有效减少提前还贷现象，减轻对银行利息收入的影响。同时，还可压缩违规使用经营贷、消费贷置换存量住房贷款的空间，减少风险隐患。事实上，对于存量房贷利率调整，近期国内多家银行早有预热。8月28日，招商银行召开上半年业绩会，该行行长助理彭家文表示，央行对于存量房贷利率调整从鼓励和支持变为了指导，所以存量房贷利率下调是大概率事件，招行已经制定了相应的预案，但因为有较多因素需要兼顾，所以尚未确定最终方案。8月31日，邮储银行零售业务总监梁世栋也回应称，重定价对包括该行在内的整个银行业个人住房贷款会有一定影响，但利率下调之后，对提前还款会有一定抵补作用，同时对提振市场信心也有一定作用。工商银行、农业银行均在8月31日晚公告称，正在积极依法有序开展存量首套个人住房贷款利率调整的准备工作。有效缓解提前还贷问题若存量房贷利率调整在9月25日起全面落实，会给银行带来什么影响？8月31日晚间，开源证券银行首席分析师刘呈祥在接受时',
   

      // 图数据
      // 查看详情-card2-事件热度分析
      circularData1: [
                  { value: 735, name: '积极' },
                  { value: 735, name: '消极' }
                  // { value: 580, name: 'Email' },
                  // { value: 484, name: 'Union Ads' },
                  // { value: 300, name: 'Video Ads' }
        ],
      circularData2: [
                { value: 4445, name: '积极' },
                { value: 735, name: '消极' }
                // { value: 580, name: 'Email' },
                // { value: 484, name: 'Union Ads' },
                // { value: 300, name: 'Video Ads' }
      ],


  }
}, 
    mounted(){
    // if ( JSON.stringify(sessionStorage.getItem('eventData')) !== "{}")
    //   this.tableData=JSON.parse(sessionStorage.getItem('eventData'))
    //
    //   let target=JSON.parse(sessionStorage.getItem('target'))
    //   if (target.length!==0) {
    //     // console.log(1)
    //     console.log(target)
    //     this.formInline1.company = target[0]
    //     this.formInline1.event_type = target[1]
    //     this.formInline1.start_date = target[2]
    //     this.formInline1.end_date = target[3]
    //   }

          
    },

    

  methods:{
    // 调整表格列宽
    calculateColumnWidth(prop) {
      console.log(prop)
      const text = String(this.tableData[0][prop]); // 使用第一行的数据作为示例
      const calculatedWidth = text.length;
      console.log(calculatedWidth)
      // console.log('console.log(calculatedWidth):',calculatedWidth)
      if(calculatedWidth>10 && calculatedWidth<=50){
        const baseWidth= 20 + calculatedWidth * 0.9
        return `${baseWidth}px`;
      }
      if(calculatedWidth<=10){
        const baseWidth= 20
        return `${baseWidth}px`;
      }
      else{
        const baseWidth= 20 + calculatedWidth * 0.5
        return `${baseWidth}px`;
      }
    },

    widthDict(key){
      let dic={'title':200,
              'type':80,
        'objects': 150,

        'abstract':800,
        'keyword':100,
        // content:'事件正文',
        // site_name:'发布渠道',
        // sentiment:'情感倾向',
        // url:'报导链接',
        publish_time:'发布时间',
        potiential_risks:'潜在风险',


      }
return `${dic[key]}px`;

    },
  
    //新闻联想搜索
    querySearch(queryString, cb) {
      // console.log(queryString)
      // console.log(cb)
      http.get(
          "/search/search_news/?name=?"+queryString,

          // paramsSerializer: params => {
          //   return qs.stringify(params, { indices: false })
      ).then(response => {
        // console.log(response.data)
        // console.log(cb)
        let result=response.data
        let re=[]
        for (let i of result){
          re.push({"value":i})
        }
        cb(re)
      })},
    // 1、表
    onSubmit1(){//事件分析
      let options={
        text:'请稍等'
      }
      let loadingInstance = Loading.service(options);
        http.get(
                "/event2/event_analyse/",
                {params:{
                    name: this.formInline1.company,
                    event_type:this.formInline1.event_type,
                    start:this.formInline1.start_date,
                    end:this.formInline1.end_date,
                    need:0
        }}).then(response => {
          if(response.data.data.length!==0)
          { this.tableData = response.data.data
              this.noNews=false}
          else {
            this.tableData= [
              { order: 1,
                type: '',
                objects: [

                ],
                title: '',
                abstract:'',
                keyword:'',
                publish_time:'',
                event_heat:'',
                risk_grade:'',}
            ]
          this.noNews=true}
          // sessionStorage.removeItem('eventData')
          // sessionStorage.setItem('eventData',JSON.stringify(this.tableData))
          // sessionStorage.removeItem('target')
          // sessionStorage.setItem('target',JSON.stringify([this.formInline1.company,this.formInline1.event_type,this.formInline1.start_date,this.formInline1.end_date]))
          // console.log(this.tableData)
          //关系图
          //基于准备好的dom，初始化echarts实例
          // var ROOT_PATH = 'https://echarts.apache.org/examples';
         
      loadingInstance.close()
          }).finally(()=>loadingInstance.close())
       },


// 3、查看详情-card1（表）表格点击查看详情
    detail(row){
      let tmp=[]
      this.option_detail_company.length=0
      // console.log(row.order)//返回银行id
      this.targetId=row.order
      for (let i in this.tableData)
        if (this.targetId===this.tableData[i].order)
          tmp=this.tableData[i].objects
      for (let i in tmp)
      this.option_detail_company.push({value:tmp[i],label:tmp[i]})
      // console.log(this.option_detail_company)
      //这个地方需要连一个新接口
      //提供弹窗的数据
      this.detailsdialog = true//打开弹窗
      http.get(
                "/event2/event_detail/",
                {params:{
                    event_id: row.order,//新闻id 是吗？

        }}).then(response => {
            this.detailData_table1 = Array(response.data.data[this.targetId])
            this.detail_content=response.data.data[this.targetId].content[0]
            console.log(response.data.data)
            // console.log(response.data)
        http.get(
            "/event2/event_clout_analyse/",//修改接口名称
            {params:{
                company: this.formInline1.company,
                // delta:this.formInline2.detail_time,
                event_id:this.targetId
              }}).then(response => {
          this.clout = response.data.data
          // console.log(this.clout)
          // 详情页的，面积图
          const echarts2 = echarts.init(this.$refs.echarts_2)
          const option_2={
            // 右上角存图
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            title: {
              text: '事件热度分析'
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
            // legend: {
            //   data: ['渠道1', '渠道2', '渠道3']
            // },
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
                data: this.clout.date,
                name: '日'
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '渠道1',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: this.clout.value
              }

            ]
          }
          echarts2.setOption(option_2)
        })
          })

      
    },

// 4、5-查看详情-card2（面积图、环形图）（缺）
    detail_onSubmit1(){//详情页表单查询-事件热度分析(待修改)
          // })
      if (this.sentiment.length!==0)
        this.sentiment.length=0
        //5、查看详情-card2（环形图）
        http.get(
                "/event2/sentiment_analyse/",
                {params:{//修改接口
                    delta: this.formInline2.detail_time,//选择时间：间隔时间
                    other_name:this.formInline2.detail_company,//关联公司名
                    detail:0
        }}).then(response => {
          if (JSON.stringify(response.data.data)==='{}')
            alert('暂无数据')
          else
            // console.log(Array(response.data.data))
            for(let i in response.data.data)
            { if (i==='FAVOR')
              this.sentiment.push({name:'赞成',value:response.data.data[i]})
              if (i==='NONE')
            this.sentiment.push({name:'中立',value:response.data.data[i]})
              if (i==='AGAINST')
            this.sentiment.push({name:'反对',value:response.data.data[i]})}
            // console.log(this.sentiment)
            this.initEcharts1()
          })
       },



 
// 6、查看详情-card3（表）
       detail_onSubmit2(){//详情页表单查询-其他关联事件
        // console.log('其他关联事件-表格')
        http.get(
                "/event2/other_events/",
                {params:{
                    delta: this.formInline3.detail_time,
                    event_id:this.targetId,
                    other_name:this.formInline3.detail_company,
        }}).then(response => {
            // console.log(response.data)
          if (response.data.data.length===0)
            alert('暂无数据')
          else
            this.detailData_table2=response.data.data
          })
       },
// 7、8 查看详情-card4（曲线图、环形图）
       detail_onSubmit3(){//详情页表单查询-总体情感分析(待修改)
        console.log('总体情感分析-曲线图')
        http.get(
            "/event2/sentiment_analyse/",
                {params:{
                    other_name: this.formInline4.detail_company,
                    delta:this.formInline4.detail_time,
                    detail:1
        }}).then(response => {
          if (response.data.data.time.length === 0)
            alert('暂无数据')
          else {
            let time = response.data.data.time
            let favor = response.data.data.favor
            let none = response.data.data.none
            let against = response.data.data.against
            const echarts4 = echarts.init(this.$refs.echarts_4)
            const option_4 =

                {
                  title: {
                    text: '总体情感趋势',
                    x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）

                  },
                  // tooltip: {
                  //   trigger: 'axis'
                  // },
                  legend: {
                    data: [
                      {name: '积极', itemStyle: {opacity: 0}},
                      {name: '中性', itemStyle: {opacity: 0}},
                      {name: '消极', itemStyle: {opacity: 0}}
                    ],

                    x: 'right',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                    y: "top",
                    padding: 40,
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true//用来防止数值过大而超出视图
                  },
                  toolbox: {
                    feature: {
                      saveAsImage: {}
                    }
                  },
                  xAxis: {
                    data: time,
                    axisLabel: {//横坐标倾斜
                      interval: 0,
                      rotate: 40
                    }
                  },
                  yAxis: {
                    type: 'value',


                  },
                  series: [
                    {
                      name: '积极',
                      type: 'line',
                      data: favor,
                      showSymbol: false,//每个点不用圆圈突出显示
                      smooth: true,//平滑折线图
                      // 折线样式
                      lineStyle: {
                        color: '#6ac96e'//红色
                      },
                    },
                    {
                      name: '中性',
                      type: 'line',
                      data: none,
                      showSymbol: false,//每个点不用圆圈突出显示
                      smooth: true,//平滑折线图
                      // 折线样式
                      lineStyle: {
                        color: '#ffe96c'//蓝色'
                      },
                    },
                    {
                      name: '消极',
                      type: 'line',
                      data: against,
                      showSymbol: false,//每个点不用圆圈突出显示
                      smooth: true,//平滑折线图
                      // 折线样式
                      lineStyle: {
                        color: '#f6572e'//蓝色'
                      },
                    },

                  ]
                }
            echarts4.setOption(option_4)
          }
        }
        )
        console.log('总体情感分析-环形图')
        // http.get(
        //         "/",
        //         {params:{
        //             com_name: this.formInline.detail_company,
        //             issue_type:this.formInline.detail_time,

        // }}).then(response => {
        //     this.tableData = response.data
        //     console.log(response)
        //     console.log(response.data)

        //   })
       },

       



       initEcharts1() {

          // 详情页的环形图
          const echarts3 = echarts.init(this.$refs.echarts_3)
          const option_3={
            // 右上角存图
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            tooltip: {
              // trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                // name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: this.sentiment
              }
            ]
          }
          echarts3.setOption(option_3)

      },
      

      open(){
        this.$nextTick(() => {
        //  执行echarts方法
          this.initEcharts1()
          // this.initEcharts2()
        })
      },

  }
}

</script>

<style lang="less" scoped>
// 调整表头间隔、设置表头下方边框颜色
.table{
margin-top: 15px;
margin-right: 0px;
margin-left: 5px;
padding: 0px;

}
.detail_table1{
  margin-top: 15px;
  margin-left: 10px;

}
.detail_table2{
  margin-top: 0px;
  margin-left: 10px;


  
}
/deep/ .el-table {
  width: 98.5% !important;
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
      font-size: 13px;
      text-align: center !important;
      // height: 1px;
    }
    /deep/ .content_center{//表的内容
      text-align: center !important;
      font-size: 13px;
    }


.one{
  .form{//产品搜索栏
    
    display:flex;
    justify-content:space-between;//左右贴边
    margin-top:5px; 
    margin-bottom: 0px;
    // height: 40px;
    padding-left: 20px;

  }
  .content{
    margin-top: 20px;
    padding: 0px 20px 2px 20px;//返回表格添加间隙 上 右
    font-size: 12px;


    
    }
  .text{
    color:rgba(2, 167, 240, 0.729411764705882);
  }
.card{
  margin-bottom: 10px;
}
  }
  .grayish_btn{//浅灰色按钮
    color: #fff;//文字颜色
    background-color: #aaaaaa;//背景颜色
  }

</style>
