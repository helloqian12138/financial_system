<template>
  <div >
<!--    <form action="">-->
<!--      <input type="text"   v-model="content">-->
<!--      <button @click="findNode(content)" type="button">搜索图谱</button>-->
<!--    </form>-->
    <el-form :inline="true">
      <el-form-item label="公司名称">
        <el-input v-model="content"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findNode(content)">查询</el-button>
      </el-form-item>
    </el-form>
  <div class="graph" ref="graph" id="graph" ></div>
    <div id="hovertip"></div>
    <table id="node_info_table"><tbody id="tbody1" style=""></tbody></table>
    <!--    详细信息弹窗-->
    <el-button type="text" @click="dialogVisible = true">查看详细信息</el-button>
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="100%">
      <el-table style="width: 100%" border :data="tableData" empty-text="暂无数据">
        <template v-for="(item,index) in tableHead">
          <el-table-column  :prop="item.prop" :label="item.label" :key="index" :width="item.width"></el-table-column>
        </template>

      </el-table>
    </el-dialog>
    <el-form label-position='top' label-width="80px" >
    <el-form-item label="更改布局">
      <el-button  @click="cose" size="mini">CoSE</el-button>
<!--      <el-button  @click="euler" size="mini">euler</el-button>-->
      <el-button  @click="circle" size="mini">circle</el-button>
      <el-button  @click="concentric" size="mini">concentric</el-button>
      <el-button  @click="collapseAllEdges" size="mini">折叠所有边</el-button>
      <el-button  @click="expandAllEdges" size="mini">展开所有边</el-button>
<!--      <el-button  @click="collapseAllnode" size="mini">折叠节点</el-button>-->
<!--      <el-button  @click="expandAllnode" size="mini">展开节点</el-button>-->
      <el-button  @click="displayNode" size="mini">显示节点名称</el-button>
      <el-button  @click="hideNode" size="mini">隐藏节点名称</el-button>
      <el-button  @click="displayEdge" size="mini">显示边名称</el-button>
      <el-button  @click="hideEdge" size="mini">隐藏边名称</el-button>
      <el-button  @click="BFS" size="mini">查找并高亮所选节点BFS路径</el-button>
      <el-button  @click="cancleBFS" size="mini">取消所选节点BFS路径</el-button>
    </el-form-item >
      </el-form>

<!--    节点最短路径-->
    <el-form :inline="true">
      <el-form-item label="开始节点">
        <el-input v-model="startID" placeholder="节点ID"></el-input>
      </el-form-item>
      <el-form-item label="结束节点">
        <el-input v-model="endID" placeholder="节点ID"></el-input>
      </el-form-item>
      <el-switch
          v-model="directed"
          active-text="有向"
          inactive-text="无向">
      </el-switch>
      <el-form-item>
        <el-button type="primary" @click="shortestPath(startID,endID,directed)">查询</el-button>
      </el-form-item>
    </el-form>
<!--    拓展节点-->
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="选择节点类型以拓展节点">
<!--        <el-select v-model="formInline.region" placeholder="类型">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
      </el-form-item>
      <el-select v-model="typeSelect" placeholder="类型">
        <el-option v-for="(value,key,index) of type" label="value" value='value'  :key="key" >{{value}}</el-option>
      </el-select>
      <el-form-item>
<!--        <el-button type="primary" @click="onSubmit">查询</el-button>-->
      </el-form-item>
    </el-form>
    <div id="timebrush_div" style="z-index: 999;position: absolute;margin-top: -35px;width:100%;" class="test1"></div>
  </div>
</template>

