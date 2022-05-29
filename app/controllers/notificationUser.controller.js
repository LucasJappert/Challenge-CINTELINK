const NotificationUser = require("../models/NotificationUser.model");
const { ObjectResult } = require('../helpers/objectResult');
const CacheManager = require("../services/cacheManager");

exports.delete = async (req, res) => {
    if (req.params.id == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
        return;
    }

    let result = await CacheManager.RemoveSentNotificationUserAsync(req.params.id);

    if (result == null)
        ObjectResult.SendInternalServer(res);
    else
        ObjectResult.SendOk(res, result);
};

