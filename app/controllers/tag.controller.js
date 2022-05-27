const Tag = require("../models/Tag.model");
const { ObjectResult } = require('../helpers/objectResult');
const DataManager = require("../services/dataManager");

exports.getAll = async (req, res) => {
    ObjectResult.SendOk(res, DataManager.GetAllTags());
};
