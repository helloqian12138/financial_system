<template>
  <div>

    <graph-view-v4></graph-view-v4>
<!--      <div class="form">-->
<!--                                                        &lt;!&ndash; inline="true"表单域在一行 &ndash;&gt;-->
<!--          <el-form :inline="true"  class="demo-form-inline" :model="formInline">-->
<!--            <el-form-item label="主体名称">-->
<!--              <el-input  v-model="formInline.main_name" placeholder="请输入主体名称" size="mini"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-button class="grayish_btn" @click="onSubmit" size="mini">查询</el-button>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-button class="grayish_btn" @click="onSubmit" size="mini">清空</el-button>-->
<!--            </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->

<!--      <el-card style='height: 550px;' :body-style={padding:0}> -->
<!--       &lt;!&ndash; height:400px &ndash;&gt;-->
<!--       &lt;!&ndash; 1、上标 &ndash;&gt;-->
<!--        <span class="superscript" style="width: 20px; height: 40px;">系统风险分析</span>-->
<!--        &lt;!&ndash; 2、知识图谱&选项器 &ndash;&gt;-->
<!--        <el-row :gutter="20">-->
<!--          <el-col :span="16">-->
<!--            <div style="margin-top: 20px;">-->
<!--&lt;!&ndash;            知识图谱&ndash;&gt;-->
<!--           -->
<!--            </div>-->

<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-card style="height: 550px;">-->
<!--              <el-form label-position='top' label-width="80px" :model="formInline">-->
<!--              <el-form-item label="更改布局">-->
<!--                <el-button  @click="onSubmit" size="mini">CoSE</el-button>-->
<!--                <el-button  @click="onSubmit" size="mini">fCoSE</el-button>-->
<!--                <el-button  @click="onSubmit" size="mini">Cola</el-button>-->
<!--                <el-button  @click="onSubmit" size="mini">euler</el-button>-->

<!--              </el-form-item>-->

<!--             -->
<!--            </el-form>-->
<!--            </el-card>-->
<!--          </el-col>-->
<!--        </el-row>-->



<!--    </el-card>-->
  </div>
</template>

<script>
import graphViewV4 from "@/views/graphViewV4";
import http from '../utils/request'
  export default {
    name:'market_entities',
    //引入组件
  components: {
    graphViewV4
  },
    data() {
      return {
// 【整合接收数据】
    formInline: {
      main_name:'',

    },
      }
    },
    mounted(){

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
};
</script>

<style lang="less" scoped>
.form{//搜索栏
    
    display:flex;
    justify-content:space-between;//左右贴边
    // margin-top:5px; 
    // height: 40px;
    padding-bottom:0; 
    padding-left: 10px;

  }
  
.grayish_btn{//浅灰色按钮
  color: #fff;//文字颜色
  background-color: #aaaaaa;//背景颜色
}
</style>
