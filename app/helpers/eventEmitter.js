const EventEmitter = require('events');

const EMITTER = new EventEmitter();

module.exports.obj = EMITTER;

module.exports.NotificationCreated = (newNoti) => {
    EMITTER.emit(this.EventTypes.NotificationCreated, newNoti);
}
module.exports.EmitNotificationRemoved = (idNoti) => {
    console.log(`NotificationRemoved! ${idNoti}`);
    EMITTER.emit(this.EventTypes.NotificationRemoved, idNoti);
}
module.exports.SendNotificationToOnlineUser = (newNoti) => {
    console.log(`NotificationUser creada o actualizada! ${newNoti.IdNotiUser}`);
    EMITTER.emit(this.EventTypes.SendNotificationToOnlineUser, newNoti);
}
module.exports.EmitNotificationUserRemoved = (notiUser) => {
    console.log(`NotificationUserRemoved! ${notiUser.Id}`);
    EMITTER.emit(this.EventTypes.NotificationUserRemoved, notiUser);
}

module.exports.EventTypes = Object.freeze({
    NotificationCreated: "NotificationCreated",
    NotificationRemoved: "NotificationRemoved",
    SendNotificationToOnlineUser: "SendNotificationToOnlineUser",
    NotificationUserRemoved: "NotificationUserRemoved"
});
