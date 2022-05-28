const Log = require('../utils/log');
const DataManager = require("./dataManager");
const EventEmitter = require("../helpers/eventEmitter");


var usersOn = {};
class UserSocket {
    user;
    socket;
    socket;
    constructor(socket) {
        this.user = null;
        this.socket = socket;
        this.socket.on("message", (data) => {
            this.ProcessMessageAsync(data);
        });
        this.SendMessageAsync({
            message: `Hola ${socket.id}!`,
            newConnection: socket.id
         });

         //TODO Sacar el obj de export y pasar como parámetro la función y eventype
        EventEmitter.obj.on(EventEmitter.EventTypes.SendNotificationToOnlineUser, (newNoti) => {
            this.SendNotificationToOnlineUserEvent(newNoti)
        });
        //TODO Sacar el obj de export y pasar como parámetro la función y eventype
        EventEmitter.obj.on(EventEmitter.EventTypes.NotificationUserRemoved, (notiUser) => {
            this.EventNotificationUserRemoved(notiUser)
        });

    }

    async SendMessageAsync(json) {
        this.socket.emit("message", json);
    }
    //TODO: Ver de hacer privado
    async ProcessMessageAsync(json) {
        if(json.message != null){
            console.error(json.message);
        }
        if(json.updateReadingDateIdNotiUser != null){
            const idNotiUser = json.updateReadingDateIdNotiUser;
            if(this.user == null) return;

            await DataManager.ChangeReadingDateOfANotificationAsync(idNotiUser);
            let updatedNoti = DataManager.GetNotificationModelFromIdNotiUser(idNotiUser);
            this.SendMessageAsync({ newNotification: updatedNoti});
        }
        if(json.loggedUser != null){
            console.log(`Usuario logueado! ${json.loggedUser.Id}`);
            this.Initialize(DataManager.GetUser(json.loggedUser.Id));
        }
    }
    Initialize(user){
        this.user = user;
        if (this.user == null) return;

        this.user.tags = DataManager.GetUserTagsId(this.user.Id);//TODO: Eliminar
    }
    SendNotificationToOnlineUserEvent(newNoti){
        if (this.user == null) {//Should't happen
            this.socket.disconnect();
            return;
        }
        const tagsId = DataManager.GetUserTagsId(this.user.Id);
        if (tagsId.includes(newNoti.IdTag)){
            this.SendMessageAsync({ newNotification: newNoti});
        }
    }
    EventNotificationUserRemoved(notiUser){
        if (this.user == null) {//Should't happen
            this.socket.disconnect();
            return;
        }
        if (this.user.Id == notiUser.IdUser){
            this.SendMessageAsync({ notificationUserRemoved: notiUser});
        }
    }

}



module.exports.Add = async (socket) => {
    if (socket == null) return;

    Log.Blue(`Alguien se ha conectado, id: ${socket.id}`);

    usersOn[socket.id] = new UserSocket(socket);
}

module.exports.Remove = (socket) => {
    if (socket == null) return;

    console.log(`Alquien se ha desconectado, id: ${socket.id}`);
    delete usersOn[socket.id];
}

module.exports.GetAll = () => {
    return usersOn;
}


