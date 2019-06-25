<template>
    <div class="layout" :class="theme">
        <div class="layout__content">
            <div class="account">
                <div class="account__box">
                    <sidebar></sidebar>
                    <div class="account__content">
                        <div class="account__top-right">
                            <!--<div class="account__language">
                                <img src="/img/account/Bitmap.png" alt="">
                            </div>-->
                            <div class="account__name">
                                <p>{{user.username}} (<span class="account__logout" @click="logOut">{{$t('logOut')}}</span>)</p>
                            </div>
                        </div>
                        <slot></slot>
                    </div>
                </div>
                <player ref="player"></player>
            </div>
        </div>
        <forms></forms>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import Forms from '@/components/global/Modals/Modals';
import Player from '@/components/global/Player/Player';
import Sidebar from '@/components/global/Sidebar/Sidebar';

export default {
    name: "layout",
    components: {
        Forms,
        Player,
        Sidebar
    },
    computed: {
        ...mapState(['user', 'theme']),
    },
    methods: {
        logOut() {
            this.$store.dispatch('logout');
            this.$router.push('/');
        }
    }
}
</script>

<style>

</style>