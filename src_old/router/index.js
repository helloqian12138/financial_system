import Vue from 'vue'
import VueRouter from 'vue-router'
// import 首页 from '../views/首页.vue'
// import 市场主体分析 from '../views/市场主体分析.vue'
// import 市场风险分析 from '../views/市场风险分析.vue'
// import 行情分析 from '../views/行情分析.vue'
// import 事件分析 from '../views/事件分析.vue'

import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import register from '@/user/register'
import test from "@/views/test";
import 	市场主体分析	from   '../views/市场主体分析.vue'
import 	系统性风险分析	from   '../views/系统性风险分析.vue'
import systemRiskV2 from "@/components/systemRiskComponent";
import 	个体风险分析	from   '../views/个体风险分析.vue'
import  login from "@/user/login";
import 	高影响力主体分析	from '../views/高影响力主体分析.vue'
import 	预警服务	from       '../views/预警服务.vue'
import 	风险预警	from       '../views/风险预警.vue'
import 	异常检测	from       '../views/异常检测.vue'
import warn from '@/views/404'
import 	健康指数	from       '../views/健康指数.vue'
import 	压力测试	from       '../views/压力测试.vue'
import 	行情分析	from       '../views/行情分析.vue'
import 	事件分析	from       '../views/事件分析.vue'
import 	事件图谱	from       '../views/事件图谱.vue'
import graphViewV4 from "@/views/graphViewV4";
import 风险传导 from "@/views/风险传导"
import 	大屏	from       '../bigscreen/大屏.vue'
import 	UserManagement	from     '../views/UserManagement.vue'

import SSE from "@/views/SSE";
// import tab from "@/store/tab";


// 解决重复点击页面报NavigationDuplicated: Avoided redundant navigation to current locat
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



Vue.use(VueRouter)


//1.import 创建路由组件
//2.将路由与组件进行映射


const routes = [


    //主路由

  { path:'/',
    component:Main,
    redirect:'systematic_risk',//当地址是/时就重定向到market_entities
    meta : {                      //加一个自定义obj
      requireAuth:true      //这个参数 true 代表需要登录才能进入A
    },
    children:[
      //子路由
      {path:'/home', name:'home',component:Home},//首页
      {path:'/market_entities',name:'market_entities',component:市场主体分析,
        meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }
        },//1
      {path:'/systematic_risk',name:'systematic_risk', component:系统性风险分析, meta : {                      //加一个自定义obj
          requireAuth:true      //这个参数 true 代表需要登录才能进入A
        },},//2-1

      // {path:'/systemriskV2',name:'systemriskV2', component:systemRiskV2, meta : {                      //加一个自定义obj
      //     requireAuth:true      //这个参数 true 代表需要登录才能进入A
      //   },},//2-1

      {path:'/individual_risk',name:'individual_risk', component:个体风险分析, meta : {                      //加一个自定义obj
          requireAuth:true      //这个参数 true 代表需要登录才能进入A
        },},//2-2

      {path:'/influential_entities', name:'influential_entities', component:高影响力主体分析, meta : {                      //加一个自定义obj
          requireAuth:true      //这个参数 true 代表需要登录才能进入A
        },},//3

      {path:'/warning',       name:'warning',       component:预警服务,
      meta : {                      //加一个自定义obj
          keepAlive:true,
        requireAuth:true
        }},//4-1

      {path:'/risk_warning',       name:'risk_warning',       component:风险预警,
        meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }},//4-1
      {path:'/abnormal_detection', name:'abnormal_detection', component:异常检测,
        meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }},//4-2
      {path:'/health',    name:'health',    component:健康指数, meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }},//5
      {path:'/diffus',    name:'diffus',  props: true, // 启用路由参数作为组件属性传递
        component:风险传导, meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }},
      {path:'/pressure',  name:'pressure',  component:压力测试,    meta : {                      //加一个自定义obj
          requireAuth:true      //这个参数 true 代表需要登录才能进入A
        }},//6
      {path:'/quotation', name:'quotation', component:行情分析, meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }},//7
      {path:'/event_analysis',  name:'event_analysis',  component:事件分析,
        meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }},//8-1
      {path:'/event_graph',     name:'event_graph',     component:事件图谱,
        meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }},//8-2
      {path:'/knowladgeGraph',     name:'knowladgeGraph',     component:graphViewV4,meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }},

        // 用户管理
      {path:'/UserManagement',name :'UserManagement',component: UserManagement, meta : {                      //加一个自定义obj
          keepAlive:true,
          requireAuth:true
        }},


    ]

  },
  // 登录
  {path:'/login',name :'login',component: login},
  // {path:'/login2',name :'login2',component: login2},

  // 注册
  {path:'/register',name :'register',component: register},


  //大屏
  {path:'/bigscreen',name :'bigscreen',component: 大屏,},
  {path:'/test',name :'test',component: test,},
  {path:'/sse',name :'sse',component: SSE,},
  {path:'/systemrisk',name :'systemrisk',component: systemRiskV2,}
  ]


  //3.创建router实例
  const router = new VueRouter({
    routes
  })
  
  export default router
export  const isLogin=false;
//4.在main.js挂载


//路由守卫
router.beforeEach(async(to,from,next) => {
  const allowedRoutes = ['/systematic_risk', '/market_entities','/individual_risk','/influential_entities'
    ,'/warning','/risk_warning','/abnormal_detection','/health','/diffus','/pressure','/quotation','/event_analysis',
    '/event_graph','/knowladgeGraph','/UserManagement','/login','/register','/bigscreen','/test','/sse','/systemrisk'];
  const name=sessionStorage.getItem('user')
  // if (allowedRoutes.includes(to.path)) {
  //   next();
  // } else {
  //   next('/'); // 重定向到首页或其他允许的路由
  // }
  if (to.meta.requireAuth){//需要认证
    if (name || !name && (to.name==='/user' || to.name==='/login')){
      next()
    }else {
      next('/login')
      // return{
      //   path:'/login',
      //   query:{redirect:to.fullPath}
      // }
    }
  }
  else {
    next()
  }
})

