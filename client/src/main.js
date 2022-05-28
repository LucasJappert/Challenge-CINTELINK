import Vue from 'vue';
import App from './App.vue';
import router from './routes/router.js';
import general from './mixins/general.mixin';
import Header from "./components/Header";
import store from "./store/index";

// const io = require('socket.io')();

Vue.component("Header", Header);

Vue.mixin(general);
// Vue.mixin(userService);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')



String.prototype.toDDMMYYYYHHMMSS = function () {
    let result = this;
    try {
        var date = new Date(this);
        result = [
            `0${date.getUTCDate()}`.slice(-2),
            `0${date.getUTCMonth() + 1}`.slice(-2),
            date.getUTCFullYear()].join('/') + ' ' +
            [`0${date.getUTCHours()}`.slice(-2),
            `0${date.getUTCMinutes() + 1}`.slice(-2),
            `0${date.getUTCSeconds() + 1}`.slice(-2)].join(':');
    } catch (error) {
        console.log(error);
    }
    return result;
}
String.prototype.ToMyLocalDate = function () {
    let date = new Date(this);
    try {
        let result = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return result;
    } catch (error) {
        console.log(error);
    }
    return date;
}
