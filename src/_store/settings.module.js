import { settingsService } from '../_services';

export const settings = {
    namespaced: true,
    state: {
        parameters: {
        },
        twitch_parameters:{

        }
    },
    actions: {
        getCurrent({ commit }) {
            commit('getAllRequest');
            settingsService.getCurrent()
                .then(
                    data => commit('getAllSuccess', data),
                    error => commit('getAllFailure', error)
                );
        },

        updateSettings({dispatch, commit}, data) {
            commit('getAllRequest');

            settingsService.updateCurrent(data)
                .then(
                    data => commit('getAllSuccess', data),
                    error => commit('getAllFailure', error)
                );
            settingsService.resetSockets();
        },

        getTwitchAccountData({dispatch, commit}, data){

            settingsService.getTwitchAccountData(data)
                .then(data => {
                        settingsService.updateCurrent(data).then(
                            data => commit('getAllSuccess', data),
                            error => commit('getAllFailure', error)
                        );
                    },
                    error => commit('getAllFailure', error)
                );
        }
    },
    mutations: {
        getAllRequest(state) {
            state.parameters = { loading: true };
        },
        getAllSuccess(state, data) {
            state.parameters = data.settings;
        },
        getAllFailure(state, error) {
            state.parameters = { error };
        },
        updateTwitchAccountData(state, data) {
            state.twitch_parameters = data;
        },
        updateTwitchCode (state, twitch_code) {
            state.parameters.twitch_code = twitch_code
        },
        updateStreamLabsCode (state, streamlabs_code) {
            state.parameters.streamlabs_code = streamlabs_code
        },
        updateDonationAlertsCode (state, donationalert_code) {
            state.parameters.donationalert_code = donationalert_code
        }
    }

};
