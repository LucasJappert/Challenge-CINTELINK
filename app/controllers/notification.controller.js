const Notification = require("../models/Notification.model");
const { ObjectResult } = require('../helpers/objectResult');
const DataManager = require("../services/dataManager");


exports.create = async (req, res) => {
    // TODO: Implementar un validator para controlar todos los campos
    if (req.body == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }

    //TODO: Chequear en cache si ya existe
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
    }
    let notifications = await DataManager.GetAllNotificationsByUser(req.params.iduser);
    ObjectResult.SendOk(res, notifications);
};

//TODO:(!) Obtener de cache
exports.getAll = async (req, res) => {
    //TODO: poner filtro para que sólo la pueda acceder un ADMIN
    let result = DataManager.GetAllNotifications();// await Notification.getAll();
    ObjectResult.SendOk(res, result);
};

exports.delete = async (req, res) => {
    // TODO: Implementar un validator para controlar todos los campos
    if (req.params.id == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }

    //TODO: Chequear en cache si ya existe
    let sentNotificationsIds = DataManager.GetNoDuplicateSentNotificationIds();

    if(sentNotificationsIds.includes(Number(req.params.id))){
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }else{
        DataManager.RemoveNotificationFromCache(req.params.id);
        let result = await Notification.delete(req.params.id);
        if (result > 0)
            ObjectResult.SendOk(res, {});
        else
            ObjectResult.SendInternalServer(res);
    }
};
