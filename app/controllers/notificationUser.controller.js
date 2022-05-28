const NotificationUser = require("../models/NotificationUser.model");
const { ObjectResult } = require('../helpers/objectResult');
const DataManager = require("../services/dataManager");

exports.delete = async (req, res) => {
    // TODO: VALIDATOR
    if (req.body == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }
    if (req.params.id == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }

    let result = await DataManager.RemoveSentNotificationUserAsync(req.params.id);

    if (result == null)
        ObjectResult.SendInternalServer(res);
    else
        ObjectResult.SendOk(res, result);
};

