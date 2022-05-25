import Vue from 'vue';
import App from './App.vue';
import router from './routes/router.js';
import utils from './mixins/utils.mixin';
import userService from './services/user.service';

// const io = require('socket.io')();
// import utils from "./mixins/utils";

Vue.mixin(utils);
Vue.mixin(userService);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



String.prototype.toDDMMYYYYHHMMSS = function () {
    let result = this;
    try {
        var date = new Date(this);
        result = [
            `0${date.getDate()}`.slice(-2),
            `0${date.getMonth() + 1}`.slice(-2),
            date.getFullYear()].join('/') + ' ' +
            [`0${date.getHours()}`.slice(-2),
            `0${date.getMinutes() + 1}`.slice(-2),
            `0${date.getSeconds() + 1}`.slice(-2)].join(':');
    } catch (error) {
        console.log(error);
    }
    return result;
}
