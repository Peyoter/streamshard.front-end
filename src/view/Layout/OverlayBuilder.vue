<template>
    <transition name="fade">
        <div class="overlay-builder" v-if="!boss.loading">
            <OverlayHeader/>
            <BossSidebar/>
            <vue-draggable-resizable @dragstop="onDragStop" @resizestop="onResize" :x="boss.x" :y="boss.y"
                                     :w="boss.width" :h="boss.height">
                <div v-bind:class="['boss-overlay']">
                    <Boss/>
                </div>
            </vue-draggable-resizable>
        </div>
    </transition>
</template>

<script>
    import BossSidebar from "./Modules/BossSidebar";
    import OverlayHeader from "./Modules/OverlayHeader";
    import VueDraggableResizable from "vue-draggable-resizable";
    import Boss from "../Widjets/Visual/Boss";

    export default {
        components: {
            OverlayHeader,
            BossSidebar,
            VueDraggableResizable,
            Boss
        },
        data() {
            return {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            }
        },
        computed: {
            boss: function () {
                return this.$store.state.boss.boss;
            }
        },
        methods: {
            onResize: function (x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.$store.commit('boss/updateAll', {x: x, y: y, width: width, height: height});
            },
            onDragStop: function (x, y) {
                this.x = x;
                this.y = y;
                this.$store.commit('boss/updateAll', {x: x, y: y});
            }
        },
        created() {
            this.$store.dispatch('boss/getCurrent');
        },
    }
</script>
