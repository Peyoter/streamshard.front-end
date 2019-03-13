<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-themecolor">Персональные виджеты</h3>
                </div>
            </div>
            <div class="row">
                <transition  name="fade">
                    <div class="card" v-if="!loading">
                    <div class="card-body">
                        <div class="form-material m-t-40">
                            <form id="upload">
                                <div class="form-group">
                                    <label>Название виджета</label>
                                    <input type="text" class="form-control" placeholder="Заголовок" v-model="title" maxlength="255">
                                </div>

                                <div class="form-group">
                                    <label>Ник на твиче</label>
                                    <input type="text" class="form-control" placeholder="Заголовок" v-model="nick_name">
                                </div>

                                <div class="form-group">
                                    <label>Музыка</label>
                                    <input class="form-control" type="file" id="file" ref="music" v-on:change="handleMusicUpload()">
                                </div>

                                <div class="form-group">
                                    <label>Картинка</label>
                                    <input type="file" class="form-control" id="image" ref="image" v-on:change="handleImageUpload()">
                                </div>

                                <label class="custom-control custom-checkbox">
                                    <span class="custom-control-label">Сабы</span>
                                    <input type="checkbox" class="custom-control-input" v-model="subscribe_handler" value="1">

                                </label>
                                <label class="custom-control custom-checkbox">
                                    <span class="custom-control-label">Подарочная подписка</span>
                                    <input type="checkbox" class="custom-control-input" v-model="subgift_handler" value="1">

                                </label>

                                <label class="custom-control custom-checkbox">
                                    <span class="custom-control-label">Донаты</span>
                                    <input type="checkbox" class="custom-control-input" v-model="donation_handler" value="1">
                                </label>

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

    export default {
        data() {
            return {
                nick_name: '',
                donation_handler: false,
                subscribe_handler: false,
                subgift_handler: false
            }
        },
        computed: {
            loading: function () {
                return this.$store.state.smartWidget.loading;
            },
            title: {
                get(){
                    return this.$store.state.smartWidget.element.title;
                },
                set(title){
                    this.$store.commit('updateElement', {title: title})
                }
            },
            nick_name: {
                get(){
                    return this.$store.state.smartWidget.element.nick_name;
                },
                set(nick_name){
                    this.$store.commit('updateElement', {nick_name: nick_name})
                }
            },
        },
        created() {
            this.$store.dispatch('smartWidget/edit', {id: this.$route.params.id});
        },
        methods: {
            submitForm(){

                const formData = new FormData();

                formData.append('title', this.title);
                formData.append('music', this.music);
                formData.append('image', this.image);
                formData.append('subscribe_handler', this.subscribe_handler);
                formData.append('donation_handler', this.donation_handler);
                formData.append('subgift_handler', this.subgift_handler);

                this.$store.dispatch('smartWidget/store', formData);
            },
            handleMusicUpload(){
                this.music = this.$refs.music.files[0];
            },
            handleImageUpload (){
                this.image = this.$refs.image.files[0];
            }
        }
    };
</script>
