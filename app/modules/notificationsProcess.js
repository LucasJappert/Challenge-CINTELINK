const CacheManager = require('../services/cacheManager');
const tools = require("../utils/tools");
const NotificationUser = require("../models/NotificationUser.model");
const EventEmitter = require("../helpers/eventEmitter");

const NotificationsProcess = async () => {
    if (CacheManager.LoadingsOk) {
        let unsentNotis = CacheManager.GetUnsentNotifications();
        for (let i = 0; i < unsentNotis.length; i++) {
            const noti = unsentNotis[i];
            if (noti.DateToSend < tools.now()){//TODO: Revisar
                console.log(`Notificación lista para enviar: --> ${noti.Id}`);
                let usersId = CacheManager.GetUsersIdSubscribedToATag(noti.IdTag);
                for (let n = 0; n < usersId.length; n++) {
                    const userId = usersId[n];
                    //Save in DB
                    let newObj = NotificationUser.GetNewObject(userId, noti.Id);
                    let newNotiUser = await NotificationUser.createOrUpdate(newObj);
                    //Save in cache
                    CacheManager.SaveCacheSentNotificationsUser(newNotiUser);

                    let newNoti = CacheManager.GetNotificationModelFromIdNotiUser(newNotiUser.Id);
                    //Notification to online users goes to EventEmmiter(Check UserManager file)
                    EventEmitter.SendNotificationToOnlineUser(newNoti);
                }
            }
        }
    }

    setTimeout(() => {
        NotificationsProcess();
    }, 4000);
}


module.exports.StartProcess = () => {
    NotificationsProcess();
}
