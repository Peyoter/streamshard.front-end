import config from 'config';
import {authHeader, handleResponse, token} from '../_helpers';

export const overlayService = {
    getCurrent,
};

function getCurrent() {

    const requestOptions = {
        method: 'get',
        headers: {'Content-Type': 'application/json', 'Authorization': token()},
    };

    return fetch(`${config.apiUrl}/overlays/current`, requestOptions)
        .then(handleResponse)
}
