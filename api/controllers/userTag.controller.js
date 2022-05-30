const { ObjectResult } = require('../helpers/objectResult');
const CacheManager = require("../services/cacheManager");
const UserTag = require("../models/UserTag.model");

exports.getAll = async (req, res) => {

    if (req.params.iduser == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
        return;
    }
    let userTags = CacheManager.GetUserTags(req.params.iduser);

    let result = userTags.map(item => ({ Id: item.Id, IdTag: item.IdTag}));
    ObjectResult.SendOk(res, result);
};
exports.update = async (req, res) => {
    if (req.params.iduser == null || req.params.idtag == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
        return;
    }

    let userTag = CacheManager.GetUserTag(req.params.iduser, req.params.idtag);
    if (userTag == null){
        userTag = UserTag.GetNewObject(req.params.iduser, req.params.idtag);
    }else{
        userTag.CanceledDate = userTag.CanceledDate ? null : new Date();
    }

    //Update in DB
    let newUserTag = await UserTag.createOrUpdate(userTag);
    //Update in Cache
    CacheManager.UpdateCacheUserTag(newUserTag);

    let newTags = CacheManager.GetUserTags(req.params.iduser);

    ObjectResult.SendOk(res, newTags);
};