<script>
import http from "@/utils/request";
import cytoscape from 'cytoscape'
import cxtmenu from 'cytoscape-cxtmenu' // 圆形菜单
import { Loading } from 'element-ui';
import euler from "cytoscape-euler"
import expandCollapse from "cytoscape-expand-collapse"
import * as d3 from "d3"
// cytoscape.use(euler)
// cytoscape.use(expandCollapse)
// cytoscape.use(cxtmenu)
export default {
  name: "graphViewV4",
  data() {
    return {
      typeSelect:'',
      directed:false,
      startID:null,
      endID:null,
      svg:null,
      x:null,
      brush:null,
      search_memory:[],
      mindata:'',
      maxdata:'',
      dialogVisible: false,
      tableHead:[],
      tableData:[],
      content: '',
      graphData: {},
      type :{'board': '板块',
          'category': '行业-门类',
          'categoryBig': '行业-大类',
          'city': '地点-市',
          'country': '地点-国家',
        'listFiniCompOthe': '上市公司-金融机构-其他金融机构',
        'listSecuComp': '上市公司-金融机构-证券',
        'listedBank': '上市公司-金融机构-银行',
        'listedCompany': '上市公司-实体企业',
        'listedInsuComp': '上市公司-金融机构-保险',
        'listedPrivFundComp': '上市公司-金融机构-基金-私募基金',
        'listedPublFundComp': '上市公司-金融机构-基金-公募基金',
        'listedTrusComp': '上市公司-金融机构-信托',
        'market': '交易所',
        'personFundMana': '人物-基金经理',
        'personPerson': '人物-普通人物',
        'productBond': '产品-金融产品-债券',
        'productPrivFund': '产品-金融产品-基金--私募',
        'productPublFund': '产品-金融产品-基金--公募',
        'productREITS': '产品-金融产品-基金—REITS',
        'productStock': '产品-金融产品-股票',
        'province': '地点-省',
        'regulatorBS': '监管机构-银保监会（局）',
        'regulatorCB': '监管机构-人民银行（分行）',
        'regulatorIA': '监管机构-行业协会',
        'regulatorSC': '监管机构-证监会（局）',
        'school': '学校',
        'unlistSecuComp': '非上市公司-金融机构-证券',
        'unlistedBank': '非上市公司-金融机构-银行',
        'unlistedCompany': '非上市公司-实体企业',
        'unlistedInsuComp': '非上市公司-金融机构-保险',
        'unlistedOtheFundComp': '非上市公司-金融机构-其他金融机构',
        'unlistedPublFundComp': '非上市公司-金融机构-基金-公募基金',
        'unlistedTrusComp': '非上市公司-金融机构-信托',
        'county': '地点-县/区',
        'unlistedOtherCom': '非上市公司其他公司',
        'None_com': '未知',
        'organization': '组织机构',
        'productOtheFini': '产品-金融产品-其他',
        'TimeTAG': '时间',
        'ShareholderReduction': '事件-股东减持',
        'ShareholderIncrease': '事件-股东增持',
        'ReportingMedia': '报道媒体',
        'MajorSafetyAccident': '事件-重大安全事故',
        'MajorExternalCompensation': '事件-重大对外赔付',
        'MajorAssetLosses': '事件-重大资产损失',
        'HighLevelDeath': '事件-高层死亡',
        'EventEquityPledge': '事件-股权质押',
        'EquityFreeze': '事件-股权冻结',
        'BankruptcyLiquidation': '事件-破产清算'
      },
    }
  },
  methods: {
     lightOn(ele) {
      this.$cy.startBatch();
       this.$cy.batch(() => {
         this.$cy.elements().addClass("light-off"); //*添加样式*/
    let elements = ((Array.isArray ? Array.isArray(ele) : null != ele && ele instanceof Array) ? ele : [ele]);
    elements.forEach(__ => {
      this.$cy.getElementById(__).removeClass("light-off");
      this.$cy.getElementById(__).neighborhood().removeClass("light-off");
    });
  });
  //cy.once('click', () => lightOff());
       this.$cy.endBatch();
},
//取消高亮
     lightOff() {
       this.$cy.startBatch();
       this.$cy.batch(() =>  this.$cy.elements().removeClass("light-off") /*移除样式*/);
       this.$cy.endBatch();
},

    tuozhan(t_name, t_label)
    {
      let that =this
  //console.log(t_name,t_label)
  //   document.getElementById('fade').style.display='block';
  //   document.getElementById('fade').innerText="正在加载数据，请稍等...";
      let options={
        text:'请稍等'
      }
      let loadingInstance = Loading.service(options);

    var this_neigh_e = this.$cy.$('#'+t_name).connectedEdges();
    for(let j=0;j<this_neigh_e.length;j++)
    {
    if(this_neigh_e[j].data('directionType')==='unidirection')
      this.$api.expandEdges(this_neigh_e[j]);
  }

  //console.log(cy.$('#'+t_name).connectedEdges()[0].data('directionType')=='unidirection')

  http.get('/graph/expand/?name='+ t_name + '&label=' + t_label).then((response)=>{{
      //console.log(get_data)
      // console.log(mindate, maxdate)
      let tmp=response.data.data
      that.$cy.add(tmp['nodes'])
      that.$cy.add(tmp['edges'])


      if( that.search_memory.length ===0 || that.mindate==="" || that.maxdate==="" )
      {
        that.mindate = tmp['mindate']
        that.maxdate = tmp['maxdate']
      }
      else
      {
        if(that.mindate >tmp['mindate'] && tmp['mindate']!=="")
          that.mindate = tmp['mindate']
        if(that.maxdate < tmp['maxdate']  && tmp['maxdate']!=="")
          that.maxdate = tmp['maxdate']
      }

      let layout = this.$cy.layout({
        name: 'euler',
        randomize: true,
        animate: false,
      });
      layout.run();

      that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close();
    });
      if(tmp['id']!=="")
        this.$cy.$('#'+tmp['id']).addClass("search_node");

      // document.getElementById('fade').innerText="";
      // document.getElementById('fade').style.display='none'

      //时间轴
      document.getElementById("timebrush_div").innerHTML="";
      let  margin = {top: -12, right: 27, bottom: 21, left: 0},
          width = document.all.graph.offsetWidth,
          height = 55 - margin.top - margin.bottom

      this.x = d3.scaleTime()
          .domain([new Date(that.mindate), new Date(that.maxdate) - 1])
          .rangeRound([0, width]);

      let svg = d3.select("#timebrush_div").append("svg")
          .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
          .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(that.x)
              .ticks(d3.timeYear)
              .tickPadding(0))
          .attr("text-anchor", null)
          .selectAll("text")
          .attr("fill","#ef5b9c")
          .attr("x", 0);

      svg.append("g")
          .attr("class", "brush")
          .call(d3.brushX()
              .extent([[0, 0], [width, height+30]])
              //.on("start",brushstart)
              .on("brush",this.brushmove));
      // .on("end",brushended));

    }

  }).catch(
      function (error){
      //关闭阴影 div
        console.log(error)
        that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      // document.getElementById('fade').innerText="";
      // document.getElementById('fade').style.display='none'
      alert("查询异常！")
    }
  )

},
    removeDuplicatedItem(ar) {
      var _arr = ar;
      var _res = []; //
      _arr.sort();
      for (var i = 0; i < _arr.length;) {
        var count = 0;
        for (var j = i; j < _arr.length; j++) {
          if (_arr[i] == _arr[j]) {
            count++;
          }
        }
        _res.push({name:_arr[i], value:count});
        i += count;
      }
      return _res;
    },
    zhedie(ele) {
      if ( this.$cy.nodes().filter(function (element, i) {return element.data('id') == ele}).scratch().restData == null) {
        // Save node data and remove
        this.$cy.nodes().filter(function (element, i) { return element.data('id') == ele })
            .scratch({// restData: this.connectedEdges().targets().remove()
              restData:  this.$cy.nodes().filter(function (element, i) {
                return element.data('id') == ele
              }).successors().targets().hide()//remove()
            });
      } else {
        // Restore the removed nodes from saved data
        this.$cy.nodes().filter(function (element, i) {
          return element.data('id') == ele
        }).scratch().restData.show()//restore();
        this.$cy.nodes().filter(function (element, i) {
          return element.data('id') == ele
        }).scratch({
          restData: null
        });
      }
    },
     tongji(node_id)
       {
        document.getElementById("light1_h").innerText=cy.$('#'+node_id).data("name")+"("+cy.$('#'+node_id).data("label")+")";
        var out_label_list=[];
        this.$cy.$('#'+node_id).outgoers().nodes().filter(function (ele) {
        out_label_list.push(ele.data('label'))
  });
        out_label_list=this.removeDuplicatedItem(out_label_list); //相连 出去的节点的类型

          var in_label_list=[];
         this.$cy.$('#'+node_id).incomers().nodes().filter(function (ele) {
    in_label_list.push(ele.data('label'))
  });
      in_label_list=removeDuplicatedItem(in_label_list); //相连 进来的节点的类型

      var out_relation_list=[];
         this.$cy.$('#'+node_id).outgoers().edges().filter(function (ele) {
      out_relation_list.push(ele.data('relationship'))
  });
      out_relation_list=removeDuplicatedItem(out_relation_list); //相连 出去的边 的类型

        var in_relation_list=[];
         this.$cy.$('#'+node_id).incomers().edges().filter(function (ele) {
    in_relation_list.push(ele.data('relationship'))
  });
  in_relation_list=removeDuplicatedItem(in_relation_list); //相连 出去的边 的类型

    document.getElementById('light1').style.display='block';
    document.getElementById('fade').style.display='block';

  var out_bt1 = echarts.init(document.getElementById('out_bt1')),
      out_bt2 = echarts.init(document.getElementById('out_bt2')),
      in_bt1 = echarts.init(document.getElementById('in_bt1')),
      in_bt2 = echarts.init(document.getElementById('in_bt2'));


  var title1="以节点为源节点的节点类型比例（源节点 → ...）",
      title2="以节点为源节点的边类型比例（源节点 → ...）",
      title3="以节点为末节点的节点类型比例（... → 末节点）",
      title4="以节点为末节点的边类型比例（... → 末节点）";


  out_bt1.setOption(op(title1, out_label_list));
  out_bt2.setOption(op(title2, out_relation_list));
  in_bt1.setOption(op(title3, in_label_list));
  in_bt2.setOption(op(title4, in_relation_list));

  out_bt1.on('click', function (param) {
    var name = param.name;

    var a_info=[];
    this.$cy.$('#'+node_id).outgoers().nodes().filter(function (ele) {
      if(ele.data('label')==name)
        a_info.push(ele);
    });

    // var tableData = "<tr style='border:1px solid black;'><td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"源节点"+"</td>"
    //             //+"<td style='width: 10%;font-weight:bold;border:1px solid black;'>"+"关系"+"</td>"
    //             +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"末节点"+"</td>"
    //             +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"末节点类型"+"</td>"
    //             //+"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"开始日期"+"</td>"
    //             //+"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"结束日期"+"</td>"
    //             +"</tr>";
    var tableData = "";
    for(let h=0;h<a_info.length;h++)
    { //便历每一条数据
      if(Math.round(h/14)*14===h)
      {
        tableData += "<tr style='border:1px solid black;'><td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"源节点"+"</td>"
            //+"<td style='width: 10%;font-weight:bold;border:1px solid black;'>"+"关系"+"</td>"
            +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"末节点"+"</td>"
            +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"末节点类型"+"</td>"
            //+"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"开始日期"+"</td>"
            //+"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"结束日期"+"</td>"
            +"</tr>";
      }
      //else
      tableData+="<tr style='border:1px solid black;'><td style='width: 20%;font-weight:bold;border:1px solid black;'>"+cy.$('#'+node_id).data("name")+"</td>"
          // +"<td style='width: 10%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('relationship')+"</td>"
          +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('name')+"</td>"
          +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('label')+"</td>"
          // +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('开始日期')+"</td>"
          // +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('结束日期')+"</td>"
          +"</tr>";
    }
    $("#o_tbody").html(tableData);
    document.getElementById('light2').style.display='block';

    $(document).ready(function() {
      page = new Page(15, 'o_table', 'o_tbody', "pageindex");
    });

  });

  out_bt2.on('click', function (param) {
    var name = param.name;

    var a_info=[];
    cy.$('#'+node_id).outgoers().edges().filter(function (ele) {
      if(ele.data('relationship')==name)
        a_info.push(ele);
    });

    a_info.sort(function(a, b) {
      return parseFloat(b.data('w').substr(0,b.data('w').length-1)) - parseFloat(a.data('w').substr(0,a.data('w').length-1));
    });

    var tableData ="";
    for(var h=0;h<a_info.length;h++)
    { //便历每一条数据
      if(Math.round(h/14)*14==h)
      {
        tableData += "<tr style='border:1px solid black;'><td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"源节点"+"</td>"
            +"<td style='width: 10%;font-weight:bold;border:1px solid black;'>"+"关系"+"</td>"
            +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"末节点"+"</td>"
            +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"末节点类型"+"</td>"
            +"<td style='width: 5%;font-weight:bold;border:1px solid black;'>"+"权重"+"</td>"
            +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"开始日期"+"</td>"
            +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"结束日期"+"</td>"
            +"</tr>";
      }
      //else
      tableData+="<tr style='border:1px solid black;'><td style='width: 20%;font-weight:bold;border:1px solid black;'>"+cy.$("#"+a_info[h].data('source')).data('name')+"</td>"
          +"<td style='width: 10%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('relationship')+"</td>"
          +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+cy.$("#"+a_info[h].data('target')).data('name')+"</td>"
          +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+cy.$("#"+a_info[h].data('target')).data('label')+"</td>"
          +"<td style='width: 5%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('w')+"</td>"
          +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('开始日期')+"</td>"
          +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('结束日期')+"</td>"
          +"</tr>";
    }
    $("#o_tbody").html(tableData);
    document.getElementById('light2').style.display='block';

    $(document).ready(function() {
      page = new Page(15, 'o_table', 'o_tbody', "pageindex");
    });

  });


  in_bt1.on('click', function (param) {
    var name = param.name;

    var a_info=[];
    cy.$('#'+node_id).incomers().nodes().filter(function (ele) {
      if(ele.data('label')==name)
        a_info.push(ele);
    });

    var tableData = "";
    for(var h=0;h<a_info.length;h++)
    { //便历每一条数据
      if(Math.round(h/14)*14==h)
      {
        tableData += "<tr style='border:1px solid black;'><td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"源节点"+"</td>"
            //+"<td style='width: 10%;font-weight:bold;border:1px solid black;'>"+"关系"+"</td>"
            +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"源节点类型"+"</td>"
            +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"末节点"+"</td>"
            //+"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"开始日期"+"</td>"
            //+"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"结束日期"+"</td>"
            +"</tr>";
      }
      //else
      tableData+="<tr style='border:1px solid black;'><td style='width: 20%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('name')+"</td>"
          // +"<td style='width: 10%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('relationship')+"</td>"
          +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('label')+"</td>"
          +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+cy.$('#'+node_id).data("name")+"</td>"
          // +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('开始日期')+"</td>"
          // +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('结束日期')+"</td>"
          +"</tr>";
    }
    $("#o_tbody").html(tableData);
    document.getElementById('light2').style.display='block';

    $(document).ready(function() {
      page = new Page(15, 'o_table', 'o_tbody', "pageindex");
    });

  });

  in_bt2.on('click', function (param) {
    var name = param.name;

    var a_info=[];
    cy.$('#'+node_id).incomers().edges().filter(function (ele) {
      if(ele.data('relationship')==name)
        a_info.push(ele);
    });

    a_info.sort(function(a, b) {
      return parseFloat(b.data('w').substr(0,b.data('w').length-1)) - parseFloat(a.data('w').substr(0,a.data('w').length-1));
    });

    var tableData = "";
    for(var h=0;h<a_info.length;h++)
    { //便历每一条数据
      if(Math.round(h/14)*14==h)
      {
        tableData += "<tr style='border:1px solid black;'><td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"源节点"+"</td>"
            +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"源节点类型"+"</td>"
            +"<td style='width: 10%;font-weight:bold;border:1px solid black;'>"+"关系"+"</td>"
            +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+"末节点"+"</td>"
            +"<td style='width: 5%;font-weight:bold;border:1px solid black;'>"+"权重"+"</td>"
            +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"开始日期"+"</td>"
            +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+"结束日期"+"</td>"
            +"</tr>";
      }
      //else
      tableData+="<tr style='border:1px solid black;'><td style='width: 20%;font-weight:bold;border:1px solid black;'>"+cy.$("#"+a_info[h].data('source')).data('name')+"</td>"
          +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+cy.$("#"+a_info[h].data('source')).data('label')+"</td>"
          +"<td style='width: 10%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('relationship')+"</td>"
          +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+cy.$("#"+a_info[h].data('target')).data('name')+"</td>"
          +"<td style='width: 5%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('w')+"</td>"
          +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('开始日期')+"</td>"
          +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+a_info[h].data('结束日期')+"</td>"
          +"</tr>";
    }
    $("#o_tbody").html(tableData);
    document.getElementById('light2').style.display='block';

    $(document).ready(function() {
      page = new Page(15, 'o_table', 'o_tbody', "pageindex");
    });

  });




},
    xianshi_neigh(id){
      this.$cy.$('#'+id).neighborhood().show();
  // cy.nodes().filter(function( element, i ){return element.data('id') == id}).neighborhood().nodes().show();
  // cy.nodes().filter(function( element, i ){return element.data('id') == id}).neighborhood().edges().show();
  // cy.nodes().filter(function( element, i ){return element.data('id') == id}).neighborhood().nodes().connectedEdges().show();
  // cy.nodes().filter(function( element, i ){return element.data('id') == id}).neighborhood().edges().connectedNodes().show();

},
    yincang_neigh(id){
  //cy.nodes().filter(function( element, i ){return element.data('id') == id}).neighborhood().hide()
      this.$cy.$('#'+id).neighborhood().hide()
},
    dblclicked(svg) {
      const selection = d3.brushSelection(this) ? null : this.x.range();
      console.log(svg)
      console.log(this.brush)
      // d3.select(svg).call(this.brush.move, selection)
},
    brushmove(event) {

      let  d0 = event.selection.map(this.x.invert),  //开始、最终 随过程变化
      d1 = d0.map(d3.timeDay.round);    //最终的开始、最终 [,]
      //
      // console.log(d0)
      // console.log(d1)

      let datetime_s=d1[0].getFullYear() + '-' + (d1[0].getMonth() + 1) + '-' + d1[0].getDate(); //+ ' ' + d1[0].getHours() + ':' + d1[0].getMinutes() + ':' + d1[0].getSeconds();
      let datetime_e=d1[1].getFullYear() + '-' + (d1[1].getMonth() + 1) + '-' + d1[1].getDate(); //+ ' ' + d1[1].getHours() + ':' + d1[1].getMinutes() + ':' + d1[1].getSeconds();

      this.$cy.elements().addClass("light-off");

  //满足
      this.$cy.edges().filter(function( element, i ){
      return new Date(Date.parse(element.data('开始日期'))) >= new Date(Date.parse(datetime_s)) && new Date(Date.parse(element.data('结束日期'))) <= new Date(Date.parse(datetime_e))
    }).removeClass("light-off");

      this.$cy.edges().filter(function( element, i ){
      return new Date(Date.parse(element.data('开始日期'))) >= new Date(Date.parse(datetime_s)) && new Date(Date.parse(element.data('结束日期'))) <= new Date(Date.parse(datetime_e))
  }).connectedNodes()
      .removeClass("light-off");

},

    brushended(){//监听鼠标抬起事件

      let d0 = d3.event.selection.map(x.invert),  //开始、最终 随过程变化
      d1 = d0.map(d3.timeDay.round);    //最终的开始、最终 [,]


      let datetime_s=d1[0].getFullYear() + '-' + (d1[0].getMonth() + 1) + '-' + d1[0].getDate(); //+ ' ' + d1[0].getHours() + ':' + d1[0].getMinutes() + ':' + d1[0].getSeconds();
      let datetime_e=d1[1].getFullYear() + '-' + (d1[1].getMonth() + 1) + '-' + d1[1].getDate(); //+ ' ' + d1[1].getHours() + ':' + d1[1].getMinutes() + ':' + d1[1].getSeconds();

      this.$cy.elements().addClass("light-off");

      this.$cy.edges().filter(function( element, i ){
    return new Date(Date.parse(element.data('开始日期'))) >= new Date(Date.parse(datetime_s)) && new Date(Date.parse(element.data('结束日期'))) <= new Date(Date.parse(datetime_e))
  }).removeClass("light-off");

      this.$cy.edges().filter(function( element, i ){
      return new Date(Date.parse(element.data('开始日期'))) >= new Date(Date.parse(datetime_s)) && new Date(Date.parse(element.data('结束日期'))) <= new Date(Date.parse(datetime_e))
  }).connectedNodes()
      .removeClass("light-off");
} ,// brushended()
    doElemsMultiTypes(elems) {
      const classDict = {};
      for (let i = 0; i < elems.length; i++) {
        classDict[elems[i].data('edgeType')] = true;
      }
      return Object.keys(classDict).length > 1;
    },
    setColor4CompoundEdge(e) {
      const collapsedEdges = e.data('collapsedEdges');
      if (this.doElemsMultiTypes(collapsedEdges)) {
        return '#b3b3b3';
      }
      return collapsedEdges[0].style('line-color')
    },
    setTargetArrowShape(e) {
      const collapsedEdges = e.data('collapsedEdges');
      const shapes = {};
      for (let i = 0; i < collapsedEdges.length; i++) {
        shapes[collapsedEdges[0].style('target-arrow-shape')] = true;
      }
      delete shapes['none'];
      if (Object.keys(shapes).length < 1) {
        if (collapsedEdges.sources().length > 1) {
          return collapsedEdges[0].style('source-arrow-shape');
        }
        return 'none';
      }
      return Object.keys(shapes)[0];
    },
    setSourceArrowShape(e) {
      const collapsedEdges = e.data('collapsedEdges');
      const shapes = {};
      for (let i = 0; i < collapsedEdges.length; i++) {
        shapes[collapsedEdges[0].style('source-arrow-shape')] = true;
      }
      delete shapes['none'];
      if (Object.keys(shapes).length < 1) {
        if (collapsedEdges.sources().length > 1) {
          return collapsedEdges[0].style('target-arrow-shape');
        }
        return 'none';
      }
      return Object.keys(shapes)[0];
    },

    findNode(content) {
      http.get('/graph/search/?name=' + content,
          // {
          //  name:content
          //  }
      ).then((response) => {
        let graphData = response.data
        let that = this
        if (!cytoscape().cxtmenu) {
          cytoscape.use(cxtmenu)
        }
        if (!cytoscape().expandCollapse) {
          cytoscape.use(expandCollapse)
        }
        if (!cytoscape().euler) {
          cytoscape.use(euler)
        }
        if( this.search_memory.length ===0 || this.mindate==="" || this.maxdate==="")
        {
          this.mindate = graphData['mindate']
          this.maxdate = graphData['maxdate']
        }
        else
        {
          if(this.mindate > graphData['mindate'] && graphData['mindate']!=="") this.mindate  = graphData['mindate']
          if(this.mindate < graphData['maxdate'] && graphData['maxdate']!=="") this.maxdate = graphData['maxdate']
        }
        this.search_memory.push(this.content)
        this.$cy = cytoscape({
          elements: graphData,
          container: document.getElementById('graph'),
          // ready:this.readyFunc,
          // ready: function () {
          //   that.$api = cytoscape().expandCollapse({
          //     elements:graphData,
          //     layoutBy: {
          //       name: 'euler',
          //       randomize: true,
          //       animate: false
          //     },
          //     fisheye: true,
          //     animate: false,
          //     ready: function () {
          //     },
          //     undoable: false,
          //     randomize: false,
          //
          //     cueEnabled: true, // Whether cues are enabled
          //     expandCollapseCueSize: 12, // size of expand-collapse cue
          //     expandCollapseCueLineSize: 8, // size of lines used for drawing plus-minus icons
          //     expandCueImage: undefined, // image of expand icon if undefined draw regular expand cue
          //     collapseCueImage: undefined, // image of collapse icon if undefined draw regular collapse cue
          //     expandCollapseCueSensitivity: 1, // sensitivity of expand-collapse cues
          //     allowNestedEdgeCollapse: false
          //   })
          //   //api.collapseAll();
          // },
          layout: {
            name: 'euler',
            randomize: true,
            animate: false
          },   //可选：'breadthfirst', 'circle', 'concentric', 'cose', 'grid','null', 'preset', 'random'
          zoom: 1,
          pan: {x: 0, y: 0},
          minZoom: 1e-10,
          maxZoom: 1e10,
          zoomingEnabled: true, // 是否通过用户事件和编程方式启用缩放图形.
          userZoomingEnabled: true, // 是否允许用户事件(例如鼠标滚轮,捏合缩放)缩放图形.对此缩放的编程更改不受此选项的影响.
          panningEnabled: true, // 是否通过用户事件和编程方式启用平移图形.
          userPanningEnabled: true, // 是否允许用户事件(例如拖动图形背景)平移图形.平移的程序化更改不受此选项的影响.
          boxSelectionEnabled: true,
          wheelSensitivity: 0.3, //缩放时更改滚轮灵敏度.这是一个乘法修饰符.因此,0到1之间的值会降低灵敏度(变焦较慢),而大于1的值会增加灵敏度(变焦更快).
          multiselectionEnabled: true,
          //selectionType:"additive",
          touchTapThreshold: 8,
          desktopTapThreshold: 4,
          style: cytoscape.stylesheet()

              .selector('node[label = "公司"]')   //定义节点的样式
              .css({'background-color': '#d71345'})
              .selector('node[label = "上市公司"]')
              .css({'background-color': '#ef4136'}) //'shape':'triangle'
              .selector('node[label = "上市公司-实体企业"]')
              .css({'background-color': '#FF1493'})
              .selector('node[label = "上市公司-金融机构"]')
              .css({'background-color': '#C71585'})
              .selector('node[label = "上市公司-金融机构-银行"]')
              .css({'background-color': '#f8aba6'})
              .selector('node[label = "上市公司-金融机构-证券"]')
              .css({'background-color': '#f05b72'})
              .selector('node[label = "上市公司-金融机构-保险"]')
              .css({'background-color': '#d93a49'})
              .selector('node[label = "上市公司-金融机构-信托"]')
              .css({'background-color': '#FF69B4'})
              .selector('node[label = "上市公司-金融机构-基金"]')
              .css({'background-color': '#DB7093'})
              .selector('node[label = "上市公司-金融机构-基金-公募基金"]')
              .css({'background-color': '#FFB6C1'})
              .selector('node[label = "上市公司-金融机构-基金-私募基金"]')
              .css({'background-color': '#FFC0CB'})
              .selector('node[label = "上市公司-金融机构-其他金融机构"]')
              .css({'background-color': '#D8BFD8'})
              .selector('node[label = "非上市公司"]')
              .css({'background-color': '#102b6a'})
              .selector('node[label = "非上市公司-实体企业"]')
              .css({'background-color': '#224b8f'})
              .selector('node[label = "非上市公司-金融机构"]')
              .css({'background-color': '#2a5caa'})
              .selector('node[label = "非上市公司-金融机构-银行"]')
              .css({'background-color': '#2b4490'})
              .selector('node[label = "非上市公司-金融机构-证券"]')
              .css({'background-color': '#426ab3'})
              .selector('node[label = "非上市公司-金融机构-保险"]')
              .css({'background-color': '#0072E3'})
              .selector('node[label = "非上市公司-金融机构-信托"]')
              .css({'background-color': '#0080FF'})
              .selector('node[label = "非上市公司-金融机构-基金"]')
              .css({'background-color': '#46A3FF'})
              .selector('node[label = "非上市公司-金融机构-基金-公募基金"]')
              .css({'background-color': '#66B3FF'})

              .selector('node[label = "非上市公司-金融机构-基金-私募基金"]')
              .css({'background-color': '#84C1FF'})
              .selector('node[label = "非上市公司-金融机构-其他金融机构"]')
              .css({'background-color': '#97CBFF'})

              .selector('node[label = "人物"]')
              .css({'background-color': '#e0861a'})
              .selector('node[label = "人物-普通人物"]')
              .css({'background-color': '#fcaf17'})
              .selector('node[label = "人物-基金经理"]')
              .css({'background-color': '#faa755'})
              .selector('node[label = "人物-投资经理"]')
              .css({'background-color': '#f58220'})

              .selector('node[label = "机构-国务院国有资产监督管理委员会"]')
              .css({'background-color': '#2e3a1f'})

              .selector('node[label = "监管机构"]')
              .css({'background-color': '#1d953f'})
              .selector('node[label = "监管机构-银保监会（局）"]')
              .css({'background-color': '#78a355'})
              .selector('node[label = "监管机构-证监会（局）"]')
              .css({'background-color': '#7fb80e'})
              .selector('node[label = "监管机构-人民银行（分行）"]')
              .css({'background-color': '#78a355'})
              .selector('node[label = "监管机构-食药监局"]')
              .css({'background-color': '#abc88b'})
              .selector('node[label = "监管机构-网信"]')
              .css({'background-color': '#45b97c'})
              .selector('node[label = "监管机构-工信"]')
              .css({'background-color': '#007d65'})
              .selector('node[label = "监管机构-行业协会"]')
              .css({'background-color': '#40835e'})

              .selector('node[label = "交易所"]')
              .css({'background-color': '#3e4145'})

              .selector('node[label = "板块"]')
              .css({'background-color': '#563624'})

              .selector('node[label = "地点"]')
              .css({'background-color': '#2468a2'})
              .selector('node[label = "地点-国家"]')
              .css({'background-color': '#228fbd'})
              .selector('node[label = "地点-省"]')
              .css({'background-color': '#33a3dc'})
              .selector('node[label = "地点-县/区"]')
              .css({'background-color': '#7bbfea'})
              .selector('node[label = "地点-市"]')
              .css({'background-color': '#90d7ec'})

              .selector('node[label = "行业"]')
              .css({'background-color': '#2e3a1f'})
              .selector('node[label = "行业-门类"]')
              .css({'background-color': '#454926'})
              .selector('node[label = "行业-大类"]')
              .css({'background-color': '#726930'})
              .selector('node[label = "行业-中类"]')
              .css({'background-color': '#4d4f36'})

              .selector('node[label = "产品"]')
              .css({'background-color': '#494e8f'})
              .selector('node[label = "产品-一般产品"]')
              .css({'background-color': '#585eaa'})
              .selector('node[label = "产品-服务产品"]')
              .css({'background-color': '#6a6da9'})
              .selector('node[label = "产品-金融产品"]')
              .css({'background-color': '#6950a1'})
              .selector('node[label = "产品-金融产品-股票"]')
              .css({'background-color': '#6f60aa'})
              .selector('node[label = "产品-金融产品-债券"]')
              .css({'background-color': '#6f599c'})
              .selector('node[label = "产品-金融产品-基金"]')
              .css({'background-color': '#9b95c9'})
              .selector('node[label = "产品-金融产品-基金--公募"]')
              .css({'background-color': '#afb4db'})
              .selector('node[label = "产品-金融产品-基金--私募"]')
              .css({'background-color': '#C7C7E2'})
              .selector('node[label = "产品-金融产品-基金--REITS"]')
              .css({'background-color': '#867892'})
              .selector('node[label = "产品-金融产品-信托"]')
              .css({'background-color': '#918597'})
              .selector('node[label = "产品-金融产品-其他"]')
              .css({'background-color': '#6f6d85'})

              .selector('node[label = "学校"]')
              .css({'background-color': '#ffd400'})

              .selector('node[label = "非上市公司其他公司"]')
              .css({'background-color': '#cbc547'})

              .selector('node[label = "未知"]')
              .css({'background-color': '#d9d6c3'})

              // .selector('node.cy-expand-collapse-collapsed-node')
              //   .style({
              //       "background-color": "darkblue",
              //       "shape": "rectangle"
              //   })
              .selector(':parent')
              .style({
                'background-opacity': 0.1,
                'border-width': .001
              })
              .selector('node')
              .style({
                'color': '#999999', //定义节点标签颜色
                'background-opacity': 1,
                'font-size': '5px',
                // 'width': '17px',
                // 'height': '17px',
                'width': function (node) {
                  var w = node.data('w');
                  if (w == "") return '17px';
                  else {
                    w = parseFloat(w.substr(0, w.length - 1));
                    if (w < 1.0) return (17 + Math.log2(w + 1) * 2) + 'px';
                    else return (17 + Math.log2(w) * 2) + 'px';
                  }

                },
                'height': function (node) {
                  var w = node.data('w');
                  if (w == "") return '17px';
                  else {
                    w = parseFloat(w.substr(0, w.length - 1));
                    if (w < 1.0) return (17 + Math.log2(w + 1) * 2) + 'px';
                    else return (17 + Math.log2(w) * 2) + 'px';
                  }
                },
              })
              .selector('edge')   //定义边的样式
              .style({
                //'label': 'data(relationship)',
                'target-arrow-shape': 'triangle-backcurve', /*箭头样式*/
                'target-arrow-size': '0.1px', /*箭头大小*/
                'target-arrow-color': '#8B8989', /*箭头颜色*/
                'curve-style': 'bezier', /*线条样式曲线*/
                'line-color': '#8B8989', /*线条颜色*/
                // 'label':'data(id)',
                'width': function (edge) {
                  var w = edge.data('w');
                  if (w == '') return '0.15px';
                  else {
                    // if(w.substr(w.length-1,1)=='%')
                    // {
                    w = parseFloat(w.substr(0, w.length - 1));
                    return (0.15 + Math.log2(w + 1)) + 'px';
                    // if(w<1.0) return (0.3 + Math.log2(w)) + 'px';
                    // else return (0.3 + Math.log2(w)) + 'px';

                    // }
                    // else  //以 亿 为单位
                    // {
                    //     w=parseFloat(w);
                    //     if(w<1.0)
                    //     {
                    //         return (0.4 + Math.log10(w+1)) + 'px';
                    //     }
                    //     else return (0.4 + Math.log10(w)) + 'px';
                    // }
                  }
                },//'2px', /*线条宽度*/

                //'overlay-opacity': 0.25,

                // 'line-opacity':  function (edge) {
                //    var w =  edge.data('w');
                //    if(w=='') return '0.5';
                //    else
                //    {
                //        // if(w.substr(w.length-1,1)=='%')
                //        // {
                //            w=parseFloat(w.substr(0,w.length-1));
                //            return (0.5 + Math.log2(w+1)) + 'px';
                //
                //    }
                // },
                'font-size': '6px', /*标签字体大小*/
                'color': '#999999', /*标签字体大小*/
                'text-outline-color': 'white', /*文本轮廓颜色*/
                'text-outline-width': '1px', /*文本轮廓宽度*/
                'text-rotation': 'autorotate', /*标签方向*/
              })
              .selector('edge.cy-expand-collapse-collapsed-edge')
              .style(
                  {
                    "text-outline-color": "#ffffff",
                    "text-outline-width": "1px",
                    'label': (e) => {
                      return '(' + e.data('collapsedEdges').length + ')';
                    },
                    'width': function (edge) {
                      const n = edge.data('collapsedEdges').length;
                      return (1 + Math.log2(n)) + 'px';
                    },
                    //'line-opacity':1,
                    'line-style': 'dashed',
                    'line-color': this.setColor4CompoundEdge,
                    'target-arrow-color': this.setColor4CompoundEdge,
                    'target-arrow-shape': this.setTargetArrowShape,
                    'source-arrow-shape': this.setSourceArrowShape,
                    'source-arrow-color': this.setColor4CompoundEdge,
                  })
              .selector('node:selected')
              .style({'border-color': '#c84e40', 'border-width': "1px",})
              .selector('.search_node')
              .style({'border-color': '#c84e40', 'border-width': "2px",})
              .selector('.key_node')
              .style({
                'background-color': 'red',
                'width': 30,
                'height': 30,
                shape: 'polygon',
                'shape-polygon-points': '0 1, 0.8660254037844386 0.5, 0.8660254037844386 -0.5, 0 -1, -0.8660254037844386 -0.5, -0.8660254037844386 0.5',

                animation: true,
                duration: 1000
              })
              .selector('edge:selected')
              .style({
                'color': '#3165fc', /*标签字体大小*/
                'target-arrow-color': '#61bffc', /*箭头颜色*/
                'line-color': '#61bffc', /*线条颜色*/
                // 'width':'2px',
              })
              .selector('.xianshi_label_edge')
              .style({
                'label': 'data(relationship)',
              })
              .selector('.xianshi_name_node')
              .style({
                'content': 'data(name)',
              })
              .selector('.mouse_xianshi_name_node')  //鼠标 显示
              .style({
                'content': 'data(name)',
                'font-size': '15px',
                'color': '#d71345',
              })
              .selector('.mouse_xianshi_label_edge')  //显示边
              .style({
                'label': 'data(relationship)',
                'font-size': '15px',
                'color': '#d71345',
              })
              .selector('.light-off')   //高亮样式
              .style({'opacity': '0.1',})    //opacity: 透明度
              .selector('.highlighted')
              .style({
                'background-color': '#65c294',
                'line-color': '#d71345',
                'target-arrow-color': '#d71345',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s',
                // 'width': '2px'
              })
              .selector('.hbnode')
              .style({
                'label': '合并节点',
                'background-color': '#000080', //定义节点标签颜色
                'background-opacity': 0.8,
                'font-size': '20px',
                'width': '30px',
                'height': '30px',
              })
              // .selector('.keynodes')
              //     .style({'border-color': '#1d953f', 'border-width': "1px",})
              .selector('.hbnodes_edge')
              .style({
                'target-arrow-color': '#ffd400', /*箭头颜色*/
                'line-color': '#ffd400', /*线条颜色*/
                'width': '2px',
              })

        })
        for(let j=0;j<graphData['id'].length; j++)
        {
          this.$cy.$('#'+graphData['id'][j]).addClass("search_node");
        }
        // 添加事件
        this.$cy.on('mouseover', 'node', function (evt) {
          evt.target.addClass('mouse_xianshi_name_node');
        });
        this.$cy.on('mouseout', 'node', function (evt) {
          evt.target.removeClass('mouse_xianshi_name_node');
        });

        this.$cy.on('mouseover', 'edge', function (evt) {
          evt.target.addClass('mouse_xianshi_label_edge');
        });
        this.$cy.on('mouseout', 'edge', function (evt) {
          evt.target.removeClass('mouse_xianshi_label_edge');
        });
        this.$cy.on('tap', 'node', function (d) {
          if (d.target.data('label') != "合并节点") {
            let node_info = '';
            for (let key in d.target.data()) {
              if (key == 'id') {
                node_info = node_info + 'ID' + ':' + d.target.data()[key] + '<br>';
              } else if (key == 'label') {
                node_info = node_info + '类型' + ':' + d.target.data()[key] + '<br>';
              } else if (key == 'name') {
                node_info = node_info + '名称' + ':' + d.target.data()[key] + '<br>';
              } else if (key == 'w') {
                node_info = node_info + '权重' + ':' + d.target.data()[key] + '<br>';
              } else node_info = node_info + key + ':' + d.target.data()[key] + '<br>';
            }
            // node_info = node_info
                // + '<p><a href = "javascript:void(0)" onclick = "document.getElementById(\'light\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">更多信息...</a></p>';
            document.getElementById("hovertip").innerHTML = (node_info)}},
        )
        // 更多信息接口
        this.$cy.on('tap', 'node', function (d) {
          if (that.tableData || that.tableHead){
            that.tableData=[]
            that.tableHead=[]
          }
              http.get('/graph/info/?id=' + d.target.data('id') + '&label=' + d.target.data('label'))
                  .then((response) => {
                        let node_info = response.data['data']
                        let tmp={}
                        for (const i of Object.keys(node_info)){
                          if (Object.prototype.toString.call(node_info[i]) === '[object Object]')
                          tmp[i]=JSON.stringify(node_info[i])
                          else {
                            tmp[i]=node_info[i]
                          }
                        }
                        that.tableData.push(tmp)
                        for (const i of Object.keys(node_info)){
                          if (i==='公司简介'){
                            that.tableHead.push({prop:i,label:i,width:400})
                          }else if(i==='经营范围'){
                            that.tableHead.push({prop:i,label:i,width:300})
                          }
                          else {
                            that.tableHead.push({prop: i, label: i, width: 80})
                          }
                        }
                        // that.dialogVisible=true
                      }
                  )
            }
        )
        //BFS

          this.$cy.expandCollapse({
            layoutBy: {
              name: 'euler',
              randomize: true,
              animate: false
            },
            fisheye: true,
            animate: false,
            ready: function () { },
            undoable: false,
            randomize: false,
            cueEnabled: true, // Whether cues are enabled
            expandCollapseCueSize: 12, // size of expand-collapse cue
            expandCollapseCueLineSize: 8, // size of lines used for drawing plus-minus icons
            expandCueImage: undefined, // image of expand icon if undefined draw regular expand cue
            collapseCueImage: undefined, // image of collapse icon if undefined draw regular collapse cue
            expandCollapseCueSensitivity: 1, // sensitivity of expand-collapse cues
            allowNestedEdgeCollapse: false
          })
        this.$cy.cxtmenu({
          menuRadius: 110, // the radius of the circular menu in pixels
          selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
          commands: (element) => {
            return [
              {
                fillColor: '#a1a3a6', // optional: custom background color for item
                content: '<span style="font-size: 7px">无操作</span>', // html/text content to be displayed in the menu
                // content: '显示邻居',
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                enabled: false, // whether the command is selectable
              },
              {
                fillColor: '#33a3dc', // optional: custom background color for item
                content: '<span style="font-size: 7px">显示邻居</span>', // html/text content to be displayed in the menu
                // content: '显示邻居',
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: (ele) =>this.xianshi_neigh(ele.id()),
                enabled: true, // whether the command is selectable
              },
              {
                fillColor: '#73b9a2', // optional: custom background color for item
                content: '<span style="font-size: 7px">隐藏邻居</span>', // html/text content to be displayed in the menu
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: (ele) => this.yincang_neigh(ele.id()),
                enabled: true, // whether the command is selectable
              },
              {
                fillColor: '#f7acbc', // optional: custom background color for item
                content: '<span style="font-size: 7px">高亮邻居</span>', // html/text content to be displayed in the menu
                // contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: (ele) => this.lightOn([ele.id()]),
                enabled: true, // whether the command is selectable
              },
              {
                fillColor: '#ffd400',
                content: '<span style="font-size: 7px">隐藏/显示出度邻居</span>',
                // contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: (ele) => this.zhedie(ele.id()),
                enabled: true,
              },
              {
                fillColor: '#f15b6c', // optional: custom background color for item
                content: '<span style="font-size: 7px">拓展节点</span>', // html/text content to be displayed in the menu
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: (ele) => this.tuozhan(ele.data('id'), ele.data('label')),
                enabled: true, // whether the command is selectable
              },
              // {
              //   fillColor: '#7d5886', // optional: custom background color for item
              //   content: '<span style="font-size: 7px">统计信息</span>', // html/text content to be displayed in the menu
              //   contentStyle: {}, // css key:value pairs to set the command's css in js if you want
              //   select: (ele) => this.tongji(ele.id()),
              //   enabled: true, // whether the command is selectable
              // },
            ]
          },
          fillColor: 'rgba(0, 0, 0, 0.75)', // 指令默认颜色(the background colour of the menu)
          activeFillColor: 'rgba(1, 105, 217, 0.75)', // 所选指令的颜色(the colour used to indicate the selected command)
          activePadding: 5, // additional size in pixels for the active command
          indicatorSize: 14, // the size in pixels of the pointer to the active command
          separatorWidth: 1, //连续命令之间的空白间隔(以像素为单位)
          spotlightPadding: 10, //元素和聚光灯之间的额外间距(以像素为单位)
          minSpotlightRadius: 10, // the minimum radius in pixels of the spotlight
          maxSpotlightRadius: 14, // the maximum radius in pixels of the spotlight
          openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
          itemColor: 'white', // 各指令元素内字体颜色
          // itemTextShadowColor: '#fffffb', // 各指令元素内字体阴影颜色
          zIndex: 9999, // the z-index of the ui div
          atMouse: true, // draw menu at mouse position
        });
        this.$api = this.$cy.expandCollapse('get')
        document.getElementById("timebrush_div").innerHTML=""
        let margin = {top: -12, right: 27, bottom: 21, left: 0}

        // console.log(document.all.graph)
        let   width = document.all.graph.offsetWidth
        console.log(width)
        let height = 55 - margin.top - margin.bottom;

        this.x = d3.scaleTime()
            .domain([new Date(this.mindate), new Date(this.maxdate) - 1])
            .rangeRound([0, width]);
        this.brush=d3.brushX()
            .extent([[0, 0], [width, height+30]])
            //.on("start",brushstart)
            .on("brush",this.brushmove)
        let svg = d3.select("#timebrush_div").append("svg")
            .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
            .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x)
                .ticks(d3.timeYear)
                .tickPadding(0))
            .attr("text-anchor", null)
            .selectAll("text")
            .attr("fill","#ef5b9c")
            .attr("x", 0);

        svg.append("g")
            .attr("class", "brush")
            .call(this.brush)
            .on("dblclick", this.dblclicked(svg))
        // .on("end",brushended));
        // svg.append("g").on("dblclick", this.dblclicked(svg))

      })
    },
    collapseAllEdges(){
      this.$api.collapseAllEdges()
    },
    expandAllEdges(){
      this.$api.expandAllEdges()
    },
    collapseAllnode(){
      this.$api.collapseAll()
    },
    expandAllnode(){
      this.$api.expandAll()
    },
    displayNode(){
      this.$cy.nodes().addClass("xianshi_name_node")
    },
    hideNode(){
      this.$cy.nodes().removeClass("xianshi_name_node")
    },
    displayEdge(){
      this.$cy.edges().addClass("xianshi_label_edge")
    },
    hideEdge(){
      this.$cy.edges().removeClass("xianshi_label_edge")
    },
    cose(){
      var layout = this.$cy.layout({
        name: 'cose',   //'circle'
        animate: 'end',
        animationEasing: 'ease-out',
        animationDuration: 1000,
        randomize: true,
        idealEdgeLength: 50,
        nodeOverlap: 20,
        nodeDimensionsIncludeLabels: false,
        refresh: 40,
        fit: true,
        padding: 30,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.75,
        minTemp: 1.0
      });
      layout.run();
    },
    euler(){
      let layout = this.$cy.layout({
        name: 'euler',
        randomize: true,
        animate: false
      });
      layout.run();
    },
    fcose(){
      var layout = this.$cy.layout({
        name: 'fcose',
        quality: 'default',
        randomize: true,
        animate: true,
        animationEasing: 'ease-out',
        uniformNodeDimensions: false,
        packComponents: true,
        tile: true,
        nodeRepulsion: parseFloat('4500'),
        idealEdgeLength: parseFloat('50'),
        edgeElasticity: parseFloat('0.45'),
        nestingFactor: parseFloat('0.1'),
        gravity: parseFloat('0.25'),
        gravityRange: parseFloat('3.8'),
        gravityCompound: parseFloat('1'),
        gravityRangeCompound: parseFloat('1.5'),
        numIter: parseFloat('2500'),
        tilingPaddingVertical: parseFloat('10'),
        tilingPaddingHorizontal: parseFloat('10'),
        initialEnergyOnIncremental: '0.3',
        step:"all"
      });
      layout.run();
    },
    circle(){
      var layout = this.$cy.layout({
        name: 'circle',
      });
      layout.run();
    },
    concentric(){
      var layout = this.$cy.layout({
        name: 'concentric',
        randomize: true,
        animate: false
      });
      layout.run();
    },
    bfs_lujing(id) {
    let bfs = this.$cy.elements().bfs('#'+id, function(){}, true)
       let i = 0
       let highlightNextEle = function(){
    if( i < bfs.path.length ){
      bfs.path[i].addClass('highlighted');
      i++;
      setTimeout(highlightNextEle, 500);
    }
    if( i == bfs.path.length ){
      alert('BFS路径查找完毕！')
      i++;
      }
    }
  // kick off first highlight
    highlightNextEle();
  },
    BFS(){
      {
        let node = this.$cy.nodes(':selected');
        if(node.length == 1)
          this.bfs_lujing(node.data('id'))
        else
          alert('请选择单个节点！')
      }
    },
    cancleBFS(){
      let node = this.$cy.nodes(':selected');
      let id = node.data('id');
      let bfs = this.$cy.elements().bfs('#'+id, function(){}, true);
      let i = 0;
      let highlightNextEle = function(){
        if( i < bfs.path.length ){
          bfs.path[i].removeClass('highlighted');
          i++;
          setTimeout(highlightNextEle, 500);
        }
      };
      // kick off first highlight
      highlightNextEle()
    },
    shortestPath (start,end,di) {
      let that=this
      let node1 = start;
      let node2 = end;
      //console.log(node1, node2)
      let node11=false,node22=false;
      let is_dire = di;

      if(node1===''||node2==='')
      {
        alert("请输入完整ID！")
      }

      else
      {
        this.$cy.elements().unselect();
        if(is_dire)
        {
          http.get('/graph/path/?id0='+node1+'&id1='+node2).then((response)=>{
            let add_data=response.data
            this.$cy.add(add_data.data['nodes'])
            this.$cy.add(add_data.data['edges'])

            if( this.search_memory.length ===0 || this.mindate==="" || this.maxdate==="" )
            {
              this.mindate = add_data.data['mindate']
              this.maxdate = add_data.data['maxdate']
            }
            else
            {
              if(this.mindate > add_data.data['mindate'] && add_data.data['mindate']!=="") this.mindate = add_data.data['mindate']
              if(this.maxdate < add_data.data['maxdate'] && add_data.data['maxdate']!=="") this.maxdate = add_data.data['maxdate']
            }

            var layout = this.$cy.layout({
              name: 'euler',
              randomize: true,
              animate: false,
            });
            layout.run();

            this.$cy.nodes().filter(function (ele) {
              if(ele.data('id')===node1) node11=true;
              if(ele.data('id')===node2) node22=true;
              // console.log(node22, node11)
            })
            if(node11===true && node22===true)
            {
              var dfs = this.$cy.elements().aStar({
                root: '#'+node1,
                goal: '#'+node2,
                directed: is_dire
              })
              if(dfs['found']===true)
              {
                dfs.path.select();
                alert('路径查找完毕！');
              }
              else alert('不存在从'+node1+'到'+node2+'的路径');
              // console.log(dfs)
            }
            else
            {
              if(node11===true)
                alert("结束节点不存在！");
              else alert("开始节点不存在！");
            }

          }
        )}
      else
        {
      this.$cy.nodes().filter(function (ele) {
      if(ele.data('id')===node1) node11=true;
      if(ele.data('id')===node2) node22=true;
    // console.log(node22, node11)
  })
  if(node11===true && node22===true)
  {
    var dfs = this.$cy.elements().aStar({
      root: '#'+node1,
      goal: '#'+node2,
      directed: is_dire
    })
    if(dfs['found']===true)
    {
      dfs.path.select();
      alert('路径查找完毕！');
    }
    else alert('不存在从'+node1+'到'+node2+'的路径');
    // console.log(dfs)
  }
  else
  {
    if(node11==true)
      alert("结束节点不存在！");
    else alert("开始节点不存在！");
  }

        }
      }
    },
    expandNode () {

      var input_label = document.getElementById('input_label').value;
      var name_list = [];
      cy.nodes().filter(function (ele) {
        if(ele.data('label')==input_label)
          name_list.push(ele.data('id'))
      });

      var name_str = "";

      for (var j=0;j<name_list.length-1;j++)
      {
        name_str = name_str + name_list[j] + ",";
      }
      name_str = name_str + name_list[name_list.length-1]

      document.getElementById('fade').style.display='block';
      document.getElementById('fade').innerText="正在加载数据，请稍等...";

      $.ajax({
        url:'http://106.12.162.199:5008/graph/expand/?name='+ name_str + '&label=' + input_label,
        type: 'get',
        async:true,
        success: function (get_data) {

          this.$cy.add(get_data.data['nodes'])
          this.$cy.add(get_data.data['edges'])

          if( this.search_memory.length ===0 || this.mindate==="" || this.maxdate==="" )
          {
            this.mindate = get_data.data['mindate']
            this.maxdate = get_data.data['maxdate']
          }
          else
          {
            if(mindate > get_data.data['mindate'] && get_data.data['mindate']!="") mindate = get_data.data['mindate']
            if(maxdate < get_data.data['maxdate'] && get_data.data['maxdate']!="") maxdate = get_data.data['maxdate']
          }

          var layout = cy.layout({
            name: 'euler',
            randomize: true,
            animate: false,
          });
          layout.run();

          if(get_data.data['id']!="")
          {
            for (var h=0;h<get_data.data['id'].length;h++)
              cy.$('#'+get_data.data['id'][h]).addClass("search_node");
          }

          document.getElementById('fade').innerText="";
          document.getElementById('fade').style.display='none'


          //时间轴
          document.getElementById("timebrush_div").innerHTML="";
          var margin = {top: -12, right: 27, bottom: 21, left: 0},
              width = document.all.cy.offsetWidth,
              height = 55 - margin.top - margin.bottom;

          x = d3.scaleTime()
              .domain([new Date(mindate), new Date(maxdate) - 1])
              .rangeRound([0, width]);

          svg = d3.select("#timebrush_div").append("svg")
              .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
              .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          svg.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x)
                  .ticks(d3.timeYear)
                  .tickPadding(0))
              .attr("text-anchor", null)
              .selectAll("text")
              .attr("fill","#ef5b9c")
              .attr("x", 0);

          svg.append("g")
              .attr("class", "brush")
              .call(d3.brushX()
                  .extent([[0, 0], [width, height+30]])
                  //.on("start",brushstart)
                  .on("brush",brushmove));
          // .on("end",brushended));

        },
        error:function () {
          //关闭阴影 div
          document.getElementById('fade').innerText="";
          document.getElementById('fade').style.display='none'
          alert("查询失败！")
        }
      });


    },



    },




  mounted() {
  }
}
</script>

<style scoped>
.graph {
/*//margin-left: -800px;*/
/*  transform: translate(0,0);*/
  height: 800px;
  /*width: */
}
</style>