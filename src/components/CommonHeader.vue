<!-- 上导航栏 -->
<template>
    <div class="header-container">
        
        <div class="l-content">
            <!-- tag -->
            <div class="tags" >

                <el-tag v-for="(item,index) in tags" 
                :key="item.path" 
                :closable="item.name!=='home'" 
                :effect="$route.name === item.name ? 'dark' : 'plain'"
                @click="changeMenu(item)"
                @close="handledClose(item,index)"
                style="margin-left: 5px"><!-- 只有非首页才显示closable，点击该页颜色加深effect-->
                {{ item.label }}
                </el-tag>

            </div>
<!-- 
            <el-breadcrumb separator="">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <el-button size="small" >首页</el-button>
                </el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">
                    <el-button size="small" >风险主体总量<i class="el-icon-close" size="mini " ></i>

                            </el-button>
                    </a></el-breadcrumb-item>
                </el-breadcrumb> -->

           
            <!-- <span class="text">首页</span> -->
            
        </div>
        <!-- 用户信息 登录注册 -->
        <div class="r-content">
            <!--练习的弹出框 -->
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 右侧登录页面设计 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                <el-button icon=el-icon-s-custom circle> </el-button>  <!--登录图表按钮-->
                    <span class="text">用户信息</span>
                    <i class="el-icon-arrow-down el-icon--right"></i> <!--下拉-->
                    </span>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <!-- 点击后改变弹出框生效情况 -->
                        <el-button type="text" @click="dialogVisible = true">注册</el-button>
                    </el-dropdown-item>

                    <el-dropdown-item> 
                        <el-button type="text" @click="dialogVisible = true">登录</el-button>
                   </el-dropdown-item>
                
                </el-dropdown-menu>
                </el-dropdown>
            
        </div>
    </div>
    
</template>

<script>
import {mapState,mapMutations} from 'vuex'
  export default {
    name: "CommonTag",
    data(){
        return{
            dialogVisible:false,//用户登录页面

        };
    },
    computed: {
        ...mapState({//mapState返回一个对象，表示扩展运算符，起到解构的作用...
            tags: state => state.tab.tabsList
        })
    },
    methods:{
        //调用Mutations,获取closeTag，并添加到当前页面中（讲解34）
        ...mapMutations(['closeTag']),
        //点击tag跳转的功能
        changeMenu(item){
            // console.log(item)
            this.$router.push({name: item.name})//点击一个，新增一个，面包屑tab增加一个
        },
        //点击tag x删除
        handledClose(item,index){  //index是获取的索引
            //点击tag删除 tabsList里面的数据
            // 方法1
            // this.$store.commit('closeTag')
            // 方法2,调用store中的Mutations
            this.closeTag(item)
            const length=this.tags.length-1
            //删除之后的跳转逻辑
            

        },
        
    


        


    }
  };
</script>

<style lang="less" scoped>

.header-container{
    padding: 0 30px;
    background-color: #33333325;
    height: 60px;
    display: flex;//相邻的两个内容一行显示
    justify-content: space-between;
   
   .text{
    color:rgba(0, 0, 0, 0.719);
    font-size: 13px;
    margin-left: 5px;//左间距
    margin-bottom: 10px;//下间距

   }
   .l-content{
    display: flex;
    justify-content: space-between;
    align-items: end; // 中间
   }
   .r-content{
    margin-top: 5px;//下间距
    align-items: top; // 中间
    .el-button.is-circle {
        border-radius: 100%;
        padding: 3px;//边框和内部距离
    }

    .el-button {//按钮边框
        background: #ffffff00; 
        border: 1px solid #00040e;
        color: #000104; 
        font-size: 16px;
        border-radius: 20px;
    }
   }
  
}
</style>