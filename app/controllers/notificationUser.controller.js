const NotificationUser = require("../models/NotificationUser.model");
const { ObjectResult } = require('../helpers/objectResult');
const { GetCacheNotificationUser } = require("../services/dataManager");

    // app.post("/api/notifications/user/:iduser", notificationUser.create);
    // app.pue("/api/notifications/user/:iduser", notificationUser.update);

exports.update = async (req, res) => {
    // TODO: Implementar un validator para controlar todos los campos
    if (req.body == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }
    if (req.params.iduser == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }

    // let cacheNotificationUser = GetCacheNotificationUser(req.body.Id, req.params.iduser);
    // if (cacheNotificationUser != null){
    //     NotificationUser.create()
    // }else{
    //     NotificationUser.update()
    // }

    const notificationUser = new NotificationUser({
        IdNotification: req.body.IdNotification,
        IdUser: req.params.iduser,
        ReadingDate: req.body.ReadingDate,
        CanceledDate: req.body.CanceledDate
    });
    let result = await NotificationUser.createOrUpdate(notificationUser);

    if (result == null)
        ObjectResult.SendInternalServer(res);
    else
        ObjectResult.SendOk(res, result);
};
