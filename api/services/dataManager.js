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
    //console.log(CacheUserTag);
}


module.exports.GetUserTags = (userId) => {
    let result = Object.values(CacheUserTag)
        .filter(item => item.IdUser = userId)
        .map(e => e.IdTag);
    return result;
}
module.exports.GetUserNotifications = (tags) => {
    let resultArray = Object.values(CacheNotification)
        .filter(item => tags.includes(item.IdTag))
        .map(e => e);
    let resultObject = {};
    resultArray.forEach(noti => {
        resultObject[noti.Id] = {...noti};
    });
    return resultObject;
}
module.exports.GetUser = (id) => {
    if (id in CacheUser) return CacheUser[id];
    return null;
}

