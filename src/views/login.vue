<template>
  <div id="backcont">
    <div class="meituan-contentr">
      <div class="login-cont ">
        <div class="meituan-title">登录</div>

        <div class="meituan-user">
          <p>账号</p>
          <el-input v-model='account' class="inptflex" placeholder="请输入账号" clearable />
        </div>

        <div class="meituan-user">
          <p>密码</p>
          <el-input v-model='password' class="inptflex" placeholder="请输入密码" clearable />
        </div>
        <!-- 登录和注册的按钮切换 -->
        <div class="reg-view" @click="regi= regi=='登录'? '注册':'登录'"><p>{{regi}}</p></div>
        <!-- 登录或注册按钮提交 -->
        <el-button v-if="regi=='注册'"  @click="signin" type="primary" class="meituan-btn">登录</el-button>
        <el-button v-else @click="register" type="primary" class="meituan-btn">注册</el-button>


      </div>
    </div>
  </div>
</template>

<script>
import { reactive,toRefs } from 'vue';

import http from "axios"

export default{
  setup(){
    const user =reactive({
      account:'',
      password:'',
      regi:'注册'
    })
    //登录

    const signin=()=>{
      console.log(user.account,user.password)
      http({
        url:'/sign',
        method:'post'
      }).then((res)=>{
        alert('请求成功!');
        let username=user.account;
        let password=user.password;


      });
    }

    
    
    //注册
    const register=()=>{
      console.log(user.account,user.password)}



    return{...toRefs(user),signin,register}
  }
}
</script>

<style  lang="less" scoped>
#backcont {
    background-image: url(../assets/background.jpg);
    background-attachment : fixed;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    moz-background-size: cover;
    min-height: 100vh;
}

.meituan-contentr {
    position : absolute;
    top: 50%;
    left: 50%;
    transform: translate( -50%,-50%);

}


.login-cont {
width: 500px;
height: 300px;
background: rgba(255, 255, 255, 0.795);
border-radius: 5px;
}

.meituan-title {
    text-align: center;
    color:#0000009b;
    font-size: 30px;
    padding-top: 15px;
    font-family : Arial,Helvetica,sans-serif;
    
}

.meituan-user {
    width: 400px;
    margin: 0 auto;
    padding-top: 30px;
    height: 40px;
    display: flex;
    align-items : center;
}    

.meituan-user p {
    width: 50px;
    color: #000000;
    font-size: 16px;
}

.inptflex {
    flex: 1;
}
    
.reg-view {
    width: 400px;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    padding-top: 10px;

}
.reg-view p {
    cursor: ·pointer;
    display: contents;
}
    
.meituan-btn {
    width: 200px;
    display: flex;
    align-items : center;
    justify-content: center;
    margin: 10px auto 0 auto;
    font-size: 16px;
}
    
</style>
