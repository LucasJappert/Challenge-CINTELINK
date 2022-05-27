const Notification = require("../models/Notification.model");
const NotificationUser = require("../models/NotificationUser.model");
const Tag = require("../models/Tag.model");
const User = require("../models/User.model");
const UserTag = require("../models/UserTag.model");
const EventEmitter = require("../helpers/eventEmitter");

let CacheNotification, CacheSentNotificationsUser, CacheTag, CacheUser, CacheUserTag = [{}, {}, {}, {}, {}];
// module.exports.CacheNotification = {};
// module.exports.CacheSentNotificationsUser = {};
// module.exports.CacheTag = {};
// module.exports.CacheUser = {};
// module.exports.CacheUserTag = {};

module.exports.InitializeCache = async() => {//TODO: Que los métodos async terminen con Async
    CacheNotification = await Notification.getAll();
    CacheSentNotificationsUser = await NotificationUser.getAll();
    CacheTag = await Tag.getAll();
    CacheUser = await User.getAll();
    CacheUserTag = await UserTag.getAll();
}

//#region GETTERS
module.exports.GetCacheNotificationUser = (idNotification, userId) => {
    let result = Object.values(CacheSentNotificationsUser)
            .find(item => item.IdUser == userId && item.IdNotification == idNotification);
    return result;
}
//#endregion ------------------------------
//#region SETTERS
module.exports.RemoveNotificationFromCache = (idNotification) => {
    delete CacheNotification[idNotification];
}
//#endregion ------------------------------





module.exports.GetUserTags = (userId) => {
    console.log(CacheUserTag);
    let result = Object.values(CacheUserTag)
        .filter(item => item.IdUser == userId)
        .map(e => e.IdTag);
    return result;
}

//Obtener todos los tags
module.exports.GetAllTags = () => {
    return Object.values(CacheTag);
}

//Obtener todas las notificaciones
module.exports.GetAllNotifications = () => {
    return Object.values(CacheNotification);
}
//Obtener todas las notificaciones enviadas de un usuario
module.exports.GetSentNotificationsByUser = (userId) => {
    let sentNotifications = Object.values(CacheSentNotificationsUser)
                        .filter(noti => noti.IdUser == userId);

    let result = [];
    sentNotifications.forEach(sentNoti => {
        let newNoti = CacheNotification[sentNoti.IdNotification];
        result.push({...newNoti, ReadingDate: sentNoti.ReadingDate})
    });
    return result;
}
//Obtener todas las notificaciones de un usuario
module.exports.GetAllNotificationsByUser = (userId) => {
    let tagIds = this.GetUserTags(userId);
    console.log(tagIds);
    let allNotis = this.GetAllNotifications()
        .filter(noti => tagIds.includes(noti.IdTag));
    return allNotis;
}
//Obtener todas las notificaciones enviadas
module.exports.GetSentNotifications = () => {
    let noDuplicateIds = this.GetNoDuplicateSentNotificationIds();
    let result = Object.values(CacheNotification)
                .filter(noti => noDuplicateIds.includes(noti.Id));
    return result;
}
//Obtener todas las notificaciones por enviar
module.exports.GetUnsentNotifications = () => {
    let noDuplicateIds = this.GetNoDuplicateSentNotificationIds();
    let result = Object.values(CacheNotification)
                .filter(noti => !noDuplicateIds.includes(noti.Id));

}
module.exports.GetNoDuplicateSentNotificationIds = () => {
    let sentNotifications = Object.values(CacheSentNotificationsUser)
                        .map(noti => noti.IdNotification);
    return [...new Set(sentNotifications)];
}


module.exports.GetNotificationByUser = async (userId, notiId) => {
    if (CacheNotification[notiId] != null){
        let copyNoti = {...CacheNotification[notiId]};
        let status = await CheckReadingDateNotification(userId, notiId);//TODO: revisar
        copyNoti.ReadingDate = status;
        return copyNoti;
    }
    return null;
}
module.exports.GetUser = (id) => {
    if (id in CacheUser) return CacheUser[id];
    return null;
}

module.exports.UpdateNotificationUserAsync = async (userId, notiId, readingDate = null) => {
    let newNotificationUser = await NotificationUser.update(userId, notiId, readingDate);
    CacheSentNotificationsUser[newNotificationUser.Id] = newNotificationUser;
    return newNotificationUser;
}


/**
 * this function will populate the NotificationUser table as it is called
 * @returns null if it doesn't exists, and the ReadingDate if it exists
 */
const CheckReadingDateNotification = async (userId, notiId) => {
    let status = Object.values(CacheSentNotificationsUser)
        .find(item => item.IdUser == userId && item.IdNotification == notiId);
    if (status == null){
        await this.UpdateNotificationUserAsync(userId, notiId);
        return null;
    }
    return status.ReadingDate;
}

EventEmitter.obj.on(EventEmitter.EventTypes.newNotification,
                    (newNoti) => CacheNotification[newNoti.Id] = newNoti);


