<template xmlns:position="http://www.w3.org/1999/xhtml">
  <div class="container" >
<!--    <form action="">-->
<!--      <input type="text"   v-model="content">-->
<!--      <button @click="findNode(content)" type="button">搜索图谱</button>-->
<!--    </form>-->
    <el-form :inline="true">
      <el-form-item label="公司名称">
<!--        回车查询-->
        <form @submit.prevent>
        <el-input v-model="content"  placeholder="请输入" size="mini" @keyup.enter.native="findNode(content)" @submit.native.prevent></el-input>
        </form>
      </el-form-item>
      <el-form-item>
        <el-button class="grayish_btn" @click="findNode(content)" size="mini" >查询</el-button>
      </el-form-item>
      <el-button @click="drawer = true" type="primary" plain style="margin-left: 20px;">更多功能</el-button>
    </el-form>

    <!--    详细信息弹窗-->
    <el-button type="text" @click="dialogVisible = true" >查看详细信息</el-button>
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="100%">
      <el-table style="width: 100%" border :data="tableData" empty-text="暂无数据" >
        <template v-for="(item,index) in tableHead">
          <el-table-column  :prop="item.prop" :label="item.label" :key="index" :width="item.width"></el-table-column>
        </template>

      </el-table>
    </el-dialog>

<!--    关联实体弹窗-->
    <el-dialog title="关联实体信息" :visible.sync="relationDialog" width="70%" >
        <el-table :data="relationData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                  border
                  stripe
                  style="width: 100%">          <!-- style="width: 40%"               height="215"  -->
          <el-table-column
              prop="关联实体"
              label="关联实体 "
              width="180">
          </el-table-column>
          <el-table-column
              prop="类型"
              label="关联类型"
              width="180">
          </el-table-column>
          <el-table-column
              prop="权重"
              label="权重"
              width="300">
          </el-table-column>
          <el-table-column
              prop="相似性强度"
              label="相似性强度"
              width="80">
          </el-table-column>
        </el-table>


      <!--      分页-->
      <div class="block" style="margin-top:15px;">
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage"

                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="relationData.length">
        </el-pagination>
      </div>

      <div class="flex-charts">
        <div ref="relationChart" style="height:300px;width:1000px; border: 1px solid #e0e0e0;margin:20px"></div>
      </div>

    </el-dialog>


<!--    邻居统计弹窗-->
    <el-dialog title="关联实体信息" :visible.sync="neighborDialog" width="70%" >

<!--      <emphasized-text :emphasized-text="'邻居数' numNeighbors"></emphasized-text>-->
      <div>
        <p >邻居总数：{{numNeighbors}}</p>
        <p >边总数：{{numEdge}}</p>
        <span>类型统计：</span>
        <span v-for="label in neighborLabel" :key="index">
            {{ label }}
      </span>

      </div>


        <div ref="neighborChart" style="height:300px;width:1000px; border: 1px solid #e0e0e0;margin:20px"></div>


    </el-dialog>
  <div class="graph" ref="graph" id="graph" ></div>
<!--    <div id="hovertip" position: absolute; ></div>-->
<!--    <div id="timebrush_div" style="z-index: 999;position: absolute;margin-top: -35px;width:100%;bottom: 20px" class="test1"></div>-->
    <table id="node_info_table"><tbody id="tbody1" style=""></tbody></table>


    <el-drawer
      title="功能选项卡"
      :visible.sync="drawer"
      :modal="false"
      :show-close="true"
      :with-header="false">


      <!-- 1、更改布局 -->
      <el-form label-position='top' label-width="80px" >

      <div style="margin-top: 20px;">
      <el-divider content-position="left"><p style="font-weight: bold">更改布局</p></el-divider>
      </div>

      <el-form-item >
        <el-button  @click="saveImg" size="mini" style="margin-left:12px ;">导出图谱</el-button>
        <el-button  @click="cose" size="mini" style="margin-left:12px ;">CoSE</el-button>
  <!--      <el-button  @click="euler" size="mini">euler</el-button>-->
        <el-button  @click="circle" size="mini">Circle</el-button>
        <el-button  @click="concentric" size="mini">Concentric</el-button>
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
        <el-button  @click="recover" size="mini">复原隐藏元素</el-button>
        <el-button  @click="clearAll" size="mini">清空</el-button>
    </el-form-item >
      </el-form>

      <!--    百分比高亮边-->
      <el-form :inline="true" >
        <div style="margin-top: 20px;">
          <el-divider content-position="left"><p style="font-weight: bold">按百分比高亮边</p></el-divider>
        </div>
        <div class="block">
          <span class="demonstration">自定义初始值</span>
          <el-slider v-model="percentage" :format-tooltip="formatTooltip"></el-slider>
        </div>

      </el-form>
<!--    节点最短路径-->
    <el-form :inline="true" >
      <div style="margin-top: 20px;">
        <el-divider content-position="left"><p style="font-weight: bold">最短路径</p></el-divider>
      </div>


      <el-form-item label="开始节点:" style="padding: 0; margin: 5px;margin-left:12px ;">
        <el-input v-model="startID" placeholder="节点ID" size="mini" ></el-input><!-- 修改宽度 -->
      </el-form-item>
      <el-form-item label="结束节点:" style="padding: 0;margin: 5px;margin-left:12px ;">
        <el-input v-model="endID" placeholder="节点ID" size="mini" ></el-input>
      </el-form-item>
      <el-switch
          v-model="directed"
          active-text="有向"
          inactive-text="无向"
          style="padding-top: 10px;margin: 5px;">
      </el-switch>
      <el-form-item>
        <el-button type="primary" plain size="mini" @click="shortestPath(startID,endID,directed)" style="margin-left: 20px;margin-bottom: 0px;">查询</el-button>
      </el-form-item>

    </el-form>
<!--    拓展节点-->
    <el-form :inline="true"  class="demo-form-inline">

      <div style="margin-top: 20px;">
        <el-divider content-position="left"><p style="font-weight: bold">节点</p></el-divider>
      </div>
      <el-form-item label="选择节点类型以拓展节点" style="padding: 0; margin: 0px;margin-left:12px ;">
<!--        <el-select v-model="formInline.region" placeholder="类型">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
      <el-select v-model="typeSelect" placeholder="类型"  size="mini">
          <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="display:block">
        <el-button type="primary" plain size="mini" @click="onSubmit" style="margin-left: 20px;">查询</el-button>
      </el-form-item>
    </el-form>
