<template>
    <div>
        {{settings}}
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import config from 'config';
    import aWs from '@adonisjs/websocket-client'
    const sWs = aWs(config.socket);


    export default {
        computed: {
            settings: function () {
                return this.$store.state.settings.parameters;
            },
        },
        created() {
            this.$store.dispatch('settings/getCurrent');
        },
        watch: {
            settings(newValue) {
                {
                    // Сделать проверку на integer
                    if(newValue.user_id)
                    {
                        sWs.connect();

                        const Token = this.settings.access_token;
                        const userId = this.settings.id;

                        let heartbeatInterval = 1000 * 60; //ms between PING's
                        let reconnectInterval = 1000 * 3; //ms to wait before reconnect
                        let heartbeatHandle;
                        let Topic = 'channel-subscribe-events-v1.' + this.settings.twitch_id;
                        //let Topic = 'whispers.' + this.settings.twitch_id;

                        const ws = new WebSocket('wss://pubsub-edge.twitch.tv');

                        sWs.on('open', (data) => {
                            const chat = sWs.subscribe('single:' + userId + 'twitch');
                            sWs.getSubscription('single:' + userId + 'twitch').emit('message', {'message': 'push'});

                            // Сообщение отправлеяется один раз и потом его нельзу будет отправить
                            chat.on('message', (data) => {
                                ws.onmessage = async function (event) {
                                    let message = JSON.parse(event.data);
                                    console.log(message);
                                    if (message.type = "MESSAGE") {
                                        if (message.hasOwnProperty('data')) {
                                            let data = JSON.parse(message.data.message);

                                            if (data.context == "subscription") {

                                                // await axios.get('http://api.streamshard.ru/boss/ping?user_id=' + userId);
                                            }

                                            if (data.context == "resub") {

                                                // await axios.get('http://api.streamshard.ru/boss/ping?user_id=' + userId);
                                            }

                                            if (data.context == "subgift") {

                                                // await axios.get('http://api.streamshard.ru/boss/ping?user_id=' + userId);
                                            }
                                        }
                                    }
                                };
                            });
                        });

                            let message = {
                                type: 'LISTEN',
                                nonce: nonce(15),
                                data: {
                                    topics: [Topic],
                                    auth_token: Token
                                }
                            };

                            ws.onopen = function (event) {
                                console.log('connect');
                                ws.send(JSON.stringify(message));

                                heartbeatHandle = setInterval(function () {
                                    let message = {
                                        type: 'PING'
                                    };
                                    ws.send(JSON.stringify(message));
                                }, heartbeatInterval);
                            };

                            ws.onerror = function (error) {

                            };

                            ws.onclose = function () {
                                clearInterval(heartbeatHandle);
                                setTimeout(connect, reconnectInterval);
                            };
                    }
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
