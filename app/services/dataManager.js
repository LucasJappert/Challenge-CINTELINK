const Notification = require("../models/Notification.model");
const NotificationUser = require("../models/NotificationUser.model");
const Tag = require("../models/Tag.model");
const User = require("../models/User.model");
const UserTag = require("../models/UserTag.model");
const EventEmitter = require("../helpers/eventEmitter");

let CacheNotification, CacheSentNotificationsUser, CacheTag, CacheUser, CacheUserTag = [{}, {}, {}, {}, {}];

module.exports.LoadingsOk = false;
module.exports.InitializeCache = async() => {//TODO: Que los métodos async terminen con Async
    CacheNotification = await Notification.getAll();
    CacheSentNotificationsUser = await NotificationUser.getAll();
    CacheTag = await Tag.getAll();
    CacheUser = await User.getAll();
    CacheUserTag = await UserTag.getAll();
    this.LoadingsOk = true;
}

//#region GETTERS
module.exports.GetCacheNotificationUser = (idNotification, userId) => {
    let result = Object.values(CacheSentNotificationsUser)
            .find(item => item.IdUser == userId && item.IdNotification == idNotification);
    return result;
}
//#endregion ------------------------------
//#region SETTERS
module.exports.RemoveCacheNotification = (idNotification) => {
    delete CacheNotification[idNotification];
}
module.exports.SaveCacheSentNotificationsUser = (newRecord) => {
    if (newRecord == null){
        return false;//Should't happen
    }
    CacheSentNotificationsUser[newRecord.Id] = newRecord;
    return true;
}
//#endregion ------------------------------


const GetReadingDate = (notificationId, userId) => {
    let result = this.GetCacheNotificationUser(notificationId, userId);
    return result ? result.ReadingDate : null;
}
const GetSentDate = (notificationId, userId) => {
    let result = this.GetCacheNotificationUser(notificationId, userId);
    return result ? result.CreationDate : null;
}

module.exports.GetUsersIdSubscribedToATag = (tagId) => {
    let result = Object.values(CacheUserTag)
            .filter(rec => rec.IdTag == tagId)
            .map(e => e.IdUser);
    return result;
}

module.exports.GetUserTags = (userId) => {
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
    if(CacheNotification == null){
        console.error(CacheNotification)
    }
    return Object.values(CacheNotification);
}
//Obtener todas las notificaciones enviadas de un usuario
module.exports.GetSentNotificationsByUser = (userId) => {
    let sentNotifications = Object.values(CacheSentNotificationsUser)
                        .filter(noti => noti.IdUser == userId);

    let result = [];
    sentNotifications.forEach(noti => {
        let newNoti = CacheNotification[noti.IdNotification];
        result.push({...newNoti,
                    ReadingDate: noti.ReadingDate,
                    SentDate: GetSentDate(noti.IdNotification, userId)})
    });
    return result;
}
//Obtener una notificación para enviar a un usuario online
module.exports.GetSentNotificationByUser = (idNotiUser) => {
    let sentNoti = CacheSentNotificationsUser[idNotiUser];
    if (sentNoti != null){
        let newNoti = CacheNotification[sentNoti.IdNotification];
        let result = ({...newNoti,
                        ReadingDate: sentNoti.ReadingDate,
                        SentDate: sentNoti.SentDate});
        return result;
    }
    return null;
}
//Obtener todas las notificaciones de un usuario
module.exports.GetAllNotificationsByUser = (userId) => {
    let tagIds = this.GetUserTags(userId);
    let allNotis = this.GetAllNotifications()
        .filter(noti => tagIds.includes(noti.IdTag));
    allNotis = allNotis.map(noti => ({...noti,
                                    ReadingDate: GetReadingDate(noti.Id, userId),
                                    SentDate: GetSentDate(noti.Id, userId)}))
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
    return result;
}
module.exports.GetNoDuplicateSentNotificationIds = () => {
    let sentNotifications = Object.values(CacheSentNotificationsUser)
                        .map(noti => noti.IdNotification);
    return [...new Set(sentNotifications)];
}//TODO: hacer const



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
    let newNotificationUser = await NotificationUser.createOrUpdate(userId, notiId, readingDate);
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

//TODO Sacar el obj de export y pasar como parámetro la función y eventype
EventEmitter.obj.on(EventEmitter.EventTypes.NotificationCreated,
                    (newNoti) => CacheNotification[newNoti.Id] = newNoti);


