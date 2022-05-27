<template>
    <div>
        <header>
            <router-link class="fa fasLeft fa-arrow-circle-left" :to="{ name: 'Login' }"></router-link>
            <div class="divNickName">{{ getNickName }}</div>

            <div class="notBtn" v-if="!rolAdmin">
                <div class="number unreadNotifications" v-if="unreadNotifications.length > 0">
                    {{ unreadNotifications.length }}
                </div>
                <i class="fas fa-bell"></i>
                <div class="box">
                    <div class="notificationsList" v-if="getNotifications.length > 0" >
                        <div @click="showAllNotifications = true" class="seeAll" >
                            Ver todas
                        </div>
                        <div v-for="noti in getNotifications" :key="noti.Id" class="sec" >
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
export default {
    name: "Header",

};
</script>

<style>
</style>
