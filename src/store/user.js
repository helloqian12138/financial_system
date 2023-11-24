import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//这个理论来说
const user = new Vuex.Store({
    state:{
        userId : '',
        isLogin:'',
        token:''
    }
})

export default user
