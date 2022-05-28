<template>
    <div>
        <Header></Header>
        <div class="tableContainer" v-if="$store.getters['notifications/showAllNotifications']">
            <br /><br />
            <div class="Titulo1">
                - Estas son todas tus notificaciones:
                <span class="fa fa-times btnIcon Close" @click="$store.dispatch('notifications/invertShowAllNotifications')"></span>
            </div>
            <div class="row header rowNotification">
                <div>#</div>
                <div>TagId</div>
                <div>Mensaje</div>
                <div>Fecha leída</div>
                <div></div>
            </div>
            <div class="row rowNotification" v-for="noti in getSortedNotifications" :key="noti.Id">
                <div>{{ noti.Id }}</div>
                <div>{{ noti.IdTag }}</div>
                <div>{{ noti.Message }}</div>
                <div>{{ GetDDMMYYYYHHMMSSFormat(noti.ReadingDate) }}</div>
                <div class="aliCenter">
                    <i class="fa fa-trash" @click="DeleteNotificationUserAsync(noti)"></i>
                </div>
            </div>
        </div>

        <div class="tableContainer">
            <br /><br />
            <div class="Titulo1">- Estas son todas las secciones existentes (tags):</div>
            <div class="row header rowTag">
                <div>IdTag</div>
                <div>Nombre</div>
                <div class="aliCenter"></div>
            </div>
            <div class="row rowTag" v-for="tag in getSortedTags" :key="tag.Id">
                <div>{{ tag.Id }}</div>
                <div>{{ tag.Name }}</div>
                <div class="aliCenter" @click="SubscriptionTagClick(tag.Id)">{{ getTextOption(tag.Id) }}</div>
            </div>
            <!-- <div class="row" v-for="noti in getSortedNotifications" :key="noti.Id">
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
import api from '../services/api.service';
export default {
    data() {
        return {
        };
    },
    async created() {
        if (this.GetLoggedUser() == null) {
            this.$router.push({ name: "Login" });
            return;
        }
        await SocketioService.SetupSocketConnection(this.loggedUser);

        // this.myNotifications = await api.GetNotifications(this.getUserId);
        let result = await api.GetNotifications(this.getUserId);
        this.$store.dispatch("notifications/setNotifications", result);

        let tags = await api.GetTags();
        this.$store.dispatch("tags/setTags", tags);

        let myTags = await api.GetMyTags(this.getUserId);
        this.$store.dispatch("tags/setMyTags", myTags);
    },
    async mounted() {

        SocketioService.socket.on("message", (data) => {
            if (data.message != null) { console.log(data); }

            if (data.newConnection != null) {
                SocketioService.SendMessage({ loggedUser: this.loggedUser });
                //await SocketioService.SetupSocketConnection(this.loggedUser);
            }

            if (data.newNotification != null) {
                this.$store.dispatch("notifications/addNotification", data.newNotification);
            }
            if (data.notificationUserRemoved != null) {
                console.log("Notificación eliminada!", data.notificationUserRemoved);
                this.$store.dispatch("notifications/removeNotification", data.notificationUserRemoved);
            }
        });
    },
    methods:{
        GetDDMMYYYYHHMMSSFormat(date){
            if (date == null) return "";
            return date.toDDMMYYYYHHMMSS();
        },
        async DeleteNotificationUserAsync(noti){
            let result = await api.DeleteNotificationUserAsync(noti.IdNotiUser);
            console.log(result); //La notificación se eliminará de la vista a traves de un mensaje por socket
        },
        getTextOption(tagId){
            if (this.getMyTags.find(e => e.IdTag == tagId)){
                return "Suscripto!!! Click para desubscribirse...";
            }
            return "Click para subscribirse!";
        },
        async SubscriptionTagClick(tagId){
            let myTags = await api.UpdateSubscriptionTag(this.getUserId, tagId);
            this.$store.dispatch("tags/setMyTags", myTags);
        }
    },
    computed: {
        getSortedNotifications(){
            return this.$store.getters["notifications/getNotifications"]
                .sort((a, b) => a.Id - b.Id).reverse();
        },
        getSortedTags(){
            return this.$store.getters["tags/getTags"]
                .sort((a, b) => a.Id - b.Id);
        },
        getMyTags(){
            return this.$store.getters["tags/getMyTags"];
        },
    },
    beforeUnmount() {
        SocketioService.Disconnect();
    },
};
</script>

<style>
</style>
