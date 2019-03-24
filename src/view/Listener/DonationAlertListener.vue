<template>
    <div>
        {{settings}}
    </div>
</template>

<script>
    // Todo Использовать везде один клиент
    import config from 'config';
    import aWs from '@adonisjs/websocket-client'

    const sWs = aWs(config.socket);
    import Ws from 'socket.io-client';
    import axios from 'axios';

    export default {
        attributes: ['smartWidget'],
        computed: {
            settings: function () {
                return this.$store.state.settings.parameters;
            },
        },
        watch: {
            settings(newValue) {
                if (newValue.user_id && typeof newValue.donationalert_code !== 'undefined') {
                    sWs.connect();

                    const Token = this.settings.donationalert_code;
                    const userId = this.settings.id;

                    let socket = Ws.connect('http://socket.donationalerts.ru:3001', {reconnect: true});

                    socket.on('connect', function (socket) {
                        console.log('Donation Alert connected!');
                    });

                    socket.emit('add-user', {token: Token, type: "minor"});

                    sWs.on('open', (data) => {
                        const chat = sWs.subscribe('single:' + userId + 'donation');
                        sWs.getSubscription('single:' + userId + 'donation').emit('message', {'message': 'push'});

                        // chat.on('connected', (socket) => {});

                        // Сообщение отправлеяется один раз и потом его нельзу будет отправить
                        chat.on('message', (data) => {

                            socket.on('donation', async function (data) {

                                let dataJS = JSON.parse(data);

                                await axios.post(config.apiUrl + '/boss/hit/', {
                                    data: {
                                        user_id: userId,
                                        nick_name: dataJS.username,
                                        hit: dataJS.amount_main,
                                        type: 'donation',
                                    }
                                });

                                await axios.post(config.apiUrl + '/boss/hit/', {
                                    data: {
                                        user_id: userId,
                                        nick_name: '',
                                        hit: '',
                                        type: 'donation',
                                    }
                                });

                            });

                        });

                        chat.on('error', () => {
                            $('.connection-status').removeClass('connected')
                        });

                    });
                }
            }
        }
    };

    function nonce(length) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

</script>
