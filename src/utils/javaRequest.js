import axios from "axios";

const javaReq=axios.create({
    // baseURL:'http://61.240.140.173:8088/',//java的地址前缀
    baseURL:'/api/',//后端的地址前缀
})

export default javaReq