<!--    寻找关键节点-->
    <el-form :inline="true" >
      <div style="margin-top: 20px;">
        <el-divider content-position="left"><p style="font-weight: bold">关键节点</p></el-divider>
      </div>

      <el-form-item label="输入节点个数:" style="padding: 0; margin: 5px;margin-left:12px ;">
        <el-input v-model="num" placeholder="个数" size="mini"></el-input>
      </el-form-item>
      <el-form-item style="padding: 0px; margin: 0px;margin-left:9px ;">
        <el-radio v-model="keyNodeType" label="pr" style="padding: 0px; margin: 4px;">PageRank</el-radio>
        <el-radio v-model="keyNodeType" label="bc" style="padding: 0px; margin: 4px;">中介中心性</el-radio>
        <el-radio v-model="keyNodeType" label="dc" style="padding: 0px; margin: 4px;">度中心性</el-radio>
        <el-radio v-model="keyNodeType" label="cc" style="padding: 0px; margin: 4px;">紧密中心性</el-radio>
      </el-form-item>
      <el-form-item style="padding: 0px; margin: 5px;">
        <el-button type="primary" plain size="mini" @click="keyNode" style="margin-left: 20px;">查询</el-button>
      </el-form-item>
      <el-button type="text" @click="keynodeVisible = true" style="display:block;padding-top: 10px;margin-left: 10px;">查看详细信息</el-button>


      <el-dialog title="详细信息" :visible.sync="keynodeVisible" width="60%"  :modal="false">
        <el-table style="width: 100%" border :data="keyNodeTable" empty-text="暂无数据">

            <el-table-column
                prop="name"
                label="名称"
                width="300">
            </el-table-column>
          <el-table-column
              prop="lable"
              label="类型"
              width="300">
          </el-table-column>
          <el-table-column
              prop="value"
              label="节点得分"
              width="300">
          </el-table-column>
<!--          <template v-for="(item,index) in keyNodeTable">-->
<!--            <el-table-column  :prop="item.prop" :label="item.label" :key="index" :width="item.width"></el-table-column>-->
<!--          </template>-->
        </el-table>
      </el-dialog>
    </el-form>
      <!--    社团划分-->
      <el-form :inline="true" >
        <div style="margin-top: 20px;">
        <el-divider content-position="left">
          <p style="font-weight: bold">社团划分</p></el-divider>
      </div>
        <el-form-item label="社团划分方式:"  style="padding: 0px; margin: 0px;margin-left:9px ;">
        <el-radio v-model="communityType" label="lpa">LPA    </el-radio>
        <el-radio v-model="communityType" label="inf">infomap</el-radio>
        <el-radio v-model="communityType" label="lou">Louvain</el-radio>
        <el-radio v-model="communityType" label="le">leading_eigenvector</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain size="mini" @click="community" style="margin-left: 20px;">查询</el-button>
          <el-button type="primary" plain size="mini" @click="communityCancel" style="margin-left: 20px;">取消</el-button>
        </el-form-item>
        <el-button type="text" @click="communityVisible = true" style="display:block;padding-top: 10px;margin-left: 10px;">查看详细信息</el-button>
        <el-dialog title="详细信息" :visible.sync="communityVisible" width="100%"  :modal="false">
          <el-table style="width: 100%" border :data="communityTable" empty-text="暂无数据">

            <el-table-column
                prop="order"
                label="社团"
                width="100">
            </el-table-column>
            <el-table-column
                prop="data"
                label="节点"
                width="700">
            </el-table-column>
            <!--          <template v-for="(item,index) in keyNodeTable">-->
            <!--            <el-table-column  :prop="item.prop" :label="item.label" :key="index" :width="item.width"></el-table-column>-->
            <!--          </template>-->
          </el-table>
        </el-dialog>
      </el-form>
