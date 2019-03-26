import Vue from 'vue';
import Router from 'vue-router';

import SignInPage from '../view/Login/SignUpPage';
import LoginPage from '../view/Login/LoginPage';
import Dashboard from '../view/Layout/Pages/Dashboard';
import Settings from '../view/Layout/Pages/Settings';
import Admin from "../view/Layout/Admin";
import Overlays from "../view/Layout/Pages/Overlays";
import OverlayBuilder from "../view/Layout/OverlayBuilder";
import OverlayExport from "../view/Layout/Pages/OverlayExport";
import Widgets from "../view/Layout/Pages/Widgets";
import WidgetsForm from "../view/Layout/Pages/WidgetsForm";
import WidgetsFormCreate from "../view/Layout/Pages/WidgetsСreate";
import SmartWidgetAll from "../view/Widjets/Visual/SmartWidgetAll";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            components: {globalPage: Admin},
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    components: {adminContent: Dashboard},
                },
                {
                    path: '/settings',
                    name: 'settings',
                    components: {
                        adminContent: Settings
                    },
                },
                {
                    path: '/overlays',
                    name: 'overlays',
                    components: {
                        adminContent: Overlays
                    },
                },
                {
                    path: '/widgets',
                    name: 'widgets',
                    components: {
                        adminContent: Widgets
                    },
                },
                {
                    path: '/widgets-edit-:id-',
                    name: 'widgets.edit',
                    components: {
                        adminContent: WidgetsForm
                    },
                },
                {
                    path: '/widgets-create', components: {adminContent: WidgetsFormCreate}, name: 'widgets.create'
                },
            ]
        },
        {path: '/overlay-builder-:slug', components: {globalPage: OverlayBuilder}, name: 'overlay-builder'},
        {path: '/overlay-export-:slug', components: {globalPage: OverlayExport}, name: 'overlay-export'},
        {path: '/widgets-obs-all-:user_id', name: 'widgets.obs', components: {globalPage: SmartWidgetAll}},
        {path: '/login', components: {globalPage: LoginPage}, name: 'login'},
        {path: '/signup', components: {globalPage: SignInPage}, name: 'signup'},

        // otherwise redirect to home
        {path: '*', redirect: '/'}
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to Login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/signup', '/overlay-export-.*', '/widgets-obs-.*', '/widgets-obs-.*'];
    const loggedIn = localStorage.getItem('user');

    let route = to.path.toLocaleLowerCase();

    let result = publicPages.reduce((a, b) =>
        a === true || (a !== false && !!route.match(RegExp(a))) || !!route.match(RegExp(b))
    );


    if (!result && !loggedIn) {
        return next('/login');
    }

    next();
});
