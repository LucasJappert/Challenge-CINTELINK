<template>
    <div>
        <header>
            <router-link class="fa fasLeft fa-arrow-circle-left" :to="{ name: 'Login' }"></router-link>
            <div v-if="loggedUser != null" class="divNickName">{{ getNickName }}</div>

            <div class="notBtn" v-if="!rolAdmin">
                <div class="number unreadNotifications" v-if="unreadNotifications.length > 0">
                    {{ unreadNotifications.length }}
                </div>
                <i class="fas fa-bell"></i>
                <div class="box">
                    <div class="notificationsList" v-if="$store.getters['notifications/getNotifications'].length > 0" >
                        <div @click="$store.dispatch('notifications/invertShowAllNotifications')" class="seeAll" >
                            Ver todas
                        </div>
                        <div v-for="noti in getSortedNotifications" :key="noti.Id" class="sec" >
                            <div @click="UpdateNotificationMark(noti)" :class="GetCssClassNotificationState(noti)"></div>
                            <div class="txt">
                                {{ noti.Message }}
                            </div>
                            <div class="txt sub">
                                {{ new Date(noti.CreationDate).toLocaleDateString("en-GB") }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import SocketioService from '../services/socketio.service';
export default {
    name: "Header",
    methods:{
        UpdateNotificationMark(noti){
            SocketioService.SendMessage({ updateReadingDateIdNotiUser: noti.IdNotiUser });
        },
        GetCssClassNotificationState(noti){
            return `readNotificacionMark ${noti.ReadingDate != null ? 'read' : ''}`;
        },
    },
    computed: {
        getSortedNotifications(){
            return this.$store.getters["notifications/getNotifications"]
                .sort((a, b) => a.Id - b.Id).reverse();
        },
        unreadNotifications() {
            return this.$store.getters["notifications/getNotifications"]
            .filter(noti => noti.ReadingDate == null);
        },
    }
};
</script>

<style>
</style>
