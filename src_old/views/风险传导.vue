<!-- 风险传导 -->
<template>
   <div>


<!--     加载容器-->
<!--     <div class="honeycomb" v-if="waitLoad"></div>-->
        <el-button @click="drawer = true" type="primary" plain style="margin-left: 20px;">更多功能</el-button>
        风险源：{{source}}
        <el-drawer
        title="风险传导条件查询"
        :visible.sync="drawer"
        :modal="false"
        :show-close="true" 
        :with-header="false">

        <p  style="padding: 0; margin-top:5px; margin-left:12px;margin-bottom: 15px;font-size: 22px;">风险传导条件查询</p>
        
        
        <el-form :inline="true">
            <!-- 0主要查询 -->
            <el-form-item label="风险类型:" style="padding: 0; margin: 1px;margin-left:12px ;font-weight: bold;">
                <el-select v-model="riskSelect" placeholder="流动风险"  size="mini">
                    <el-option label="流动风险" value="流动风险"></el-option>
                    <el-option label="市场风险" value="市场风险"></el-option>
                    <el-option label="经营风险" value="经营风险"></el-option>
                    <el-option label="信用风险" value="信用风险"></el-option>
                    <el-option label="资产负债风险" value="资产负债风险"></el-option>
                    <el-option label="获现风险" value="获现风险"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="传导范围:" style="padding: 0; margin: 1px;margin-left:12px ;font-weight: bold;">
    
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllRange" @change="handleCheckAllChange" style="display: flex-start;">全选</el-checkbox>
                <el-checkbox-group v-model="checkedRanges" @change="handleCheckedRangesChange" style="display: flex-start;padding: 0;margin: 0 0px 0 1px">
                    <el-checkbox v-for="range in Ranges" :label="range" :key="range" >{{range}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="选择时间:" prop="选择时间" style="padding: 0;margin: 0 0 0 12px;font-weight: bold;">
                <el-date-picker v-model="date" type="date" placeholder="年/月/日" size="mini"> </el-date-picker>
            </el-form-item>

            <el-form-item style="padding: 0;margin: 0 0 0 12px;">
                <el-button  type="primary" plain size="mini" @click="onSubmit1" style="margin-left: 20px;">查询</el-button>
            </el-form-item>

            






            
            <el-dialog :visible.sync="dialogVisible2" width="100%" >弹窗2
            </el-dialog>


            <el-divider content-position="left"></el-divider>

        </el-form>

        </el-drawer>
     <!--渲染容器-->
     <div class="graph" ref="graph" id="graph" ></div>

<!--     表格-->
     <el-dialog :visible.sync="dialogVisible1"  :modal="false" width="100%" >
       <el-table style="width: 100%" border :data="currentData.slice((currentPage-1)*pageSize,currentPage*pageSize)" empty-text="暂无数据" >
         <el-table-column
             type="index"
             width="40">
         </el-table-column>
         <el-table-column
             prop="name"
             label="名称"
             width="200">
         </el-table-column>
         <el-table-column
             prop="val"
             label="风险值"
             width="200">
         </el-table-column>
       </el-table>

       <!--     分页-->
       <div class="block" style="margin-top:15px;"  >
         <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage"

                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="currentData.length">
         </el-pagination>
       </div>
     </el-dialog>


     <!--     步骤条-->
     <el-steps :active="active" finish-status="success" v-if="showStep">
       <el-step v-for="(s,index) in steps"  :key="index"  :title="s.title"></el-step>
<!--       <el-step title="步骤 2"></el-step>-->
<!--       <el-step title="步骤 3"></el-step>-->
     </el-steps>
<!--     <el-button style="margin-top: 12px;" @click="next"  icon="el-cion-right">下一步</el-button>-->


<!--     <el-form :inline="true">-->
     <div class="button-container">
     <button class="flashButton"  @click="next">下一步</button>
     <div class="toggle-cont">
       <input class="toggle-input"
              id="toggle"
              name="toggle"
              type="checkbox"
              v-model="dispalyInfect" />
       <label class="toggle-label" for="toggle">
         <div class="cont-label-play">
           <span class="label-play"></span>
         </div>
       </label>
     </div>
<!--       <el-form-item style="padding: 0; margin: 10px 0 0 12px;">-->
         <el-button type="primary" round @click="dialogVisible1 = true" class="button button-right" >当前步的风险节点</el-button>
         <!--                <el-button type="text" @click="dialogVisible2 = true" style="margin-left:20px">风险源</el-button>-->
<!--       </el-form-item>-->

     </div>
    </div>

</template>

<script>
import {Loading} from "element-ui";
import http from "@/utils/request";
import cytoscape from 'cytoscape'
import expandCollapse from "cytoscape-expand-collapse";
import euler from "cytoscape-euler";
const rangeOptions = ['股东', '流通股东', '股权质押', '担保', '格兰杰因果关系'];
export default {
  components: {},
  data() {
    return {

      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      activityData:[],
      source:'',
      currentData:'',
      clock:undefined,
      dispalyInfect:false,
      table_datas:[],
      showStep:false,
      active:0,
      waitLoad:false,
      elements_data: { 'nodes': [], 'edges': [] },
      step: 0,
      intervalId: null,
      warningString:'',

      // 控制抽屉是否展开
      drawer: false,
      riskSelect: '',
      conductionRange: '',
      // 多选框-传导范围
      checkAllRange: false,
      checkedRanges: [],
      Ranges: rangeOptions,
      isIndeterminate: true,//用以表示 checkbox 的不确定状态，一般用于实现全选的效果
      // 时间
      date: '',

      // 弹窗
      dialogVisible1: false,
      dialogVisible2: false,

    }
  },

  watch:{
    dispalyInfect(newValue){

      if (newValue===true){

        this.$message.info('开始播放')
        //开始播放
        this.clock=setInterval(this.next,3000)
      }
      if(newValue===false){
        this.$message.info('暂停播放')
        clearInterval(this.clock)
      }
    },

    $route: {
      handler: function(old) {
        if (Object.keys(old.params).length>0){
          this.sent(old.params.name,old.params.type,'股东,流通股东,股权质押,担保,格兰杰因果关系',old.params.date)
          this.source=old.params.name

        }

      },
      immediate: true
    },
   //  step(newValue){
   //    this.currentData=this.table_datas[this.step]
   //
   // }

  },
beforeDestroy() {
  clearInterval(this.clock)
    //需要清除
    },
  computed: {

    // step改变才会触发steps的计算属性？
    steps() {
      const result = [];
      for (let i = 1; i <= this.step; i++) {
        result.push({
          title: '第' + i  + '阶段'
        });
      }
      return result;
    }
  },
  mounted() {
    this.initGraph()
  },

  methods: {


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

    next() {

      if (this.active=== this.step) {

        this.active = 0;   //回零  ++优先级高与>
        //初始状态
        //点击每一个阶段
        //代表不同的感染程度？ //只有最后一个阶段才会出现，前面都是感染节点

        this.$cy.nodes().removeClass('cr_node');
        this.$cy.nodes().removeClass('cr_node25');
        this.$cy.nodes().removeClass('cr_node50');
        this.$cy.nodes().removeClass('cr_node75');
        this.$cy.nodes().removeClass('cr_node100');

      }


        // var index = $(this).index('.step-icon-txt');
        this.currentData = this.table_datas[this.active];  //这一阶段的传染节点  和table_datas的下标相对应
      // console.log(cr_data)
      // console.log(this.active)
        //对最后一阶段的节点权重进行排序
        // let last_index = $('.step-icon-txt').length - 1;
      let last_data = this.table_datas[this.step-1];
        last_data.sort(function (a, b) {
          return (a['val'] - b['val'])
        });
        let l = last_data.length;
      let s25 = last_data.slice(0, parseInt(l * 0.25)),
            s50 = last_data.slice(parseInt(l * 0.25), parseInt(l * 0.5)),
            s75 = last_data.slice(parseInt(l * 0.5), parseInt(l * 0.75)),
            s100 = last_data.slice(parseInt(l * 0.75), l);

        if (this.active < this.step-1) {
          for (let i = 0; i < this.currentData.length; i++) {
            let name = this.currentData[i]['name'];
            this.$cy.nodes().filter(function (element, i) {
              return element.data('name') === name
            }).addClass('cr_node')

          }
        } else
        {

          //最后阶段
          for (let i = 0; i < s25.length; i++) {
            let name = s25[i]['name'];
            this.$cy.nodes().filter(function (element, i) {
              return element.data('name') === name
            }).addClass('cr_node25')
          }
          for (let i = 0; i < s50.length; i++) {
            let name = s50[i]['name'];
            this.$cy.nodes().filter(function (element, i) {
              return element.data('name') === name
            }).addClass('cr_node50')
          }
          for (let i = 0; i < s75.length; i++) {
            let name = s75[i]['name'];
            this.$cy.nodes().filter(function (element, i) {
              return element.data('name') === name
            }).addClass('cr_node75')
          }
          for (let i = 0; i < s100.length; i++) {
            let name = s100[i]['name'];
            this.$cy.nodes().filter(function (element, i) {
              return element.data('name') === name
            }).addClass('cr_node100')
          }
        }

      this.active++
//这里源代码是根据的点击阶段改变了表格展现的数据
        // //表格
        // var tableData = [];
        // // for(var h=0;h<=index;h++)
        // // {
        // var con = '';
        // var dd = table_datas[index];
        // dd.sort(function (a, b) {
        //   return (b['val'] - a['val'])
        // })
        // for (var i = 0; i < dd.length; i++) {
        //   con += (dd[i]['name'] + '：' + dd[i]['val'] + '\n');
        // }
        //
        // var d1 = {
        //   jd: index + 1,
        //   cons: con
        // }
        // tableData.push(d1)
        // }
        // $("#info_table").bootstrapTable('destroy');
        // $('#info_table').bootstrapTable({
        //   data: tableData,
        //   toolbar: '#toolbar1',                //工具按钮用哪个容器
        //   striped: true,                      //是否显示行间隔色
        //   cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        //   pagination: true,                   //是否显示分页（*）
        //   sortable: false,                     //是否启用排序
        //   sortOrder: "asc",                   //排序方式
        //   locale: "zh-CN", //表格汉化
        //   // queryParams: oTableInit.queryParams,//传递参数（*）
        //   sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        //   pageNumber: 1,                       //初始化加载第一页，默认第一页
        //   pageSize: 10,                       //每页的记录行数（*）
        //   pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        //   clickToSelect: true,
        //   showExport: true,                     //是否显示导出
        //   // exportDataType: $(this).val(),
        //   exportDataType: "all",              //basic', 'all', 'selected'.
        //   columns: [
        //     {
        //       field: 'jd',
        //       title: '阶段'
        //     }, {
        //       field: 'cons',
        //       title: '详细信息（公司名称：风险值）'
        //     }]
        // });
        // $('#info_table').bootstrapTable('hideLoading');





    },

    initGraph(){
      if (!cytoscape().expandCollapse) {
        cytoscape.use(expandCollapse)
      }
      if (!cytoscape().euler) {
        cytoscape.use(euler)
      }
      this.$cy = cytoscape({
            container: document.getElementById('graph'),
            // ready: function () {
            // var api = this.expandCollapse({
            //   layoutBy: {
            //     name: 'euler',
            //     randomize: true,
            //     animate: false
            //   },
            //   fisheye: true,
            //   animate: false,
            //   ready: function () { },
            //   undoable: false,
            //   randomize: false,
            //
            //   cueEnabled: true, // Whether cues are enabled
            //   expandCollapseCueSize: 12, // size of expand-collapse cue
            //   expandCollapseCueLineSize: 8, // size of lines used for drawing plus-minus icons
            //   expandCueImage: undefined, // image of expand icon if undefined draw regular expand cue
            //   collapseCueImage: undefined, // image of collapse icon if undefined draw regular collapse cue
            //   expandCollapseCueSensitivity: 1, // sensitivity of expand-collapse cues
            //   allowNestedEdgeCollapse: false
            // });
            //api.collapseAll();

          // },
          style: cytoscape.stylesheet()

          .selector('node[label = "公司"]')   //定义节点的样式
          .css({ 'background-color': '#d71345' })
          .selector('node[label = "上市公司"]')
          .css({ 'background-color': '#ef4136' }) //'shape':'triangle'
          .selector('node[label = "上市公司-实体企业"]')
          .css({ 'background-color': '#FF1493' })
          .selector('node[label = "上市公司-金融机构"]')
          .css({ 'background-color': '#C71585' })
          .selector('node[label = "上市公司-金融机构-银行"]')
          .css({ 'background-color': '#f8aba6' })
          .selector('node[label = "上市公司-金融机构-证券"]')
          .css({ 'background-color': '#f05b72' })
          .selector('node[label = "上市公司-金融机构-保险"]')
          .css({ 'background-color': '#d93a49' })
          .selector('node[label = "上市公司-金融机构-信托"]')
          .css({ 'background-color': '#FF69B4' })
          .selector('node[label = "上市公司-金融机构-基金"]')
          .css({ 'background-color': '#DB7093' })
          .selector('node[label = "上市公司-金融机构-基金-公募基金"]')
          .css({ 'background-color': '#FFB6C1' })
          .selector('node[label = "上市公司-金融机构-基金-私募基金"]')
          .css({ 'background-color': '#FFC0CB' })
          .selector('node[label = "上市公司-金融机构-其他金融机构"]')
          .css({ 'background-color': '#D8BFD8' })
          .selector('node[label = "非上市公司"]')
          .css({ 'background-color': '#102b6a' })
          .selector('node[label = "非上市公司-实体企业"]')
          .css({ 'background-color': '#224b8f' })
          .selector('node[label = "非上市公司-金融机构"]')
          .css({ 'background-color': '#2a5caa' })
          .selector('node[label = "非上市公司-金融机构-银行"]')
          .css({ 'background-color': '#2b4490' })
          .selector('node[label = "非上市公司-金融机构-证券"]')
          .css({ 'background-color': '#426ab3' })
          .selector('node[label = "非上市公司-金融机构-保险"]')
          .css({ 'background-color': '#0072E3' })
          .selector('node[label = "非上市公司-金融机构-信托"]')
          .css({ 'background-color': '#0080FF' })
          .selector('node[label = "非上市公司-金融机构-基金"]')
          .css({ 'background-color': '#46A3FF' })
          .selector('node[label = "非上市公司-金融机构-基金-公募基金"]')
          .css({ 'background-color': '#66B3FF' })

          .selector('node[label = "非上市公司-金融机构-基金-私募基金"]')
          .css({ 'background-color': '#84C1FF' })
          .selector('node[label = "非上市公司-金融机构-其他金融机构"]')
          .css({ 'background-color': '#97CBFF' })

          .selector('node[label = "人物"]')
          .css({ 'background-color': '#e0861a' })
          .selector('node[label = "人物-普通人物"]')
          .css({ 'background-color': '#fcaf17' })
          .selector('node[label = "人物-基金经理"]')
          .css({ 'background-color': '#faa755' })
          .selector('node[label = "人物-投资经理"]')
          .css({ 'background-color': '#f58220' })

          .selector('node[label = "机构-国务院国有资产监督管理委员会"]')
          .css({ 'background-color': '#2e3a1f' })

          .selector('node[label = "监管机构"]')
          .css({ 'background-color': '#1d953f' })
          .selector('node[label = "监管机构-银保监会（局）"]')
          .css({ 'background-color': '#78a355' })
          .selector('node[label = "监管机构-证监会（局）"]')
          .css({ 'background-color': '#7fb80e' })
          .selector('node[label = "监管机构-人民银行（分行）"]')
          .css({ 'background-color': '#78a355' })
          .selector('node[label = "监管机构-食药监局"]')
          .css({ 'background-color': '#abc88b' })
          .selector('node[label = "监管机构-网信"]')
          .css({ 'background-color': '#45b97c' })
          .selector('node[label = "监管机构-工信"]')
          .css({ 'background-color': '#007d65' })
          .selector('node[label = "监管机构-行业协会"]')
          .css({ 'background-color': '#40835e' })

          .selector('node[label = "交易所"]')
          .css({ 'background-color': '#3e4145' })

          .selector('node[label = "板块"]')
          .css({ 'background-color': '#563624' })

          .selector('node[label = "地点"]')
          .css({ 'background-color': '#2468a2' })
          .selector('node[label = "地点-国家"]')
          .css({ 'background-color': '#228fbd' })
          .selector('node[label = "地点-省"]')
          .css({ 'background-color': '#33a3dc' })
          .selector('node[label = "地点-县/区"]')
          .css({ 'background-color': '#7bbfea' })
          .selector('node[label = "地点-市"]')
          .css({ 'background-color': '#90d7ec' })

          .selector('node[label = "行业"]')
          .css({ 'background-color': '#2e3a1f' })
          .selector('node[label = "行业-门类"]')
          .css({ 'background-color': '#454926' })
          .selector('node[label = "行业-大类"]')
          .css({ 'background-color': '#726930' })
          .selector('node[label = "行业-中类"]')
          .css({ 'background-color': '#4d4f36' })

          .selector('node[label = "产品"]')
          .css({ 'background-color': '#494e8f' })
          .selector('node[label = "产品-一般产品"]')
          .css({ 'background-color': '#585eaa' })
          .selector('node[label = "产品-服务产品"]')
          .css({ 'background-color': '#6a6da9' })
          .selector('node[label = "产品-金融产品"]')
          .css({ 'background-color': '#6950a1' })
          .selector('node[label = "产品-金融产品-股票"]')
          .css({ 'background-color': '#6f60aa' })
          .selector('node[label = "产品-金融产品-债券"]')
          .css({ 'background-color': '#6f599c' })
          .selector('node[label = "产品-金融产品-基金"]')
          .css({ 'background-color': '#9b95c9' })
          .selector('node[label = "产品-金融产品-基金--公募"]')
          .css({ 'background-color': '#afb4db' })
          .selector('node[label = "产品-金融产品-基金--私募"]')
          .css({ 'background-color': '#C7C7E2' })
          .selector('node[label = "产品-金融产品-基金--REITS"]')
          .css({ 'background-color': '#867892' })
          .selector('node[label = "产品-金融产品-信托"]')
          .css({ 'background-color': '#918597' })
          .selector('node[label = "产品-金融产品-其他"]')
          .css({ 'background-color': '#6f6d85' })

          .selector('node[label = "学校"]')
          .css({ 'background-color': '#ffd400' })

          .selector('node[label = "非上市公司其他公司"]')
          .css({ 'background-color': '#cbc547' })

          .selector('node[label = "未知"]')
          .css({ 'background-color': '#d9d6c3' })

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
            'width': '17px',
            'height': '17px',

          })
          .selector('edge')   //定义边的样式
          .style({
            //'label': 'data(relationship)',
            'target-arrow-shape': 'triangle-backcurve', /*箭头样式*/
            'target-arrow-size': '0.1px', /*箭头大小*/
            'target-arrow-color': '#8B8989', /*箭头颜色*/
            'curve-style': 'bezier', /*线条样式曲线*/
            'line-color': '#8B8989', /*线条颜色*/
            'width': '2px', /*线条宽度*/
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
                'source-arrow-shape':this.setSourceArrowShape,
                'source-arrow-color': this.setColor4CompoundEdge,
              })
          .selector('node:selected')
          .style({ 'border-color': '#c84e40', 'border-width': "1px", })
          .selector('.search_node')
          .style({ 'border-color': '#c84e40', 'border-width': "2px", })
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
          .selector('.cr_node')
          .css({
            'background-color': '#f05b72', //定义节点标签颜色
          })
          .selector('.cr_edge')
          .style({
            'target-arrow-color': '#f05b72', /*箭头颜色*/
            'line-color': '#f05b72' /*线条颜色*/
          })

          .selector('.cr_node25')
          .css({
            'background-color': '#45b97c', //定义节点标签颜色
          })
          .selector('.cr_node50')
          .css({
            'background-color': '#ffc20e',
          })
          .selector('.cr_node75')
          .css({
            'background-color': '#f58220',
          })
          .selector('.cr_node100')
          .css({
            'background-color': '#b22c46', //最严重
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
          .style({ 'opacity': '0.1', })    //opacity: 透明度
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
          }),

          elements: this.elements_data,
          layout: {
        name: 'breadthfirst',
            directed: true,
            padding: 30,
      },   //可选：'breadthfirst', 'circle', 'concentric', 'cose', 'grid','null', 'preset', 'random'
      zoom: 1,
          pan: { x: 0, y: 0 },
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
          hideEdgesOnViewport: true,
      // textureOnViewport: true
    });


},

    getRandomColor() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      if (r === 255 && g === 255 && b === 255)
        this.getRandomColor();
      else
        return "rgb(" + r + ',' + g + ',' + b + ")";
    },

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



    sent(code, fxlxValue, cdfw_str, time_input) {
      this.currentData=''
      this.table_datas=''
      let that=this
      console.log(cdfw_str)
      let options={
        text:'请稍等'
      }
      let loadingInstance = Loading.service(options);
      http.get('/risk_model/risk_diff/'
      ,{params:{
        type:fxlxValue,
              range:cdfw_str,
              date:time_input,
              code:code,

            }}
      ).then((res)=>{
        this.source=res.data.source
        this.initGraph()
            this.$cy.elements().remove();
            let get_data=res
            // $("#info_table").bootstrapTable('destroy');

            // $('.glyphicon-exclamation-sign').css('display','block').html('(' + get_data['data']['method'] + ')' + '当前风险源：' + get_data['data']['source']);
            // $('.glyphicon-exclamation-sign').css('display', 'block').html(fxlxValue + '-' + '风险源(由' + get_data['data']['method'].slice(0, 2) + '数据筛选)：' + get_data['data']['source']);
            this.warningString=fxlxValue + '-' + '风险源(由' + get_data['data']['method'].slice(0, 2) + '数据筛选)：' + get_data['data']['source']
        this.waitLoad=false

            if (get_data['data']['method'] === '财务报表') {
              // document.getElementById('a1').innerText = '(财务报表) 当前风险源：' + get_data['data']['source'];
              // document.getElementById('a1').innerText = fxlxValue + '-' + '风险源(由财务数据筛选)：' + get_data['data']['source'];
              this.$message({
                showClose: true,
                message: this.warningString,
                type: 'success',
                duration:5000,
              });

            }

        let net_datas = get_data['data']['net'];
        this.table_datas = get_data['data']['table'];
        // let stepTitles = [];

            this.step=net_datas.length
            this.showStep=true
            for (let i = 0; i < net_datas.length; i++) {
              let info = {"nodes": net_datas[i]['nodes'], "edges": net_datas[i]['edges']}
              this.$cy.add(info);

              // stepTitles.push('第' + (i + 1) + '阶段');
              // time_div_cons += '<span data-time='+ i +'>  </span>';
            }

            // $('.box').html("")
            // $('.box').step({
            //   stepDirection: 'x',
            //   showStepButton: true,
            //   stepCount: stepTitles.length,
            //   stepTitles: stepTitles,
            // });

      //       var tableData = [];
      //
      //       var con = '';
      //       var dd = table_datas[0];
      //       //dd是源信息 格式如下[
      // //   {
      // //     "name": "深圳市天健(集团)股份有限公司",
      // //       "val": 996055135.6
      // //   }
      // // ],
      //       dd.sort(function (a, b) {
      //         return (b['val'] - a['val'])
      //       })
      //       for (let i = 0; i < dd.length; i++) {
      //         con += (dd[i]['name'] + '：' + dd[i]['val'] + '\n');
      //       }
      //
      //       var d1 = {
      //         jd: 1,
      //         cons: con
      //       }
      //       tableData.push(d1)

            // }
            // $("#info_table").bootstrapTable('destroy');
            // $('#info_table').bootstrapTable({
            //   data: tableData,
            //   toolbar: '#toolbar1',                //工具按钮用哪个容器
            //   striped: true,                      //是否显示行间隔色
            //   cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            //   pagination: true,                   //是否显示分页（*）
            //   sortable: false,                     //是否启用排序
            //   sortOrder: "asc",                   //排序方式
            //   locale: "zh-CN", //表格汉化
            //   // queryParams: oTableInit.queryParams,//传递参数（*）
            //   sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            //   pageNumber: 1,                       //初始化加载第一页，默认第一页
            //   pageSize: 10,                       //每页的记录行数（*）
            //   pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            //   clickToSelect: true,
            //   showExport: true,                     //是否显示导出
            //   // exportDataType: $(this).val(),
            //   exportDataType: "all",              //basic', 'all', 'selected'.
            //   columns: [
            //     {
            //       field: 'jd',
            //       title: '阶段'
            //     }, {
            //       field: 'cons',
            //       title: '详细信息（公司名称：风险值）'
            //     }]
            // });
            // $('#info_table').bootstrapTable('hideLoading');

            const layout = this.$cy.layout({
              name: 'euler',
              randomize: true,
              animate: false,
            });
            layout.run();

        this.$cy.nodes().filter(function (element, i) {
              return element.data('name') === that.table_datas[0][0]['name']
            }).addClass('cr_node')  //传染节点

            // document.getElementById('fade').style.display = 'none';
            // document.getElementById('light').style.display = 'none';
            // $("#light_a").attr("disabled", false).css("pointer-events", "auto");



        loadingInstance.close()
      }).finally(()=>
          loadingInstance.close()
      )

    },


    // 多选框-传导范围
    handleCheckAllChange(val) {
      this.checkedRanges = val ? rangeOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedRangesChange(value) {
      let checkedCount = value.length;
      this.checkAllRange = checkedCount === this.Ranges.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.Ranges.length;
    },
    // 查询
    onSubmit1() {


      // var fxlx = document.querySelector("#fxlx");
      // var fxlxIndex = fxlx.selectedIndex;
      // var fxlxValue = fxlx.options[fxlxIndex].value;  //风险类型

      // var cdfw = $(".cdfw_label");
      var cdfw_str = '';
      for (var i = 0; i < this.checkedRanges.length; i++) {
        // if (this.checkedRanges[i].checked) {
          cdfw_str += this.checkedRanges[i] + ","
        // }
      }  //传导范围 cdfw_str
      // cdfw_str += cdfw[cdfw.length-1].value
      cdfw_str = cdfw_str.substr(cdfw_str.length - 1, 1) === ',' ? cdfw_str.substr(0, cdfw_str.length - 1) : cdfw_str;
      console.log(cdfw_str)
      // var time_input = $("#time_input").val();  //选择的时间

      if (this.date === '' || this.riskSelect === "" ||this.checkedRanges===[] ) {
        alert("请检查时间、传导范围和风险类型！")

      }
      else {
        // let options = {
        //   text: '请稍等'
        // }
        // let loadingInstance = Loading.service(options);
        this.waitLoad=true
        http.get('/risk_model/risk_gg/',{params: {
              date:this.date ,
              wh: this.riskSelect,
          }
          }).then((res) => {
          // console.log(get_data.code,'llllllllllllll')
          let get_data=res.data
          // let str = '';
          // for(let key in get_data.data) {
          //     str += `<a>${key} ${get_data.data[key].join(', ')}</a><br>`;
          // }
          let ks = Object.keys(get_data.data)
          // if (ks.length == 0)
          // console.log(typeof (get_data.data))
          if (typeof get_data.data === "string") {
            // 无个股事件
            // document.getElementById('light').style.display = 'none';
            // document.getElementById('fade').innerText = "正在加载数据";
            // document.getElementById('a1').innerText = '(财务报表)当前风险源：' + get_data.data;

            //
            // document.getElementById('a1').innerText = fxlxValue + '-' + '风险源(由财务数据筛选)：' + get_data.data;
            // document.getElementById('a2').innerText = '';
            // document.getElementById('a3').innerText = '';
          } else {
            // document.getElementById('a1').innerText = ks[0] + get_data.data[ks[0]];
            // document.getElementById('a2').innerText = ks[1] + get_data.data[ks[1]];
            // document.getElementById('a3').innerText = ks[2] + get_data.data[ks[2]];
          }
          // $("#light_a").attr("disabled", true).css("pointer-events", "none");

          // document.getElementById('light').innerText = str;
          // setTimeout(function () {
          //     document.getElementById('fade').style.display = 'none';
          //     document.getElementById('light').style.display = 'none';
          // }, 1500)
          console.log(get_data.code, this.riskSelect, cdfw_str, this.date)
          this.sent(get_data.code, this.riskSelect, cdfw_str, this.date);
          // loadingInstance.close()
// sent(fxlxValue, cdfw_str, time_input);

        }).catch((e)=>{
          this.waitLoad=false
          alert(e)}
        )

      }



    },
  }
}
</script>

