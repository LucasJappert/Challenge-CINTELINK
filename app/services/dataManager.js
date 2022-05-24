const Notification = require("../models/Notification.model");
const NotificationUser = require("../models/NotificationUser.model");
const Tag = require("../models/Tag.model");
const User = require("../models/User.model");
const UserTag = require("../models/UserTag.model");

let CacheNotification, CacheNotificationUser, CacheTag, CacheUser, CacheUserTag = [{}, {}, {}, {}, {}];

module.exports.InitializeCache = async() => {
    CacheNotification = await Notification.getAll();
    CacheNotificationUser = await NotificationUser.getAll();
    CacheTag = await Tag.getAll();
    CacheUser = await User.getAll();
    CacheUserTag = await UserTag.getAll();
}


module.exports.GetUserTags = (userId) => {
    let result = Object.values(CacheUserTag)
        .filter(item => item.IdUser = userId)
        .map(e => e.IdTag);
    return result;
}
module.exports.GetUserNotifications = (tagIds, userId) => {
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
            resultObject[noti.Id].SentDate = status.SentDate;
        }
    });

    return resultObject;
}
module.exports.SaveNotificationUserAsync = async (noti, userId) => {
    let newNotificationUser = await NotificationUser.insertOrUpdate(noti, userId);
    CacheNotificationUser[newNotificationUser.Id] = newNotificationUser;

}
module.exports.GetUser = (id) => {
    console.log(id in CacheUser);
    if (id in CacheUser) return CacheUser[id];
    return null;
}

