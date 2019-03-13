<template>
    <div class="bit-boss-wrapper">
        <div id="widget-default" class="widget-default bit-boss-wrapper has-avatar" :data-status="status_bar" :data-user_id="boss.user_id"
             style="position: relative; z-index: 1; font-family: Roboto; font-size: 18px; color: rgb(255, 255, 255); font-weight: bold; text-shadow: rgb(0, 0, 0) 1px 1px 1px; text-align: left; line-height: 1.5; width: 100%; height: 100%;">
            <div class="frame avatar-holder" id="current-boss" v-bind:style="{'background-color': boss.bg_color, '--height': boss.height + 'px', 'height': boss.height + 'px'}">
                <div class="avatar" v-bind:style="{'background-image':'url(\''+boss.image+'\')'}"></div>
            </div>
            <div class="frame health-container" v-bind:style="{'background-color': boss.bg_color, '--height': boss.height + 'px', 'height': boss.height /2 + 'px'}">
                <div class="health-bar">
                    <div class="health-inner" v-bind:style="{width: widthPercent + '%'}" ></div>
                </div>
                <div class="label">HP: {{ boss.health }} / {{boss.health_max}}</div>
            </div>
            <div class="frame big-box" v-bind:style="{'background-color': boss.bg_color, '--height': boss.height + 'px', 'height': boss.height + 'px'}">
                <div class="frame-lower">
                    <div class="current-boss"> {{boss.nick_name}}</div>
                        <div id="dmgrs">
                            <div class="dmg" style="background-color: rgb(255, 0, 0);">-{{boss.last_hit}}</div>
                            <div class="description">{{boss.nick_name_last_hit}} бьёт!</div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from 'config';
    import Ws from '@adonisjs/websocket-client'

    const ws = Ws(config.socket);
    import {TweenLite} from "gsap/TweenMax";

    export default {
        name: "Boss",
        data() {
            return {
                widthPercent: 100,
                health: 0,
                health_max: 0,
                show: false,
                status_bar:'healthy'
            }
        },
        computed: {
            boss() {

                this.widthPercent =  this.$store.state.boss.boss.health / this.$store.state.boss.boss.health_max * 100;

                if(this.widthPercent < 30){
                    this.status_bar = 'weak';
                }
                else if(this.widthPercent <= 70){
                    this.status_bar = 'medium';
                }
                else if(this.widthPercent > 70){
                    this.status_bar = 'healthy';
                }

                return this.$store.state.boss.boss;
            },
        },
        mounted() {

            ws.connect();

            let $that = this;
            ws.on('open', () => {
                $('.connection-status').text('connected')
                subscribeToChannel($that);
                ws.getSubscription('chat:'+  this.boss.user_id).emit('message', {'message': 'push'});
            });
            ws.on('error', () => {
                $('.connection-status').text('Ошибка')
            })
        }
    }

    function subscribeToChannel($that) {

        const chat = ws.subscribe('chat:' + $that.boss.user_id);

        chat.on('error', () => {
            $('.connection-status').removeClass('connected')
        });

        chat.on('message', (data) => {

            $('#dmgrs').fadeIn();

            $('#current-boss').jrumble({
                x: 10,
                y: 10,
                rotation: 4
            });

            $('#current-boss').trigger('startRumble');

            setTimeout(() => {
                $('#current-boss').trigger('stopRumble');
            }, 500);

            setTimeout(() => {
                $('#dmgrs').fadeOut();
            }, 1000);

            $that.widthPercent = data.boss.health / data.boss.health_max * 100;

            if($that.widthPercent < 30){
                $that.status_bar = 'weak';
            }
            else if($that.widthPercent <= 70){
                $that.status_bar = 'medium';
            }
            else if($that.widthPercent > 70){
                $that.status_bar = 'healthy';
            }

            $that.$store.commit('boss/updateAll', data.boss);
        });

    }
</script>