<!--  -->
<template>
  

  <div id="home"> 

    <!-- 全屏容器dv-full-screen-container -->
    <dv-full-screen-container>
        <!-- 边框dv-border-box -->

          <div style="flex:0 1 50%;padding-bottom: 10px;">          <!-- flex-grow | flex-shrink | flex-basis */没懂 -->
            <dv-border-box-7 style="width: 100%;height:60px;">
              <div style="color: aliceblue;text-align: center;padding: 10px;">大规模泛金融知识图谱系统"</div>
              <dv-decoration-10 style="width:100%;height:5px;" />
            </dv-border-box-7>
          </div>
          <div style="flex:0 1 50%">          <!-- flex-grow | flex-shrink | flex-basis */没懂 -->
            <dv-border-box-7 style="width: 100%;height: 200px;">
              <region/>
            </dv-border-box-7>
          </div>







    </dv-full-screen-container>
  </div>
</template>

<script>
import region from "../components/region.vue";
export default {
  components: {
    region
  },
  data () {
    return {
    }
  },
  mounted(){
  },
  methods:{
  },
}
</script>

<style lang="less" scoped>


#home {
  width: 100%;
  height: 100vh;
  background: url("../assets/background.jpg") center center no-repeat;
  background-size: 100% 100%;
  position:absolute;/*/绝对定位 */
}


</style>