<!--      按边显示-->
    <div style="margin-top: 20px;">
        <el-divider content-position="left">
          <p style="font-weight: bold">按边类型显示</p></el-divider>
      </div>
      <div class='checkbox1' style="margin-left:10px;">
        <el-checkbox :indeterminate="edgeIndeterminate" v-model="checkAllEdges" @change="handleCheckedAllEdges">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedEdges" @change="handleCheckedEdges">
          <el-checkbox v-for="edge in edgesTypes" :label="edge" :key="edge">{{edge}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <!--      按节点显示-->
      <div style="margin-top: 20px;">
        <el-divider content-position="left">
          <p style="font-weight: bold">按节点类型显示</p></el-divider>
      </div>

      <div  class="checkbox2" style="margin-left:10px;">
        <el-checkbox :indeterminate="nodeIndeterminate" v-model="checkAllNodes" @change="handleCheckedAllNodes" >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedNodes" @change="handleCheckedNodes">
          <el-checkbox v-for="node in nodeTypes" :label="node" :key="node">{{node}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <!--    时间轴-->
    </el-drawer>
    <div id="hovertip" class="info" ></div>
    <div id="timebrush_div" style="z-index: 999;position: absolute;margin-top: -35px;width:100%;bottom: 20px" class="test1">
      <div v-html="svg"></div>
<!--      <div id="hovertip" style="position: absolute;margin-top: -35px;width:100%;bottom: 40px" ></div>-->
    </div>
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
import BubbleSets from "cytoscape-bubblesets";
import EmphasizedText from '../components/EmphasizedText.vue';
// cytoscape.use(euler)
// cytoscape.use(expandCollapse)
// cytoscape.use(cxtmenu)
export default {
  name: "graphViewV4",
  data() {
    return {
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      svg:null,
      parentSide:null,
      timebrustStart:null,
      timebrustEnd:null,
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
      percentage:0,
      neighborDialog:false,
      relationData:[],
      relationDialog:false,
      checkAllEdges: false,
      checkAllNodes: false,
      checkedCities: ['上海', '北京'],
      edgeData:[],
      edges:[' 股东', ' 流通股东', ' 股权质押', ' 股权赎回', ' 发行', ' 法律顾问', ' 财务审计', ' 战略合作', ' 竞争', ' 业务链', ' 监管', ' 成员', ' 保荐承销', ' 担保', ' 法人代表', ' 客户', ' 高管', ' 购买', ' 属于', ' 投资', ' 委托管理', ' 管理', ' 原材料', ' 补充', ' 注册', ' 设立', ' 交易', ' 经营', ' 毕业', ' 位于', ' 同学', ' 亲属', ' 同乡', ' 好友', ' 出生', ' 工作', ' 任职', ' 合作'],
      edgesTypes: [' 股东', ' 流通股东', ' 股权质押', ' 股权赎回', ' 发行', ' 法律顾问', ' 财务审计', ' 战略合作', ' 竞争', ' 业务链', ' 监管', ' 成员', ' 保荐承销', ' 担保', ' 法人代表', ' 客户', ' 高管', ' 购买', ' 属于', ' 投资', ' 委托管理', ' 管理', ' 原材料', ' 补充', ' 注册', ' 设立', ' 交易', ' 经营', ' 毕业', ' 位于', ' 同学', ' 亲属', ' 同乡', ' 好友', ' 出生', ' 工作', ' 任职', ' 合作'],
      checkedEdges:[],
      nodes:[ ' 上市公司', ' 上市公司-实体企业', ' 上市公司-金融机构', ' 上市公司-金融机构-银行', ' 上市公司-金融机构-证券', ' 上市公司-金融机构-保险', ' 上市公司-金融机构-信托', ' 上市公司-金融机构-基金', ' 上市公司-金融机构-基金-公募基金', ' 上市公司-金融机构-基金-私募基金', ' 上市公司-金融机构-其他金融机构', ' 非上市公司其他公司', ' 非上市公司-实体企业', ' 非上市公司-金融机构', ' 非上市公司-金融机构-银行', ' 非上市公司-金融机构-证券', ' 非上市公司-金融机构-保险', ' 非上市公司-金融机构-信托', ' 非上市公司-金融机构-基金', ' 非上市公司-金融机构-基金-公募基金', ' 非上市公司-金融机构-基金-私募基金', ' 非上市公司-金融机构-其他金融机构', ' 非上市公司其他公司',  ' 人物-普通人物', ' 人物-基金经理', ' 人物-投资经理', ' 机构-国务院国有资产监督管理委员会',  ' 监管机构-银保监会', ' 监管机构-证监会', ' 监管机构-人民银行', ' 监管机构-食药监局', ' 监管机构-网信', ' 监管机构-工信', ' 监管机构-行业协会', ' 交易所', ' 板块',  ' 地点-国家', '地点-省', '地点-县/区', ' 地点-市',  ' 行业-门类', ' 行业-大类', ' 行业-中类',  ' 产品-一般产品', ' 产品-服务产品',  ' 产品-金融产品-股票', ' 产品-金融产品-债券', ' 产品-金融产品-基金', ' 产品-金融产品-基金--公募', ' 产品-金融产品-基金--私募', ' 产品-金融产品-基金--REITS', ' 产品-金融产品-信托', ' 产品-金融产品-其他', ' 学校', '时间','事件-股东减持','事件-股东增持','事件-重大安全事故','事件-重大对外赔付',' 事件-重大资产损失','事件-高层死亡',' 事件-股权质押',' 事件-股权冻结','事件-破产清算','报道媒体',' 未知'],
      nodeTypes:[ ' 上市公司', ' 上市公司-实体企业', ' 上市公司-金融机构', ' 上市公司-金融机构-银行', ' 上市公司-金融机构-证券', ' 上市公司-金融机构-保险', ' 上市公司-金融机构-信托', ' 上市公司-金融机构-基金', ' 上市公司-金融机构-基金-公募基金', ' 上市公司-金融机构-基金-私募基金', ' 上市公司-金融机构-其他金融机构', ' 非上市公司其他公司', ' 非上市公司-实体企业', ' 非上市公司-金融机构', ' 非上市公司-金融机构-银行', ' 非上市公司-金融机构-证券', ' 非上市公司-金融机构-保险', ' 非上市公司-金融机构-信托', ' 非上市公司-金融机构-基金', ' 非上市公司-金融机构-基金-公募基金', ' 非上市公司-金融机构-基金-私募基金', ' 非上市公司-金融机构-其他金融机构', ' 非上市公司其他公司',  ' 人物-普通人物', ' 人物-基金经理', ' 人物-投资经理', ' 机构-国务院国有资产监督管理委员会',  ' 监管机构-银保监会', ' 监管机构-证监会', ' 监管机构-人民银行', ' 监管机构-食药监局', ' 监管机构-网信', ' 监管机构-工信', ' 监管机构-行业协会', ' 交易所', ' 板块',  ' 地点-国家', '地点-省', '地点-县/区', ' 地点-市',  ' 行业-门类', ' 行业-大类', ' 行业-中类',  ' 产品-一般产品', ' 产品-服务产品',  ' 产品-金融产品-股票', ' 产品-金融产品-债券', ' 产品-金融产品-基金', ' 产品-金融产品-基金--公募', ' 产品-金融产品-基金--私募', ' 产品-金融产品-基金--REITS', ' 产品-金融产品-信托', ' 产品-金融产品-其他', ' 学校', '时间','事件-股东减持','事件-股东增持','事件-重大安全事故','事件-重大对外赔付',' 事件-重大资产损失','事件-高层死亡',' 事件-股权质押',' 事件-股权冻结','事件-破产清算','报道媒体',' 未知'],
      checkedNodes:[],
      numEdge:0,
      neighborLabel:0,
      numNeighbors:0,
      edgeIndeterminate: true,
      nodeIndeterminate: true,
      shetuan_paths:[],
      communityData:null,
      communityVisible:false,
      communityTable:[],
      communityType:'',
      keynodeVisible:false,
      keyNodeTable:[],
      keyNodeType:'',
      num:'',
      // 控制抽屉是否展开
      drawer: false,
      typeSelect:'',
      directed:false,
      startID:null,
      endID:null,

      hideClickCount:{},
      nodeClickCount:{},
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
      type :[{'value': '板块', 'label': '板块'}, {'value': '行业-门类', 'label': '行业-门类'}, {'value': '行业-大类', 'label': '行业-大类'}, {'value': '地点-市', 'label': '地点-市'}, {'value': '地点-国家', 'label': '地点-国家'}, {'value': '上市公司-金融机构-其他金融机构', 'label': '上市公司-金融机构-其他金融机构'}, {'value': '上市公司-金融机构-证券', 'label': '上市公司-金融机构-证券'}, {'value': '上市公司-金融机构-银行', 'label': '上市公司-金融机构-银行'}, {'value': '上市公司-实体企业', 'label': '上市公司-实体企业'}, {'value': '上市公司-金融机构-保险', 'label': '上市公司-金融机构-保险'}, {'value': '上市公司-金融机构-基金-私募基金', 'label': '上市公司-金融机构-基金-私募基金'}, {'value': '上市公司-金融机构-基金-公募基金', 'label': '上市公司-金融机构-基金-公募基金'}, {'value': '上市公司-金融机构-信托', 'label': '上市公司-金融机构-信托'}, {'value': '交易所', 'label': '交易所'}, {'value': '人物-基金经理', 'label': '人物-基金经理'}, {'value': '人物-普通人物', 'label': '人物-普通人物'}, {'value': '产品-金融产品-债券', 'label': '产品-金融产品-债券'}, {'value': '产品-金融产品-基金--私募', 'label': '产品-金融产品-基金--私募'}, {'value': '产品-金融产品-基金--公募', 'label': '产品-金融产品-基金--公募'}, {'value': '产品-金融产品-基金—REITS', 'label': '产品-金融产品-基金—REITS'}, {'value': '产品-金融产品-股票', 'label': '产品-金融产品-股票'}, {'value': '地点-省', 'label': '地点-省'}, {'value': '监管机构-银保监会（局）', 'label': '监管机构-银保监会（局）'}, {'value': '监管机构-人民银行（分行）', 'label': '监管机构-人民银行（分行）'}, {'value': '监管机构-行业协会', 'label': '监管机构-行业协会'}, {'value': '监管机构-证监会（局）', 'label': '监管机构-证监会（局）'}, {'value': '学校', 'label': '学校'}, {'value': '非上市公司-金融机构-证券', 'label': '非上市公司-金融机构-证券'}, {'value': '非上市公司-金融机构-银行', 'label': '非上市公司-金融机构-银行'}, {'value': '非上市公司-实体企业', 'label': '非上市公司-实体企业'}, {'value': '非上市公司-金融机构-保险', 'label': '非上市公司-金融机构-保险'}, {'value': '非上市公司-金融机构-其他金融机构', 'label': '非上市公司-金融机构-其他金融机构'}, {'value': '非上市公司-金融机构-基金-公募基金', 'label': '非上市公司-金融机构-基金-公募基金'}, {'value': '非上市公司-金融机构-信托', 'label': '非上市公司-金融机构-信托'}, {'value': '地点-县/区', 'label': '地点-县/区'}, {'value': '非上市公司其他公司', 'label': '非上市公司其他公司'}, {'value': '未知', 'label': '未知'}, {'value': '组织机构', 'label': '组织机构'}, {'value': '产品-金融产品-其他', 'label': '产品-金融产品-其他'}, {'value': '时间', 'label': '时间'}, {'value': '事件-股东减持', 'label': '事件-股东减持'}, {'value': '事件-股东增持', 'label': '事件-股东增持'}, {'value': '报道媒体', 'label': '报道媒体'}, {'value': '事件-重大安全事故', 'label': '事件-重大安全事故'}, {'value': '事件-重大对外赔付', 'label': '事件-重大对外赔付'}, {'value': '事件-重大资产损失', 'label': '事件-重大资产损失'}, {'value': '事件-高层死亡', 'label': '事件-高层死亡'}, {'value': '事件-股权质押', 'label': '事件-股权质押'}, {'value': '事件-股权冻结', 'label': '事件-股权冻结'}, {'value': '事件-破产清算', 'label': '事件-破产清算'}]
    }
  },
  components: {
    EmphasizedText
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    clearAll(){

      this.$cy.elements().remove()
      this.$cy.destroy()
      this.content=''
      this.tableData=[]
      this.mindata=''
      this.mindata=''
      this.search_memory.length = 0
      this.num=''
      this.typeSelect=''
      http.get(
          '/graph/clear/').then()
    },
    recover(){
      this.$cy.elements().removeClass("light-off")
      this.timebrustStart=null
      this.timebrustEnd=null
    },
    formatTooltip(val){
      return val/100
    },
    displayAsPercentage(){
      var that=this
        this.$cy.elements().addClass("light-off");
          this.$cy.edges().filter(function (ele, i,eles) {
            var w = ele.data('w');
            if (w === '') return false;
            else if (w.substr(w.length - 1, 1) === '%') {
              w = parseFloat(w.substr(0, w.length - 1));
              if (w >= that.percentage/100)
                return true
              else return false;
            }
          }).removeClass("light-off");
          this.$cy.edges().filter(function (ele, i,eles) {
            var w = ele.data('w');
            if (w === '') return false;
            else if (w.substr(w.length - 1, 1) === '%') {
              w = parseFloat(w.substr(0, w.length - 1));
              if (w >= that.percentage/100)
                return true
              else return false;
            }
          }).connectedNodes().removeClass("light-off");
          if (this.percentage===100)
            this.$cy.elements().addClass("light-off");
          if(this.percentage===0)
            this.recover()

    },


    saveImg () {


      let blob = this.$cy.png({
        output: 'blob', bg: 'transparent',
        full: true, scale: 4, quality: 1
      });
      let aLink = document.createElement('a');
      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true);
      aLink.download = `${new Date().getTime()}.png`;
      aLink.href = URL.createObjectURL(blob);
      aLink.dispatchEvent(evt);
      aLink.click();
    },

    resize(){
      console.log(document.getElementById('graph').style.height)
      document.getElementById('graph').style.height=String(window.screen.height/108000*this.getRatio()*630)+'px'
      console.log(document.getElementById('graph').style.height)
    },
     getRatio()
{
  var ratio=0;
  var screen=window.screen;
  var ua=navigator.userAgent.toLowerCase();

  if(window.devicePixelRatio !== undefined)
  {
    ratio=window.devicePixelRatio;
  }
  else if(~ua.indexOf('msie'))
  {
    if(screen.deviceXDPI && screen.logicalXDPI)
    {
      ratio=screen.deviceXDPI/screen.logicalXDPI;
    }

  }
  else if(window.outerWidth !== undefined && window.innerWidth !== undefined)
  {
    ratio=window.outerWidth/window.innerWidth;
  }

  if(ratio)
  {
    ratio=Math.round(ratio*100);
  }
  return ratio;
},
    updateStatus(){
      let checked=[]
      // 去除空格
      for(let i in  this.checkedEdges)
        checked.push(this.checkedEdges[i].replace(/\s*/g,""))
      for(let i in  this.checkedNodes)
        checked.push(this.checkedNodes[i].replace(/\s*/g,""))
      // this.$cy.elements().hide()
      // console.log(this.$cy.elements().hidden())
      this.$cy.elements().hide();
      // this.$cy.elements(':hidden').removeClass('hidden')
      if (checked.length > 0) {
        let list = [];
        for (let i = 0; i < checked.length; i++) {
          list.push(checked[i])
        }
        for (let i = 0; i < checked.length; i++) {
          let checked_v = checked[i];
          console.log(checked_v)
          this.$cy.edges().filter(function (element, i) {
            return element.data('relationship') === checked_v
          }).show()
          //筛选边连接的点显示，避免悬空边
          this.$cy.edges().filter(function (element, i) {
            // console.log(element.connectedNodes(), element.connectedNodes().data('label'),'ppppppppppp')
            return element.data('relationship') === checked_v && list.indexOf(element.connectedNodes()[0].data('label')) !== -1 && list.indexOf(element.connectedNodes()[1].data('label')) !== -1
          }).connectedNodes()
              .show();
          this.$cy.nodes().filter(function (element, i) {
            return element.data('label') === checked_v
          }).show();
          this.$cy.nodes().filter(function (element, i) {
                if (element.data('label') === checked_v) {
                  for (var t = 0; t < element.connectedEdges(); t++) {
                    if (list.indexOf(element.connectedEdges()[t].data('relationship')) !== -1)
                      element.connectedEdges()[t].show();
                  }
                }
              }
          )
        }
      }


    },
    handleCheckedAllEdges(val){
      this.checkedEdges = val ? this.edgesTypes : [];
      this.edgeIndeterminate = false;
    },
    handleCheckedEdges(value) {
      let checkedCount = value.length;
      this.checkAllEdges = checkedCount === this.edges.length;
      this.edgeIndeterminate = checkedCount > 0 && checkedCount < this.edges.length;
    },
    handleCheckedAllNodes(val){
      this.checkedNodes = val ? this.nodeTypes : [];
      this.nodeIndeterminate = false;
    },
    handleCheckedNodes(value) {
      let checkedCount = value.length;
      this.checkAllNodes = checkedCount === this.nodes.length;
      this.nodeIndeterminate = checkedCount > 0 && checkedCount < this.nodes.length;
    },
    communityCancel(){
      const  path =this.$bb.getPaths()
      for (let i in  path)
      this.$bb.removePath(path[i])
          },
     getRandomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  if (r === 255 && g === 255 && b === 255)
    this.getRandomColor();
  else
    return "rgb(" + r + ',' + g + ',' + b + ")";
},
    community(){
      if (this.communityData){
        this.communityData.length=0
      }
      if (this.communityType==='')
        alert('请选择划分方式')
      else
      http.get('/graph/divide/?wh='+this.communityType).then((res)=>{
        this.$cy.elements().removeClass("light-off");

        var get_color = [];
        this.$cy.ready(() => {
          this.$bb = this.$cy.bubbleSets({
            interactive: true,
            zIndex: 100
          })
          //const ids = Array.from(new Set(cy.elements().map(el => el.data().label)))
          const ids = res.data.data;
          this.communityData=res.data.data
          ids.forEach(id => {
            const nodes = this.$cy.nodes().filter(function (ele) {
              let g = false;
              for (let t = 0; t < id.length; t++) {
                if (ele.data('id') === id[t]) g = true;
              }
              return g
            })

            let i_color = this.getRandomColor();
            get_color.push(i_color);

            let pp = this.$bb.addPath(nodes, null, null, {
              virtualEdges: true,
              style: {
                fill: 'rgba(255, 0, 0, 0)',
                stroke: i_color,
                strokeDasharray: '7, 7, 7'
              }
            })
            // this.shetuan_paths.push(pp);

          for (let i in res.data.data){

            this.communityTable.push({'order':i,'data':String(res.data.data[i])})
            // console.log(res.data.data[i])
          }

        })

        //表格信息
        // st_data = res.data.data;
        // if (st_data.length != 0) {
        //   document.getElementById("shetuan_div").style.height = '400px';
        //   document.getElementById("tishi_div").innerText = '提示：点击表格的某一行，高亮对应的社团';
        //   var tableData1 = "<tr style='border:1px solid black;'>" + //<td style='width: 30%;font-weight:bold;border:1px solid black;'>ID</td>
        //       "<td style='border:1px solid black;width:50px;'>社团</td>" +
        //       "<td style='border:1px solid black;'>社团成员ID</td>" +
        //       "</tr>";
        //   for (var i = 0; i < st_data.length; i++) {
        //     tableData1 += "<tr style='border:1px solid black;'>" + //<td style='width: 30%;font-weight:bold;border:1px solid black;'>"+info_data[i].id+"</td>
        //         "<td style='border:1px solid black;background-color: " + get_color[i] + "'>" + i + "</td>" +
        //         "<td style='border:1px solid black;'>" + st_data[i] + "</td>" +
        //         "</tr>";
        //   }
        //   $("#shetuan_tbody").html(tableData1);
        //
        // }
      //
      })
    }
    )},
    expandAllNodes(){this.$api.expandAll()},
    collapseAllNodes(){this.$api.collapseAll()},
    keyNode(){
      console.log(this.keyNodeType)
        if (!(/^[0-9]+$/.test(this.num))) alert("请输入非负整数！");
        else {
          let options={
            text:'请稍等'
          }
          let loadingInstance = Loading.service(options);
         http.get(
        '/graph/key_nodes/?type=' + this.keyNodeType + '&num=' + this.num).then((res)=>{
            let get_data=res.data
             this.$cy.nodes().removeClass('key_node');
           let data = get_data.data.top;
             for (let j = 0; j < data.length; j++) {
               //cy.$('#'+data[j]).removeClass("light-off");
               this.$cy.$('#' + data[j]).addClass('key_node');
             }
             loadingInstance.close()
             //表格信息
             this.keyNodeTable = get_data.data.info

           })
        }
      },

    onSubmit(){
      console.log(this.typeSelect)
      let input_label = this.typeSelect
      let name_list = [];
      this.$cy.nodes().filter(function (ele) {
        if (ele.data('label') === input_label)
          name_list.push(ele.data('id'))
      });
      console.log(name_list)
      let name_str = "";

      for (let j = 0; j < name_list.length - 1; j++) {
        name_str = name_str + name_list[j] + ",";
      }
      name_str = name_str + name_list[name_list.length - 1]

      let options={
        text:'请稍等'
      }
      let loadingInstance = Loading.service(options);

      http.get('/graph/expand/?name=' + name_str + '&label=' + input_label).then((res)=>{
        let get_data=res.data
        this.edgeData.push(...get_data.data['edges'])

          this.$cy.add(get_data.data['nodes'])
            this.$cy.add(get_data.data['edges'])

          if (this.search_memory.length === 0 || this.mindate === "" || this.maxdate === "") {
            this.mindate = get_data.data['mindate']
            this.maxdate = get_data.data['maxdate']
          }
          else {
            if (this.mindate > get_data.data['mindate'] && get_data.data['mindate'] !== "") this.mindate = get_data.data['mindate']
            if (this.maxdate < get_data.data['maxdate'] && get_data.data['maxdate'] !== "") this.maxdate = get_data.data['maxdate']
          }

          var layout = this.$cy.layout({
            name: 'euler',
            randomize: true,
            animate: false,
          });
          layout.run();

          if (get_data.data['id'] !== "") {
            for (let h = 0; h < get_data.data['id'].length; h++)
              this.$cy.$('#' + get_data.data['id'][h]).addClass("search_node");
          }

          loadingInstance.close()
          //时间轴
          document.getElementById("timebrush_div").innerHTML = "";
          var margin = { top: -12, right: 27, bottom: 21, left: 0 },
              width = document.all.graph.offsetWidth,
              height = 55 - margin.top - margin.bottom;

          this.x = d3.scaleTime()
              .domain([new Date(this.mindate), new Date(this.maxdate) - 1])
              .rangeRound([0, width]);
            this.brush=d3.brushX()
                .extent([[0, 0], [width, height+30]])
                //.on("start",brushstart)
                .on("brush",this.brushmove)
          // let svg = d3.select("#timebrush_div").append("svg")
            this.svg.selectAll("*").remove()
            this.svg = d3.select("#timebrush_div").append("svg")
                .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
                .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        this.svg
              .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
              .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          this.svg.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(this.x)
                  .ticks(d3.timeYear)
                  .tickPadding(0))
              .attr("text-anchor", null)
              .selectAll("text")
              .attr("fill", "#ef5b9c")
              .attr("x", 0);

          this.svg.append("g")
              .attr("class", "brush")
              .call(d3.brushX()
                  .extent([[0, 0], [width, height + 30]])
                  //.on("start",brushstart)
                  .on("brush", this.brushmove));
          // .on("end",brushended));

        },
        ).catch((error)=>{
          loadingInstance.close()
        console.log(error)
        alert('查询失败！')
      })

    },
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
      this.edgeData.push(...tmp['edges'])
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
    this.brush=d3.brushX()
        .extent([[0, 0], [width, height+30]])
        //.on("start",brushstart)
        .on("brush",this.brushmove)
      // let svg = d3.select("#timebrush_div").append("svg")
    this.svg.selectAll("*").remove()
    this.svg = d3.select("#timebrush_div").append("svg")
        .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
        .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.svg
          .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
          .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      this.svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(that.x)
              .ticks(d3.timeYear)
              .tickPadding(0))
          .attr("text-anchor", null)
          .selectAll("text")
          .attr("fill","#ef5b9c")
          .attr("x", 0);

      this.svg.append("g")
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
      if ( this.$cy.nodes().filter(function (element, i) {return element.data('id') === ele}).scratch().restData == null) {
        // Save node data and remove
        this.$cy.nodes().filter(function (element, i) { return element.data('id') === ele })
            .scratch({// restData: this.connectedEdges().targets().remove()
              restData:  this.$cy.nodes().filter(function (element, i) {
                return element.data('id') === ele
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
     chuantou(node_id) {
  // var parentC_flag = this.parentSide.css("display");//记录原来的状态
  //
  // if (parentC_flag === 'block') {
  //   this.parentSide.css("display", 'none');
  // }

       let options={
         text:'请稍等'
       }
       let loadingInstance = Loading.service(options);


       http.get('/graph/control/?id=' + node_id,
       ).then((response) => {
      this.$cy.add(response.data.data['nodes'])
      this.$cy.add(response.data.data['edges'])

      let node_id = [], nodes=response.data.data['nodes'];
      for(let i=0;i<nodes.length;i++){
        node_id.push(nodes[i].data.id)

        for(let k in nodes[i].data){
          this.$cy.$('#'+nodes[i].data.id).data(k, nodes[i].data[k])
        }
      }
      let edge_id = [], edges=response.data.data['edges'];
      for(let i=0;i<edges.length;i++){
        edge_id.push(edges[i].data.id)
      }

      // console.log(node_id);
      // console.log(edge_id);
      for(let nn of node_id){
        this.$cy.$('#' + nn).addClass("search_node");
      }

      this.$cy.edges().filter(function (ele) {
        if (edge_id.indexOf(ele.data('id')) !== -1)
          return true;
      }).addClass("search_edge");

      var layout = this.$cy.layout({
        name: 'euler',
        randomize: true,
        animate: false,
      });
      layout.run();


      if (this.search_memory.length === 0 || this.mindate === "" || this.maxdate === "") {
        this.mindate = response.data.data['mindate']
        this.maxdate = response.data.data['maxdate']
      }
      else {
        if (this.mindate > response.data.data['mindate'] && response.data.data['mindate'] !== "")
          this.mindate = response.data.data['mindate']
        if (this.maxdate < response.data.data['maxdate'] && response.data.data['maxdate'] !== "")
          this.maxdate = response.data.data['maxdate']
      }


      if (response.data.data['id'] !== "")
        this.$cy.$('#' + response.data.data['id']).addClass("search_node");

      // document.getElementById('fade').innerText = "";
      // document.getElementById('fade').style.display = 'none';

      // if (parentC_flag == 'block') {
      //   parentSide.css("display", 'block');
      // }

      //时间轴
      // document.querySelector("#timeEle").innerHTML = ''
      // document.getElementById("timebrush_div").innerHTML = "";
      var margin = { top: -12, right: 27, bottom: 21, left: 0 },
          width = document.all.graph.offsetWidth,
          height = 55 - margin.top - margin.bottom;

      this.x = d3.scaleTime()
          .domain([new Date(this.mindate), new Date(this.maxdate) - 1])
          .rangeRound([0, width]);

         this.brush=d3.brushX()
             .extent([[0, 0], [width, height+30]])
             //.on("start",brushstart)
             .on("brush",this.brushmove)

      this.svg.selectAll("*").remove()
         // document.getElementById('timebrush_div').
      // let svg = d3.select("#timebrush_div").append("svg")

         this.svg = d3.select("#timebrush_div").append("svg")
             .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
             .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

         this.svg
          .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
          .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      this.svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(this.x)
              .ticks(d3.timeYear)
              .tickPadding(0))
          .attr("text-anchor", null)
          .selectAll("text")
          .attr("fill", "#ef5b9c")
          .attr("x", 0);

      this.svg.append("g")
          .attr("class", "brush")
          .call(d3.brushX()
              .extent([[0, 0], [width, height + 30]])
              // .on("start",brushstart)
              .on("brush", this.brushmove))
              // .on("end",brushended));
    }).catch((err)=>{
         // document.getElementById('fade').innerText = "";
         // document.getElementById('fade').style.display = 'none'
         alert("err！"+err)
       }
       ).finally(()=>
       loadingInstance.close()
       )
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
    this.$cy.$('#'+node_id).outgoers().edges().filter(function (ele) {
      if(ele.data('relationship')===name)
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
          +"<td style='width: 20%;font-weight:bold;border:1px solid black;'>"+this.$cy.$("#"+a_info[h].data('target')).data('name')+"</td>"
          +"<td style='width: 15%;font-weight:bold;border:1px solid black;'>"+this.$cy.$("#"+a_info[h].data('target')).data('label')+"</td>"
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
    relationChart(name,seriesData,timeData){
    this.$nextTick(()=>{
          let myChart = this.$echarts.init(this.$refs.relationChart);
          let option;
          option = {
            title: {
              text: '关联实体'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: name
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: timeData
            },
            yAxis: {
              type: 'value'
            },
            series:seriesData
          }
          option && myChart.setOption(option);

    })
    },
    entity_relationship(id){
      this.$message({
        showClose: true,
        message: '请稍等',
        type: 'info'
      })
      http.get('/graph/get_current_similarity/?company_id=' + id,
      ).then((response) => {
        this.relationData.length=0
        if(response.data.data) {
          this.relationData= response.data.data
          http.get('/graph/get_similarity_history/',{
            params:{
              company_id:id,
              start:this.timebrustStart,
              end:this.timebrustEnd
            }
              }
          ).then((res) => {
            let dat=res.data.data
            let time=res.data.time
            let name=res.data.name
            let seriesData=[]
            for(let i in dat) {
              let tmp=[]
              Object.values(dat[i]).forEach(value=>{
                tmp.push(value)
              })
              seriesData.push({name:name[i],type:'line',data:tmp})
            }
              this.relationData= response.data.data
            // console.log(seriesData)
              this.relationChart(name,seriesData,time)
            // this.relationDialog = true
          })
          this.relationDialog=true
        }
        else this.$notify.info({
          title: '提示',
          message: '暂无数据'
        });
      })


    },

    generateMonthlyIntervals(startDate, endDate) {
  const intervals = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    intervals.push({
      date: new Date(currentDate)
    });
    // 移动到下一个月的第一天
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(1); // 确保是每个月的第一天
  }
      // console.log(intervals,startDate)
  return intervals;
},
     countNeighborsOverTime(edges, node, timeIntervals) {
      let totalNeigh=new Set()
       let numEdges=0

      let neighborCounts = timeIntervals.map(interval => ({
    date: interval.date,
    sourceCount: 0,
    targetCount: 0,
    // totalCount: 0,
    sourceNeighbors: new Set(),
    targetNeighbors: new Set()
  }));
       console.log(timeIntervals)
        edges.forEach(edge => {

    if (edge['data'].source === node || edge['data'].target === node) {
      numEdges++
      for (let i = 0; i < timeIntervals.length; i++) {
        if (!totalNeigh.has(edge['data'].source) )
          totalNeigh.add(edge['data'].source)
        if (!totalNeigh.has(edge['data'].target) )
          totalNeigh.add(edge['data'].target)
        const interval = timeIntervals[i];
        if (interval.date >= new Date(edge['data']['开始日期']) && interval.date <= new Date(edge['data']['结束日期'])) {
          const { date, sourceNeighbors, targetNeighbors } = neighborCounts[i];

          if (edge['data'].source === node) {
            if (!sourceNeighbors.has(edge['data'].target)) {
              sourceNeighbors.add(edge['data'].target);
              neighborCounts[i].sourceCount++;
            }
          }

          if (edge['data'].target === node) {
            if (!targetNeighbors.has(edge['data'].source)) {
              targetNeighbors.add(edge['data'].source);
              neighborCounts[i].targetCount++;
            }
          }

          neighborCounts[i].totalCount = sourceNeighbors.size + targetNeighbors.size;
        }
      }
    }
  })
      // 将 Set 转换为数组，以便于后续处理
       let start = 0;
       let end = neighborCounts.length - 1;
      neighborCounts.forEach(count => {
        count.sourceNeighbors = Array.from(count.sourceNeighbors);
        count.targetNeighbors = Array.from(count.targetNeighbors);
      });

       // 找到第一个不为零的元素
       while (start < neighborCounts.length && (neighborCounts[start].sourceCount === 0 && neighborCounts[start].targetCount === 0)) {
         start++;
       }

       // 找到最后一个不为零的元素
       while (end >= 0 && (neighborCounts[end].sourceCount === 0 && neighborCounts[end].targetCount === 0)) {
         end--;
       }

       // 截取从第一个不为零的元素到最后一个不为零的元素
       if (start > end) {
         return [[],numEdges,totalNeigh.size-1]; // 如果没有不为零的元素，返回空数组
       }
        else
       {
         const sourceNeighbors = [];
         const targetNeighbors = [];
         const total=[];
         const dates = [];
         neighborCounts=neighborCounts.slice(start, end + 1)
         neighborCounts.forEach(item => {
           dates.push(item.date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short' }));
           sourceNeighbors.push(item.sourceCount);
           targetNeighbors.push(item.targetCount);
           total.push(item.sourceCount+item.targetCount)
         });
         return [[dates,sourceNeighbors,targetNeighbors,total],numEdges,totalNeigh.size-1];
       }

     },

      analyse_neigh( id){
      // 获取该节点的所有邻居
      const neighborhood = this.$cy.$('#' + id).neighborhood();
        // console.log(neighborhood)
      // 遍历邻居集合，收集邻居节点的信息
      const neighborsInfo = new Set();

      neighborhood.forEach(neighbor => {
        if (neighbor.isNode()) {  // 确保我们只处理节点，而不是边
          const neighborData = neighbor.data('label').split('-');
          if (neighborData.length>0){
            const lastLabel=neighborData[neighborData.length-1]
            // 收集你需要的邻居节点的数据
            if(!neighborsInfo.has(lastLabel) )
              neighborsInfo.add(lastLabel)
          }

        }
      });

      let minDate= this.edgeData[0]['data']['开始日期']
      let maxDate= this.edgeData[0]['data']['结束日期']

      this.edgeData.forEach(edge=>{

        if (edge['data']['开始日期']!=='未知' && edge['data']['开始日期']<minDate)
          minDate=edge['data']['开始日期']
        if (edge['data']['开始日期']!=='未知' && edge['data']['结束日期']>maxDate)
          maxDate=edge['data']['结束日期']
      })
        minDate=minDate==='未知'? this.mindate: minDate
        maxDate=maxDate==='未知'? this.maxdate: maxDate
        console.log(this.edgeData.length)
      const timeIntervals = this.generateMonthlyIntervals(new Date(minDate), new Date(maxDate));
      const neighborCounts= this.countNeighborsOverTime(this.edgeData, id, timeIntervals);

        this.numEdge=neighborCounts[1]
        this.neighborLabel=neighborsInfo

        this.numNeighbors=neighborCounts[2]
        // console.log({'detail':neighborCounts[0],'numEdge':neighborCounts[1],'label':neighborsInfo,'numNighbors':neighborCounts[2]})
    this.initNeighborChart(neighborCounts[0])
        this.neighborDialog=true
    },
    initNeighborChart(neighborCounts){
      console.log(neighborCounts)
      this.$nextTick(()=>{
            let myChart = this.$echarts.init(this.$refs.neighborChart);
            let option= {
              title: {
                text: '邻居节点数量'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['入度邻居', '出度邻居','总计']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: neighborCounts[0]
              },
              yAxis: {
                type: 'value'
              },
              series:  [
              {
                name: '入度邻居',
                type: 'line',
                // stack: 'Total',
                data: neighborCounts[1]
              },
              {
                name: '出度邻居',
                type: 'line',
                // stack: 'Total',
                data: neighborCounts[2]
              },
                {
                  name: '总计',
                  type: 'line',
                  // stack: 'Total',
                  data: neighborCounts[3]
                }
              ]
            }
            option && myChart.setOption(option);
    })
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


      let datetime_s=d1[0].getFullYear() + '-' + (d1[0].getMonth() + 1) + '-' + d1[0].getDate(); //+ ' ' + d1[0].getHours() + ':' + d1[0].getMinutes() + ':' + d1[0].getSeconds();
      let datetime_e=d1[1].getFullYear() + '-' + (d1[1].getMonth() + 1) + '-' + d1[1].getDate(); //+ ' ' + d1[1].getHours() + ':' + d1[1].getMinutes() + ':' + d1[1].getSeconds();
      this.timebrustStart=datetime_s
      this.timebrustEnd=datetime_e
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
      let options={
        text:'请稍等'
      }
      let loadingInstance = Loading.service(options);

      http.get('/graph/search/?name=' + content,
          // {
          //  name:content
          //  }
      ).then((response) => {

        let graphData = response.data
        this.edgeData=graphData.edges
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
        if (!cytoscape().BubbleSets) {
          cytoscape.use(BubbleSets)
        }
        cytoscape.use(BubbleSets);
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
                  if (w === "" || w===undefined) return '17px';
                  else {
                    w = parseFloat(w.substr(0, w.length - 1));
                    if (w < 1.0) return (17 + Math.log2(w + 1) * 2) + 'px';
                    else return (17 + Math.log2(w) * 2) + 'px';
                  }

                },
                'height': function (node) {
                  var w = node.data('w');
                  if (w === ""|| w===undefined) return '17px';
                  else {
                    w = parseFloat(w.substr(0, w.length - 1));
                    if (w < 1.0) return (17 + Math.log2(w + 1) * 2) + 'px';
                    else return (17 + Math.log2(w) * 2) + 'px';
                  }
                },
              })
              // 显示隐藏节点样式
              .selector (".hidden")
              .style({
                "display": "none"
               })

              .selector (".show")
              .style({
                "display": "element"
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
        loadingInstance.close()
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
          if (d.target.data('label') !== "合并节点") {
            let node_info = '';
            for (let key in d.target.data()) {
              if (key === 'id') {
                node_info = node_info + 'ID' + ':' + d.target.data()[key] + '<br>';
              } else if (key === 'label') {
                node_info = node_info + '类型' + ':' + d.target.data()[key] + '<br>';
              } else if (key === 'name') {
                node_info = node_info + '名称' + ':' + d.target.data()[key] + '<br>';
              } else if (key === 'w') {
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
                content: '<span style="font-size: 7px">关联实体计算</span>', // html/text content to be displayed in the menu
                // content: '显示邻居',
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: (ele) =>this.entity_relationship(ele.id()),
                enabled: true, // whether the command is selectable
              },
              {
                fillColor: '#33a3dc', // optional: custom background color for item
                content: '<span style="font-size: 7px">邻居统计</span>', // html/text content to be displayed in the menu
                // content: '显示邻居',
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: (ele) =>this.analyse_neigh(ele.id()),
                enabled: true, // whether the command is selectable
              },
              {
                fillColor: '#73b9a2', // optional: custom background color for item
                content: '<span style="font-size: 7px">隐藏/显示邻居</span>', // html/text content to be displayed in the menu
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: (ele) => {
                  if (!this.hideClickCount[ele.id]) {
                    this.hideClickCount[ele.id] = 0;
                  }
                  if (this.hideClickCount[ele.id]%2===0)
                    this.yincang_neigh(ele.id())
                  else
                    this.xianshi_neigh(ele.id())
                  this.hideClickCount[ele.id]++



                },
                enabled: true, // whether the command is selectable
              },
              {
                fillColor: '#f7acbc', // optional: custom background color for item
                content: '<span style="font-size: 7px">高亮邻居</span>', // html/text content to be displayed in the menu
                // contentStyle: {}, // css key:value pairs to set the command's css in js if you want

                select: (ele) => {
                  if (!this.nodeClickCount[ele.id]) {
                    this.nodeClickCount[ele.id] = 0;
                  }
                  if (this.nodeClickCount[ele.id]%2===0)
                  this.lightOn([ele.id()])
                  else
                    this.lightOff()
                  this.nodeClickCount[ele.id]++
                },


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
              {
                fillColor: '#b2d235', // optional: custom background color for item
                content: '<span style="font-size: 7px">股权穿透</span>', // html/text content to be displayed in the menu
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: (ele) => this.chuantou(ele.id()),
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
        this.svg = d3.select("#timebrush_div").append("svg")
            .attr("width", width + margin.left + margin.right) //width + margin.left + margin.right
            .attr("height", height + margin.top + margin.bottom)  // height + margin.top + margin.bottom
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x)
                .ticks(d3.timeYear)
                .tickPadding(0))
            .attr("text-anchor", null)
            .selectAll("text")
            .attr("fill","#ef5b9c")
            .attr("x", 0);

        this.svg.append("g")
            .attr("class", "brush")
            .call(this.brush)
            .on("dblclick", this.dblclicked(this.svg))
        // .on("end",brushended));
        // svg.append("g").on("dblclick", this.dblclicked(svg))

      })
      .catch(error=>{
        loadingInstance.close()
        this.$message.warning(error)
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

  },
  mounted() {
    // let infoDiv = document.getElementById('hovertip');
    //
    // // 监听窗口缩放事件
    // window.addEventListener('resize', function() {
    //   // 计算元素与窗口底部的距离
    //   var windowHeight = window.innerHeight;
    //   var distanceFromBottom = 40; // 你要设置的距离
    //   var elementHeight = infoDiv.offsetHeight;
    //
    //   var newBottomDistance = windowHeight - elementHeight - distanceFromBottom;
    //
    //   // 设置元素的样式
    //   infoDiv.style.bottom = newBottomDistance + 'px';
    // });

  },
  watch:{
  percentage(){
      this.displayAsPercentage()

    },
  changeNodes(){
    console.log('changeNodes')
    this.updateStatus()
  },
  changeEdges(){
    console.log('changeEdges')
    this.updateStatus()
  }
},
  computed:{
    // eslint-disable-next-line vue/no-dupe-keys
    changeNodes(){
      return this.checkedNodes
    },
    // eslint-disable-next-line vue/no-dupe-keys
    changeEdges(){
      return this.checkedEdges
    }
  },

  afterM() {
    this.resize()
  }
}
</script>

<style lang="less" scoped>
//.fontClass{
//  font-family: "微软雅黑";
//  color: #02A7F0;
//
//},
.info{
  position: fixed;
  //margin-top: -35px;
  //width:100%;
  bottom: 80px ;
  white-space:nowrap
}
.contain{
  //overflow: hidden;
  //position: relative;
  //bottom: 0px;
  //padding-left:15%;
  //right: 0px;

}
.graph {
/*//margin-left: -800px;*/
/*  transform: translate(0,0);*/
  height: 700px;
  /*width: */
}
.grayish_btn{
/*//浅灰色按钮*/
  color: #fff;
/*//文字颜色*/
  background-color: #aaaaaa;
/*//背景颜色*/
}


.checkbox1{
/deep/ .el-checkbox-group {
  text-align: left;  /* 这个很关键，否则最后一行是居中状态 */
  margin-bottom: 5px;
}


 /deep/ .el-checkbox {
  width: 80px;       /* 根据内容设置宽度 */
  padding-left: 0px;
  text-align: left;  /* 这个很关键，否则每一行都是居中状态 */
  margin-right: 20px;
}

}

.checkbox2{
  /deep/ .el-checkbox-group {
    line-height: 20px !important;
    // 不起作用

}



}


</style>