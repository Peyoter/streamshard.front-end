<template>
    <transition name="fade">
        <div class="overlay-builder" v-if="!boss.loading">
            <div class="boss-export-wrapper"
                 v-bind:style="{width:boss.width + 'px', height:boss.height + 'px', top:boss.y - 70 + 'px', left:boss.x - 350 + 'px'}">
                <div v-bind:class="['boss-overlay']">
                    <Boss/>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BossSidebar from "../Modules/BossSidebar";
    import OverlayHeader from "../Modules/OverlayHeader";
    import VueDraggableResizable from "vue-draggable-resizable";
    import Boss from "../../Widjets/Visual/Boss";

    export default {
        components: {
            Boss
        },
        computed: {
            boss: function () {
                return this.$store.state.boss.boss;
            }
        },
        created() {
            const slug = this.$router.currentRoute.params.slug;
            this.$store.dispatch('boss/getByCode', {slug: slug});
        },
    }
</script>


<style>
    #main-wrapper{
        background: rgba(0, 0, 0, 0) !important;
    }
    html, body { background-color: rgba(0, 0, 0, 0) !important;}
</style>
