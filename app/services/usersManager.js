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
        this.SendMessageAsync({ message: `Hola ${socket.id}!` });

        EventEmitter.obj.on(EventEmitter.EventTypes.newNotification,
            (newNoti) => this.NewNotification(newNoti));
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
            // console.log(this.user?.notifications);
            // let noti = this.user?.notifications[json.updateReadingDateNotificationId];
            let newNoti = DataManager.GetNotificationByUser(this.user.Id, notiId)
            if (newNoti == null) return;//Should not happen

            if (newNoti.ReadingDate == null) newNoti.ReadingDate = new Date();
            else newNoti.ReadingDate = null;

            await DataManager.UpdateNotificationUserAsync(newNoti, this.user.Id);
            this.SendMessageAsync({ newNotification: newNoti});
        }
        if(json.loggedUser != null){
            console.log(`Usuario logueado! ${json.loggedUser.Id}`);
            // usersOn[this.socket.id].Initialize(DataManager.GetUser(json.loggedUser.Id));
            this.Initialize(DataManager.GetUser(json.loggedUser.Id));
        }
    }
    // CheckNotifications(){
    //     if (this.user?.notifications == null) return;

    //     Object.keys(this.user?.notifications).forEach(key => {
    //         let noti = this.user?.notifications[key];
    //         if (noti.Sent == null){
    //             noti.SentDate = new Date();
    //             this.SendMessageAsync({ newNotification: noti});
    //             DataManager.CreateNotificationUserAsync(noti, this.user.Id);
    //         }
    //     });
    // }
    Initialize(user){
        this.user = user;
        if (this.user == null) return;

        this.user.tags = DataManager.GetUserTags(this.user.Id);
        //this.user.notifications = DataManager.GetUserNotifications(this.user.tags, this.user.Id);
        //this.SendMessageAsync({ notifications: this.user.notifications });//TODO: hacer que se consulte por api
    }
    NewNotification(newNoti){
        if (this.user.tags.includes(newNoti.IdTag)){
            //this.user.notifications[newNoti.Id] = newNoti;
            this.SendMessageAsync({ newNotification: newNoti});
        }
        // this.user.notifications = DataManager.GetUserNotifications(this.user.tags, this.user.Id);
        // //Send only the unsent
        // let result = this.GetUnsentNotifications();

        // this.SendMessageAsync({ notifications: this.user.notifications });
    }

}




// module.exports.CheckNotifications = async () => {
//     Object.keys(usersOn).forEach(key => {
//         usersOn[key]?.CheckNotifications();
//     });
// }




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


