import {smartWidgetService} from '../_services';
import {router} from '../_helpers/router';

export const smartWidget = {
    namespaced: true,
    state: {
        loading: true,
        element: {
            title: '',
            nick_name: '',
            donation_handler: 0,
            subscribe_handler: 0,
            subgift_handler: 0,
            volume:1
        },
        widgets: [],
    },
    actions: {
        getAll({commit}) {
            commit('getAllRequest');
            smartWidgetService.getAll()
                .then(
                    data => commit('getAllSuccess', data),
                    error => commit('getAllFailure', error)
                );
        },

        show({commit}, data) {
            smartWidgetService.show(data)
                .then(
                    data => commit('getShowSuccess', data),
                    error => commit('getAllFailure', error)
                )
        },

        edit({commit}, data) {
            commit('getAllRequest');
            smartWidgetService.show(data)
                .then(
                    data => commit('getShowSuccess', data),
                    error => commit('getAllFailure', error)
                )
        },

        update({commit}, formData) {
            commit('getAllRequest');
            smartWidgetService.update(formData)
                .then(
                    () => {
                        router.push('/widgets');
                    },
                    error => commit('getAllFailure', error)
                )
        },
        store({commit}, formData) {
            commit('getAllRequest');
            smartWidgetService.store(formData)
                .then(
                    () => {
                        router.push('/widgets');
                    },
                    error => commit('getAllFailure', error)
                )
        },
        remove({commit}, id) {
            commit('getAllRequest');

            smartWidgetService.remove(id)
                .then(() => {
                        return smartWidgetService.getAll()
                    },
                    error => commit('getAllFailure', error)
                )
                .then(data => commit('getAllSuccess', data),
                    error => commit('getAllFailure', error)
                );
        },
    },
    mutations: {
        getAllRequest(state) {
            state.loading = true;
        },
        getShowSuccess(state, smartWidget) {
            state.element = smartWidget;
            state.loading = false;
        },
        getAllSuccess(state, smartWidgets) {
            state.loading = false;
            state.widgets = smartWidgets;
        },
        getAllFailure(state, error) {
            state.element = {error};
            state.widgets = {error};
        },
        updateElement(state, data) {
            for (let index in data) {
                state.element[index] = data[index];
            }
        }
    }
};
