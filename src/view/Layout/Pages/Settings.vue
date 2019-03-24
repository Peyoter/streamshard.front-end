<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-4">
                    <h3 class="text-themecolor">Настройки</h3>
                    <transition  name="fade" >
                        <div class="card" v-if="!settings.loading" >
                            <div class="card-body">

                                <a class="btn btn-info" v-bind:href="twitchAuthLink" v-if="!settings.display_name">
                                    <i class="settings-twitch-connect mdi mdi-twitch"></i>
                                    Подключить твищъ
                                </a>

                                <div v-if="settings.display_name">
                                    <img v-bind:src="settings.logo" alt="" class="img-circle settings-avatar">
                                    <div class="settings-text">
                                        Привет {{ settings.display_name}}! <br>
                                        твой аккаунт привязан!
                                        <br>
                                        <button class="btn btn-outline-warning btn-sm" @click="twitchLogout">Отвязать аккаунт</button>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>

                                <div class="form-material m-t-40">
                                       <form @submit.prevent="handleSubmit">
                                           <div class="form-group">
                                               <label class="control-label">Api-code StreamLabs</label>
                                               <input :value="streamlabs_code" @input="updateStreamLabsCode" type="text"
                                                      class="form-control" placeholder="">
                                               <small class="form-control-feedback"></small>
                                           </div>

                                           <div class="form-group">
                                               <label class="control-label">Api-code DonationAlerts</label>
                                               <input :value="donationalert_code" @input="updateDonationAlertsCode" type="text"
                                                      class="form-control" placeholder="">
                                               <small class="form-control-feedback"></small>
                                           </div>

                                           <button class="btn btn-outline-info">Сохранить</button>
                                       </form>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="col-4">
                        <h3 class="text-themecolor">Как настроить интеграцию</h3>
                        <div class="card" v-if="!settings.loading" >
                             <span style="background: #ff6915; color: white">
                                Внимание, всё опять пришлось переделать потому еще нужно нажать на кнопку
                                подключить твищЪ!!!
                            </span>
                            <iframe width="100%" height="357px" src="https://www.youtube.com/embed/yBu2XyxN2BQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                </div>
            </div>
        </div>
        <footer class="footer"></footer>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import config from 'config';

    export default {
        computed: {
            twitchAuthLink: () => {
                sessionStorage.twitchOAuthState = nonce(15);
                const url = 'https://api.twitch.tv/kraken/oauth2/authorize' +
                    '?response_type=token' +
                    '&client_id=' + config.twitchAuth.clientId +
                    '&redirect_uri=' + config.twitchAuth.redirectURI +
                    '&state=' + sessionStorage.twitchOAuthState +
                    '&scope=' + config.twitchAuth.scope;

                return url;
            },

            ...mapState({
                twitch_parameters: (state) => {
                    return state.settings.twitch_parameters;
                },
                settings: state => {
                    return state.settings.parameters;
                },
                streamlabs_code: state => {
                    return state.settings.parameters.streamlabs_code;
                },
                donationalert_code: state => {
                    return state.settings.parameters.donationalert_code;
                },
            })
        },
        created() {

            if (document.location.hash.match(/access_token=(\w+)/)){
                let hash = document.location.hash;

                let hashMatch = function(expr) {
                    let match = hash.match(expr);
                    return match ? match[1] : null;
                };

                let twitch_access_token = hashMatch(/access_token=(\w+)/);

                this.$store.dispatch('settings/updateSettings', {access_token:twitch_access_token});

                this._getAuthTwitchData(twitch_access_token);
            }
            else{
                this.needAuthTwitch = true;
            }

            this.$store.dispatch('settings/getCurrent');
        },
        methods: {
            updateStreamLabsCode(e) {
                this.$store.commit('settings/updateStreamLabsCode', e.target.value)
            },

            updateDonationAlertsCode(e) {
                this.$store.commit('settings/updateDonationAlertsCode', e.target.value)
            },

            handleSubmit(e) {
                this.submitted = true;
                let {streamlabs_code, donationalert_code, twitch_code} = this.$store.state.settings.parameters;
                const {dispatch} = this.$store;
                dispatch('settings/updateSettings', {streamlabs_code, donationalert_code, twitch_code});
            },

            twitchLogout(){
                this.$store.dispatch('settings/updateSettings', {twitch_code:'', access_token:'', display_name:'', twitch_id: 0, logo:''});
            },

            _getAuthTwitchData(twitch_access_token){
                this.$store.dispatch('settings/getTwitchAccountData', {
                    clientId: config.twitchAuth.clientId,
                    twitch_access_token: twitch_access_token
                });

            },

        },
    };

    // Todo Transfer to serverside
    function nonce(length) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

</script>

