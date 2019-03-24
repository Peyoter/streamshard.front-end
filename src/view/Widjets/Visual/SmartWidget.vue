<template>
    <div>
        <div class="widgetStarter js-widgetStarter">
            <div class="text-center">
                <img v-bind:src="config.apiUrl + '/' +  smartWidget.image" alt="">
            </div>
            <div class="smartWidgetText">
                {{smartWidget.text}}
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
                let context = playWidget.bind(this);
                context(context);
            }
        }
    }

    function subscribeToChannel($that) {

        const chat = ws.subscribe('smartWidget:' + $that.smartWidgetId);

        chat.on('error', () => {
            $('.connection-status').removeClass('connected')
        });

        chat.on('connected', (data) => {
            console.log('test');
        });

        chat.on('message', (data) => {
            if (data.message == 'run') {
                $that.play();
            }
        });
    }

    async function playWidget() {
        let music_link = this.config.apiUrl + '/' + this.smartWidget.music;
        let audio = AudioSingleton.getInstance(music_link);
        audio.volume = this.smartWidget.volume;
        await audio.play();
        $('.js-widgetStarter').addClass('widgetStarter_on');
        audio.onended = function () {
            $('.js-widgetStarter').removeClass('widgetStarter_on');
        };
    }

    const AudioSingleton = (function () {
        var instance;

        function createInstance(music_link) {
            let object = new Audio(music_link);
            return object;
        }

        return {
            getInstance: function (music_link) {
                if (!instance) {
                    instance = createInstance(music_link);
                }
                return instance;
            }
        };
    })();
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
        opacity: 0.0;
        transition-property: opacity;
        transition: all 1s linear 1s;
    }

    .widgetStarter_on {
        opacity: 1;
    }

    #main-wrapper {
        background: rgba(0, 0, 0, 0) !important;
    }

    html, body {
        background-color: rgba(0, 0, 0, 0) !important;
    }
</style>

