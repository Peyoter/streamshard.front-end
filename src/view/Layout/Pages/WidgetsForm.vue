<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-themecolor">Персональные виджеты</h3>
                </div>
            </div>
            <div class="row">
                <transition name="fade">
                    <div class="card" v-if="!loading">
                        <div class="card-body">
                            <div class="form-material m-t-40">
                                <form id="upload">
                                    <div class="form-group">
                                        <label>Название виджета</label>
                                        <input type="text" class="form-control" placeholder="" v-model="title"
                                               maxlength="255">
                                    </div>

                                    <div class="form-group">
                                        <label>Ник олда</label>
                                        <input type="text" class="form-control" placeholder=""
                                               v-model="nick_name">
                                    </div>

                                    <div class="form-group">
                                        <label>Текст сообщения</label>
                                        <input type="text" class="form-control" placeholder=""
                                               v-model="text">
                                    </div>

                                    <div class="form-group">
                                        <label>Музыка</label>
                                        <input class="form-control" type="file" id="file" ref="music"
                                               v-on:change="handleMusicUpload()">
                                    </div>

                                    <div class="form-group">
                                        <label>Картинка</label>
                                        <div v-if="imageLink" style="margin-bottom: 20px;">
                                            <img v-bind:src="config.apiUrl + '/' + imageLink" alt="" style="width: 100%; max-width: 480px">
                                        </div>
                                        <input type="file" class="form-control" id="image" ref="image"
                                               v-on:change="handleImageUpload()">
                                    </div>

                                    <div class="form-group">
                                        <label>Громкость: {{ volume * 100 }} <span>%</span></label>
                                        <div>
                                            <input type="range" id="start" v-model="volume" min="0" max="1" step="0.1">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <input type="checkbox" class="check" id="minimal-checkbox-1" v-model="subscribe_handler" value="1">
                                        <label for="minimal-checkbox-1">Реакция на подписку</label>
                                    </div>

                                    <div class="form-group">
                                        <input type="checkbox" class="check" id="minimal-checkbox-2" v-model="subgift_handler" value="1">
                                        <label for="minimal-checkbox-2">Реакция на подарочную подписку</label>
                                    </div>

                                    <div class="form-group">
                                        <input type="checkbox" class="check" id="minimal-checkbox-3" v-model="donation_handler" value="1">
                                        <label for="minimal-checkbox-3">Реакция на донат</label>
                                    </div>

                                    <button class="btn btn-success" v-on:click.stop.prevent="submitForm()">Сохранить</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {authHeader, handleResponse, token} from '../../../_helpers';
    import config from 'config';

    export default {
        data:() =>{
            return {
                config:config
            }
        },
        computed: {
            loading: function () {
                return this.$store.state.smartWidget.loading;
            },
            id:{
                get(){
                    return this.$store.state.smartWidget.element.id;
                }
            },
            musicLink: {
                get()
                {

                }
            },
            imageLink: {
                get()
                {
                    return this.$store.state.smartWidget.element.image;
                }
            },
            title: {
                get() {
                    return this.$store.state.smartWidget.element.title;
                },
                set(title) {
                    this.$store.commit('smartWidget/updateElement', {title: title})
                }
            },
            nick_name: {
                get() {
                    return this.$store.state.smartWidget.element.nick_name;
                },
                set(nick_name) {
                    this.$store.commit('smartWidget/updateElement', {nick_name: nick_name})
                }
            },
            chat_command: {
                get() {
                    return this.$store.state.smartWidget.element.chat_command;
                },
                set(chat_command) {
                    this.$store.commit('smartWidget/updateElement', {chat_command: chat_command})
                }
            },
            donation_handler: {
                get() {
                    return this.$store.state.smartWidget.element.donation_handler;
                },
                set(donation_handler) {
                    this.$store.commit('smartWidget/updateElement', {donation_handler: donation_handler})
                }
            },
            host_handler: {
                get() {
                    return this.$store.state.smartWidget.element.host_handler;
                },
                set(donation_handler) {
                    this.$store.commit('smartWidget/updateElement', {host_handler: host_handler})
                }
            },
            bits_handler: {
                get() {
                    return this.$store.state.smartWidget.element.bits_handler;
                },
                set(bits_handler) {
                    this.$store.commit('smartWidget/updateElement', {bits_handler: bits_handler})
                }
            },
            subscribe_handler: {
                get() {
                    return this.$store.state.smartWidget.element.subscribe_handler;
                },
                set(subscribe_handler) {
                    this.$store.commit('smartWidget/updateElement', {subscribe_handler: subscribe_handler})
                }
            },
            subgift_handler: {
                get() {
                    return this.$store.state.smartWidget.element.subgift_handler;
                },
                set(subgift_handler) {
                    this.$store.commit('smartWidget/updateElement', {subgift_handler: subgift_handler})
                }
            },
            text: {
                get() {
                    return this.$store.state.smartWidget.element.text;
                },
                set(text) {
                    this.$store.commit('smartWidget/updateElement', {text: text})
                }
            },
            volume: {
                get() {
                    return this.$store.state.smartWidget.element.volume;
                },
                set(volume) {
                    this.$store.commit('smartWidget/updateElement', {volume: volume})
                }
            },
        },
        created() {
            if(this.$route.params.id){
                this.$store.dispatch('smartWidget/edit', {id: this.$route.params.id});
            }
        },
        methods: {
            submitForm() {
                const formData = new FormData();
                console.log(this.$store.state.smartWidget.element.text);
                formData.append('title', this.$store.state.smartWidget.element.title);
                formData.append('nick_name', this.$store.state.smartWidget.element.nick_name);
                formData.append('text', this.$store.state.smartWidget.element.text);
                formData.append('music', this.music);
                formData.append('image', this.image);
                formData.append('subscribe_handler', this.$store.state.smartWidget.element.subscribe_handler);
                formData.append('donation_handler', this.$store.state.smartWidget.element.donation_handler);
                formData.append('subgift_handler', this.$store.state.smartWidget.element.subgift_handler);
                formData.append('volume', this.$store.state.smartWidget.element.volume);

                if(!this.id){
                    this.$store.dispatch('smartWidget/store', formData);
                }
                else {
                    formData.id = this.id;
                    this.$store.dispatch('smartWidget/update', formData);
                }

            },
            handleMusicUpload() {
                this.music = this.$refs.music.files[0];
            },
            handleImageUpload() {
                this.image = this.$refs.image.files[0];
            }
        }
    };
</script>
