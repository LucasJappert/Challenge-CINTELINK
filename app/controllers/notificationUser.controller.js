const NotificationUser = require("../models/NotificationUser.model");
const { ObjectResult } = require('../helpers/objectResult');
const CacheManager = require("../services/cacheManager");

exports.delete = async (req, res) => {
    // TODO: VALIDATOR
    if (req.body == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }
    if (req.params.id == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }

    let result = await CacheManager.RemoveSentNotificationUserAsync(req.params.id);

    if (result == null)
        ObjectResult.SendInternalServer(res);
    else
        ObjectResult.SendOk(res, result);
};

