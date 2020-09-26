import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import draggable from 'vuedraggable'

// Styles
import './assets/scss/index.scss'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)
Vue.component('draggable', draggable)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
