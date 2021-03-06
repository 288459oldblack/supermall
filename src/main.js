import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Toast from "components/common/toast/index.js";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()


Vue.use(Toast);


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')