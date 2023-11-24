<template>
  <!-- 布局 -->
  <el-container>
    <el-aside width="auto">  <!-- auto自适应 -->
      <Common-aside />  <!-- 不能用驼峰体CommonAside,要小写加斜杠 -->
    </el-aside>

    <el-container>
      <el-header>
        <common-header />
      </el-header>

      <el-main>
        <!-- 子路由出口 -->
        <!-- 路由匹配组建将渲染到这里 -->
        <!-- 将每个页面提供边距(封套) -->
        <div class='wrapper'>
          <router-view> </router-view>
        </div>
       
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import user from "@/store/user";
let isLogin=false
export default {
  //
  // beforeRouteEnter(to ,from,next){
  //   console.log(to.name)
  //   if (to.meta.requireAuth){//需要认证
  //     if (user.state.isLogin || !user.state.isLogin && (to.name==='/register' ||to.name==='/login')){
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
    //   if (to.name==='/register' || to.name==='/login'){
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
    return {};
  },

  //引入组件
  components: {
    CommonAside,
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
