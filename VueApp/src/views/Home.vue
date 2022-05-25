<template>
    <div>
        <header>
            <router-link class="fa fasLeft fa-arrow-circle-left" :to="{ name: 'Login' }"></router-link>
            <div class="divNickName">{{ getNickName }}</div>
            <div class="notBtn">
                <div class="number unreadNotifications">
                    {{ unreadNotifications.length }}
                </div>
                <i class="fas fa-bell"></i>
                <div class="box">
                    <div class="notificationsList" v-if="getNotifications.length > 0" >
                        <div @click="ShowAllNotifications()" class="seeAll" >
                            Ver todas
                        </div>
                        <div v-for="noti in getNotifications" :key="noti.Id" class="sec" >
                            <div @click="ChangeNotificationMark(noti.Id)" :class="GetCssClassNotificationState(noti)"></div>
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

        <div class="tableContainer" v-if="showAllNotifications">
            <br /><br />
            <div class="Titulo1">- Estas son todas tus notificaciones:</div>
            <div class="row header rowNotification">
                <div>#</div>
                <div>Mensaje</div>
                <div>IdTag</div>
                <div>Fecha recepción</div>
                <div></div>
            </div>
            <div class="row rowNotification" v-for="noti in getNotifications" :key="noti.Id">
                <div>{{noti.Id}}</div>
                <div>{{noti.Message}}</div>
                <div>{{noti.IdTag}}</div>
                <div>{{noti.SentDate.toDDMMYYYYHHMMSS()}}</div>
                <div class="aliCenter"><i class="fa fa-trash"></i></div>
            </div>
        </div>

        <div class="tableContainer">
            <br /><br />
            <div class="Titulo1">- Estas son todas las secciones existentes (tags):</div>
            <div class="row header rowTag">
                <div>IdTag</div>
                <div>Nombre</div>
                <div class="aliCenter"><i class="fa fa-trash"></i></div>
            </div>
            <!-- <div class="row" v-for="noti in getNotifications" :key="noti.Id">
                <div>{{noti.Id}}</div>
                <div>{{noti.Message}}</div>
                <div>{{noti.IdTag}}</div>
                <div>{{noti.SentDate.toDDMMYYYYHHMMSS()}}</div>
                <div class="aliCenter"><i class="fa fa-trash"></i></div>
            </div> -->
        </div>

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
            showAllNotifications: true
        };
    },
    async created() {
        if (this.GetLoggedUser() == null) {
            this.$router.push({ name: "Login" });
            return;
        }
        await SocketioService.SetupSocketConnection(this.GetLoggedUser());

        SocketioService.socket.on("message", (data) => {
            if (data.message != null) { console.log(data); }

            if (data.notifications != null) { this.notifications = data.notifications; }

            if (data.newNotification != null) { this.notifications[data.newNotification.Id] = data.newNotification; }
        });
    },
    mounted() {
        if (this.GetLoggedUser() == null) {
            this.$router.push({ name: "Login" });
            return;
        }
    },
    methods:{
        ChangeNotificationMark(notiId){
            SocketioService.SendMessage({ updateReadingDateNotificationId: notiId });
        },
        GetCssClassNotificationState(noti){
            return `readNotificacionMark ${noti.ReadingDate != null ? 'read' : ''}`;
        },
        ShowAllNotifications(){
            this.showAllNotifications = !this.showAllNotifications;
        }
    },
    computed: {
        unreadNotifications() {
            return Object.values(this.notifications).filter(noti => noti.ReadingDate == null);
        },
        getNotifications(){
            return Object.values(this.notifications).sort().reverse();
        },
        getNickName(){
            return this.GetLoggedUser().Nick;
        }
    },
    beforeUnmount() {
        SocketioService.Disconnect();
    },
};
</script>

<style>
.divNickName{
    margin-left: auto;
}

.tableContainer{
    width:100%;
    min-width:800px;
    background-color: rgba(255,255,255, 0.9);
    color: #222;
    padding:10px;
}
.row{
    display: grid;
    width:100%;
    line-height: 30px;
    padding: 5px;
    border-bottom: 1px solid rgba(0 0 0 / 20%);
}
.rowNotification{ grid-template-columns: 0.3fr 50% 0.3fr 1.7fr 0.5fr; }
.rowTag{  grid-template-columns: 0.5fr 2fr 0.5fr; }
.row:not(:first-child){
    cursor:pointer;
}
.row:hover:not(:first-child){
    background-color: rgba(0 0 0 / 10%);
}
.row.header{
    background-color: rgba(0 0 0 / 20%);
    border-bottom: 1px solid black;
}
.Titulo1{
    font-size: 1.1em;
    padding: 10px 0;
}
</style>
