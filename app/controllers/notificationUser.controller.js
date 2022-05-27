const NotificationUser = require("../models/NotificationUser.model");
const { ObjectResult } = require('../helpers/objectResult');
const { GetCacheNotificationUser } = require("../services/dataManager");

exports.update = async (req, res) => {
    // TODO: Implementar un validator para controlar todos los campos
    if (req.body == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }
    if (req.params.iduser == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }

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
