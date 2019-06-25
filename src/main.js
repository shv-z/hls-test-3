import Vue from 'vue'
import App from './App'
import router from '@/router/router'
import store from './store'
import axios from '@/plugins/axios-instance'
import i18n from '@/plugins/i18n'
import Fp2 from 'fingerprintjs2'
import { keys } from "@/config/constants"
import '@/assets/sass/app.scss'

window.$ = window.jQuery = require('jquery');

if (localStorage.getItem(keys.deviceId.local)) {
    axios.defaults.headers.common[keys.deviceId.header] = localStorage.getItem(keys.deviceId.local);
} else {
    Fp2.get(function(components) {
        let murmur = Fp2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
        axios.defaults.headers.common[keys.deviceId.header] = murmur;
        localStorage.setItem(keys.deviceId.local, murmur);
    });
}

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return new Promise(function () {
        if (error.response.status === 401) {
            store().dispatch('logout').then(() => {
                store().dispatch('login')
            })
        }
    });
});

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');