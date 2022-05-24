import Vue from 'vue';
import App from './App.vue';
import router from './routes/router.js';
import userService from './services/user.service';

// const io = require('socket.io')();
// import utils from "./mixins/utils";

// Vue.use(utils);
Vue.mixin(userService);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
