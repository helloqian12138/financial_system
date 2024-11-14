<template>
  <div>

    <!-- 路由出口 -->
    <!-- 路由匹配组建将渲染到这里 -->
<!--    <router-view> </router-view>-->
    <keep-alive exclude="test" include="">
      <router-view />
    </keep-alive>
<!--    <router-view v-if="!$route.meta.keepAlive" />-->
  </div>
</template>

<script>



// import http from './utils/request'//导入接口？？
// import {getData} from './api'

// import DevicePixelRatio from './libs/rem'
// export default{
//   created(){
//     new DevicePixelRatio().init()
//   }
// }

</script>

<style lang="less">//消除固定样式
  html,body,h3{
    margin: 0;
    padding: 0;
  }
  .superscript{ // 1、上标
    font-size: 13px;
    padding:10px;
    color:#fff;
    background-color: rgba(2, 167, 240, 0.729411764705882);

  }
.text{
color:rgba(2, 167, 240, 0.729411764705882);
cursor: pointer;
/* 将鼠标样式设为手型 */
}
  
  


</style>
