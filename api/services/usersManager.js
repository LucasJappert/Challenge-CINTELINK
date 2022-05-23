const Log = require('../utils/log');
const DataManager = require("./dataManager");


var usersOn = {};
class UserSocket {
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
        //console.log(json);
        if(json.receivedNotificationId){
            let noti = this.user?.notifications[json.receivedNotificationId];
            noti.ReceivedDate = new Date();
            //TODO: Agregar a tabla NOtificationUser
        }
        //TODO: procesar el mensaje
    }
    CheckNotifications(){
        //console.log(this.user?.notifications);
        Object.keys(this.user?.notifications).forEach(key => {
            let noti = this.user?.notifications[key];
            if (noti.SendingDate == null){
                this.SendMessageAsync({ newNotification: noti}, (e) => console.log(e) );
                noti.SendingDate = new Date();
                noti.ReceivedDate = null;
            }
        });
    }
    SendNotification(){

    }
    SetUser(user){
        this.user = user;
        if (this.user == null) return;

        this.user.tags = DataManager.GetUserTags(this.user.Id);
        this.user.notifications = DataManager.GetUserNotifications(this.user.tags);
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
    //TODO: Borra cuando esté listo el login
    usersOn[socket.id].SetUser(DataManager.GetUser(1));
}

module.exports.Remove = (socket) => {
    if (socket == null) return;

    console.log(`Alquien se ha desconectado, id: ${socket.id}`);
    delete usersOn[socket.id];
}

module.exports.GetAll = () => {
    return usersOn;
}


