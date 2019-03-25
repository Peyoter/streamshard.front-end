<template>
    <div>
        <div class="widgetStarter js-widgetStarter">
            <div class="text-center">
                <img src="http://api.streamshard.ru/uploads/smart_widget/user_64/images/d53824f0-45e3-11e9-8355-69633c36ad1c.gif" alt="">
            </div>
            <div class="smartWidgetText">
                {{smartWidget.music}}
            </div>
            <audio id="smartAudio">
                <source v-bind:src="config.apiUrl + '/' + smartWidget.music" type="audio/mpeg">
            </audio>
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
        data() {
            return {
                user_id: 1,
            };
        },
        created() {
            const smartWidget_id = this.$router.currentRoute.params.id;
            this.$store.dispatch('smartWidget/show', {id: smartWidget_id});
        },
        computed: {
            config: function () {
                return config;
            },
            smartWidgetId() {
                return this.$router.currentRoute.params.id;
            },
            smartWidget() {
                return this.$store.state.smartWidget.element;
            },
            music() {
                return this.$store.state.smartWidget.music;
            }
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
            play() {
                playWidget(this);
            }
        }
    }

    function subscribeToChannel($that) {

        console.log($that.music);




        const chat = ws.subscribe('smartWidget:' + $that.smartWidgetId);
        $('.smartWidgetText').text($that.smartWidget.text);

        chat.on('error', () => {
            $('.connection-status').removeClass('connected')
        });

        chat.on('connected', (data) => {
            $(".smartWidgetText").text('ok');
            console.log('test');
        });

        chat.on('message', (data) => {
            if (data.message == 'run') {
                $that.play();
            }
        });
    }

    async function playWidget($that) {

        let mySound = soundManager.createSound({
            url: 'http://api.streamshard.ru/uploads/smart_widget/user_64/music/83cd4000-4e44-11e9-8579-6f784af1024a.mp3'
        });

        mySound.play();

//        let music_link = $that.config.apiUrl + '/' + $that.smartWidget.music;
//        let audio = AudioSingleton.getInstance(music_link);
//        audio.volume = $that.smartWidget.volume;
//        await audio.play();

        $('.js-widgetStarter').fadeIn();
//        audio.onended = function () {
//            $('.js-widgetStarter').fadeOut();
//        };
    }

//    const AudioSingleton = (function () {
//        var instance;
//
//        function createInstance(music_link) {
//            let object = new Audio(music_link);
//            return object;
//        }
//
//        return {
//            getInstance: function (music_link) {
//                if (!instance) {
//                    instance = createInstance(music_link);
//                }
//                return instance;
//            }
//        };
//    })();
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

    .widgetStarter {
        display: block;
        /*transition-property: opacity;*/
        /*transition: all 1s linear 1s;*/
    }

    /*.widgetStarter_on {*/
        /*opacity: 1;*/
    /*}*/

    /*#main-wrapper {*/
        /*background: rgba(0, 0, 0, 0) !important;*/
    /*}*/

    html, body {
        background-color: rgba(0, 0, 0, 0) !important;
    }
</style>

