<template>
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in Pages.scss -->
    <!-- ============================================================== -->
    <section id="wrapper">
        <div class="login-register">
            <div class="login-box card">
                <div class="card-body">
                    <transition name="fade">
                        <div v-if="alert.message" :class="'alert ' + alert.type">{{alert.message}}</div>
                    </transition>
                    <form class="form-horizontal form-material" id="loginform" @submit.prevent="handleSubmit">
                        <h3 class="box-title text-center m-b-20">Регистрация</h3>
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <input class="form-control" type="text" v-model="email" required="" placeholder="Почт@">
                            </div>
                        </div>
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <input class="form-control" type="password" v-model="password" required=""
                                       placeholder="Самый секретный пароль">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input class="form-control" type="password" v-model="passwordConfirm" required=""
                                       placeholder="Пароль повторно">
                            </div>
                        </div>
                        <div class="form-group text-center p-b-20">
                            <div class="col-xs-12">
                                <button class="btn btn-info btn-lg btn-block btn-rounded text-uppercase waves-effect waves-light"
                                        type="submit">Yap!
                                </button>
                            </div>
                        </div>
                        <div class="form-group m-b-0">
                            <div class="col-sm-12 text-center">
                                Уже есть аккаунт <router-link tag="a" to="{name:'login'}" class="text-info m-l-5">
                                <b>тогда заходи</b></router-link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                passwordConfirm: '',
                submitted: false
            }
        },
        computed:{
            alert(){
                //Todo допилить ответы от сервера с вализацией
                return this.$store.state.alert
            }
        },
        created() {
            $(document.body).removeClass();
            $(document.body).addClass("card-no-border");
            $(function () {
                $(".preloader").fadeOut();
            });
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            });
            // ==============================================================
            // Login and Recover Password
            // ==============================================================
            $('#to-recover').on("click", function () {
                $("#loginform").slideUp();
                $("#recoverform").fadeIn();
            });
        },
        methods: {
            handleSubmit(e) {
                if (this.password === this.passwordConfirm) {
                    this.submitted = true;
                    const {email, password} = this;
                    const {dispatch} = this.$store;
                    if (email && password) {
                        dispatch('authentication/signUp', {email, password});
                    }
                } else {
                    alert("Пароли не совпадают");
                }
            }
        }
    }
</script>
