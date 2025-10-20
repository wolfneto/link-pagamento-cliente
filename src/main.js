import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { router } from './router'
import store from '@/store/index';
import VueTheMask from 'vue-the-mask'
import api from './api/api'
import './plugins/crypto'

Vue.config.productionTip = false
Vue.prototype.$rota = router;
Vue.prototype.$api = api;
Vue.component('Footer', require('./components/Footer.vue').default)
Vue.component('Dentinho', require('./components/Dentinho.vue').default)

Vue.use(VueTheMask);

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')