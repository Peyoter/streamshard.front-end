<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-themecolor">Экраны</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <transition  name="fade" >
                        <div class="card" v-if="!overlay.loading">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h2 class="m-t-0">{{overlay.title}}</h2>
                                    </div>

                                    <div class="col-md-6 text-right">
                                        <router-link :to="{name: 'overlay-export', params: {slug:overlay.slug}}"
                                                     class="btn  btn-outline-info"><i class="fa fa-eye"></i>
                                        </router-link>
                                        <router-link class="btn  btn-outline-success"
                                                     :to="{ name: 'overlay-builder', params: { slug: overlay.slug }}"
                                                     tag="button"><i
                                                class="fa fa-cogs"></i>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="input-group m-t-10">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupPrepend2">OBS</span>
                                    </div>
                                    <input type="text" class="form-control"
                                           :value="'http://streamshard.ru/overlay-export-' + overlay.slug">
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState({
                overlay: state => {
                    return state.overlay.overlay;
                },
            })
        },
        created() {
            this.$store.dispatch('overlay/getCurrent');
        },
        methods: {}
    };
</script>
