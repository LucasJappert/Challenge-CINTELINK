const { ObjectResult } = require('../helpers/objectResult');
const CacheManager = require("../services/cacheManager");

exports.getAll = async (req, res) => {
    let tags = CacheManager.GetAllTags();
    let result = tags.map(item => ({ Id: item.Id, Name: item.Name}));
    ObjectResult.SendOk(res, result);
};
