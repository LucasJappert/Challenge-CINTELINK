const Notification = require("../models/Notification.model");
const NotificationUser = require("../models/NotificationUser.model");
const Tag = require("../models/Tag.model");
const User = require("../models/User.model");
const UserTag = require("../models/UserTag.model");
const EventEmitter = require("../helpers/eventEmitter");

let CacheNotification, CacheNotificationUser, CacheTag, CacheUser, CacheUserTag = [{}, {}, {}, {}, {}];

module.exports.InitializeCache = async() => {//TODO: Que los métodos async terminen con Async
    CacheNotification = await Notification.getAll();
    CacheNotificationUser = await NotificationUser.getAll();
    CacheTag = await Tag.getAll();
    CacheUser = await User.getAll();
    CacheUserTag = await UserTag.getAll();
}


module.exports.GetUserTags = (userId) => {
    let result = Object.values(CacheUserTag)
        .filter(item => item.IdUser == userId)
        .map(e => e.IdTag);
    return result;
}
module.exports.GetNotificationsByUser = (userId) => {
    let tagIds = this.GetUserTags(userId);

    let notisArray = Object.values(CacheNotification)
        .filter(item => tagIds.includes(item.IdTag))
        .map(e => e);

    let [resultObject, notiIds] = [{}, []];
    notisArray.forEach(noti => {
        resultObject[noti.Id] = {...noti};
        //Set notifications status
        let status = Object.values(CacheNotificationUser)
            .find(item => item.IdUser == userId && item.IdNotification == noti.Id);
        if (status != null){
            resultObject[noti.Id].ReadingDate = status.ReadingDate;
        }
    });

    return resultObject;
}
module.exports.GetNotificationByUser = (userId, notiId) => {
    let tagIds = this.GetUserTags(userId);
    //let notification = CacheNotification[notiId];
    if (CacheNotification[notiId] != null){
        let notiCopy = {...CacheNotification[notiId]};
        let status = Object.values(CacheNotificationUser)
        .find(item => item.IdUser == userId && item.IdNotification == notiId);
        notiCopy.ReadingDate = status ? status.ReadingDate : null;
        return notiCopy;
    }
    return null;

    // let notisArray = Object.values(CacheNotification)
    //     .filter(item => tagIds.includes(item.IdTag))
    //     .map(e => e);

    // let [resultObject, notiIds] = [{}, []];

    // notisArray.forEach(noti => {
    //     resultObject[noti.Id] = {...noti};
    //     //Set notifications status
    //     let status = Object.values(CacheNotificationUser)
    //         .find(item => item.IdUser == userId && item.IdNotification == noti.Id);
    //     if (status != null){
    //         resultObject[noti.Id].ReadingDate = status.ReadingDate;
    //     }
    // });

    // return resultObject;
}
module.exports.GetUser = (id) => {
    if (id in CacheUser) return CacheUser[id];
    return null;
}
module.exports.GetCacheNotificationUser = (idNotification, userId) => {
    let result = Object.values(CacheNotificationUser)
            .find(item => item.IdUser == userId && item.IdNotification == idNotification);
    return result;
}

// module.exports.CreateNotificationUserAsync = async (noti, userId) => {
//     let newNotificationUser = await NotificationUser.create(noti, userId);
//     CacheNotificationUser[newNotificationUser.Id] = newNotificationUser;
// }
module.exports.UpdateNotificationUserAsync = async (noti, userId) => {
    let newNotificationUser = await NotificationUser.update(noti, userId);
    CacheNotificationUser[newNotificationUser.Id] = newNotificationUser;
    return newNotificationUser;
}

//#region CacheNotification
module.exports.createOrUpdateCacheNotification = (newNoti) => {
    CacheNotification[newNoti.Id] = newNoti;
    //EventEmitter.emit(this.EventTypes.newNotification, { newNotification: newNoti});
}
//#endregion ########################################

EventEmitter.obj.on(EventEmitter.EventTypes.newNotification,
                    (data) => this.createOrUpdateCacheNotification(data));


