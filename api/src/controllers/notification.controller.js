const Notification = require("../models/Notification.model");
const { ObjectResult } = require("../helpers/objectResult");
const CacheManager = require("../services/cacheManager");
const { body, validationResult } = require('express-validator');

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        ObjectResult.SendBadRequest(res, {
            message: "Invalid parameters!",
            errors: errors.array()
        });
        return;
    }

    const notification = new Notification(req.body);
    let result = await Notification.create(notification);

    if (result == null)
        ObjectResult.SendInternalServer(res);
    else
        ObjectResult.SendOk(res, result);
};

exports.getByUser = async (req, res) => {
    if (req.params.iduser == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
        return;
    }
    let notifications = await CacheManager.GetAllNotificationsByUser(req.params.iduser);
    ObjectResult.SendOk(res, notifications);
};
exports.getByUserFilterSent = async (req, res) => {
    if (req.params.iduser == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
        return;
    }
    let notifications = await CacheManager.GetNoRemovedSentNotificationsByUser(req.params.iduser);
    ObjectResult.SendOk(res, notifications);
};

exports.getAll = async (req, res) => {
    //TODO: poner filtro para que sólo la pueda acceder un ADMIN
    let result = CacheManager.GetAllNotifications();// await Notification.getAll();
    ObjectResult.SendOk(res, result);
};

exports.delete = async (req, res) => {
    if (req.params.id == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
        return;
    }

    let sentNotificationsIds = CacheManager.GetNoDuplicateSentNotificationIds();

    if(sentNotificationsIds.includes(Number(req.params.id))){
        ObjectResult.SendBadRequest(res, { message: "The notification was already sent and it cant be removed!"});
        return;
    }

    CacheManager.RemoveCacheNotification(req.params.id);
    let result = await Notification.delete(req.params.id);
    if (result > 0)
        ObjectResult.SendOk(res, {});
    else
        ObjectResult.SendInternalServer(res);
};

exports.validate = (method) => {
    switch (method) {
        case "create": {
            return [
                body("Title", "Title doesn't exists").exists(),
                body("Message", "Invalid email").exists(),
                body("IdTag").exists().isInt(),
                body("DateToSend").exists()
            ]
        }
    }
}
