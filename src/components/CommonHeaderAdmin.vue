<!-- 上导航栏 -->
<template>
    <div class="header-container">


        <div class="l-content">

            <el-button  @click="handleMenu"  :icon=" icon" size="medium" style="padding: 5px;width: 30px;height: 60px;background-color:transparent;"></el-button>

            <!-- tag -->
            <div class="tags" >

                <el-tag v-for="(item,index) in tags" 
                :key="item.path" 
                :closable="true" 
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
                title="修改个人信息"
                :visible.sync="dialogVisible"
                width="30%">
                <span></span>
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
<!--                    <el-dropdown-item>-->
<!--                        &lt;!&ndash; 点击后改变弹出框生效情况 &ndash;&gt;-->
<!--                        <el-button  style='width: 150px;' @click="dialogVisible = true">修改个人信息</el-button>-->
<!--                    </el-dropdown-item>-->

                    <el-dropdown-item> 
                        <el-button style='width: 150px;' @click = "UserManagement">用户管理</el-button>
                   </el-dropdown-item>

                   <el-dropdown-item>
                        <el-button style='width: 150px;' @click="logout">退出登录</el-button>
                   </el-dropdown-item>
                
                </el-dropdown-menu>
                </el-dropdown>
            
        </div>
    </div>
    
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import http from "@/utils/request";
  export default {
    name: "CommonTag",
    data(){
        return{
            dialogVisible:false,//用户登录页面
            // 折叠按钮
            icon:"el-icon-arrow-left",

        };
    },
    computed: {
        ...mapState({//mapState返回一个对象，表示扩展运算符，起到解构的作用...
            tags: state => state.tab.tabsList
        })
        
    },
    methods:{

        // 折叠方法
        handleMenu(){
        this.$store.commit('collapseMenu')
        this.icon = this.icon === 'el-icon-arrow-left' ? 'el-icon-arrow-right' : 'el-icon-arrow-left';
        },

      logout(){
        this.$store.commit('logout')
        this.$notify.info({
          title: '注意',
          message: '已退出'
        })
          this.$router.push('/login')
          location.reload();
      },

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
            const length=this.tags.length
            // console.log("tags长度：",this.tags.length)
            // console.log( this.$router)
            
            //删除之后的跳转逻辑
            //一）当前页与删除页不同（item.name和当前展示路由不一致），直接删除路由列表里面的对于name，就不能再打开，没有人性化调整的必要
            if(item.name!== this.$route.name){
                return
            }
            //二）当前页=删除页——删除的是最后一页(页面转到路由列表中的前一个)
            if(index===length){
                if(length===0){
                    item={
                        path: "/market_entities",
                        name: "market_entities",
                        label: "市场主体分析",
                    }
                    this.$router.push(item)
                    this.$store.commit('selectMenu', item)//点击获取新路由对象,store在这里不用import  
                }
                else{ 
                    this.$router.push({
                        name:this.tags[index-1].name
                    })
                }
            }

            //三）当前页=删除页——删除的是中间一页(跳转后一个，因为已经删除了，跳转的还是后面那个)
            else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
            

        },

        // 跳转用户管理
        UserManagement(){//点击标题跳转大屏
            this.$router.push('/UserManagement');
        },

    


        


    }
  };
</script>

<style lang="less" scoped>

.header-container{
    // padding: 0 30px;
    padding: 0 0px;
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