<style lang='less' scoped>

.graph {
  /*//margin-left: -800px;*/
  /*  transform: translate(0,0);*/
  height: 700px;
  /*width: */
}


.toggle-cont {
  width: 100px;
  height: 50px;
  border-radius: 9999px;
}

.toggle-cont .toggle-input {
  display: none;
}

.toggle-cont .toggle-label {
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 6px;
  width: 100%;
  height: 100%;
  background: #d0f3cb;
  border-radius: 9999px;
  box-sizing: content-box;
  box-shadow: 0px 0px 16px -8px #fefefe;
}

.toggle-cont .toggle-label .cont-label-play {
  position: relative;
  width: 50px;
  aspect-ratio: 1 / 1;
  background: rgb(75, 229, 70);
  border-radius: 9999px;
  transition: all 0.5s cubic-bezier(1, 0, 0, 1);
}

.toggle-cont .toggle-input:checked + .toggle-label .cont-label-play {
  background: #f43f5e;
  transform: translateX(50px);
}

.toggle-cont .toggle-label .label-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 24px;
  aspect-ratio: 1 / 1;
  background: #fefefe;
  border-radius: 4px;
  clip-path: polygon(25% 0, 75% 50%, 25% 100%, 25% 51%);
  transition: all 0.5s cubic-bezier(1, 0, 0, 1);
}

