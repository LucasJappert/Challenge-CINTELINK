const { ObjectResult } = require('../helpers/objectResult');
const DataManager = require("../services/dataManager");
const UserTag = require("../models/UserTag.model");

exports.getAll = async (req, res) => {

    if (req.params.iduser == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
    }
    let userTags = DataManager.GetUserTags(req.params.iduser);

    let result = userTags.map(item => ({ Id: item.Id, IdTag: item.IdTag}));
    ObjectResult.SendOk(res, result);
};
exports.update = async (req, res) => {
    if (req.params.iduser == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
        return;
    }
    if (req.params.idtag == null) {
        ObjectResult.SendBadRequest(res, { message: "Invalid parameters!"});
        return;
    }

    let userTag = DataManager.GetUserTag(req.params.iduser, req.params.idtag);
    if (userTag == null){
        userTag = UserTag.GetNewObject(req.params.iduser, req.params.idtag);
    }else{
        userTag.CanceledDate = userTag.CanceledDate ? null : new Date();
    }

    //Update in DB
    let newUserTag = await UserTag.createOrUpdate(userTag);
    //Update in Cache
    DataManager.UpdateCacheUserTag(newUserTag);

    let newTags = DataManager.GetUserTags(req.params.iduser);
    //console.log(userTag1);

    ObjectResult.SendOk(res, newTags);
};
