import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';
import { settings } from './settings.module';
import { overlay } from './overlay.module';
import { boss } from './boss.module';
import { smartWidget } from './smartWidget.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        users,
        overlay,
        settings,
        boss,
        smartWidget,
    }
});
