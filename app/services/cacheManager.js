const Notification = require("../models/Notification.model");
const NotificationUser = require("../models/NotificationUser.model");
const Tag = require("../models/Tag.model");
const User = require("../models/User.model");
const UserTag = require("../models/UserTag.model");
const EventEmitter = require("../helpers/eventEmitter");
const tools = require("../utils/tools");

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
module.exports.GetCacheNotificationById = (id) => {
    return CacheNotification[id];
}
module.exports.GetCacheNotificationUserById = (id) => {
    return CacheSentNotificationsUser[id];
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
module.exports.UpdateCacheUserTag = (newRecord) => {
    if (newRecord == null){
        return false;//Should't happen
    }

    if (newRecord.CanceledDate != null)
        delete CacheUserTag[newRecord.Id];
    else
        CacheUserTag[newRecord.Id] = newRecord;

    return true;
}
/**
 * The function is responsible for saving in cache and in DB
 */
module.exports.RemoveSentNotificationUserAsync = async (idNotiUser) => {
    let notiUser = CacheSentNotificationsUser[idNotiUser];

    if (notiUser == null) return;// Should't happen

    //update cache
    notiUser.CanceledDate = tools.DateNow();

    //update DB
    let result = await NotificationUser.createOrUpdate(notiUser);
    //Notify to user
    EventEmitter.EmitNotificationUserRemoved(result);
    //Remove cache
    delete CacheSentNotificationsUser[idNotiUser];
    return result;
}
module.exports.RemoveCacheUserTag = (id) => {
    delete CacheUserTag[id];
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
const GetIdNotiUser = (notificationId, userId) => {
    let result = this.GetCacheNotificationUser(notificationId, userId);
    return result ? result.Id : null;
}
/**
 * obj param can be a NotificationUser or an userId
 */
 module.exports.GetNotificationModelForUser = (noti, obj) => {
    let ReadingDate, SentDate, IdNotiUser;
    if (obj.ReadingDate !== undefined){ //check if params is a notiUser
        ReadingDate = obj.ReadingDate;
        SentDate = obj.SentDate;
        IdNotiUser = obj.Id;
    }else{
        ReadingDate = GetReadingDate(noti.Id, obj);
        SentDate = GetSentDate(noti.Id, obj);
        IdNotiUser = GetIdNotiUser(noti.Id, obj);
    }
    return {...noti, ReadingDate, SentDate, IdNotiUser};
}

module.exports.GetUsersIdSubscribedToATag = (tagId) => {
    let result = Object.values(CacheUserTag)
            .filter(rec => rec.IdTag == tagId)
            .map(e => e.IdUser);
    return result;
}

module.exports.GetUserTag = (userId, tagId) => {
    let result = Object.values(CacheUserTag)
        .find(item => item.IdUser == userId && item.IdTag == tagId);
    return result;
}
module.exports.GetUserTags = (userId) => {
    let result = Object.values(CacheUserTag)
        .filter(item => item.IdUser == userId)
        .map(e => e);
    return result;
}
module.exports.GetUserTagsId = (userId) => {
    let result = Object.values(CacheUserTag)
        .filter(item => item.IdUser == userId)
        .map(e => e.IdTag);
    return result;
}

//Obtener todos los tags
module.exports.GetAllTags = () => {
    if (!this.LoadingsOk) return;
    return Object.values(CacheTag);
}

//Obtener todas las notificaciones
module.exports.GetAllNotifications = () => {
    if (!this.LoadingsOk) return;
    return Object.values(CacheNotification);
}
//Obtener todas las notificaciones enviadas de un usuario
module.exports.GetSentNotificationsByUser = (userId) => {
    if (!this.LoadingsOk) return;
    let sentNotifications = Object.values(CacheSentNotificationsUser)
                        .filter(noti => noti.IdUser == userId);

    let result = [];
    sentNotifications.forEach(noti => {
        let newNoti = CacheNotification[noti.IdNotification];
        result.push(this.GetNotificationModelForUser(newNoti, userId));
    });
    return result;
}
//Obtener una notificación para enviar a un usuario online
module.exports.GetNotificationModelFromIdNotiUser = (idNotiUser) => {
    let sentNoti = CacheSentNotificationsUser[idNotiUser];
    if (sentNoti != null){
        let newNoti = CacheNotification[sentNoti.IdNotification];
        return this.GetNotificationModelForUser(newNoti, sentNoti);
    }
    return null;
}
//Obtener todas las notificaciones de un usuario
module.exports.GetAllNotificationsByUser = (userId) => {
    let tagIds = this.GetUserTagsId(userId);
    let allNotis = this.GetAllNotifications()
        .filter(noti => tagIds.includes(noti.IdTag));
    allNotis = allNotis.map(noti => this.GetNotificationModelForUser(noti, userId));
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

module.exports.GetUser = (id) => {
    if (id in CacheUser) return CacheUser[id];
    return null;
}

/**
 * The function is responsible for saving in cache and in DB
 */
module.exports.ChangeReadingDateOfANotificationAsync = async (idNotiUser) => {
    let notiUser = CacheSentNotificationsUser[idNotiUser];

    if (notiUser == null) return;// Should't happen

    //update cache
    notiUser.ReadingDate = notiUser.ReadingDate == null ? tools.DateNow() : null;

    //update DB
    return await NotificationUser.createOrUpdate(notiUser);
}
module.exports.UpdateNotificationUserAsync = async (userId, notiId, readingDate = null) => {
    let newNotificationUser = await NotificationUser.createOrUpdate(userId, notiId, readingDate);
    CacheSentNotificationsUser[newNotificationUser.Id] = newNotificationUser;
    return newNotificationUser;
}//TODO: Ver de eliminar


//TODO Sacar el obj de export y pasar como parámetro la función y eventype
EventEmitter.obj.on(EventEmitter.EventTypes.NotificationCreated,
                    (newNoti) => CacheNotification[newNoti.Id] = newNoti);


