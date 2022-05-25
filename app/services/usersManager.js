const Log = require('../utils/log');
const DataManager = require("./dataManager");


var usersOn = {};
class UserSocket {
    user;
    socket;
    notifications;
    socket;
    constructor(socket) {
        this.user = null;
        this.socket = socket;
        this.notifications = {};
        this.socket.on("message", (data) => {
            this.ProcessMessageAsync(data);
        });
        this.SendMessageAsync({ message: `Hola ${socket.id}!` });
    }

    async SendMessageAsync(json) {
        this.socket.emit("message", json);
    }
    //TODO: Ver de hacer privado
    async ProcessMessageAsync(json) {
        if(json.message != null){
            console.log(json.message);
        }
        if(json.updateReadingDateNotificationId != null){
            let noti = this.user?.notifications[json.updateReadingDateNotificationId];
            if (noti == null) return;//Should not happen

            if (noti.ReadingDate == null)
                noti.ReadingDate = new Date();
            else
                noti.ReadingDate = null;

            DataManager.SaveNotificationUserAsync(noti, this.user.Id);
            this.SendMessageAsync({ newNotification: noti}, (e) => console.log(e) );
        }
        if(json.loggedUser != null){
            console.log(`Usuario logueado! ${json.loggedUser.Id}`);
            usersOn[this.socket.id].InitialSettings(DataManager.GetUser(json.loggedUser.Id));
        }
    }
    CheckNotifications(){
        if (this.user?.notifications == null) return;

        Object.keys(this.user?.notifications).forEach(key => {
            let noti = this.user?.notifications[key];
            if (noti.SentDate == null){
                this.SendMessageAsync({ newNotification: noti}, (e) => console.log(e) );
                noti.SentDate = new Date();
                noti.ReceivedDate = null;
                DataManager.SaveNotificationUserAsync(noti, this.user.Id);
            }
        });
    }
    InitialSettings(user){
        this.user = user;
        if (this.user == null) return;

        this.user.tags = DataManager.GetUserTags(this.user.Id);
        this.user.notifications = DataManager.GetUserNotifications(this.user.tags, this.user.Id);
        this.SendMessageAsync({ notifications: this.user.notifications}, (e) => console.log(e) );
    }

}
module.exports.CheckNotifications = async () => {
    Object.keys(usersOn).forEach(key => {
        usersOn[key]?.CheckNotifications();
    });
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


