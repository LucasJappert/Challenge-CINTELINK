const User = require("../models/User.model");
const { ObjectResult } = require('../helpers/objectResult');


exports.create = async (req, res) => {
    // TODO: VALIDATOR
    if (req.body?.Nick == null) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = new User({ Nick: req.body?.Nick});
    let result = await User.create(user);

    if (result == null)
        ObjectResult.SendInternalServer(res);
    else
        ObjectResult.SendOk(res, result);
};

exports.getAll = async (req, res) => {
    let result = await User.getAll();
    ObjectResult.SendOk(res, result);
};
