import Vue from 'vue';
import Vuex from 'vuex';
import notifications from './modules/notifications';
import tags from './modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        notifications,
        tags
    }
});
