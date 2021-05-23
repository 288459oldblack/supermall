import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

//1.注册组件
Vue.use(Vuex)

const state = {
        cartList: []
    }
    //2.创建一个store对象
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

//3.导出store对象,然后在main.js导入并挂载
export default store