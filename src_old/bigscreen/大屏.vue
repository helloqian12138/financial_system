<template>
  <div id="home">
    <dv-full-screen-container>
      <!--一行两等份-->
      <div class="head">大规模泛金融知识图谱系统</div>
      <div class="module-box">
        
        <div style="flex: 0 1 25%">
          <dv-border-box-12 style="width: 100%; height: 180px">
            <div style="color:white;padding:10px 10px;">类型统计</div>
          </dv-border-box-12>
          <dv-border-box-12 style="width: 100%; height: 180px">
            <div style="color:white;padding:10px 10px;">健康指数</div>
          </dv-border-box-12>
        </div>

        <div style="flex: 0 1 50%">
          <dv-border-box-8 style="width: 100%; height: 360px"></dv-border-box-8>
        </div>

        <div style="flex: 0 1 25%">
          <dv-border-box-12 style="width: 100%; height: 180px">
            <div style="color:white;padding:10px 10px;">图谱统计</div>
          </dv-border-box-12>
          <dv-border-box-12 style="width: 100%; height: 180px">
            <div style="color:white;padding:10px 10px;">区域分析</div>
          </dv-border-box-12>
        </div>
      </div>

      <div class="module-box">
        <div style="flex: 0 1 25%">
          <dv-border-box-12 style="width: 100%; height: 180px;">
             <div style="color:white;padding:10px 10px;">当前事件统计</div>
          </dv-border-box-12>
        </div>

        <div style="flex: 0 1 50%">
          <dv-border-box-8 style="width: 100%; height: 180px;">
             <div style="color:white;padding:10px 10px;">行业风险价值曲线图</div>
          </dv-border-box-8>
        </div>

        <div style="flex: 0 1 25%">
          <dv-border-box-12 style="width: 100%; height: 180px;">
             <div style="color:white;padding:10px 10px;">行业价值评估</div>
          </dv-border-box-12>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.head{
  color: aliceblue;
  text-align:center;
  padding-top:12px;
  font-size: 18px;
}
#home {
  width: 100%;
  height: 100%;
  background: url("../assets/background.jpg") center center no-repeat;
  background-size: 100% 100%;
  position: absolute; /*/绝对定位 */
}
.module-box {
  display: flex;
  justify-self: space-between;
  margin: 1px;
  padding-left:15px;
}
</style>
