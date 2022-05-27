<template>
    <div>
        <Header></Header>

        <div class="tableContainer">
            <br />
            <div class="Titulo1">
                - Listado notificaciones:
            </div>
            <div>
                <input type="text" value="asd" v-model="newNotification.Message">
                <input type="datetime-local" value="asd" v-model="newNotification.DateToSend">
                <select id="country" name="country" v-model="newNotification.IdTag">
                    <option :value="tag.Id" v-for="tag in getTags" :key="tag.Id">
                        {{ tag.Id }} - {{ tag.Name }}
                    </option>
                </select>
                <span class="fa fa-plus btnIcon Add" @click="AddNotificationAsync()"></span>
            </div>
            <div class="row header rowAdminNotification">
                <div>#</div>
                <div>TagId</div>
                <div>Mensaje</div>
                <div>Fecha a enviar</div>
                <div></div>
            </div>
            <div class="row rowAdminNotification" v-for="noti in getNotifications" :key="noti.Id">
                <div>{{ noti.Id }}</div>
                <div>{{ noti.IdTag }}</div>
                <div>{{ noti.Message }}</div>
                <div>{{ noti.DateToSend.toDDMMYYYYHHMMSS() }}</div>
                <div class="aliCenter">
                    <!-- TODO: mostrar solamente si la notificación aún no se envió -->
                    <i class="fa fa-trash" @click="RemoveNotificationAsync(noti.Id)"></i>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import api from '../services/api.service';
export default {
    data(){
        return{
            notifications: [],
            tags:[],
            newNotification: {
                Message: "",
                DateToSend: null,
                IdTag: 1,
                Title: ""
            }
        }
    },
    async created(){
        this.notifications = await api.GetAllNotifications();
        this.tags = await api.GetTags();
    },
    methods:{
        async AddNotificationAsync() {
            if (this.newNotification.DateToSend == null){
                alert("Debes seleccionar una fecha válida");
                return;
            }
            // console.log(this.newNotification.DateToSend); return;
            let result = await api.CreateNotification(this.newNotification);
            if (result != null){
                this.notifications.push(result);
                this.resetNewNotification();
            }
        },
        async RemoveNotificationAsync(idNotification){
            let result = await api.DeleteNotification(idNotification);
            if(result)
                this.notifications = this.notifications.filter(item => item.Id != idNotification);
        },
        resetNewNotification(){
            this.newNotification.Message = "";
            this.newNotification.DateToSend = null;
            this.newNotification.IdTag = 1;
            this.newNotification.Title = "";
        }
    },
    computed:{
        getNotifications(){
            return this.notifications.sort((a, b) => a.DateToSend - b.DateToSend).reverse();
        },
        getTags(){
            return this.tags.sort((a, b) => a.Id - b.Id);
        },
    }
};
</script>

<style scoped>
    .rowAdminNotification{ grid-template-columns: 0.3fr 0.5fr 35% 1.1fr 0.7fr; }
</style>
