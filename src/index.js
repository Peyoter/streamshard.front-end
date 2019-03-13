import "@babel/polyfill";

import "./styles/assets/plugins/bootstrap/js/bootstrap.min.js";
import "./styles/assets/plugins/bootstrap/js/popper.min.js";

import "./styles/dark/js/perfect-scrollbar.jquery.min.js";
import "./styles/dark/js/waves.js";
import "./styles/dark/js/sidebarmenu.js";
import "./styles/dark/js/custom.min.js";
import  'jrumble';


import Vue from 'vue';
import {store} from './_store';
import {router} from './_helpers';
import App from './view/App';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

Vue.component('vue-draggable-resizable', VueDraggableResizable);

import "./styles/assets/plugins/bootstrap/css/bootstrap.min.css";
import "./styles/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
import "./styles/assets/plugins/toast-master/css/jquery.toast.css";
import "./styles/dark/css/pages/login-register-lock.css";
import "./styles/dark/scss/style.scss";
import "./styles/dark/css/colors/blue-dark.css";
import "./styles/addons/style.scss";

