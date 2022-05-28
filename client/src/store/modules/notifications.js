const state = {
    myNotifications: [],
    showAllNotifications: false
};

const getters = {
    getNotifications: (state) => {
        return [...state.myNotifications];
    },
    showAllNotifications: (state) => {
        return state.showAllNotifications;
    },
};

const mutations = {
    invertShowAllNotifications(state) {
        state.showAllNotifications = !state.showAllNotifications;
    },
    addNotification(state, notification) {
        let index = state.myNotifications.findIndex(e => e.Id == notification.Id);
        if (index >= 0) {
            state.myNotifications[index].ReadingDate = notification.ReadingDate;
        }
        else state.myNotifications.push(notification);
    },
    setNotifications(state, notifications) {
        state.myNotifications = notifications;
    },
    removeNotification(state, notiUser) {
        let index = state.myNotifications.findIndex(e => e.IdNotiUser == notiUser.Id);
        if (index >= 0){
            state.myNotifications.splice(index, 1);
        }
    },
};

const actions = {
    invertShowAllNotifications({ commit }) {
        commit('invertShowAllNotifications');
    },
    setNotifications({ commit }, data) {
        commit('setNotifications', data);
    },
    addNotification({ commit }, data) {
        commit('addNotification', data);
    },
    removeNotification({ commit }, data) {
        commit('removeNotification', data);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
