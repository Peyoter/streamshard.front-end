import config from 'config';

import {authHeader, handleResponse} from '../_helpers';

export const smartWidgetService = {
    getAll,
    create,
    remove,
    store,
    show,
    update
};

function getAll() {
    const requestOptions = {
        method: 'get',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/smart_widgets`, requestOptions)
        .then(handleResponse)
}


function getCurrent() {
    const requestOptions = {
        method: 'get',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/smart_widgets`, requestOptions)
        .then(handleResponse)
}


function create() {
    const requestOptions = {
        method: 'get',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/smart_widgets`, requestOptions)
        .then(handleResponse)
}

function remove(data) {
    const requestOptions = {
        method: 'delete',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/smart_widgets/` + data.id, requestOptions)
        .then(handleResponse)
}

function store(formData) {

    const options = {
        method: 'POST',
        body: formData,
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/smart_widgets`, options)
        .then(handleResponse);
}


function show(data) {

    const options = {
        method: 'get',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/smart_widgets/` + data.id, options)
        .then(handleResponse);
}

function update(formData) {

    const options = {
        method: 'put',
        headers: authHeader(),
        body: formData,
    };

    return fetch(`${config.apiUrl}/smart_widgets/` + formData.id, options)
        .then(handleResponse);
}