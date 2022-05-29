const Log = require('../utils/log');
const CacheManager = require("./cacheManager");
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
            this.#ProcessMessageAsync(data);
        });
        this.#SendMessageAsync({
            message: `Hola ${socket.id}!`,
            newConnection: socket.id
         });

        EventEmitter.obj.on(EventEmitter.EventTypes.SendNotificationToOnlineUser, (newNoti) => {
            this.#SendNotificationToOnlineUserEvent(newNoti)
        });
        EventEmitter.obj.on(EventEmitter.EventTypes.NotificationUserRemoved, (notiUser) => {
            this.#EventNotificationUserRemoved(notiUser)
        });

    }

    async #SendMessageAsync(json) {
        this.socket.emit("message", json);
    }
    async #ProcessMessageAsync(json) {
        if(json.message != null){
            console.error(json.message);
        }
        if(json.updateReadingDateIdNotiUser != null){
            const idNotiUser = json.updateReadingDateIdNotiUser;
            if(this.user == null) return;

            await CacheManager.ChangeReadingDateOfANotificationAsync(idNotiUser);
            let updatedNoti = CacheManager.GetNotificationModelFromIdNotiUser(idNotiUser);
            this.#SendMessageAsync({ newNotification: updatedNoti});
        }
        if(json.loggedUser != null){
            console.log(`Usuario logueado! ${json.loggedUser.Id}`);
            this.Initialize(CacheManager.GetUser(json.loggedUser.Id));
        }
    }
    Initialize(user){
        this.user = user;
        if (this.user == null) return;
    }
    #SendNotificationToOnlineUserEvent(newNoti){
        if (this.user == null) {//Should't happen
            this.socket.disconnect();
            return;
        }
        const tagsId = CacheManager.GetUserTagsId(this.user.Id);
        if (tagsId.includes(newNoti.IdTag)){
            this.#SendMessageAsync({ newNotification: newNoti});
        }
    }
    #EventNotificationUserRemoved(notiUser){
        if (this.user == null) {//Should't happen
            this.socket.disconnect();
            return;
        }
        if (this.user.Id == notiUser.IdUser){
            this.#SendMessageAsync({ notificationUserRemoved: notiUser});
        }
    }

}



module.exports.Add = (socket) => {
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


