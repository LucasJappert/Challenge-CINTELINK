const DataManager = require('../services/dataManager');
const tools = require("../utils/tools");
const NotificationUser = require("../models/NotificationUser.model");
const EventEmitter = require("../helpers/eventEmitter");

const NotificationsProcess = async () => {
    if (DataManager.LoadingsOk) {
        let unsentNotis = DataManager.GetUnsentNotifications();
        for (let i = 0; i < unsentNotis.length; i++) {
            const noti = unsentNotis[i];
            if (noti.DateToSend < tools.now()){//TODO: Revisar
                console.log(`Notificación por enviar: --> ${noti.Id}`);
                let usersId = DataManager.GetUsersIdSubscribedToATag(noti.IdTag);
                for (let n = 0; n < usersId.length; n++) {
                    const userId = usersId[n];
                    //Save in DB
                    let newNotiUser = await NotificationUser.createOrUpdate(userId, noti.Id);
                    //Save in cache
                    DataManager.SaveCacheSentNotificationsUser(newNotiUser);
                    //Notification to online users goes to EventEmmiter(Check UserManager file)
                    let newNoti = DataManager.GetSentNotificationByUser(newNotiUser.Id);
                    EventEmitter.SendNotificationToOnlineUsers(newNoti);
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
