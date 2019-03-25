<template>
    <div>
        <div class="widgetStarter js-widgetStarter">
            <div class="text-center">
                <img class="img">
            </div>
            <div class="smartWidgetText" id="smartWidgetText">

            </div>
        </div>
    </div>
</template>

<script>
    import config from 'config';
    import Ws from '@adonisjs/websocket-client'
    import SoundManager from 'soundmanager2';

    const ws = Ws(config.socket);

    export default {
        name: "SmartWidgetObs",
        computed: {
            config: function () {
                return config;
            },
            user_id: function () {
                return this.$router.currentRoute.params.user_id;
            },
        },
        mounted() {
            ws.connect();
            let $that = this;
            ws.on('open', () => {
                subscribeToChannel($that);
            });
            ws.on('error', () => {
                $('.connection-status').text('Ошибка')
            })
        }, methods: {
            play(data) {
                playWidget(data);
            }
        }
    }

    function subscribeToChannel($that) {
        const chat = ws.subscribe('smartWidget:' + $that.user_id);

        chat.on('error', () => {
            $('.connection-status').removeClass('connected')
        });

        chat.on('connected', (data) => {
            console.log('test');
        });

        chat.on('message', (data) => {
            console.log(data);
            if (data.message == 'run') {
                $that.play(data);
            }
        });
    }

    async function playWidget(data) {
        $('.js-widgetStarter').css({display: 'block'});
        soundManager.stopAll();
        $('.img').attr('src', 'http://api.streamshard.ru/' + data.widget.image);
        let mySound = soundManager.createSound({
            url: 'http://api.streamshard.ru/' + data.widget.music,
            onfinish: function() {
                $('.js-widgetStarter').css({display: 'none'});
            },
            volume: data.widget.volume * 100
        });

        mySound.play();

        $('.smartWidgetText').text(data.widget.text);
        $('#smartWidgetText').jrumble({
            x: 10,
            y: 10,
            rotation: 4
        });
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Lobster');

    .smartWidgetText {
        font-family: 'Lobster', cursive;
        font-size: 35px;
        font-weight: bold;
        text-align: center;
        color: #fff;
    }

    .js-widgetStarter {
        display: none;
        /*transition-property: opacity;*/
        /*transition: all 1s linear 1s;*/
    }

    /*.widgetStarter_on {*/
    /*opacity: 1;*/
    /*}*/

    #main-wrapper {
        background: rgba(0, 0, 0, 0) !important;
    }

    html, body {
        background-color: rgba(0, 0, 0, 0) !important;
    }
</style>

