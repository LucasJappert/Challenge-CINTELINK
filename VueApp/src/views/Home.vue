<template>
    <div>
        <header>
            <div class="icons">
                <div class="notification">
                    <a href="#">
                        <div class="notBtn" href="#">
                            <div class="number unreadNotifications">
                                {{ unreadNotifications }}
                            </div>
                            <i class="fas fa-bell"></i>
                            <div class="box">
                                <div
                                    class="notificationsList"
                                    v-if="notifications.length > 0"
                                >
                                    <div
                                        onclick="ShowAllNotificationsHTML()"
                                        class="seeAll"
                                    >
                                        Ver todas
                                    </div>
                                    <div
                                        v-for="noti in notifications"
                                        :key="noti.Id"
                                        class="sec"
                                    >
                                        <div
                                            onclick="ChangeNotificationMark(${notification.Id})"
                                            class="
                                                readNotificacionMark
                                                ${notification.ReadingDate
                                                !=null
                                                ?
                                                'read'
                                                :
                                                ''}
                                            "
                                        ></div>
                                        <div class="txt">
                                            {{ noti.Message }}
                                        </div>
                                        <div class="txt sub">
                                            {{
                                                new Date(
                                                    noti.CreationDate
                                                ).toLocaleDateString("en-GB")
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </header>

        <br /><br />
        <div class="containerAllNotifications tableContainer"></div>

        <div class="tableContainer mT20" hidden>
            <div class="row">
                <div>#</div>
                <div>Mensaje</div>
                <div>IdTag</div>
                <div>Fecha de envío</div>
                <div>Opciones</div>
            </div>
            <div class="row">
                <div>#</div>
                <div>IdTag</div>
                <div></div>
                <div></div>
                <div>
                    <i class="fa fa-plus-circle"></i>
                    <i class="fa fa-edit"></i>
                    <i class="fa fa-trash"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SocketioService from '../services/socketio.service';
export default {
    data() {
        return {
            notifications: {},
        };
    },
    created() {
        SocketioService.setupSocketConnection();
    },
    mounted() {
        if (this.GetLoggedUser() == null) {
            this.$router.push({ name: "Login" });
            return;
        }
    },
    beforeUnmount() {
        SocketioService.disconnect();
    },
    computed: {
        unreadNotifications() {
            return Object.values(this.notifications).map(
                (e) => e.ReadingDate == null
            ).length;
        },
    },
};
</script>

<style>
</style>
