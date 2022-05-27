const EventEmitter = require('events');
//TODO: llevar a otro archivo
//module.exports.EventEmitter = new EventEmitter();
const EMITTER = new EventEmitter();
module.exports.obj = EMITTER;
// class MyEventEmitter{
//     #eventEmitter;
//     constructor(){
//         this.#eventEmitter = new EventEmitter();
//     }
// }

module.exports.NotificationCreated = (newNoti) => {
    EMITTER.emit(this.EventTypes.NotificationCreated, newNoti);
}
module.exports.EmitNotificationRemoved = (idNoti) => {
    console.log(`notificacion eliminada! ${idNoti}`);
    EMITTER.emit(this.EventTypes.NotificationRemoved, idNoti);
}
module.exports.SendNotificationToOnlineUsers = (newNoti) => {
    console.log(`NotificationUser creada o actualizada! ${newNoti.Id}`);
    EMITTER.emit(this.EventTypes.SendNotificationToOnlineUsers, newNoti);
}

module.exports.EventTypes = Object.freeze({
    NotificationCreated: "NotificationCreated",
    NotificationRemoved: "NotificationRemoved",
    SendNotificationToOnlineUsers: "SendNotificationToOnlineUsers"
});

//module.exports = MyEventEmitter;
