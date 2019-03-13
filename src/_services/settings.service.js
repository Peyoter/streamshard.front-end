import config from 'config';
import {authHeader, handleResponse, token} from '../_helpers';

export const settingsService = {
    getCurrent,
    updateCurrent,
    resetSockets,
    getTwitchAccountData,
};

function getCurrent() {

    const requestOptions = {
        method: 'get',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/settings/current`, requestOptions)
        .then(handleResponse)
}

function updateCurrent(data) {

    const requestOptions = {
        method: 'put',
        headers: {'Content-Type': 'application/json', 'Authorization': token()},
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/settings/current`, requestOptions)
        .then(handleResponse)
}


// Todo transfer to Twitch API
function getTwitchAccountData(data) {

    const requestOptions = {
        method: 'get',
        headers: {
            "Client-ID": data.clientId,
            "Authorization": "OAuth " + data.twitch_access_token
        },
    };

    return fetch(`https://api.twitch.tv/kraken/user`, requestOptions)
        .then(handleResponse)
}


function resetSockets() {

    const requestOptions = {
        method: 'get',
        headers: {'Content-Type': 'application/json', 'Authorization': token()},
    };

    fetch(`${config.apiUrl}/socket/resetSockets`, requestOptions)
        .then(handleResponse);

}