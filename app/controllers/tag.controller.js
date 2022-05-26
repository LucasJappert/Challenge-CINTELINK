const Tag = require("../models/Tag.model");
const { ObjectResult } = require('../helpers/objectResult');

exports.getAll = async (req, res) => {
    let result = await Tag.getAll();
    ObjectResult.SendOk(res, result);
};
