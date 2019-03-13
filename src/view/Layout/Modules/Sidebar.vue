<template>
    <aside class="left-sidebar">
        <div class="scroll-sidebar">
            <nav class="sidebar-nav">
                <ul id="sidebarnav">
                    <li>
                        <router-link :to="{ name: 'dashboard'}" tag="a">
                            <i class="mdi mdi-view-dashboard">
                            </i><span class="hide-menu">Панелька</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'overlays'}" tag="a">
                            <i class="mdi mdi-buffer">
                            </i><span class="hide-menu">Экраны</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="{ name: 'widgets'}" tag="a">
                            <i class="mdi mdi-buffer">
                            </i><span class="hide-menu">Смарт-виджеты</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="{ name: 'settings'}" tag="a">
                            <i class="mdi mdi-settings">
                            </i><span class="hide-menu">Настройки</span>
                        </router-link>
                    </li>

                </ul>
            </nav>
        </div>
        <!--<div class="sidebar-footer">
            &lt;!&ndash; item&ndash;&gt;<a href="" class="link" data-toggle="tooltip" title="Settings"><i class="ti-settings"></i></a>
            &lt;!&ndash; item&ndash;&gt;<a href="" class="link" data-toggle="tooltip" title="Email"><i class="mdi mdi-gmail"></i></a>
            &lt;!&ndash; item&ndash;&gt;<a href="" class="link" data-toggle="tooltip" title="Logout"><i class="mdi mdi-power"></i></a>
        </div>-->
    </aside>
</template>

<script>
    export default {
        name: "Sidebar"
    }
</script>

<style scoped>

</style>
