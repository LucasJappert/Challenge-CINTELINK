const Log = require('../utils/log');
const CacheData = require("./cacheData");


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
        console.log(json);
        //TODO: procesar el mensaje
    }
    CheckNotifications(){
        //console.log(this.user?.notifications);
        for (let i = 0; i < this.user?.notifications.length; i++) {
            const noti = this.user?.notifications[i];
            if (noti.SendingDate == null){
                this.SendMessageAsync(noti);
                noti.SendingDate = new Date();
                // noti.SendingDate();
            }
        }
    }
    SetUser(user){
        this.user = user;
        this.SetNotifications();
    }
    SetNotifications(){
        if (this.user == null) return;

        CacheData.SetUserNotifications(this.user);
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
    usersOn[socket.id].SetUser(CacheData.GetUser(1));
}

module.exports.Remove = (socket) => {
    if (socket == null) return;

    console.log(`Alquien se ha desconectado, id: ${socket.id}`);
    delete usersOn[socket.id];
}

module.exports.GetAll = () => {
    return usersOn;
}


