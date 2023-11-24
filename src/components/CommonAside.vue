<!-- 侧导航栏 -->
<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#000000"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height:1200px">
    <!-- style="height:auto" -->
    <!-- <img src="/image/Logo.png" width="100%" > -->
    <!-- <img src="/image/Logo.png" /> -->
    <div style="display=flex;">
      <!-- <img src="../assets/Logo.png" width="12%" style="display:inline-block;padding-right: 3px;" align="absmiddle"> -->
      <img src="../assets/数据显示.png" width="12%" style="display:inline-block;padding-left: 1px;padding-right: 5px;" align="absmiddle">
      <!-- align="absmiddle"让图像和文字一样高 -->
      <h3 style="display:inline-block;" @click = "bigscreen">资本市场系统性风险平台</h3>
      <!--  -->
    </div>
    


    <!-- 循环遍历所有的单导航栏 -->
    <!-- 没有子菜单 -->
    <el-menu-item @click='clickMenu(item)' v-for="item in nochildren" :key='item.name' :index='item.name'>   
    <!-- : 是v-bind: -->
      <i :class="`el-icon-${item.icon}`"></i> <!-- 图标，官网可选 -->
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- 有子菜单 -->
    <el-submenu  v-for="item in hasChildren" :key='item.label' :index='item.label'><!-- index都是为了确保唯一性 -->
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for='subItem in item.children' :key='subItem.path'>
          <el-menu-item @click='clickMenu(subItem)' :index="subItem.path" style="padding-left: 70px;">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>

  </el-menu>
</template>



<script>

export default {
  data() {
    return {
      isCollapse: false, //不折叠
      menuData: [

        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
        },
        {
          path: "/market_entities",//1
          name: "market_entities",
          label: "市场主体分析",
          icon: "s-flag",
        },
        {
          //2
          label: "市场风险分析",
          icon: "s-marketing",

          children:[
            {
            path: "/systematic_risk",//2-1
            name: "systematic_risk",
            label: "系统性风险分析",
            },
            {
            path: "/individual_risk",//2-2
            name: "individual_risk",
            label: "个体风险分析",
            },


        ],
        },
        {
          path: "/influential_entities",//3
          name: "influential_entities",
          label: "高影响主体分析",
          icon: "star-off",
        },
        {
          // path: "/warning",//4
          label: "预警服务",
          icon: "bell",
          children:[
            {
            path: "/warning",//4-1
            name: "warning",
            label: "预警服务",
            },
            {
            path: "/risk_warning",//4-1
            name: "risk_warning",
            label: "风险预警",
            },
            {
            path: "/abnormal_detection",//4-2
            name: "abnormal_detection",
            label: "异常检测",
            },


        ],
          
        },
        {
          path: "/health",//5
          name: "health",
          label: "健康指数",
          icon: "umbrella",
        },
        {
          path: "/pressure",//6
          name: "pressure",
          label: "压力测试",
          icon: "s-help",
        },
        {
          path: "/quotation",//7
          name: "quotation",
          label: "行情分析",
          icon: "s-data",
        },
        {
          // path: "/event",//8
          label: "事件分析",
          icon: "document",
          children:[
            {
            path: "/event_analysis",//2
            name: "event_analysis",
            label: "事件分析",
            },
            {
            path: "/event_graph",//2
            name: "event_graph",
            label: "事件图谱",
            },]
        },
  
      ],
    };
  },
  methods: {
    bigscreen(){//点击标题跳转大屏
      this.$router.push('/bigscreen');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //点击菜单
    clickMenu(item){
     // 当页面的路由this.$route.path 与 跳转的路由item.path 不一致才允许跳转
     if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {//$route是当前路径的路由
        this.$router.push(item.path)//$router是整个的router实例
      }
      this.$store.commit('selectMenu', item)//点击获取新路由对象,store在这里不用import  
    },

  },
  computed: {
    hasChildren() {//有子菜单才需要用
      return this.menuData.filter((item) => item.children);
    },
    nochildren() {
      return this.menuData.filter((item) => !item.children);
    },
  },
};
</script>


<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {//背景？？
  width: 220px;
  min-height: 300px;
  

}
.el-menu-item, .el-submenu__title {//导航选项间隔
    height: 40px;//导航选项之间
    line-height: 45px;//导航上边距

}
.el-dropdown-menu__item, .el-menu-item  {//导航字体大小
  font-size: 13px;
}

.el-menu{
  height:100vh;//背景布满
  h3{
    // color: #fff;
    // text-align: center;
    // line-height: normal;
    // font-size: 13px;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: bold;//字体加粗
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 4;
    
  }
}
/deep/ .el-menu-item-group__title { // 有孩子的标题
    padding: 0px 0 0px 0px;//去掉距离
    line-height: normal;
    font-size: 12px;
    color: #909399;
}

/deep/ .el-submenu__title {
    font-size: 13px;
    height: 40px!important;
    line-height: 50px!important;

}
/deep/ .el-submenu__icon-arrow {
    position: absolute;
    top: 70%;//和文字调整一致
    color:#fff;

}
</style>