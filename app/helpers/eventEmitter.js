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

module.exports.EmitNewNotification = (newNoti) => {
    EMITTER.emit(this.EventTypes.newNotification, newNoti);
}
module.exports.EmitNotificationRemoved = (idNoti) => {
    console.log(`notificacion eliminada! ${idNoti}`);
    EMITTER.emit(this.EventTypes.NotificationRemoved, idNoti);
}

module.exports.EventTypes = Object.freeze({
    newNotification: "newNotification",
    NotificationRemoved: "NotificationRemoved",
});

//module.exports = MyEventEmitter;
