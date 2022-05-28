const { ObjectResult } = require('../helpers/objectResult');
const DataManager = require("../services/dataManager");

exports.getAll = async (req, res) => {
    let tags = DataManager.GetAllTags();
    let result = tags.map(item => ({ Id: item.Id, Name: item.Name}));
    ObjectResult.SendOk(res, result);
};
