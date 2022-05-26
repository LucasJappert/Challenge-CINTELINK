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
