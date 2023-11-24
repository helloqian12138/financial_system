<!-- 分页 -->
<template>
    <div class="pagination">
      <el-button type="button" @click="jumpFirstPage" size="mini">首页</el-button>
          <!-- layout="total,  prev, pager, next, jumper" -->
          <!-- layout="prev, next"就只显示上一页、下一页 -->
        <el-pagination
            background prev-text="上一页" next-text="下一页"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size=page_size
            layout="prev, next"
            :total="total"
            style="display: inline-block;padding-left: 0px;">
        </el-pagination>
        <el-button type="button" @click="jumpLastPage"  size="mini">尾页</el-button>
    </div>




</template>

<script>
  export default {
    // 接收外部数据
    props:{
        total:{
            type:Number,
            default:100 
        },
        page_size:{
            type:Number,
            default:10
        },
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        // 将页码传给父组件
        this.$emit('CurrentChange',val)
      },
      
      // 添加首页、尾页跳转方法
      jumpFirstPage () {
        this.$refs.pagination.handleCurrentChange(1);
        this.$emit('handleCurrentChange', 1);
      },
      jumpLastPage () {
          let font = this.$refs.pagination
          let cpage = Math.ceil(font.total / font.pageSize);
          font.handleCurrentChange(cpage);
      },
    },
    data() {
      return {
        currentPage: 5,
      };
    }
  }
</script>


<style lang="less" scoped>
.pagination{
    display:flex;
    justify-content:center;//左右贴边
    padding: 40px;
}
</style>