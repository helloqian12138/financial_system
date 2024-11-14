<template>
    <div class="content bg">
    
      <!-- <dv-full-screen-container> -->
        <scale-box>
         <ModuleTitle />
         <ModuleHeader />
         <ModuleMain />

           </scale-box>
      <!-- </dv-full-screen-container> -->

    </div>
  </template>
  
  <script>
  import ModuleTitle from './ModuleTitle.vue'
  import ModuleHeader from './ModuleHeader.vue'
  import ModuleMain from './ModuleMain.vue'
  import ScaleBox from './ScaleBox.vue'

  
  
  export default {
    name: 'HomeView',
    components:{
      ModuleTitle,
      ModuleHeader,
      ModuleMain,
      ScaleBox,//   大屏根据显示器尺寸大小自适应
    }
  
  }
  </script>
  
  <style scoped>
  @import '../assets/css/index.css';
  </style>