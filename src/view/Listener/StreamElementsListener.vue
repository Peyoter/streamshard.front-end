<template>
    <div>
        {{settings}}
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import config from 'config';
    import Ws from 'socket.io-client';

    import axios from 'axios';

    export default {
        computed: {
            settings: function () {
                return this.$store.state.settings.parameters;
            },
        },
        created() {
            this.$store.dispatch('settings/getCurrent');
        },
        watch: {
            settings(newValue) {
                // Сделать проверку на integer
                if(newValue.user_id)
                {

                }
            }
        }
    };

    function nonce(length) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

</script>
