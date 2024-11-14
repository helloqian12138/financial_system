import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'//管理菜单的数据

Vue.use(Vuex)

//创建vuex实例
export default new Vuex.Store({
    modules: {
        tab
    }
})