.toggle-cont .toggle-input:checked + .toggle-label .label-play {
  width: 20px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
//input:checked ~ .slider {
//  background-color: #f6cfb5;
//}


.button-container {
  display: flex;
  align-items: center; /* 垂直居中 */
}
.button-right {
  margin-right: 0;
  margin-left: auto;
}

.flashButton {
  margin-right: 10px;
  padding: 13px 20px;
  border-radius: 30px;
  cursor: pointer;
  border: 0;
  background-color: white;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.5s ease;
}

.flashButton:hover {
  letter-spacing: 3px;
  background-color: hsl(150deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(150 220 170) 0px 7px 29px 0px;
}

.flashButton:active {
  letter-spacing: 3px;
  background-color: hsl(150deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(150 220 170) 0px 0px 0px 0px;
  transform: translateY(4px);
  transition: 100ms;
}



    .grayish_btn{//浅灰色按钮
    color: #fff;//文字颜色
    background-color: #aaaaaa;//背景颜色
  }

    @-webkit-keyframes honeycomb {
      0%,
      20%,
      80%,
      100% {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
      }

      30%,
      70% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    @keyframes honeycomb {
      0%,
      20%,
      80%,
      100% {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
      }

      30%,
      70% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    .honeycomb {
      height: 24px;
      position: relative;
      width: 24px;
    }

    .honeycomb div {
      -webkit-animation: honeycomb 2.1s infinite backwards;
      animation: honeycomb 2.1s infinite backwards;
      background: #f3f3f3;
      height: 12px;
      margin-top: 6px;
      position: absolute;
      width: 24px;
    }

    .honeycomb div:after, .honeycomb div:before {
      content: '';
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      position: absolute;
      left: 0;
      right: 0;
    }

    .honeycomb div:after {
      top: -6px;
      border-bottom: 6px solid #f3f3f3;
    }

    .honeycomb div:before {
      bottom: -6px;
      border-top: 6px solid #f3f3f3;
    }

    .honeycomb div:nth-child(1) {
      -webkit-animation-delay: 0s;
      animation-delay: 0s;
      left: -28px;
      top: 0;
    }

    .honeycomb div:nth-child(2) {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s;
      left: -14px;
      top: 22px;
    }

    .honeycomb div:nth-child(3) {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
      left: 14px;
      top: 22px;
    }

    .honeycomb div:nth-child(4) {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
      left: 28px;
      top: 0;
    }

    .honeycomb div:nth-child(5) {
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s;
      left: 14px;
      top: -22px;
    }

    .honeycomb div:nth-child(6) {
      -webkit-animation-delay: 0.5s;
      animation-delay: 0.5s;
      left: -14px;
      top: -22px;
    }

    .honeycomb div:nth-child(7) {
      -webkit-animation-delay: 0.6s;
      animation-delay: 0.6s;
      left: 0;
      top: 0;
    }
</style>
