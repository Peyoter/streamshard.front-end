import {overlayService} from '../_services';

export const overlay = {
    namespaced: true,
    state: {
        overlay: {},
    },
    actions: {
        getCurrent({commit}) {
            commit('getAllRequest');
            overlayService.getCurrent()
                .then(
                    data => commit('getAllSuccess', data),
                    error => commit('getAllFailure', error)
                );
        },

    },
    mutations: {
        getAllRequest(state) {
            state.overlay = {loading: true};
        },
        getAllSuccess(state, data) {
            state.overlay = data.overlay;
        },
        getAllFailure(state, error) {
            state.overlay = {error};
        },
    }

};
