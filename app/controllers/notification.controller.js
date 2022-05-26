const Notification = require("../models/Notification.model");
const { ObjectResult } = require('../helpers/objectResult');
const { GetUserTags, GetNotificationsByUser } = require("../services/dataManager");


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

    let notifications = GetNotificationsByUser(req.params.iduser);
    ObjectResult.SendOk(res, notifications);
};

//TODO:(!) Obtener de cache
exports.getAll = async (req, res) => {
    let result = await Notification.getAll();
    ObjectResult.SendOk(res, result);
};
