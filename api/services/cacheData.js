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


module.exports.SetUserNotifications = async (user) => {
    let tags = Object.values(CacheUserTag)
        .filter(item => item.IdUser = user.Id)
        .map(e => e.IdTag);
    user.tagsIds = tags;
    let notifications = Object.values(CacheNotification)
        .filter(item => tags.includes(item.IdTag()));
    user.notifications = notifications;
}
module.exports.GetUser = (id) => {
    if (id in CacheUser) return CacheUser[id];
    return null;
}

