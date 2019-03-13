import {bossService} from '../_services';

export const boss = {
    namespaced: true,
    state: {
        boss: {},
    },
    actions: {
        getCurrent({commit}) {
            commit('getAllRequest');
            bossService.getCurrent()
                .then(
                    data => commit('getAllSuccess', data),
                    error => commit('getAllFailure', error)
                );
        },
        getByCode({commit}, data) {
            commit('getAllRequest');
            bossService.getByCode(data)
                .then(
                    data => commit('getAllSuccess', data),
                    error => commit('getAllFailure', error)
                );
        },

        updateCurrent({commit}, data) {
            commit('getAllRequest');
            bossService.updateCurrent(data).then(
                data => commit('getAllSuccess', data),
                error => commit('getAllFailure', error)
            );
        }

    },
    mutations: {
        getAllRequest(state) {
            state.boss = {loading: true};
        },
        getAllSuccess(state, data) {
            state.boss = data.boss;
        },
        getAllFailure(state, error) {
            state.boss = {error};
        },
        getAllFailure(state, error) {
            state.boss = {error};
        },
        updateAll(state, param) {
            for (var index in param) {
                state.boss[index] = param[index];
            }
        },
    }

};
