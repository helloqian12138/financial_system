// import user from "@/store/user";

export default{
    state:{
        tabsList:[
            // {
            //     path: "/",
            //     name: "home",
            //     label: "首页",
            //     icon: "s-home",
            //     url: "Home/Home",
            //   },
        ],//tags(位于上导航栏)
        //用户
        isAdmin:'',
        userId : '',
        isLogin:false,
        token:'',
        isCollapse:false,

    },
    mutations:{//mutations往往接收两个数据，第二个才是我们想要的数据
        collapseMenu(state){
            state.isCollapse= !state.isCollapse

        },
        // 更新导航栏tag标签
        selectMenu(state,val){
            // console.log(val , 'val')
            // if(val.name!=='home'){
                const index = state.tabsList.findIndex(item => item.name===val.name)//index是判断是否在tabsList里面，在就显示索引，不在就显示-1
                const length = state.tabsList.length
                console.log(state.tabsList)
                console.log(length)


                //如果不存在
                if(index===-1){
                    state.tabsList.push(val)//列表添加
                }

        },
        // 删除指定的tag数据
        closeTag(state,item){
            // console.log(item,'item')//后面参数，优化打印查看，类似于更换数据名
            const index=state.tabsList.findIndex(val => val.name===item.name)
            state.tabsList.splice(index,1)//删除index（一个）

        },

    login(state,user){
        state.isLogin=true
        sessionStorage.setItem('token',user.token)
        sessionStorage.setItem('user',user.name)
        // 管理员字段
        sessionStorage.setItem('stats',user.stats)
        // console.log('login:'+state.isLogin)
        // console.log('token:u'+user.token)
    },
    // 关闭会话（页面），session会自动清除？
    logout(state){
        state.isLogin=false
        state.name=''
        sessionStorage.clear()
    }
},
    getters: {
        getUserState(state) {
            return state.isLogin;
        },

    }



}