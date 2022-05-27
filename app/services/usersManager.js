const Log = require('../utils/log');
const DataManager = require("./dataManager");
const EventEmitter = require("../helpers/eventEmitter");


var usersOn = {};
class UserSocket {
    user;
    socket;
    socket;
    //TODO: eliminar usuarios huérfanos.
    // Pasa cuando reseteamos el server y se conectan los sockets clientes logueados
    constructor(socket) {
        this.user = null;
        this.socket = socket;
        this.socket.on("message", (data) => {
            this.ProcessMessageAsync(data);
        });
        this.SendMessageAsync({ message: `Hola ${socket.id}!` });

        // EventEmitter.obj.on(EventEmitter.EventTypes.newNotification, (newNoti) => {
        //     //TODO: Chequear que
        //     //this.NewNotification(newNoti)
        // });
    }

    async SendMessageAsync(json) {
        this.socket.emit("message", json, (e) => console.log(e));
    }
    //TODO: Ver de hacer privado
    async ProcessMessageAsync(json) {
        if(json.message != null){
            console.log(json.message);
        }
        if(json.updateReadingDateNotificationId != null){
            const notiId = json.updateReadingDateNotificationId
            if(this.user == null) return;

            let newNoti = await DataManager.GetNotificationByUser(this.user.Id, notiId);

            if (newNoti == null) return;//Should not happen

            if (newNoti.ReadingDate == null) newNoti.ReadingDate = new Date();
            else newNoti.ReadingDate = null;
            await DataManager.UpdateNotificationUserAsync(this.user.Id, newNoti.Id, newNoti.ReadingDate);
            this.SendMessageAsync({ newNotification: newNoti});
        }
        if(json.loggedUser != null){
            console.log(`Usuario logueado! ${json.loggedUser.Id}`);
            this.Initialize(DataManager.GetUser(json.loggedUser.Id));
        }
    }
    Initialize(user){
        this.user = user;
        if (this.user == null) return;

        this.user.tags = DataManager.GetUserTags(this.user.Id);//TODO: Eliminar
    }
    NewNotification(newNoti){
        if (this.user == null) {
            this.socket.disconnect();
            return;
        }
        const tagsId = DataManager.GetUserTags(this.user.Id);
        if (tagsId.includes(newNoti.IdTag)){
            this.SendMessageAsync({ newNotification: newNoti});
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


