<template>
    <header class="topbar">
        <nav class="navbar top-navbar navbar-expand-md navbar-light">
            <!-- ============================================================== -->
            <!-- Logo -->
            <!-- ============================================================== -->
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    <!-- Logo icon --><b>
                    <!--<i class="wi wi-sunset"></i>-->
                    <!-- Dark Logo icon -->
                    <!--<img src="https://via.placeholder.com/40" alt="homepage" class="dark-logo"/>-->
                     <!--Light Logo icon -->
                    <img src="../../../styles/addons/img/logo-small.png" alt="homepage" class="light-logo"/>
                </b>
                    <!--End Logo icon -->
                        <span class="light-logo-streamshard"></span>
            </a>
            </div>
            <!-- ============================================================== -->
            <!-- End Logo -->
            <!-- ============================================================== -->
            <div class="navbar-collapse">
                <!-- ============================================================== -->
                <!-- toggle and nav items -->
                <!-- ============================================================== -->
                <ul class="navbar-nav mr-auto">
                    <!-- This is  -->
                    <li class="nav-item"><a class="nav-link nav-toggler hidden-md-up waves-effect waves-dark"
                                            href="javascript:void(0)"><i class="ti-menu"></i></a></li>
                    <li class="nav-item"><a class="nav-link sidebartoggler hidden-sm-down waves-effect waves-dark"
                                            href="javascript:void(0)"><i class="ti-menu"></i></a></li>
                    <li class="nav-item hidden-sm-down"></li>
                </ul>
                <!-- ============================================================== -->
                <!-- User profile and search -->
                <!-- ============================================================== -->
                <ul class="navbar-nav my-lg-0">
                    <!-- ============================================================== -->
                    <!-- Search -->
                    <!-- ============================================================== -->
                    <!--<li class="nav-item hidden-xs-down search-box"><a-->
                            <!--class="nav-link hidden-sm-down waves-effect waves-dark" href="javascript:void(0)"><i-->
                            <!--class="ti-search"></i></a>-->
                        <!--<form class="app-search">-->
                            <!--<input type="text" class="form-control" placeholder="Search & enter"> <a class="srh-btn"><i-->
                                <!--class="ti-close"></i></a></form>-->
                    <!--</li>-->
                    <!-- ============================================================== -->
                    <!-- Profile -->
                    <!-- ============================================================== -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle waves-effect waves-dark duck" href=""
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="/img/fuck-icon.svg"
                                 alt="user" class="profile-pic"/></a>
                        <div class="dropdown-menu dropdown-menu-right animated flipInY">
                            <ul class="dropdown-user">
                                <li>
                                    <div class="dw-user-box">
                                        <div class="u-img"><img src="/img/fuck-icon.svg" alt="user"></div>
                                        <div class="u-text">
                                                <h4>{{user.email}}</h4>
                                            <!--<p class="text-muted">varun@gmail.com</p><a href="#"-->
                                                                                        <!--class="btn btn-rounded btn-danger btn-sm">View-->
                                            <!--Profile</a>-->
                                            </div>
                                    </div>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <router-link tag="a" :to="{name: 'login'}"><i class="fa fa-power-off"></i> Logout</router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        computed: {
            user: function () {
                return this.$store.state.authentication.user;
            }
        },
    };
</script>