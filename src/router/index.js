import Vue from 'vue'
import VueRouter from 'vue-router'
// import 首页 from '../views/首页.vue'
// import 市场主体分析 from '../views/市场主体分析.vue'
// import 市场风险分析 from '../views/市场风险分析.vue'
// import 行情分析 from '../views/行情分析.vue'
// import 事件分析 from '../views/事件分析.vue'

import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import register from '@/register/index'
import login2 from '@/views/login'
import 	市场主体分析	from   '../views/市场主体分析.vue'
import 	系统性风险分析	from   '../views/系统性风险分析.vue'
import 	个体风险分析	from   '../views/个体风险分析.vue'
import  login from "@/views/index";
import 	高影响力主体分析	from '../views/高影响力主体分析.vue'
import 	预警服务	from       '../views/预警服务.vue'
import 	风险预警	from       '../views/风险预警.vue'
import 	异常检测	from       '../views/异常检测.vue'

import 	健康指数	from       '../views/健康指数.vue'
import 	压力测试	from       '../views/压力测试.vue'
import 	行情分析	from       '../views/行情分析.vue'
import 	事件分析	from       '../views/事件分析.vue'
import 	事件图谱	from       '../views/事件图谱.vue'
import graphViewV4 from "@/views/graphViewV4";
import 	大屏	from       '../bigscreen/大屏.vue'
import user from "@/store/user";

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
    redirect:'home',//当地址是/时就重定向到home
    // meta : {                      //加一个自定义obj
    //   requireAuth:true      //这个参数 true 代表需要登录才能进入A
    // },
    children:[
      //子路由
      {path:'/home', name:'home',component:Home},//首页
      {path:'/market_entities',name:'market_entities',component:市场主体分析,
        // meta : {                      //加一个自定义obj
        //   requireAuth:true      //这个参数 true 代表需要登录才能进入A
        // }
        },//1
      {path:'/systematic_risk',name:'systematic_risk', component:系统性风险分析},//2-1
      {path:'/individual_risk',name:'individual_risk', component:个体风险分析},//2-2

      {path:'/influential_entities', name:'influential_entities', component:高影响力主体分析},//3

      {path:'/warning',       name:'warning',       component:预警服务},//4-1
      {path:'/risk_warning',       name:'risk_warning',       component:风险预警},//4-1
      {path:'/abnormal_detection', name:'abnormal_detection', component:异常检测},//4-2
      {path:'/health',    name:'health',    component:健康指数},//5
      {path:'/pressure',  name:'pressure',  component:压力测试,    meta : {                      //加一个自定义obj
          requireAuth:true      //这个参数 true 代表需要登录才能进入A
        }},//6
      {path:'/quotation', name:'quotation', component:行情分析},//7
      {path:'/event_analysis',  name:'event_analysis',  component:事件分析},//8-1
      {path:'/event_graph',     name:'event_graph',     component:事件图谱},//8-2
      {path:'/knowladgeGraph',     name:'knowladgeGraph',     component:graphViewV4},
      
    ]

  },
  {path:'/login',name :'login',component: login},
  // {path:'/login2',name :'login2',component: login2},
  {path:'/register',name :'register',component: register},
  //大屏
  {
    path:'/bigscreen',
    component: 大屏,
  }

   
     
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
  console.log(to.name)
  if (to.meta.requireAuth){//需要认证
    if (user.state.isLogin || !user.state.isLogin && (to.name==='/register' || to.name==='/login')){
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
//   //next() :是否通过
//   //  参数   ：无         通过
//   //          false       不通过
//   //          具体地址     跳转到指定的地址
//
//
//   /*
//   验证登录
//   有些路由是需要登录的，判断登录状态
//       1，没有登录：跳转到登录页
//       2，登录，直接进入
//   有些路由不需要登录，直接进入；
//   ps:是否需要登录 --meta
//   */
//   const token = sessionStorage.getItem('token');
//   const isLogin = !!token;
//   console.log(isLogin)
//   // 考虑到token非法？ 进入路由的时候，需要向后端发送token，验证是否合法
//   // const data = function () {
//   //   http.get('/login')
//   //   return 'sucess'
//   // };
//   // Store.commit('chageUserInfo',data.data);
//
//   console.log(to.name);
//     if(isLogin){ //已经登录的 直接通过
//       // if(data.error===400){
//       //   next({name:'home'});
//       //   localStorage.removeItem('token');
//       //   return;
//       // }
//       if(to.name === '/login'){
//         next({name:'/home'});
//       }else{
//         next();
//       }
//     }
//     if(!isLogin && to.name !== '/login'){ //未登录，去的也不是登录页
//       next({name:'/login'});
//     }
//     else{
//     next()
//   }
//
// })

