<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-themecolor">Персональные виджеты</h3>
                    <div>
                        <router-link class="btn btn-info" :to="{name: 'widgets.create'}">
                            Создать новый виджет
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <transition name="fade">
                        <div class="card" v-if="!loading">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="">Cсылка для OBS</span>
                                <input type="text" class="form-control"
                                       :value="config.mainUrl + '/widgets-obs-all-' + user">
                            </div>
                            <table class="table table-responsive" style="vertical-align: top;">
                                <tr v-for="(item, key) in smartWidgets">
                                    <td>{{ ++key }}</td>
                                    <td>{{item.title}}</td>
                                    <td><img v-bind:src="config.apiUrl + '/' +item.image" alt="" style="height: 50px">
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupPrepend2">OBS</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-info m-t-5" v-on:click="play(item.id)"><span
                                                class="fa fa-play"></span></button>
                                        <router-link class="btn btn-sm btn-success m-t-5"
                                                     :to="{name:'widgets.edit', params:{id:item.id}}"><span
                                                class="fa fa-edit"></span></router-link>
                                        <button class="btn btn-sm btn-danger m-t-5" v-on:click="remove(item.id)"><span
                                                class="fa fa-times"></span></button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import config from 'config';
    import axios from 'axios';

    export default {
        computed: {
            config: function () {
                return config;
            },
            loading: function () {
                return this.$store.state.smartWidget.loading;
            },
            smartWidgets: function () {
                return this.$store.state.smartWidget.widgets;
            },
            user: {
                get() {
                    return this.$store.state.settings.parameters.user_id
                },
            }
        },
        created() {
            this.$store.dispatch('smartWidget/getAll');
            this.$store.dispatch('settings/getCurrent');
        },
        methods: {
            remove(id) {
                this.$store.dispatch('smartWidget/remove', {id: id});
            },

            play(id) {
                axios.post(config.apiUrl + '/smart_widgets/ping', {widget_id: id})
            }
        }
    };
</script>
