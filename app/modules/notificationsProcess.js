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
                console.log(`Notificación lista para enviar: --> ${noti.Id}`);
                let usersId = DataManager.GetUsersIdSubscribedToATag(noti.IdTag);
                for (let n = 0; n < usersId.length; n++) {
                    const userId = usersId[n];
                    //Save in DB
                    let newObj = NotificationUser.GetNewObject(userId, noti.Id);
                    let newNotiUser = await NotificationUser.createOrUpdate(newObj);
                    //Save in cache
                    DataManager.SaveCacheSentNotificationsUser(newNotiUser);

                    let newNoti = DataManager.GetNotificationModelFromIdNotiUser(newNotiUser.Id);
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
