// axios二次封装
import axios from 'axios'

//
const http = axios.create({
    //通用请求
    baseURL:'http://61.240.140.173:8000/',//后端的地址前缀
    // baseURL:'/proxy_url',//后端的地址前缀
    // baseURL:'/api/',//mock前缀
    // async:true,
    // timeout:'10000',//10s 超时时间
})


// // 添加请求拦截器
// http.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

// // 添加响应拦截器
// http.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });


export default http//将实例对外暴露
