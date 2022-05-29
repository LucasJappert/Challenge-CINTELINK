import api from '../../services/api.service';
const state = {
    tags: [],
    myTags: []
};

const getters = {
    getTags: (state) => {
        return [...state.tags];
    },
    getMyTags: (state) => {
        return [...state.myTags];
    },
};

const mutations = {
    setTags(state, data) {
        state.tags = data;
    },
    setMyTags(state, data) {
        state.myTags = data;
    },
    updateMyTags(state, newTag) {
        let i = state.myTags.findIndex(e => e.Id == newTag.Id);
        if (i >= 0) {
            state.myTags[i] = newTag;
            return;
        }
        state.myTags.push(newTag);
    }
};

const actions = {
    async setTags({ commit }) {
        let tags = await api.GetTags();
        commit('setTags', tags);
    },
    setMyTags({ commit }, data) {
        commit('setMyTags', data);
    },
    updateMyTags({ commit }, data) {
        commit('updateMyTags', data);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
