<template>
  <!-- 布局 -->
  <el-container>
    <el-aside width="auto">  <!-- auto自适应 -->
      <Common-aside />  <!-- 不能用驼峰体CommonAside,要小写加斜杠 -->
    </el-aside>

    <el-container>
      <el-header>
        <common-header-user v-if="!state"/>
        <common-header-admin v-if="state"/>
      </el-header>

      <el-main>
        <!-- 子路由出口 -->
        <!-- 路由匹配组建将渲染到这里 -->
        <!-- 将每个页面提供边距(封套) -->
        <div class='wrapper'>
          <keep-alive :include="cachedList" > 
            <router-view :key="$route.fullPath"/>
          </keep-alive>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonHeaderAdmin from "@/components/CommonHeaderAdmin";
import CommonHeaderUser from "@/components/CommonHeaderUser";
import {mapState} from "vuex";

export default {
  //
  // beforeRouteEnter(to ,from,next){
  //   console.log(to.name)
  //   if (to.meta.requireAuth){//需要认证
  //     if (user.state.isLogin || !user.state.isLogin && (to.name==='/user' ||to.name==='/login')){
  //       next()
  //     }else {
  //       next('/login')
  //       // return{
  //       //   path:'/login',
  //       //   query:{redirect:to.fullPath}
  //       // }
  //     }
  //   }
  //   else {
  //     next()
  //   }
  //
  // },


    // beforeRouteEnter(to ,from,next){
    //   console.log(to.name)
    //   if (to.name==='/user' || to.name==='/login'){
    //     next()
    //   }
    //     else if (isLogin){
    //     next()
    //   }
    //   else {
    //     next('/login')
    //   }
    //
    // },
  data() {
    return {
      user:''
    };
  },
  computed:{
    // state(){
    //   return this.$store.state.isLogin
    //
    // },
    ...mapState(['isLogin']),
    // state(){
    //   return this.$store.getters.getUserState || sessionStorage.getItem('stats')!==null
    // }

    //接收缓存列表cached
    ...mapState({//mapState返回一个对象，表示扩展运算符，起到解构的作用...
      cached: state => state.tab.cachedList
    }),
    cachedList(){
      // console.log('main接收到的cachedList' ,this.cached)
      return this.cached
    },

    state(){
      return sessionStorage.getItem('stats') === '1'
    },

  },
  watch:{
    // state(newValue){
    //   console.log(1)
    //   console.log(newValue)
    // }
  },


mounted() {
  console.log(this.state)
},

  //引入组件
  components: {
    CommonAside,
    CommonHeaderUser,
    CommonHeaderAdmin,
    CommonHeader,
  },
};
</script>

<style scoped>

/* 边距(封套) */
/* .wrapper{
  padding:20px
} */
.el-header{

  padding:0  /*横框左右间距为 0 */
}
</style>
