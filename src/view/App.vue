<template>

    <div id="main-wrapper">

        <div class="preloader"  v-if="boss.loading" >
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label"></p>
            </div>
        </div>

        <router-view name="globalPage"></router-view>
    </div>
</template>

<script>
    export default {
        computed: {
            alert() {
                return this.$store.state.alert
            },
            boss() {
                return this.$store.state.boss.boss
            }
        },
        watch: {
            $route(to, from) {
            }
        },
        onUpdate() {
//            console.log(this.alert);
        }
    };
</script>
