const state = {
    myNotifications: [],
};

const getters = {
    getNotifications: (state) => {
        return [...state.myNotifications];
    },
};

const mutations = {
    addNotification(state, notification) {
        let index = state.myNotifications.findIndex(e => e.Id == notification.Id);
        if (index >= 0){
            state.myNotifications[index].ReadingDate = notification.ReadingDate;
        }
        else state.myNotifications.push(notification);
    },
    setNotifications(state, notifications) {
        state.myNotifications = notifications;
    }
};

const actions = {
    setNotifications({ commit }, data) {
        commit('setNotifications', data);
    },
    addNotification({ commit }, data) {
        commit('addNotification', data);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
