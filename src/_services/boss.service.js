import config from 'config';
import {handleResponse, authHeader, token} from '../_helpers';

export const bossService = {
    getCurrent,
    updateCurrent,
    getByCode,
};

function getCurrent() {

    const requestOptions = {
        method: 'get',
        headers: {'Content-Type': 'application/json', 'Authorization': token()},
    };

    return fetch(`${config.apiUrl}/boss/current`, requestOptions)
        .then(handleResponse)
}

function getByCode(data) {
    const requestOptions = {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    };

    return fetch(`${config.apiUrl}/boss/getBySlug/?slug=` + data.slug, requestOptions)
        .then(handleResponse)
}

function updateCurrent(data) {

    const requestOptions = {
        method: 'put',
        headers: {'Content-Type': 'application/json', 'Authorization': token()},
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/boss/current`, requestOptions)
        .then(handleResponse)
}