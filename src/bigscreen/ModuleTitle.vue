<template>
    <!-- 标题 一行三等分 -->
    <div class="module-box">
      <div style="flex:0 1 30%">
        <dv-decoration-10 style="height:5px;" />
      </div>

      <div style="flex:0 1 40%">
        <div class="d-flex">
          <dv-decoration-8 style="height:50px;flex:1;" />
          <h2>大规模泛金融知识图谱系统</h2>
          <!-- <div style="font-size: large;">大规模泛金融知识图谱系统</div> -->
          <dv-decoration-8 :reverse="true" style="height:50px;flex:1;" />
        </div>
        
      </div>

      <div style="flex:0 1 30%">
        <dv-decoration-10 style="height:5px;transform:rotateY(180deg)" />
      </div>
  </div>
</template>

<script>


export default {
  name: 'HomeView',
  

}
</script>
